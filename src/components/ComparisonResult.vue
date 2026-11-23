<template>
  <div class="card mb-3">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0">Сводка различий</h5>
    </div>
    <div class="card-body">
      <p v-if="!summary" class="text-muted">Результат сравнения появится здесь.</p>
      <div v-else class="result-text" v-html="formattedSummary"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  summary?: string | null
}>()

const formattedSummary = computed(() => {
  if (!props.summary) return ''
  // Simple formatting: convert newlines to <br>
  return props.summary.replace(/\n/g, '<br>')
})
</script>

<style scoped>
.result-text {
  white-space: pre-wrap;
}
</style>
