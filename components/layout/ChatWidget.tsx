"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { X, Send } from "lucide-react";
import { BoltIcon } from "@/components/ui/BoltIcon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CALENDLY = "https://calendly.com/thunderhouseai/30min";
const STORAGE_KEY = "thunderhouse-chat-opened";

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(() =>
    typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY)
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const exchangeCount = messages.filter((m) => m.role === "user").length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    setHasOpened(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
    }
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t("greeting") }]);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, locale }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(360px,calc(100vw-2rem))]
              bg-[--color-surface] border border-[--color-border] rounded-2xl
              shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "min(500px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[--color-border] bg-[--color-navy]">
              <div className="flex items-center gap-2">
                <BoltIcon size={16} color="var(--color-steel)" />
                <span className="text-sm font-semibold text-[--color-text]">{t("title")}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[--color-muted] hover:text-[--color-text] transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`text-sm leading-relaxed rounded-xl px-3 py-2 max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-[--color-navy] text-[--color-text] self-end"
                      : "bg-[--color-surface-raised] text-[--color-text] self-start"
                  }`}
                >
                  {msg.content}
                </motion.div>
              ))}

              {/* Post-3-exchanges CTA */}
              {exchangeCount >= 3 && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start text-xs font-semibold text-[--color-steel] underline underline-offset-2 hover:text-[--color-cta-hover] transition-colors"
                >
                  {t("cta")}
                </motion.a>
              )}

              {loading && (
                <div className="flex gap-1 self-start px-3 py-2">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[--color-steel]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-[--color-border] flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={t("placeholder")}
                className="flex-1 bg-[--color-surface-raised] rounded-xl px-3 py-2 text-sm
                  text-[--color-text] placeholder:text-[--color-muted]
                  focus:outline-none focus:ring-1 focus:ring-[--color-steel]"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-[--color-steel] flex items-center justify-center
                  disabled:opacity-40 transition-opacity hover:bg-[--color-cta-hover]"
                aria-label="Send"
              >
                <Send size={14} className="text-[--color-bg]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full
          bg-[--color-navy] border-2 border-[--color-steel]
          flex items-center justify-center shadow-lg
          ${!hasOpened ? "widget-pulse" : ""}`}
        aria-label="Open chat"
      >
        <BoltIcon size={22} color="var(--color-steel)" />
      </motion.button>
    </>
  );
}
