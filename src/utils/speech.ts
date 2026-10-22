// Vorlesen mit der Web-Speech-API des Browsers (Aufgabe 38).
//
// Die Web-Speech-API braucht keinen API-Schluessel und kostet nichts. Welche
// Stimmen zur Verfuegung stehen, haengt vom Betriebssystem ab. Deshalb wird
// die Stimme passend zur Sprache der Aufgabe gewaehlt: die Loesung einer
// franzoesischen Aufgabe wird z.B. mit einer franzoesischen Stimme vorgelesen.

import type { Lang } from "@/types/quiz";

// Der Sprachcode (BCP 47) je Quiz-Sprache. Damit findet der Browser eine
// passende Stimme.
const SPRACHCODE: Record<Lang, string> = {
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
};

// Die Stimmen des Browsers. Sie werden erst asynchron geladen, deshalb werden
// sie hier zwischengespeichert.
let stimmen: SpeechSynthesisVoice[] = [];
let zuhoererAngemeldet = false;

// Prueft, ob der Browser ueberhaupt sprechen kann. Im Test (jsdom) und in
// sehr alten Browsern gibt es die API nicht.
export function sprachausgabeMoeglich(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.speechSynthesis !== "undefined" &&
    typeof window.SpeechSynthesisUtterance !== "undefined"
  );
}

// Meldet sich fuer das "voiceschanged"-Ereignis an, damit die Stimmenliste
// gefuellt wird, sobald der Browser sie geladen hat.
function hoereAufStimmen(): void {
  if (zuhoererAngemeldet || !sprachausgabeMoeglich()) return;
  if (typeof window.speechSynthesis.addEventListener !== "function") return;
  zuhoererAngemeldet = true;
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    stimmen = window.speechSynthesis.getVoices();
  });
}

// Holt die verfuegbaren Stimmen (und merkt sie sich fuer den naechsten Aufruf).
function verfuegbareStimmen(): SpeechSynthesisVoice[] {
  if (!sprachausgabeMoeglich()) return [];
  const geladen = window.speechSynthesis.getVoices();
  if (geladen.length > 0) stimmen = geladen;
  return stimmen;
}

// Sucht eine Stimme fuer die Sprache: erst genau passend, dann nach dem
// Laendercode (z.B. "fr-CA" fuer "fr-FR"), dann irgendeine Stimme der Sprache.
function stimmeFuer(sprache: string): SpeechSynthesisVoice | undefined {
  const verfuegbar = verfuegbareStimmen();
  const kurz = sprache.slice(0, 2).toLowerCase();
  const normalisiert = (s: SpeechSynthesisVoice): string =>
    s.lang.toLowerCase().replace("_", "-");
  return (
    verfuegbar.find((s) => normalisiert(s) === sprache.toLowerCase()) ??
    verfuegbar.find((s) => normalisiert(s).startsWith(kurz)) ??
    verfuegbar.find((s) => normalisiert(s).includes(kurz))
  );
}

// Macht aus dem Text der Loesung einen Text, der vorgelesen werden kann:
// HTML-Tags (z.B. <strong>) entfernen, Entities aufloesen, Leerzeichen
// zusammenfassen.
function reinenText(text: string): string {
  const ohneTags = text.replace(/<[^>]*>/g, " ");
  const ohneEntities = ohneTags
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'");
  return ohneEntities.replace(/\s+/g, " ").trim();
}

// Liest den Text in der Sprache lg vor. Eine laufende Ausgabe wird abgebrochen,
// damit sich zwei Aufgaben nicht ueberlagern.
export function spreche(text: string, lg: Lang): void {
  const inhalt = reinenText(text);
  if (!inhalt || !sprachausgabeMoeglich()) return;
  hoereAufStimmen();

  const sprache = SPRACHCODE[lg] ?? SPRACHCODE.de;
  const utterance = new window.SpeechSynthesisUtterance(inhalt);
  utterance.lang = sprache;
  const stimme = stimmeFuer(sprache);
  if (stimme) {
    utterance.voice = stimme;
    utterance.lang = stimme.lang;
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// Bricht eine laufende Ausgabe ab (z.B. wenn der Nutzer die Aufgabe neu
// startet).
export function stoppeSprechen(): void {
  if (!sprachausgabeMoeglich()) return;
  window.speechSynthesis.cancel();
}
