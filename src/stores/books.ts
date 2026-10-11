import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createBook,
  createBookQuiz,
  deleteBook,
  getBookExercises,
  getBookQuiz,
  getBooks,
  updateBook,
} from "@/api";
import type { Book, BookExercise, BookQuiz } from "@/types/book";
import {
  DUMMY_BOOK,
  DUMMY_EXERCISES,
  DUMMY_QUIZZES,
} from "@/components/book/bookDummy";

// Der Buchladen laedt Buecher, Quizze und Aufgaben von der API. Ist der Server
// nicht erreichbar (oder liefert keine Buecher), wird fuer das Fach "deutsch"
// das Beispiel-Buch aus bookDummy.ts gezeigt, damit der Laden auch ohne Backend
// sichtbar ist.
export const useBookStore = defineStore("books", () => {
  const books = ref<Book[]>([]);
  const quizzes = ref<Record<string, BookQuiz>>({});
  const exercises = ref<Record<string, BookExercise[]>>({});
  const laden = ref(false);
  const fehler = ref("");

  // Quizze und Aufgaben des Beispiel-Buchs direkt im Speicher anlegen, damit
  // auch ohne API-Aufruf eine Anzeige moeglich ist.
  for (const quiz of DUMMY_QUIZZES) {
    if (quiz._id) {
      quizzes.value[quiz._id] = quiz;
      exercises.value[quiz._id] = DUMMY_EXERCISES[quiz._id] ?? [];
    }
  }

  function dummyAufnehmen(subject: string): void {
    if (subject !== DUMMY_BOOK.subject) return;
    if (books.value.some((b) => b._id === DUMMY_BOOK._id)) return;
    books.value.push({ ...DUMMY_BOOK });
  }

  async function loadBooks(subject: string): Promise<void> {
    laden.value = true;
    fehler.value = "";
    try {
      books.value = await getBooks(subject);
    } catch (e) {
      // Ohne Backend bleibt die Liste leer; das Beispiel-Buch wird trotzdem
      // angezeigt.
      books.value = [];
      fehler.value = (e as Error).message;
    } finally {
      dummyAufnehmen(subject);
      laden.value = false;
    }
  }

  function quizNachladen(quiz: BookQuiz): void {
    if (!quiz._id) return;
    quizzes.value[quiz._id] = quiz;
  }

  async function loadQuiz(quizId: string): Promise<BookQuiz | undefined> {
    if (quizzes.value[quizId]) return quizzes.value[quizId];
    try {
      const quiz = await getBookQuiz(quizId);
      quizNachladen(quiz);
      return quiz;
    } catch {
      return undefined;
    }
  }

  async function loadExercises(quizId: string): Promise<BookExercise[]> {
    if (exercises.value[quizId]) return exercises.value[quizId];
    try {
      const liste = await getBookExercises(quizId);
      exercises.value[quizId] = liste;
      return liste;
    } catch {
      const leer: BookExercise[] = [];
      exercises.value[quizId] = leer;
      return leer;
    }
  }

  // Ein neues Quiz anlegen. Schlaegt die API fehl (kein Backend), bekommt das
  // Quiz trotzdem eine lokale Id, damit es im Editor angezeigt werden kann.
  async function neuesQuiz(subject: string, bookId?: string): Promise<BookQuiz> {
    const entwurf: BookQuiz = { website: "book", book: bookId, subject };
    try {
      const quiz = await createBookQuiz(entwurf);
      quizNachladen(quiz);
      if (quiz._id) exercises.value[quiz._id] = [];
      return quiz;
    } catch {
      const lokal: BookQuiz = { ...entwurf, _id: `lokal-${Date.now()}` };
      quizNachladen(lokal);
      if (lokal._id) exercises.value[lokal._id] = [];
      return lokal;
    }
  }

  // Buch speichern. Liefert das Buch mit gesetzter _id zurueck. Ohne Backend
  // bleibt das Buch nur im Speicher (mit lokaler Id).
  async function speichern(book: Book): Promise<Book> {
    try {
      const gespeichert = book._id
        ? await updateBook(book)
        : await createBook(book);
      ersetze(gespeichert);
      return gespeichert;
    } catch {
      const lokal = { ...book, _id: book._id ?? `lokal-${Date.now()}` };
      ersetze(lokal);
      return lokal;
    }
  }

  function ersetze(book: Book): void {
    const i = books.value.findIndex((b) => b._id === book._id);
    if (i === -1) books.value.push(book);
    else books.value[i] = book;
  }

  async function entfernen(id: string): Promise<void> {
    try {
      await deleteBook(id);
    } catch {
      // Auch ohne Backend aus der Anzeige entfernen.
    }
    books.value = books.value.filter((b) => b._id !== id);
  }

  return {
    books,
    quizzes,
    exercises,
    laden,
    fehler,
    loadBooks,
    loadQuiz,
    loadExercises,
    neuesQuiz,
    speichern,
    entfernen,
  };
});
