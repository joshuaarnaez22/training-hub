import { Badge } from '@/components/ui/badge'
import { MapPin, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Trainer } from '@/lib/trainers'
import TrainerAvatar from './TrainerAvatar'

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  const isPremium = trainer.plan === 'premium'

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl p-4 ring-1 overflow-hidden h-full',
        'transition-[box-shadow,transform] duration-150 motion-reduce:transition-none',
        isPremium
          ? 'bg-premium-amber-surface ring-2 ring-premium-amber shadow-md hover:shadow-lg hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
          : 'bg-card ring-foreground/10 hover:shadow-sm hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
      )}
    >
      {/* Header: avatar + name + tier badge */}
      <div className="flex items-start gap-3">
        <TrainerAvatar
          name={trainer.name}
          imageUrl={trainer.imageUrl}
          className={cn('size-10', isPremium ? 'ring-2 ring-premium-amber' : 'ring-1 ring-foreground/10')}
        />

        <div className="flex flex-1 items-start justify-between gap-2 min-w-0 pt-0.5">
          <div className="font-medium text-foreground leading-snug [text-wrap:balance]">
            {trainer.name}
          </div>
          {isPremium ? (
            <Badge className="shrink-0 bg-premium-amber text-premium-amber-ink hover:bg-premium-amber gap-1">
              <Sparkles aria-hidden="true" />
              Premium
            </Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0">
              Standard
            </Badge>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground [text-wrap:pretty] line-clamp-2">
        {trainer.bio}
      </p>

      {/* Specialisms */}
      <div className="flex flex-wrap gap-1.5">
        {trainer.specialisms.map((s) => (
          <Badge key={s} variant="outline" className="text-xs font-normal">
            {s}
          </Badge>
        ))}
      </div>

      {/* Location — pushed to bottom */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-auto pt-1">
        <MapPin className="size-3.5 shrink-0 opacity-60" strokeWidth={1.75} />
        <span>{trainer.location}</span>
      </div>
    </div>
  )
}
