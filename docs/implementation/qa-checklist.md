# QA Checklist — ThunderHouse

Pre-launch and pre-deploy verification checklist.

---

## Build Verification

- [ ] `npm run build` passes with 0 errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No lint errors (`npm run lint`)
- [ ] All 34 routes generated (13 pages × 2 locales + API/internal routes)

---

## Bilingual Content

- [ ] Every page renders correctly at `/en/[path]`
- [ ] Every page renders correctly at `/es/[path]`
- [ ] No `[TODO]` placeholders visible in the rendered Spanish pages
- [ ] All `en.json` keys have corresponding `es.json` keys (no missing keys)
- [ ] Language switcher correctly switches all pages between EN and ES
- [ ] Language switcher preserves current page (not just switches to home)

---

## Navigation

- [ ] Logo links to correct locale home (`/en` or `/es`)
- [ ] All nav links work in both locales
- [ ] Industries dropdown opens on hover (desktop)
- [ ] Industries dropdown links navigate correctly
- [ ] Mobile hamburger menu opens and closes
- [ ] Mobile industries links are visible and work
- [ ] CTA button in header → `/[locale]/ai-intake-audit`
- [ ] Footer links all work in both locales

---

## Page-Level Checks

### Home (`/en`, `/es`)
- [ ] Hero renders two-line headline correctly
- [ ] Both CTA buttons work: audit page and process page
- [ ] LeakSystem 4 cards render with correct colors
- [ ] LeakSystem CTA works
- [ ] Services section links to correct service pages
- [ ] "Not sure?" link → `/[locale]/ai-intake-audit`
- [ ] Industries section links to correct industry pages
- [ ] SocialProof: no placeholder logos, no fake testimonials

### AI Intake Audit (`/en/ai-intake-audit`, `/es/ai-intake-audit`)
- [ ] Hero CTA → Calendly (opens in new tab or same tab — check expected behavior)
- [ ] "What We Check" 5 cards display correctly
- [ ] "What You Receive" checklist renders all 5 items
- [ ] CTA card → Calendly
- [ ] FAQ accordion opens and closes smoothly
- [ ] All 5 FAQ items display correctly

### Service Pages (all 3)
- [ ] Solution items render as list (via `t.raw()`)
- [ ] CTA → Calendly
- [ ] CtaBanner → audit page

### Industry Pages (all 3)
- [ ] Pain points cards render (4 cards per page)
- [ ] FAQ accordion works
- [ ] CTA card → Calendly
- [ ] CtaBanner → audit page

### Contact Page
- [ ] Form submits successfully (test with real data)
- [ ] Form shows success/error state
- [ ] All form fields have correct labels in both locales
- [ ] Service dropdown shows correct options in both locales

---

## SEO Checks

- [ ] Each page has unique `<title>` tag (check in browser dev tools)
- [ ] Each page has `<meta name="description">` with unique content
- [ ] hreflang tags present on every page (`<link rel="alternate" hreflang="...">`)
- [ ] Canonical URL present and correct on every page
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`)
- [ ] `og:image` file exists at `/public/images/og-image.png` **[OUTSTANDING TODO]**
- [ ] No duplicate title tags across pages

---

## Performance

- [ ] No console errors in browser dev tools
- [ ] No hydration errors (check console on page load)
- [ ] Images use `next/image` with proper `alt` text
- [ ] Largest Contentful Paint visible content loads quickly (hero section)
- [ ] Animations trigger on scroll (not on page load before scroll)

---

## Accessibility

- [ ] All images have descriptive `alt` attributes
- [ ] Interactive elements (buttons, links) have visible focus states
- [ ] Color contrast sufficient for body text (dark background / light text)
- [ ] FAQ accordion is keyboard navigable (Tab, Enter/Space to toggle)
- [ ] Language attribute set correctly: `<html lang="en">` or `<html lang="es">`

---

## Mobile

- [ ] All pages are readable on mobile (no horizontal scroll)
- [ ] Hero text doesn't overflow on 375px width
- [ ] Card grids stack correctly on mobile (not side-scrollable)
- [ ] Header hamburger menu accessible on mobile
- [ ] CTA buttons full-width or appropriately sized on mobile

---

## External Links

- [ ] Calendly link is correct: `https://calendly.com/thunderhouseai/30min`
- [ ] LinkedIn link works (Footer + About)
- [ ] Instagram link works (Footer + About)
- [ ] All external links open safely (no `rel="opener"` without `noopener`)

---

## Known Outstanding Items (at launch)

| Item | Status | Priority |
|------|--------|----------|
| `og-image.png` — needs real image | Missing | High |
| Google Business Profile — create/claim | Not started | High |
| Google Search Console — verify domain | Not started | High |
| XML sitemap | Not implemented | Medium |
| BreadcrumbList schema + UI | Not implemented | Low |
| Schema markup (LocalBusiness, FAQ) | Not implemented | Medium |
| Phone number in footer/contact | Not confirmed | Medium |
| Team bios on About page | Placeholder | Low |
| Post-booking email automation (n8n) | Not implemented | Low |
