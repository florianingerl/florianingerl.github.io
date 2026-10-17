import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";
import { useFilterStore } from "@/stores/filter";
import type { School, Topic } from "@/types/quiz";
import FilterComponent from "./FilterComponent.vue";
import VueTopicFilter from "./VueTopicFilter.vue";

const themen: Topic[] = [
  { _id: "t1", subject: "french", title: "Verbes reflechi", tutorial: "" },
  { _id: "t2", subject: "french", title: "Grammatik", tutorial: "" },
];

const schulen: School[] = [
  { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
  { _id: "s2", name: "LMU Muenchen" },
];

function mountFilter() {
  const pinia = createPinia();
  setActivePinia(pinia);
  return mount(FilterComponent, {
    props: { quiz: "french", topics: themen, schools: schulen },
    global: { plugins: [pinia] },
  });
}

describe("FilterComponent: Filterzeile", () => {
  it("zeigt beide Beschriftungen, den Themenfilter und die Schulauswahl", () => {
    const wrapper = mountFilter();

    expect(wrapper.text()).toContain("Filter for topic:");
    expect(wrapper.text()).toContain("School:");
    expect(wrapper.findComponent(VueTopicFilter).exists()).toBe(true);
    expect(wrapper.findComponent(VueTopicFilter).props("topics")).toEqual(
      themen,
    );

    // Die Auswahl traegt eine pro Quiz eindeutige _id und listet "All schools"
    // plus alle Schulen aus der Datenbank.
    const auswahl = wrapper.get("#schoolFilter-french");
    expect(auswahl.findAll("option").map((o) => o.text())).toEqual([
      "All schools",
      "9.Klasse Gymnasium Bayern",
      "LMU Muenchen",
    ]);
  });

  it("schreibt die gewaehlte Schule in den Filter des Quiz", async () => {
    const wrapper = mountFilter();

    // Die Auswahl traegt die _id; im Filter steht der Schulname.
    await wrapper.get("#schoolFilter-french").setValue("s2");

    const filterStore = useFilterStore();
    expect(filterStore.filterFor("french").school).toBe("LMU Muenchen");
  });

  it("meldet den Klick auf den Knopf fuer den erweiterten Filter", async () => {
    const wrapper = mountFilter();

    await wrapper
      .get('button[title="Show filtering options"]')
      .trigger("click");

    expect(wrapper.emitted("open-advanced-filter")).toHaveLength(1);
  });
});
