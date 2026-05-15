import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
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
    title: t("followup_title"),
    description: t("followup_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/services/ai-follow-up-systems`,
      languages: {
        en: `${DOMAIN}/en/services/ai-follow-up-systems`,
        es: `${DOMAIN}/es/services/ai-follow-up-systems`,
        "x-default": `${DOMAIN}/en/services/ai-follow-up-systems`,
      },
    },
  };
}

export default async function AiFollowUpSystemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const solutionItems: string[] = t.raw("followup.solution_items") as string[];

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("followup.name")}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("followup.hero_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed mb-8">
            {t("followup.hero_sub")}
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[--color-cta] hover:bg-[--color-cta-hover] text-white font-semibold px-7 py-4 rounded-xl transition-colors text-base"
          >
            {locale === "es" ? "Solicitar Auditoría Gratis" : "Get Your Free Audit"}
          </a>
        </div>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2
              className="text-xl font-bold text-[--color-steel] mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t("followup.problem_headline")}
            </h2>
            <p className="text-[--color-muted] leading-relaxed">{t("followup.problem_body")}</p>
          </div>
          <div>
            <h2
              className="text-xl font-bold text-[--color-steel] mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t("followup.solution_headline")}
            </h2>
            <ul className="flex flex-col gap-3">
              {solutionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[--color-steel] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[--color-muted] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/5 border border-[--color-border] rounded-2xl p-8 mb-16">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t("followup.workflow_headline")}
          </h2>
          <p className="text-[--color-muted] leading-relaxed">{t("followup.workflow_body")}</p>
        </div>

        {/* Back link + Audit CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href={`/${locale}/ai-intake-audit`}
            className="inline-flex items-center gap-2 bg-[--color-cta] hover:bg-[--color-cta-hover] text-white font-semibold px-7 py-4 rounded-xl transition-colors"
          >
            {locale === "es" ? "Solicitar Auditoría Gratis" : "Get Your Free Audit"}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm text-[--color-muted] hover:text-[--color-text] transition-colors py-4"
          >
            ← {locale === "es" ? "Ver todos los servicios" : "View all services"}
          </Link>
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
