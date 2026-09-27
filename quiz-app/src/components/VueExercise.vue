<template>
  <div>
    <p class="mb-1">
      <span v-if="topicTitle">
        <label class="me-1 fw-semibold">Topic:</label>
        <span class="badge text-bg-secondary">{{ topicTitle }}</span>
      </span>
      <span v-else-if="topicLoadFailed" class="text-danger">
        The topic of this exercise couldn't be loaded.
      </span>
      <span v-else class="text-muted">
        This exercise isn't classified under a topic.
      </span>
    </p>

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
import { ref, watch } from 'vue'
import VueImage from './VueImage.vue'
import VueMCGaps from './VueMCGaps.vue'
import VueQuestion from './VueQuestion.vue'
import { getTopic } from '../api.ts'
import type { Exercise, Lang } from '../types.ts'

const props = defineProps<{
  exercise: Exercise
  lg: Lang
}>()

const emit = defineEmits<{ (e: 'answered-event'): void }>()

const topicTitle = ref<string>('')
const topicLoadFailed = ref(false)

// Das Topic liegt entweder schon vor oder muss anhand seiner Id geladen werden.
async function loadTopic(): Promise<void> {
  const topic = props.exercise.topic
  topicLoadFailed.value = false

  if (!topic) {
    topicTitle.value = ''
    return
  }

  try {
    const geladen = typeof topic === 'string' ? await getTopic(topic) : topic
    topicTitle.value = geladen.title
  } catch (e) {
    console.log("The topic couldn't be loaded: " + (e as Error).message)
    topicTitle.value = ''
    topicLoadFailed.value = true
  }
}

watch(() => props.exercise.topic, loadTopic, { immediate: true })
</script>
