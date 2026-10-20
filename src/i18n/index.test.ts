import { afterEach, describe, expect, it } from "vitest";
import {
  i18n,
  literalMessageCompiler,
  readLocaleFromUrl,
  resolveInitialLocale,
  syncLocaleToUrl,
  supportedLocales,
} from "./index";
import de from "./locales/de.json";

// Kleine Helfer, um die Adresse der jsdom-Umgebung zu setzen und wieder
// aufzuraeumen.
function setzeAdresse(search: string, hash = ""): void {
  window.history.replaceState({}, "", `${window.location.pathname}${search}${hash}`);
}

afterEach(() => {
  window.localStorage.clear();
  setzeAdresse("", "");
});

describe("i18n: Sprache aus der Adresse lesen", () => {
  it("liest ?lang=en und ?lang=fr", () => {
    expect(readLocaleFromUrl("?lang=en")).toBe("en");
    expect(readLocaleFromUrl("?lang=fr")).toBe("fr");
  });

  it("achtet nicht auf Gross-/Kleinschreibung", () => {
    expect(readLocaleFromUrl("?lang=EN")).toBe("en");
    expect(readLocaleFromUrl("?lang=Fr")).toBe("fr");
  });

  it("ignoriert unbekannte oder fehlende Werte", () => {
    expect(readLocaleFromUrl("?lang=xx")).toBeNull();
    expect(readLocaleFromUrl("?other=1")).toBeNull();
    expect(readLocaleFromUrl("")).toBeNull();
  });

  it("erlaubt alle unterstuetzten Sprachen", () => {
    for (const code of supportedLocales) {
      expect(readLocaleFromUrl(`?lang=${code}`)).toBe(code);
    }
  });
});

describe("i18n: Startsprache bestimmen", () => {
  it("bevorzugt ?lang= vor der gemerkten Sprache", () => {
    window.localStorage.setItem("locale", "it");
    setzeAdresse("?lang=en");
    expect(resolveInitialLocale()).toBe("en");
  });

  it("nimmt die gemerkte Sprache, wenn die Adresse nichts vorgibt", () => {
    window.localStorage.setItem("locale", "es");
    setzeAdresse("");
    expect(resolveInitialLocale()).toBe("es");
  });

  it("faellt auf Deutsch zurueck, wenn weder Adresse noch Speicher etwas sagen", () => {
    setzeAdresse("");
    expect(resolveInitialLocale()).toBe("de");
  });

  it("ignoriert einen unbekannten Wert in der Adresse und nimmt die gemerkte Sprache", () => {
    window.localStorage.setItem("locale", "fr");
    setzeAdresse("?lang=xx");
    expect(resolveInitialLocale()).toBe("fr");
  });
});

describe("i18n: Sprache in die Adresse zurueckschreiben", () => {
  it("setzt lang=<code> fuer eine nicht-Standard-Sprache", () => {
    setzeAdresse("");
    syncLocaleToUrl("fr");
    expect(window.location.search).toBe("?lang=fr");
  });

  it("laesst die Standardsprache de weg", () => {
    setzeAdresse("?lang=fr");
    syncLocaleToUrl("de");
    expect(window.location.search).toBe("");
  });

  it("behaelt Pfad und Anker bei", () => {
    setzeAdresse("", "#franzoesisch?topic=Verbes%20reflechi");
    syncLocaleToUrl("en");
    expect(window.location.search).toBe("?lang=en");
    expect(window.location.hash).toBe("#franzoesisch?topic=Verbes%20reflechi");
  });

  it("aktualisiert einen bereits vorhandenen lang-Parameter", () => {
    setzeAdresse("?lang=en");
    syncLocaleToUrl("it");
    expect(window.location.search).toBe("?lang=it");
  });
});

describe("i18n: LaTeX und HTML in Nachrichten", () => {
  it("gibt Nachrichten mit geschweiften Klammern unveraendert zurueck", () => {
    const text = "$\\frac{1}{2}$ und $\\text{Euro}$";
    expect(literalMessageCompiler(text, {} as never)("" as never)).toBe(text);
  });

  it("liefert den Preise-Abschnitt inklusive LaTeX unveraendert", () => {
    expect(i18n.global.t("sections.preise.body")).toBe(de.sections.preise.body);
  });

  it("liefert die Preisformel inklusive LaTeX unveraendert", () => {
    expect(i18n.global.t("contract.priceFormula")).toBe(de.contract.priceFormula);
  });
});
