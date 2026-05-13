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
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("about_title"),
    description: t("about_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/about`,
      languages: { en: `${DOMAIN}/en/about`, es: `${DOMAIN}/es/about`, "x-default": `${DOMAIN}/en/about` },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed">{t("sub")}</p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2
              className="text-xl font-bold text-[--color-steel] mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t("mission_headline")}
            </h2>
            <p className="text-[--color-muted] leading-relaxed">{t("mission_body")}</p>
          </div>
          <div>
            <h2
              className="text-xl font-bold text-[--color-steel] mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t("market_headline")}
            </h2>
            <p className="text-[--color-muted] leading-relaxed">{t("market_body")}</p>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2
            className="text-2xl font-bold mb-10"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t("team_headline")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/5 border border-[--color-border] rounded-2xl p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[--color-navy] mx-auto mb-4" />
                {/* TODO: real photos + bios */}
                <p className="text-sm text-[--color-muted]">{t("team_placeholder")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
