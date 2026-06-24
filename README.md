# Aesthetic Training Hub — Public Directory

The public directory page for the Aesthetic Training Hub: a marketplace where vetted UK aesthetics trainers list themselves and prospective students discover them. Trainers subscribe on one of two tiers — **Standard (£150/mo)** or **Premium (£249/mo)**.

## How to run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

To run the tests:

```bash
npm test
```

**Requirements:** Node 18+. No database, no environment variables, no external services — it runs as-is.

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS, shadcn/ui. Data is a typed in-memory array — the brief said that was fine, so I didn't reach for a database.

## What I built

- **Directory page** listing 35 sample trainers (15 Premium, 20 Standard), each showing name, specialism(s), location, and plan tier.
- **Premium trainers stand out** three ways: a gold ring + amber background tint, a `⭐ Premium` badge, and they always sort to the top of the list. A trainer paying £249/mo should get better *placement*, not just a different-coloured card — the visual treatment and the ordering reinforce each other.
- **Filtering by specialism, location, and plan tier.** A free-text search box also filters by name and bio. All filters are driven by URL search params (`?specialism=Botox&location=London`), so the page is a Server Component with no client-side filtering state, and any filtered view is a shareable/bookmarkable URL.
- **Pagination** at 9 cards per page, with page preserved in the URL and reset on any filter change.
- **Trainer detail modal** on card click, showing full bio, years of experience, qualifications, and courses offered. A mailto CTA lets a student initiate an enquiry directly from the modal.
- **Empty state** when no trainer matches the active filters.
- **Unit tests** (Vitest, 9 tests) covering the filter logic: each filter axis, combinations, no-match cases, search query, and premium-first ordering.

### Architecture

```
app/
  page.tsx              Server Component — reads URL params, filters, paginates, renders
  layout.tsx            Root layout + fonts
  components/
    TrainerCard.tsx     Presentational card; Premium vs Standard styling
    TrainerGrid.tsx     Client Component; manages modal open/close state
    TrainerModal.tsx    Client Component; full trainer profile in a dialog
    TrainerAvatar.tsx   Avatar with image + initials fallback
    FilterBar.tsx       Client Component; pushes filter changes to the URL
    Pagination.tsx      URL-driven page controls
lib/
  trainers.ts           Trainer type + seed data; SPECIALISMS/LOCATIONS derived from the data
  filterTrainers.ts     Pure, tested filtering + premium-first sort
```

Filter options are derived from the trainer data (`Array.from(new Set(...))`), not hardcoded — add a trainer with a new specialism and the dropdown updates itself.

## What I skipped (and why)

- **A database.** In-memory was explicitly allowed and 35 records don't justify the setup cost. `lib/trainers.ts` is the single seam to swap for a real data source.
- **Trainer detail pages (`/trainers/[id]`).** The modal covers the student's need to read a profile before enquiring. Dedicated routes would add value for SEO and direct linking, but are out of scope for a directory page.
- **Auth, the trainer-facing signup/billing flow.** Out of scope for a public directory page.

## What I'd do next

1. Postgres + an ORM (Prisma/Drizzle), keeping `filterTrainers` as the query boundary.
2. Trainer detail pages (`/trainers/[id]`) for SEO and direct linking.
3. Stripe subscriptions for the two tiers + an admin vetting/approval queue.
4. A free-text semantic search upgrade: embed each trainer profile into a vector at write time, rank by cosine similarity at query time, stored in Postgres via `pgvector`. See the LLM note below.

## Where the brief was unclear or incomplete

You asked for this part specifically, so here it is, straight.

1. **"Filter by specialism *or* location (your choice)" is the wrong framing.** These aren't alternatives — a real student wants "a lip-filler trainer near Manchester," i.e. both at once. Offering only one axis would feel broken. I built both, because picking one would have been technically compliant and practically useless. If the "or" was a deliberate scope-cut to save my time, it cut the wrong thing: the second filter is ~15 lines.

2. **"Make Premium stand out — your call" leaves the most important product question to the contractor.** How Premium is differentiated *is* the core of a two-tier marketplace's value proposition — it's what trainers are paying ~£99/mo extra for. I made a call (styling + top placement), but in a real engagement I'd push this back to you, because the answer is a business decision with revenue implications, not a styling preference. If Premiums always sort first, what happens when *every* trainer in a city is Premium? What stops the directory becoming pay-to-win and losing student trust? That's the conversation the brief skips.

3. **"A few sample trainers" is underspecified in a way that matters.** With 3 trainers you can't meaningfully demonstrate filtering or the premium/standard split. I used 35 (15 Premium, 20 Standard) so every interaction — including pagination — has something to show. Worth saying "enough to exercise the features."

4. **No mention of empty states, loading, or what a student does *after* finding a trainer.** A directory that can't take you anywhere is a dead end. I added a mailto enquiry CTA in the trainer modal as the minimum viable answer to this. The single most valuable missing requirement isn't visual polish — it's the contact/enquiry action, which is presumably how the marketplace actually creates value for the trainers paying you.

5. **What I'd change about the task itself:** the most revealing instruction here is "tell me what I got wrong." That signals you're hiring for judgment and communication, not just the ability to render a card grid. I'd lead with that — make the critique the headline deliverable and the page the supporting evidence, rather than the other way around. It's a better filter for the role you're describing.

## Optional: using an LLM in this feature

The filters are exact-match dropdowns — a student has to know the term is "PDO Threads," not "thread lift," and "Anti-Wrinkle," not "frown lines." The natural LLM upgrade is **semantic search**: a single box where a student types *"someone near Manchester for natural-looking lip filler"* and gets ranked results.

Concretely: at build/write time, embed each trainer profile (name + bio + specialisms) into a vector; at query time, embed the student's text and rank trainers by cosine similarity, blended with a hard location filter. Store vectors in Postgres via `pgvector`. This augments the dropdowns rather than replacing them, and it's the feature most likely to improve student→trainer match quality — which is what the marketplace is ultimately selling.

A lighter first step that ships in an afternoon: an LLM call that maps a free-text query to the existing structured filters (`"frown lines in London"` → `{ specialism: "Anti-Wrinkle", location: "London" }`), reusing the `filterTrainers` function already in place. Cheaper to build, no vector store, and it makes the existing filters feel intelligent.
