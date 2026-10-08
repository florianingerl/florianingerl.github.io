import { shallowRef } from "vue";
import { i18n } from "./i18n";
import { lader, type Seite, type Sprache } from "./sprachen";

// Welche Sprachen die Hülle anbietet, die erste ist die Vorgabe (seite.ts füllt das aus data-sprachen)
export const angeboten: Sprache[] = [];

// Aufbau und Daten der gerade gezeigten Sprache
export const seite = shallowRef<Seite>();

const MERKER = "sprache";

function erlaubt(wert: string | null | undefined): wert is Sprache {
  return !!wert && (angeboten as string[]).includes(wert);
}

// Reihenfolge: ?lang= in der Adresse, zuletzt gewählte Sprache, Browsersprache, Vorgabe der Hülle
export function erkenneSprache(): Sprache {
  const adresse = new URLSearchParams(location.search).get("lang");
  if (erlaubt(adresse)) return adresse;
  let gemerkt: string | null = null;
  try {
    gemerkt = localStorage.getItem(MERKER);
  } catch {
    // ohne Speicher (privates Fenster) bleibt es bei den nächsten Stufen
  }
  if (erlaubt(gemerkt)) return gemerkt;
  const browser = navigator.language.slice(0, 2);
  if (erlaubt(browser)) return browser;
  return angeboten[0];
}

// Lädt die Sprachdatei nach, trägt ihre Texte bei vue-i18n ein und schaltet um, ohne die Seite neu zu laden.
export async function lade(sprache: Sprache): Promise<void> {
  const modul = await lader[sprache]();
  i18n.global.setLocaleMessage(sprache, modul.nachrichten);
  seite.value = modul.default;
  i18n.global.locale.value = sprache;
  document.documentElement.lang = sprache === "vorlage" ? "de" : sprache;
  document.title = i18n.global.t("titel");
  try {
    localStorage.setItem(MERKER, sprache);
  } catch {
    // dann merkt sich der Browser die Wahl eben nicht
  }
  // Die Adresse zeigt die Sprache, sobald sie nicht mehr die Vorgabe ist, damit man sie weitergeben kann.
  const inAdresse = new URLSearchParams(location.search).get("lang");
  if (angeboten.length > 1 && inAdresse !== sprache && (inAdresse || sprache !== angeboten[0])) {
    history.replaceState(null, "", `?lang=${sprache}${location.hash}`);
  }
}
