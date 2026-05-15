import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";

const DOMAIN = "https://thunderhouse.io";
const CALENDLY = "https://calendly.com/thunderhouseai/30min";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("attorneys_title"),
    description: t("attorneys_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/industries/attorneys`,
      languages: {
        en: `${DOMAIN}/en/industries/attorneys`,
        es: `${DOMAIN}/es/industries/attorneys`,
        "x-default": `${DOMAIN}/en/industries/attorneys`,
      },
    },
    openGraph: { title: t("attorneys_title"), description: t("attorneys_desc") },
  };
}

export default async function AttorneysPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  const tProcess = await getTranslations({ locale, namespace: "process" });

  const painPoints = [
    { title: t("attorneys.pain1_title"), body: t("attorneys.pain1_body") },
    { title: t("attorneys.pain2_title"), body: t("attorneys.pain2_body") },
    { title: t("attorneys.pain3_title"), body: t("attorneys.pain3_body") },
    { title: t("attorneys.pain4_title"), body: t("attorneys.pain4_body") },
  ];

  const services = [
    t("attorneys.s1"),
    t("attorneys.s2"),
    t("attorneys.s3"),
    t("attorneys.s4"),
  ];

  const processSteps = [
    { num: 1, title: tProcess("step1.title"), body: tProcess("step1.body") },
    { num: 2, title: tProcess("step2.title"), body: tProcess("step2.body") },
    { num: 3, title: tProcess("step3.title"), body: tProcess("step3.body") },
    { num: 4, title: tProcess("step4.title"), body: tProcess("step4.body") },
    { num: 5, title: tProcess("step5.title"), body: tProcess("step5.body") },
  ];

  const faqItems = [
    {
      q: locale === "es" ? "¿Qué tan rápido responde el sistema a una consulta?" : "How quickly does the system respond to an inquiry?",
      a: locale === "es" ? "Los sistemas de respuesta automática responden en segundos. Cuando alguien llena tu formulario de contacto o tu número recibe una llamada perdida, reciben un mensaje de texto o correo en menos de 60 segundos." : "Automated response systems respond within seconds. When someone fills out your contact form or your number receives a missed call, they get a text or email back in under 60 seconds.",
    },
    {
      q: locale === "es" ? "¿Cómo manejan la confidencialidad de los casos?" : "How do you handle case confidentiality?",
      a: locale === "es" ? "Los sistemas de captación e intake no almacenan información sensible del caso — solo recopilan datos de contacto básicos y el tipo de consulta legal. El detalle del caso ocurre en la consulta, no en el sistema de automatización." : "Intake and follow-up systems don't store sensitive case information — they only collect basic contact data and the type of legal inquiry. Case details happen in the consultation, not in the automation system.",
    },
    {
      q: locale === "es" ? "¿El sistema puede manejar múltiples áreas de práctica?" : "Can the system handle multiple practice areas?",
      a: locale === "es" ? "Sí. Los flujos de intake pueden enrutar prospectos a la práctica o abogado correcto según el tipo de caso — automáticamente y sin coordinación manual." : "Yes. Intake flows can route leads to the right practice area or attorney based on case type — automatically and without manual coordination.",
    },
    {
      q: locale === "es" ? "¿Esto funciona para firmas pequeñas o solo para las grandes?" : "Does this work for small firms or only large ones?",
      a: locale === "es" ? "Funciona especialmente bien para firmas pequeñas y medianas donde el personal juega múltiples roles. La automatización les da la capacidad de respuesta de una firma grande sin el personal adicional." : "It works especially well for small and mid-size firms where staff plays multiple roles. Automation gives them the response capacity of a large firm without the additional headcount.",
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
          >
            {t("attorneys.hero_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed mb-10">
            {t("attorneys.hero_sub")}
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[--color-cta] hover:bg-[--color-cta-hover] text-white font-semibold px-7 py-4 rounded-xl transition-colors text-base"
          >
            {locale === "es" ? "Solicitar Auditoría Gratis" : "Get Your Free Audit"}
          </a>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 bg-[--color-surface]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-10"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {locale === "es"
              ? "Cuatro problemas que vemos en casi todas las firmas"
              : "Four problems we see in almost every firm"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className="bg-white/5 border border-[--color-border] rounded-2xl p-6"
              >
                <h3
                  className="font-bold text-[--color-text] mb-2"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-[--color-muted] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we implement + Process */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {locale === "es" ? "Lo que implementamos" : "What we implement"}
            </h2>
            <ul className="flex flex-col gap-3 mb-8">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-[--color-text]">
                  <span className="w-2 h-2 rounded-full bg-[--color-steel] flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {tProcess("full_headline")}
            </h2>
            <ol className="flex flex-col gap-4">
              {processSteps.map((step) => (
                <li key={step.num} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[--color-navy] border border-[--color-steel] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[--color-steel]"
                    style={{ fontFamily: "Syne, sans-serif" }}>
                    {step.num}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs font-bold text-[--color-steel] tracking-wider mb-1"
                      style={{ fontFamily: "Syne, sans-serif" }}>
                      {step.title}
                    </p>
                    <p className="text-sm text-[--color-muted] leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA card */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[--color-navy] border border-[--color-steel]/30 rounded-2xl p-10 text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {t("attorneys.cta_headline")}
          </h2>
          <p className="text-[--color-muted] text-sm mb-8">{t("attorneys.cta_sub")}</p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[--color-cta] hover:bg-[--color-cta-hover] text-white font-semibold px-7 py-4 rounded-xl transition-colors"
          >
            {locale === "es" ? "Solicitar Auditoría Gratis" : "Get Your Free Audit"}
          </a>
        </div>
      </section>

      <Faq headline={locale === "es" ? "Preguntas Frecuentes" : "Common Questions"} items={faqItems} />
      <CtaBanner />
    </>
  );
}
