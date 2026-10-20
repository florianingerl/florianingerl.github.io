import { mount } from "@vue/test-utils";
import { nextTick, reactive } from "vue";
import { describe, expect, it } from "vitest";
import type { Exercise } from "@/types/quiz";
import VueQuestion from "./VueQuestion.vue";

// Die Aufgabe stammt wie im echten Quiz aus reaktivem Zustand. Die erste Option
// ist die einzige richtige, so wie sie der Editor speichert.
function exercise(): Exercise {
  return {
    quiz: "english",
    type: "multipleChoice",
    imageUrl: "",
    question: "Choose the right word",
    options: [
      { option: "A", correct: true },
      { option: "B", correct: false },
      { option: "C", correct: false },
    ],
  };
}

// Findet das Kontrollkaestchen der Option mit dem angegebenen Text.
function checkBoxFor(wrapper: ReturnType<typeof mount>, optionText: string) {
  return wrapper.findAll('div input[type="checkbox"]').find((b) => {
    const label = b.element.closest("div")?.querySelector("label");
    return label?.textContent?.trim() === optionText;
  });
}

describe("VueQuestion: multiple choice Validierung", () => {
  it("faerbt die richtige Antwort gruen", async () => {
    const ex = reactive<Exercise>(exercise());
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    const box = checkBoxFor(wrapper, "A");
    expect(box).toBeTruthy();
    await box!.setValue(true);

    expect(ex.correctlyAnswered).toBe(true);
    expect(box!.element.closest("div")!.classList.contains("correct")).toBe(true);
    expect(box!.element.closest("div")!.classList.contains("notcorrect")).toBe(false);
  });

  it("faerbt auch bei mehreren als richtig markierten Optionen gruen", async () => {
    // Altdaten in der Datenbank enthalten z.B. "Was ist Reiki?" mit zwei
    // richtigen Optionen. Der User erwartet, dass das Ankreuzen einer richtigen
    // Antwort gruen wird.
    const ex = reactive<Exercise>({
      quiz: "nutrition",
      type: "multipleChoice",
      imageUrl: "",
      question: "Was ist Reiki?",
      options: [
        { option: "A", correct: true },
        { option: "B", correct: true },
        { option: "C", correct: false },
      ],
    });
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "de" } });
    await nextTick();

    const box = checkBoxFor(wrapper, "A");
    expect(box).toBeTruthy();
    await box!.setValue(true);

    expect(ex.correctlyAnswered).toBe(true);
    expect(box!.element.closest("div")!.classList.contains("correct")).toBe(true);
  });

  it("faerbt eine falsche Antwort rot", async () => {
    const ex = reactive<Exercise>(exercise());
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    const box = checkBoxFor(wrapper, "B");
    expect(box).toBeTruthy();
    await box!.setValue(true);

    expect(ex.correctlyAnswered).toBe(false);
    expect(box!.element.closest("div")!.classList.contains("notcorrect")).toBe(true);
    expect(box!.element.closest("div")!.classList.contains("correct")).toBe(false);
  });
});

describe("VueQuestion: HTML und LaTeX in Frage und Optionen", () => {
  function richExercise(): Exercise {
    return {
      quiz: "english",
      type: "multipleChoice",
      imageUrl: "",
      question: 'Which formula solves <strong>$ax^2 + bx + c = 0$</strong>?',
      options: [
        {
          option: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
          correct: true,
        },
        { option: "just <em>plain</em> text", correct: false },
      ],
    };
  }

  it("rendert HTML-Tags und Formeln in der Frage", async () => {
    const wrapper = mount(VueQuestion, {
      props: { question: richExercise(), lg: "en" },
    });
    await nextTick();

    const p = wrapper.get("p");
    expect(p.find("strong").exists()).toBe(true);
    expect(p.html()).toContain("katex");
    expect(p.text()).toContain("Which formula solves");
    expect(p.text()).not.toContain("$");
  });

  it("rendert Formeln und HTML in den Optionen", async () => {
    const wrapper = mount(VueQuestion, {
      props: { question: richExercise(), lg: "en" },
    });
    await nextTick();

    const labels = wrapper.findAll("label");
    expect(labels).toHaveLength(2);
    expect(labels[0].html()).toContain("katex");
    expect(labels[0].text()).not.toContain("$");
    expect(labels[1].find("em").exists()).toBe(true);
    expect(labels[1].text()).toBe("just plain text");
  });

  it("zeigt weiterhin reine Textfragen unveraendert an", async () => {
    const ex = reactive<Exercise>({
      quiz: "english",
      type: "multipleChoice",
      imageUrl: "",
      question: "Choose the right word",
      options: [{ option: "A", correct: true }],
    });
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    expect(wrapper.get("p").text()).toBe("Choose the right word");
    expect(wrapper.get("label").text()).toBe("A");
  });
});