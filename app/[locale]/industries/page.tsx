import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Stethoscope, Scale, Calculator, ArrowRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";

const DOMAIN = "https://thunderhouse.io";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("industries_title"),
    description: t("industries_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/industries`,
      languages: {
        en: `${DOMAIN}/en/industries`,
        es: `${DOMAIN}/es/industries`,
        "x-default": `${DOMAIN}/en/industries`,
      },
    },
  };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });

  const industries = [
    {
      key: "doctors" as const,
      icon: Stethoscope,
      slug: t("doctors.slug"),
      name: t("doctors.name"),
      tagline: t("doctors.tagline"),
      services: [t("doctors.s1"), t("doctors.s2"), t("doctors.s3"), t("doctors.s4")],
      cta: t("doctors.cta"),
    },
    {
      key: "attorneys" as const,
      icon: Scale,
      slug: t("attorneys.slug"),
      name: t("attorneys.name"),
      tagline: t("attorneys.tagline"),
      services: [t("attorneys.s1"), t("attorneys.s2"), t("attorneys.s3"), t("attorneys.s4")],
      cta: t("attorneys.cta"),
    },
    {
      key: "cpas" as const,
      icon: Calculator,
      slug: t("cpas.slug"),
      name: t("cpas.name"),
      tagline: t("cpas.tagline"),
      services: [t("cpas.s1"), t("cpas.s2"), t("cpas.s3"), t("cpas.s4")],
      cta: t("cpas.cta"),
    },
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed">
            {t("subheadline")}
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {industries.map(({ icon: Icon, slug, name, tagline, services, cta }) => (
            <div
              key={slug}
              className="bg-white/5 border border-[--color-border] rounded-2xl p-8 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: name + tagline */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[--color-steel]" />
                    </div>
                    <h2
                      className="text-xl font-bold text-[--color-text]"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {name}
                    </h2>
                  </div>
                  <p className="text-sm text-[--color-muted] leading-relaxed mb-6">{tagline}</p>
                  <Link
                    href={`/${locale}/industries/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[--color-steel] hover:text-[--color-cta-hover] transition-colors"
                  >
                    {cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: services */}
                <div className="md:col-span-2">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-[--color-text]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-steel] flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
