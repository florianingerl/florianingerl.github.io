import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import type { Exercise } from "@/types/quiz";
import OExercise from "./OExercise.vue";
import VueMCGaps from "./VueMCGaps.vue";
import VueQuestion from "./VueQuestion.vue";

// Eine Aufgabe, wie sie im Quiz vorkommt. Die erste Option ist die richtige.
function aufgabe(overrides: Partial<Exercise> = {}): Exercise {
  return {
    quiz: "english",
    type: "multipleChoice",
    imageUrl: "",
    questionOrInstruction: "Was ist auf dem Bild zu sehen?",
    options: [
      { option: "ein Rechteck", correct: true },
      { option: "ein Kreis", correct: false },
    ],
    ...overrides,
  };
}

// MTopicAndSchoolDisplayer laedt das Thema vom Server; im Test wird er ersetzt.
const global = { stubs: { MTopicAndSchoolDisplayer: true } };

describe("OExercise: Splitter aus Bild und Aufgabe", () => {
  it("legt das Bild in das erste und die Aufgabe in das zweite Panel", () => {
    const ex = aufgabe({ imageUrl: "https://example.com/bild.png" });
    const wrapper = mount(OExercise, {
      props: { exercise: ex, lg: "en" },
      global,
    });

    // Der horizontale Splitter mit genau zwei Panels.
    expect(wrapper.findComponent(Splitter).exists()).toBe(true);
    const panels = wrapper.findAllComponents(SplitterPanel);
    expect(panels).toHaveLength(2);

    // Im ersten Panel steht das Bild.
    const bild = panels[0].get(".vue-image__img");
    expect(bild.attributes("src")).toBe("https://example.com/bild.png");

    // Im zweiten Panel steht die Aufgabe (multipleChoice -> VueQuestion).
    const frage = panels[1].findComponent(VueQuestion);
    expect(frage.exists()).toBe(true);
    expect(frage.props("question")).toEqual(ex);

    // Die Paginierung gehoert nicht mehr zum Splitter; sie steht in OQuiz
    // unter dem gesamten Splitter.
    expect(wrapper.find("ul.pagination").exists()).toBe(false);
  });

  it("zeigt ohne Bild stattdessen das Fragezeichen-Bild im Splitter", () => {
    const wrapper = mount(OExercise, {
      props: { exercise: aufgabe(), lg: "en" },
      global,
    });

    expect(wrapper.findComponent(Splitter).exists()).toBe(true);
    const panels = wrapper.findAllComponents(SplitterPanel);
    expect(panels).toHaveLength(2);

    const bild = panels[0].get(".vue-image__img");
    expect(bild.attributes("src")).toBe("assets/img/cs/fragezeichen.jpg");

    expect(panels[1].findComponent(VueQuestion).exists()).toBe(true);
    expect(wrapper.find("ul.pagination").exists()).toBe(false);
  });

  it("waehlt fuer gapText die VueMCGaps-Aufgabe", () => {
    const ex = aufgabe({ type: "gapText", gapText: "a {b} c" });
    const wrapper = mount(OExercise, {
      props: { exercise: ex, lg: "en" },
      global,
    });

    const gap = wrapper.findComponent(VueMCGaps);
    expect(gap.exists()).toBe(true);
    expect(gap.props("exercise")).toEqual(ex);
  });
});

describe("OExercise: Vollbildmodus", () => {
  it("markiert die Komponente nur im Vollbild mit der Vollbild-Klasse", () => {
    const ex = aufgabe({ imageUrl: "https://example.com/bild.png" });

    const normal = mount(OExercise, {
      props: { exercise: ex, lg: "en" },
      global,
    });
    expect(normal.classes()).not.toContain("vue-exercise--vollbild");

    const voll = mount(OExercise, {
      props: { exercise: ex, lg: "en", vollbild: true },
      global,
    });
    expect(voll.classes()).toContain("vue-exercise--vollbild");
  });
});
