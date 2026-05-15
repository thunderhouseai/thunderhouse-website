# hreflang Plan — ThunderHouse

hreflang tells search engines which pages are language/region alternates of each other, preventing duplicate content penalties for bilingual sites.

---

## Implementation Status

**Status: Implemented** — hreflang alternates are included in `generateMetadata()` on all pages.

---

## Pattern Used

Every page's `generateMetadata()` returns alternates in this format:

```ts
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    // ... title, description
    alternates: {
      canonical: `https://thunderhouseai.com/${locale}/[path]`,
      languages: {
        "en": `https://thunderhouseai.com/en/[path]`,
        "es": `https://thunderhouseai.com/es/[path]`,
      },
    },
  };
}
```

This generates `<link rel="alternate" hreflang="en" href="...">` and `<link rel="alternate" hreflang="es" href="...">` in the page `<head>`.

---

## hreflang Values Used

| Tag | Meaning |
|-----|---------|
| `en` | English version |
| `es` | Spanish version |

**Note:** We use `en` and `es` (not `en-US` and `es-PR`). This is intentional — it maximizes reach across all English and Spanish speakers rather than targeting a single country code. If traffic data shows that Orlando users are predominantly English and PR users predominantly Spanish, revisit adding `es-PR` for more precise targeting.

---

## URL Pair Map

| English URL | Spanish URL |
|-------------|-------------|
| `/en` | `/es` |
| `/en/ai-intake-audit` | `/es/ai-intake-audit` |
| `/en/services` | `/es/services` |
| `/en/services/client-intake-automation` | `/es/services/client-intake-automation` |
| `/en/services/ai-follow-up-systems` | `/es/services/ai-follow-up-systems` |
| `/en/services/operations-automation` | `/es/services/operations-automation` |
| `/en/industries` | `/es/industries` |
| `/en/industries/doctors` | `/es/industries/doctors` |
| `/en/industries/attorneys` | `/es/industries/attorneys` |
| `/en/industries/cpas` | `/es/industries/cpas` |
| `/en/process` | `/es/process` |
| `/en/about` | `/es/about` |
| `/en/contact` | `/es/contact` |

**Same slug strategy:** Both locales use identical slugs (e.g., `/doctors` not `/medicos`). This was a deliberate choice — see `docs/site-architecture/routing-model.md` for rationale.

---

## Self-Referencing Canonical

Each page's canonical URL points to itself. The canonical and hreflang work together:

```html
<!-- On /en/industries/doctors -->
<link rel="canonical" href="https://thunderhouseai.com/en/industries/doctors" />
<link rel="alternate" hreflang="en" href="https://thunderhouseai.com/en/industries/doctors" />
<link rel="alternate" hreflang="es" href="https://thunderhouseai.com/es/industries/doctors" />
```

This is the correct pattern — hreflang always includes a self-referencing alternate.

---

## Sitemap hreflang

Google also recommends including hreflang in the XML sitemap. If a sitemap is generated (via `next-sitemap` or manual), include both locale URLs as alternates for each page.

**next-sitemap config (if used):**
```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://thunderhouseai.com',
  alternateRefs: [
    { href: 'https://thunderhouseai.com/en', hreflang: 'en' },
    { href: 'https://thunderhouseai.com/es', hreflang: 'es' },
  ],
};
```

---

## Validation

Verify hreflang after deployment:
1. Use Google Search Console → International Targeting report
2. Use hreflang checker tools (e.g., Ahrefs or Merkle's hreflang validator)
3. Check that both locales are indexed in Google (`site:thunderhouseai.com/en` and `site:thunderhouseai.com/es`)

**Common errors to watch for:**
- Missing self-referencing alternate (causes hreflang to be ignored)
- Return tag missing (EN page references ES page but ES page doesn't reference EN page back)
- Canonical conflicts with hreflang (canonical should match the hreflang self-reference)
