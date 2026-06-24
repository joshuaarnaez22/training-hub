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

  function update(key: 'specialism' | 'location', value: string | null) {
    const params = new URLSearchParams()
    const current: { specialism: string; location: string } = { specialism, location }
    current[key] = value ?? ALL
    if (current.specialism && current.specialism !== ALL) params.set('specialism', current.specialism)
    if (current.location && current.location !== ALL) params.set('location', current.location)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={specialism || ALL} onValueChange={(v) => update('specialism', v)}>
        <SelectTrigger className="w-52" aria-label="Filter by specialism">
          <SelectValue>{(v) => (v === ALL ? 'All Specialisms' : v)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Specialisms</SelectItem>
          {SPECIALISMS.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={location || ALL} onValueChange={(v) => update('location', v)}>
        <SelectTrigger className="w-44" aria-label="Filter by location">
          <SelectValue>{(v) => (v === ALL ? 'All Locations' : v)}</SelectValue>
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
