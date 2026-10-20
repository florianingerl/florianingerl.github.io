import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createBook,
  createQuiz,
  deleteBook,
  getBooks,
  getQuiz,
  updateBook,
} from "@/api";
import type { Book } from "@/types/book";
import type { Quiz } from "@/types/quiz";
import { DUMMY_BOOK } from "@/components/book/bookDummy";

// Der Buchladen laedt Buecher und (Buch-)Quizze von der API. Ist der Server
// nicht erreichbar (oder liefert keine Buecher), wird fuer das Fach "deutsch"
// das Beispiel-Buch aus bookDummy.ts gezeigt, damit der Laden auch ohne Backend
// sichtbar ist. Die Aufgaben eines Buch-Quizzes laedt OQuiz selbst ueber die
// normale Aufgaben-API.
export const useBookStore = defineStore("books", () => {
  const books = ref<Book[]>([]);
  const quizzes = ref<Record<string, Quiz>>({});
  const laden = ref(false);
  const fehler = ref("");

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

  function quizNachladen(quiz: Quiz): void {
    if (!quiz._id) return;
    quizzes.value[quiz._id] = quiz;
  }

  async function loadQuiz(quizId: string): Promise<Quiz | undefined> {
    if (quizzes.value[quizId]) return quizzes.value[quizId];
    try {
      const quiz = await getQuiz(quizId);
      quizNachladen(quiz);
      return quiz;
    } catch {
      return undefined;
    }
  }

  // Ein neues Buch-Quizz anlegen. Schlaegt die API fehl (kein Backend),
  // bekommt das Quiz trotzdem eine lokale Id, damit es im Editor angezeigt
  // werden kann.
  async function neuesQuiz(subject: string, bookId?: string): Promise<Quiz> {
    const entwurf: Quiz = { website: "book", book: bookId, subject };
    try {
      const quiz = await createQuiz(entwurf);
      quizNachladen(quiz);
      return quiz;
    } catch {
      const lokal: Quiz = { ...entwurf, _id: `lokal-${Date.now()}` };
      quizNachladen(lokal);
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
    laden,
    fehler,
    loadBooks,
    loadQuiz,
    neuesQuiz,
    speichern,
    entfernen,
  };
});