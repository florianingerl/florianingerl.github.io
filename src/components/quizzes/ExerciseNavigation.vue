<template>
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link" :title="t.zurueck5" @click="emit('navigate', -5)">
        <i class="bi bi-chevron-double-left" aria-hidden="true"></i>
      </button>
    </li>
    <li class="page-item">
      <button class="page-link" :title="t.zurueck" @click="emit('navigate', -1)">
        <i class="bi bi-chevron-left" aria-hidden="true"></i>
      </button>
    </li>
    <li
      v-for="q in indices"
      :key="q"
      class="page-item"
      :class="{ active: q === i }"
    >
      <button class="page-link" @click="emit('select', q)">{{ q }}</button>
    </li>
    <li class="page-item">
      <button class="page-link" :title="t.weiter" @click="emit('navigate', 1)">
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
      </button>
    </li>
    <li class="page-item">
      <button class="page-link" :title="t.weiter5" @click="emit('navigate', 5)">
        <i class="bi bi-chevron-double-right" aria-hidden="true"></i>
      </button>
    </li>
    <input
      type="number"
      min="0"
      :max="letzterIndex"
      :value="i"
      style="width: 50px"
      @change="beiEingabe"
    />
    <span> / {{ letzterIndex }}</span>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Lang } from "@/types/quiz";

const props = defineProps<{
  i: number;
  indices: number[];
  letzterIndex: number;
  lg: Lang;
}>();

const emit = defineEmits<{
  (e: "navigate", delta: number): void;
  (e: "select", index: number): void;
}>();

// Beschriftungen der Blaetterknoepfe je Sprache.
interface Navigationstexte {
  zurueck5: string;
  zurueck: string;
  weiter: string;
  weiter5: string;
}

const texte: Record<Lang, Navigationstexte> = {
  de: {
    zurueck5: "Gehe 5 Aufgaben zurück",
    zurueck: "Vorige Aufgabe",
    weiter: "Nächste Aufgabe",
    weiter5: "Gehe 5 Aufgaben weiter",
  },
  en: {
    zurueck5: "Jump 5 exercises backward",
    zurueck: "Previous exercise",
    weiter: "Next exercise",
    weiter5: "Jump 5 exercises forward",
  },
  fr: {
    zurueck5: "Sauter 5 exercices en arrière",
    zurueck: "Question précédente",
    weiter: "Question suivante",
    weiter5: "Sauter 5 questions",
  },
  it: {
    zurueck5: "Vai 5 esercizi indietro",
    zurueck: "Esercizio precedente",
    weiter: "Esercizio successivo",
    weiter5: "Vai 5 esercizi avanti",
  },
  es: {
    zurueck5: "Ir 5 ejercicios atrás",
    zurueck: "Ejercicio anterior",
    weiter: "Ejercicio siguiente",
    weiter5: "Ir 5 ejercicios adelante",
  },
};

const t = computed(() => texte[props.lg]);

// Die eingegebene Seitennummer wird an den Aufrufer gemeldet; ob sie gueltig
// ist, prueft der Aufrufer (er kennt die Anzahl der Aufgaben).
function beiEingabe(e: Event): void {
  emit("select", parseInt((e.target as HTMLInputElement).value));
}
</script>
