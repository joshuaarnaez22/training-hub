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
