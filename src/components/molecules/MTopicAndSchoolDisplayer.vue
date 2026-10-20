<!-- Thema und Schule einer Aufgabe nebeneinander: die beiden Displayer als
     Flex-Items in einer Zeile, die nicht umbricht. -->
<template>
  <div class="m-topic-and-school-displayer">
    <MTopicDisplayer :topic="topic" />
    <MSchoolDisplayer :school="school" />
  </div>
</template>

<script setup lang="ts">
import MTopicDisplayer from './MTopicDisplayer.vue'
import MSchoolDisplayer from './MSchoolDisplayer.vue'
import type { School, Topic } from '@/types/quiz'

defineProps<{
  topic: Topic | string | undefined
  school?: School | string
}>()
</script>

<style scoped>
.m-topic-and-school-displayer {
  display: flex;
  flex-direction: row;
  gap: 2px;
  flex-wrap: nowrap;
}
</style>
