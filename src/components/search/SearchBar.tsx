import { useRef, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const EXAMPLE_PROMPTS = [
  'something creative and energetic',
  'I want to relax but not fall asleep',
  'something like Blue Dream',
]

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
  hasResults: boolean
}

export default function SearchBar({ onSearch, isLoading, hasResults }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="What kind of experience are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="h-12 pl-10 text-base md:text-lg"
          />
        </div>
        <Button type="submit" disabled={isLoading || !query.trim()} size="lg" className="h-12 px-6">
          {isLoading ? (
            <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            'Search'
          )}
        </Button>
      </form>

      {!hasResults && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                setQuery(prompt)
                onSearch(prompt)
              }}
              className="text-sm text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1.5 transition-colors hover:bg-accent"
            >
              Try: &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
