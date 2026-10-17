import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ExerciseNavigation from "./ExerciseNavigation.vue";

// Die Blaetterleiste unter dem Aufgabenbild. Sie meldet nur, was der Benutzer
// will (eine Verschiebung oder eine bestimmte Seitennummer); die Grenzen und
// die tatsaechliche Auswahl prueft der Aufrufer (VueQuiz).
function leiste(overrides: Partial<Record<string, unknown>> = {}) {
  return mount(ExerciseNavigation, {
    props: {
      i: 0,
      indices: [0, 1, 2],
      letzterIndex: 2,
      lg: "en",
      ...overrides,
    },
  });
}

describe("ExerciseNavigation: Blaetterleiste", () => {
  it("beschriftet die Knoepfe in der gewaehlten Sprache", () => {
    const en = leiste({ lg: "en" });
    expect(en.find('button[title="Previous exercise"]').exists()).toBe(true);
    expect(en.find('button[title="Next exercise"]').exists()).toBe(true);
    expect(en.find('button[title="Jump 5 exercises backward"]').exists()).toBe(
      true,
    );
    expect(en.find('button[title="Jump 5 exercises forward"]').exists()).toBe(
      true,
    );

    const de = leiste({ lg: "de" });
    expect(de.find('button[title="Vorige Aufgabe"]').exists()).toBe(true);
    expect(de.find('button[title="Nächste Aufgabe"]').exists()).toBe(true);
  });

  it("meldet die Verschiebung der vier Pfeilknoepfe als navigate", async () => {
    const wrapper = leiste();

    await wrapper.get('button[title="Jump 5 exercises backward"]').trigger("click");
    await wrapper.get('button[title="Previous exercise"]').trigger("click");
    await wrapper.get('button[title="Next exercise"]').trigger("click");
    await wrapper.get('button[title="Jump 5 exercises forward"]').trigger("click");

    expect(wrapper.emitted("navigate")).toEqual([[-5], [-1], [1], [5]]);
  });

  it("meldet eine gewaehlte Seitennummer als select", async () => {
    const wrapper = leiste();

    const seite2 = wrapper
      .findAll("button.page-link")
      .find((b) => b.text() === "2")!;
    await seite2.trigger("click");

    expect(wrapper.emitted("select")).toEqual([[2]]);
  });

  it("meldet die eingetippte Seitennummer als select", async () => {
    const wrapper = leiste();

    const eingabe = wrapper.get('input[type="number"]');
    expect(eingabe.attributes("max")).toBe("2");
    await eingabe.setValue("1");
    await eingabe.trigger("change");

    expect(wrapper.emitted("select")?.at(-1)).toEqual([1]);
  });

  it("hebt die aktuelle Seite hervor", () => {
    const wrapper = leiste({ i: 1 });

    const aktiv = wrapper.findAll("li.page-item.active");
    expect(aktiv).toHaveLength(1);
    expect(aktiv[0].text()).toBe("1");
  });
});
