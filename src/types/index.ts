export interface ComparisonResult {
  summary: string
  similarity: number  // 0-100
  differences?: string[]
}
