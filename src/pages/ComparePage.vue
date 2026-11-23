<template>
  <div class="container py-4">
    <h1 class="mb-4">Сравнение текстов</h1>

    <div class="row">
      <div class="col-md-6">
        <TextEditor
          v-model="text1"
          label="Текст 1"
          placeholder="Вставьте первый текст..."
        />
      </div>
      <div class="col-md-6">
        <TextEditor
          v-model="text2"
          label="Текст 2"
          placeholder="Вставьте второй текст..."
        />
      </div>
    </div>

    <div class="text-center my-4">
      <button
        class="btn btn-primary btn-lg"
        @click="doCompare"
        :disabled="loading || !text1 || !text2"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ loading ? 'Сравнение...' : 'Сравнить' }}
      </button>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <SimilarityScore :percentage="store.similarity" />
    <ComparisonResult :summary="store.summary" />
  </div>
</template>

<script setup lang="ts">
import { useComparison } from '@/composables/useComparison'
import { useComparisonStore } from '@/stores/comparison'
import TextEditor from '@/components/TextEditor.vue'
import ComparisonResult from '@/components/ComparisonResult.vue'
import SimilarityScore from '@/components/SimilarityScore.vue'

const { text1, text2, loading, error, compare: doCompare } = useComparison()
const store = useComparisonStore()
</script>
