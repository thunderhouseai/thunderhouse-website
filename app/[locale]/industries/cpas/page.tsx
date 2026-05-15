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
    title: t("cpas_title"),
    description: t("cpas_desc"),
    alternates: {
      canonical: `${DOMAIN}/${locale}/industries/cpas`,
      languages: {
        en: `${DOMAIN}/en/industries/cpas`,
        es: `${DOMAIN}/es/industries/cpas`,
        "x-default": `${DOMAIN}/en/industries/cpas`,
      },
    },
    openGraph: { title: t("cpas_title"), description: t("cpas_desc") },
  };
}

export default async function CpasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  const tProcess = await getTranslations({ locale, namespace: "process" });

  const painPoints = [
    { title: t("cpas.pain1_title"), body: t("cpas.pain1_body") },
    { title: t("cpas.pain2_title"), body: t("cpas.pain2_body") },
    { title: t("cpas.pain3_title"), body: t("cpas.pain3_body") },
    { title: t("cpas.pain4_title"), body: t("cpas.pain4_body") },
  ];

  const services = [
    t("cpas.s1"),
    t("cpas.s2"),
    t("cpas.s3"),
    t("cpas.s4"),
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
      q: locale === "es" ? "¿Cuándo es el mejor momento para implementar esto?" : "When is the best time to implement this?",
      a: locale === "es" ? "Antes de la próxima temporada de radicación. Los sistemas toman de 1 a 3 semanas en implementarse. Si lo haces entre temporadas, llegas preparado con automatización funcionando cuando más lo necesitas." : "Before the next filing season. Systems take 1–3 weeks to implement. Getting this done between seasons means you arrive prepared with automation running when you need it most.",
    },
    {
      q: locale === "es" ? "¿Funciona con nuestro software de contabilidad actual?" : "Does this work with our current accounting software?",
      a: locale === "es" ? "La mayoría de los flujos de automatización operan en paralelo con tu software de contabilidad — no reemplazan el software, sino el trabajo manual de comunicación y coordinación alrededor de él. Confirmamos compatibilidad durante la auditoría." : "Most automation flows operate alongside your accounting software — they don't replace the software, they replace the manual communication and coordination work around it. We confirm compatibility during the audit.",
    },
    {
      q: locale === "es" ? "¿Los clientes tendrán que aprender algo nuevo?" : "Will clients need to learn anything new?",
      a: locale === "es" ? "El mínimo posible. Los sistemas de recopilación de documentos están diseñados para ser simples — una solicitud por mensaje, sin portales complicados, sin pasos adicionales. La mayoría de los clientes solo responden al mensaje con los documentos adjuntos." : "As little as possible. Document collection systems are designed to be simple — one request per message, no complicated portals, no extra steps. Most clients just reply to the message with documents attached.",
    },
    {
      q: locale === "es" ? "¿Qué pasa si un cliente no responde a los recordatorios?" : "What happens if a client doesn't respond to reminders?",
      a: locale === "es" ? "El sistema envía una secuencia de recordatorios espaciados estratégicamente — por ejemplo, a los 3, 7 y 14 días. Si no hay respuesta después de la secuencia, el sistema te notifica para que tu equipo intervenga con una llamada personal." : "The system sends a strategically spaced reminder sequence — for example, at 3, 7, and 14 days. If there's still no response after the sequence, the system flags it for your team to follow up with a personal call.",
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
            {t("cpas.hero_headline")}
          </h1>
          <p className="text-[--color-muted] text-lg leading-relaxed mb-10">
            {t("cpas.hero_sub")}
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
              ? "Cuatro problemas que vemos en casi todas las firmas de CPA"
              : "Four problems we see in almost every CPA firm"}
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
            {t("cpas.cta_headline")}
          </h2>
          <p className="text-[--color-muted] text-sm mb-8">{t("cpas.cta_sub")}</p>
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
