# Aesthetic Training Hub — Design Spec
_2026-06-24_

## Goal

A public trainer directory page for EQUALS3's Aesthetic Training Hub. Students find approved UK aesthetics trainers. Trainers are on Standard (£150/mo) or Premium (£249/mo) plans.

## Stack

- Next.js 15 App Router
- React 19, TypeScript
- Tailwind CSS + shadcn/ui (Card, Badge, Select)
- In-memory typed data (no database)

## Architecture

```
app/
  layout.tsx          Root layout, Inter font, global styles
  page.tsx            Server Component — reads URL params, filters, renders grid
  components/
    TrainerCard.tsx   Pure UI component — Premium vs Standard styling
    FilterBar.tsx     Client Component — specialism + location selects, pushes URL params
lib/
  trainers.ts         Trainer type + seed data (8 trainers)
```

### Why Server Component for page.tsx
Filters are URL search params (`?specialism=Lip+Enhancement&location=London`). The Server Component reads them and renders filtered results server-side — no useState, no useEffect, no hydration mismatch. URLs are shareable. This is the idiomatic App Router pattern.

## Data Model

```typescript
type Trainer = {
  id: string
  name: string
  specialisms: string[]   // multi-specialism supported
  location: string
  plan: 'standard' | 'premium'
  bio: string             // one-line tagline
}
```

## Seed Data (8 trainers)

| Name | Specialisms | Location | Plan |
|------|------------|----------|------|
| Dr. Sarah Mitchell | Botox, Anti-Wrinkle | London | premium |
| Emma Clarke | Dermal Fillers, Lip Enhancement | Manchester | premium |
| James Thornton | Skin Rejuvenation, Chemical Peels | Birmingham | standard |
| Dr. Priya Sharma | PDO Threads, Microneedling | London | premium |
| Natalie Brooks | Lip Enhancement, Dermal Fillers | Bristol | standard |
| Dr. Fiona Walsh | Botox, Skin Rejuvenation | Leeds | standard |
| Marcus Reid | Microneedling, Chemical Peels | Edinburgh | standard |
| Dr. Aisha Patel | PDO Threads, Botox, Anti-Wrinkle | Manchester | premium |

Specialisms pool: Botox, Anti-Wrinkle, Dermal Fillers, Lip Enhancement, Skin Rejuvenation, Microneedling, Chemical Peels, PDO Threads

Filter options derived dynamically from data (`Array.from(new Set(...))`) — never hardcoded.

## UI Design

### Header
- "Aesthetic Training Hub" — large, clean
- Subtitle: "Find approved UK aesthetics trainers"
- Minimal, professional

### Filter Bar
- Two selects: "All Specialisms" and "All Locations"
- Client Component — on change, pushes new URL params via `useRouter`
- Resets to first page if we add pagination later

### Trainer Card Grid
- Responsive: 1 col (mobile) → 2 col (md) → 3 col (lg)
- Each card: name, bio, specialism badges, location, plan badge

### Premium vs Standard Visual Treatment
**Premium:**
- `ring-2 ring-amber-400` gold border
- Subtle `bg-amber-50` card background tint
- Amber "Premium" badge with crown icon (⭐ or crown emoji)
- Slightly elevated shadow (`shadow-md`)

**Standard:**
- Plain white card, no ring
- Gray "Standard" badge
- Default shadow (`shadow-sm`)

### Plan badge copy
- Premium: `⭐ Premium`
- Standard: `Standard`

## Filtering Logic

```typescript
let results = trainers
if (specialism) results = results.filter(t => t.specialisms.includes(specialism))
if (location)   results = results.filter(t => t.location === location)
// Premium always sorted first within results
results.sort((a, b) => a.plan === 'premium' && b.plan !== 'premium' ? -1 : 1)
```

Premium trainers always appear first — reinforces their tier value.

## README Contents

1. **How to run** — `npm install && npm run dev`, open `localhost:3000`
2. **Progress report** — what was built, what was skipped, what's next
3. **Critique of the brief** — honest, direct answers to Ashley's questions (this is the highest-priority section per the brief)
4. **LLM integration note** — semantic search: students type natural language ("someone near Manchester for lip filler"), an embedding model matches against trainer profiles. One paragraph, concrete, not speculative.

## What's Skipped (intentional)

- Database (brief says in-memory is fine)
- Pagination (8 trainers, unnecessary)
- Authentication / trainer signup flow (out of scope)
- Booking/contact flow (not requested)
- Tests (half-day scope, would add Playwright for filter logic next)

## Self-Review

- No placeholders or TBDs
- Architecture matches feature descriptions
- Scope is tight: one page, one data file, two components
- No ambiguous requirements remain — all judgment calls documented above
