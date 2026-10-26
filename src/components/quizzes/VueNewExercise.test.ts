import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Exercise, Topic } from "@/types/quiz";
import OTopicChooserAndCreator from "@/components/organisms/OTopicChooserAndCreator.vue";
import OImageChooserAndDisplayer from "@/components/organisms/OImageChooserAndDisplayer.vue";
import OSchoolChooserAndCreator from "@/components/organisms/OSchoolChooserAndCreator.vue";
import VueNewExercise from "./VueNewExercise.vue";
import { bildUrl, uploadPastedImage } from "@/utils/images";

// Das Formular laedt beim Anlegen die Themen des Faches. Ohne diesen Handler
// wuerde MSW die Anfrage als unerwartet melden.
beforeEach(() => {
  server.use(http.get(`${API_URL}/api/topic/english`, () => HttpResponse.json([])));
});

async function mountForm() {
  const wrapper = mount(VueNewExercise, {
    props: { quiz: "english", editMode: false },
    shallow: true,
    // Beim shallow mount rendern die Splitter-Stubs ihre Slots nicht
    // automatisch; ohne dies waeren die Kinder der Panels unsichtbar.
    global: { renderStubDefaultSlot: true },
  });
  await flushPromises();
  return wrapper;
}

describe("VueNewExercise: benutzerdefiniertes Bild", () => {
  it("zeigt den Bildwaehler und uebernimmt eine gemeldete Bildadresse", async () => {
    const wrapper = await mountForm();

    const waehler = wrapper.findComponent(OImageChooserAndDisplayer);
    expect(waehler.exists()).toBe(true);

    waehler.vm.$emit("update:modelValue", "https://example.com/cat.png");
    await flushPromises();

    expect(
      wrapper.findComponent(OImageChooserAndDisplayer).props("modelValue"),
    ).toBe("https://example.com/cat.png");
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

    // Save ist jetzt der submit-Knopf des Formulars; in jsdom loest ein
    // Klick auf type="submit" keinen submit-Event aus, deshalb direkt
    // submit ausloesen.
    await wrapper.find("form").trigger("submit");

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

    // Ohne Optionen sollte ein Klick auf Save (jetzt submit) alerten und nichts emitten.
    await wrapper.find("form").trigger("submit");

    expect(alertSpy).toHaveBeenCalled();
    expect(wrapper.emitted("new-exercise-created")).toBeFalsy();
    alertSpy.mockRestore();
  });
});

describe("VueNewExercise: Thema ueber den Themenwaehler", () => {
  it("uebernimmt das gemeldete Thema in die Aufgabe", async () => {
    const wrapper = mount(VueNewExercise, {
      props: { quiz: "english", editMode: false },
      shallow: true,
    });
    await flushPromises();

    const waehler = wrapper.findComponent(OTopicChooserAndCreator);
    expect(waehler.exists()).toBe(true);
    // Der Waehler bekommt Fach und Quiz des Formulars.
    expect(waehler.props("subject")).toBe("english");
    expect(waehler.props("quiz")).toBe("english");

    const thema: Topic = {
      _id: "et",
      subject: "english",
      title: "Elektrotechnik",
      tutorial: "",
    };
    waehler.vm.$emit("topic-selected", thema);
    await flushPromises();

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as Exercise).topic).toEqual(thema);
  });

  it("meldet ein neu angelegtes Thema weiter und macht es zum Thema der Aufgabe", async () => {
    const wrapper = mount(VueNewExercise, {
      props: { quiz: "english", editMode: false },
      shallow: true,
    });
    await flushPromises();

    const thema: Topic = {
      _id: "neu",
      subject: "english",
      title: "Dioden",
      tutorial: "",
    };
    wrapper.findComponent(OTopicChooserAndCreator).vm.$emit("topic-created", thema);
    await flushPromises();

    expect(wrapper.emitted("topic-created")?.[0][0]).toEqual(thema);

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as Exercise).topic).toEqual(thema);
  });
});

describe("VueNewExercise: Vorbelegung beim Anlegen", () => {
  const thema: Topic = {
    _id: "t1",
    subject: "english",
    title: "Elektrotechnik",
    tutorial: "",
  };
  const schule = { _id: "s1", name: "Hochschule Regensburg" };

  function mountMitVorlage(vorlage: Exercise, schools: { _id: string; name: string }[] = []) {
    return mount(VueNewExercise, {
      props: {
        quiz: "english",
        editMode: false,
        questionOfQuiz: vorlage,
        schools,
      },
      shallow: true,
      global: { renderStubDefaultSlot: true },
    });
  }

  it("waehlt Thema und Schule der aktuellen Aufgabe vor", async () => {
    const wrapper = mountMitVorlage(
      {
        _id: "ex1",
        quiz: "english",
				type: "gapText",
				questionOrInstruction: "Fill",
				gapText: "a {b|c} d",
				imageUrl: "img.jpg",
				topic: "t1",
				school: { _id: "s1", name: "S1" },
			},
      [schule],
    );
    await flushPromises();

    expect(
      wrapper.findComponent(OTopicChooserAndCreator).props("modelValue"),
    ).toBe("t1");
    expect(
      wrapper.findComponent(OSchoolChooserAndCreator).props("modelValue"),
    ).toBe("s1");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect((emitted![0][0] as Exercise).topic).toEqual(thema);
    expect((emitted![0][0] as Exercise).school).toBe("s1");
  });

  it("kommt auch mit _ids als Strings zurecht", async () => {
    const wrapper = mountMitVorlage({
      _id: "ex2",
      quiz: "english",
      type: "gapText",
      questionOrInstruction: "Fill the gap",
      gapText: "a {b} c",
      imageUrl: "img.jpg",
      topic: "t1",
      school: "s1",
    });
    await flushPromises();

    expect(
      wrapper.findComponent(OTopicChooserAndCreator).props("modelValue"),
    ).toBe("t1");
    expect(
      wrapper.findComponent(OSchoolChooserAndCreator).props("modelValue"),
    ).toBe("s1");
  });

  it("nimmt die Schule der aktuellen Aufgabe in die Schulliste auf", async () => {
    const wrapper = mountMitVorlage({
      _id: "ex3",
      quiz: "english",
      type: "gapText",
      questionOrInstruction: "Fill the gap",
      gapText: "a {b} c",
      imageUrl: "img.jpg",
      school: schule,
    });
    await flushPromises();

    expect(
      wrapper.findComponent(OSchoolChooserAndCreator).props("schools"),
    ).toEqual([schule]);
  });
});

describe("VueNewExercise: Schule der Aufgabe", () => {
  const schule = { _id: "s1", name: "Hochschule Regensburg" };

  it("uebernimmt die im Schullaender gewaehlte Schule in die Aufgabe", async () => {
    const wrapper = await mountForm();

    const waehler = wrapper.findComponent(OSchoolChooserAndCreator);
    expect(waehler.exists()).toBe(true);

    waehler.vm.$emit("update:modelValue", "s1");
    await flushPromises();

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as Exercise).school).toBe("s1");
  });

  it("meldet eine neu angelegte Schule ans Quiz weiter", async () => {
    const wrapper = await mountForm();

    wrapper.findComponent(OSchoolChooserAndCreator).vm.$emit("school-created", schule);
    await flushPromises();

    expect(wrapper.emitted("school-created")?.[0][0]).toEqual(schule);
  });

  it("speichert keine Schule, wenn keine gewaehlt wurde", async () => {
    const wrapper = await mountForm();

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as Exercise).school).toBeUndefined();
  });
});

describe("VueNewExercise: Save als Default-Knopf", () => {
  it("Save ist der submit-Knopf des Formulars und beide Knopfe tragen ein Icon", async () => {
    const wrapper = await mountForm();

    const form = wrapper.get("form");
    const knoepfe = form.findAll("button");
    const save = knoepfe.find((b) => b.text().trim() === "Save")!;
    const cancel = knoepfe.find((b) => b.text().trim() === "Cancel")!;

    expect(save.attributes("type")).toBe("submit");
    expect(save.find("i.bi-save").exists()).toBe(true);
    expect(cancel.attributes("type")).toBe("button");
    expect(cancel.find("i.bi-x-lg").exists()).toBe(true);

    // Die Textfelder gehoeren zum Formular: Enter in ihnen loest Save aus.
    expect(form.find("#exercise-type").exists()).toBe(true);
    expect(form.findAll('input[type="text"]').length).toBeGreaterThan(0);
  });
});
