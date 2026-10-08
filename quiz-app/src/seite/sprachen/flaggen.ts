import type { Sprache } from "./index";

// Flagge je Sprache für den Umschalter rechts oben in der Kopfzeile
export const flaggen: Partial<Record<Sprache, { bild: string; alt: string }>> = {
  de: { bild: "assets/img/flags/german.png", alt: "DE" },
  fr: { bild: "assets/img/flags/franceflag.gif", alt: "FR" },
  en: { bild: "assets/img/flags/englishflag.jpg", alt: "ENG" },
  es: { bild: "assets/img/flags/spanish.png", alt: "ESP" },
};
