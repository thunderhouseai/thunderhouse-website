# Page Content Map — ThunderHouse

Maps every page to its i18n key namespaces, sections, and content sources.

---

## Home Page (`/en`, `/es`)

**i18n namespace:** `hero`, `leaks`, `services`, `industries`, `process`, `why`, `proof`, `cta`

| Section | Component | i18n Key(s) |
|---------|-----------|-------------|
| Header | `Hero` | `hero.eyebrow`, `hero.headline`, `hero.headline_accent`, `hero.subheadline`, `hero.cta_primary`, `hero.cta_secondary` |
| The 4 Leaks | `LeakSystem` | `leaks.headline`, `leaks.subheadline`, `leaks.cta`, `leaks.visibility.*`, `leaks.conversion.*`, `leaks.response.*`, `leaks.operations.*` |
| Services | `Services` | `services.headline`, `services.subheadline`, `services.intake.*`, `services.followup.*`, `services.operations.*`, `services.not_sure` |
| Industries | `Industries` | `industries.headline`, `industries.subheadline`, `industries.doctors.*`, `industries.attorneys.*`, `industries.cpas.*` |
| Process | `Process` | `process.headline`, `process.subheadline`, `process.audit.*`, `process.diagnose.*`, `process.build.*`, `process.automate.*`, `process.improve.*` |
| Why Us | `WhyUs` | `why.headline`, `why.diagnostic.*`, `why.bilingual.*`, `why.endtoend.*` |
| Social Proof | `SocialProof` | `proof.eyebrow`, `proof.headline`, `proof.case_1.*`, `proof.case_2.*`, `proof.case_3.*` |
| CTA Banner | `CtaBanner` | `cta.headline`, `cta.subheadline`, `cta.button` |

---

## AI Intake Audit Page (`/en/ai-intake-audit`)

**i18n namespace:** `audit`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `audit.hero_headline`, `audit.hero_subheadline`, `audit.hero_cta`, `audit.no_pitch` |
| What We Check (5 cards) | `audit.checks.visibility.*`, `audit.checks.intake.*`, `audit.checks.followup.*`, `audit.checks.operations.*`, `audit.checks.online.*` |
| What You Receive (checklist) | `audit.deliverables.headline`, `audit.deliverables.items` (array) |
| Who It's For | `audit.for_headline`, `audit.for_body` |
| CTA Card | `audit.cta_headline`, `audit.cta_subheadline`, `audit.cta_button` |
| FAQ | `audit.faq.headline`, `audit.faq.items` (array of `{q, a}`) |
| CTA Banner | `cta.*` |

---

## Services Overview (`/en/services`)

**i18n namespace:** `services`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `services.page_headline`, `services.page_subheadline` |
| Service Cards | `services.intake.*`, `services.followup.*`, `services.operations.*` |
| Not Sure CTA | `services.not_sure`, `services.not_sure_link` |
| CTA Banner | `cta.*` |

---

## Service Detail: Client Intake Automation (`/en/services/client-intake-automation`)

**i18n namespace:** `services`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `services.intake.title`, `services.intake.tagline` |
| Problem | `services.intake.problem_headline`, `services.intake.problem_body` |
| Solution | `services.intake.solution_headline`, `services.intake.solution_items` (array via `t.raw()`) |
| Workflow | `services.intake.workflow_headline`, `services.intake.workflow_steps` |
| CTA | `services.intake.cta` |
| CTA Banner | `cta.*` |

---

## Service Detail: AI Follow-Up Systems (`/en/services/ai-follow-up-systems`)

**i18n namespace:** `services`, `cta`

Same structure as intake — uses `services.followup.*` keys.

---

## Service Detail: Operations Automation (`/en/services/operations-automation`)

**i18n namespace:** `services`, `cta`

Same structure — uses `services.operations.*` keys.

---

## Industries Overview (`/en/industries`)

**i18n namespace:** `industries`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `industries.page_headline`, `industries.page_subheadline` |
| Industry Cards | `industries.doctors.*`, `industries.attorneys.*`, `industries.cpas.*` |
| CTA Banner | `cta.*` |

---

## Industry Detail: Medical Practices (`/en/industries/doctors`)

**i18n namespace:** `industries`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `industries.doctors.name`, `industries.doctors.tagline` |
| Pain Points (4 cards) | Hardcoded in page file with locale-conditional strings |
| Services List | `industries.doctors.service_1`, `industries.doctors.service_2`, `industries.doctors.service_3` |
| CTA Card | `industries.doctors.cta` |
| FAQ | Hardcoded in page file with locale-conditional strings |
| CTA Banner | `cta.*` |

> **Note:** Industry page FAQs and pain points are locale-conditional in the page file. If the bilingual content model expands, these should be moved to i18n JSON.

---

## Industry Detail: Law Firms (`/en/industries/attorneys`)

Same structure as doctors — uses `industries.attorneys.*` keys.

---

## Industry Detail: CPA Firms (`/en/industries/cpas`)

Same structure as doctors — uses `industries.cpas.*` keys.

---

## Process Page (`/en/process`)

**i18n namespace:** `process`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `process.headline`, `process.subheadline` |
| Steps (5) | `process.audit.*`, `process.diagnose.*`, `process.build.*`, `process.automate.*`, `process.improve.*` |
| CTA Banner | `cta.*` |

---

## About Page (`/en/about`)

**i18n namespace:** `about`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `about.headline`, `about.subheadline` |
| Mission | `about.mission_headline`, `about.mission_body` |
| Approach | `about.approach_headline`, `about.approach_body` |
| Team | `about.team_headline` (team bios pending) |
| CTA Banner | `cta.*` |

---

## Contact Page (`/en/contact`)

**i18n namespace:** `contact`, `cta`

| Section | i18n Key(s) |
|---------|-------------|
| Hero | `contact.headline`, `contact.subheadline` |
| Form | `contact.form.*` (all field labels, placeholders, submit button) |
| Form service options | `contact.form.service_intake`, `contact.form.service_followup`, `contact.form.service_operations`, `contact.form.service_audit`, `contact.form.service_unsure` |
| Direct Calendly | `contact.calendly_headline`, `contact.calendly_subheadline` |
