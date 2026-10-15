import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Exercise, Topic } from "@/types/quiz";
import VueNewTopic from "./VueNewTopic.vue";

// Ein Thema ohne Elternthema (die Schule steckt jetzt in der Aufgabe, nicht
// mehr im Thema).
const thema: Topic = {
  _id: "et",
  subject: "elektrotechnik",
  title: "Elektrotechnik",
  tutorial: "<p>Alt</p>",
};

function aufgabeMit(t: Topic): Exercise {
  return {
    quiz: "elektrotechnik",
    type: "gapText",
    imageUrl: "",
    topic: t,
  };
}

function mountTopic(t: Topic) {
  return mount(VueNewTopic, {
    props: { questionOfQuiz: aufgabeMit(t) },
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

describe("VueNewTopic: Tutorial bearbeiten", () => {
  it("zeigt den Titel des Themas in einem Eingabefeld", async () => {
    const wrapper = mountTopic(thema);
    await flushPromises();

    const feld = wrapper.get("#topic-title").element as HTMLInputElement;
    expect(feld.value).toBe("Elektrotechnik");
  });

  it("hat kein school-Feld mehr", async () => {
    const wrapper = mountTopic(thema);
    await flushPromises();

    expect(wrapper.find("#topic-school").exists()).toBe(false);
  });

  it("speichert Titel und Tutorial, aber kein school-Feld", async () => {
    let gesendet: Topic | null = null;
    server.use(
      http.put(`${API_URL}/api/topic/et`, async ({ request }) => {
        gesendet = (await request.json()) as Topic;
        return HttpResponse.json(gesendet);
      }),
    );

    const wrapper = mountTopic(thema);
    await flushPromises();

    await wrapper.get("#topic-title").setValue("Elektrotechnik neu");
    await wrapper
      .findAll("button")
      .find((b) => b.text().trim() === "Save")!
      .trigger("click");
    await flushPromises();

    expect(gesendet).toBeTruthy();
    expect(gesendet!.title).toBe("Elektrotechnik neu");
    // Das Tutorial des Themas bleibt beim Speichern erhalten.
    expect(gesendet!.tutorial).toBe("<p>Alt</p>");
    expect(Object.prototype.hasOwnProperty.call(gesendet!, "school")).toBe(
      false,
    );
  });
});
