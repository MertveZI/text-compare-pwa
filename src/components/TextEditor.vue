<template>
  <div class="mb-3">
    <label :for="id" class="form-label fw-bold">{{ label }}</label>
    <textarea
      :id="id"
      v-model="model"
      class="form-control"
      rows="8"
      :placeholder="placeholder"
    ></textarea>
    <div class="form-text text-end">{{ charCount }} символов</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const id = `text-${props.label.toLowerCase().replace(/\s+/g, '-')}`

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const charCount = computed(() => props.modelValue.length)
</script>
