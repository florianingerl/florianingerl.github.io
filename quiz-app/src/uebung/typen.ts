// Gemeinsame Datentypen der Übungsbausteine

// Eine Antwortmöglichkeit einer Multiple-Choice-Frage
export interface Antwort {
  option: string;
  correct: boolean;
  checked?: boolean;
}

// Eine Frage mit Antwortmöglichkeiten, wahlweise auch auf Englisch oder Französisch
export interface Frage {
  question?: string;
  questionEn?: string;
  questionFr?: string;
  type?: string;
  options: Antwort[];
  optionsEn?: Antwort[];
  optionsFr?: Antwort[];
  correctlyAnswered?: boolean;
  // Manche Fragen tragen noch weitere Felder, die niemand liest
  [weitere: string]: unknown;
}

// Ein Satz, den der Schüler ganz neu schreiben soll
export interface Satzaufgabe {
  task: string;
  solution: string;
  guess?: string;
}

// Eine Aufgabe, bei der ein Text mit einem regulären Ausdruck umgebaut wird
export interface RegexAufgabe {
  instruction: string;
  editor: string;
  find: string;
  replaceby: string;
}
