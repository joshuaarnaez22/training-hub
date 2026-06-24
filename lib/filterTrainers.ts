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
