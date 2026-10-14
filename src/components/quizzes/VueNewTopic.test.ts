import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Exercise, Topic } from "@/types/quiz";
import VueNewTopic from "./VueNewTopic.vue";

// Die Hierarchie: Elektrotechnik (Schule "Uni Aachen") -> Dioden -> Zehnerdiode.
const themen: Topic[] = [
  {
    _id: "et",
    subject: "elektrotechnik",
    title: "Elektrotechnik",
    tutorial: "",
    school: "Uni Aachen",
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

function aufgabeMit(thema: Topic): Exercise {
  return {
    quiz: "elektrotechnik",
    type: "gapText",
    imageUrl: "",
    topic: thema,
  };
}

function mountTopic(thema: Topic) {
  return mount(VueNewTopic, {
    props: { questionOfQuiz: aufgabeMit(thema), topics: themen },
    global: { stubs: { VueJoditEditor: true } },
  });
}

// jsdom kennt alert() nicht; das Speichern ruft es auf ("... inserted ...").
beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("VueNewTopic: Schule bearbeiten", () => {
  it("zeigt die Schule als editierbares Feld, wenn das Thema kein Elternthema hat", async () => {
    const wrapper = mountTopic(themen[0]);
    await flushPromises();

    const feld = wrapper.get("#topic-school").element as HTMLInputElement;
    expect(feld.disabled).toBe(false);
    expect(feld.value).toBe("Uni Aachen");
  });

  it("speichert eine geaenderte Schule eines Wurzelthemas", async () => {
    let gesendet: Topic | null = null;
    server.use(
      http.put(`${API_URL}/api/topic/et`, async ({ request }) => {
        gesendet = (await request.json()) as Topic;
        return HttpResponse.json(gesendet);
      }),
    );

    const wrapper = mountTopic(themen[0]);
    await flushPromises();

    await wrapper.get("#topic-school").setValue("LMU Muenchen");
    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save")!
      .trigger("click");
    await flushPromises();

    expect(gesendet).toBeTruthy();
    expect(gesendet!.school).toBe("LMU Muenchen");
  });

  it("zeigt bei einem Unterthema nicht editierbar die Schule des aeltesten Vorfahren", async () => {
    const wrapper = mountTopic(themen[2]);
    await flushPromises();

    const feld = wrapper.get("#topic-school").element as HTMLInputElement;
    expect(feld.disabled).toBe(true);
    expect(feld.value).toBe("Uni Aachen");
  });

  it("ueberschreibt die Schule eines Unterthemas beim Speichern nicht", async () => {
    let gesendet: Topic | null = null;
    server.use(
      http.put(`${API_URL}/api/topic/zeh`, async ({ request }) => {
        gesendet = (await request.json()) as Topic;
        return HttpResponse.json(gesendet);
      }),
    );

    const wrapper = mountTopic(themen[2]);
    await flushPromises();

    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save")!
      .trigger("click");
    await flushPromises();

    expect(gesendet).toBeTruthy();
    expect(gesendet!.school).toBeUndefined();
  });
});
