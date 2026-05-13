import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "./ContactForm";
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
    title: t("contact_title"),
    description: t("contact_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/contact`,
      languages: {
        en: `${DOMAIN}/en/contact`,
        es: `${DOMAIN}/es/contact`,
        "x-default": `${DOMAIN}/en/contact`,
      },
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
      <CtaBanner />
    </>
  );
}
