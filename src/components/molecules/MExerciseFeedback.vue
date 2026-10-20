<!-- Die drei Feedback-Knoepfe einer Aufgabe: Pruefen, Loesung zeigen und
     Nochmal versuchen. Die Beschriftungen kommen je nach Quiz-Sprache aus
     dem lg-Prop. Jeder Knoepf hat ein passendes Bootstrap-Icon und einen
     Tooltip mit dem vollstaendigen Text (falls der Text per ellipsis
     abgeschnitten wird). Bei Klick wird das passende Signal gemeldet. -->
<template>
  <div class="exercise-feedback">
    <button
      class="btn btn-primary exercise-feedback__button"
      :title="t.validate"
      @click="emit('validate')"
    >
      <i class="bi bi-check-circle" aria-hidden="true"></i>
      {{ t.validate }}
    </button>
    <button
      class="btn btn-secondary exercise-feedback__button"
      :title="t.solution"
      @click="emit('showSolution')"
    >
      <i class="bi bi-lightbulb" aria-hidden="true"></i>
      {{ t.solution }}
    </button>
    <button
      class="btn btn-secondary exercise-feedback__button"
      :title="t.retry"
      @click="emit('retry')"
    >
      <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
      {{ t.retry }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Lang } from "@/types/quiz";

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

<style scoped>
.exercise-feedback {
  display: flex;
  flex-direction: row;
  gap: 2px;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.exercise-feedback__button {
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
