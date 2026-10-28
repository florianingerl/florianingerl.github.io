<template>
  <div :class="{ 'vue-exercise--vollbild': vollbild }">
    <MTopicAndSchoolDisplayer :topic="exercise.topic" :school="exercise.school" />

    <!-- Horizontale Zweiteilung: links das Aufgabenbild, rechts die Aufgabe.
         Der Benutzer kann die Trennlinie (den Splitter-Riegel) verschieben. -->
    <Splitter class="vue-exercise-splitter">
      <SplitterPanel :size="50" :minSize="10">
        <!-- Das Bild liegt in einem scrollbaren Rahmen. object-fit: cover
             fuellt den Rahmen vollstaendig aus und beschneidet an den Raendern. -->
        <div class="vue-exercise__bild-wrapper">
          <img
            class="vue-image__img"
            :src="bildSrc"
            :alt="exercise.questionOrInstruction ?? ''"
            @error="bildFehlerhaft"
          />
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import VueMCGaps from './VueMCGaps.vue'
import VueMatching from './VueMatching.vue'
import VueQuestion from './VueQuestion.vue'
import VueWordOrder from './VueWordOrder.vue'
import MTopicAndSchoolDisplayer from '@/components/molecules/MTopicAndSchoolDisplayer.vue'
import type { Exercise, Lang } from '@/types/quiz'

const DEFAULT_BILD = 'assets/img/cs/fragezeichen.jpg'

const props = defineProps<{
  exercise: Exercise
  lg: Lang
  // Im Vollbildmodus fuellen Bild und Splitter die verfuegbare Hoehe.
  vollbild?: boolean
}>()

const emit = defineEmits<{ (e: 'answered-event'): void }>()

const bildSrc = ref(props.exercise.imageUrl?.trim() || DEFAULT_BILD)

watch(
  () => props.exercise.imageUrl,
  (url) => {
    bildSrc.value = url?.trim() || DEFAULT_BILD
  },
)

function bildFehlerhaft(): void {
  if (bildSrc.value !== DEFAULT_BILD) {
    bildSrc.value = DEFAULT_BILD
  }
}

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
   Rahmen. Das Bild selbst fuellt ihn mit object-fit: cover aus. Die Hoehe kommt
   aus der gemeinsamen CSS-Variablen (im Vollbild 100%). */
.vue-exercise__bild-wrapper {
  overflow: auto;
  height: var(--exercise-image-height);
}

.vue-image__img {
  display: block;
  width: 100%;
  height: var(--exercise-image-height);
  object-fit: cover;
  object-position: center;
}

/* Der Inhalt rechts scrollt bei Bedarf, statt das Layout zu sprengen. */
.vue-exercise__inhalt {
  overflow: auto;
}

/* Im Vollbild wird die Komponente eine Spalte und der Splitter nimmt die
   verfuegbare Hoehe ein; das Bild fuellt sein Panel. */
.vue-exercise--vollbild {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.vue-exercise--vollbild .vue-exercise-splitter {
  flex-grow: 1;
  min-height: 0;
}

.vue-exercise--vollbild .vue-exercise__bild-wrapper {
  min-height: 0;
}
</style>
