<template>
  <div>
    <p>{{ frageText }}</p>
    <div
      v-for="(option, idx) in optionen"
      :key="idx"
      :class="{
        correct: beantwortet && option.checked && option.correct,
        notcorrect: beantwortet && option.checked && !option.correct,
      }"
    >
      <input v-model="option.checked" :disabled="beantwortet" type="checkbox" />
      <label>{{ option.option }}</label>
    </div>
    <div class="d-flex flex-row">
      <button @click="validate">{{ t.validate }}</button>
      <button @click="showSolution">{{ t.solution }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { Exercise, Lang, Option } from "../types";

const props = defineProps<{ question: Exercise; lg?: Lang }>();
const emit = defineEmits<{ (e: "answered-event"): void }>();

const texte: Record<Lang, { validate: string; solution: string }> = {
  de: { validate: "Aufgabe überprüfen", solution: "Lösung anzeigen" },
  en: { validate: "Validate", solution: "Show solution" },
  fr: { validate: "Valider", solution: "Montre-moi la solution" },
};
const t = computed(() => texte[props.lg ?? "de"]);

const frageText = computed<string>(() => {
  if (props.lg === "en" && props.question.questionEn)
    return props.question.questionEn;
  if (props.lg === "fr" && props.question.questionFr)
    return props.question.questionFr;
  return props.question.question ?? "";
});

const optionen = computed<Option[]>(() => {
  if (props.lg === "en" && props.question.optionsEn)
    return props.question.optionsEn;
  if (props.lg === "fr" && props.question.optionsFr)
    return props.question.optionsFr;
  return props.question.options ?? [];
});

const beantwortet = computed(
  () => props.question.correctlyAnswered !== undefined,
);

function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function reset(): void {
  optionen.value.forEach((o) => {
    o.checked = false;
  });
  shuffle(optionen.value);
}

function validate(): void {
  if (beantwortet.value) return;
  let alleRichtig = true;
  optionen.value.forEach((o) => {
    if ((o.checked ?? false) !== o.correct) alleRichtig = false;
  });
  // dies wird am Frage-Objekt gesetzt, damit das Quiz den Score zählen kann.
  props.question.correctlyAnswered = alleRichtig;
  emit("answered-event");
}

function showSolution(): void {
  optionen.value.forEach((o) => {
    o.checked = o.checked;
  });
  if (!beantwortet.value) props.question.correctlyAnswered = false;
}

watch(() => props.question, reset);
onMounted(reset);
</script>

<style scoped>
.correct {
  background-color: #7bf27b;
}
.notcorrect {
  background-color: #fc5c5c;
}
</style>
