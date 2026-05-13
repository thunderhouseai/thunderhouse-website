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
    title: `Build — ThunderHouse`,
    alternates: {
      canonical: `${DOMAIN}/${locale}/services/build`,
      languages: { en: `${DOMAIN}/en/services/build`, es: `${DOMAIN}/es/services/build`, "x-default": `${DOMAIN}/en/services/build` },
    },
  };
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const services = [t("build.s1"), t("build.s2"), t("build.s3")];

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("build.name")}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("build.hero_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed">{t("build.hero_sub")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                Custom-built to your business. Powered by AI. Delivered with full support.
              </p>
            </div>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
