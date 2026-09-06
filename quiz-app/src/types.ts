export type QuizName =
  | "french"
  | "english"
  | "espagnol"
  | "italiano"
  | "deutsch"
  | "nutrition"
  | "lernenlehren"
  | "consciousness";

export type Lang = "de" | "en" | "fr";

export type ExerciseType = "gapText" | "multipleChoice";

export interface Option {
  option: string;
  correct: boolean;
  // nur zur Laufzeit im Browser gesetzt. Es wird nicht gespeichert.
  checked?: boolean;
}

export interface Exercise {
  _id?: string;
  quiz: QuizName;
  type: ExerciseType;
  imageUrl: string;
  topics?: string[];
  // gapText
  instruction?: string;
  gapText?: string;
  // multipleChoice
  question?: string;
  questionEn?: string;
  questionFr?: string;
  options?: Option[];
  optionsEn?: Option[];
  optionsFr?: Option[];
  // Nur Zur Laufzeit im Browser gesetzt. Wird nicht gespeichert.
  correctlyAnswered?: boolean;
}
