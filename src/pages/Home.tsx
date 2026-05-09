import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getStores } from '@/lib/api'
import { AlertCircle, MapPin, ChevronRight } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  const { data: stores, isLoading, error } = useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">WeedFinder</h1>
          <p className="text-muted-foreground">
            Choose a dispensary to start searching
          </p>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8 space-y-3">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
            <p className="text-lg font-medium">Couldn't load stores</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        )}

        {stores && stores.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No stores available yet.
          </p>
        )}

        {stores && stores.length > 0 && (
          <div className="space-y-2">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => navigate(`/store/${store.id}`)}
                className="w-full flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left cursor-pointer"
              >
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{store.name}</p>
                  {(store.city || store.state) && (
                    <p className="text-sm text-muted-foreground">
                      {[store.city, store.state].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
