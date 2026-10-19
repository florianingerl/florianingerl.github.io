<!-- Die Filterzeile eines Quiz: der Themenfilter, die Auswahl der Schule und
      der Knopf fuer den erweiterten Filterdialog. Die gewaehlten Werte liegen
      im Filter-Store (pro Quiz getrennt), damit sie den Dialog und die Anzeige
      ueberleben. -->
<template>
  <div class="filter-component">
    <MTopicChooser label="Filter for topic:" v-model="filter.topicId" :topics="topics" />

    <MSchoolChooser
      :schools="schools"
      :model-value="gewaehlteSchulId"
      :select-id="`schoolFilter-${props.quiz}`"
      empty-label="All schools"
      @update:model-value="schuleGewaehlt"
    />

    <button
      type="button"
      class="btn btn-outline-secondary btn-sm"
      title="Show filtering options"
      @click="emit('open-advanced-filter')"
    >
      <i class="bi bi-funnel" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFilterStore } from "@/stores/filter";
import type { School, Topic } from "@/types/quiz";
import MTopicChooser from "@/components/molecules/MTopicChooser.vue";
import MSchoolChooser from "@/components/molecules/MSchoolChooser.vue";

const props = defineProps<{
  // Schluessel des Filters im Filter-Store: der Name eines Website-Quizzes
  // (z.B. "french") oder die _id eines Buch-Quizzes.
  quiz: string;
  // Alle Themen des Faches, aus denen der Baum gebaut wird.
  topics: Topic[];
  // Die Schulen, die in diesem Quiz schon mindestens eine Aufgabe haben.
  schools: School[];
}>();

const emit = defineEmits<{
  (e: "open-advanced-filter"): void;
}>();

const filterStore = useFilterStore();
// Derselbe Filter wie in VueQuiz: Der Schluessel entscheidet, welcher Eintrag
// im Store gemeint ist.
const filter = computed(() => filterStore.filterFor(props.quiz));

// Der Filter speichert den Schulnamen, die Auswahl arbeitet aber mit der _id.
// Die Uebersetzung passiert hier ueber die Schulliste.
const gewaehlteSchulId = computed(
  () => props.schools.find((s) => s.name === filter.value.school)?._id ?? "",
);

function schuleGewaehlt(id: string): void {
  filter.value.school = props.schools.find((s) => s._id === id)?.name ?? "";
}
</script>

<style scoped>
/* So soll die Filterzeile aussehen: alles in einer Reihe, linksbuendig, mit
   kleinem Abstand zwischen den Elementen und mittig ausgerichtet. */
.filter-component {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 3px;
  align-items: center;
}
</style>
