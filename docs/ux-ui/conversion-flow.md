# Conversion Flow — ThunderHouse

How visitors move through the site toward the primary conversion goal (booking a free AI audit on Calendly).

---

## Primary Conversion Goal

**Book a free 30-minute AI audit via Calendly.**

URL: `https://calendly.com/thunderhouseai/30min`

Secondary conversion: Contact form submission (`/contact`).

---

## Funnel Stages

### Stage 1: Discovery
Visitor arrives via search, social, or referral. Has not heard of ThunderHouse.

**Entry pages:** Home, industry pages, service pages
**Goal:** Orient + establish credibility + show problem relevance
**Action we want:** Click to `/ai-intake-audit`

---

### Stage 2: Consideration
Visitor understands what ThunderHouse does and is considering whether to engage.

**Entry pages:** `/ai-intake-audit`, `/process`, `/about`
**Goal:** Remove skepticism, answer objections, make booking feel safe
**Action we want:** Click Calendly link → book

---

### Stage 3: Conversion
Visitor books on Calendly.

**Entry:** Calendly (external)
**Goal:** Get them to actually show up for the call

---

## Traffic Flow by Entry Point

### Home Page Entry
```
Home → LeakSystem (problem recognition) →
  → Relevant industry page (I see myself here) → Calendly
  → AI Intake Audit page (learn more) → Calendly
  → Process page (what happens?) → AI Intake Audit → Calendly
```

### Organic Search Entry (Industry Page)
```
"AI automation medical practice Puerto Rico" →
  /en/industries/doctors →
  CTA card → Calendly (direct)
```

### Organic Search Entry (Service Page)
```
"client intake automation" →
  /en/services/client-intake-automation →
  CTA → Calendly (direct)
```

### Referral / Direct Entry (Audit Page)
```
Someone refers them directly to the audit page →
  /en/ai-intake-audit →
  Hero CTA or CTA card → Calendly (direct)
```

---

## CTA Architecture on Each Page

**Home:**
- Primary: Get Your Free AI Audit → `/ai-intake-audit`
- Section CTAs: LeakSystem → `/ai-intake-audit`
- Secondary: See How It Works → `/process`

**AI Intake Audit:**
- Hero CTA → Calendly (direct)
- CTA card → Calendly (direct)
- CtaBanner → `/ai-intake-audit` (same page — acceptable since it scrolls to top)

**Industry Pages:**
- CTA card → Calendly (direct — already deep funnel)
- CtaBanner → `/ai-intake-audit`

**Service Pages:**
- CTA → Calendly (direct — specific-intent visitor)
- CtaBanner → `/ai-intake-audit`

**Process Page:**
- CtaBanner only → `/ai-intake-audit`

**Contact Page:**
- Form submit (contact DB + n8n webhook)
- Calendly embed / link

---

## Friction Reduction

Every page between discovery and Calendly adds potential drop-off. The site is designed to minimize required steps:

| Visitor type | Minimum path to Calendly |
|-------------|--------------------------|
| Referred, ready | Calendly from anywhere |
| Industry search | 1 page (industry detail) |
| Home visitor | 1-2 pages (audit page OR direct from hero) |
| Research-mode | 2-3 pages (process → audit → Calendly) |

---

## Trust Elements by Stage

| Stage | Trust element | Where it appears |
|-------|---------------|-----------------|
| Discovery | "Bilingual, Puerto Rico-Rooted" | Home, industries |
| Discovery | Real case studies (no fake logos) | SocialProof section |
| Consideration | "Free. No pitch. No commitment." | Audit page hero |
| Consideration | What you receive checklist | Audit page |
| Consideration | FAQ (5 objection handlers) | Audit page, industry pages |
| Conversion | "The findings are yours to keep" | Audit CTA copy |

---

## Post-Conversion Flow

After Calendly booking:
1. Calendly sends confirmation email
2. ThunderHouse manually reviews the booked session context
3. The audit call happens (30 min)
4. Written summary delivered within 3 business days
5. No-pitch close: findings are delivered whether or not the client continues

**Note:** Post-booking email automation (via n8n) is a planned enhancement — not yet implemented.
