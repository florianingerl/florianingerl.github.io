import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { School } from "@/types/quiz";
import MSchoolChooser from "./MSchoolChooser.vue";

const schulen: School[] = [
  { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
  { _id: "s2", name: "LMU Muenchen" },
];

describe("MSchoolChooser: Schulauswahl", () => {
  it("zeigt die Beschriftung und alle Schulen als Optionen", () => {
    const wrapper = mount(MSchoolChooser, {
      props: { schools: schulen, emptyLabel: "No school" },
    });

    expect(wrapper.text()).toContain("School:");
    const optionen = wrapper
      .findAll("option")
      .map((o) => ({ text: o.text(), value: o.attributes("value") }));
    expect(optionen).toEqual([
      { text: "No school", value: "" },
      { text: "9.Klasse Gymnasium Bayern", value: "s1" },
      { text: "LMU Muenchen", value: "s2" },
    ]);
  });

  it("zeigt einen vorgegebenen Wert als Auswahl", () => {
    const wrapper = mount(MSchoolChooser, {
      props: { schools: schulen, modelValue: "s1", emptyLabel: "No school" },
    });

    expect((wrapper.get("select").element as HTMLSelectElement).value).toBe(
      "s1",
    );
  });

  it("waehlt den Wert auch, wenn die Optionen erst spaeter eintreffen", async () => {
    const wrapper = mount(MSchoolChooser, {
      props: { schools: [], modelValue: "s2", emptyLabel: "No school" },
    });

    await wrapper.setProps({ schools: schulen });

    expect((wrapper.get("select").element as HTMLSelectElement).value).toBe(
      "s2",
    );
  });

  it("meldet Auswahl als _id und als Schuldokument", async () => {
    const wrapper = mount(MSchoolChooser, {
      props: { schools: schulen, emptyLabel: "No school" },
    });

    await wrapper.get("select").setValue("s2");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["s2"]);
    expect(wrapper.emitted("school-selected")?.[0]).toEqual([schulen[1]]);
  });

  it("meldet null, wenn 'keine Schule' gewaehlt wird", async () => {
    const wrapper = mount(MSchoolChooser, {
      props: { schools: schulen, modelValue: "s1", emptyLabel: "All schools" },
    });

    await wrapper.get("select").setValue("");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([""]);
    expect(wrapper.emitted("school-selected")?.[0]).toEqual([null]);
  });
});
