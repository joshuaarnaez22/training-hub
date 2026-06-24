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
