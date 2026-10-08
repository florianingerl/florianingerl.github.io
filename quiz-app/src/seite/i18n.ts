import { createI18n } from "vue-i18n";
import type { Nachrichten } from "./sprachen";

// Damit t("kontakt.adresse") in den Bausteinen die Schlüssel der Nachrichten kennt
declare module "vue-i18n" {
  export interface DefineLocaleMessage extends Nachrichten {}
}

// Die Nachrichten kommen erst mit der jeweiligen Sprachdatei dazu (siehe sprache.ts)
export const i18n = createI18n({
  legacy: false,
  locale: "de",
  fallbackLocale: "de",
  messages: {},
});
