'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
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
  plan,
  q,
}: {
  specialism: string
  location: string
  plan: string
  q: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [searchValue, setSearchValue] = useState(q)

  // Sync local state if URL changes (e.g. browser back)
  useEffect(() => { setSearchValue(q) }, [q])

  // Debounce search → URL, resets page to 1
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== q) pushUrl({ q: searchValue || undefined })
    }, 300)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  function pushUrl(overrides: Partial<{ specialism: string; location: string; plan: string; q: string }>) {
    const next = { specialism, location, plan, q, ...overrides }
    const params = new URLSearchParams()
    if (next.specialism && next.specialism !== ALL) params.set('specialism', next.specialism)
    if (next.location && next.location !== ALL) params.set('location', next.location)
    if (next.plan && next.plan !== ALL) params.set('plan', next.plan)
    if (next.q) params.set('q', next.q)
    // page intentionally omitted — any filter change resets to page 1
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {/* Search */}
      <div className="relative flex items-center w-full sm:w-auto">
        <Search className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search trainers…"
          aria-label="Search trainers by name or bio"
          className="h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-56"
        />
      </div>

      <Select value={specialism || ALL} onValueChange={(v) => pushUrl({ specialism: v })}>
        <SelectTrigger className="w-full sm:w-48" aria-label="Filter by specialism">
          <SelectValue>{(v) => (v === ALL ? 'All Specialisms' : v)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Specialisms</SelectItem>
          {SPECIALISMS.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={location || ALL} onValueChange={(v) => pushUrl({ location: v })}>
        <SelectTrigger className="w-full sm:w-40" aria-label="Filter by location">
          <SelectValue>{(v) => (v === ALL ? 'All Locations' : v)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Locations</SelectItem>
          {LOCATIONS.map((l) => (
            <SelectItem key={l} value={l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={plan || ALL} onValueChange={(v) => pushUrl({ plan: v })}>
        <SelectTrigger className="w-full sm:w-32" aria-label="Filter by plan">
          <SelectValue>{(v) => (v === ALL ? 'All Plans' : v === 'premium' ? '⭐ Premium' : 'Standard')}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Plans</SelectItem>
          <SelectItem value="premium">⭐ Premium</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
