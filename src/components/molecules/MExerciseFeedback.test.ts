import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MExerciseFeedback from "./MExerciseFeedback.vue";

describe("MExerciseFeedback: Feedback-Knoepfe einer Aufgabe", () => {
  it("zeigt die drei Knoepfe mit passenden Icons in der Quiz-Sprache", () => {
    const wrapper = mount(MExerciseFeedback, { props: { lg: "fr" } });

    const knoepfe = wrapper.findAll("button");
    expect(knoepfe).toHaveLength(3);
    expect(knoepfe.map((k) => k.text())).toEqual([
      "Valider ma solution",
      "Montre-moi la solution",
      "Essayer encore une fois",
    ]);
    expect(knoepfe[0].find("i").classes()).toContain("bi-check-circle");
    expect(knoepfe[1].find("i").classes()).toContain("bi-lightbulb");
    expect(knoepfe[2].find("i").classes()).toContain("bi-arrow-counterclockwise");
  });

  it("hat einen Tooltip mit dem vollstaendigen Text auf jedem Knoepf", () => {
    const wrapper = mount(MExerciseFeedback, { props: { lg: "de" } });

    const knoepfe = wrapper.findAll("button");
    expect(knoepfe.map((k) => k.attributes("title"))).toEqual([
      "Prüfen",
      "Zeig mir die Lösung",
      "Nochmal versuchen",
    ]);
  });

  it("meldet validate, showSolution und retry beim Klick", async () => {
    const wrapper = mount(MExerciseFeedback, { props: { lg: "en" } });

    const knoepfe = wrapper.findAll("button");
    await knoepfe[0].trigger("click");
    await knoepfe[1].trigger("click");
    await knoepfe[2].trigger("click");

    expect(wrapper.emitted("validate")).toHaveLength(1);
    expect(wrapper.emitted("showSolution")).toHaveLength(1);
    expect(wrapper.emitted("retry")).toHaveLength(1);
  });

  it("legt die Knoepfe als Flex-Items ohne Umbruch aus", () => {
    const wrapper = mount(MExerciseFeedback, { props: { lg: "en" } });

    const kasten = wrapper.get(".exercise-feedback");
    expect(kasten.classes()).toContain("exercise-feedback");
    for (const knopf of wrapper.findAll("button")) {
      expect(knopf.classes()).toContain("exercise-feedback__button");
    }
  });
});
