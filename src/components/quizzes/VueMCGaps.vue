<template>
  <div>
    <p v-html="renderRichText(exercise.questionOrInstruction ?? '')"></p>
    <ol style="list-style-type: none">
      <li>
        <span v-for="(gap, gi) in exercise.gaps ?? []" :key="gi">
          {{ gap.text }}
          <select
            v-if="istAuswahl(gap)"
            @change="onInputChanged"
            v-model="gap.guess"
            :disabled="validated"
            :class="{
              notcorrect: validated && !istRichtig(gap),
              correct: validated && istRichtig(gap),
            }"
          >
            <option v-for="op in optionen(gap)" :key="op">{{ op }}</option>
          </select>
          <input
            v-if="!validated && istLuecke(gap)"
            @input="onGapInput(gap, $event)"
            type="text"
            :style="{ width: breite(gap) }"
          />
          <span
            v-if="validated && istLuecke(gap)"
            :class="{
              notcorrect: !istRichtig(gap),
              correct: istRichtig(gap),
            }"
          >
            {{ gap.guess }}</span
          >
          <span
            v-if="validated && istLuecke(gap) && !istRichtig(gap)"
            class="correct"
            >{{ gap.solution }}</span
          >
          <span
            v-if="validated && istAuswahl(gap) && !istRichtig(gap)"
            class="correct"
            >{{ gap.solution }}</span
          >
        </span>
      </li>
    </ol>

    <MExerciseFeedback
      :lg="lg"
      @validate="validate"
      @showSolution="showSolution"
      @retry="retry"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Exercise, Gap, Lang } from "@/types/quiz";
import { renderRichText } from "@/utils/richText";
import MExerciseFeedback from "../molecules/MExerciseFeedback.vue";

const props = defineProps<{
  exercise: Exercise
  same?: boolean
  lg: Lang
}>();

const emit = defineEmits<{ (e: "answered-event"): void }>();


const validated = ref(false);

const istAuswahl = (g: Gap): boolean =>
  Array.isArray(g.gap) && g.gap.length > 0;
const istLuecke = (g: Gap): boolean =>
  typeof g.gap === "string" && g.gap !== "";
const optionen = (g: Gap): string[] => (Array.isArray(g.gap) ? g.gap : []);
const breite = (g: Gap): string =>
  typeof g.gap === "string" ? `${g.gap.length + 2}ch` : "auto";

// Eine Lücke kann mehrere richtige Antworten haben. Sie stehen in der Lösung
// durch ein Paragraphenzeichen getrennt, z.B. "that§which". Eine leere Lösung
// bedeutet, dass es nichts auszufüllen gibt.
const istRichtig = (g: Gap): boolean =>
  !g.solution || g.solution.split("§").includes(g.guess);

function isEverythingCorrect(): boolean {
  let b: boolean = true;
  (props.exercise.gaps ?? []).forEach((gap: Gap) => {
    if (!istRichtig(gap)) {
      b = false;
    }
  });
  return b;
}

function onGapInput(gap: Gap, event: Event): void {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  gap.guess = input.value;
  onInputChanged();
}

function onInputChanged() {
  console.log("The function onInputChanged was called!");

  if(isEverythingCorrect() ){
     validated.value = true;
     props.exercise.correctlyAnswered = true;
     emit("answered-event");
  }
}  

// "La femme {qui|que} tient ..." => Text / Lücken-Paare
function parseGapText(data: string): void {
  validated.value = props.exercise.correctlyAnswered !== undefined;

  // Das gapText ist schon geparst (die Lücken stehen dann in props.exercise.gaps),
  // also die Eingaben des Nutzers unangetastet lassen.
  if (props.exercise.gaps) {
    return;
  }

  if (!data.endsWith("}")) data += "{}";
  const result: Gap[] = [];
  let i = 0;
  for (;;) {
    const j = data.indexOf("{", i);
    if (j === -1) break;
    const text = data.substring(i, j);
    i = data.indexOf("}", j);
    const parts = data.substring(j + 1, i).split("|");
    result.push({
      text,
      gap: parts.length === 1 ? parts[0] : parts,
      guess: "",
    });
    i++;
  }
  props.exercise.gaps = result;

  //TODO: Same = bool could be added to Exercise in the database. And a checkbox for it could be added in VueNewExercise
  // same = true => alle Auswahl-Lücken bekommen dieselbe Gesamtliste (für Geschichten)
  const alloptions: string[] = [];
  if (props.same) {
    props.exercise.gaps.forEach((g) => {
      if (Array.isArray(g.gap))
        g.gap.forEach((o) => {
          if (o !== "" && !alloptions.includes(o)) alloptions.push(o);
        });
    });
  }

  props.exercise.gaps.forEach((g) => {
    // die erste Option ist immer die richtige... daher merken, bevor es gemischt wird.
    g.solution = Array.isArray(g.gap) ? g.gap[0] : g.gap;
    if (Array.isArray(g.gap))
      g.gap = props.same ? [...alloptions] : shuffle(g.gap);
  });
}

function shuffle(arr: string[]): string[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

function validate(): void {
  validated.value = true;
  props.exercise.correctlyAnswered = isEverythingCorrect();
  emit("answered-event");
}

function retry(): void {
  validated.value = false;
  props.exercise.gaps?.forEach((g) => {
    g.guess = "";
  });
  delete props.exercise.correctlyAnswered;
  emit("answered-event");
}

function showSolution(): void {
  validated.value = true;
  props.exercise.gaps?.forEach((g) => {
    // Bei mehreren richtigen Antworten (getrennt durch §) die erste einsetzen.
    g.guess = (g.solution ?? "").split("§")[0];
  });
}

watch(
  () => props.exercise.gapText,
  (gt) => {
    if (gt) parseGapText(gt);
  },
  { deep: true },
);
onMounted(() => parseGapText(props.exercise.gapText ?? ""));
</script>

<style scoped>
.correct {
  color: green;
  border: 1px solid green;
}
.notcorrect {
  color: red;
  border: 1px solid red;
  text-decoration: line-through;
}
</style>
