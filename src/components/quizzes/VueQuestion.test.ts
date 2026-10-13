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