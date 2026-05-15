# Build Plan — ThunderHouse

Technical architecture decisions, infrastructure, and build configuration.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.2.6 (Turbopack enabled) |
| i18n | next-intl | v4 |
| Styling | Tailwind CSS | v4 (CSS custom properties) |
| Animation | motion/react (Framer Motion) | current |
| Icons | lucide-react | current |
| Database | PostgreSQL + Prisma | current |
| Automation | n8n | self-hosted |
| AI chat | Anthropic API | streaming |
| Hosting | Hostinger VPS | — |
| Runtime | Node.js | LTS |

---

## Project Structure

```
/
├── app/
│   └── [locale]/
│       ├── page.tsx                    # Home
│       ├── layout.tsx                  # Root layout with Header/Footer
│       ├── ai-intake-audit/page.tsx    # Primary conversion page
│       ├── services/
│       │   ├── page.tsx                # Services overview
│       │   ├── client-intake-automation/page.tsx
│       │   ├── ai-follow-up-systems/page.tsx
│       │   └── operations-automation/page.tsx
│       ├── industries/
│       │   ├── page.tsx                # Industries overview
│       │   ├── doctors/page.tsx
│       │   ├── attorneys/page.tsx
│       │   └── cpas/page.tsx
│       ├── process/page.tsx
│       ├── about/page.tsx
│       └── contact/
│           ├── page.tsx
│           └── ContactForm.tsx         # Client component
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── LeakSystem.tsx              # NEW
│   │   ├── Services.tsx
│   │   ├── Industries.tsx              # NEW
│   │   ├── Process.tsx
│   │   ├── WhyUs.tsx
│   │   ├── SocialProof.tsx
│   │   ├── CtaBanner.tsx
│   │   └── Faq.tsx                     # NEW
│   └── ui/
│       ├── Card.tsx
│       └── Button.tsx
├── i18n/
│   ├── en.json                         # Full rewrite
│   └── es.json                         # Full rewrite
├── lib/
│   └── animations.ts                   # Framer Motion variants
├── public/
│   └── images/
│       ├── logo.png
│       ├── logo-mark.png
│       └── og-image.png                # TODO: Create
├── prisma/
│   └── schema.prisma
├── docs/                               # Documentation system
└── CLAUDE.md
```

---

## Routing

All routes are under `app/[locale]/`. The locale is always `en` or `es`, always present in the URL.

**Middleware:** `middleware.ts` handles locale detection and redirect:
- `/` → `/en` (default locale)
- Respects `Accept-Language` header

**next-intl config:** `localePrefix: "always"` — locale is always explicit in the URL.

**Slug strategy:** Same slugs for both locales (`/en/industries/doctors` and `/es/industries/doctors`). Translated slugs not implemented — see `docs/site-architecture/routing-model.md`.

---

## Server vs. Client Components

**Default: Server components.** Most page sections are server components.

**Client components (marked `"use client"`):**
- `Header.tsx` — needs scroll detection + mobile menu state
- `CtaBanner.tsx` — needs `useLocale()` and `useTranslations()` hooks
- `Faq.tsx` — needs accordion open/close state + AnimatePresence
- `ContactForm.tsx` — needs form state, event handlers, submission
- `LanguageSwitcher.tsx` — needs router for locale switch
- `ChatWidget` — needs streaming API response handling

**Server component i18n pattern:**
```ts
const t = await getTranslations({ locale, namespace: "services" });
const items = t.raw("intake.solution_items") as string[];
```

**Client component i18n pattern:**
```ts
const t = useTranslations("hero");
const text = t("headline");
```

---

## Build Commands

```bash
# Development (Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type check only
npx tsc --noEmit

# Lint
npm run lint
```

**Build verification:** The production build generates 34 routes (13 pages × 2 locales + API routes). Run `npm run build` and confirm 0 errors before any deployment.

---

## Environment Variables

```env
# Required for contact form
DATABASE_URL="postgresql://..."

# Required for AI chat widget
ANTHROPIC_API_KEY="sk-ant-..."

# Required for n8n contact webhook
N8N_WEBHOOK_URL="https://..."

# Optional: production domain
NEXT_PUBLIC_SITE_URL="https://thunderhouseai.com"
```

**n8n note:** Do NOT restart the n8n service during development. It runs as a background process on the VPS.

---

## Deployment

Hosted on Hostinger VPS. Deployment process:
1. Push to main branch
2. SSH into VPS
3. `git pull`
4. `npm run build`
5. Restart Next.js process (via PM2 or equivalent)

**Do NOT use `npm run dev` in production.** The production server uses `npm run start` with PM2.

---

## Known Technical Debt

| Issue | Severity | Notes |
|-------|----------|-------|
| `FormEvent` deprecated in ContactForm.tsx (line 39) | Hint (non-blocking) | Update to React 19 event type when stable |
| `frameBorder` deprecated in ContactForm.tsx (line 149) | Hint (non-blocking) | Replace with CSS border property |
| og-image.png missing from `/public/images/` | Medium | Referenced in metadata — needs real image |
| FAQs hardcoded in industry pages | Low | Move to i18n JSON if copy volume grows |
| No XML sitemap | Low | Add `next-sitemap` package post-launch |
| No breadcrumb UI or schema | Low | Implement with BreadcrumbList schema |
| No post-booking email automation | Low | n8n workflow planned |
