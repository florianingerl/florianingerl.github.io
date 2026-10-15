import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Topic } from "@/types/quiz";
import VueTopicDisplayer from "./VueTopicDisplayer.vue";

const thema: Topic = {
  _id: "t1",
  subject: "french",
  title: "Verbes reflechi",
  tutorial: "",
};

describe("VueTopicDisplayer: Thema und Schule", () => {
  it("zeigt das Thema als Badge", async () => {
    const wrapper = mount(VueTopicDisplayer, { props: { topic: thema } });
    await flushPromises();

    expect(wrapper.text()).toContain("Topic:");
    expect(wrapper.findAll(".badge").map((b) => b.text())).toEqual([
      "Verbes reflechi",
    ]);
  });

  it("zeigt Schule und Schulnamen als Badge, wenn die Aufgabe eine hat", async () => {
    const wrapper = mount(VueTopicDisplayer, {
      props: {
        topic: thema,
        school: { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
      },
    });
    await flushPromises();

    expect(wrapper.text()).toContain("School:");
    expect(wrapper.findAll(".badge").map((b) => b.text())).toEqual([
      "Verbes reflechi",
      "9.Klasse Gymnasium Bayern",
    ]);
  });

  it("zeigt keine Schule, wenn die Aufgabe keine hat", async () => {
    const wrapper = mount(VueTopicDisplayer, { props: { topic: thema } });
    await flushPromises();

    expect(wrapper.text()).not.toContain("School:");
  });

  it("zeigt die Schule auch ohne Thema an", async () => {
    const wrapper = mount(VueTopicDisplayer, {
      props: { topic: undefined, school: { name: "LMU Muenchen" } },
    });
    await flushPromises();

    expect(wrapper.text()).toContain("isn't classified under a topic");
    expect(wrapper.text()).toContain("LMU Muenchen");
  });
});
