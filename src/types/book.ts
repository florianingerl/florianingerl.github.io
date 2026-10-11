// Typen fuer die Buch-Schreib-App (VueBookWriter / VueBookStore).
//
// Ein Buch besteht aus Absaetzen und dazwischen eingefuegten Quizzen. Der
// Server speichert die Absaetze als HTML-Strings und die Quizze als Liste von
// Ids. Zwischen zwei Absaetzen steht hoechstens ein Quiz, deshalb laesst sich
// die Reihenfolge beim Laden wieder herstellen:
//   Absatz 0, Quiz 0, Absatz 1, Quiz 1, ..., Absatz n
export interface Book {
  _id?: string;
  name: string;
  // Sprache oder Fach, z.B. "deutsch" oder "Mathematik".
  subject: string;
  paragraphs: string[];
  // _id der Quizze in der Reihenfolge, in der sie im Buch erscheinen.
  quizzes: string[];
  // _id des Benutzers, der das Buch angelegt hat. Setzt der Server selbst.
  user?: string;
}

// Ein Quiz gehoert zu einer Website (hier "book") und zu einem Buch.
export interface BookQuiz {
  _id?: string;
  website: string;
  book?: string;
  // Sprache oder Fach, z.B. "deutsch" oder "Mathematik".
  subject: string;
  title?: string;
}

// Eine Aufgabe innerhalb eines Quiz.
export interface BookExercise {
  _id?: string;
  quiz: string;
  // Sprache oder Fach, z.B. "deutsch" oder "Mathematik".
  subject: string;
  // _id eines Themas oder das Thema selbst.
  topic?: string | BookTopic;
  instruction?: string;
  question?: string;
  options?: string[];
  correct?: number;
}

export interface BookTopic {
  _id?: string;
  subject: string;
  tutorial: string;
  title: string;
}

// Ein Block im Editor: entweder ein Absatz oder ein Quiz. Nur zur Anzeige,
// gespeichert wird wieder die Trennung in paragraphs und quizzes.
export interface BookBlock {
  kind: "paragraph" | "quiz";
  html: string;
  quizId?: string;
}

// Eine Person in einer gemeinsamen Schreib-Sitzung mit ihrer Cursor-Farbe.
export interface CollaborationUser {
  id: string;
  name: string;
  color: string;
}
