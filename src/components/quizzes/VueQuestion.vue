<template>
  <div>
    <p v-html="renderRichText(frageText)"></p>
    <div
      v-for="(option, idx) in optionen"
      :key="idx"
      :class="{
        correct: beantwortet && option.checked && option.correct,
        notcorrect: beantwortet && option.checked && !option.correct,
      }"
    >
      <input v-model="option.checked" :disabled="beantwortet" type="checkbox" @change="optionChanged" />
      <label v-html="renderRichText(option.option)"></label>
    </div>
    <MExerciseFeedback
      :lg="lg ?? 'de'"
      @validate="validate"
      @showSolution="showSolution"
      @retry="reset"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { Exercise, Lang, Option } from "@/types/quiz";
import { renderRichText } from "@/utils/richText";
import MExerciseFeedback from "../molecules/MExerciseFeedback.vue";

const props = defineProps<{ question: Exercise; lg?: Lang }>();
const emit = defineEmits<{ (e: "answered-event"): void }>();

const frageText = computed<string>(() => {
  if (props.lg === "en" && props.question.questionEn)
    return props.question.questionEn;
  if (props.lg === "fr" && props.question.questionFr)
    return props.question.questionFr;
  return props.question.questionOrInstruction ?? "";
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

// Im Quiz ist genau eine Option richtig. Aeltere Aufgaben in der Datenbank
// haben aber teils mehrere als richtig markierte Optionen; dann bleibt eine
// richtig angekreuzte Antwort ohne Rueckmeldung. Deshalb bleibt nur die erste
// als richtig markierte Option richtig (sonst die erste Option).
function normalizeCorrect(): void {
  const listen = [
    props.question.options,
    props.question.optionsEn,
    props.question.optionsFr,
  ];
  for (const liste of listen) {
    if (!liste || liste.length === 0) continue;
    let ersteRichtige = liste.findIndex((o) => o.correct === true);
    if (ersteRichtige === -1) ersteRichtige = 0;
    liste.forEach((o, i) => {
      o.correct = i === ersteRichtige;
    });
  }
}

function reset(): void {
  normalizeCorrect();
  delete props.question.correctlyAnswered;
  optionen.value.forEach((o) => {
    o.checked = false;
  });
  shuffle(optionen.value);
}

function isSomethingWronglyChecked(): boolean {
  let b : boolean = false;
  optionen.value.forEach((o) => {
    console.log(o);
    if (o.checked && !o.correct) b = true; return;
  });
  return b;
}

function isEverythingCorrect():boolean {
  let b : boolean = true;
  optionen.value.forEach((o) => {
    console.log(o);
    if ( (o.checked ?? false) != o.correct) b = false; return;
  });
  return b;
}


function optionChanged():void {
  console.log("OptionChanged is executed");
  if(isSomethingWronglyChecked())
  {
    console.log("isSomethingWronglyChecked is executed!");
    
    props.question.correctlyAnswered = false;
    console.log("Beantwortet = " + beantwortet.value );
    emit("answered-event");
    return;
  }

  if(isEverythingCorrect() ){
    props.question.correctlyAnswered = true;
    console.log("Beantwortet = " + beantwortet.value );
    emit("answered-event");
    return;

  }
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
