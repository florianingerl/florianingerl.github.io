import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Topic } from "@/types/quiz";
import VueTopicFilter from "./VueTopicFilter.vue";

const themen: Topic[] = [
  {
    _id: "et",
    subject: "elektrotechnik",
    title: "Elektrotechnik",
    tutorial: "",
  },
  {
    _id: "dio",
    subject: "elektrotechnik",
    title: "Dioden",
    tutorial: "",
    parentId: "et",
  },
  {
    _id: "zeh",
    subject: "elektrotechnik",
    title: "Zehnerdiode",
    tutorial: "",
    parentId: "dio",
  },
];

// Der Baum ist ueber v-show versteckt; jsdom und isVisible() sind hier
// unzuverlaessig, deshalb wird direkt das display im style geprueft.
function baumOffen(wrapper: ReturnType<typeof mount>): boolean {
  const style = wrapper.get(".topic-tree-overlay").attributes("style") ?? "";
  return !style.includes("display: none");
}

describe("VueTopicFilter: Baum als Menue", () => {
  it("zeigt ohne Auswahl einen Knopf und einen zugeklappten Baum", () => {
    const wrapper = mount(VueTopicFilter, {
      props: { modelValue: "", topics: themen },
    });

    expect(wrapper.get("button").text()).toContain("Choose a topic");
    expect(baumOffen(wrapper)).toBe(false);
  });

  it("zeigt den Pfad des gewaehlten Themas als String, solange zugeklappt", () => {
    const wrapper = mount(VueTopicFilter, {
      props: { modelValue: "zeh", topics: themen },
    });

    expect(wrapper.text()).toContain("Elektrotechnik->Dioden->Zehnerdiode");
    // Die Schule gehoert zur Aufgabe und steht nicht mehr im Themenpfad.
    expect(wrapper.text()).not.toContain("Uni Aachen");
    expect(baumOffen(wrapper)).toBe(false);
  });

  it("klappt den Baum beim Klick auf den String als Menue auf", async () => {
    const wrapper = mount(VueTopicFilter, {
      props: { modelValue: "zeh", topics: themen },
    });

    await wrapper.get("button").trigger("click");

    expect(baumOffen(wrapper)).toBe(true);
    // Der Pfad zum gewaehlten Thema ist aufgeklappt.
    const knoten = wrapper.findAll(".p-treenode-content");
    expect(knoten.some((n) => n.text().includes("Zehnerdiode"))).toBe(true);
  });

  it("waehlt einen Knoten und schliesst das Menue", async () => {
    const wrapper = mount(VueTopicFilter, {
      props: { modelValue: "", topics: themen },
    });

    await wrapper.get("button").trigger("click");
    expect(baumOffen(wrapper)).toBe(true);

    const wurzel = wrapper
      .findAll(".p-treenode-content")
      .find((n) => n.text().includes("Elektrotechnik"));
    expect(wurzel).toBeTruthy();
    await wurzel!.trigger("click");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["et"]);
    expect(baumOffen(wrapper)).toBe(false);
  });
});
