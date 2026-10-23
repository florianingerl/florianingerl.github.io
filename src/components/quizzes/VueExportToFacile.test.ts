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
  questionOrInstruction: "Non è triste. ___, è molto felice del regalo.",
  options: [
    { option: "anzi", correct: true },
    { option: "quindi", correct: false },
    { option: "sebbene", correct: false },
  ],
};

const FRAGE = "q = Non è triste. *, è molto felice del regalo.";

function aufgabenAnzahl(anzahl: number): Exercise[] {
  return Array.from({ length: anzahl }, (_, index) => ({
    ...AUFGABE,
    _id: `e${index + 1}`,
    questionOrInstruction: `Frage ${index + 1}. ___`,
  }));
}

async function mountExport(topic: Topic = THEMA) {
  const pinia = createPinia();
  setActivePinia(pinia);
  const wrapper = mount(VueExportToFacile, {
    props: { quiz: "italiano", topic, lg: "en" },
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

describe("VueExportToFacile: Anzahl der exportierten Aufgaben", () => {
  let body = "";

  beforeEach(() => {
    body = "";
    server.use(
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json(aufgabenAnzahl(12)),
      ),
      http.post(`${API_URL}/api/exportfacile`, async ({ request }) => {
        body = await request.text();
        return HttpResponse.json({ ok: true, gespeichert: true });
      }),
    );
  });

  async function exportiere(
    wrapper: Awaited<ReturnType<typeof mountExport>>,
  ): Promise<void> {
    await wrapper.get("#uebungstyp-optionsDifferents").setValue(true);
    await flushPromises();
    await wrapper.get("#exportTestId").setValue("123456");
    await wrapper.get("#exportCookie").setValue("auteur_cookies=flori10");
    await wrapper.get(".modal-footer .btn-primary").trigger("click");
    await vi.waitFor(() => expect(body).not.toBe(""));
  }

  it("exportiert typografische Apostrophe als ASCII", async () => {
    const wrapper = await mountExport({
      ...THEMA,
      tutorial: "<p>It\u2019s usually neutral.</p>",
    });

    await exportiere(wrapper);

    expect(body).toContain("It%27s");
    expect(body).not.toContain("%E2%80%99");
    expect(new URLSearchParams(body).get("message_textarea")).toBe(
      "<p>It's usually neutral.</p>",
    );
  });

  it("exportiert mehr als zehn ausgewaehlte Aufgaben vollstaendig", async () => {
    const wrapper = await mountExport();

    await exportiere(wrapper);

    const params = new URLSearchParams(body);
    expect(params.get("mychoice")).toBe("12");
    expect(params.get("q10")).toContain("Frage 10");
    expect(params.get("q11")).toContain("Frage 11");
    expect(params.get("q12")).toContain("Frage 12");
    expect(wrapper.text()).toContain("12 Fragen");
  });

  it("fuellt weniger als zehn Aufgaben weiterhin auf zehn auf", async () => {
    server.use(
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json(aufgabenAnzahl(3)),
      ),
    );
    const wrapper = await mountExport();

    await exportiere(wrapper);

    const params = new URLSearchParams(body);
    expect(params.get("mychoice")).toBe("10");
    expect(params.get("q10")).toContain("Frage 3");
    expect(params.get("q11")).toBeNull();
  });
});
