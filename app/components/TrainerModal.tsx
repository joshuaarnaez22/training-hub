'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { MapPin, Sparkles, Clock, GraduationCap, BookOpen, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Trainer } from '@/lib/trainers'
import TrainerAvatar from './TrainerAvatar'

export default function TrainerModal({
  trainer,
  onClose,
}: {
  trainer: Trainer | null
  onClose: () => void
}) {
  const isPremium = trainer?.plan === 'premium'

  return (
    <Dialog open={!!trainer} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden gap-0">
        {trainer && (
          <>
            {isPremium && <div className="h-2 w-full bg-premium-amber" />}

            <div className="p-6 space-y-5">
              <DialogHeader>
                {/* Photo + name + badge */}
                <div className="flex items-start gap-4">
                  <TrainerAvatar
                    name={trainer.name}
                    imageUrl={trainer.imageUrl}
                    className={cn('size-16', isPremium ? 'ring-2 ring-premium-amber' : 'ring-1 ring-foreground/10')}
                  />
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <DialogTitle className="text-lg leading-tight font-semibold">
                        {trainer.name}
                      </DialogTitle>
                      {isPremium ? (
                        <Badge className="shrink-0 bg-premium-amber text-premium-amber-ink hover:bg-premium-amber gap-1">
                          <Sparkles className="size-3" aria-hidden="true" />
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="shrink-0">Standard</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5 opacity-60" strokeWidth={1.75} />
                        {trainer.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5 opacity-60" strokeWidth={1.75} />
                        {trainer.yearsExperience} years experience
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed">
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

              {/* Qualifications */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <GraduationCap className="size-3.5" />
                  Qualifications
                </h3>
                <ul className="space-y-1">
                  {trainer.qualifications.map((q) => (
                    <li key={q} className="text-sm flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-foreground/30 shrink-0" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Courses */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <BookOpen className="size-3.5" />
                  Courses Offered
                </h3>
                <ul className="space-y-1">
                  {trainer.courses.map((c) => (
                    <li key={c} className="text-sm flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-foreground/30 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-1 border-t border-border">
                <a
                  href={`mailto:enquiries@aesthetichub.co.uk?subject=Course enquiry — ${encodeURIComponent(trainer.name)}`}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isPremium
                      ? 'bg-premium-amber text-premium-amber-ink hover:bg-premium-amber/90'
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  )}
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Enquire about courses
                </a>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
