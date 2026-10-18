import type { QuizName } from "@/types/quiz";

// Der Anker (die Zeichen nach "#" in der URL), der zum Bereich einer
// Quiz-Sektion auf der Startseite gehoert. Mehrere Quize koennen dabei
// derselben Sektion zugeordnet sein (z.B. informatics und programming:
// beide stehen im Bereich "infouni").
export const QUIZ_ANKER: Record<QuizName, string> = {
  french: "franzoesisch",
  english: "englisch",
  espagnol: "spanisch",
  italiano: "italienisch",
  deutsch: "deutsch",
  nutrition: "ernaehrung",
  lernenlehren: "lernenundlehren",
  consciousness: "bewusstsein",
  mathematics: "matheuni",
  physics: "physikuni",
  informatics: "infouni",
  programming: "infouni",
  webprogramming: "websitenundflyer",
};
