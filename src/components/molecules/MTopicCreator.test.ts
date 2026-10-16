import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Topic } from "@/types/quiz";
import MTopicCreator from "./MTopicCreator.vue";

const elternThema: Topic = {
  _id: "et",
  subject: "english",
  title: "Elektrotechnik",
  tutorial: "",
};

// Merkt sich den an den "Server" (MSW) geschickten Themen-Body.
function postFangen(): { gesendet: () => Topic | null } {
  let body: Topic | null = null;
  server.use(
    http.post(`${API_URL}/api/topic`, async ({ request }) => {
      body = (await request.json()) as Topic;
      return HttpResponse.json<Topic>({ ...body, _id: "neu" }, { status: 201 });
    }),
  );
  return { gesendet: () => body };
}

describe("MTopicCreator: neues Thema anlegen", () => {
  it("zeigt Beschriftung, Textfeld und Add-Knopf", () => {
    const wrapper = mount(MTopicCreator, {
      props: { subject: "english", parentTopic: elternThema },
    });

    expect(wrapper.text()).toContain("New topic:");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.get("button").text()).toBe("Add");
  });

  it("legt das Thema als Kind des Elternthemas an und meldet es", async () => {
    const { gesendet } = postFangen();
    const wrapper = mount(MTopicCreator, {
      props: { subject: "english", quiz: "english", parentTopic: elternThema },
    });

    await wrapper.get("input").setValue("Dioden");
    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(gesendet()).toMatchObject({
      subject: "english",
      title: "Dioden",
      tutorial: "",
      quiz: "english",
      parentId: "et",
    });
    expect(wrapper.emitted("topic-created")?.[0][0]).toMatchObject({
      _id: "neu",
      title: "Dioden",
      parentId: "et",
    });
    // Das Textfeld ist nach dem Anlegen wieder leer.
    expect((wrapper.get("input").element as HTMLInputElement).value).toBe("");
  });

  it("legt ohne gewaehltes Elternthema ein Wurzelthema an", async () => {
    const { gesendet } = postFangen();
    const wrapper = mount(MTopicCreator, {
      props: { subject: "english", parentTopic: null },
    });

    await wrapper.get("input").setValue("Grammatik");
    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(gesendet()?.parentId).toBeUndefined();
    expect(wrapper.emitted("topic-created")).toBeTruthy();
  });

  it("legt ohne Titel nichts an", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    let angefragt = false;
    server.use(
      http.post(`${API_URL}/api/topic`, () => {
        angefragt = true;
        return HttpResponse.json({}, { status: 201 });
      }),
    );

    const wrapper = mount(MTopicCreator, {
      props: { subject: "english", parentTopic: null },
    });

    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(alertSpy).toHaveBeenCalled();
    expect(angefragt).toBe(false);
    expect(wrapper.emitted("topic-created")).toBeFalsy();
    alertSpy.mockRestore();
  });
});
