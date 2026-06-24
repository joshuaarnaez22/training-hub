---
name: Aesthetic Training Hub
description: A vetted public directory connecting aesthetics students with credentialed UK trainers.
colors:
  ink: "oklch(0.145 0 0)"
  primary: "oklch(0.205 0 0)"
  surface: "oklch(1 0 0)"
  surface-muted: "oklch(0.97 0 0)"
  ink-muted: "oklch(0.556 0 0)"
  border: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  premium-amber: "oklch(0.828 0.189 84.429)"
  premium-amber-surface: "oklch(0.987 0.022 95.277)"
  premium-amber-ink: "oklch(0.414 0.112 45.904)"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  badge-premium:
    backgroundColor: "{colors.premium-amber}"
    textColor: "{colors.premium-amber-ink}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-standard:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-specialism:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "16px"
  card-premium:
    backgroundColor: "{colors.premium-amber-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "16px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
  select-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
---

# Design System: Aesthetic Training Hub

## 1. Overview

**Creative North Star: "The Credentialed Showcase"**

This is a gallery that only shows vetted work. A student arriving here is not browsing a generic listing — they are entering a curated professional space where being shown is itself a signal of quality. The design carries that weight: clean, legible, and deliberately undecorated, so the trainers' credentials speak rather than the interface.

The system is built on a grayscale neutral foundation with amber reserved exclusively for the Premium tier — the single colour that earns its place by signalling a real business distinction. Everything else defers. The hierarchy is typographic and positional, not decorative. Confident and approachable: components are generous enough that a student new to the aesthetics industry feels welcomed, not confronted by a clinical or intimidating surface.

The system explicitly rejects the generic job-board aesthetic (Totaljobs / Reed: utilitarian gray, zero personality, no curation signal) and the over-luxe beauty-brand aesthetic (dusty rose, heavy serif, candle-brand softness). It is neither of those. It is a professional directory that happens to serve an industry where trust, expertise, and presentation all matter.

**Key Characteristics:**
- Single-typeface system (Inter); weight and size carry the hierarchy
- Achromatic neutral palette — amber is the sole exception, reserved for Premium
- Flat surfaces with thin rings; elevation only where it means something (the Premium tier)
- Cards as the primary affordance — correct for a directory of professional profiles
- Two-signal Premium treatment: amber ring + amber surface tint, always together

## 2. Colors: The Neutral Foundation

The palette is deliberately restrained — achromatic neutrals across the entire surface, with Honour Amber as the single accent reserved for the Premium tier.

### Primary
- **Near-Black Ink** (`oklch(0.145 0 0)`): The only text color for headings and high-priority body copy. Full opacity throughout.
- **Charcoal Primary** (`oklch(0.205 0 0)`): Button backgrounds and strong interactive elements. Slightly lighter than Ink to give buttons their own visual weight without competing with text.

### Tertiary
- **Honour Amber** (`oklch(0.828 0.189 84.429)`): Exclusively for the Premium tier — ring color and badge background on Premium trainer cards. The only saturated colour in the system; its rarity makes it meaningful.
- **Amber Surface** (`oklch(0.987 0.022 95.277)`): Premium card background tint. Paired with Honour Amber, it signals listing tier at a glance.
- **Amber Ink** (`oklch(0.414 0.112 45.904)`): Text on amber backgrounds. Meets WCAG AA (4.5:1) against Honour Amber.

### Neutral
- **Pure White** (`oklch(1 0 0)`): Page background, card background, popover background.
- **Soft Surface** (`oklch(0.97 0 0)`): Muted backgrounds, secondary button fills, card footers, hover states.
- **Subdued Ink** (`oklch(0.556 0 0)`): Secondary text — bios, location labels, metadata. Meets 4.5:1 against white.
- **Hairline Border** (`oklch(0.922 0 0)`): Card rings, input borders, dividers. Purely structural.
- **Focus Ring** (`oklch(0.708 0 0)`): Focus state indicators at 50% opacity.

### Named Rules

**The One Colour Rule.** Honour Amber is the only saturated colour in the system. It exists exclusively to mark Premium trainer listings. Do not use amber — or any other saturated colour — for any other purpose. Its rarity is what makes it mean something.

## 3. Typography

**Body Font:** Inter (Google Fonts, latin subset)

Single-typeface system. No display font. Weight contrast (700 → 500 → 400) carries all hierarchy.

**Character:** A clean humanist sans-serif used with discipline. Inter's optical weights are distinct enough that a bold heading and a regular body line read as visually different tools, not just scaled copies. The font never competes with the content it presents.

### Hierarchy
- **Display** (700, `clamp(1.75rem, 4vw, 2.25rem)`, line-height 1.1, letter-spacing -0.02em): Page title only — "Aesthetic Training Hub". `text-wrap: balance` applied.
- **Title** (500, 1rem / 16px, line-height 1.3): Trainer names in card headers. The primary scannable element in each listing.
- **Body** (400, 0.875rem / 14px, line-height 1.5): Bios, descriptive copy, filter labels. Capped at 65–75ch in reading contexts.
- **Label** (400, 0.75rem / 12px, line-height 1.4): Specialism badges, results counts, secondary metadata.

### Named Rules

**The Weight-First Rule.** Hierarchy is established by font weight (bold → medium → regular), then size, never by colour alone. Do not reach for a new colour to differentiate a text level — reach for a weight step or size step.

## 4. Elevation

Flat by default. Card boundaries are communicated by thin rings (`ring-1 ring-foreground/10`) against the page background, not shadows. Depth is tonal — white card on a light gray page surface — not structural.

The single exception: Premium trainer cards receive `shadow-md` alongside their amber ring. The shadow is earned, not decorative. It lifts Premium listings above Standard listings, reinforcing the tier distinction.

### Shadow Vocabulary
- **Tier Lift** (`0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): Used exclusively on Premium cards, always combined with the amber ring. Never applied alone.
- **Dropdown Shadow** (same value as Tier Lift): Select content and popover surfaces. Floating elements share one shadow vocabulary.

### Named Rules

**The Flat-By-Default Rule.** All surfaces at rest are flat. Rings communicate structure; shadows communicate elevation. Shadows are reserved for floating surfaces (dropdowns, modals) and the Premium tier. Never add `box-shadow` to a Standard trainer card.

## 5. Components

### Buttons

Confident and approachable — clear affordances, generous touch targets, no decoration.

- **Shape:** Gently curved (8px radius)
- **Primary:** Charcoal Primary background + Pure White text. Height 32px, horizontal padding 10px.
- **Hover / Focus:** 80% opacity on hover. 3px focus ring at 50% opacity on keyboard focus.
- **Secondary:** Soft Surface background + Ink text. For non-primary actions.
- **Ghost:** Transparent at rest, Soft Surface fill on hover. For toolbar and filter contexts.
- **Outline:** Hairline Border + transparent background. Soft Surface fill on hover.

### Badges

Three distinct roles — never interchangeable:

- **Premium badge:** Honour Amber background + Amber Ink text. One per Premium card header.
- **Standard badge:** Soft Surface background + Ink text. Tier signal for Standard listings.
- **Specialism badge:** Outline — Hairline Border, transparent background, Label-weight text. Repeats multiple times per card for skill tags.

### Cards / Trainer Listings

The central component. Cards are the correct affordance for a directory of professional profiles — each trainer is a distinct entity that warrants distinct visual containment.

- **Corner Style:** Generously rounded (12px radius)
- **Standard:** Pure White surface, `ring-1 ring-foreground/10` boundary, no shadow
- **Premium:** Amber Surface tint, 2px Honour Amber ring, Tier Lift shadow
- **Internal Padding:** 16px (--card-spacing)
- **Content layout:** Header (trainer name + plan badge), bio in Subdued Ink, specialism chip row, location with pin marker

**The Two-Signal Rule.** Premium differentiation uses two simultaneous signals: amber ring AND amber surface. Apply both together always. Either alone reads as an anomaly, not a tier upgrade.

### Inputs / Selects

Filter inputs are the primary interactive surface on the directory page.

- **Style:** Transparent background, Hairline Border, 8px radius, height 32px
- **Focus:** Border shifts to Focus Ring color, 3px ring at 50% opacity
- **Placeholder / empty state:** Subdued Ink — meets 4.5:1 against white

### Signature Component: TrainerCard

The primary deliverable of the directory. A complete trainer listing in a self-contained card unit.

Structure: Card header contains trainer name (Title weight) and plan badge (flex row, space-between). Bio runs below as Body in Subdued Ink. Card content: specialism badges (wrapping flex row), then location line with 📍 pin marker.

Premium variant: Amber Surface fill + 2px Honour Amber ring + Tier Lift shadow. Premium cards sort to the top of the grid.

## 6. Do's and Don'ts

### Do:
- **Do** use Honour Amber exclusively for Premium tier signals (ring, badge background, card surface tint). Its rarity is what makes it mean something.
- **Do** apply the two-signal Premium treatment together — amber ring AND amber surface — always.
- **Do** sort Premium trainers above Standard trainers in the listing grid. Visual tier differentiation and position must reinforce each other.
- **Do** use `ring-1 ring-foreground/10` as the boundary for Standard cards. Thin rings, not shadows.
- **Do** maintain 4.5:1 contrast minimum for all body text, including Subdued Ink (`oklch(0.556 0 0)`) against Pure White.
- **Do** use `text-wrap: balance` on display headings and `text-wrap: pretty` on bio/body text.
- **Do** derive filter options dynamically from trainer data — never hardcode specialism or location lists.

### Don't:
- **Don't** make this look like a generic job board — clinical gray, utilitarian, zero curation signal. That is the primary anti-reference.
- **Don't** tip into over-luxe beauty brand territory — no dusty rose, no heavy script serif, no candle-brand softness.
- **Don't** use medical/clinical aesthetic — cold white, sterile blue, zero warmth.
- **Don't** add shadows to Standard cards. Elevation is a Premium signal.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe. Use full rings or background tints.
- **Don't** use Honour Amber outside the Premium tier. Not for buttons, headings, accents, or decorative elements.
- **Don't** add a second typeface. Inter at different weights is the hierarchy.
- **Don't** let Subdued Ink text (`oklch(0.556 0 0)`) appear on any background lighter than white — it passes on white but fails on tinted surfaces.
