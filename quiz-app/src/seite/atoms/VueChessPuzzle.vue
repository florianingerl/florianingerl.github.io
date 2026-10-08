<template>
  <div>
    <p>{{ frage }}</p>
    <div ref="brettDiv" class="w-[200px] h-[200px]"></div>
    <p :class="farbe === 'red' ? 'text-[color:red]' : 'text-[color:green]'">{{ meldung }}</p>
    <button v-if="geloest && aktuell + 1 < raetsel.length" class="block" @click="naechstes">
      {{ t.naechstes }}
    </button>
    <p v-if="geloest && aktuell + 1 === raetsel.length" class="text-[color:green]">{{ t.alle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { Lang } from "../../types";

// chessboard.js kommt als altes Script mit jQuery aus chessboardjs-1.0.0/ in index.html.
declare const Chessboard: (element: HTMLElement, config: object) => Brett;
interface Brett {
  move(zug: string): void;
  position(): Record<string, string>;
  position(stellung: Record<string, string>): void;
  destroy(): void;
}

interface Zug {
  source: string;
  target: string;
  // der schwarze Bauer wandelt sich mit diesem Zug in eine Dame um
  isQueening?: boolean;
}

interface Raetsel {
  frage: Record<Lang, string>;
  position: Record<string, string>;
  loesung: Zug[];
}

const props = withDefaults(defineProps<{ lg?: Lang }>(), { lg: "de" });

const texte: Record<Lang, Record<string, string>> = {
  de: {
    hinweis: " Ziehe die Figur mit gedrückter Maustaste.",
    falsch: "Falscher Zug! Versuche einen anderen.",
    richtig: "Richtiger Zug! Finde jetzt die richtige Fortsetzung",
    geloest: "Gratulation! Du hast diese Aufgabe gelöst!",
    naechstes: "Nächste Aufgabe!",
    alle: "Du hast alle Aufgaben gelöst!",
  },
  fr: {
    hinweis: "",
    falsch: "Mauvais coup! Essaye un autre coup!",
    richtig: "Bon coup! Trouve comment continuer maintenant!",
    geloest: "Felicitations! Tu as résolu la devinette!",
    naechstes: "Exercice suivant!",
    alle: "Tu as résolu toutes les devinettes!",
  },
  en: {
    hinweis: "",
    falsch: "Wrong move! Try another move!",
    richtig: "Correct move! Find the right continuation now!",
    geloest: "Congratulations! You have solved the problem!",
    naechstes: "Next exercice!",
    alle: "You have solved all the exercices!",
  },
};

const springerFrage: Record<Lang, string> = {
  de: "Kann der weiße Springer den schwarzen Bauern noch aufhalten?",
  fr: "Est-ce que le cavalier blanc peut encore rattraper le pion noir?",
  en: "Can the white knight still prevent the black pawn from queening?",
};

// Die Aufgaben stammen aus Florians Schachunterricht an der Grundschule.
const raetsel: Raetsel[] = [
  {
    frage: springerFrage,
    position: { a2: "bK", a8: "wK", e4: "wN", g2: "bP" },
    loesung: [
      { source: "e4", target: "c3" },
      { source: "a2", target: "a1" },
      { source: "c3", target: "e2" },
    ],
  },
  {
    frage: springerFrage,
    position: { c1: "bK", a8: "wK", g6: "wN", g2: "bP" },
    loesung: [
      { source: "g6", target: "f4" },
      { source: "g2", target: "g1", isQueening: true },
      { source: "f4", target: "e2" },
      { source: "c1", target: "d2" },
      { source: "e2", target: "g1" },
    ],
  },
  {
    frage: springerFrage,
    position: { d1: "bK", a8: "wK", b6: "wN", b2: "bP" },
    loesung: [
      { source: "b6", target: "a4" },
      { source: "b2", target: "b1", isQueening: true },
      { source: "a4", target: "c3" },
      { source: "d1", target: "e1" },
      { source: "c3", target: "b1" },
    ],
  },
  {
    frage: springerFrage,
    position: { c8: "bK", a7: "wK", b8: "wN", h4: "bP" },
    loesung: [
      { source: "b8", target: "c6" },
      { source: "h4", target: "h3" },
      { source: "c6", target: "e7" },
      { source: "c8", target: "c7" },
      { source: "e7", target: "f5" },
      { source: "h3", target: "h2" },
      { source: "f5", target: "g3" },
      { source: "c7", target: "d6" },
      { source: "a7", target: "b6" },
      { source: "d6", target: "e5" },
      { source: "b6", target: "c5" },
      { source: "e5", target: "f4" },
      { source: "g3", target: "h1" },
      { source: "f4", target: "f3" },
      { source: "c5", target: "d4" },
      { source: "f3", target: "g2" },
      { source: "d4", target: "e3" },
      { source: "g2", target: "h1" },
      { source: "e3", target: "f2" },
    ],
  },
];

const t = computed(() => texte[props.lg]);
const aktuell = ref(0);
const frage = computed(() => raetsel[aktuell.value].frage[props.lg] + t.value.hinweis);
const meldung = ref("");
const farbe = ref("");
const geloest = ref(false);

const brettDiv = ref<HTMLElement>();
let brett: Brett | undefined;
// wie viele Züge der Lösung schon gespielt sind
let zugNr = 0;

function baueBrett(): void {
  if (!brettDiv.value) return;
  brett?.destroy();
  zugNr = 0;
  meldung.value = "";
  geloest.value = false;
  brett = Chessboard(brettDiv.value, {
    draggable: true,
    dropOffBoard: "snapback",
    moveSpeed: "slow",
    pieceTheme: "chessboardjs-1.0.0/img/chesspieces/wikipedia/{piece}.png",
    position: raetsel[aktuell.value].position,
    onDrop: gezogen,
  });
}

// Prüft den Zug des Spielers und antwortet mit dem nächsten Zug aus der Lösung.
function gezogen(source: string, target: string): string {
  const loesung = raetsel[aktuell.value].loesung;
  const erwartet = loesung[zugNr];
  if (erwartet.source !== source || erwartet.target !== target) {
    farbe.value = "red";
    meldung.value = t.value.falsch;
    return "snapback";
  }
  farbe.value = "green";
  zugNr++;
  if (zugNr === loesung.length) {
    meldung.value = t.value.geloest;
    geloest.value = true;
    return "drop";
  }
  meldung.value = t.value.richtig;
  const antwort = loesung[zugNr];
  brett?.move(`${antwort.source}-${antwort.target}`);
  if (antwort.isQueening && brett) {
    const stellung = brett.position();
    stellung[antwort.target] = "bQ";
    brett.position(stellung);
  }
  zugNr++;
  return "drop";
}

function naechstes(): void {
  aktuell.value++;
  baueBrett();
}

onMounted(baueBrett);
onBeforeUnmount(() => brett?.destroy());
</script>
