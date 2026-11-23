<template>
  <div class="card mb-3">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0">Процент совпадения</h5>
    </div>
    <div class="card-body">
      <div v-if="percentage === undefined || percentage === null" class="text-muted">
        Результат появится после сравнения.
      </div>
      <div v-else>
        <div class="d-flex align-items-center mb-2">
          <span class="fs-3 fw-bold me-2">{{ percentage }}%</span>
          <span class="badge" :class="colorClass">{{ colorLabel }}</span>
        </div>
        <div class="progress" role="progressbar" aria-label="Similarity">
          <div
            class="progress-bar"
            :class="progressClass"
            :style="{ width: percentage + '%' }"
            :aria-valuenow="percentage"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {{ percentage }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage?: number | null
}>()

const colorClass = computed(() => {
  if (props.percentage === undefined || props.percentage === null) return 'bg-secondary'
  if (props.percentage >= 80) return 'bg-success'
  if (props.percentage >= 50) return 'bg-warning text-dark'
  return 'bg-danger'
})

const colorLabel = computed(() => {
  if (props.percentage === undefined || props.percentage === null) return 'Ожидание'
  if (props.percentage >= 80) return 'Высокое'
  if (props.percentage >= 50) return 'Среднее'
  return 'Низкое'
})

const progressClass = computed(() => {
  if (props.percentage === undefined || props.percentage === null) return ''
  if (props.percentage >= 80) return 'bg-success'
  if (props.percentage >= 50) return 'bg-warning'
  return 'bg-danger'
})
</script>
