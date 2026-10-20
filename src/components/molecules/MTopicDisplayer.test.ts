import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Topic } from "@/types/quiz";
import MTopicDisplayer from "./MTopicDisplayer.vue";

const thema: Topic = {
  _id: "t1",
  subject: "french",
  title: "Verbes reflechi",
  tutorial: "",
};

describe("MTopicDisplayer: Thema", () => {
  it("zeigt das Thema als Badge", async () => {
    const wrapper = mount(MTopicDisplayer, { props: { topic: thema } });
    await flushPromises();

    expect(wrapper.text()).toContain("Topic:");
    expect(wrapper.findAll(".badge").map((b) => b.text())).toEqual([
      "Verbes reflechi",
    ]);
  });

  it("zeigt einen Hinweis, wenn die Aufgabe keinem Thema zugeordnet ist", async () => {
    const wrapper = mount(MTopicDisplayer, { props: { topic: undefined } });
    await flushPromises();

    expect(wrapper.text()).toContain("isn't classified under a topic");
  });

  it("kann schrumpfen und schneidet nur das Badge per ellipsis ab", async () => {
    const wrapper = mount(MTopicDisplayer, { props: { topic: thema } });
    await flushPromises();

    expect(wrapper.find(".m-topic-displayer").exists()).toBe(true);
    expect(wrapper.get(".m-topic-displayer__badge").classes()).toContain(
      "m-topic-displayer__badge",
    );
  });
});
