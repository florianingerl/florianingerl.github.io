<template>
<div>
<ol>
<li v-for="innergaps in gaps">
<span v-for="gap in innergaps" >
  {{ gap.text }} 
  <input :disabled="validated" v-if="gap.gap!=''" :style="{ width: ( gap.gap.length + 2 ) + 'ch' }" :class="{ notcorrect: validated && gap.guess != gap.gap, correct: validated && gap.guess === gap.gap }" type="text" v-model="gap.guess"> 
</span>
</li>
</ol>

<p v-if="lg==='fr'">
<button class="btn btn-primary mr-[10px]" @click="buttonValidateClicked">Valider ma solution</button>
<button class="btn btn-primary " @click="showSolutionClicked">Montre-moi la solution</button>
</p>
<p v-else>
<button class="btn btn-primary mr-[10px]" @click="buttonValidateClicked">Validate</button>
<button class="btn btn-primary" @click="showSolutionClicked">Show me the solution</button>
</p>


</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Ein Textstück und die Lücke dahinter, die der Schüler ausfüllen soll
interface Luecke {
  text: string;
  gap: string;
  guess: string;
}

// Der Lückentext kommt entweder direkt als Text oder aus einer JSON-Datei
const props = defineProps<{ gapfile?: string; gaptext?: string | string[]; lg?: string }>();

const gaps = ref<Luecke[][]>([]);
const validated = ref(false);

// Zerlegt "Text {Lösung} Text" in Textstücke mit ihren Lücken
function parseGapText(text: string): void {
  let data = text;
  if (!data.endsWith("}")) data += "{}";
  const zeile: Luecke[] = [];
  let i = 0;
  while (true) {
    const j = data.indexOf("{", i);
    if (j == -1) break;
    const ende = data.indexOf("}", j);
    zeile.push({ text: data.substring(i, j), gap: data.substring(j + 1, ende), guess: "" });
    i = ende + 1;
  }
  gaps.value.push(zeile);
}

function parseGapTexts(texte: string[]): void {
  texte.forEach(parseGapText);
}

function buttonValidateClicked(): void {
  validated.value = true;
}

function showSolutionClicked(): void {
  validated.value = true;
  gaps.value.forEach((zeile) => zeile.forEach((gap) => { gap.guess = gap.gap; }));
}

onMounted(async () => {
  if (props.gapfile) {
    const antwort = await fetch(props.gapfile);
    parseGapTexts(await antwort.json());
  } else if (Array.isArray(props.gaptext)) {
    parseGapTexts(props.gaptext);
  } else if (props.gaptext) {
    parseGapText(props.gaptext);
  }
});
</script>

<style scoped>
.correct {
    color: green;
    border: 1px solid green
}

.notcorrect {
    color: red;
    border: 1px solid red
}
</style>
