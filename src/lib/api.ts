import type { SearchFilters, NaturalLanguageSearchResponse } from '@/types/search'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function searchProducts(
  storeId: string,
  query: string,
  filters?: SearchFilters,
  limit?: number,
): Promise<NaturalLanguageSearchResponse> {
  const response = await fetch(`${API_URL}/api/v1/stores/${storeId}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, filters, limit: limit ?? 20 }),
  })

  if (!response.ok) {
    if (response.status === 404) throw new Error('Store not found')
    if (response.status === 422) throw new Error('Invalid search query')
    throw new Error(`Search failed: ${response.status}`)
  }

  return response.json()
}
