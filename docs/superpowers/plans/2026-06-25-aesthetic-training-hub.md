# Aesthetic Training Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public trainer directory page where students can browse and filter vetted UK aesthetics trainers, with Premium trainers visually distinguished from Standard ones.

**Architecture:** Next.js 15 App Router, single route (`/`). `page.tsx` is a Server Component that reads URL search params and filters trainers server-side. `FilterBar` is the only Client Component, pushing new params via `useRouter`. Data lives in a typed in-memory array in `lib/trainers.ts`. Filter logic is extracted to `lib/filterTrainers.ts` so it can be unit tested.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui (Card, Badge, Select)

## Global Constraints

- Next.js 15 App Router only — no Pages Router
- TypeScript strict mode — no `any`
- All components in `app/components/` unless otherwise specified
- Trainer plan values are exactly `'standard'` or `'premium'` (lowercase string literal union)
- shadcn/ui components from `@/components/ui/` — do not hand-roll equivalents
- Node 18+

---

### Task 1: Scaffold Next.js app with Tailwind and shadcn/ui

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/globals.css` (all via scaffold)
- Create: `components.json` (shadcn config, via shadcn init)

**Interfaces:**
- Produces: working Next.js 15 dev server at `localhost:3000`, `@/` path alias resolving to project root, shadcn `Card`, `Badge`, `Select` components available at `@/components/ui/`

- [ ] **Step 1: Scaffold Next.js app**

Run from `/Users/user/Desktop/training-hub`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```
Expected: installs deps, creates `app/`, `public/`, config files. No errors.

- [ ] **Step 2: Initialise shadcn/ui**

```bash
npx shadcn@latest init -d
```
Expected: creates `components.json`, `app/globals.css` updated with CSS vars, `@/lib/utils.ts` created.

- [ ] **Step 3: Add required shadcn components**

```bash
npx shadcn@latest add card badge select
```
Expected: creates `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/select.tsx`.

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```
Open `http://localhost:3000` — should show default Next.js welcome page. Stop server (`Ctrl+C`).

- [ ] **Step 5: Remove boilerplate**

Replace `app/page.tsx` with:
```tsx
export default function Home() {
  return <main><p>hello</p></main>
}
```
Replace `app/globals.css` content — keep only the shadcn `@layer base` block that `shadcn init` wrote (delete the `body { ... }` and `:root` blocks if shadcn didn't add its own). Do not delete the `@tailwind` directives.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app with Tailwind and shadcn/ui"
```

---

### Task 2: Trainer data and types

**Files:**
- Create: `lib/trainers.ts`

**Interfaces:**
- Produces:
  - `Trainer` type exported from `lib/trainers.ts`
  - `trainers` array exported from `lib/trainers.ts`
  - `SPECIALISMS` string array exported from `lib/trainers.ts`
  - `LOCATIONS` string array exported from `lib/trainers.ts`

- [ ] **Step 1: Create `lib/trainers.ts`**

```typescript
export type Trainer = {
  id: string
  name: string
  specialisms: string[]
  location: string
  plan: 'standard' | 'premium'
  bio: string
}

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialisms: ['Botox', 'Anti-Wrinkle'],
    location: 'London',
    plan: 'premium',
    bio: 'Award-winning practitioner with 12 years in medical aesthetics.',
  },
  {
    id: '2',
    name: 'Emma Clarke',
    specialisms: ['Dermal Fillers', 'Lip Enhancement'],
    location: 'Manchester',
    plan: 'premium',
    bio: 'Specialist in natural-look lip and facial volumising techniques.',
  },
  {
    id: '3',
    name: 'James Thornton',
    specialisms: ['Skin Rejuvenation', 'Chemical Peels'],
    location: 'Birmingham',
    plan: 'standard',
    bio: 'Focused on skin health and evidence-based rejuvenation protocols.',
  },
  {
    id: '4',
    name: 'Dr. Priya Sharma',
    specialisms: ['PDO Threads', 'Microneedling'],
    location: 'London',
    plan: 'premium',
    bio: 'Pioneer in minimally invasive thread lifting for natural results.',
  },
  {
    id: '5',
    name: 'Natalie Brooks',
    specialisms: ['Lip Enhancement', 'Dermal Fillers'],
    location: 'Bristol',
    plan: 'standard',
    bio: 'Passionate about education-first aesthetics training.',
  },
  {
    id: '6',
    name: 'Dr. Fiona Walsh',
    specialisms: ['Botox', 'Skin Rejuvenation'],
    location: 'Leeds',
    plan: 'standard',
    bio: 'GP-trained aesthetician with a safety-led teaching approach.',
  },
  {
    id: '7',
    name: 'Marcus Reid',
    specialisms: ['Microneedling', 'Chemical Peels'],
    location: 'Edinburgh',
    plan: 'standard',
    bio: 'Skin science expert specialising in advanced resurfacing treatments.',
  },
  {
    id: '8',
    name: 'Dr. Aisha Patel',
    specialisms: ['PDO Threads', 'Botox', 'Anti-Wrinkle'],
    location: 'Manchester',
    plan: 'premium',
    bio: 'Multi-award-winning trainer known for comprehensive, hands-on courses.',
  },
]

export const SPECIALISMS = Array.from(
  new Set(trainers.flatMap((t) => t.specialisms))
).sort()

export const LOCATIONS = Array.from(
  new Set(trainers.map((t) => t.location))
).sort()
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/trainers.ts
git commit -m "feat: add trainer data and types"
```

---

### Task 3: Filter logic with tests

**Files:**
- Create: `lib/filterTrainers.ts`
- Create: `lib/filterTrainers.test.ts`

**Interfaces:**
- Consumes: `Trainer` type from `lib/trainers.ts`, `trainers` array from `lib/trainers.ts`
- Produces: `filterTrainers(trainers, specialism?, location?)` function exported from `lib/filterTrainers.ts` — returns `Trainer[]` with Premium first

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest @vitejs/plugin-react
```

Add to `package.json` scripts:
```json
"test": "vitest run"
```

Create `vitest.config.ts` at project root:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 2: Write failing tests**

Create `lib/filterTrainers.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { trainers } from './trainers'
import { filterTrainers } from './filterTrainers'

describe('filterTrainers', () => {
  it('returns all trainers when no filters applied', () => {
    const result = filterTrainers(trainers)
    expect(result).toHaveLength(8)
  })

  it('filters by specialism', () => {
    const result = filterTrainers(trainers, 'Botox')
    expect(result.every((t) => t.specialisms.includes('Botox'))).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('filters by location', () => {
    const result = filterTrainers(trainers, undefined, 'London')
    expect(result.every((t) => t.location === 'London')).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('filters by both specialism and location', () => {
    const result = filterTrainers(trainers, 'Botox', 'London')
    expect(result.every((t) => t.specialisms.includes('Botox') && t.location === 'London')).toBe(true)
  })

  it('returns empty array when no matches', () => {
    const result = filterTrainers(trainers, 'Botox', 'Edinburgh')
    expect(result).toHaveLength(0)
  })

  it('sorts premium trainers before standard', () => {
    const result = filterTrainers(trainers)
    const firstStandardIndex = result.findIndex((t) => t.plan === 'standard')
    const lastPremiumIndex = result.map((t) => t.plan).lastIndexOf('premium')
    expect(lastPremiumIndex).toBeLessThan(firstStandardIndex)
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npm test
```
Expected: FAIL — `Cannot find module './filterTrainers'`

- [ ] **Step 4: Implement `filterTrainers`**

Create `lib/filterTrainers.ts`:
```typescript
import type { Trainer } from './trainers'

export function filterTrainers(
  trainers: Trainer[],
  specialism?: string,
  location?: string
): Trainer[] {
  let results = trainers

  if (specialism) {
    results = results.filter((t) => t.specialisms.includes(specialism))
  }

  if (location) {
    results = results.filter((t) => t.location === location)
  }

  return results.slice().sort((a, b) =>
    a.plan === 'premium' && b.plan !== 'premium' ? -1
    : b.plan === 'premium' && a.plan !== 'premium' ? 1
    : 0
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```
Expected: 6 tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/filterTrainers.ts lib/filterTrainers.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: add filter logic with tests"
```

---

### Task 4: TrainerCard component

**Files:**
- Create: `app/components/TrainerCard.tsx`

**Interfaces:**
- Consumes: `Trainer` type from `lib/trainers.ts`, shadcn `Card`, `CardContent`, `CardHeader`, `CardTitle` from `@/components/ui/card`, shadcn `Badge` from `@/components/ui/badge`
- Produces: `TrainerCard({ trainer }: { trainer: Trainer })` — default export, Server Component

- [ ] **Step 1: Create `app/components/TrainerCard.tsx`**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Trainer } from '@/lib/trainers'

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  const isPremium = trainer.plan === 'premium'

  return (
    <Card
      className={
        isPremium
          ? 'ring-2 ring-amber-400 shadow-md bg-amber-50'
          : 'shadow-sm'
      }
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{trainer.name}</CardTitle>
          {isPremium ? (
            <Badge className="shrink-0 bg-amber-400 text-amber-900 hover:bg-amber-400">
              ⭐ Premium
            </Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0">
              Standard
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{trainer.bio}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {trainer.specialisms.map((s) => (
            <Badge key={s} variant="outline" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          📍 {trainer.location}
        </p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/TrainerCard.tsx
git commit -m "feat: add TrainerCard component with Premium/Standard styling"
```

---

### Task 5: FilterBar component

**Files:**
- Create: `app/components/FilterBar.tsx`

**Interfaces:**
- Consumes: `SPECIALISMS`, `LOCATIONS` from `@/lib/trainers`, shadcn `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from `@/components/ui/select`
- Produces: `FilterBar({ specialism, location }: { specialism: string; location: string })` — default export, Client Component. Pushes `?specialism=X&location=Y` to the URL on change.

- [ ] **Step 1: Create `app/components/FilterBar.tsx`**

```tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SPECIALISMS, LOCATIONS } from '@/lib/trainers'

const ALL = 'all'

export default function FilterBar({
  specialism,
  location,
}: {
  specialism: string
  location: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  function update(key: 'specialism' | 'location', value: string) {
    const params = new URLSearchParams()
    const current = { specialism, location }
    current[key] = value
    if (current.specialism && current.specialism !== ALL) params.set('specialism', current.specialism)
    if (current.location && current.location !== ALL) params.set('location', current.location)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={specialism || ALL} onValueChange={(v) => update('specialism', v)}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="All Specialisms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Specialisms</SelectItem>
          {SPECIALISMS.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={location || ALL} onValueChange={(v) => update('location', v)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="All Locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Locations</SelectItem>
          {LOCATIONS.map((l) => (
            <SelectItem key={l} value={l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/FilterBar.tsx
git commit -m "feat: add FilterBar client component with URL param routing"
```

---

### Task 6: Main directory page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `filterTrainers` from `@/lib/filterTrainers`, `trainers` from `@/lib/trainers`, `TrainerCard` from `@/app/components/TrainerCard`, `FilterBar` from `@/app/components/FilterBar`
- Produces: fully working public directory at `http://localhost:3000`

- [ ] **Step 1: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aesthetic Training Hub',
  description: 'Find approved UK aesthetics trainers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import { trainers } from '@/lib/trainers'
import { filterTrainers } from '@/lib/filterTrainers'
import TrainerCard from '@/app/components/TrainerCard'
import FilterBar from '@/app/components/FilterBar'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ specialism?: string; location?: string }>
}) {
  const { specialism = '', location = '' } = await searchParams
  const results = filterTrainers(
    trainers,
    specialism || undefined,
    location || undefined
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Aesthetic Training Hub
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Find approved UK aesthetics trainers
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar specialism={specialism} location={location} />
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-gray-500">
          {results.length} trainer{results.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
            <p className="text-lg">No trainers match your filters.</p>
            <p className="mt-1 text-sm">Try clearing one of the filters above.</p>
          </div>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. Check:
- [ ] All 8 trainers visible (Premium cards have gold ring + amber tint)
- [ ] Premium trainers appear before Standard ones
- [ ] Specialism filter narrows the list
- [ ] Location filter narrows the list
- [ ] Combining both filters works
- [ ] Empty state shows when no matches
- [ ] URL updates when filters change (copy/paste URL — reloads with same filters)

Stop server.

- [ ] **Step 4: Verify TypeScript and lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: add trainer directory page with filtering and Premium/Standard UI"
```

---

### Task 7: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Aesthetic Training Hub

Public trainer directory for the EQUALS3 Aesthetic Training Hub. Students find approved UK aesthetics trainers; trainers are listed on Standard (£150/mo) or Premium (£249/mo) plans.

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui.

## What I built

- Public directory page listing 8 sample trainers
- Premium trainers visually distinguished: gold ring border, amber background tint, ⭐ Premium badge, always sorted to the top
- Filters by specialism and location via URL search params (shareable, no client state)
- Empty state when no filters match
- Unit tests for the filter logic (Vitest, 6 tests)

## What I skipped

- Database — used a typed in-memory array as the brief suggested; production would use Postgres with a trainers table
- Pagination — unnecessary at 8 trainers; would add at ~20+
- Trainer profile pages — not in scope
- Auth / trainer signup flow — not in scope

## What I'd do next

- Postgres + Prisma for real trainer data
- Trainer detail pages (`/trainers/[id]`)
- Search bar (text search across name, bio, specialisms)
- Stripe subscription management for the two plan tiers
- Admin UI for vetting/approving trainers

## Critique of the brief

**What was unclear:**

The brief says "filter by specialism or location (your choice)" but these are naturally complementary, not alternative — a student would realistically want to find "a Botox trainer in Manchester", not pick one axis. I implemented both.

The brief doesn't specify whether Premium trainers should appear first in unfiltered results or only be visually highlighted. I made them sort first because it reflects the real value proposition of the Premium tier; a trainer paying £249/mo should get better placement, not just a different coloured card.

"A few sample trainers" is vague — I used 8 (4 Premium, 4 Standard) to make the filter interaction meaningful. 3 or 4 trainers wouldn't let you test filtering combinations.

**What I'd change about the task:**

The question "where was this brief unclear?" is the most interesting part of the brief, which tells me EQUALS3 values critical thinking and communication at least as much as shipping speed. I'd be explicit about that upfront rather than burying it in the instructions — it's a better signal of company culture than the technical requirements are.

## LLM integration note

The current filters are dropdown-based — students must know the exact specialism name ("PDO Threads", not "thread lifting"). The obvious upgrade is semantic search: students type natural language like *"someone near Manchester for lip filler training"*, and an embedding model (e.g. via Vercel AI Gateway) matches against trainer profiles (name + bio + specialisms concatenated as a document). Results are ranked by cosine similarity rather than exact string match. Implementation: embed trainer profiles at build time, store vectors in Postgres (pgvector), embed the query at request time, return top-k matches. This would replace or augment the dropdown filters without changing the page structure.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with run instructions, critique, and LLM note"
```

---

### Task 8: GitHub repo

- [ ] **Step 1: Push to GitHub**

Create a new **public** repo on GitHub named `aesthetic-training-hub` (no README, no .gitignore — we already have both).

```bash
git remote add origin https://github.com/<your-username>/aesthetic-training-hub.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Verify**

Open the repo URL in a browser. Confirm the README renders correctly and all files are present.

- [ ] **Step 3: Send to Ashley**

Reply to Ashley's email with the repo URL. Book your call at https://calendar.app.google/9WewbP33ED1kHMKy5 (at least 24h after sending the repo).
```
