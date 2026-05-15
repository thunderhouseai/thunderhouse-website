import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { LeakSystem } from "@/components/sections/LeakSystem";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { SocialProof } from "@/components/sections/SocialProof";
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
    title: t("home_title"),
    description: t("home_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}`,
      languages: {
        en: `${DOMAIN}/en`,
        es: `${DOMAIN}/es`,
        "x-default": DOMAIN,
      },
    },
    openGraph: {
      title: t("home_title"),
      description: t("home_desc"),
      images: [{ url: `${DOMAIN}/images/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <LeakSystem />
      <Services />
      <Industries />
      <Process />
      <WhyUs />
      <SocialProof />
      <CtaBanner />
    </>
  );
}
