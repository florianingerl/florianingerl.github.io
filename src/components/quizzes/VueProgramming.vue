<template>
  <div class="programming-exercise">
    <p v-html="renderRichText(exercise.questionOrInstruction ?? '')"></p>

    <div class="programming-exercise__language">
      <span class="badge text-bg-secondary">{{ exercise.programminglanguage }}</span>
    </div>

    <div class="programming-exercise__tests">
      <div class="programming-exercise__test-label">Testcases:</div>
      <code v-if="testcases" class="programming-exercise__test-expression">{{ testcases }}</code>
      <p v-else class="text-muted mb-0">This exercise has no test cases.</p>
    </div>

    <textarea
      v-model="code"
      class="form-control programming-exercise__code"
      rows="10"
      spellcheck="false"
      :disabled="validating"
    ></textarea>

    <div v-if="error" class="alert alert-danger mt-2 mb-2" role="alert">
      {{ error }}
    </div>
    <div
      v-else-if="validationResult"
      class="alert mt-2 mb-2"
      :class="validationResult.passed ? 'alert-success' : 'alert-warning'"
      role="alert"
    >
      {{ validationResult.passed ? t.allPassed : t.someFailed }}
    </div>

    <MExerciseFeedback
      :lg="lg"
      @validate="validate"
      @showSolution="showSolution"
      @retry="retry"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type {
  Exercise,
  Lang,
  ProgrammingValidationResult,
} from "@/types/quiz";
import { validateProgrammingExercise } from "@/api";
import { fehlerText } from "@/api";
import { renderRichText } from "@/utils/richText";
import { functionSignatureSkeleton } from "@/utils/programming";
import MExerciseFeedback from "../molecules/MExerciseFeedback.vue";

const props = defineProps<{
  exercise: Exercise;
  lg: Lang;
}>();

const emit = defineEmits<{ (e: "answered-event"): void }>();

const texte: Record<Lang, { allPassed: string; someFailed: string; noId: string }> = {
  de: {
    allPassed: "Alle Tests bestanden. Gut gemacht!",
    someFailed: "Noch nicht alle Tests bestanden. Versuch es noch einmal.",
    noId: "Die Aufgabe konnte nicht geprüft werden.",
  },
  en: {
    allPassed: "All tests passed. Well done!",
    someFailed: "Not all tests passed yet. Try again.",
    noId: "The exercise could not be validated.",
  },
  fr: {
    allPassed: "Tous les tests sont réussis. Bravo !",
    someFailed: "Tous les tests ne sont pas encore réussis. Essaie encore.",
    noId: "L'exercice n'a pas pu être validé.",
  },
  it: {
    allPassed: "Tutti i test sono superati. Ben fatto!",
    someFailed: "Non tutti i test sono ancora superati. Riprova.",
    noId: "Non è stato possibile validare l'esercizio.",
  },
  es: {
    allPassed: "Todas las pruebas pasaron. ¡Bien hecho!",
    someFailed: "Todavía no pasan todas las pruebas. Inténtalo de nuevo.",
    noId: "No se pudo validar el ejercicio.",
  },
};

const t = computed(() => texte[props.lg]);

const testcases = computed(() => props.exercise.testcases ?? "");

const code = ref(
  props.exercise.programmingCode ??
    functionSignatureSkeleton(props.exercise.function ?? ""),
);
const validating = ref(false);
const error = ref("");
const validationResult = ref<ProgrammingValidationResult | null>(null);

function skeleton(): string {
  return functionSignatureSkeleton(props.exercise.function ?? "");
}

function initCode(): void {
  const stored = props.exercise.programmingCode;
  code.value = stored !== undefined ? stored : skeleton();
  validationResult.value = null;
  error.value = "";
}

watch(code, (value) => {
  props.exercise.programmingCode = value;
});

async function validate(): Promise<void> {
  if (validating.value) return;
  if (!props.exercise._id) {
    error.value = t.value.noId;
    return;
  }

  validating.value = true;
  error.value = "";
  try {
    const result = await validateProgrammingExercise(props.exercise._id, code.value);
    validationResult.value = result;
    if (result.error) {
      error.value = result.error;
    }
    props.exercise.correctlyAnswered = result.passed;
    emit("answered-event");
  } catch (e) {
    error.value = fehlerText(e, "Validation failed.");
  } finally {
    validating.value = false;
  }
}

function showSolution(): void {
  code.value = props.exercise.function ?? skeleton();
  validationResult.value = null;
  error.value = "";
  if (props.exercise.correctlyAnswered === undefined) {
    props.exercise.correctlyAnswered = false;
  }
  emit("answered-event");
}

function retry(): void {
  code.value = skeleton();
  validationResult.value = null;
  error.value = "";
  props.exercise.correctlyAnswered = undefined;
  emit("answered-event");
}

onMounted(initCode);
watch(() => props.exercise._id, initCode);
</script>

<style scoped>
.programming-exercise {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.programming-exercise__language {
  display: flex;
  justify-content: flex-end;
}

.programming-exercise__tests {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: #f8f9fa;
  max-height: 12rem;
  overflow: auto;
}

.programming-exercise__test-label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.programming-exercise__test-expression {
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
  color: #212529;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.85rem;
}

.programming-exercise__code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.9rem;
  min-height: 12rem;
}
</style>
