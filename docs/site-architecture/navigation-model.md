# Navigation Model — ThunderHouse

## Main Navigation (Desktop)

```
[Logo] → /en         [Services] [Industries ▾] [About] [Process] [Contact]    [Get Free Audit]  [EN/ES]
```

- **Logo** — links to home (`/en` or `/es`)
- **Services** — links to `/services`
- **Industries ▾** — dropdown on hover:
  - Medical Practices → `/industries/doctors`
  - Law Firms → `/industries/attorneys`
  - CPA Firms → `/industries/cpas`
  - [Industries Overview →] `/industries`
- **About** — links to `/about`
- **Process** — links to `/process`
- **Contact** — links to `/contact`
- **Get Free Audit** — primary CTA button → `/ai-intake-audit`
- **EN/ES toggle** — `LanguageSwitcher` component

### Design notes
- Header is transparent on top, adds background color after 60px scroll (`header-scrolled` class)
- The Industries dropdown appears on hover with a brief animation
- Mobile header hides the text logo and shows only the logo mark

---

## Mobile Navigation

The mobile menu is a full-panel slide-down that appears when the hamburger icon is tapped.

**Structure:**
```
[Services]
Industries
  → Medical Practices
  → Law Firms
  → CPA Firms
[About]
[Process]
[Contact]
---
[EN/ES]  [Get Free Audit]
```

- Industries are listed as a section header + indented links (no dropdown on mobile)
- CTA button and language switcher are in the bottom bar of the mobile menu

---

## Footer Navigation

```
[Logo + tagline + social]   [Services]        [Industries]     [Company]
                             Intake Auto       Medical          Free AI Audit
                             Follow-Up Sys     Law Firms        About
                             Ops Auto          CPAs             How It Works
                                                                Contact
[copyright]                                                [EN/ES]
```

### Footer column structure
- **Brand column** (2 cols wide): Logo, tagline ("AI Implementation for Professional Service Businesses."), LinkedIn + Instagram icons
- **Services column**: Links to all 3 service detail pages
- **Industries column**: Links to all 3 industry detail pages
- **Company column**: Free AI Audit, About, Process, Contact

---

## Breadcrumb Strategy

Breadcrumbs are NOT currently implemented but recommended for inner pages:
- `/services/client-intake-automation` → Services > Client Intake Automation
- `/industries/doctors` → Industries > Medical Practices

If implemented, use `BreadcrumbList` schema markup. See `docs/seo/schema-plan.md`.

---

## CTA Hierarchy

Every page follows a strict CTA hierarchy:

| Tier | CTA | Destination |
|------|-----|-------------|
| Primary | Get Your Free AI Audit / Solicita tu Auditoría Gratis | `/ai-intake-audit` or Calendly |
| Secondary | See How It Works / Ve Cómo Funciona | `/process` |
| Tertiary | View all services, See industry detail, Learn more | Relevant internal page |

The Calendly link (`https://calendly.com/thunderhouseai/30min`) is used on:
- Hero (primary CTA links to `/ai-intake-audit`, not directly to Calendly)
- Audit page (both CTAs link directly to Calendly)
- Industry pages (CTA cards link to Calendly)
- Service pages (CTA links to Calendly)
- Header nav CTA links to `/ai-intake-audit`

The distinction: most pages funnel to `/ai-intake-audit` first. The audit page and deep-funnel pages go directly to Calendly.
