import { mount } from "@vue/test-utils";
import { nextTick, reactive } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Exercise, Lang } from "@/types/quiz";
import { spreche, stoppeSprechen } from "@/utils/speech";
import VueMCGaps from "./VueMCGaps.vue";

// Das Vorlesen selbst kann der Test nicht hoeren. Geprueft wird deshalb nur,
// dass die richtige Loesung an die Sprachausgabe uebergeben wird.
vi.mock("@/utils/speech", () => ({
  spreche: vi.fn(),
  stoppeSprechen: vi.fn(),
}));

// gapText mit einer Lücke, die zwei richtige Antworten hat ("that" und "which").
// Der Text endet nicht auf "}", der Parser hängt also noch eine leere Lücke an,
// die als richtig gelten muss.
function exercise(): Exercise {
  return {
    quiz: "english",
    type: "gapText",
    imageUrl: "",
    questionOrInstruction: "",
    gapText:
      "The duck, {that§which} you see in the picture, wears a hat.",
  };
}

// Vokabeluebung im Französisch: die Loesung der Luecke ist das franzoesische
// Wort, das deutsche Wort steht dahinter in Klammern.
function vokabelExercise(): Exercise {
  return {
    quiz: "french",
    type: "gapText",
    imageUrl: "",
    questionOrInstruction: "",
    gapText: "J'ai besoin d'un {crayon} (Bleistift).",
  };
}

// Auswahl-Luecke: die erste Alternative ist die richtige Antwort.
function auswahlExercise(): Exercise {
  return {
    quiz: "french",
    type: "gapText",
    imageUrl: "",
    questionOrInstruction: "",
    gapText: "La femme {qui|que} tient le bouquet.",
  };
}

async function mountGaps(ex: Exercise = exercise(), lg: Lang = "en") {
  // Im echten Quiz stammt die Aufgabe aus reaktivem Zustand, nicht aus einem
  // einfachen Objektliteral.
  const reactiveExercise = reactive(ex);
  const wrapper = mount(VueMCGaps, {
    props: { exercise: reactiveExercise, lg },
  });
  // onMounted parst das gapText und setzt exercise.gaps; den dadurch
  // ausgeloesten Re-Render abwarten.
  await nextTick();
  return { wrapper, ex: reactiveExercise };
}

describe("VueMCGaps: mehrere richtige Antworten", () => {
  it("akzeptiert die erste richtige Antwort", async () => {
    const { wrapper, ex } = await mountGaps();
    await wrapper.get('input[type="text"]').setValue("that");
    expect(ex.correctlyAnswered).toBe(true);
  });

  it("akzeptiert die zweite richtige Antwort", async () => {
    const { wrapper, ex } = await mountGaps();
    await wrapper.get('input[type="text"]').setValue("which");
    expect(ex.correctlyAnswered).toBe(true);
    // Die richtige Antwort wird grün dargestellt, nicht rot.
    expect(wrapper.find("span.correct").exists()).toBe(true);
    expect(wrapper.find("span.notcorrect").exists()).toBe(false);
  });

  it("lehnt eine falsche Antwort ab", async () => {
    const { wrapper, ex } = await mountGaps();
    await wrapper.get('input[type="text"]').setValue("who");
    expect(ex.correctlyAnswered).toBeUndefined();
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });
});

describe("VueMCGaps: die Loesung vorlesen (Aufgabe 38)", () => {
  beforeEach(() => {
    vi.mocked(spreche).mockClear();
    vi.mocked(stoppeSprechen).mockClear();
  });

  it("liest die Loesung vor, wenn die richtige Antwort eingegeben wird", async () => {
    const { wrapper } = await mountGaps(vokabelExercise(), "fr");
    await wrapper.get('input[type="text"]').setValue("crayon");
    expect(spreche).toHaveBeenCalledWith("crayon", "fr");
  });

  it("liest die Loesung vor, wenn auf Pruefen geklickt wird", async () => {
    const { wrapper } = await mountGaps(vokabelExercise(), "fr");
    await wrapper.get('input[type="text"]').setValue("crayon");
    vi.mocked(spreche).mockClear();
    await wrapper.get('button[title="Valider ma solution"]').trigger("click");
    expect(spreche).toHaveBeenCalledWith("crayon", "fr");
  });

  it("liest die Loesung vor, wenn die Loesung gezeigt wird", async () => {
    const { wrapper } = await mountGaps(vokabelExercise(), "fr");
    await wrapper.get('button[title="Montre-moi la solution"]').trigger("click");
    expect(spreche).toHaveBeenCalledWith("crayon", "fr");
  });

  it("liest nichts vor, wenn die Antwort falsch ist", async () => {
    const { wrapper } = await mountGaps(vokabelExercise(), "fr");
    await wrapper.get('input[type="text"]').setValue("stylo");
    expect(spreche).not.toHaveBeenCalled();
    await wrapper.get('button[title="Valider ma solution"]').trigger("click");
    expect(spreche).not.toHaveBeenCalled();
  });

  it("liest bei einer Auswahl-Luecke die richtige Alternative vor", async () => {
    const { wrapper } = await mountGaps(auswahlExercise(), "fr");
    await wrapper.get("select").setValue("qui");
    expect(spreche).toHaveBeenCalledWith("qui", "fr");
  });

  it("bricht die Ausgabe ab, wenn die Aufgabe neu gestartet wird", async () => {
    const { wrapper } = await mountGaps(vokabelExercise(), "fr");
    await wrapper.get('button[title="Essayer encore une fois"]').trigger("click");
    expect(stoppeSprechen).toHaveBeenCalled();
  });
});
