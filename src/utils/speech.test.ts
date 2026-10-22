import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { spreche, sprachausgabeMoeglich, stoppeSprechen } from "./speech";

// jsdom kann nicht sprechen, deshalb wird die Web-Speech-API nachgebaut.
class UtteranceMock {
  text: string;
  lang = "";
  voice: SpeechSynthesisVoice | null = null;
  constructor(text = "") {
    this.text = text;
  }
}

const speak = vi.fn();
const cancel = vi.fn();
const getVoices = vi.fn((): SpeechSynthesisVoice[] => []);
const addEventListener = vi.fn();

function stimulus(name: string, lang: string): SpeechSynthesisVoice {
  return { name, lang, default: false, localService: true, voiceURI: name } as SpeechSynthesisVoice;
}

function apiInstallieren(stimmen: SpeechSynthesisVoice[] = []): void {
  getVoices.mockImplementation(() => stimmen);
  Object.defineProperty(window, "SpeechSynthesisUtterance", {
    value: UtteranceMock,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, "speechSynthesis", {
    value: { speak, cancel, getVoices, addEventListener },
    writable: true,
    configurable: true,
  });
}

function apiEntfernen(): void {
  Object.defineProperty(window, "speechSynthesis", {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

describe("spreche", () => {
  beforeEach(() => {
    speak.mockClear();
    cancel.mockClear();
    getVoices.mockClear();
    addEventListener.mockClear();
    apiInstallieren();
  });

  afterEach(() => {
    apiEntfernen();
  });

  it("spricht den Text in der Sprache der Aufgabe", () => {
    spreche("crayon", "fr");
    expect(speak).toHaveBeenCalledTimes(1);
    const utterance = speak.mock.calls[0][0] as UtteranceMock;
    expect(utterance.text).toBe("crayon");
    expect(utterance.lang).toBe("fr-FR");
  });

  it("spricht einen deutschen Text mit dem Sprachcode de-DE", () => {
    spreche("Bleistift", "de");
    const utterance = speak.mock.calls[0][0] as UtteranceMock;
    expect(utterance.lang).toBe("de-DE");
  });

  it("waehlt eine passende Stimme aus", () => {
    apiInstallieren([stimulus("Anna", "de-DE"), stimulus("Amelie", "fr-FR")]);
    spreche("crayon", "fr");
    const utterance = speak.mock.calls[0][0] as UtteranceMock;
    expect(utterance.voice?.name).toBe("Amelie");
    expect(utterance.lang).toBe("fr-FR");
  });

  it("nimmt auch eine Stimme mit anderem Laendercode", () => {
    apiInstallieren([stimulus("Amelie", "fr-CA")]);
    spreche("crayon", "fr");
    const utterance = speak.mock.calls[0][0] as UtteranceMock;
    expect(utterance.voice?.name).toBe("Amelie");
    expect(utterance.lang).toBe("fr-CA");
  });

  it("entfernt HTML-Tags und Entities aus dem Text", () => {
    spreche("<strong>crayon</strong>&nbsp;rouge", "fr");
    const utterance = speak.mock.calls[0][0] as UtteranceMock;
    expect(utterance.text).toBe("crayon rouge");
  });

  it("spricht keinen leeren Text", () => {
    spreche("   ", "fr");
    expect(speak).not.toHaveBeenCalled();
  });

  it("bricht eine laufende Ausgabe ab, bevor der neue Text gesprochen wird", () => {
    spreche("crayon", "fr");
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("tut nichts, wenn der Browser nicht sprechen kann", () => {
    apiEntfernen();
    expect(sprachausgabeMoeglich()).toBe(false);
    expect(() => spreche("crayon", "fr")).not.toThrow();
    expect(speak).not.toHaveBeenCalled();
  });
});

describe("stoppeSprechen", () => {
  beforeEach(() => {
    cancel.mockClear();
    apiInstallieren();
  });

  afterEach(() => {
    apiEntfernen();
  });

  it("bricht die Ausgabe ab", () => {
    stoppeSprechen();
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("tut nichts, wenn der Browser nicht sprechen kann", () => {
    apiEntfernen();
    expect(() => stoppeSprechen()).not.toThrow();
    expect(cancel).not.toHaveBeenCalled();
  });
});
