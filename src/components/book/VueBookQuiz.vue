<!-- Zeigt die Aufgaben eines Quiz an, das zwischen zwei Absaetzen eines Buchs
     eingefuegt wurde. -->
<template>
  <div class="book-quiz card my-2">
    <div class="card-body">
      <h6 class="card-subtitle mb-3 text-muted">
        {{ quiz?.title ?? "Quiz" }}
      </h6>

      <p v-if="laden" class="text-muted mb-0">Loading exercises ...</p>
      <p v-else-if="exercises.length === 0" class="text-muted mb-0">
        This quiz has no exercises yet.
      </p>

      <ol v-else class="mb-0">
        <li v-for="aufgabe in exercises" :key="aufgabe._id" class="mb-3">
          <div v-if="aufgabe.instruction" class="small text-muted">
            {{ aufgabe.instruction }}
          </div>
          <div class="mb-1">{{ aufgabe.question }}</div>
          <div
            v-for="(option, index) in aufgabe.options ?? []"
            :key="index"
            class="form-check"
          >
            <input
              :id="`${aufgabe._id}-${index}`"
              class="form-check-input"
              type="radio"
              :name="aufgabe._id"
              @change="auswaehlen(aufgabe, index)"
            />
            <label
              class="form-check-label"
              :class="ergebnis(aufgabe, index)"
              :for="`${aufgabe._id}-${index}`"
            >
              {{ option }}
            </label>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useBookStore } from "@/stores/books";
import type { BookExercise } from "@/types/book";

const props = defineProps<{ quizId: string; subject: string }>();

const store = useBookStore();
const gewaehlt = ref<Record<string, number>>({});
const laden = ref(true);

const quiz = computed(() => store.quizzes[props.quizId]);
const exercises = computed<BookExercise[]>(
  () => store.exercises[props.quizId] ?? [],
);

function auswaehlen(aufgabe: BookExercise, index: number): void {
  if (aufgabe._id) gewaehlt.value[aufgabe._id] = index;
}

function ergebnis(aufgabe: BookExercise, index: number): string {
  if (!aufgabe._id || gewaehlt.value[aufgabe._id] === undefined) return "";
  if (aufgabe.correct === undefined) return "";
  if (index === aufgabe.correct) return "text-success fw-semibold";
  if (gewaehlt.value[aufgabe._id] === index) return "text-danger";
  return "";
}

onMounted(async () => {
  try {
    await Promise.all([
      store.loadQuiz(props.quizId),
      store.loadExercises(props.quizId),
    ]);
  } finally {
    laden.value = false;
  }
});
</script>
