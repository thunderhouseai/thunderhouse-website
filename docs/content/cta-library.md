# CTA Library — ThunderHouse

All calls-to-action used across the site. Source of truth for button copy, links, and placement logic.

---

## Primary CTA (Tier 1)

The single most important action on every page.

| Context | English | Spanish | Destination |
|---------|---------|---------|-------------|
| Hero button | Get Your Free AI Audit | Solicita tu Auditoría Gratis | `/[locale]/ai-intake-audit` |
| Nav header | Get Free Audit | Auditoría Gratis | `/[locale]/ai-intake-audit` |
| CTA Banner | Get Your Free AI Audit | Solicita Tu Auditoría Gratis | `/[locale]/ai-intake-audit` |
| Audit page hero | Request My Free Audit | Solicitar Mi Auditoría Gratis | Calendly |
| Audit page CTA card | Book My Free Audit | Reservar Mi Auditoría Gratis | Calendly |
| Industry pages | Get Your Free Audit | Solicitar Auditoría Gratis | Calendly |
| Service pages | Get Your Free Audit | Solicitar Auditoría Gratis | Calendly |
| LeakSystem section | Get Your Free AI Audit | Solicita tu Auditoría Gratis | `/[locale]/ai-intake-audit` |

**Calendly URL:** `https://calendly.com/thunderhouseai/30min`

**Routing logic:**
- Most pages → `/ai-intake-audit` first (warms visitor before booking)
- Audit page and deep-funnel pages → Calendly directly (already qualified)

---

## Secondary CTA (Tier 2)

Support the primary action or offer an alternative path.

| Context | English | Spanish | Destination |
|---------|---------|---------|-------------|
| Hero | See How It Works | Ve Cómo Funciona | `/[locale]/process` |
| Services overview | Not sure? The audit tells you. | ¿No estás seguro? La auditoría te lo dice. | `/[locale]/ai-intake-audit` |
| LeakSystem section | (no secondary — one CTA only) | — | — |
| Industry pages | See How It Works | Ve Cómo Funciona | `/[locale]/process` |

---

## Tertiary CTAs (Tier 3)

Navigation and exploration — low pressure.

| Context | English | Spanish | Destination |
|---------|---------|---------|-------------|
| Services section (home) | Each service card | Cada tarjeta de servicio | `/[locale]/services/[slug]` |
| Industries section (home) | Learn more → | Conoce más → | `/[locale]/industries/[slug]` |
| Process section (home) | See Full Process | Ver Proceso Completo | `/[locale]/process` |
| Industries overview | "Industries →" dropdown link | "Industrias →" | `/[locale]/industries` |
| Footer | All footer nav links | All footer nav links | Respective pages |

---

## No-Pitch Lines (Trust Builders)

These are not CTAs but copy that accompanies primary CTAs to reduce friction.

| English | Spanish | Used on |
|---------|---------|---------|
| Free. No pitch. No commitment. The findings are yours. | Gratis. Sin discurso de ventas. Sin compromiso. Los hallazgos son tuyos. | Audit page hero |
| 30 minutes. Written summary. Zero obligation. | 30 minutos. Resumen escrito. Sin obligación. | CTA cards on deep pages |

---

## CTA Rules

1. **End with action verbs.** "Get", "Request", "Book", "See", "Solicita", "Solicitar", "Reserva", "Ve" — never "Learn More" or "Click Here."

2. **One primary CTA per section.** Never two buttons at the same visual weight.

3. **Audit page goes directly to Calendly.** Do not add an intermediate `/ai-intake-audit` redirect for visitors who are already on that page.

4. **CtaBanner always uses the audit CTA.** It never links to a service page or contact page — it is a conversion closer.

5. **Mobile CTAs:** The mobile nav bottom bar has the CTA button + language switcher. Do not remove the CTA from mobile nav.

6. **Do NOT use fake urgency.** No "limited slots", "act now", "last chance" copy — ever.

---

## i18n Keys Reference

```json
// en.json
"nav": {
  "cta": "Get Free Audit"
},
"hero": {
  "cta_primary": "Get Your Free AI Audit",
  "cta_secondary": "See How It Works"
},
"leaks": {
  "cta": "Get Your Free AI Audit"
},
"audit": {
  "hero_cta": "Request My Free Audit",
  "no_pitch": "Free. No pitch. No commitment. The findings are yours.",
  "cta_button": "Book My Free Audit"
},
"cta": {
  "headline": "Ready to find where you're losing clients?",
  "subheadline": "30 minutes. Written summary. Zero obligation.",
  "button": "Get Your Free AI Audit"
}
```
