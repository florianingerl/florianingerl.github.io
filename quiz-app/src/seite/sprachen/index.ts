import type { Component } from "vue";
import type { Lang } from "../../types";

// Welche Sprachen eine Hülle anbietet, steht als data-sprachen am <div id="app">, die erste ist die Vorgabe.
export type Sprache = "de" | "en" | "es" | "fr";

export interface Eintrag {
  titel: string;
  ziel: string;
}

// Eine Gruppe im Menü oben, die beim Überfahren ihre Einträge aufklappt
export interface Gruppe extends Eintrag {
  eintraege: Eintrag[];
}

// Wohin das Kontaktformular geht, seine Beschriftungen stehen in den Nachrichten
export interface Formular {
  action: string;
  // web3forms braucht den Schlüssel und leitet danach auf die Bestätigungsseite weiter
  accessKey?: string;
  weiterleitung?: string;
  botcheck: boolean;
}

export interface Kontakt {
  karteHoehe: string;
  // Adresse der Google-Maps-Einbettung, ohne sie bleibt die Karte weg
  karte?: string;
  containerId?: string;
  strasse: string;
  ort: string;
  mailadresse: string;
  formular: Formular;
}

export interface Fusszeile {
  telefonnummer?: string;
  mailadresse: string;
  sozial: boolean;
}

// Alle Oberflächentexte einer Sprache, vue-i18n reicht sie per t("...") an die Bausteine
export interface Nachrichten {
  titel: string;
  logo: string;
  knopf: string;
  kontakt: { adresse: string; email: string; absatz: string };
  formular: {
    name: string;
    mail: string;
    betreff?: string;
    nachricht: string;
    knopf: string;
    gesendet?: string;
    // kleine Rechenfrage gegen Roboter, nur auf der englischen Seite
    roboter?: { hinweis: string; frage: string; antwort: string; fehler: string };
  };
  // Beschriftung der Telefonnummer, fehlt auf der deutschen Seite
  fuss: { telefon?: string };
}

// Aufbau und Daten einer Sprachfassung, die Texte dazu stehen in den Nachrichten
export interface Seite {
  // Wohin das Logo führt, sonst index.html
  start?: string;
  heroBild: string;
  menue: Gruppe[];
  kontakt: Kontakt;
  fuss: Fusszeile;
  // Sprache des Schachrätsels
  schach: Lang;
  abschnitte: Component[];
}

// Jede Sprache liegt in einer eigenen Datei und wird erst geladen, wenn die Seite sie braucht.
export interface Sprachmodul {
  default: Seite;
  nachrichten: Nachrichten;
}

export const lader: Record<Sprache, () => Promise<Sprachmodul>> = {
  de: () => import("./de"),
  en: () => import("./en"),
  es: () => import("./es"),
  fr: () => import("./fr"),
};
