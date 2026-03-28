import { Skeleton } from '@/components/ui/skeleton'
import ProductCard from './ProductCard'
import type { SearchResult, SearchMetadata } from '@/types/search'

interface SearchResultsProps {
  results: SearchResult[]
  metadata: SearchMetadata
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-4 space-y-3">
          <div className="flex justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

export default function SearchResults({ results, metadata }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">No products match your search at this store</p>
        <p className="text-muted-foreground mt-2">
          Try describing different effects, or ask for a specific strain
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between text-sm text-muted-foreground">
        <span>Found {results.length} products</span>
        <span>
          Searched {metadata.products_evaluated} products in {metadata.processing_time_ms}ms
        </span>
      </div>

      <div className="space-y-3">
        {results.map((result) => (
          <ProductCard key={result.product_id} result={result} />
        ))}
      </div>
    </div>
  )
}
