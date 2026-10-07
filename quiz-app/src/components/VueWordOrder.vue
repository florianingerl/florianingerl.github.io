<template>
  <div>
    <p>{{ exercise.instruction }}</p>

    <!-- Die Woerter des Satzes, gemischt und durch Schraegstriche getrennt. -->
    <p>{{ woerter.join(" / ") }}</p>

    <input
      type="text"
      :value="exercise.wordorder?.guess ?? ''"
      :disabled="beantwortet"
      @input="beiEingabe"
    />

    <p>
      <button @click="retry">{{ texte[lg].retry }}</button>
      <button @click="validate">{{ texte[lg].validate }}</button>
      <button @click="showSolution">{{ texte[lg].solution }}</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { Exercise, Lang } from "../types";

const props = defineProps<{
  exercise: Exercise;
  lg: Lang;
}>();

const emit = defineEmits<{ (e: "answered-event"): void }>();

const texte: Record<
  Lang,
  { retry: string; validate: string; solution: string }
> = {
  en: {
    retry: "Retry",
    validate: "Validate",
    solution: "Show me the solution",
  },
  de: {
    retry: "Nochmal versuchen",
    validate: "Prüfen",
    solution: "Zeig mir die Lösung",
  },
  fr: {
    retry: "Essayer encore une fois",
    validate: "Valider ma solution",
    solution: "Montre-moi la solution",
  },
};

// Die gemischten Woerter des Satzes.
const woerter = computed<string[]>(
  () => props.exercise.wordorder?.shuffledSentence ?? [],
);

const beantwortet = computed<boolean>(
  () => props.exercise.correctlyAnswered !== undefined,
);

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
  props.exercise.correctlyAnswered = undefined;
  if (props.exercise.wordorder) props.exercise.wordorder.guess = undefined;
  emit("answered-event");
}

function showSolution(): void {
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
