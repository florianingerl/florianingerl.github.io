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
    questionOrInstruction: "Choose the right word",
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

function checkboxStatus(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('div input[type="checkbox"]').map((b) => {
    const el = b.element as HTMLInputElement;
    return {
      checked: el.checked,
      disabled: el.disabled,
      classes: (b.element.closest("div") as HTMLElement).classList,
    };
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
      questionOrInstruction: "Was ist Reiki?",
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
      questionOrInstruction: 'Which formula solves <strong>$ax^2 + bx + c = 0$</strong>?',
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

    // Die Optionen werden beim Mounten gemischt, deshalb per Inhalt suchen.
    const labels = wrapper.findAll("label");
    expect(labels).toHaveLength(2);
    const formelLabel = labels.find((l) => l.html().includes("katex"));
    const textLabel = labels.find((l) => l.text() === "just plain text");
    expect(formelLabel).toBeTruthy();
    expect(formelLabel!.text()).not.toContain("$");
    expect(textLabel).toBeTruthy();
    expect(textLabel!.find("em").exists()).toBe(true);
  });

  it("zeigt weiterhin reine Textfragen unveraendert an", async () => {
    const ex = reactive<Exercise>({
      quiz: "english",
      type: "multipleChoice",
      imageUrl: "",
      questionOrInstruction: "Choose the right word",
      options: [{ option: "A", correct: true }],
    });
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    expect(wrapper.get("p").text()).toBe("Choose the right word");
    expect(wrapper.get("label").text()).toBe("A");
  });
});

describe("VueQuestion: Loesung zeigen (Aufgabe 34)", () => {
  function mcExercise(): Exercise {
    return {
      quiz: "english",
      type: "multipleChoice",
      imageUrl: "",
      questionOrInstruction: "Choose the right word",
      options: [
        { option: "A", correct: true },
        { option: "B", correct: false },
        { option: "C", correct: false },
      ],
    };
  }

  function klickLoesung(wrapper: ReturnType<typeof mount>) {
    return wrapper.get('button[title="Show me the solution"]').trigger("click");
  }

  it("faerbt weder rot noch gruen und sperrt alle Checkboxen", async () => {
    const ex = reactive<Exercise>(mcExercise());
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    const falsch = checkBoxFor(wrapper, "B");
    await falsch!.setValue(true);
    expect(ex.correctlyAnswered).toBe(false);

    await klickLoesung(wrapper);
    await nextTick();

    const a = checkBoxFor(wrapper, "A")!.element as HTMLInputElement;
    const b = checkBoxFor(wrapper, "B")!.element as HTMLInputElement;
    const c = checkBoxFor(wrapper, "C")!.element as HTMLInputElement;
    expect(a.checked).toBe(true);
    expect(b.checked).toBe(false);
    expect(c.checked).toBe(false);
    expect(ex.correctlyAnswered).toBe(false);

    for (const status of checkboxStatus(wrapper)) {
      expect(status.disabled).toBe(true);
      expect(status.classes.contains("correct")).toBe(false);
      expect(status.classes.contains("notcorrect")).toBe(false);
    }
  });

  it("laesst eine bereits richtig beantwortete Aufgabe richtig", async () => {
    const ex = reactive<Exercise>(mcExercise());
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    await checkBoxFor(wrapper, "A")!.setValue(true);
    expect(ex.correctlyAnswered).toBe(true);

    await klickLoesung(wrapper);
    await nextTick();

    expect(ex.correctlyAnswered).toBe(true);
    expect(
      (checkBoxFor(wrapper, "A")!.element as HTMLInputElement).checked,
    ).toBe(true);
  });

  it("Retry macht die Aufgabe wieder beantwortbar", async () => {
    const ex = reactive<Exercise>(mcExercise());
    const wrapper = mount(VueQuestion, { props: { question: ex, lg: "en" } });
    await nextTick();

    await klickLoesung(wrapper);
    await nextTick();
    expect(ex.correctlyAnswered).toBe(false);

    await wrapper.get('button[title="Retry"]').trigger("click");
    await nextTick();

    expect(ex.correctlyAnswered).toBeUndefined();
    for (const status of checkboxStatus(wrapper)) {
      expect(status.disabled).toBe(false);
      expect(status.checked).toBe(false);
    }
  });
});