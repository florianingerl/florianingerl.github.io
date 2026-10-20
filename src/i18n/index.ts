import { createI18n } from "vue-i18n";
import type { MessageCompiler } from "vue-i18n";
import type { Lang } from "@/types/quiz";
import de from "./locales/de.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import it from "./locales/it.json";

export const supportedLocales = ["de", "en", "fr", "es", "it"] as const;

export type AppLocale = (typeof supportedLocales)[number];

export const localeNames: Record<AppLocale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  es: "Español",
  it: "Italiano",
};

export const localeFlags: Record<AppLocale, string> = {
  de: "assets/img/flags/german.png",
  en: "assets/img/flags/englishflag.jpg",
  fr: "assets/img/flags/franceflag.gif",
  es: "assets/img/flags/spanish.png",
	it: "assets/img/flags/italianflag.svg",
};

function isSupported(value: string | null): value is AppLocale {
  return value !== null && (supportedLocales as readonly string[]).includes(value);
}

export function readStoredLocale(): AppLocale {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("locale");
    if (isSupported(saved)) return saved;
  }
  return "de";
}

// Die Sprache aus der Adresse lesen: "...?lang=en" (bzw. "?lang=fr"). Die
// Schreibweise wird vereinheitlicht; unbekannte oder fehlende Werte ergeben
// null, damit dann die gemerkte Sprache gilt.
export function readLocaleFromUrl(search?: string): AppLocale | null {
  if (typeof window === "undefined" && search === undefined) return null;
  const query = search ?? window.location.search;
  const value = new URLSearchParams(query).get("lang");
  if (value === null) return null;
  const klein = value.toLowerCase();
  return isSupported(klein) ? klein : null;
}

// Die Startsprache: Ein "?lang=" in der Adresse hat Vorrang vor der gemerkten
// Sprache. So fuehrt ein geteilter Link "...?lang=en" direkt zur englischen
// Seite, ansonsten zaehlt die zuletzt gewaehlte Sprache.
export function resolveInitialLocale(): AppLocale {
  return readLocaleFromUrl() ?? readStoredLocale();
}

// Die Uebersetzungen enthalten HTML und LaTeX (z.B. \frac{1}{2} oder
// \text{Euro}). vue-i18n wuerde geschweifte Klammern als Platzhalter deuten und
// die Nachricht gar nicht mehr uebersetzen. Im Produktions-Build wirft der
// Standard-Compiler dabei sogar einen Fehler, wodurch ganze Abschnitte
// verschwinden. Da im Projekt keine Platzhalter, Plurale oder Linked-Messages
// verwendet werden, geben wir die Nachricht unveraendert zurueck.
export const literalMessageCompiler: MessageCompiler = (message) => () => {
  return typeof message === "string" ? message : "";
};

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false,
  messageCompiler: literalMessageCompiler,
  locale: resolveInitialLocale(),
  fallbackLocale: "de",
  messages: { de, en, fr, es, it },
});

// Schreibt die gewaehlte Sprache in die Adresse zurueck, ohne einen neuen
// Verlaufseintrag anzulegen (replaceState). Die Standardsprache "de" wird
// weggelassen, damit die Adressen kurz bleiben.
export function syncLocaleToUrl(locale: AppLocale): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (locale === "de") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", locale);
  }
  const neu = url.pathname + url.search + url.hash;
  const jetzt = window.location.pathname + window.location.search + window.location.hash;
  if (neu !== jetzt) {
    window.history.replaceState(window.history.state, "", neu);
  }
}

export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  try {
    localStorage.setItem("locale", locale);
  } catch {
    // localStorage kann z.B. in Privatmodi blockiert sein - dann eben ohne Merken.
  }
  syncLocaleToUrl(locale);
}

export function quizLanguage(quiz: string | undefined, userLocale: string): Lang {
  const map: Record<string, Lang> = {
    french: "fr",
    english: "en",
    deutsch: "de",
    italiano: "it",
    espagnol: "es",
  };
  if (quiz && map[quiz]) return map[quiz];
  const isSupportedLocale = (v: string | null): v is AppLocale =>
    v !== null && (supportedLocales as readonly string[]).includes(v);
  return isSupportedLocale(userLocale) ? userLocale : "de";
}
