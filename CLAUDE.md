# CLAUDE.md — ThunderHouse Website

## 1. ROUTING MAP

| URL (EN)               | URL (ES)               | File path                                      | Description             |
|------------------------|------------------------|------------------------------------------------|-------------------------|
| /en                    | /es                    | app/[locale]/page.tsx                          | Home page               |
| /en/services           | /es/services           | app/[locale]/services/page.tsx                 | Services overview       |
| /en/services/build     | /es/services/build     | app/[locale]/services/build/page.tsx           | Build pillar detail     |
| /en/services/analyze   | /es/services/analyze   | app/[locale]/services/analyze/page.tsx         | Analyze pillar detail   |
| /en/services/transform | /es/services/transform | app/[locale]/services/transform/page.tsx       | Transform pillar detail |
| /en/about              | /es/about              | app/[locale]/about/page.tsx                    | About page              |
| /en/process            | /es/process            | app/[locale]/process/page.tsx                  | Process page            |
| /en/contact            | /es/contact            | app/[locale]/contact/page.tsx                  | Contact + Calendly      |
| —                      | —                      | app/api/health/route.ts                        | Coolify health check    |
| —                      | —                      | app/api/contact/route.ts                       | Contact form handler    |
| —                      | —                      | app/api/chat/route.ts                          | Claude streaming chat   |

## 2. i18n RULES

- All copy lives exclusively in `i18n/en.json` and `i18n/es.json`.
- Never hardcode English or Spanish strings in `.tsx` files.
- Always update both JSON files in the same commit.
- Key format: `section.element` (e.g., `hero.headline`, `contact.form.name`).
- Use `useTranslations("namespace")` in client components.
- Use `getTranslations({ locale, namespace })` in server components.
- Placeholder copy is prefixed with `[TODO]`.

## 3. COMPONENT INVENTORY

| Component            | File path                               | Description                           |
|----------------------|-----------------------------------------|---------------------------------------|
| Button               | components/ui/Button.tsx                | Primary/secondary/ghost CTA button    |
| Card                 | components/ui/Card.tsx                  | Glassmorphism card wrapper            |
| Badge                | components/ui/Badge.tsx                 | Label pill for case study badges      |
| Input / Textarea     | components/ui/Input.tsx                 | Styled form inputs with error state   |
| BoltIcon             | components/ui/BoltIcon.tsx              | SVG bolt icon with hover animation    |
| CountUp              | components/ui/CountUp.tsx               | Scroll-triggered number counter       |
| Header               | components/layout/Header.tsx            | Scroll-aware nav + mobile menu        |
| Footer               | components/layout/Footer.tsx            | Nav columns + social + copyright      |
| LanguageSwitcher     | components/layout/LanguageSwitcher.tsx  | EN/ES toggle with localStorage        |
| ChatWidget           | components/layout/ChatWidget.tsx        | Floating AI chat widget               |
| Hero                 | components/sections/Hero.tsx            | Full-viewport hero with stats         |
| Problem              | components/sections/Problem.tsx         | 4-card problem statement grid         |
| Services             | components/sections/Services.tsx        | 3 pillar cards                        |
| Process              | components/sections/Process.tsx         | 5-step animated timeline              |
| WhyUs                | components/sections/WhyUs.tsx           | 3-column why ThunderHouse             |
| SocialProof          | components/sections/SocialProof.tsx     | Client logos + case studies           |
| CtaBanner            | components/sections/CtaBanner.tsx       | Full-width navy CTA section           |

## 4. HOME PAGE SECTION ORDER

1. Hero
2. Problem
3. Services
4. Process
5. WhyUs
6. SocialProof
7. CtaBanner

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
