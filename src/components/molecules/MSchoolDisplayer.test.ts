import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MSchoolDisplayer from "./MSchoolDisplayer.vue";

describe("MSchoolDisplayer: Schule", () => {
  it("zeigt den Schulnamen als Badge, wenn die Aufgabe eine Schule hat", () => {
    const wrapper = mount(MSchoolDisplayer, {
      props: { school: { _id: "s1", name: "9.Klasse Gymnasium Bayern" } },
    });

    expect(wrapper.text()).toContain("School:");
    expect(wrapper.findAll(".badge").map((b) => b.text())).toEqual([
      "9.Klasse Gymnasium Bayern",
    ]);
  });

  it("zeigt nichts, wenn die Schule falsy ist", () => {
    const wrapper = mount(MSchoolDisplayer, { props: {} });

    expect(wrapper.find(".m-school-displayer").exists()).toBe(false);
    expect(wrapper.text()).toBe("");
  });

  it("kann schrumpfen und schneidet nur das Badge per ellipsis ab", () => {
    const wrapper = mount(MSchoolDisplayer, {
      props: { school: { name: "LMU Muenchen" } },
    });

    expect(wrapper.find(".m-school-displayer").exists()).toBe(true);
    expect(wrapper.get(".m-school-displayer__badge").classes()).toContain(
      "m-school-displayer__badge",
    );
  });
});
