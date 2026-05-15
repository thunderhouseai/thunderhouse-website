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
    title: t("doctors_title"),
    description: t("doctors_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/industries/doctors`,
      languages: {
        en: `${DOMAIN}/en/industries/doctors`,
        es: `${DOMAIN}/es/industries/doctors`,
        "x-default": `${DOMAIN}/en/industries/doctors`,
      },
    },
    openGraph: { title: t("doctors_title"), description: t("doctors_desc") },
  };
}

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  const tProcess = await getTranslations({ locale, namespace: "process" });

  const painPoints = [
    { title: t("doctors.pain1_title"), body: t("doctors.pain1_body") },
    { title: t("doctors.pain2_title"), body: t("doctors.pain2_body") },
    { title: t("doctors.pain3_title"), body: t("doctors.pain3_body") },
    { title: t("doctors.pain4_title"), body: t("doctors.pain4_body") },
  ];

  const services = [
    t("doctors.s1"),
    t("doctors.s2"),
    t("doctors.s3"),
    t("doctors.s4"),
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
      q: locale === "es" ? "¿Cuánto tiempo toma implementar un sistema de recordatorios?" : "How long does it take to implement a reminder system?",
      a: locale === "es" ? "La mayoría de los sistemas de recordatorio de citas se implementan en 1 a 2 semanas. Empezamos con una auditoría de tu proceso actual, diseñamos el flujo, y lo integramos con tu sistema de agenda existente." : "Most appointment reminder systems are implemented in 1–2 weeks. We start with an audit of your current process, design the flow, and integrate it with your existing scheduling system.",
    },
    {
      q: locale === "es" ? "¿Con qué sistemas de agenda trabajan?" : "What scheduling systems do you work with?",
      a: locale === "es" ? "Trabajamos con la mayoría de los sistemas de agenda usados en consultorios médicos. Después de la auditoría, confirmamos compatibilidad e identificamos la mejor forma de integrar sin interrumpir tu operación actual." : "We work with most scheduling systems used in medical practices. After the audit, we confirm compatibility and identify the best integration approach without disrupting your current operation.",
    },
    {
      q: locale === "es" ? "¿El paciente tiene que descargar una app?" : "Does the patient need to download an app?",
      a: locale === "es" ? "No. Los recordatorios van por SMS, WhatsApp o correo electrónico directamente. No se requiere ninguna app ni registro por parte del paciente." : "No. Reminders are sent via SMS, WhatsApp, or email directly. No app download or patient registration required.",
    },
    {
      q: locale === "es" ? "¿Esto reemplaza a mi personal de recepción?" : "Does this replace my front desk staff?",
      a: locale === "es" ? "No. La automatización se encarga de las tareas repetitivas — recordatorios, confirmaciones, recopilación de documentos — para que tu personal se enfoque en atender a los pacientes en persona y resolver situaciones que requieren criterio humano." : "No. Automation handles the repetitive tasks — reminders, confirmations, document collection — so your staff can focus on in-person patient care and situations that require human judgment.",
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
            {t("doctors.hero_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed mb-10">
            {t("doctors.hero_sub")}
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
              ? "Cuatro problemas que vemos en casi todos los consultorios"
              : "Four problems we see in almost every practice"}
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

      {/* What we implement */}
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

          {/* Process steps */}
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
            {t("doctors.cta_headline")}
          </h2>
          <p className="text-[--color-muted] text-sm mb-8">{t("doctors.cta_sub")}</p>
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
