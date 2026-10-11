import { mount } from "@vue/test-utils";
import { nextTick, reactive } from "vue";
import { describe, expect, it } from "vitest";
import type { Exercise } from "@/types/quiz";
import VueMCGaps from "./VueMCGaps.vue";

// gapText mit einer Lücke, die zwei richtige Antworten hat ("that" und "which").
// Der Text endet nicht auf "}", der Parser hängt also noch eine leere Lücke an,
// die als richtig gelten muss.
function exercise(): Exercise {
  return {
    quiz: "english",
    type: "gapText",
    imageUrl: "",
    gapText:
      "The duck, {that§which} you see in the picture, wears a hat.",
  };
}

async function mountGaps() {
  // Im echten Quiz stammt die Aufgabe aus reaktivem Zustand, nicht aus einem
  // einfachen Objektliteral.
  const ex = reactive(exercise());
  const wrapper = mount(VueMCGaps, {
    props: { exercise: ex, lg: "en" },
  });
  // onMounted parst das gapText und setzt exercise.gaps; den dadurch
  // ausgeloesten Re-Render abwarten.
  await nextTick();
  return { wrapper, ex };
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
