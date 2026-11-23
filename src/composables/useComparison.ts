import { ref } from 'vue'
import { compare } from '@/services/llm-api'
import { useComparisonStore } from '@/stores/comparison'

export function useComparison() {
  const text1 = ref('')
  const text2 = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const comparisonStore = useComparisonStore()

  async function doCompare() {
    loading.value = true
    error.value = null
    try {
      const result = await compare(text1.value, text2.value)
      comparisonStore.setResult(result)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return { text1, text2, loading, error, compare: doCompare }
}
