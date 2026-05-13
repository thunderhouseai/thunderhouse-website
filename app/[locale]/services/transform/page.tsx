import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";

const DOMAIN = "https://thunderhouse.io";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `Transform — ThunderHouse`,
    alternates: {
      canonical: `${DOMAIN}/${locale}/services/transform`,
      languages: { en: `${DOMAIN}/en/services/transform`, es: `${DOMAIN}/es/services/transform`, "x-default": `${DOMAIN}/en/services/transform` },
    },
  };
}

export default async function TransformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const services = [t("transform.s1"), t("transform.s2"), t("transform.s3"), t("transform.s4")];

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("transform.name")}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("transform.hero_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed">{t("transform.hero_sub")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s}
              className="bg-white/5 border border-[--color-border] rounded-2xl p-6"
            >
              <h3
                className="font-bold text-[--color-text] mb-2"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {s}
              </h3>
              {/* TODO: expand with detailed service descriptions */}
              <p className="text-sm text-[--color-muted]">
                Strategic transformation built around your team, your clients, and your goals.
              </p>
            </div>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
