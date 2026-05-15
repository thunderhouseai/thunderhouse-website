# Design Direction — ThunderHouse

Visual identity and design decisions for the ThunderHouse website.

---

## Design Philosophy

**Dark, professional, high-contrast.** ThunderHouse looks like a firm that knows what it's doing — not a startup. Not a SaaS landing page template. Think: dark background, precise typography, restrained use of color, clarity over decoration.

**Diagnostic, not promotional.** The design communicates clarity and expertise. Every visual decision should support the copy's directness, not distract from it.

---

## Color System

Defined as CSS custom properties in `globals.css` (Tailwind CSS v4):

| Token | Value | Usage |
|-------|-------|-------|
| `--color-navy` | `#0f1117` | Page background, darkest surfaces |
| `--color-surface` | `#1a1f2e` | Card backgrounds, panels |
| `--color-surface-elevated` | `#1e2535` | Hover states, slightly elevated surfaces |
| `--color-steel` | `#4a9eff` | Primary brand accent, headlines accent, CTA buttons |
| `--color-text` | `#e8eaf0` | Body text |
| `--color-text-muted` | `#8892a4` | Secondary text, labels, captions |
| `--color-border` | `rgba(255,255,255,0.08)` | Subtle borders, dividers |

### Accent colors (used sparingly — only in LeakSystem cards):
- Blue: `blue-500` (Visibility Leak)
- Amber: `amber-500` (Conversion Leak)
- Red: `red-500` (Response Leak)
- Purple: `purple-500` (Operations Leak)

---

## Typography

| Role | Style |
|------|-------|
| Display headlines | 4xl–6xl, font-bold, tight leading |
| Section headlines | 3xl–4xl, font-bold |
| Subheadlines | xl–2xl, font-medium, muted |
| Body text | base–lg, font-normal, relaxed leading |
| UI labels | sm, font-medium or semibold |
| Eyebrows | xs–sm, font-medium, uppercase, letter-spacing, steel color |

Font stack: System default sans-serif (Inter or OS native via Tailwind). No custom font imports — keeps load time minimal.

---

## Component Styles

### Cards (`Card` component)

Three variants:
- **Default**: surface background, border, rounded-xl, padding
- **Pillar**: same as default + hover state with elevated background + steel border
- **Elevated**: surface-elevated background

### Buttons

- **Primary**: Steel background (`bg-[--color-steel]`), white text, rounded, px-6 py-3
- **Secondary / Ghost**: Transparent background, border, text in muted, hover to surface
- **CTA in banner**: Large, prominent, min-width enforced

### Sections

- Max-width: `max-w-6xl mx-auto` for content
- Section padding: `py-20` desktop, `py-12` mobile
- Section gap between components: consistent use of `space-y-16` at page level

---

## Animation

Using `motion/react` (Framer Motion) with two patterns:

**`fadeUp`** — single element enters from below with opacity:
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
```

**`staggerContainer` / `staggerItem`** — for lists and card grids:
```ts
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
```

**Rules:**
- Animations on scroll (use `whileInView` + `viewport={{ once: true }}`)
- No looping animations on the main page
- No parallax effects — these interfere with readability
- Delay first item no more than 0.1s — don't make users wait

---

## Iconography

Library: `lucide-react`

| Usage | Icon |
|-------|------|
| Medical industry | `Stethoscope` |
| Legal industry | `Scale` |
| CPA industry | `Calculator` |
| Intake service | `Users` |
| Follow-up service | `MessageSquare` |
| Operations service | `Settings` |
| Audit: visibility check | `Globe` |
| Audit: intake check | `Users` |
| Audit: follow-up check | `MessageSquare` |
| Audit: operations check | `Settings` |
| Audit: online presence | `Search` |
| Checklist items | `CheckCircle2` |
| Dropdown indicator | `ChevronDown` |

Icon size standard: `w-6 h-6` inline, `w-8 h-8` for card headers.

---

## Responsive Design

**Breakpoints (Tailwind defaults):**
- Mobile: < 768px
- Tablet: 768px–1024px (md)
- Desktop: 1024px+ (lg)

**Grid patterns:**
- 3-column card grids: `grid-cols-1 md:grid-cols-3`
- 2-column layout: `grid-cols-1 lg:grid-cols-2`
- Hero: single column on mobile, centered

**Header behavior:**
- Transparent on top, adds `--color-surface` background at 60px scroll
- Mobile: hamburger icon → full-panel slide-down menu
- Industries dropdown: hover on desktop, expanded section on mobile

---

## What to Avoid

- Gradients on backgrounds (used only as card accents, never as backgrounds)
- Stock photography of people (no real client photos exist — don't use stock)
- Illustrations (the brand is text and data, not illustrated)
- Light mode (site is dark-mode only — no toggle)
- Excessive whitespace that makes the page feel empty
- Decorative elements that don't support the copy
