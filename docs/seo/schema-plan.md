# Schema Markup Plan — ThunderHouse

Structured data (JSON-LD) to implement for Google rich results and local SEO.

---

## Priority Order

1. `LocalBusiness` — home page (highest impact for local SEO)
2. `FAQPage` — audit page and industry pages (FAQ rich results)
3. `BreadcrumbList` — all inner pages (navigation schema)
4. `Service` — service detail pages
5. `Organization` — global (sitewide)

---

## 1. LocalBusiness Schema

**Page:** Home (`/en`, `/es`)
**Goal:** Appear in Google local results for "AI automation Puerto Rico"

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ThunderHouse",
  "description": "AI implementation for professional service businesses. We find where you're losing clients and build systems to fix it.",
  "url": "https://thunderhouseai.com",
  "logo": "https://thunderhouseai.com/images/logo.png",
  "image": "https://thunderhouseai.com/images/og-image.png",
  "telephone": "[TO ADD when business phone is confirmed]",
  "email": "hello@thunderhouseai.com",
  "address": [
    {
      "@type": "PostalAddress",
      "addressRegion": "PR",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "addressCountry": "US"
    }
  ],
  "areaServed": [
    { "@type": "State", "name": "Puerto Rico" },
    { "@type": "City", "name": "Orlando" }
  ],
  "knowsLanguage": ["en", "es"],
  "serviceType": [
    "Client Intake Automation",
    "AI Follow-Up Systems",
    "Operations Automation"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/thunderhouseai",
    "https://www.instagram.com/thunderhouseai"
  ]
}
```

**TODO:** Add phone number when available.

---

## 2. FAQPage Schema

**Pages:** `/en/ai-intake-audit`, `/en/industries/doctors`, `/en/industries/attorneys`, `/en/industries/cpas`

Implemented for each FAQ accordion on those pages. The schema mirrors the visible FAQ items.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What happens during the audit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's a 30-minute call where we review your current intake process, follow-up systems, and online presence. After the call, you receive a written summary of findings and prioritized recommendations."
      }
    }
    // ... additional FAQ items
  ]
}
```

**Implementation note:** The `Faq` component currently renders the accordion but does not inject JSON-LD. Schema should be added as a `<script type="application/ld+json">` tag inside each page's `generateMetadata` or as a separate `<JsonLd>` component alongside `Faq`.

---

## 3. BreadcrumbList Schema

**Pages:** All inner pages (not home)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://thunderhouseai.com/en"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Industries",
      "item": "https://thunderhouseai.com/en/industries"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Medical Practices",
      "item": "https://thunderhouseai.com/en/industries/doctors"
    }
  ]
}
```

**Status:** Not yet implemented. Breadcrumb UI is also not yet implemented (see `navigation-model.md`). Schema and UI should be added together.

---

## 4. Service Schema

**Pages:** Service detail pages

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Client Intake Automation",
  "provider": {
    "@type": "Organization",
    "name": "ThunderHouse"
  },
  "description": "We build automated intake systems for medical practices, law firms, and CPA firms that capture leads via SMS, WhatsApp, and web forms.",
  "areaServed": ["Puerto Rico", "Orlando"],
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Professional Service Businesses"
  }
}
```

---

## 5. Organization Schema

**Global:** Add to `layout.tsx` or a global JSON-LD component.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ThunderHouse",
  "url": "https://thunderhouseai.com",
  "logo": "https://thunderhouseai.com/images/logo.png",
  "foundingDate": "2024",
  "knowsLanguage": ["en", "es"],
  "sameAs": [
    "https://www.linkedin.com/company/thunderhouseai",
    "https://www.instagram.com/thunderhouseai"
  ]
}
```

---

## Implementation Notes

- All schema goes in `<script type="application/ld+json">` tags
- Do NOT use React Helmet — use Next.js `metadata` or a server component that renders the script tag directly
- Validate all schema at: https://validator.schema.org/ before launch
- Use Google's Rich Results Test to verify FAQPage and BreadcrumbList eligibility
- Keep schema in sync with visible page content — schema that contradicts on-page text can be penalized
