<template>
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
    <span v-if="schoolName" class="ms-2">
      <label class="me-1 fw-semibold">School:</label>
      <span class="badge text-bg-secondary">{{ schoolName }}</span>
    </span>
  </p>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getTopic } from '@/api'
import type { School, Topic } from '@/types/quiz'

const props = defineProps<{
  topic: Topic | string | undefined
  // Die Schule der Aufgabe. Der Server schickt sie als Dokument mit (populate).
  school?: School | string
}>()

// Der Name der Schule, falls die Aufgabe eine hat.
const schoolName = computed(() => {
  const s = props.school
  return s && typeof s !== 'string' ? s.name ?? '' : ''
})

const topicTitle = ref<string>('')
const topicLoadFailed = ref(false)

// damit eine langsamere ältere Antwort das Ergebnis nicht überschreibt
let laufendeAbfrage = 0

// Das Topic liegt entweder schon vor oder muss anhand seiner Id geladen werden.
async function loadTopic(): Promise<void> {
  const topic = props.topic
  const abfrage = ++laufendeAbfrage
  topicLoadFailed.value = false

  if (!topic) {
    topicTitle.value = ''
    return
  }

  try {
    const geladen = typeof topic === 'string' ? await getTopic(topic) : topic
    if (abfrage !== laufendeAbfrage) return
    topicTitle.value = geladen.title
  } catch (e) {
    if (abfrage !== laufendeAbfrage) return
    console.log("The topic couldn't be loaded: " + (e as Error).message)
    topicTitle.value = ''
    topicLoadFailed.value = true
  }
}

watch(() => props.topic, loadTopic, { immediate: true })
</script>
