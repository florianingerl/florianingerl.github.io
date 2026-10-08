<template>

<div v-for="(sentence,index) in sentences2">
<p>{{index+1}}.{{sentence.task}}</p>
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
import type { Satzaufgabe } from "../typen";

// Der Schüler schreibt zu jeder Aufgabe einen ganzen Satz
const props = defineProps<{ sentences: Satzaufgabe[]; lg?: string }>();

const validated = ref(false);
const sentences2 = ref<Satzaufgabe[]>([]);

function validateSolutionClicked(): void {
  validated.value = true;
}

function showSolutionClicked(): void {
  validated.value = true;
  sentences2.value.forEach((sentence) => { sentence.guess = sentence.solution; });
}

onMounted(() => {
  sentences2.value = props.sentences;
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
