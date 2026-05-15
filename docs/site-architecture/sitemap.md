# Sitemap — ThunderHouse

## Complete URL Structure

All routes exist under both `/en/` and `/es/` using the same slugs.

### Primary Navigation (top-level)

| Page | EN URL | ES URL | Priority |
|------|--------|--------|----------|
| Home | /en | /es | High |
| Services Overview | /en/services | /es/services | High |
| Industries Overview | /en/industries | /es/industries | High |
| AI Intake Audit | /en/ai-intake-audit | /es/ai-intake-audit | **Primary conversion** |
| Process | /en/process | /es/process | Medium |
| About | /en/about | /es/about | Medium |
| Contact | /en/contact | /es/contact | High |

### Services (linked from Services Overview and Footer)

| Page | EN URL | ES URL |
|------|--------|--------|
| Client Intake Automation | /en/services/client-intake-automation | /es/services/client-intake-automation |
| AI Follow-Up Systems | /en/services/ai-follow-up-systems | /es/services/ai-follow-up-systems |
| Operations Automation | /en/services/operations-automation | /es/services/operations-automation |

### Industries (linked from Industries Overview, Header dropdown, Footer)

| Page | EN URL | ES URL |
|------|--------|--------|
| Medical Practices | /en/industries/doctors | /es/industries/doctors |
| Law Firms | /en/industries/attorneys | /es/industries/attorneys |
| CPA Firms | /en/industries/cpas | /es/industries/cpas |

### API Routes (not indexed)

| Route | Purpose |
|-------|---------|
| /api/health | Coolify health check |
| /api/contact | Contact form submission |
| /api/chat | AI chat widget streaming |

---

## Page Hierarchy

```
Home
├── AI Intake Audit (primary CTA destination)
├── Services
│   ├── Client Intake Automation
│   ├── AI Follow-Up Systems
│   └── Operations Automation
├── Industries
│   ├── Medical Practices
│   ├── Law Firms
│   └── CPA Firms
├── Process
├── About
└── Contact
```

---

## Navigation Presence

| Page | Main Nav | Header Dropdown | Footer | Home Page Section |
|------|----------|-----------------|--------|-------------------|
| Home | Logo | — | — | — |
| AI Intake Audit | CTA button | — | Company column | CtaBanner (CTA) |
| Services | ✓ | — | Services column | Services section |
| → Intake Automation | — | — | Services column | — |
| → Follow-Up Systems | — | — | Services column | — |
| → Operations | — | — | Services column | — |
| Industries | ✓ | — | Industries column | Industries section |
| → Doctors | — | ✓ | Industries column | Industries section |
| → Attorneys | — | ✓ | Industries column | Industries section |
| → CPAs | — | ✓ | Industries column | Industries section |
| Process | ✓ | — | Company column | Process section |
| About | ✓ | — | Company column | — |
| Contact | ✓ | — | Company column | — |

---

## SEO Priority

**Top priority (primary conversion and local SEO targets):**
1. Home — brand, local SEO, Puerto Rico + Orlando
2. AI Intake Audit — primary offer landing page
3. Doctors industry page — "AI automation for medical practices Puerto Rico"
4. Attorneys industry page — "AI automation for law firms Puerto Rico"
5. CPAs industry page — "AI automation for CPA firms Puerto Rico"

**Secondary priority:**
6. Services overview
7. Individual service pages
8. Process page
9. Contact page

**Supporting:**
10. About page
11. Industries overview
