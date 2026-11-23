import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ComparisonResult } from '@/types'

export const useComparisonStore = defineStore('comparison', () => {
  const result = ref<ComparisonResult | null>(null)
  const summary = computed(() => result.value?.summary)
  const similarity = computed(() => result.value?.similarity)

  function setResult(newResult: ComparisonResult) {
    result.value = newResult
  }

  return { result, summary, similarity, setResult }
})
