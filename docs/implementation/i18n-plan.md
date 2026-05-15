# i18n Plan — ThunderHouse

How internationalization (next-intl v4) is configured and used in this project.

---

## Configuration

**Library:** next-intl v4
**Locale prefix strategy:** `always` — locale is always present in the URL (`/en/...`, `/es/...`)
**Default locale:** `en`
**Supported locales:** `en`, `es`

**Config files:**
- `i18n/routing.ts` — defines supported locales and prefix strategy
- `i18n/request.ts` — loads the correct message file per request
- `middleware.ts` — handles locale detection and redirect
- `i18n/en.json` — English messages
- `i18n/es.json` — Spanish messages

---

## Namespace Structure

All keys are namespaced. The top-level key is the namespace; sub-keys are the actual strings.

```
nav.*          — Header navigation
hero.*         — Home page hero section
leaks.*        — The 4 Leak System section
services.*     — Services section and all service pages
industries.*   — Industries section and all industry pages
audit.*        — AI Intake Audit page
process.*      — Process section and page
why.*          — Why Us section
proof.*        — Social Proof section
cta.*          — Global CTA Banner
contact.*      — Contact page and form
about.*        — About page
footer.*       — Footer navigation
home.*         — Home page metadata only
```

---

## Key Naming Convention

`namespace.element` or `namespace.group.element`

**Examples:**
- `hero.headline`
- `services.intake.title`
- `services.intake.solution_items` (array)
- `audit.checks.visibility.title`
- `industries.doctors.name`

---

## Array Keys

Some keys in the JSON are arrays, not strings. This is used for solution item lists in service pages.

**Example in `en.json`:**
```json
"services": {
  "intake": {
    "solution_items": [
      "Instant lead capture via web form, SMS, and WhatsApp",
      "Automated confirmation messages sent immediately",
      "Lead data synced to your CRM or internal system",
      "Staff notified in real time — no missed inquiries"
    ]
  }
}
```

**Accessing arrays in server components:**
```ts
const items = t.raw("intake.solution_items") as string[];
```

**Note:** `t()` only returns strings. Use `t.raw()` for arrays. Do not call `t("intake.solution_items")` — it will throw or return `[object Object]`.

---

## Server vs. Client Component i18n

**Server components (pages and most sections):**
```ts
import { getTranslations } from "next-intl/server";

const t = await getTranslations({ locale, namespace: "services" });
const text = t("intake.hero_headline");
const array = t.raw("intake.solution_items") as string[];
```

**Client components:**
```ts
"use client";
import { useTranslations } from "next-intl";

const t = useTranslations("hero");
const text = t("headline");
```

**Client components that also need locale for link construction:**
```ts
import { useLocale } from "next-intl";
const locale = useLocale();
// href={`/${locale}/ai-intake-audit`}
```

---

## Adding New Keys

When adding any new copy:

1. Add the key to `i18n/en.json` in the correct namespace
2. Add the same key to `i18n/es.json` immediately — never commit one without the other
3. Use `[TODO]` prefix in `es.json` if the Spanish copy is not yet written
4. Test both `/en/[page]` and `/es/[page]` before merging

---

## What Is NOT in i18n

The following content is **not** in the JSON files (by design):

| Content | Location | Reason |
|---------|----------|--------|
| Industry page FAQs | Hardcoded in page files with locale conditional | Simpler at current scale |
| Industry page pain points | Hardcoded in page files | Same reason |
| Calendly URL | Hardcoded constant or env variable | Not translateable |
| Social media URLs | Hardcoded in Footer | Not translateable |
| Email addresses | Hardcoded | Not translateable |

If the bilingual content model expands, the industry FAQs and pain points should be moved to i18n JSON arrays using `t.raw()`.

---

## Slug Translation

**Status: Not implemented.**

Both locales use the same URL slugs:
- `/en/industries/doctors` and `/es/industries/doctors` (not `/es/industrias/medicos`)

**Reason:** next-intl v4 supports the `pathnames` config for translated slugs, but this requires a significant amount of additional configuration and every link across the site must use the typed pathnames system. The complexity wasn't justified at launch.

**If you need translated slugs later:**
1. Add `pathnames` to `i18n/routing.ts`
2. Update all `<Link>` components to use typed hrefs
3. Update the `LanguageSwitcher` to use the `useRouter` pathname mapping
4. Update `generateMetadata` canonical/alternate URLs

---

## Metadata i18n Pattern

Each page generates its own metadata with translated title and description:

```ts
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

Metadata keys (`meta_title`, `meta_description`) live in the page's primary namespace. See `docs/seo/metadata-map.md` for all values.
