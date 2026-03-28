import { HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { QueryInterpretation as QueryInterpretationType } from '@/types/search'

interface QueryInterpretationProps {
  interpretation: QueryInterpretationType
}

export default function QueryInterpretation({ interpretation }: QueryInterpretationProps) {
  const isClarification = interpretation.query_type === 'clarification_needed'

  if (isClarification) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800">{interpretation.summary}</p>
      </div>
    )
  }

  const desiredEntries = Object.entries(interpretation.desired_effects)
  const avoidedEntries = Object.entries(interpretation.avoided_effects)

  return (
    <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
      <p className="text-sm text-muted-foreground">
        Showing results for: <span className="text-foreground font-medium">{interpretation.summary}</span>
      </p>

      {(desiredEntries.length > 0 || avoidedEntries.length > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {desiredEntries.map(([effect, intensity]) => (
            <Badge key={effect} variant="secondary" className="text-xs">
              {effect} {intensity.toFixed(1)}
            </Badge>
          ))}
          {avoidedEntries.map(([effect]) => (
            <Badge key={effect} variant="destructive" className="text-xs bg-red-100 text-red-700 border-red-200">
              avoiding: {effect}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
