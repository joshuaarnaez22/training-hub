'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function TrainerAvatar({
  name,
  imageUrl,
  className,
}: {
  name: string
  imageUrl: string
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className={cn('flex items-center justify-center rounded-full bg-secondary text-foreground/60 text-xs font-medium shrink-0', className)}>
        {initials(name)}
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={name}
      className={cn('rounded-full object-cover shrink-0', className)}
      onError={() => setErrored(true)}
    />
  )
}
