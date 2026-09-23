import type { Component } from "vue";
import type { Lang } from "../../types";

// Welche Sprache eine Seite zeigt, steht in ihrer index*.html als data-sprache am <div id="app">.
export type Sprache = "de" | "en" | "es" | "fr";

export interface Eintrag {
  titel: string;
  ziel: string;
}

// Eine Gruppe im Menü oben, die beim Überfahren ihre Einträge aufklappt
export interface Gruppe extends Eintrag {
  eintraege: Eintrag[];
}

export interface Formular {
  action: string;
  // web3forms braucht den Schlüssel und leitet danach auf die Bestätigungsseite weiter
  accessKey?: string;
  weiterleitung?: string;
  botcheck: boolean;
  name: string;
  mail: string;
  betreff?: string;
  nachricht: string;
  // kleine Rechenfrage gegen Roboter, nur auf der englischen Seite
  roboterFrage?: { hinweis: string; frage: string; antwort: string; fehler: string };
  gesendet?: string;
  knopf: string;
}

// Eine Flagge im Sprachumschalter rechts oben
export interface Flagge {
  ziel: string;
  bild: string;
  alt: string;
}

export interface Kontakt {
  karteHoehe: string;
  // Adresse der Google-Maps-Einbettung, ohne sie bleibt die Karte weg
  karte?: string;
  containerId?: string;
  // Beschriftungen
  adresse: string;
  email: string;
  strasse: string;
  ort: string;
  mailadresse: string;
  absatz: string;
  formular: Formular;
}

export interface Fusszeile {
  // Beschriftung der Telefonnummer, fehlt auf der deutschen Seite
  telefon?: string;
  telefonnummer?: string;
  mailadresse: string;
  sozial: boolean;
}

// Alles, was sich zwischen den Sprachfassungen unterscheidet
export interface Seite {
  logo: string;
  // Wohin das Logo führt, sonst index.html
  start?: string;
  knopf: string;
  heroBild: string;
  // Sprachumschalter rechts oben, fehlt bei Seiten mit nur einer Sprache
  flaggen?: Flagge[];
  menue: Gruppe[];
  kontakt: Kontakt;
  fuss: Fusszeile;
  // Sprache des Schachrätsels
  schach: Lang;
  abschnitte: Component[];
}

// Jede Sprache liegt in einer eigenen Datei und wird erst geladen, wenn die Seite sie braucht.
export const lader: Record<Sprache, () => Promise<{ default: Seite }>> = {
  de: () => import("./de"),
  en: () => import("./en"),
  es: () => import("./es"),
  fr: () => import("./fr"),
};
