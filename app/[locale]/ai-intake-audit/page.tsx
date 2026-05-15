import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, Search, MessageSquare, Calendar, Settings, Globe } from "lucide-react";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

const DOMAIN = "https://thunderhouse.io";
const CALENDLY = "https://calendly.com/thunderhouseai/30min";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("audit_title"),
    description: t("audit_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/ai-intake-audit`,
      languages: {
        en: `${DOMAIN}/en/ai-intake-audit`,
        es: `${DOMAIN}/es/ai-intake-audit`,
        "x-default": `${DOMAIN}/en/ai-intake-audit`,
      },
    },
    openGraph: {
      title: t("audit_title"),
      description: t("audit_desc"),
    },
  };
}

const CHECK_ICONS = [Search, MessageSquare, Calendar, Settings, Globe];

export default async function AuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });

  const checks = [
    { title: t("check1_title"), body: t("check1_body") },
    { title: t("check2_title"), body: t("check2_body") },
    { title: t("check3_title"), body: t("check3_body") },
    { title: t("check4_title"), body: t("check4_body") },
    { title: t("check5_title"), body: t("check5_body") },
  ];

  const gets = [
    t("get1"),
    t("get2"),
    t("get3"),
    t("get4"),
    t("get5"),
  ];

  const faqItems = [
    { q: t("faq1_q"), a: t("faq1_a") },
    { q: t("faq2_q"), a: t("faq2_a") },
    { q: t("faq3_q"), a: t("faq3_a") },
    { q: t("faq4_q"), a: t("faq4_a") },
    { q: t("faq5_q"), a: t("faq5_a") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("eyebrow")}
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed mb-6">
            {t("subheadline")}
          </p>
          <p className="text-sm text-[--color-steel] font-medium mb-10">
            {t("no_pitch")}
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[--color-cta] hover:bg-[--color-cta-hover] text-white font-semibold px-7 py-4 rounded-xl transition-colors text-base"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>

      {/* What we check */}
      <section className="py-20 bg-[--color-surface]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-12"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t("what_we_check_headline")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checks.map((check, i) => {
              const Icon = CHECK_ICONS[i];
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-[--color-border] rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[--color-steel]" />
                  </div>
                  <h3
                    className="font-bold text-[--color-text] mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {check.title}
                  </h3>
                  <p className="text-sm text-[--color-muted] leading-relaxed">{check.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you receive */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-8"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t("what_you_get_headline")}
            </h2>
            <ul className="flex flex-col gap-4">
              {gets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-[--color-steel] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-[--color-muted] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t("who_its_for_headline")}
            </h2>
            <p className="text-[--color-muted] leading-relaxed mb-10">
              {t("who_its_for_body")}
            </p>

            {/* CTA card */}
            <div className="bg-[--color-navy] border border-[--color-steel]/30 rounded-2xl p-8">
              <h3
                className="text-xl font-bold text-[--color-text] mb-2"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {t("cta_headline")}
              </h3>
              <p className="text-sm text-[--color-muted] mb-6">
                {t("cta_subheadline")}
              </p>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[--color-cta] hover:bg-[--color-cta-hover] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {t("cta_button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq headline={t("faq_headline")} items={faqItems} />

      <CtaBanner />
    </>
  );
}
