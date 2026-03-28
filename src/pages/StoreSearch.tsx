import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from '@/lib/api'
import SearchBar from '@/components/search/SearchBar'
import QueryInterpretation from '@/components/search/QueryInterpretation'
import FallbackNotice from '@/components/search/FallbackNotice'
import SearchResults, { SearchResultsSkeleton } from '@/components/search/SearchResults'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function StoreSearch() {
  const { storeId } = useParams<{ storeId: string }>()
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', storeId, searchQuery],
    queryFn: () => searchProducts(storeId!, searchQuery),
    enabled: !!searchQuery && !!storeId,
    retry: false,
  })

  const hasResults = !!data && data.results.length > 0
  const isClarification = data?.query_interpretation.query_type === 'clarification_needed'

  function handleSearch(query: string) {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`w-full transition-all duration-300 ${
          data || isLoading || error
            ? 'pt-6 pb-4 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b'
            : 'flex-1 flex items-center'
        }`}
      >
        <div className="w-full max-w-2xl mx-auto px-4">
          {!(data || isLoading || error) && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">WeedFinder</h1>
              <p className="text-muted-foreground mt-2">
                Describe what you're looking for in your own words
              </p>
            </div>
          )}
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            hasResults={!!(data || isLoading || error)}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
        {isLoading && <SearchResultsSkeleton />}

        {error && (
          <div className="text-center py-12 space-y-4">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
            <div>
              <p className="text-lg font-medium">
                {error.message === 'Store not found'
                  ? "This store hasn't been set up yet"
                  : 'Something went wrong'}
              </p>
              <p className="text-muted-foreground mt-1">
                {error.message === 'Store not found'
                  ? 'Check the URL and try again.'
                  : 'Please try again.'}
              </p>
            </div>
            {error.message !== 'Store not found' && (
              <Button variant="outline" onClick={() => setSearchQuery((q) => q + ' ')}>
                Retry
              </Button>
            )}
          </div>
        )}

        {data && !isClarification && (
          <>
            <QueryInterpretation interpretation={data.query_interpretation} />
            {data.fallback_applied && (
              <FallbackNotice strainReference={data.query_interpretation.strain_reference} />
            )}
            <SearchResults results={data.results} metadata={data.metadata} />
          </>
        )}

        {data && isClarification && (
          <QueryInterpretation interpretation={data.query_interpretation} />
        )}
      </div>
    </div>
  )
}
