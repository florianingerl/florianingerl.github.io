<!-- Zeigt die Schule einer Aufgabe an: Label "School:" und den Schulnamen als
     Badge. Hat die Aufgabe keine Schule, wird nichts angezeigt. -->
<template>
  <div v-if="schoolName" class="m-school-displayer">
    <label class="me-1 fw-semibold">School:</label>
    <span class="badge text-bg-secondary m-school-displayer__badge">{{ schoolName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { School } from '@/types/quiz'

const props = defineProps<{
  // Die Schule der Aufgabe. Der Server schickt sie als Dokument mit (populate).
  school?: School | string
}>()

// Der Name der Schule, falls die Aufgabe eine hat.
const schoolName = computed(() => {
  const s = props.school
  return s && typeof s !== 'string' ? s.name ?? '' : ''
})
</script>

<style scoped>
.m-school-displayer {
  flex-shrink: 1;
}

.m-school-displayer__badge {
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
