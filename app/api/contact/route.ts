import { db } from "@/lib/db";
import { NextRequest } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  lang: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, lang } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim() || !lang) {
    return Response.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  // Save to DB
  let submission;
  try {
    submission = await db.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: body.phone?.trim() || null,
        company: body.company?.trim() || null,
        message: message.trim(),
        service: body.service || null,
        lang,
      },
    });
  } catch {
    return Response.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }

  // Fire n8n webhook (best-effort, non-blocking)
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          company: submission.company,
          message: submission.message,
          service: submission.service,
          lang: submission.lang,
          timestamp: submission.createdAt.toISOString(),
        }),
      });

      await db.contactSubmission.update({
        where: { id: submission.id },
        data: { n8nSent: true },
      });
    } catch {
      // n8n failure does not fail the request — data is already in DB
    }
  }

  return Response.json({ success: true });
}
