import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";
import { useFilterStore } from "@/stores/filter";
import type { School, Topic } from "@/types/quiz";
import VueFilterDialog from "./VueFilterDialog.vue";

const themen: Topic[] = [
  { _id: "t1", subject: "french", title: "Verbes reflechi", tutorial: "" },
  { _id: "t2", subject: "french", title: "Grammatik", tutorial: "" },
];

const schulen: School[] = [
  { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
  { _id: "s2", name: "LMU Muenchen" },
];

function mountDialog(schools: School[] = schulen) {
  const pinia = createPinia();
  setActivePinia(pinia);
  return mount(VueFilterDialog, {
    props: { quiz: "french", topics: themen, schools, creators: [] },
    global: { plugins: [pinia], stubs: { MTopicChooser: true } },
  });
}

describe("VueFilterDialog: erweiterter Filter", () => {
  it("listet 'All schools' und die uebergebenen Schulen", () => {
    const wrapper = mountDialog();

    expect(wrapper.get("#filter-school").findAll("option").map((o) => o.text())).toEqual([
      "All schools",
      "9.Klasse Gymnasium Bayern",
      "LMU Muenchen",
    ]);
  });

  it("zeigt nur die uebergebenen (im Quiz verwendeten) Schulen", () => {
    const wrapper = mountDialog([schulen[1]]);

    expect(wrapper.get("#filter-school").findAll("option").map((o) => o.text())).toEqual([
      "All schools",
      "LMU Muenchen",
    ]);
  });

  it("schreibt die gewaehlte Schule in den Filter des Quiz", async () => {
    const wrapper = mountDialog();

    await wrapper.get("#filter-school").setValue("LMU Muenchen");

    expect(useFilterStore().filterFor("french").school).toBe("LMU Muenchen");
  });

  it("meldet 'Close' an den Aufrufer", async () => {
    const wrapper = mountDialog();

    const schliessen = wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Close")!;
    await schliessen.trigger("click");

    expect(wrapper.emitted("cancel-clicked")).toHaveLength(1);
  });
});
