import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Exercise, Topic } from "@/types/quiz";
import VueImage from "./VueImage.vue";
import VueNewExercise, { bildUrl, uploadPastedImage } from "./VueNewExercise.vue";

// Das Formular laedt beim Anlegen die Themen des Faches. Ohne diesen Handler
// wuerde MSW die Anfrage als unerwartet melden.
beforeEach(() => {
  server.use(http.get(`${API_URL}/api/topic/english`, () => HttpResponse.json([])));
});

async function mountForm() {
  const wrapper = mount(VueNewExercise, {
    props: { quiz: "english", editMode: false },
    shallow: true,
  });
  await flushPromises();
  return wrapper;
}

describe("VueNewExercise: benutzerdefiniertes Bild", () => {
  it("uebernimmt eine eingetippte URL als Bild der Aufgabe", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#imageUrlInput").setValue("https://example.com/cat.png");
    const knopf = wrapper
      .findAll("button")
      .find((b) => b.text() === "Get image");
    expect(knopf).toBeTruthy();
    await knopf!.trigger("click");

    expect(wrapper.findComponent(VueImage).props("imageUrl")).toBe(
      "https://example.com/cat.png",
    );
  });

  it("schickt ein eingefuegtes Bild zum Server und nimmt die Antwort-URL", async () => {
    let gesendeteDatenUrl = "";
    server.use(
      http.post(`${API_URL}/api/image`, async ({ request }) => {
        const body = (await request.json()) as { dataUrl: string };
        gesendeteDatenUrl = body.dataUrl;
        return HttpResponse.json(
          { id: "abc", url: "/api/image/abc", remaining: 1 },
          { status: 201 },
        );
      }),
    );

    const datei = new File([new Uint8Array([137, 80, 78, 71])], "cat.png", {
      type: "image/png",
    });
    const url = await uploadPastedImage(datei);

    expect(gesendeteDatenUrl.startsWith("data:image/png;base64,")).toBe(true);
    expect(url).toBe(`${API_URL}/api/image/abc`);
  });

  it("laesst fremde absolute URLs unveraendert", async () => {
    server.use(
      http.post(`${API_URL}/api/image`, () =>
        HttpResponse.json(
          { id: "abc", url: "https://cdn.example.com/abc.png", remaining: 1 },
          { status: 201 },
        ),
      ),
    );

    const datei = new File([new Uint8Array([1, 2, 3])], "cat.png", {
      type: "image/png",
    });
    expect(await uploadPastedImage(datei)).toBe(
      "https://cdn.example.com/abc.png",
    );
  });

  it("laedt Server-Bilder ueber API_URL, auch bei http-Antwort", () => {
    expect(bildUrl("/api/image/abc")).toBe(`${API_URL}/api/image/abc`);
    expect(bildUrl("http://14ofbe9.cserverhost.cloud/api/image/abc")).toBe(
      `${API_URL}/api/image/abc`,
    );
    expect(bildUrl("https://example.com/x.jpg")).toBe(
      "https://example.com/x.jpg",
    );
  });
});

describe("VueNewExercise: multiple choice anlegen", () => {
  it("speichert nur die erste Option als richtig", async () => {
    const wrapper = await mountForm();

    const typSelect = wrapper.findAll("select")[0];
    await typSelect.setValue("multipleChoice");

    const optionsBox = wrapper.findAll("div.mb-3.mt-3")[1];
    const optionInput = optionsBox.find('input[type="text"]');
    const addButton = optionsBox
      .findAll("button")
      .find((b) => b.text().trim() === "Add");

    const optionen = ["Haus", "Maus", "Hose"];
    for (const o of optionen) {
      await optionInput.setValue(o);
      await addButton!.trigger("click");
    }

    const save = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save");
    await save!.trigger("click");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.options).toEqual([
      { option: "Haus", correct: true },
      { option: "Maus", correct: false },
      { option: "Hose", correct: false },
    ]);
  });

  it("speichert keine Multiple-Choice-Aufgabe ohne Optionen", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = await mountForm();

    const typSelect = wrapper.findAll("select")[0];
    await typSelect.setValue("multipleChoice");

    const save = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save");
    await save!.trigger("click");

    expect(alertSpy).toHaveBeenCalled();
    expect(wrapper.emitted("new-exercise-created")).toBeFalsy();
    alertSpy.mockRestore();
  });
});

describe("VueNewExercise: Themen-Baum als Menue", () => {
  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/topic/english`, () =>
        HttpResponse.json<Topic[]>([
          {
            _id: "et",
            subject: "english",
            title: "Elektrotechnik",
            tutorial: "",
            school: "Uni Aachen",
          },
          {
            _id: "dio",
            subject: "english",
            title: "Dioden",
            tutorial: "",
            parentId: "et",
          },
        ]),
      ),
    );
  });

  function baumOffen(wrapper: ReturnType<typeof mount>): boolean {
    const style = wrapper.get(".topic-tree-overlay").attributes("style") ?? "";
    return !style.includes("display: none");
  }

  it("zeigt den Baum erst nach Klick und uebernimmt das gewaehlte Thema", async () => {
    // Hier wird der echte (nicht gestubbte) Baum gebraucht.
    const wrapper = mount(VueNewExercise, {
      props: { quiz: "english", editMode: false },
    });
    await flushPromises();

    const knopf = wrapper.get(".topic-picker > button");
    expect(knopf.text()).toContain("Choose a topic");
    expect(baumOffen(wrapper)).toBe(false);

    await knopf.trigger("click");
    expect(baumOffen(wrapper)).toBe(true);

    const knoten = wrapper
      .findAll(".p-treenode-content")
      .find((n) => n.text().includes("Elektrotechnik"));
    expect(knoten).toBeTruthy();
    await knoten!.trigger("click");
    await flushPromises();

    // Das Menue ist zu, der Knopf zeigt "Schule - Pfad" und die Schule des
    // aeltesten Vorfahren ist im "New topic"-Feld eingetragen (deaktiviert).
    expect(baumOffen(wrapper)).toBe(false);
    expect(knopf.text()).toContain("Uni Aachen - Elektrotechnik");

    const schulFeld = wrapper.get("#newTopicSchool").element as HTMLInputElement;
    expect(schulFeld.disabled).toBe(true);
    expect(schulFeld.value).toBe("Uni Aachen");
  });
});
