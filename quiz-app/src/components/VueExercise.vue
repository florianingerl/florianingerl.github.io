<template>
  <div>
    <VueTopicDisplayer :topic="exercise.topic" />

    <VueImage :imageUrl="exercise.imageUrl">
      <VueMCGaps
        v-if="exercise.type === 'gapText'"
        :exercise="exercise"
        :lg="lg"
        @answered-event="emit('answered-event')"
      />
      <VueQuestion
        v-else
        :question="exercise"
        :lg="lg"
        @answered-event="emit('answered-event')"
      />
    </VueImage>
  </div>
</template>

<script setup lang="ts">
import VueImage from './VueImage.vue'
import VueMCGaps from './VueMCGaps.vue'
import VueQuestion from './VueQuestion.vue'
import VueTopicDisplayer from './VueTopicDisplayer.vue'
import type { Exercise, Lang } from '../types.ts'

defineProps<{
  exercise: Exercise
  lg: Lang
}>()

const emit = defineEmits<{ (e: 'answered-event'): void }>()
</script>
