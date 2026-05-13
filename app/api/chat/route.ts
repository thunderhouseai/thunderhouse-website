import { NextRequest } from "next/server";
import { anthropic, CHAT_SYSTEM_PROMPT } from "@/lib/anthropic";
import { db } from "@/lib/db";

const RATE_LIMIT_MAP = new Map<string, { count: number; reset: number }>();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.reset) {
    RATE_LIMIT_MAP.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return Response.json(
      { success: false, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  let messages: ChatMessage[];
  let locale: string;

  try {
    const body = await request.json();
    messages = body.messages;
    locale = body.locale ?? "en";
  } catch {
    return Response.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ success: false, error: "No messages" }, { status: 400 });
  }

  // Save session asynchronously (fire and forget)
  db.chatSession
    .create({ data: { locale, messages: messages as object[] } })
    .catch(() => {});

  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: CHAT_SYSTEM_PROMPT,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
