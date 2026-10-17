import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import type { Exercise } from "@/types/quiz";
import VueExercise from "./VueExercise.vue";
import VueMCGaps from "./VueMCGaps.vue";
import VueQuestion from "./VueQuestion.vue";

// Eine Aufgabe, wie sie im Quiz vorkommt. Die erste Option ist die richtige.
function aufgabe(overrides: Partial<Exercise> = {}): Exercise {
  return {
    quiz: "english",
    type: "multipleChoice",
    imageUrl: "",
    question: "Was ist auf dem Bild zu sehen?",
    options: [
      { option: "ein Rechteck", correct: true },
      { option: "ein Kreis", correct: false },
    ],
    ...overrides,
  };
}

// VueTopicDisplayer laedt das Thema vom Server; im Test wird er ersetzt.
const global = { stubs: { VueTopicDisplayer: true } };

describe("VueExercise: Splitter aus Bild und Aufgabe", () => {
  it("legt das Bild in das erste und die Aufgabe in das zweite Panel", () => {
    const ex = aufgabe({ imageUrl: "https://example.com/bild.png" });
    const wrapper = mount(VueExercise, {
      props: { exercise: ex, lg: "en" },
      slots: { pagination: '<ul class="pagination"><li>1</li></ul>' },
      global,
    });

    // Der horizontale Splitter mit genau zwei Panels.
    expect(wrapper.findComponent(Splitter).exists()).toBe(true);
    const panels = wrapper.findAllComponents(SplitterPanel);
    expect(panels).toHaveLength(2);

    // Im ersten Panel steht das Bild ...
    const bild = panels[0].get(".vue-image__img");
    expect(bild.attributes("src")).toBe("https://example.com/bild.png");
    // ... und die Paginierung direkt darunter.
    expect(panels[0].find(".vue-image__fuss ul.pagination").exists()).toBe(true);

    // Im zweiten Panel steht die Aufgabe (multipleChoice -> VueQuestion).
    const frage = panels[1].findComponent(VueQuestion);
    expect(frage.exists()).toBe(true);
    expect(frage.props("question")).toEqual(ex);
  });

  it("zeigt ohne Bild keinen Splitter, sondern nur die Aufgabe", () => {
    const wrapper = mount(VueExercise, {
      props: { exercise: aufgabe(), lg: "en" },
      slots: { pagination: '<ul class="pagination"><li>1</li></ul>' },
      global,
    });

    expect(wrapper.findComponent(Splitter).exists()).toBe(false);
    expect(wrapper.findComponent(VueQuestion).exists()).toBe(true);
    expect(wrapper.find(".vue-image__fuss ul.pagination").exists()).toBe(true);
  });

  it("waehlt fuer gapText die VueMCGaps-Aufgabe", () => {
    const ex = aufgabe({ type: "gapText", gapText: "a {b} c" });
    const wrapper = mount(VueExercise, {
      props: { exercise: ex, lg: "en" },
      global,
    });

    const gap = wrapper.findComponent(VueMCGaps);
    expect(gap.exists()).toBe(true);
    expect(gap.props("exercise")).toEqual(ex);
  });
});
