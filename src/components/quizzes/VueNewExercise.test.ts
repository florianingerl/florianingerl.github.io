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

  it("waehlt eine neu angelegte Option aus, sodass sie nach oben verschoben werden kann", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("multipleChoice");

    const optionsBox = wrapper
      .findAll("div.mb-3.mt-3")
      .find((d) => d.text().includes("New option"))!;
    const optionInput = optionsBox.find('input[type="text"]');
    const addButton = optionsBox
      .findAll("button")
      .find((b) => b.text().trim() === "Add")!;

    for (const option of ["Haus", "Maus"]) {
      await optionInput.setValue(option);
      await addButton.trigger("click");
    }

    const listeneintraege = wrapper.findAll("li.list-group-item");
    expect(listeneintraege).toHaveLength(2);
    // Die zuletzt hinzugefuegte Option ist ausgewaehlt.
    expect(listeneintraege[1].classes()).toContain("active");

    const upButton = wrapper
      .findAll("button")
      .find((b) => b.find("i.bi-arrow-up").exists())!;
    await upButton.trigger("click");

    expect(wrapper.findAll("li.list-group-item")[0].text()).toContain("Maus");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as Exercise).options).toEqual([
      { option: "Maus", correct: true },
      { option: "Haus", correct: false },
    ]);
  });
});

describe("VueNewExercise: Multiple-Choice-Aufgabe bearbeiten", () => {
  it("zeigt die Optionen in der Reihenfolge aus der Datenbank", async () => {
    const vorlage: Exercise = {
      _id: "mc1",
      quiz: "english",
      type: "multipleChoice",
      questionOrInstruction: "Choose the right word",
      imageUrl: "",
      options: [
        { option: "A", correct: true },
        { option: "B", correct: false },
        { option: "C", correct: false },
      ],
    };
    const wrapper = mount(VueNewExercise, {
      props: {
        quiz: "english",
        editMode: true,
        questionOfQuiz: vorlage,
      },
      shallow: true,
      global: { renderStubDefaultSlot: true },
    });
    await flushPromises();

    const texte = wrapper
      .findAll("li.list-group-item")
      .map((li) => li.text());
    expect(texte[0]).toContain("A");
    expect(texte[1]).toContain("B");
    expect(texte[2]).toContain("C");
  });
});

describe("VueNewExercise: programming exercise", () => {
  it("saves the language, solution and testcases expression", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("TypeScript");
    await wrapper
      .get("#programming-solution")
      .setValue("function add(a: number, b: number): number { return a + b; }");

    await wrapper
      .get("#programming-testcases")
      .setValue("add(2, 3) == 5 && add(-1, 1) == 0");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.type).toBe("programming");
    expect(ex.programminglanguage).toBe("TypeScript");
    expect(ex.function).toBe(
      "function add(a: number, b: number): number { return a + b; }",
    );
    expect(ex.testcases).toBe("add(2, 3) == 5 && add(-1, 1) == 0");
  });

  it("saves a Python function and its test expression", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Python");
    await wrapper
      .get("#programming-solution")
      .setValue("def add(a, b):\n    # return a + b");
    await wrapper
      .get("#programming-testcases")
      .setValue("add(2, 3) == 5 and add(-1, 1) == 0");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.type).toBe("programming");
    expect(ex.programminglanguage).toBe("Python");
    expect(ex.function).toBe("def add(a, b):\n    # return a + b");
    expect(ex.testcases).toBe("add(2, 3) == 5 and add(-1, 1) == 0");
  });

  it("saves a Lean 4 definition and its test declarations", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Lean 4");
    await wrapper
      .get("#programming-solution")
      .setValue("def double (x : Nat) : Nat := x + x");
    await wrapper
      .get("#programming-testcases")
      .setValue("example : double 7 = 14 := rfl");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.type).toBe("programming");
    expect(ex.programminglanguage).toBe("Lean 4");
    expect(ex.function).toBe("def double (x : Nat) : Nat := x + x");
    expect(ex.testcases).toBe("example : double 7 = 14 := rfl");
  });

  it("saves a Java method and its test expression", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Java");
    await wrapper
      .get("#programming-solution")
      .setValue("static int add(int a, int b) {\n  // return a + b;\n}");
    await wrapper
      .get("#programming-testcases")
      .setValue("add(2, 3) == 5 && add(-1, 1) == 0");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.type).toBe("programming");
    expect(ex.programminglanguage).toBe("Java");
    expect(ex.function).toBe(
      "static int add(int a, int b) {\n  // return a + b;\n}",
    );
    expect(ex.testcases).toBe("add(2, 3) == 5 && add(-1, 1) == 0");
  });

  it("saves a Racket function and its test expression", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Racket");
    await wrapper
      .get("#programming-solution")
      .setValue("(define (double x)\n  ; (* 2 x)\n)");
    await wrapper
      .get("#programming-testcases")
      .setValue("(and (= (double 7) 14) (= (double 0) 0))");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.type).toBe("programming");
    expect(ex.programminglanguage).toBe("Racket");
    expect(ex.function).toBe("(define (double x)\n  ; (* 2 x)\n)");
    expect(ex.testcases).toBe("(and (= (double 7) 14) (= (double 0) 0))");
  });

  it("saves a commented-out TypeScript solution", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("TypeScript");
    await wrapper
      .get("#programming-solution")
      .setValue("function add(a: number, b: number): number {\n  // return a + b;\n}");
    await wrapper
      .get("#programming-testcases")
      .setValue("add(2, 3) == 5 && add(-1, 1) == 0");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.function).toBe(
      "function add(a: number, b: number): number {\n  // return a + b;\n}",
    );
  });

  it("shows comment help for all supported languages", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Python");

    expect(wrapper.text()).toContain("JavaScript/TypeScript example:");
    expect(wrapper.text()).toContain("Lean 4 example:");
    expect(wrapper.text()).toContain("Python example:");
    expect(wrapper.text()).toContain("Java example");
    expect(wrapper.text()).toContain("Racket example:");
    expect(wrapper.text()).toContain("add(2, 3) == 5 and add(-1, 1) == 0");
  });

  it("does not show the JavaScript function hint for Java", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Java");
    await wrapper
      .get("#programming-solution")
      .setValue("static int add(int a, int b) {\n  // return a + b;\n}");

    expect(wrapper.text()).not.toContain(
      "Hint: JavaScript/TypeScript solutions need a function declaration",
    );
  });

  it("does not show the JavaScript function hint for Racket", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Racket");
    await wrapper
      .get("#programming-solution")
      .setValue("(define (double x)\n  ; (* 2 x)\n)");

    expect(wrapper.text()).not.toContain(
      "Hint: JavaScript/TypeScript solutions need a function declaration",
    );
  });

  it("does not show the JavaScript function hint for Python", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Python");
    await wrapper.get("#programming-solution").setValue("def add(a, b):\n    # return a + b");

    expect(wrapper.text()).not.toContain(
      "Hint: JavaScript/TypeScript solutions need a function declaration",
    );
  });

  it("allows a JavaScript solution without a function declaration and shows a hint", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("JavaScript");
    await wrapper.get("#programming-solution").setValue("// const answer = 42;");
    await wrapper.get("#programming-testcases").setValue("answer === 42");

    expect(wrapper.text()).toContain(
      "Hint: JavaScript/TypeScript solutions need a function declaration",
    );

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.function).toBe("// const answer = 42;");
  });

  it("saves a fully commented-out Lean 4 definition", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper.get("#programming-language").setValue("Lean 4");
    await wrapper
      .get("#programming-solution")
      .setValue("/-\ndef double (x : Nat) : Nat := x + x\n-/");
    await wrapper
      .get("#programming-testcases")
      .setValue("example : double 7 = 14 := rfl");

    await wrapper.find("form").trigger("submit");

    const emitted = wrapper.emitted("new-exercise-created");
    expect(emitted).toBeTruthy();
    const ex = emitted![0][0] as Exercise;
    expect(ex.function).toBe("/-\ndef double (x : Nat) : Nat := x + x\n-/");
  });

  it("does not save a programming exercise without test cases", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = await mountForm();

    await wrapper.get("#exercise-type").setValue("programming");
    await wrapper
      .get("#programming-solution")
      .setValue("function add(a, b) { return a + b; }");
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
    expect((emitted![0][0] as Exercise).topic).toBe("t1");
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
