<template>

<div v-for="(sentence,index) in sentences2">
<p>{{index+1}}.{{ sentence.wrongOrder }}</p>
<p><input :disabled="validated" style="display:block;width:100%" v-model="sentence.guess" type="text" :class="{ correct: validated && sentence.guess == sentence.solution, notcorrect: validated && sentence.guess != sentence.solution }"/></p>
</div>

<p v-if="lg==='fr'">
<button @click="validateSolutionClicked">Valider</button>
<button @click="showSolutionClicked">Montre-moi la solution!</button>
</p>
<p v-else>
<button @click="validateSolutionClicked">Validate my answer</button>
<button @click="showSolutionClicked">Show solution</button>
</p>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Ein Satz, dessen Wörter durcheinander gewürfelt gezeigt werden
interface Satz {
  wrongOrder: string;
  solution: string;
  guess: string;
}

const props = defineProps<{ sentences: string[]; lg?: string }>();

const validated = ref(false);
const sentences2 = ref<Satz[]>([]);

function shuffle(liste: string[]): void {
  let rest = liste.length;
  while (rest != 0) {
    const zufall = Math.floor(Math.random() * rest);
    rest--;
    [liste[rest], liste[zufall]] = [liste[zufall], liste[rest]];
  }
}

// Würfelt die Wörter und trennt sie mit Schrägstrichen
function shuffleWords(text: string): string {
  const woerter = text.split(/\s+/);
  shuffle(woerter);
  return woerter.join(" / ");
}

function validateSolutionClicked(): void {
  validated.value = true;
}

function showSolutionClicked(): void {
  validated.value = true;
  sentences2.value.forEach((sentence) => { sentence.guess = sentence.solution; });
}

onMounted(() => {
  sentences2.value = props.sentences.map((satz) => ({ wrongOrder: shuffleWords(satz), solution: satz, guess: "" }));
});
</script>

<style scoped>
.correct {
    color: green;
    border-color: green;
}

.notcorrect {
    color: red;
    border-color: red;
}
</style>
