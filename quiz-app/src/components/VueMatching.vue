<template>
  <div>
    <p>{{ exercise.instruction }}</p>

    <div class="matching" ref="wurzel">
      <svg class="pfeile" :width="groesse.b" :height="groesse.h">
        <defs>
          <marker
            v-for="f in pfeilFarben"
            :key="f"
            :id="'pfeil-' + f"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" :fill="f" />
          </marker>
        </defs>
        <line
          v-for="(p, i) in pfeile"
          :key="i"
          :x1="p.x1"
          :y1="p.y1"
          :x2="p.x2"
          :y2="p.y2"
          :stroke="p.farbe"
          stroke-width="2"
          :marker-end="'url(#pfeil-' + p.farbe + ')'"
        />
      </svg>

      <div class="spalte">
        <div
          v-for="(t, i) in links"
          :key="'l' + i"
          :ref="(el) => setzeBox('l', t, el)"
          class="kasten"
          :style="kastenStil('l', t)"
          @click="klick('l', t)"
        >
          {{ t }}
        </div>
      </div>

      <div class="spalte">
        <div
          v-for="(t, i) in rechts"
          :key="'r' + i"
          :ref="(el) => setzeBox('r', t, el)"
          class="kasten"
          :style="kastenStil('r', t)"
          @click="klick('r', t)"
        >
          {{ t }}
        </div>
      </div>
    </div>

    <p>
      <button @click="reset">{{ texte[lg].reset }}</button>
      <button @click="validate">{{ texte[lg].validate }}</button>
      <button @click="showSolution">{{ texte[lg].solution }}</button>
      <button @click="retry">{{ texte[lg].retry }}</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { Exercise, Lang, TwoPartSentences } from "../types";

const props = defineProps<{
  exercise: Exercise;
  lg: Lang;
}>();

const emit = defineEmits<{ (e: "answered-event"): void }>();

// Reihenfolge der Paarfamilben: das erste Paar wird rot, das zweite gruen usw.
const FARBEN = ["red", "green", "blue", "orange", "yellow"];
const pfeilFarben = ["green", "red", "black"];

const texte: Record<
  Lang,
  { reset: string; validate: string; solution: string; retry: string }
> = {
  en: {
    reset: "Reset",
    validate: "Validate",
    solution: "Show me the solution",
    retry: "Retry",
  },
  de: {
    reset: "Zurücksetzen",
    validate: "Prüfen",
    solution: "Zeig mir die Lösung",
    retry: "Nochmal versuchen",
  },
  fr: {
    reset: "Réinitialiser",
    validate: "Valider ma solution",
    solution: "Montre-moi la solution",
    retry: "Essayer encore une fois",
  },
};

// Beide Seiten werden vor der Anzeige gemischt.
const links = ref<string[]>([]);
const rechts = ref<string[]>([]);

// Das angeklickte Teil, das noch keinem Paar gehoert (rote Farbe, gestrichelt).
const auswahl = ref<{ seite: "l" | "r"; text: string } | null>(null);

// Ob schon geprueft oder die Loesung angezeigt wurde. Dann werden die Pfeile gezeichnet.
const geprueft = ref(false);
const pfeilModus = ref<"validate" | "solution" | null>(null);

const wurzel = ref<HTMLElement | null>(null);
const boxen = ref<Record<string, HTMLElement>>({});
const groesse = ref({ b: 0, h: 0 });
const pfeile = ref<
  { x1: number; y1: number; x2: number; y2: number; farbe: string }[]
>([]);

const beantwortet = (): boolean => props.exercise.correctlyAnswered !== undefined;

const geschaetzte = (): TwoPartSentences[] =>
  props.exercise.guessedSentences ?? [];

const saetze = (): TwoPartSentences[] => props.exercise.sentences ?? [];

function mischen(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setzeBox(seite: "l" | "r", text: string, el: unknown): void {
  const element = el as HTMLElement | null;
  const schluessel = seite + ":" + text;
  if (element) boxen.value[schluessel] = element;
  else delete boxen.value[schluessel];
}

// Index des Paars, zu dem das Teil gehoert, sonst -1.
function paarIndex(seite: "l" | "r", text: string): number {
  return geschaetzte().findIndex((p) =>
    seite === "l" ? p.part1 === text : p.part2 === text,
  );
}

function kastenStil(seite: "l" | "r", text: string): Record<string, string> {
  const i = paarIndex(seite, text);
  if (i >= 0) return { backgroundColor: FARBEN[i % FARBEN.length] };
  if (auswahl.value?.seite === seite && auswahl.value.text === text)
    return { backgroundColor: "red", borderStyle: "dashed" };
  return { backgroundColor: "white" };
}

function istVollstaendig(): boolean {
  return saetze().length > 0 && geschaetzte().length === saetze().length;
}

function klick(seite: "l" | "r", text: string): void {
  if (beantwortet()) return;

  // Ein bereits verknuepftes Teil wird beim Klick geloest.
  const i = paarIndex(seite, text);
  if (i >= 0) {
    geschaetzte().splice(i, 1);
    naechsteBild();
    return;
  }

  // Noch nichts angeklickt: Teil auswaehlen.
  if (!auswahl.value) {
    auswahl.value = { seite, text };
    return;
  }

  // Wieder derselbe Klick: abwaehlen und entfernen.
  if (auswahl.value.seite === seite) {
    auswahl.value =
      auswahl.value.text === text ? null : { seite, text };
    return;
  }

  // Klick auf der anderen Seite: die beiden Teile verknuepfen.
  const paar: TwoPartSentences =
    auswahl.value.seite === "l"
      ? { part1: auswahl.value.text, part2: text }
      : { part1: text, part2: auswahl.value.text };
  geschaetzte().push(paar);
  auswahl.value = null;

  // Sind alle Teile verknuepft, wird automatisch geprueft.
  if (istVollstaendig()) validate();
  else naechsteBild();
}

function validate(): void {
  const alleRichtig =
    istVollstaendig() &&
    geschaetzte().every((p) =>
      saetze().some((s) => s.part1 === p.part1 && s.part2 === p.part2),
    );
  props.exercise.correctlyAnswered = alleRichtig;
  geprueft.value = true;
  pfeilModus.value = "validate";
  emit("answered-event");
}

function showSolution(): void {
  auswahl.value = null;
  props.exercise.guessedSentences = saetze().map((s) => ({
    part1: s.part1,
    part2: s.part2,
  }));
  geprueft.value = true;
  pfeilModus.value = "solution";
  if (props.exercise.correctlyAnswered === undefined)
    props.exercise.correctlyAnswered = false;
  emit("answered-event");
}

function loescheAlles(): void {
  auswahl.value = null;
  props.exercise.guessedSentences = [];
  geprueft.value = false;
  pfeilModus.value = null;
  delete props.exercise.correctlyAnswered;
  emit("answered-event");
}

function reset(): void {
  loescheAlles();
}

function retry(): void {
  loescheAlles();
}

function pfeilFarbe(p: TwoPartSentences): string {
  if (pfeilModus.value === "solution") return "black";
  const richtig = saetze().some(
    (s) => s.part1 === p.part1 && s.part2 === p.part2,
  );
  return richtig ? "green" : "red";
}

function berechne(): void {
  const w = wurzel.value;
  if (!w) return;
  const r = w.getBoundingClientRect();
  groesse.value = { b: r.width, h: r.height };

  if (!geprueft.value) {
    pfeile.value = [];
    return;
  }

  pfeile.value = geschaetzte()
    .map((p) => {
      const li = boxen.value["l:" + p.part1];
      const re = boxen.value["r:" + p.part2];
      if (!li || !re) return null;
      const a = li.getBoundingClientRect();
      const b = re.getBoundingClientRect();
      return {
        x1: a.right - r.left,
        y1: a.top + a.height / 2 - r.top,
        x2: b.left - r.left - 2,
        y2: b.top + b.height / 2 - r.top,
        farbe: pfeilFarbe(p),
      };
    })
    .filter((p): p is { x1: number; y1: number; x2: number; y2: number; farbe: string } => p !== null);
}

function naechsteBild(): void {
  nextTick(berechne);
}

function init(): void {
  auswahl.value = null;
  geprueft.value = props.exercise.correctlyAnswered !== undefined;
  pfeilModus.value = geprueft.value ? "validate" : null;
  if (!props.exercise.guessedSentences) props.exercise.guessedSentences = [];
  links.value = mischen(saetze().map((s) => s.part1));
  rechts.value = mischen(saetze().map((s) => s.part2));
  naechsteBild();
}

watch(() => props.exercise, init);
onMounted(() => {
  init();
  window.addEventListener("resize", berechne);
});
onBeforeUnmount(() => window.removeEventListener("resize", berechne));
</script>

<style scoped>
.matching {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 80px;
}
.pfeile {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.spalte {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: max-content;
}
.kasten {
  border: 2px solid black;
  padding: 6px 10px;
  cursor: pointer;
  user-select: none;
}
</style>
