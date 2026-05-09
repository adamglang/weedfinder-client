import type { SearchFilters, NaturalLanguageSearchResponse } from '@/types/search'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export interface Store {
  id: string
  name: string
  city: string | null
  state: string | null
  is_active: boolean
}

interface StoresResponse {
  statusCode: number
  data: Store[]
  metadata: { pagination: unknown; count: number }
}

export async function getStores(): Promise<Store[]> {
  const response = await fetch(`${API_URL}/api/v1/stores?is_active=true`)

  if (!response.ok) {
    throw new Error(`Failed to load stores: ${response.status}`)
  }

  const json: StoresResponse = await response.json()
  return json.data ?? []
}

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
