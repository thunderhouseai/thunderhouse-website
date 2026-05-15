"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const CALENDLY = "https://calendly.com/thunderhouseai/30min";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", company: "", message: "", service: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang: locale }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const serviceOptions = [
    { value: "intake", label: t("form.service_intake") },
    { value: "followup", label: t("form.service_followup") },
    { value: "operations", label: t("form.service_operations") },
    { value: "audit", label: t("form.service_audit") },
    { value: "unsure", label: t("form.service_unsure") },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Form */}
      <div>
        <h1
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
        >
          {t("headline")}
        </h1>
        <p className="text-[--color-muted] mb-10">{t("sub")}</p>

        {status === "success" ? (
          <div className="rounded-2xl bg-[--color-navy] border border-[--color-steel] p-6 text-[--color-steel] font-medium">
            {t("success")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder={t("form.name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
              />
              <Input
                type="email"
                placeholder={t("form.email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder={t("form.phone")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder={t("form.company")}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full rounded-xl bg-[--color-surface] border border-[--color-border] px-4 py-3 text-sm text-[--color-text] focus:outline-none focus:border-[--color-steel] transition-colors"
            >
              <option value="">{t("form.service")}</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <Textarea
              placeholder={t("form.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              error={errors.message}
              rows={5}
            />
            {status === "error" && (
              <p className="text-sm text-red-400">{t("error")}</p>
            )}
            <Button type="submit" variant="primary" disabled={status === "loading"}>
              {status === "loading" ? "..." : t("form.submit")}
            </Button>
          </form>
        )}
      </div>

      {/* Calendly */}
      <div>
        <h2
          className="text-xl font-bold text-[--color-steel] mb-6"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {t("calendly_headline")}
        </h2>
        <div className="rounded-2xl border border-[--color-border] overflow-hidden bg-[--color-surface] aspect-[4/5]">
          <iframe
            src={CALENDLY}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a call with ThunderHouse"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
