<template>
  <div>
    <p>{{ exercise.instruction }}</p>

    <!-- Die Woerter des Satzes, gemischt und durch Schraegstriche getrennt. -->
    <p>{{ woerter.join(" / ") }}</p>

    <input
      type="text"
      :value="exercise.wordorder?.guess ?? ''"
      :disabled="beantwortet"
      :style="inputStyle"
      @input="beiEingabe"
    />

    <ExerciseFeedback
      :lg="lg"
      @validate="validate"
      @showSolution="showSolution"
      @retry="retry"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch , ref} from "vue";
import type { Exercise, Lang } from "@/types/quiz";
import ExerciseFeedback from "./ExerciseFeedback.vue";

const props = defineProps<{
  exercise: Exercise;
  lg: Lang;
}>();

const emit = defineEmits<{ (e: "answered-event"): void }>();

// Die gemischten Woerter des Satzes.
const woerter = computed<string[]>(
  () => props.exercise.wordorder?.shuffledSentence ?? [],
);

const showSolutionWasClicked = ref<boolean>(false);

const beantwortet = computed<boolean>(
  () => props.exercise.correctlyAnswered !== undefined,
);

const inputStyle = computed(() => ({
  color: (props.exercise.correctlyAnswered === undefined || showSolutionWasClicked.value ) ? 'black' : ( props.exercise.correctlyAnswered ? 'green' : 'red')
}))

function mischen(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Ignoriert ueberfluessige Leerraum-Zeichen beim Vergleich.
function norm(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function istRichtig(): boolean {
  const w = props.exercise.wordorder;
  if (!w) return false;
  const loesung = norm(w.sentence);
  return loesung !== "" && norm(w.guess ?? "") === loesung;
}

// Der Satz wird nur einmal pro Aufgabe in Woerter zerlegt und gemischt.
function init(): void {
  const w = props.exercise.wordorder;
  if (!w) return;
  if (!w.shuffledSentence || w.shuffledSentence.length === 0)
    w.shuffledSentence = mischen(w.sentence.trim().split(/\s+/));
}

function beiEingabe(event: Event): void {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  const w = props.exercise.wordorder;
  if (!w) return;
  w.guess = input.value;

  // Ist der richtige Satz getippt, wird automatisch als richtig geprueft.
  if (istRichtig() && props.exercise.correctlyAnswered !== true) {
    props.exercise.correctlyAnswered = true;
    emit("answered-event");
  }
}

function validate(): void {
  props.exercise.correctlyAnswered = istRichtig();
  emit("answered-event");
}

function retry(): void {
  showSolutionWasClicked.value = false;
  props.exercise.correctlyAnswered = undefined;
  if (props.exercise.wordorder) props.exercise.wordorder.guess = undefined;
  emit("answered-event");
}

function showSolution(): void {
  showSolutionWasClicked.value = true;
  const w = props.exercise.wordorder;
  if (!w) return;
  w.guess = w.sentence;
  if (props.exercise.correctlyAnswered === undefined)
    props.exercise.correctlyAnswered = false;
  emit("answered-event");
}

watch(() => props.exercise, init);
onMounted(init);
</script>
