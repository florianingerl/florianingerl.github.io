<template>
<div v-if="exercise != undefined" class="container">
<h2>Exercise</h2>
    <p>
        {{ exercise.instruction }}
    </p>
    <p>Find:</p>
    <input type="text" name="regex" id="regex" v-model="find"/> 
    <br>
    <button @click="findAll">Find all</button>
    <p>Replace by:</p>
    <input type="text" name="replace" id="replace" v-model="replaceby"/>
    <br>
    <button @click="replaceAll">Replace all</button>
    <span class="correct" v-if="score==1">
      You have solved this exercise correctly!
    </span>
    <div v-if="score==-1">
      <span class="incorrect" >
        You haven't replaced correctly! Click reset to try again!
      </span>
      <button @click="reset">Reset</button>
    </div>
    <br>
    <div class="editor">
    <span v-for="match in matches">
        <span v-for="(pre, i) in match.preSplit">
          {{pre}} <br v-if="i+1!= match.preSplit.length" />
        </span>
        <span v-for="(m, i) in match.matchSplit" class="bg-[orange] text-black"> 
        {{ m }} <br v-if="i+1!=match.matchSplit.length" />
        </span>
    </span>
    </div>
   </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { RegexAufgabe } from "../typen";

// Ein Fund im Text: der Text davor und der Treffer selbst, jeweils zeilenweise
interface Treffer {
  preSplit: string[];
  matchSplit: string[];
}

const props = defineProps<{ exercise: RegexAufgabe }>();

const find = ref("");
const replaceby = ref("");
const editor = ref(props.exercise.editor);
const score = ref(0);
const matches = ref<Treffer[]>([]);

// Markiert alle Treffer des Suchmusters im Ausgangstext
function findAll(): void {
  const muster = new RegExp(find.value, "g");
  const text = props.exercise.editor;
  const neu: Treffer[] = [];
  let i = 0;
  let ergebnis: RegExpExecArray | null;
  while ((ergebnis = muster.exec(text)) != null) {
    neu.push({ preSplit: text.substring(i, ergebnis.index).split("\n"), matchSplit: ergebnis[0].split("\n") });
    i = muster.lastIndex;
    // Ein leerer Treffer würde sonst endlos an derselben Stelle gefunden
    if (ergebnis[0] === "") muster.lastIndex++;
  }
  neu.push({ preSplit: text.substring(i).split("\n"), matchSplit: [] });
  matches.value = neu;
}

// Ersetzt im Ausgangstext und vergleicht mit der Musterlösung
function replaceAll(): void {
  const text = props.exercise.editor;
  editor.value = text.replace(new RegExp(find.value, "g"), replaceby.value);
  matches.value = [{ preSplit: editor.value.split("\n"), matchSplit: [] }];
  const richtig = text.replace(new RegExp(props.exercise.find, "g"), props.exercise.replaceby);
  score.value = editor.value == richtig ? 1 : -1;
}

function reset(): void {
  editor.value = props.exercise.editor;
  matches.value = [{ preSplit: editor.value.split("\n"), matchSplit: [] }];
  score.value = 0;
}

onMounted(reset);
</script>

<style scoped>
.container {
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid green;
}

input {
  width: 75%;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.editor {
  border: 2px solid black;
  background-color: beige;
  color: black;
  height: 400px;
}
</style>
