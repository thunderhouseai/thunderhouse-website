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
    title: t("process_title"),
    description: t("process_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/process`,
      languages: { en: `${DOMAIN}/en/process`, es: `${DOMAIN}/es/process`, "x-default": `${DOMAIN}/en/process` },
    },
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });

  const steps = [
    { num: 1, title: t("step1.title"), body: t("step1.body") },
    { num: 2, title: t("step2.title"), body: t("step2.body") },
    { num: 3, title: t("step3.title"), body: t("step3.body") },
    { num: 4, title: t("step4.title"), body: t("step4.body") },
    { num: 5, title: t("step5.title"), body: t("step5.body") },
  ];

  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-[--color-steel] mb-4">
            {t("eyebrow")}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("full_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed">{t("full_sub")}</p>
        </div>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex gap-8 items-start py-12 ${i < steps.length - 1 ? "border-b border-[--color-border]" : ""}`}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[--color-navy] border-2 border-[--color-steel] flex items-center justify-center">
                <span
                  className="text-lg font-bold text-[--color-steel]"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {step.num}
                </span>
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-[--color-steel] mb-3 tracking-wider"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {step.title}
                </h2>
                <p className="text-[--color-muted] leading-relaxed max-w-2xl">{step.body}</p>
                {/* TODO: expand with deliverables per step */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
