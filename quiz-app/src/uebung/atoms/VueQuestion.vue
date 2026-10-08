<template>

<div>
<p v-if="lg==='de' || lg === 'en' && question2.questionEn == undefined || lg === 'fr' && question2.questionFr == undefined">
{{ question2.question }}
</p>
<p v-else-if="lg==='en'">
{{ question2.questionEn }}
</p>
<p v-else-if="lg==='fr'">
{{ question2.questionFr }}
</p>
<div v-for="option in getOptionsForLg()" :key="option.option" :class="{correct : question2.correctlyAnswered != undefined && option.checked && option.correct, notcorrect : question2.correctlyAnswered != undefined && option.checked && !option.correct}">
<input :disabled="question2.correctlyAnswered != undefined"  type="checkbox" v-model="option.checked" @change="onOptionChanged"/>
<label>{{option.option}}</label>
</div>


<div v-if="lg==='en'" class="d-flex flex-row">
<button @click="validate">Validate</button>
<button @click="showSolution">Show solution</button>
<button @click="retryClicked">Retry</button>
<button v-if="hasNextButton">Next exercise</button>
</div>

<div v-else-if="lg==='fr'" class="d-flex flex-row">
<button @click="validate">Valider</button>
<button @click="showSolution">Montre-moi la solution</button>
<button @click="retryClicked">Essayez encore une fois</button>
<button v-if="hasNextButton">Prochain exercice</button>
</div>

<div v-else class="d-flex flex-row">
<button @click="validate">Aufgabe überprüfen</button>
<button @click="showSolution">Lösung anzeigen</button>
<button @click="retryClicked">Nochmal versuchen</button>
<button v-if="hasNextButton">Nächste Aufgabe</button>
</div>

</div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Antwort, Frage } from "../typen";

const props = defineProps<{ question: Frage; hasNextButton?: boolean; lg?: string }>();
const emit = defineEmits<{ "answered-event": [] }>();

// Die Frage wird direkt bearbeitet, damit das Ergebnis beim Weiterblättern erhalten bleibt
const question2 = ref<Frage>({ options: [] });

// Die Antworten in der Sprache der Seite, sonst die Standardantworten
function getOptionsForLg(): Antwort[] {
  const frage = question2.value;
  if (props.lg == undefined || props.lg === "de" || (props.lg === "en" && frage.optionsEn == undefined) || (props.lg === "fr" && frage.optionsFr == undefined)) {
    return frage.options;
  }
  if (props.lg === "en") return frage.optionsEn ?? [];
  if (props.lg === "fr") return frage.optionsFr ?? [];
  return [];
}

function shuffle(liste: Antwort[]): void {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liste[i], liste[j]] = [liste[j], liste[i]];
  }
}

function updateQuestion(): void {
  question2.value = props.question;
  delete question2.value.correctlyAnswered;
  question2.value.options.forEach((option) => { option.checked = false; });
  shuffle(question2.value.options);
}

// Richtig ist die Frage, wenn genau die richtigen Antworten angehakt sind
function preValidate(): boolean {
  let richtig = true;
  getOptionsForLg().forEach((option) => {
    if (option.checked == undefined) option.checked = false;
    if (option.checked != option.correct) richtig = false;
  });
  return richtig;
}

// Sobald genau die richtigen Antworten angehakt sind, gilt die Frage als gelöst
function onOptionChanged(): void {
  if (preValidate()) {
    question2.value.correctlyAnswered = true;
    emit("answered-event");
  }
}

function validate(): void {
  if (question2.value.correctlyAnswered != undefined) return;
  question2.value.correctlyAnswered = preValidate();
  emit("answered-event");
}

function showSolution(): void {
  getOptionsForLg().forEach((option) => { option.checked = option.correct; });
  if (question2.value.correctlyAnswered == undefined) question2.value.correctlyAnswered = false;
}

function retryClicked(): void {
  delete question2.value.correctlyAnswered;
  getOptionsForLg().forEach((option) => { delete option.checked; });
  emit("answered-event");
}

watch(() => props.question, () => {
  delete question2.value.correctlyAnswered;
  updateQuestion();
});
onMounted(updateQuestion);
</script>

<style scoped>
.correct {
  background-color: #7bf27b
}

.notcorrect {
  background-color: #fc5c5c
}
</style>
