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

    const typSelect = wrapper.get("#exercise-type");
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

    const typSelect = wrapper.get("#exercise-type");
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

    // Das Menue ist zu und der Knopf zeigt den Pfad des gewaehlten Themas.
    expect(baumOffen(wrapper)).toBe(false);
    expect(knopf.text()).toContain("Elektrotechnik");

    // Die Schule steht nicht mehr am Thema, sondern in der eigenen Auswahl.
    expect(wrapper.find("#newTopicSchool").exists()).toBe(false);
    expect(wrapper.find("#exerciseSchool").exists()).toBe(true);
  });
});

describe("VueNewExercise: Schule der Aufgabe", () => {
  const schulen = [
    { _id: "s1", name: "Hochschule Regensburg" },
    { _id: "s2", name: "LMU Muenchen" },
  ];

  it("waehlt eine vorhandene Schule aus und speichert deren _id", async () => {
    const wrapper = mount(VueNewExercise, {
      props: { quiz: "english", editMode: false, schools: schulen },
      shallow: true,
    });
    await flushPromises();

    const auswahl = wrapper.get("#exerciseSchool");
    expect(auswahl.findAll("option").map((o) => o.text())).toEqual([
      "No school",
      "Hochschule Regensburg",
      "LMU Muenchen",
    ]);

    await auswahl.setValue("s2");
    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save")!
      .trigger("click");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as Exercise).school).toBe("s2");
  });

  it("legt mit 'Add' eine neue Schule an, waehlt sie aus und meldet sie", async () => {
    const wrapper = mount(VueNewExercise, {
      props: { quiz: "english", editMode: false, schools: [] },
      shallow: true,
    });
    await flushPromises();

    await wrapper.get("#newSchoolName").setValue("Uni Aachen");
    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Add")!
      .trigger("click");
    await flushPromises();

    // Die neue Schule wurde gemeldet und ist ausgewaehlt.
    const gemeldet = wrapper.emitted("school-created");
    expect(gemeldet).toBeTruthy();
    expect(gemeldet![0][0]).toEqual({ _id: "mocked-school-id", name: "Uni Aachen" });
    expect(
      (wrapper.get("#exerciseSchool").element as HTMLSelectElement).value,
    ).toBe("mocked-school-id");

    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save")!
      .trigger("click");
    const emitted = wrapper.emitted("new-exercise-created");
    expect((emitted![0][0] as Exercise).school).toBe("mocked-school-id");
  });

  it("legt ohne Namen im Feld 'New school' nichts an", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(VueNewExercise, {
      props: { quiz: "english", editMode: false, schools: [] },
      shallow: true,
    });
    await flushPromises();

    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Add")!
      .trigger("click");
    await flushPromises();

    expect(alertSpy).toHaveBeenCalled();
    expect(wrapper.emitted("school-created")).toBeFalsy();
    alertSpy.mockRestore();
  });
});
