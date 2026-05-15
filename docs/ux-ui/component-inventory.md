# Component Inventory — ThunderHouse

All components in the project with their location, purpose, and key props.

---

## Layout Components

### `Header` — `components/layout/Header.tsx`
Top navigation bar. Transparent on load, gains background on scroll.

**Key features:**
- Logo link → `/${locale}`
- Nav links: Services, Industries (dropdown), About, Process, Contact
- Industries dropdown (desktop hover): Doctors, Attorneys, CPAs + overview link
- CTA button → `/${locale}/ai-intake-audit`
- `LanguageSwitcher` component
- Mobile hamburger → full-panel menu with same links + bottom bar (CTA + switcher)

**State:** `useState` for scroll detection and mobile menu open/close
**i18n namespace:** `nav`

---

### `Footer` — `components/layout/Footer.tsx`
Four-column footer with brand info and navigation.

**Column structure:**
1. Brand: logo, tagline, LinkedIn + Instagram icons
2. Services: Intake Automation, Follow-Up Systems, Operations Automation
3. Industries: Medical Practices, Law Firms, CPA Firms
4. Company: Free AI Audit, About, How It Works, Contact

**i18n namespace:** `footer`

---

### `LanguageSwitcher` — `components/layout/LanguageSwitcher.tsx`
Toggles between `/en/[path]` and `/es/[path]`.

Uses `usePathname()` and `useRouter()` from `next-intl/navigation`.

---

## Section Components

### `Hero` — `components/sections/Hero.tsx`
Home page hero. Two-line headline + subheadline + two CTAs.

**Props:** (none — reads from `hero` i18n namespace)
**Key copy keys:** `headline`, `headline_accent`, `subheadline`, `cta_primary`, `cta_secondary`
**Animations:** `fadeUp` with staggered delays per element

---

### `LeakSystem` — `components/sections/LeakSystem.tsx`
The 4 Leak System diagnostic framework. 4 numbered cards + CTA.

**Layout:** 2×2 grid (desktop), 1-column (mobile)
**Card colors:** Blue (Visibility), Amber (Conversion), Red (Response), Purple (Operations)
**i18n namespace:** `leaks`

---

### `Services` — `components/sections/Services.tsx`
Three service cards: intake, follow-up, operations.

**Layout:** 3-column grid (desktop), stacked (mobile)
**Icons:** `Users`, `MessageSquare`, `Settings` from lucide-react
**Each card:** title, subheadline, tagline, link to service detail page
**"Not sure" link** → `/ai-intake-audit`
**i18n namespace:** `services`

---

### `Industries` — `components/sections/Industries.tsx`
Three industry cards: doctors, attorneys, CPAs.

**Layout:** 3-column grid (desktop), stacked (mobile)
**Icons:** `Stethoscope`, `Scale`, `Calculator`
**Each card:** industry name, tagline, CTA link → industry detail page
**i18n namespace:** `industries`
**Card variant:** `pillar`

---

### `Process` — `components/sections/Process.tsx`
5-step process: Audit → Diagnose → Build → Automate → Improve.

**Layout:** Numbered steps, alternating or stacked
**i18n namespace:** `process`

---

### `WhyUs` — `components/sections/WhyUs.tsx`
Three differentiator cards: Diagnostic First, Bilingual PR-Rooted, End-to-End Ownership.

**i18n namespace:** `why`

---

### `SocialProof` — `components/sections/SocialProof.tsx`
Real case study cards. No client logos. No testimonials.

**Content:** 3 case study summaries (medical clinic, Roomy Organizers, CPA firm)
**i18n namespace:** `proof`

---

### `CtaBanner` — `components/sections/CtaBanner.tsx`
Full-width conversion banner. Used at the bottom of most pages.

**Client component** — uses `useLocale()` and `useTranslations("cta")`
**Button href:** `/${locale}/ai-intake-audit`
**i18n namespace:** `cta`

---

### `Faq` — `components/sections/Faq.tsx`
Accordion FAQ. Used on audit page and industry pages.

**Props:**
```ts
{
  headline: string;
  items: { q: string; a: string }[];
}
```

**Behavior:** One item open at a time, AnimatePresence for smooth open/close
**State:** `useState<number | null>` for active index

---

## UI Primitives

### `Card` — `components/ui/Card.tsx`
Base card component.

**Variants:** `default`, `pillar`, `elevated`
**Props:** `variant?`, `className?`, `children`

---

### `Button` — `components/ui/Button.tsx`
Button component.

**Variants:** `primary`, `ghost`, `outline`
**Props:** `variant?`, `href?`, `onClick?`, `className?`, `children`

---

## Page Files

| Route | Page File |
|-------|-----------|
| `/[locale]` | `app/[locale]/page.tsx` |
| `/[locale]/ai-intake-audit` | `app/[locale]/ai-intake-audit/page.tsx` |
| `/[locale]/services` | `app/[locale]/services/page.tsx` |
| `/[locale]/services/client-intake-automation` | `app/[locale]/services/client-intake-automation/page.tsx` |
| `/[locale]/services/ai-follow-up-systems` | `app/[locale]/services/ai-follow-up-systems/page.tsx` |
| `/[locale]/services/operations-automation` | `app/[locale]/services/operations-automation/page.tsx` |
| `/[locale]/industries` | `app/[locale]/industries/page.tsx` |
| `/[locale]/industries/doctors` | `app/[locale]/industries/doctors/page.tsx` |
| `/[locale]/industries/attorneys` | `app/[locale]/industries/attorneys/page.tsx` |
| `/[locale]/industries/cpas` | `app/[locale]/industries/cpas/page.tsx` |
| `/[locale]/process` | `app/[locale]/process/page.tsx` |
| `/[locale]/about` | `app/[locale]/about/page.tsx` |
| `/[locale]/contact` | `app/[locale]/contact/page.tsx` |

---

## Non-Page Components

| Component | File | Purpose |
|-----------|------|---------|
| `ContactForm` | `app/[locale]/contact/ContactForm.tsx` | Client-side contact form with Prisma submission |
| `ChatWidget` | `components/chat/ChatWidget.tsx` | Streaming chat powered by Anthropic API |
| `AnimationVariants` | `lib/animations.ts` | Shared Framer Motion variant definitions |
