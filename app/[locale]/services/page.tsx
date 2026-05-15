import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Users, MessageSquare, Settings } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CtaBanner } from "@/components/sections/CtaBanner";

const DOMAIN = "https://thunderhouse.io";
type ServiceKey = "intake" | "followup" | "operations";

const icons: Record<ServiceKey, React.ElementType> = {
  intake: Users,
  followup: MessageSquare,
  operations: Settings,
};

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
      languages: {
        en: `${DOMAIN}/en/services`,
        es: `${DOMAIN}/es/services`,
        "x-default": `${DOMAIN}/en/services`,
      },
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

  const services: ServiceKey[] = ["intake", "followup", "operations"];

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("services.eyebrow")}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("services.overview.headline")}
          </h1>
          <p className="text-[--color-muted]">{t("services.overview.sub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((key) => {
            const Icon = icons[key];
            const href = `/${locale}/services/${t(`services.${key}.slug` as `services.${ServiceKey}.slug`)}`;
            return (
              <Link key={key} href={href}>
                <Card pillar className="h-full cursor-pointer flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[--color-navy] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[--color-steel]" />
                    </div>
                    <h2
                      className="text-xl font-bold text-[--color-steel]"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {t(`services.${key}.name` as `services.${ServiceKey}.name`)}
                    </h2>
                  </div>
                  <p className="text-sm text-[--color-muted] mb-4 flex-1">
                    {t(`services.${key}.tagline` as `services.${ServiceKey}.tagline`)}
                  </p>
                  <p className="text-sm font-semibold text-[--color-steel]">
                    {t(`services.${key}.cta` as `services.${ServiceKey}.cta`)}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sm text-[--color-muted]">
          {t("services.not_sure")}{" "}
          <Link
            href={`/${locale}/ai-intake-audit`}
            className="text-[--color-steel] hover:text-[--color-cta-hover] underline underline-offset-2 transition-colors"
          >
            {t("services.not_sure")}
          </Link>
        </p>
      </div>
      <CtaBanner />
    </>
  );
}
