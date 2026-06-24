import Link from 'next/link'
import { trainers } from '@/lib/trainers'
import { filterTrainers } from '@/lib/filterTrainers'
import TrainerGrid from '@/app/components/TrainerGrid'
import FilterBar from '@/app/components/FilterBar'
import Pagination from '@/app/components/Pagination'
import { SearchX } from 'lucide-react'

const PAGE_SIZE = 9

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ specialism?: string; location?: string; plan?: string; page?: string; q?: string }>
}) {
  const { specialism = '', location = '', plan = '', page = '1', q = '' } = await searchParams
  const planFilter = plan === 'premium' || plan === 'standard' ? plan : undefined
  const results = filterTrainers(trainers, specialism || undefined, location || undefined, planFilter, q || undefined)

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const currentPage = Math.max(1, Math.min(parseInt(page, 10) || 1, totalPages))
  const paginated = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const isFiltered = !!specialism || !!location || !!plan || !!q
  const filterParams = { specialism: specialism || undefined, location: location || undefined, plan: plan || undefined }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-foreground [text-wrap:balance]">
          Aesthetic Training Hub
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Vetted UK aesthetics trainers, ready to teach.
        </p>
      </header>

      {/* Sticky filter strip */}
      <div className="sticky top-0 z-10 border-y border-border bg-background/95 [backdrop-filter:blur(8px)]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <FilterBar specialism={specialism} location={location} plan={plan} q={q} />
          <div className="flex items-center gap-3 shrink-0">
            {isFiltered && (
              <Link
                href="/"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none"
              >
                Clear
              </Link>
            )}
            <p className="text-sm text-muted-foreground tabular-nums">
              {results.length} {results.length === 1 ? 'trainer' : 'trainers'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {results.length > 0 ? (
          <>
            <TrainerGrid trainers={paginated} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              params={filterParams}
            />
            {totalPages > 1 && (
              <p className="mt-4 text-center text-xs text-muted-foreground tabular-nums">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchX
              className="size-10 text-muted-foreground/40 mb-4"
              strokeWidth={1.25}
            />
            <h2 className="text-base font-medium text-foreground">No trainers found</h2>
            <p className="mt-1 text-sm text-muted-foreground max-w-[32ch] [text-wrap:pretty]">
              Try adjusting your filters, or clear them to see all available trainers.
            </p>
            {isFiltered && (
              <Link
                href="/"
                className="mt-6 inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Clear filters
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
