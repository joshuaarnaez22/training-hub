import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Params = { specialism?: string; location?: string; plan?: string }

function buildUrl(page: number, params: Params): string {
  const p = new URLSearchParams()
  if (params.specialism) p.set('specialism', params.specialism)
  if (params.location) p.set('location', params.location)
  if (params.plan) p.set('plan', params.plan)
  if (page > 1) p.set('page', String(page))
  const qs = p.toString()
  return qs ? `/?${qs}` : '/'
}

function pageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const delta = 1
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)
  const pages: (number | '…')[] = [1]
  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

export default function Pagination({
  currentPage,
  totalPages,
  params,
}: {
  currentPage: number
  totalPages: number
  params: Params
}) {
  if (totalPages <= 1) return null

  const pages = pageRange(currentPage, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1"
    >
      <a
        href={buildUrl(currentPage - 1, params)}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          currentPage === 1
            ? 'pointer-events-none text-muted-foreground/40'
            : 'text-foreground hover:bg-secondary'
        )}
      >
        <ChevronLeft className="size-4" />
        Prev
      </a>

      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === '…' ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 py-2 text-sm text-muted-foreground select-none"
            >
              …
            </span>
          ) : (
            <a
              key={page}
              href={buildUrl(page, params)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                'inline-flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                page === currentPage
                  ? 'bg-foreground text-background pointer-events-none'
                  : 'text-foreground hover:bg-secondary'
              )}
            >
              {page}
            </a>
          )
        )}
      </div>

      <a
        href={buildUrl(currentPage + 1, params)}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          currentPage === totalPages
            ? 'pointer-events-none text-muted-foreground/40'
            : 'text-foreground hover:bg-secondary'
        )}
      >
        Next
        <ChevronRight className="size-4" />
      </a>
    </nav>
  )
}
