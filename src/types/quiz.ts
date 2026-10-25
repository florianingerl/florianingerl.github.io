export type QuizName =
  | "french"
  | "english"
  | "espagnol"
  | "italiano"
  | "deutsch"
  | "nutrition"
  | "lernenlehren"
  | "consciousness"
  | "mathematics"
  | "webprogramming"
  | "informatics"
  | "programming"
  | "physics";

export type Lang = "de" | "en" | "fr" | "it" | "es";

export type ExerciseType = "gapText" | "multipleChoice" | "matching" | "wordOrder";

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

// Ein Element einer gapText-Aufgabe. Entsteht beim Parsen des gapText und
// haengt am Exercise, damit die Antworten beim Wechseln zurueck bleiben.
export interface Gap {
  text: string;
  // string = Freitext-Lücke, string[] = Auswahl-Lücke
  gap: string | string[];
  guess: string;
  solution?: string;
}

// Die beiden Haelften eines Satzes in einer matching-Aufgabe.
export interface TwoPartSentences {
  part1: string;
  part2: string;
}

// Eine word-order-Aufgabe: der Satz, der rekonstruiert werden muss.
// shuffledSentence und guess sind nur Laufzeitfelder und werden nicht gespeichert.
export interface WordOrderSentence {
  sentence: string;
  shuffledSentence?: string[];
  guess?: string;
}

export interface Topic {
  _id?: string;
  // Sprache oder Fach, z.B. "deutsch" oder "Mathematik".
  subject: string;
  tutorial: string;
  title: string;
  // Das Quiz, in dem das Thema angelegt wurde (dessen _id).
  quiz?: string;
  // _id des Benutzers, der das Topic angelegt hat. Der Server setzt das beim
  // Speichern selbst, es kann also nicht veraendert werden.
  user?: string;
  parentId?: string | null; // for hierarchical topics
}

// Eine Schule/Hochschule/Klasse, z.B. "LMU München" oder
// "9.Klasse Gymnasium Bayern". Die Aufgaben waehlen ihre Schule aus dieser
// Liste. Der Name ist eindeutig, der Server legt neue Schulen bei Bedarf an.
export interface School {
  _id?: string;
  name: string;
}

// Ein Quiz gehoert zu einer Website ("web", die Sprach-/Fachseiten) oder zu
// einem Buch ("book"). Die Website-Quizze heissen wie ihr Fach ("french",
// "english", "deutsch", ...); ein Buch-Quizz haengt an einem Buch und an einer
// Sprache oder einem Fach.
export interface Quiz {
  _id?: string;
  website: string;
  // Nur bei website === "book": das Buch, in dem das Quiz erscheint.
  book?: string;
  // Anzeige-Name, z.B. "Wortschatz: Sterne".
  name?: string;
  // Sprache oder Fach, z.B. "deutsch" oder "Mathematik". Freier String.
  subject: string;
  // _id des Benutzers, der das Quiz angelegt hat. Setzt der Server selbst.
  user?: string;
}

// Angemeldeter Benutzer. Das Passwort schickt der Server nie mit.
export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
  isAdmin?: boolean;
  emailVerified?: boolean;
  quizSettings?: {
    gapReadMode?: "gap" | "whole";
  };
  createdAt?: string;
  updatedAt?: string;
}


export interface Exercise {
  _id?: string;
  // _id des Quizzes (oder bei alten, noch nicht migrierten Bestaenden sein
  // Name). Aufgaben eines Buch-Quizzes zeigen auf die _id des Buch-Quizzes.
  quiz: string | Quiz;
  // Sprache oder Fach, z.B. "deutsch". Setzt der Server aus dem Quiz.
  subject?: string;
  type: ExerciseType;
  imageUrl: string;
  topic?: Topic | string; //It's either the id of the topic or the topic itsself
  // Die Schule der Aufgabe. Der Server schickt das ganze School-Dokument mit
  // populate, beim Speichern wird nur die _id (oder der Name) geschickt.
  school?: School | string;
  // gapText
  gapText?: string;
  questionOrInstruction: string;
  questionEn?: string;
  questionFr?: string;
  // multipleChoice
  options?: Option[];
  optionsEn?: Option[];
  optionsFr?: Option[];
  // matching
  // Die Saelte der Aufgabe. part1 steht links, part2 rechts.
  sentences?: TwoPartSentences[];
  // Was der Benutzer zusammengeklickt hat, in der Reihenfolge der Paare.
  guessedSentences?: TwoPartSentences[];
  // word order
  wordorder?: WordOrderSentence;
  // _id des Benutzers, der die Aufgabe angelegt hat. Der Server setzt das beim
  // Speichern selbst, es kann also nicht veraendert werden.
  user?: string;
  // Nur Zur Laufzeit im Browser gesetzt. Wird nicht gespeichert.
  correctlyAnswered?: boolean;
  // Nur zur Laufzeit im Browser: das geparste gapText mit den bereits
  // ausgefuellten Luecken. Wird nicht gespeichert.
  gaps?: Gap[];
}

