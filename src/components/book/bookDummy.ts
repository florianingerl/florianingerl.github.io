import type { Book, BookExercise, BookQuiz } from "@/types/book";

// Beispiel-Buch, das angezeigt wird, solange das Backend keine Buecher zum
// Fach "deutsch" liefert. So ist der Buchladen auch ohne laufenden Server
// sichtbar. Die Ids sind fest, damit Quizze und Aufgaben einander zugeordnet
// bleiben.
export const DUMMY_BOOK_ID = "dummy-book-deutsch";
export const DUMMY_QUIZ_IDS = ["dummy-quiz-1", "dummy-quiz-2"] as const;

export const DUMMY_BOOK: Book = {
  _id: DUMMY_BOOK_ID,
  name: "Meine erste Geschichte",
  subject: "deutsch",
  paragraphs: [
    "<p>Es war einmal ein kleiner Junge, der jeden Abend am Fenster stand und die Sterne zaehlte. Er fragte sich, ob die Sterne wohl zurueckzaehlten, wenn er sie ansah.</p>",
    "<p>Eines Tages fand er ein altes Buch in der Bibliothek seiner Grossmutter. Auf der ersten Seite stand nur ein einziger Satz: &bdquo;Wer erzaehlt, der lebt zweimal.&ldquo;</p>",
    "<p>Von diesem Moment an begann er, jeden Tag eine kleine Geschichte zu schreiben. Und mit jeder Geschichte wurde seine Welt ein bisschen groesser.</p>",
  ],
  quizzes: [...DUMMY_QUIZ_IDS],
};

export const DUMMY_QUIZZES: BookQuiz[] = [
  {
    _id: DUMMY_QUIZ_IDS[0],
    website: "book",
    book: DUMMY_BOOK_ID,
    subject: "deutsch",
    title: "Wortschatz: Sterne",
  },
  {
    _id: DUMMY_QUIZ_IDS[1],
    website: "book",
    book: DUMMY_BOOK_ID,
    subject: "deutsch",
    title: "Grammatik: Praeteritum",
  },
];

// Pro Quiz fuenf Aufgaben.
export const DUMMY_EXERCISES: Record<string, BookExercise[]> = {
  [DUMMY_QUIZ_IDS[0]]: [
    aufgabe(0, "Was zaehlte der Junge am Fenster?", ["Sterne", "Schaafe", "Wolken"], 0),
    aufgabe(1, "Wie fuehlte sich der Junge, wenn er schrieb?", ["traurig", "gluecklich", "muede"], 1),
    aufgabe(2, "Wie alt war das Buch?", ["brandneu", "alt", "leer"], 1),
    aufgabe(3, "Wo hatte der Junge sein Buch gefunden?", ["Bibliothek", "Keller", "Garten"], 0),
    aufgabe(4, "Was wuchs mit jeder Geschichte?", ["seine Angst", "seine Welt", "sein Hunger"], 1),
  ],
  [DUMMY_QUIZ_IDS[1]]: [
    aufgabe(0, "Der Junge ___ jeden Abend am Fenster.", ["stand", "steht", "stehen"], 0, DUMMY_QUIZ_IDS[1]),
    aufgabe(1, "Er ___ ein altes Buch.", ["findet", "fand", "finden"], 1, DUMMY_QUIZ_IDS[1]),
    aufgabe(2, "Seine Welt ___ groesser.", ["wurde", "werden", "wird"], 0, DUMMY_QUIZ_IDS[1]),
    aufgabe(3, "Er ___ die Sterne.", ["zaehlt", "zaehlte", "zaehlen"], 1, DUMMY_QUIZ_IDS[1]),
    aufgabe(4, "Am Abend ___ er am Fenster.", ["steht", "stand", "stehen"], 1, DUMMY_QUIZ_IDS[1]),
  ],
};

function aufgabe(
  index: number,
  question: string,
  options: string[],
  correct: number,
  quiz: string = DUMMY_QUIZ_IDS[0],
): BookExercise {
  return {
    _id: `${quiz}-ex-${index + 1}`,
    quiz,
    subject: "deutsch",
    instruction: "Waehle die richtige Antwort.",
    question,
    options,
    correct,
  };
}
