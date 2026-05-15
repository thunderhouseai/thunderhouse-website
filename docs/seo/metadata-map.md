# Metadata Map — ThunderHouse

All page-level `<title>` and `<meta description>` values for both locales. These are implemented via `generateMetadata()` in each page file using i18n keys.

---

## Implementation Pattern

```ts
// app/[locale]/page.tsx (example)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `https://thunderhouseai.com/${locale}`,
      languages: {
        "en": "https://thunderhouseai.com/en",
        "es": "https://thunderhouseai.com/es",
      },
    },
  };
}
```

All canonical URLs use `https://thunderhouseai.com`. Update if the production domain changes.

---

## Home Page

| | English | Spanish |
|-|---------|---------|
| **Title** | ThunderHouse — AI Implementation for Professional Service Businesses | ThunderHouse — Implementación de IA para Negocios de Servicios Profesionales |
| **Description** | We find where your medical practice, law firm, or CPA firm is losing clients — then build AI systems to fix it. Serving Puerto Rico and Orlando. | Encontramos dónde tu consultorio, bufete o firma de CPA está perdiendo clientes — y lo arreglamos con sistemas de IA. Servimos a Puerto Rico y Orlando. |

---

## AI Intake Audit Page

| | English | Spanish |
|-|---------|---------|
| **Title** | Free AI Client Acquisition Audit — ThunderHouse | Auditoría Gratuita de Captación con IA — ThunderHouse |
| **Description** | Book your free 30-minute AI audit. We review your intake, follow-up, and operations — and deliver written findings. No pitch, no commitment. | Reserva tu auditoría de IA gratuita de 30 minutos. Revisamos tu captación, seguimiento y operaciones — y te entregamos un resumen escrito. Sin discurso de ventas. |

---

## Services Overview

| | English | Spanish |
|-|---------|---------|
| **Title** | AI Automation Services — ThunderHouse | Servicios de Automatización con IA — ThunderHouse |
| **Description** | Client intake automation, AI follow-up systems, and operations automation for medical practices, law firms, and CPA firms in Puerto Rico and Orlando. | Automatización de captación, sistemas de seguimiento con IA y automatización de operaciones para consultorios, bufetes y firmas de CPA en Puerto Rico y Orlando. |

---

## Client Intake Automation

| | English | Spanish |
|-|---------|---------|
| **Title** | Client Intake Automation — ThunderHouse | Automatización de Captación de Clientes — ThunderHouse |
| **Description** | Stop losing clients to slow intake. We build AI intake systems that capture leads instantly via SMS, WhatsApp, and web forms. Medical practices, law firms, and CPAs. | Deja de perder clientes por un proceso de captación lento. Construimos sistemas de IA que capturan prospectos al instante por SMS, WhatsApp y formularios web. |

---

## AI Follow-Up Systems

| | English | Spanish |
|-|---------|---------|
| **Title** | AI Follow-Up Systems — ThunderHouse | Sistemas de Seguimiento con IA — ThunderHouse |
| **Description** | Automated follow-up that reaches leads at the right time via SMS, WhatsApp, and email — without your staff lifting a finger. Built for professional service firms. | Seguimiento automatizado que llega a los prospectos en el momento correcto por SMS, WhatsApp y correo — sin que tu equipo mueva un dedo. |

---

## Operations Automation

| | English | Spanish |
|-|---------|---------|
| **Title** | Operations Automation — ThunderHouse | Automatización de Operaciones — ThunderHouse |
| **Description** | Cut the manual work. We automate document collection, government filings, and internal workflows for medical practices, law firms, and CPA firms. | Elimina el trabajo manual. Automatizamos la recopilación de documentos, radicaciones y flujos de trabajo internos para consultorios, bufetes y firmas de CPA. |

---

## Industries Overview

| | English | Spanish |
|-|---------|---------|
| **Title** | AI Automation for Medical Practices, Law Firms & CPA Firms — ThunderHouse | Automatización con IA para Consultorios, Bufetes y CPA — ThunderHouse |
| **Description** | ThunderHouse builds AI systems for doctors, attorneys, and CPAs in Puerto Rico and Orlando. Explore how we solve problems specific to your industry. | ThunderHouse construye sistemas de IA para médicos, abogados y contables en Puerto Rico y Orlando. |

---

## Medical Practices

| | English | Spanish |
|-|---------|---------|
| **Title** | AI Automation for Medical Practices Puerto Rico — ThunderHouse | Automatización con IA para Consultorios Médicos Puerto Rico — ThunderHouse |
| **Description** | We automate patient intake, appointment reminders, and clinic operations for medical practices in Puerto Rico and Orlando. | Automatizamos la captación de pacientes, recordatorios de citas y operaciones de consultorio para prácticas médicas en Puerto Rico y Orlando. |

---

## Law Firms

| | English | Spanish |
|-|---------|---------|
| **Title** | AI Automation for Law Firms Puerto Rico — ThunderHouse | Automatización con IA para Bufetes de Abogados Puerto Rico — ThunderHouse |
| **Description** | We automate legal intake, client follow-up, and document collection for law firms in Puerto Rico and Orlando. | Automatizamos la captación legal, el seguimiento de clientes y la recopilación de documentos para bufetes en Puerto Rico y Orlando. |

---

## CPA Firms

| | English | Spanish |
|-|---------|---------|
| **Title** | AI Automation for CPA Firms Puerto Rico — ThunderHouse | Automatización con IA para Firmas de CPA Puerto Rico — ThunderHouse |
| **Description** | We automate tax document collection, government filing workflows, and client follow-up for CPA firms in Puerto Rico and Orlando. | Automatizamos la recopilación de documentos, radicaciones de gobierno y seguimiento de clientes para firmas de CPA en Puerto Rico y Orlando. |

---

## Process Page

| | English | Spanish |
|-|---------|---------|
| **Title** | How ThunderHouse Works — AI Implementation Process | Cómo Funciona ThunderHouse — Proceso de Implementación de IA |
| **Description** | Five steps from audit to implementation: Audit, Diagnose, Build, Automate, Improve. Here's exactly what working with ThunderHouse looks like. | Cinco pasos desde la auditoría hasta la implementación: Auditoría, Diagnóstico, Construcción, Automatización, Mejora. |

---

## About Page

| | English | Spanish |
|-|---------|---------|
| **Title** | About ThunderHouse — AI Implementation for Puerto Rico & Orlando | Sobre ThunderHouse — Implementación de IA para Puerto Rico y Orlando |
| **Description** | ThunderHouse is a diagnostic-first AI implementation agency serving professional service businesses in Puerto Rico and Orlando. | ThunderHouse es una agencia de implementación de IA para negocios de servicios profesionales en Puerto Rico y Orlando. |

---

## Contact Page

| | English | Spanish |
|-|---------|---------|
| **Title** | Contact ThunderHouse — Get Your Free AI Audit | Contáctanos — Solicita Tu Auditoría de IA Gratis |
| **Description** | Tell us what's going on. We'll figure out where you're losing clients and what to do about it. No commitment required. | Cuéntanos qué está pasando. Averiguamos dónde estás perdiendo clientes y qué hacer al respecto. Sin compromiso. |

---

## Title Tag Format Rules

- Max 60 characters (Google truncates beyond this)
- Format: `[Page Topic] — ThunderHouse`
- Never use `|` as separator — use `—`
- Brand name always at the end
- Include a geographic term ("Puerto Rico") on at least the home, industry, and audit pages

## Description Rules

- Max 155 characters
- Include a primary keyword naturally
- End with a short action phrase or differentiator
- Never use "click here" or "learn more"
