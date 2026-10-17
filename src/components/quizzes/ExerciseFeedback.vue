<template>
  <p class="exercise-feedback">
    <button @click="emit('validate')">{{ t.validate }}</button>
    <button @click="emit('showSolution')">{{ t.solution }}</button>
    <button @click="emit('retry')">{{ t.retry }}</button>
  </p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Lang } from "@/types/quiz";

// Die Beschriftungen der drei Knoepfe je Sprache. Sie werden von allen
// Aufgabentypen gemeinsam genutzt.
const props = defineProps<{ lg: Lang }>();

const emit = defineEmits<{
  (e: "validate"): void;
  (e: "showSolution"): void;
  (e: "retry"): void;
}>();

const texte: Record<Lang, { validate: string; solution: string; retry: string }> = {
  de: {
    validate: "Prüfen",
    solution: "Zeig mir die Lösung",
    retry: "Nochmal versuchen",
  },
  en: {
    validate: "Validate",
    solution: "Show me the solution",
    retry: "Retry",
  },
  fr: {
    validate: "Valider ma solution",
    solution: "Montre-moi la solution",
    retry: "Essayer encore une fois",
  },
  it: {
    validate: "Convalida",
    solution: "Mostrami la soluzione",
    retry: "Riprova",
  },
  es: {
    validate: "Validar",
    solution: "Muéstrame la solución",
    retry: "Reintentar",
  },
};

const t = computed(() => texte[props.lg]);
</script>
