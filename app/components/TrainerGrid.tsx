'use client'

import { useState } from 'react'
import TrainerCard from './TrainerCard'
import TrainerModal from './TrainerModal'
import type { Trainer } from '@/lib/trainers'

export default function TrainerGrid({ trainers }: { trainers: Trainer[] }) {
  const [selected, setSelected] = useState<Trainer | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <button
            key={trainer.id}
            onClick={() => setSelected(trainer)}
            className="text-left cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`View profile for ${trainer.name}`}
          >
            <TrainerCard trainer={trainer} />
          </button>
        ))}
      </div>
      <TrainerModal trainer={selected} onClose={() => setSelected(null)} />
    </>
  )
}
