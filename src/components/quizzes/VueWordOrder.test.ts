import { mount } from "@vue/test-utils";
import { nextTick, reactive } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Exercise, Lang } from "@/types/quiz";
import { spreche, stoppeSprechen } from "@/utils/speech";
import VueWordOrder from "./VueWordOrder.vue";

vi.mock("@/utils/speech", () => ({
  spreche: vi.fn(),
  stoppeSprechen: vi.fn(),
}));

function exercise(): Exercise {
  return {
    quiz: "english",
    type: "wordOrder",
    imageUrl: "",
    questionOrInstruction: "",
    wordorder: { sentence: "The duck wears a hat" },
  };
}

async function mountWordOrder(ex: Exercise = exercise(), lg: Lang = "en") {
  const reactiveExercise = reactive(ex);
  const wrapper = mount(VueWordOrder, {
    props: { exercise: reactiveExercise, lg },
  });
  await nextTick();
  return { wrapper, ex: reactiveExercise };
}

describe("VueWordOrder: die Loesung vorlesen", () => {
  beforeEach(() => {
    vi.mocked(spreche).mockClear();
    vi.mocked(stoppeSprechen).mockClear();
  });

  it("liest die Loesung vor, wenn die richtige Antwort eingegeben wird", async () => {
    const { wrapper } = await mountWordOrder();
    await wrapper.get('input[type="text"]').setValue("The duck wears a hat");
    expect(spreche).toHaveBeenCalledWith("The duck wears a hat", "en");
  });

  it("liest die Loesung vor, wenn auf Pruefen geklickt wird", async () => {
    const { wrapper } = await mountWordOrder();
    await wrapper.get('input[type="text"]').setValue("The duck wears a hat");
    vi.mocked(spreche).mockClear();
    await wrapper.get('button[title="Validate"]').trigger("click");
    expect(spreche).toHaveBeenCalledWith("The duck wears a hat", "en");
  });

  it("liest die Loesung vor, wenn die Loesung gezeigt wird", async () => {
    const { wrapper } = await mountWordOrder();
    await wrapper.get('button[title="Show me the solution"]').trigger("click");
    expect(spreche).toHaveBeenCalledWith("The duck wears a hat", "en");
  });

  it("liest nichts vor, wenn die Antwort falsch ist", async () => {
    const { wrapper } = await mountWordOrder();
    await wrapper.get('input[type="text"]').setValue("The duck wears a cap");
    expect(spreche).not.toHaveBeenCalled();
    await wrapper.get('button[title="Validate"]').trigger("click");
    expect(spreche).not.toHaveBeenCalled();
  });

  it("bricht die Ausgabe ab, wenn die Aufgabe neu gestartet wird", async () => {
    const { wrapper } = await mountWordOrder();
    await wrapper.get('button[title="Retry"]').trigger("click");
    expect(stoppeSprechen).toHaveBeenCalled();
  });
});
