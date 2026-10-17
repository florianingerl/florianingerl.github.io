import { reactive } from "vue";
import { defineStore } from "pinia";

// Filterkriterien fuer die Anzeige der Aufgaben eines Quizzes. Die Filterung
// selbst erfolgt im Frontend (siehe displayedQuestions in VueQuiz.vue).
export interface QuizFilter {
  // "quiz" = nur Aufgaben dieses Quizzes, "subject" = alle Aufgaben desselben
  // Faches (Sprache/Fach). Voreinstellung ist "subject".
  scope: "quiz" | "subject";
  // _id des Topics oder "" fuer alle Topics
  topicId: string;
  // Schulname (z.B. "LMU München") oder "" fuer alle Schulen
  school: string;
  // _id des Benutzers, der die Aufgabe erstellt hat, oder "" fuer alle
  creator: string;
  // Nach diesem Wort wird in der Aufgabe gesucht, "" bedeutet kein Suchwort
  word: string;
  caseSensitive: boolean;
}

// Mehrere Quiz-Apps auf derselben Seite benutzen denselben Pinia-Speicher,
// deshalb liegen die Filter pro Quiz in einem eigenen Eintrag.
export const useFilterStore = defineStore("filter", () => {
  const filters = reactive<Record<string, QuizFilter>>({});

  function filterFor(quiz: string): QuizFilter {
    if (!filters[quiz]) {
      filters[quiz] = {
        scope: "subject",
        topicId: "",
        school: "",
        creator: "",
        word: "",
        caseSensitive: false,
      };
    }
    return filters[quiz];
  }

  function reset(quiz: string): void {
    const f = filterFor(quiz);
    f.scope = "subject";
    f.topicId = "";
    f.school = "";
    f.creator = "";
    f.word = "";
    f.caseSensitive = false;
  }

  return { filterFor, reset };
});
