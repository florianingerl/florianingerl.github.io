import type { Book } from "@/types/book";

// Beispiel-Buch, das angezeigt wird, solange das Backend keine Buecher zum
// Fach "deutsch" liefert. So ist der Buchladen auch ohne laufenden Server
// sichtbar. Die Ids sind fest, damit Quizze einander zugeordnet bleiben.
// Dieselben Inhalte legt der Server beim Migrieren als echte Dokumente an
// (siehe scripts/migrate-quiz.ts im Backend).
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