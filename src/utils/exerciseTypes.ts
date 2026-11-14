import type { ExerciseType } from "@/types/quiz";

export interface ExerciseTypeOption {
  value: ExerciseType;
  label: string;
}

// Die Beschriftungen entsprechen dem Formular zum Anlegen einer Aufgabe in
// VueNewExercise.vue.
export const EXERCISE_TYPE_OPTIONS: ExerciseTypeOption[] = [
  { value: "gapText", label: "Gap text" },
  { value: "multipleChoice", label: "Multiple choice" },
  { value: "matching", label: "Matching" },
  { value: "wordOrder", label: "Word order" },
  { value: "programming", label: "Programming" },
];

export const EXERCISE_TYPES: ExerciseType[] = EXERCISE_TYPE_OPTIONS.map(
  (option) => option.value,
);

// Prueft einen Wert aus der Adresse, bevor er in den Filter uebernommen wird.
export function isExerciseType(
  value: string | null | undefined,
): value is ExerciseType {
  return EXERCISE_TYPES.includes(value as ExerciseType);
}
