import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Topic } from "@/types/quiz";
import MSchoolDisplayer from "./MSchoolDisplayer.vue";
import MTopicAndSchoolDisplayer from "./MTopicAndSchoolDisplayer.vue";
import MTopicDisplayer from "./MTopicDisplayer.vue";

const thema: Topic = {
  _id: "t1",
  subject: "french",
  title: "Verbes reflechi",
  tutorial: "",
};

describe("MTopicAndSchoolDisplayer: Thema und Schule nebeneinander", () => {
  it("enthaelt MTopicDisplayer und MSchoolDisplayer", async () => {
    const wrapper = mount(MTopicAndSchoolDisplayer, {
      props: { topic: thema, school: { _id: "s1", name: "9.Klasse Gymnasium Bayern" } },
    });
    await flushPromises();

    expect(wrapper.findComponent(MTopicDisplayer).exists()).toBe(true);
    expect(wrapper.findComponent(MSchoolDisplayer).exists()).toBe(true);
    expect(wrapper.findAll(".badge").map((b) => b.text())).toEqual([
      "Verbes reflechi",
      "9.Klasse Gymnasium Bayern",
    ]);
  });

  it("zeigt nur das Thema, wenn die Aufgabe keine Schule hat", async () => {
    const wrapper = mount(MTopicAndSchoolDisplayer, {
      props: { topic: thema },
    });
    await flushPromises();

    expect(wrapper.text()).toContain("Topic:");
    expect(wrapper.text()).not.toContain("School:");
  });
});
