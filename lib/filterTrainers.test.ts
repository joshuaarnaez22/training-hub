import { describe, it, expect } from 'vitest'
import { trainers } from './trainers'
import { filterTrainers } from './filterTrainers'

describe('filterTrainers', () => {
  it('returns all trainers when no filters applied', () => {
    const result = filterTrainers(trainers)
    expect(result).toHaveLength(35)
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
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((t) => t.specialisms.includes('Botox') && t.location === 'London')).toBe(true)
  })

  it('returns empty array when no matches', () => {
    const result = filterTrainers(trainers, 'Botox', 'Edinburgh')
    expect(result).toHaveLength(0)
  })

  it('filters by plan', () => {
    const premium = filterTrainers(trainers, undefined, undefined, 'premium')
    const standard = filterTrainers(trainers, undefined, undefined, 'standard')
    expect(premium.every((t) => t.plan === 'premium')).toBe(true)
    expect(standard.every((t) => t.plan === 'standard')).toBe(true)
    expect(premium.length + standard.length).toBe(35)
  })

  it('filters by name search query', () => {
    const result = filterTrainers(trainers, undefined, undefined, undefined, 'sarah')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((t) => t.name.toLowerCase().includes('sarah') || t.bio.toLowerCase().includes('sarah'))).toBe(true)
  })

  it('returns empty when search matches nothing', () => {
    const result = filterTrainers(trainers, undefined, undefined, undefined, 'zzznomatch')
    expect(result).toHaveLength(0)
  })

  it('sorts premium trainers before standard', () => {
    const result = filterTrainers(trainers)
    const firstStandardIndex = result.findIndex((t) => t.plan === 'standard')
    const lastPremiumIndex = result.map((t) => t.plan).lastIndexOf('premium')
    expect(lastPremiumIndex).toBeLessThan(firstStandardIndex)
  })
})
