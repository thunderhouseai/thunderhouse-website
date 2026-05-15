# Routing Model — ThunderHouse

## Current Implementation

This site uses **next-intl v4** with `localePrefix: "always"`.

**Configuration file:** `i18n/routing.ts`
```ts
locales: ["en", "es"],
defaultLocale: "en",
localePrefix: "always"
```

This means:
- Every URL is prefixed with the locale: `/en/...` or `/es/...`
- There is no URL at `/services` — only `/en/services` or `/es/services`
- The middleware at `middleware.ts` handles locale detection and routing
- Switching languages is handled by `LanguageSwitcher` component which reads/writes to localStorage

---

## Why Translated Slugs Are NOT Implemented

**The case for translated slugs** (e.g., `/es/industrias/doctores` instead of `/es/industries/doctors`):
- Better Spanish-language SEO signals
- More natural URL for Spanish-first users
- Cleaner canonical handling

**The case against (chosen approach):**
- Requires configuring `pathnames` in next-intl routing config — adds significant complexity
- Requires either duplicate page files per locale or a rewrite layer
- Doubles the routing surface to maintain and test
- For a site of this scale, the SEO benefit is marginal vs. the maintenance cost
- Content-language signals from metadata, copy, and hreflang are more impactful than slug language

**Decision:** Use same slugs across both locales. Document the choice. Revisit if the site scales to a point where Spanish-language search performance becomes a priority gap.

**If you need to implement translated slugs in the future:**
1. Add `pathnames` config to `i18n/routing.ts`
2. Use `createNavigation` from next-intl to handle route resolution
3. Create locale-specific page files or use dynamic route resolution
4. Update all internal links to use the navigation helpers instead of string paths

---

## Middleware Behavior

The middleware in `middleware.ts` uses the next-intl middleware factory:
- Intercepts all requests matching the pattern (excluding `_next`, `api`, and static files)
- Redirects root `/` to `/en` (defaultLocale)
- Preserves the locale across navigation

**Matcher pattern:**
```
/((?!_next|_vercel|api|.*\\..*).*)
```

This correctly excludes:
- Next.js internal routes (`_next`)
- Vercel system routes (`_vercel`)
- API routes (`api`)
- Static files (anything with an extension)

---

## Language Switching

**Component:** `components/layout/LanguageSwitcher.tsx`

**Behavior:**
- Displays current locale as active
- Switches between `/en/...` and `/es/...` by replacing the locale prefix in the current URL
- Saves preference to localStorage
- Reads from localStorage on mount to restore preference

**Important:** The language switcher must preserve the current path when switching. E.g., switching from `/en/industries/doctors` should navigate to `/es/industries/doctors`, not `/es`.

---

## hreflang Implementation

hreflang alternates are implemented via `generateMetadata` in each page file.

**Pattern:**
```ts
alternates: {
  canonical: `${DOMAIN}/${locale}/[path]`,
  languages: {
    en: `${DOMAIN}/en/[path]`,
    es: `${DOMAIN}/es/[path]`,
    "x-default": `${DOMAIN}/en/[path]`,
  },
},
```

- `x-default` points to the English version (the default locale)
- All pages must include this metadata
- See `docs/seo/hreflang-plan.md` for verification guidance

---

## Adding New Pages

To add a new bilingual page:
1. Create `app/[locale]/[new-route]/page.tsx`
2. Add `generateMetadata` with hreflang alternates
3. Add content using `getTranslations({ locale, namespace: "..." })`
4. Add keys to both `i18n/en.json` and `i18n/es.json`
5. Update `CLAUDE.md` routing table
6. Update Footer and/or Header navigation
7. Add to `docs/site-architecture/sitemap.md`
