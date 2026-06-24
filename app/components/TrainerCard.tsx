import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Trainer } from '@/lib/trainers'

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  const isPremium = trainer.plan === 'premium'

  return (
    <Card
      className={
        isPremium
          ? 'ring-2 ring-amber-400 shadow-md bg-amber-50'
          : 'shadow-sm'
      }
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{trainer.name}</CardTitle>
          {isPremium ? (
            <Badge className="shrink-0 bg-amber-400 text-amber-900 hover:bg-amber-400">
              ⭐ Premium
            </Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0">
              Standard
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{trainer.bio}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {trainer.specialisms.map((s) => (
            <Badge key={s} variant="outline" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          📍 {trainer.location}
        </p>
      </CardContent>
    </Card>
  )
}
