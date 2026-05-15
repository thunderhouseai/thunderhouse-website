# Component Plan — ThunderHouse

Design decisions behind each component and guidance for future development.

---

## New Components Added in This Build

### `LeakSystem`
**Why:** The 4 Leak System is the core diagnostic framework — the intellectual backbone of the ThunderHouse positioning. It needed its own dedicated section with visual identity (numbered cards, color coding per leak type) rather than being buried in the hero or problem section.

**Key decision:** Each leak card gets a colored gradient border (not a background fill) to maintain readability against the dark surface while signaling distinct categories.

**Future:** If client data supports it, add a small stat or outcome proof line under each leak description.

---

### `Industries`
**Why:** After the services section rebuild, it became clear that the target audience (doctors, attorneys, CPAs) needed explicit industry-level navigation. Visitors scan for themselves — they need to see "Medical Practices" and immediately think "that's me."

**Key decision:** Uses `Card` with `pillar` variant + `Stethoscope/Scale/Calculator` icons — functional and direct, not decorative.

**Future:** Industry cards on home page are intentionally brief. The detail lives on industry pages. Don't add pain points or long copy to the home industries section.

---

### `Faq`
**Why:** Every conversion page has objections. An FAQ accordion directly addresses skepticism at the exact moment visitors have doubts. The audit page and industry pages have the most specific objections.

**Key decision:** Single-open accordion (only one item open at a time) using `AnimatePresence`. Simple, focused, no clutter.

**Implementation note:** Props are `{ headline: string; items: { q: string; a: string }[] }` — all content is passed in from the page, making this reusable across the audit page and all three industry pages.

---

## Updated Components

### `Hero`
**Change:** Two-line headline split (`headline` + `headline_accent`). The accent line uses `--color-steel` to create visual emphasis on "Then we fix it."

**Why:** Single-line hero headlines at this length are hard to scan. The two-line split creates a natural pause and rhythm that reads like a statement + punch line.

**Primary CTA now → `/ai-intake-audit` (not Calendly directly)**. Home page visitors need to warm up before booking. The audit page handles final conversion.

---

### `Services`
**Change:** Complete restructure from `build/analyze/transform` to `intake/followup/operations`.

**Why:** Old service names described ThunderHouse's internal process, not the client's problem. New service names describe the client's situation — "my intake is broken", "my follow-up is broken", "my operations are broken."

**"Not sure" link** added below service cards → `/ai-intake-audit`. Visitors who can't self-identify a service get funneled to the audit where we diagnose it for them.

---

### `CtaBanner`
**Change:** Now a client component using `useLocale()`. Button links to `/${locale}/ai-intake-audit`.

**Why:** The CTA banner appears on every page. It must link correctly regardless of locale without hardcoding. The previous implementation had a static Calendly link — now all top-of-funnel pages go through the audit page first.

---

### `SocialProof`
**Change:** Removed client logo row (was placeholder `[TODO: Client Logo]` items). Kept 3 real case study summaries.

**Why:** Fake or placeholder logos actively harm trust. Real case study descriptions without logos are more credible than fake logos with vague descriptions.

---

### `Header`
**Change:** Added Industries dropdown, updated CTA destination to `/ai-intake-audit`.

**Key decision:** Industries dropdown is hover-triggered on desktop (uses CSS hover + ChevronDown animation), not click-triggered. This is the standard nav pattern and reduces accidental clicks.

**Mobile:** Industries are listed as a section header with indented links — no dropdown on mobile (dropdowns in mobile navs are UX friction).

---

## Component Patterns to Follow

### Server component with i18n arrays
```tsx
// For arrays in i18n
const items = t.raw("intake.solution_items") as string[];
// Then render:
{items.map((item, i) => (
  <li key={i}>{item}</li>
))}
```

### Client component with locale-aware link
```tsx
"use client";
import { useLocale } from "next-intl";
const locale = useLocale();
// Use: href={`/${locale}/ai-intake-audit`}
```

### Page with generateMetadata
```tsx
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "namespace" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `https://thunderhouseai.com/${locale}/path`,
      languages: {
        "en": `https://thunderhouseai.com/en/path`,
        "es": `https://thunderhouseai.com/es/path`,
      },
    },
  };
}
```

---

## Components Not to Build (Now)

| Component | Why deferred |
|-----------|-------------|
| Testimonial block | No real testimonials yet |
| Team bios section | No team photos/bios finalized |
| Blog/articles section | No content pipeline |
| Chat widget (rebuild) | Existing widget functions — leave it |
| Breadcrumb UI | Deferred — add with schema markup together |
| Cookie consent banner | Deferred — no analytics cookies yet |
