import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Exercise, Topic } from "@/types/quiz";
import VueExportToFacile from "./VueExportToFacile.vue";

// Das Modal von Bootstrap braucht einen echten Browser (Transitions, Fokus).
// Fuer den Test genuegt ein Platzhalter, der nichts tut.
vi.mock("bootstrap", () => ({
  Modal: {
    getOrCreateInstance: () => ({ show: () => {}, hide: () => {}, dispose: () => {} }),
  },
}));

const THEMA: Topic = {
  _id: "top1",
  subject: "italiano",
  title: "Congiunzioni",
  tutorial: "",
};

// Eine multiple-choice-Aufgabe, deren Frage eine Luecke (drei Unterstriche)
// enthaelt, wie im Beispiel der Export-Anleitung.
const AUFGABE: Exercise = {
  _id: "e1",
  quiz: "italiano",
  type: "multipleChoice",
  imageUrl: "",
  topic: "top1",
  instruction: "Scegli la congiunzione giusta!",
  question: "Non è triste. ___, è molto felice del regalo.",
  options: [
    { option: "anzi", correct: true },
    { option: "quindi", correct: false },
    { option: "sebbene", correct: false },
  ],
};

const FRAGE = "q = Non è triste. *, è molto felice del regalo.";

async function mountExport() {
  const pinia = createPinia();
  setActivePinia(pinia);
  const wrapper = mount(VueExportToFacile, {
    props: { quiz: "italiano", topic: THEMA, lg: "en" },
    global: { plugins: [pinia], stubs: { teleport: true } },
    shallow: true,
  });
  await flushPromises();
  return wrapper;
}

describe("VueExportToFacile: multipleChoice mit Luecke in der Frage", () => {
  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([AUFGABE])),
    );
  });

  it("ersetzt die Luecke durch einen Stern und listet bei 1.2 alle Optionen", async () => {
    const wrapper = await mountExport();

    await wrapper.get("#uebungstyp-optionsDifferents").setValue(true);
    await flushPromises();

    expect(wrapper.text()).toContain(FRAGE);
    expect(wrapper.text()).toContain("r = anzi|quindi|sebbene");
  });

  it("nimmt bei 1.3 (mêmes options) nur die richtige Antwort", async () => {
    const wrapper = await mountExport();

    await wrapper.get("#uebungstyp-optionsGleich").setValue(true);
    await flushPromises();

    expect(wrapper.text()).toContain(FRAGE);
    expect(wrapper.text()).toContain("r = anzi");
    expect(wrapper.text()).not.toContain("r = anzi|quindi|sebbene");
  });
});
