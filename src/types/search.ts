export interface SearchFilters {
  in_stock_only?: boolean
  categories?: string[]
  min_price_cents?: number
  max_price_cents?: number
  strain_type?: string
}

export interface NaturalLanguageSearchRequest {
  query: string
  filters?: SearchFilters
  limit?: number
}

export interface QueryInterpretation {
  query_type: string
  desired_effects: Record<string, number>
  avoided_effects: Record<string, number>
  strain_reference: string | null
  price_preference: string | null
  non_effect_preferences: string[]
  summary: string
}

export interface SearchResult {
  product_id: string
  product_name: string
  brand_name: string | null
  strain_name: string | null
  strain_type: string | null
  category: string | null
  price_cents: number | null
  in_stock: boolean
  thc_percentage: number | null
  cbd_percentage: number | null
  effect_profile: Record<string, number>
  top_effects: string[]
  relevance_score: number
  confidence: number
  match_reason: string
}

export interface SearchMetadata {
  store_id: string
  processing_time_ms: number
  products_evaluated: number
  profiles_with_high_confidence: number
}

export interface NaturalLanguageSearchResponse {
  query_interpretation: QueryInterpretation
  results: SearchResult[]
  fallback_applied: boolean
  metadata: SearchMetadata
}
