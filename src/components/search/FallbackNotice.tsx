import { AlertTriangle } from 'lucide-react'

interface FallbackNoticeProps {
  strainReference: string | null
}

export default function FallbackNotice({ strainReference }: FallbackNoticeProps) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-amber-800">
          {strainReference
            ? `${strainReference} isn't available at this store`
            : "The specific product you asked about isn't available here"}
        </p>
        <p className="text-sm text-amber-700 mt-1">
          Here are products with a similar effect profile:
        </p>
      </div>
    </div>
  )
}
