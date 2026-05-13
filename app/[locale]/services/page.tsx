import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Hammer, BarChart3, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CtaBanner } from "@/components/sections/CtaBanner";

const DOMAIN = "https://thunderhouse.io";
type PillarKey = "build" | "analyze" | "transform";
type PillarServicesTransKey = `services.${PillarKey}.${"name" | "tagline" | "cta"}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("services_title"),
    description: t("services_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/services`,
      languages: { en: `${DOMAIN}/en/services`, es: `${DOMAIN}/es/services`, "x-default": `${DOMAIN}/en/services` },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const pillars = [
    { key: "build", icon: Hammer, href: `/${locale}/services/build` },
    { key: "analyze", icon: BarChart3, href: `/${locale}/services/analyze` },
    { key: "transform", icon: Sparkles, href: `/${locale}/services/transform` },
  ] as const;

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("services.eyebrow")}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("services.overview.headline")}
          </h1>
          <p className="mt-4 text-[--color-muted]">{t("services.overview.sub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ key, icon: Icon, href }) => (
            <Link key={key} href={href}>
              <Card pillar className="h-full cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[--color-steel]" />
                  </div>
                  <h2
                    className="text-xl font-bold text-[--color-steel]"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {t(`services.${key}.name` as PillarServicesTransKey)}
                  </h2>
                </div>
                <p className="text-sm text-[--color-muted]">
                  {t(`services.${key}.tagline` as PillarServicesTransKey)}
                </p>
                <p className="mt-4 text-sm font-semibold text-[--color-steel]">
                  {t(`services.${key}.cta` as PillarServicesTransKey)}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
