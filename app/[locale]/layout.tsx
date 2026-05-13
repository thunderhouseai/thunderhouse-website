import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";

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
      images: [{ url: `${DOMAIN}/images/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="h-full antialiased scroll-smooth">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
