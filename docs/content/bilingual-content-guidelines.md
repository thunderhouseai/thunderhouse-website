# Bilingual Content Guidelines — ThunderHouse

## Core Principle

ThunderHouse is **natively bilingual** — not translated. This means:
- Spanish copy is written for a Puerto Rican business audience, not translated from English
- The intent and tone must match across both languages, but the exact wording may differ
- Both files (`i18n/en.json` and `i18n/es.json`) must be updated in the same commit

---

## Key i18n Rules

1. **All copy lives in JSON files.** Never hardcode strings in `.tsx` files.
2. **Always update both files together.** If you add a key to `en.json`, add it to `es.json` immediately.
3. **Key naming:** `namespace.element` — e.g., `hero.headline`, `audit.cta_button`
4. **Placeholder prefix:** Use `[TODO]` for any copy not yet translated or finalized.
5. **Arrays in JSON:** Use JSON arrays for items like `solution_items` — call them with `t.raw("key")` in server components.

---

## What to Adapt vs. What to Translate

| Type | Approach |
|------|----------|
| Headlines and CTAs | Adapt for Puerto Rico tone and impact, not word-for-word translation |
| Pain point descriptions | Adapt — Puerto Rico-specific phrasing may differ slightly |
| Process descriptions | Close translation is fine — these are factual |
| FAQ answers | Adapt — may require different examples or emphasis |
| Legal/compliance references | Be precise — use correct PR government terminology |
| UI labels (form fields, navigation) | Close translation is fine |

---

## Acceptable Anglicisms in Spanish Copy

These terms are commonly used in Puerto Rico business communication and do NOT need to be translated:

- email / correo electrónico (both are acceptable)
- WhatsApp (always capitalized)
- SMS
- follow-up (or use "seguimiento" — both are fine)
- intake (or use "captación" — both are fine)
- workflow (or use "flujo de trabajo")
- dashboard (or use "panel de control")
- app
- CRM
- Google Business Profile
- Calendly
- CPA (don't translate — use "contador" / "contable" for the role, "CPA" for the credential)

---

## Puerto Rico Spanish Conventions

**Use tú, not usted.** The copy uses informal second-person ("tú") throughout. This is appropriate for the Puerto Rican business communication style.

**Use natural PR business vocabulary:**
- "Consultorio" (not "oficina médica") for medical practice
- "Captación" for lead capture / client acquisition intake
- "Seguimiento" for follow-up
- "Prospecto" for lead/prospect
- "Radicación" for government filing (PR-specific)
- "Abogado" (not "licenciado" in website copy — "Lcdo." is formal, not conversational)
- "Contable" or "CPA" for accountant/CPA (not "contador público")

**Common phrasing:**
- "Estamos en Puerto Rico y Orlando" (not "ubicados en")
- "Hacemos..." (not "realizamos..." or "llevamos a cabo...")
- Natural contractions and flow — avoid bureaucratic phrasing

---

## Content Parity Checklist

Before publishing any page, verify:
- [ ] All `en.json` keys for this page have corresponding `es.json` keys
- [ ] No `[TODO]` placeholders remain in `es.json` for live copy
- [ ] Headlines and CTAs convey the same intent in both languages
- [ ] Industry-specific terminology is appropriate for each language
- [ ] FAQ answers in Spanish address the same concerns as English (not fewer)
- [ ] Metadata (title, description) is translated for both locales

---

## Review Process

If you are not a native Spanish speaker reviewing this copy:
1. Use the English version as the intent reference
2. Review the Spanish for natural reading flow — if it sounds like a translation, it probably is
3. Check that Puerto Rico-specific terms are used (not generic Latin American Spanish)
4. Verify that all CTAs in Spanish use the same action verbs as English (audit, request, get, see)

---

## How i18n Works in This Project

**Server components (pages):**
```ts
const t = await getTranslations({ locale, namespace: "services" });
const text = t("intake.hero_headline");
const array = t.raw("intake.solution_items") as string[];
```

**Client components:**
```ts
const t = useTranslations("hero");
const text = t("headline");
```

**Adding new keys:**
1. Add to `i18n/en.json` in the appropriate namespace
2. Add the same key to `i18n/es.json` immediately
3. Use `t("new.key")` in the component
4. Test both `/en/[page]` and `/es/[page]` before committing
