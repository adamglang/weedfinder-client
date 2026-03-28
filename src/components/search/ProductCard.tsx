import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/types/search'

interface ProductCardProps {
  result: SearchResult
  onClick?: () => void
}

const STRAIN_COLORS: Record<string, string> = {
  sativa: 'bg-[var(--color-sativa)] text-white',
  indica: 'bg-[var(--color-indica)] text-white',
  hybrid: 'bg-[var(--color-hybrid)] text-white',
}

function formatPrice(cents: number | null): string {
  if (cents === null) return 'Price unavailable'
  return `$${(cents / 100).toFixed(2)}`
}

function RelevanceBar({ score }: { score: number }) {
  const percent = Math.round(score * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-8 text-right">{percent}%</span>
    </div>
  )
}

export default function ProductCard({ result, onClick }: ProductCardProps) {
  return (
    <Card
      className={cn(
        'transition-shadow hover:shadow-md cursor-pointer active:scale-[0.99]',
        !result.in_stock && 'opacity-60',
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base leading-tight truncate">{result.product_name}</h3>
            {result.brand_name && (
              <p className="text-sm text-muted-foreground truncate">{result.brand_name}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn('inline-block w-2 h-2 rounded-full', result.in_stock ? 'bg-green-500' : 'bg-gray-300')} />
            <span className="font-semibold text-base">{formatPrice(result.price_cents)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {result.strain_type && (
            <Badge className={cn('text-xs', STRAIN_COLORS[result.strain_type] ?? 'bg-gray-500 text-white')}>
              {result.strain_type}
            </Badge>
          )}
          {result.top_effects.map((effect) => (
            <Badge key={effect} variant="outline" className="text-xs">
              {effect}
            </Badge>
          ))}
        </div>

        <RelevanceBar score={result.relevance_score} />

        <p className="text-sm text-muted-foreground leading-snug">{result.match_reason}</p>

        {(result.thc_percentage !== null || result.cbd_percentage !== null) && (
          <p className="text-xs text-muted-foreground">
            {result.thc_percentage !== null && `THC: ${result.thc_percentage}%`}
            {result.thc_percentage !== null && result.cbd_percentage !== null && ' | '}
            {result.cbd_percentage !== null && `CBD: ${result.cbd_percentage}%`}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
