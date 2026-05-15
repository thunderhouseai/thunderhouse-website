# CLAUDE.md — ThunderHouse Website

## 1. ROUTING MAP

| URL (EN)                                      | URL (ES)                                      | File path                                                           | Description                         |
|-----------------------------------------------|-----------------------------------------------|---------------------------------------------------------------------|-------------------------------------|
| /en                                           | /es                                           | app/[locale]/page.tsx                                               | Home page                           |
| /en/ai-intake-audit                           | /es/ai-intake-audit                           | app/[locale]/ai-intake-audit/page.tsx                               | Primary audit conversion page       |
| /en/services                                  | /es/services                                  | app/[locale]/services/page.tsx                                      | Services overview                   |
| /en/services/client-intake-automation         | /es/services/client-intake-automation         | app/[locale]/services/client-intake-automation/page.tsx             | Intake automation service detail    |
| /en/services/ai-follow-up-systems             | /es/services/ai-follow-up-systems             | app/[locale]/services/ai-follow-up-systems/page.tsx                 | Follow-up systems service detail    |
| /en/services/operations-automation            | /es/services/operations-automation            | app/[locale]/services/operations-automation/page.tsx                | Operations automation service detail|
| /en/industries                                | /es/industries                                | app/[locale]/industries/page.tsx                                    | Industries overview                 |
| /en/industries/doctors                        | /es/industries/doctors                        | app/[locale]/industries/doctors/page.tsx                            | Medical practices industry page     |
| /en/industries/attorneys                      | /es/industries/attorneys                      | app/[locale]/industries/attorneys/page.tsx                          | Law firms industry page             |
| /en/industries/cpas                           | /es/industries/cpas                           | app/[locale]/industries/cpas/page.tsx                               | CPA firms industry page             |
| /en/process                                   | /es/process                                   | app/[locale]/process/page.tsx                                       | Process page (Audit→Diagnose→Build→Automate→Improve) |
| /en/about                                     | /es/about                                     | app/[locale]/about/page.tsx                                         | About page                          |
| /en/contact                                   | /es/contact                                   | app/[locale]/contact/page.tsx                                       | Contact + Calendly                  |
| —                                             | —                                             | app/api/health/route.ts                                             | Coolify health check                |
| —                                             | —                                             | app/api/contact/route.ts                                            | Contact form handler                |
| —                                             | —                                             | app/api/chat/route.ts                                               | Claude streaming chat               |

**Note on translated slugs:** Both EN and ES use the same slug (e.g., /en/industries/doctors and /es/industries/doctors). Full translated slug routing (e.g., /es/industrias/doctores) is not implemented because next-intl pathnames config adds significant complexity for marginal SEO benefit at this project size. Document the choice in docs/site-architecture/routing-model.md.

## 2. i18n RULES

- All copy lives exclusively in `i18n/en.json` and `i18n/es.json`.
- Never hardcode English or Spanish strings in `.tsx` files.
- Always update both JSON files in the same commit.
- Key format: `namespace.element` (e.g., `hero.headline`, `contact.form.name`).
- Use `useTranslations("namespace")` in client components.
- Use `getTranslations({ locale, namespace })` in server components.
- Placeholder copy is prefixed with `[TODO]`.

**Active namespaces:**
- `nav` — Navigation labels
- `hero` — Home page hero
- `leaks` — The 4 Leak System section
- `services` — Service cards and detail pages (intake / followup / operations)
- `industries` — Industry cards and detail pages (doctors / attorneys / cpas)
- `audit` — AI Intake Audit landing page
- `process` — Process steps
- `whyus` — Why ThunderHouse section
- `proof` — Case studies and social proof
- `cta` — CTA banner
- `contact` — Contact form
- `about` — About page
- `chat` — Chat widget
- `footer` — Footer nav and copy
- `meta` — SEO metadata for all pages

## 3. COMPONENT INVENTORY

| Component            | File path                                           | Description                                     |
|----------------------|-----------------------------------------------------|-------------------------------------------------|
| Button               | components/ui/Button.tsx                            | Primary/secondary/ghost CTA button              |
| Card                 | components/ui/Card.tsx                              | Glassmorphism card wrapper                      |
| Badge                | components/ui/Badge.tsx                             | Label pill for case study badges                |
| Input / Textarea     | components/ui/Input.tsx                             | Styled form inputs with error state             |
| BoltIcon             | components/ui/BoltIcon.tsx                          | SVG bolt icon with hover animation              |
| CountUp              | components/ui/CountUp.tsx                           | Scroll-triggered number counter                 |
| Header               | components/layout/Header.tsx                        | Scroll-aware nav + Industries dropdown + mobile menu |
| Footer               | components/layout/Footer.tsx                        | Services / Industries / Company nav columns     |
| LanguageSwitcher     | components/layout/LanguageSwitcher.tsx              | EN/ES toggle with localStorage                  |
| ChatWidget           | components/layout/ChatWidget.tsx                    | Floating AI chat widget                         |
| Hero                 | components/sections/Hero.tsx                        | Full-viewport hero — two-line headline with accent |
| LeakSystem           | components/sections/LeakSystem.tsx                  | The 4 Leak System — numbered colored cards      |
| Services             | components/sections/Services.tsx                    | 3 service cards: intake / follow-up / operations|
| Industries           | components/sections/Industries.tsx                  | 3 industry cards: doctors / attorneys / cpas    |
| Process              | components/sections/Process.tsx                     | 5-step animated timeline                        |
| WhyUs                | components/sections/WhyUs.tsx                       | 3-column why ThunderHouse                       |
| SocialProof          | components/sections/SocialProof.tsx                 | Metric + 3 case study cards                     |
| CtaBanner            | components/sections/CtaBanner.tsx                   | Full-width navy CTA → /ai-intake-audit          |
| Faq                  | components/sections/Faq.tsx                         | Accordion FAQ — receives headline + items props |

## 4. HOME PAGE SECTION ORDER

1. Hero
2. LeakSystem (The 4 Leak System)
3. Services (intake / follow-up / operations)
4. Industries (doctors / attorneys / cpas)
5. Process
6. WhyUs
7. SocialProof
8. CtaBanner

ChatWidget floats on all pages via `app/[locale]/layout.tsx`.

## 5. API ROUTES

| Route         | Method | Purpose                               | External service          |
|---------------|--------|---------------------------------------|---------------------------|
| /api/health   | GET    | Coolify health check                  | None                      |
| /api/contact  | POST   | Save form → fire n8n webhook          | n8n, PostgreSQL           |
| /api/chat     | POST   | Stream Claude response for chat       | Anthropic API, PostgreSQL |

## 6. ENVIRONMENT VARIABLES

| Variable                     | Connects to                        |
|------------------------------|------------------------------------|
| ANTHROPIC_API_KEY            | Claude API (chat widget)           |
| RESEND_API_KEY               | Resend email fallback              |
| RESEND_FROM_EMAIL            | Sender address for Resend          |
| N8N_CONTACT_WEBHOOK_URL      | n8n contact form automation        |
| DATABASE_URL                 | PostgreSQL on Hostinger VPS        |
| NEXT_PUBLIC_UMAMI_WEBSITE_ID | Umami self-hosted analytics        |
| NEXT_PUBLIC_UMAMI_URL        | Umami instance URL                 |

## 7. DEPLOYMENT

Commands to run before each Coolify deploy:

```bash
npx prisma generate
npx prisma migrate deploy
npm run build
```

Coolify settings:
- Build command: `npm run build`
- Start command: `node .next/standalone/server.js`
- Port: `3000`
- Health check: `GET /api/health`
- `output: 'standalone'` is set in next.config.ts

n8n is already running on the VPS — do NOT install or restart it.

## 8. STRATEGIC NOTES

**Positioning:** ThunderHouse is NOT a generic AI agency. It is a diagnostic-first AI implementation agency for professional service businesses (doctors, attorneys, CPAs) in Puerto Rico and Orlando.

**Primary conversion path:** Home → AI Intake Audit page → Calendly booking

**The 4 Leak System:** Visibility, Conversion, Response, Operations — the diagnostic framework used to explain why businesses lose clients.

**Primary offer:** Free AI Client Acquisition Audit (30-minute call + written summary)

**No fake content:** Do not add fake testimonials, fake client logos, unsupported statistics, or fake case studies. The three existing case studies (Roomy Organizers, CPA firms, medical/non-profit/pet) are real client work.

**All copy in i18n:** Never hardcode copy in .tsx files. Use i18n for every visible string including CTA button text.

**See /docs/ for full strategic documentation.**
