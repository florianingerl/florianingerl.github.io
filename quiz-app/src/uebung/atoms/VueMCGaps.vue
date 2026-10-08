<template>
<div>
  <p>
    {{ instruction }}
  </p>
<ol style="list-style-type: none">
<li v-for="innergaps in gaps">
<span v-for="gap in innergaps" >
  {{ gap.text }} 
  <select :disabled="validated" v-if="gap.gap!='' && Array.isArray(gap.gap)" :class="{ notcorrect: validated && gap.guess != gap.solution, correct: validated && gap.guess === gap.solution }" v-model="gap.guess">
    <option v-for="op in gap.gap">{{ op }}</option>
  </select> 
  <input v-if="!validated && gap.gap!='' && !Array.isArray(gap.gap)" :style="{ width: ( gap.gap.length + 2 ) + 'ch' }" type="text" v-model="gap.guess">
  <span v-if="validated && gap.gap!='' && !Array.isArray(gap.gap)"  :class="{ notcorrect: validated && gap.guess != gap.gap, correct: validated && gap.guess === gap.gap }">{{ gap.guess }} </span>
  <span v-if="validated && gap.gap!='' && !Array.isArray(gap.gap) && gap.gap != gap.guess" class="correct">{{ gap.gap }} </span>
  <span v-if="validated && gap.gap!='' && Array.isArray(gap.gap) && gap.guess != gap.solution" class="correct"> {{ gap.solution }} </span>
</span>
</li>
</ol>


<p v-if="lg==='fr'">
<button @click="buttonValidateClicked">Valider ma solution</button>
<button @click="showSolutionClicked">Montre-moi la solution</button>
</p>
<p v-else>
<button @click="buttonValidateClicked">Validate</button>
<button @click="showSolutionClicked">Show me the solution</button>
</p>


</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

// Eine Lücke ist entweder ein Eingabefeld (gap ist Text) oder eine Auswahl (gap ist eine Liste)
interface Luecke {
  text: string;
  gap: string | string[];
  solution: string;
  guess: string;
}

// Mit same bekommen alle Auswahllücken dieselben Optionen in derselben Reihenfolge
const props = defineProps<{ gaptext?: string | string[]; same?: boolean; lg?: string; numbering?: boolean; instruction?: string }>();

const gaps = ref<Luecke[][]>([]);
const validated = ref(false);

function shuffle(liste: string[]): string[] {
  if (props.same) return liste;
  return [...liste].sort(() => 0.5 - Math.random());
}

// Zerlegt "Text {Lösung|Falsch|Falsch} Text" in Textstücke mit ihren Lücken
function parseGapText(text: string): void {
  let data = text;
  if (!data.endsWith("}")) data += "{}";
  const zeile: Luecke[] = [];
  let i = 0;
  while (true) {
    const j = data.indexOf("{", i);
    if (j == -1) break;
    const ende = data.indexOf("}", j);
    const teile = data.substring(j + 1, ende).split("|");
    zeile.push({ text: data.substring(i, j), gap: teile.length == 1 ? teile[0] : teile, solution: "", guess: "" });
    i = ende + 1;
  }
  gaps.value.push(zeile);
}

// Baut alle Lücken neu auf, die erste Option ist immer die richtige Lösung
function bigParseGapText(): void {
  gaps.value = [];
  if (Array.isArray(props.gaptext)) props.gaptext.forEach(parseGapText);
  else if (props.gaptext) parseGapText(props.gaptext);

  const alleOptionen: string[] = [];
  if (props.same) {
    gaps.value.forEach((zeile) => zeile.forEach((gap) => {
      if (!Array.isArray(gap.gap)) return;
      gap.gap.forEach((option) => {
        if (!alleOptionen.includes(option) && option != "") alleOptionen.push(option);
      });
    }));
  }

  gaps.value.forEach((zeile) => zeile.forEach((gap) => {
    gap.solution = Array.isArray(gap.gap) ? gap.gap[0] : gap.gap;
    if (Array.isArray(gap.gap)) gap.gap = props.same ? [...alleOptionen] : shuffle(gap.gap);
  }));
}

function buttonValidateClicked(): void {
  validated.value = true;
}

function showSolutionClicked(): void {
  validated.value = true;
  gaps.value.forEach((zeile) => zeile.forEach((gap) => {
    gap.guess = Array.isArray(gap.gap) ? gap.gap[0] : gap.gap;
  }));
}

watch(() => props.gaptext, bigParseGapText, { deep: true });
onMounted(bigParseGapText);
</script>

<style scoped>
.correct {
    color: green;
    border: 1px solid green
}

.notcorrect {
    color: red;
    border: 1px solid red;
    text-decoration: line-through;
}
</style>
