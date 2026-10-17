<template>
  <div>
    <VueTopicDisplayer :topic="exercise.topic" :school="exercise.school" />

    <!-- Horizontale Zweiteilung: links das Aufgabenbild, rechts die Aufgabe.
         Der Benutzer kann die Trennlinie (den Splitter-Riegel) verschieben. -->
    <Splitter v-if="exercise.imageUrl" class="vue-exercise-splitter">
      <SplitterPanel :size="50" :minSize="10">
        <!-- Das Bild liegt in einem scrollbaren Rahmen. object-fit: cover
             fuellt den Rahmen vollstaendig aus und beschneidet an den Raendern. -->
        <div class="vue-exercise__bild-wrapper">
          <img
            class="vue-image__img"
            :src="exercise.imageUrl"
            :alt="exercise.question ?? exercise.instruction ?? ''"
          />
        </div>
        <!-- Die Paginierung steht direkt unter dem Bild, wie bisher. -->
        <div class="vue-image__fuss">
          <slot name="pagination"></slot>
        </div>
      </SplitterPanel>

      <SplitterPanel :size="50" :minSize="10" class="vue-exercise__inhalt">
        <component
          :is="exerciseComponent"
          v-bind="exerciseProps"
          @answered-event="emit('answered-event')"
        />
      </SplitterPanel>
    </Splitter>

    <!-- Ohne Bild gibt es keinen Splitter; die Aufgabe nimmt die ganze Breite. -->
    <template v-else>
      <component
        :is="exerciseComponent"
        v-bind="exerciseProps"
        @answered-event="emit('answered-event')"
      />
      <div class="vue-image__fuss">
        <slot name="pagination"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import VueMCGaps from './VueMCGaps.vue'
import VueMatching from './VueMatching.vue'
import VueQuestion from './VueQuestion.vue'
import VueWordOrder from './VueWordOrder.vue'
import VueTopicDisplayer from './VueTopicDisplayer.vue'
import type { Exercise, Lang } from '@/types/quiz'

const props = defineProps<{
  exercise: Exercise
  lg: Lang
}>()

const emit = defineEmits<{ (e: 'answered-event'): void }>()

// Der passende Aufgabentyp zur Aufgabe.
const exerciseComponent = computed(() => {
  switch (props.exercise.type) {
    case 'gapText':
      return VueMCGaps
    case 'matching':
      return VueMatching
    case 'wordOrder':
      return VueWordOrder
    default:
      // multipleChoice und alles Unbekannte zeigen die Fragen-Optionen.
      return VueQuestion
  }
})

// VueQuestion erwartet die Aufgabe als "question", alle anderen als "exercise".
const exerciseProps = computed(() =>
  exerciseComponent.value === VueQuestion
    ? { question: props.exercise, lg: props.lg }
    : { exercise: props.exercise, lg: props.lg },
)
</script>

<style scoped>
/* Der Rahmen des Bildes ist scrollbar, falls das Bild groesser ist als der
   Rahmen. Das Bild selbst fuellt ihn mit object-fit: cover aus. */
.vue-exercise__bild-wrapper {
  overflow: auto;
  height: 200px;
}

.vue-image__img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

/* Der Inhalt rechts scrollt bei Bedarf, statt das Layout zu sprengen. */
.vue-exercise__inhalt {
  overflow: auto;
}

/* Ohne Paginierung entfaellt der Fuss ganz. */
.vue-image__fuss:empty {
  display: none;
}
</style>
