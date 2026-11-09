import type { QuizName } from "@/types/quiz";

// Der Anker (die Zeichen nach "#" in der URL), der zum Bereich einer
// Quiz-Sektion auf der Startseite gehoert.
export const QUIZ_ANKER: Record<QuizName, string> = {
  french: "franzoesisch",
  english: "englisch",
  espagnol: "spanisch",
  italiano: "italienisch",
  latin: "latein",
  deutsch: "deutsch",
  nutrition: "ernaehrung",
  lernenlehren: "lernenundlehren",
  consciousness: "bewusstsein",
  mathematics: "matheuni",
  physics: "physikuni",
  informatics: "infouni",
  programming: "programmierung",
  webprogramming: "websitenundflyer",
};
