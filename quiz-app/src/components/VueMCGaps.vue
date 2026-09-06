<template>
  <div>
    <p>{{ instruction }}</p>
    <ol style="list-style-type: none">
      <li v-for="(innergaps, li) in gaps" :key="li">
        <span v-for="(gap, gi) in innergaps" :key="gi">
          {{ gap.text }}
          <select
            v-if="istAuswahl(gap)"
            v-model="gap.guess"
            :disabled="validated"
            :class="{
              notcorrect: validated && gap.guess !== gap.solution,
              correct: validated && gap.guess === gap.solution,
            }"
          >
            <option v-for="op in optionen(gap)" :key="op">{{ op }}</option>
          </select>
          <input
            v-if="!validated && istLuecke(gap)"
            v-model="gap.guess"
            type="text"
            :style="{ width: breite(gap) }"
          />
          <span
            v-if="validated && istLuecke(gap)"
            :class="{
              notcorrect: gap.guess !== gap.gap,
              correct: gap.guess === gap.gap,
            }"
          >
            {{ gap.guess }}</span
          >
          <span
            v-if="validated && istLuecke(gap) && gap.gap !== gap.guess"
            class="correct"
            >{{ gap.gap }}</span
          >
          <span
            v-if="validated && istAuswahl(gap) && gap.guess !== gap.solution"
            class="correct"
            >{{ gap.solution }}</span
          >
        </span>
      </li>
    </ol>

    <p v-if="lg === 'fr'">
      <button @click="validated = true">Valider ma solution</button>
      <button @click="showSolution">Montre-moi la solution</button>
    </p>
    <p v-else>
      <button @click="validated = true">Validate</button>
      <button @click="showSolution">Show me the solution</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Lang } from "../types";

interface Gap {
  text: string;
  // string = Freitext-Lücke, string[] = Auswahl-Lücke
  gap: string | string[];
  guess: string;
  solution?: string;
}

const props = defineProps<{
  gaptext?: string | string[];
  same?: boolean;
  lg: Lang;
  instruction?: string;
}>();

const gaps = ref<Gap[][]>([]);
const validated = ref(false);

const istAuswahl = (g: Gap): boolean =>
  Array.isArray(g.gap) && g.gap.length > 0;
const istLuecke = (g: Gap): boolean =>
  typeof g.gap === "string" && g.gap !== "";
const optionen = (g: Gap): string[] => (Array.isArray(g.gap) ? g.gap : []);
const breite = (g: Gap): string =>
  typeof g.gap === "string" ? `${g.gap.length + 2}ch` : "auto";

// "La femme {qui|que} tient ..." => Text / Lücken-Paare
function pareseGapText(data: string): void {
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
  gaps.value.push(result);
}

function shuffle(arr: string[]): string[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

function bigParseGapText(): void {
  gaps.value = [];
  validated.value = false;
  const gt = props.gaptext;
  if (Array.isArray(gt)) gt.forEach(pareseGapText);
  else if (gt) pareseGapText(gt);

  // same = true => alle Auswahl-Lücken bekommen dieselbe Gesamtliste (für Geschichten)
  const alloptions: string[] = [];
  if (props.same) {
    gaps.value.forEach((inner) =>
      inner.forEach((g) => {
        if (Array.isArray(g.gap))
          g.gap.forEach((o) => {
            if (o !== "" && !alloptions.includes(o)) alloptions.push(o);
          });
      }),
    );
  }

  gaps.value.forEach((inner) =>
    inner.forEach((g) => {
      // die erste Option ist immer die richtige... daher merken, bevor es gemischt wird.
      g.solution = Array.isArray(g.gap) ? g.gap[0] : g.gap;
      if (Array.isArray(g.gap))
        g.gap = props.same ? [...alloptions] : shuffle(g.gap);
    }),
  );
}

function showSolution(): void {
  validated.value = true;
  gaps.value.forEach((inner) =>
    inner.forEach((g) => {
      g.guess = g.solution ?? "";
    }),
  );
}

watch(() => props.gaptext, bigParseGapText, { deep: true });
onMounted(bigParseGapText);
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
