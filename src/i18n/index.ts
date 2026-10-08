import { createI18n } from "vue-i18n";
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

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false,
  locale: readStoredLocale(),
  fallbackLocale: "de",
  messages: { de, en, fr, es, it },
});

export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  try {
    localStorage.setItem("locale", locale);
  } catch {
    // localStorage kann z.B. in Privatmodi blockiert sein - dann eben ohne Merken.
  }
}

export function quizLang(value: string): "de" | "en" | "fr" {
  return value === "en" || value === "fr" ? value : "de";
}
