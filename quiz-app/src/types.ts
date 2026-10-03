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

// 1.1) Test à trous, 1.2) Test avec des options différents, 1.3) Test avec les mêmes options
export type ExportTestType =
  | "trous"
  | "optionsDifferents"
  | "optionsGleich";

// Ein Test auf *facile.com besteht aus Fragen (q) mit einem Stern als Lücke
// und Antworten (r). Bei den Antworten trennt das Pipe-Zeichen die Optionen,
// die erste Option ist immer die richtige.
export interface FrageAntwort {
  q: string;
  r: string;
}

export interface Option {
  option: string;
  correct: boolean;
  // nur zur Laufzeit im Browser gesetzt. Es wird nicht gespeichert.
  checked?: boolean;
}

export interface Topic {
  _id?: string ;
  quiz: QuizName,
  tutorial: string,
  title: string,
  // _id des Benutzers, der das Topic angelegt hat. Der Server setzt das beim
  // Speichern selbst, es kann also nicht veraendert werden.
  user?: string
}

// Angemeldeter Benutzer. Das Passwort schickt der Server nie mit.
export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export interface Exercise {
  _id?: string;
  quiz: QuizName;
  type: ExerciseType;
  imageUrl: string;
  topic?: Topic | string; //It's either the id of the topic or the topic itsself
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
  // _id des Benutzers, der die Aufgabe angelegt hat. Der Server setzt das beim
  // Speichern selbst, es kann also nicht veraendert werden.
  user?: string;
  // Nur Zur Laufzeit im Browser gesetzt. Wird nicht gespeichert.
  correctlyAnswered?: boolean;
}

