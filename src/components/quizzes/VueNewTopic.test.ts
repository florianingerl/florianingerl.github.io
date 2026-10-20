import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import ToastEventBus, { type ToastMessage } from "primevue/toasteventbus";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { i18n } from "@/i18n";
import { server } from "@/mocks/server";
import type { Exercise, Topic } from "@/types/quiz";
import MTopicChooser from "@/components/molecules/MTopicChooser.vue";
import VueNewTopic from "./VueNewTopic.vue";

// Ein Thema ohne Elternthema (die Schule steckt jetzt in der Aufgabe, nicht
// mehr im Thema).
const thema: Topic = {
  _id: "et",
  subject: "elektrotechnik",
  title: "Elektrotechnik",
  tutorial: "<p>Alt</p>",
};

// Ein Kindthema des Themas "et".
const diodenThema: Topic = {
  _id: "dio",
  subject: "elektrotechnik",
  title: "Dioden",
  tutorial: "",
  parentId: "et",
};

// Ein zweites Wurzelthema, das als neues Elternthema dienen kann.
const matheThema: Topic = {
  _id: "mathe",
  subject: "elektrotechnik",
  title: "Mathematik",
  tutorial: "",
};

// Alle Themen des Faches, aus denen das Elternthema gewaehlt wird.
const themen: Topic[] = [thema, diodenThema, matheThema];

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

// Fehlerpfade rufen alert() auf; jsdom kennt alert() nicht, deshalb mocken.
beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
  // VueNewTopic laedt die Themen fuer die Auswahl des Elternthemas.
  server.use(
    http.get(`${API_URL}/api/topic/elektrotechnik`, () =>
      HttpResponse.json(themen),
    ),
  );
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
    // Save ist der submit-Knopf des Formulars; in jsdom loest ein Klick auf
    // type="submit" keinen submit-Event aus, deshalb direkt submit ausloesen.
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(gesendet).toBeTruthy();
    expect(gesendet!.title).toBe("Elektrotechnik neu");
    // Das Tutorial des Themas bleibt beim Speichern erhalten.
    expect(gesendet!.tutorial).toBe("<p>Alt</p>");
    expect(Object.prototype.hasOwnProperty.call(gesendet!, "school")).toBe(
      false,
    );
  });

  it("zeigt nach dem Speichern einen Erfolgs-Toast statt alert", async () => {
    i18n.global.locale.value = "de";
    const toasts: ToastMessage[] = [];
    const onAdd = (message: ToastMessage) => toasts.push(message);
    ToastEventBus.on("add", onAdd);
    server.use(
      http.put(`${API_URL}/api/topic/et`, async ({ request }) =>
        HttpResponse.json(await request.json()),
      ),
    );

    const wrapper = mountTopic(thema);
    await flushPromises();

    await wrapper.find("form").trigger("submit");
    await flushPromises();
    ToastEventBus.off("add", onAdd);

    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toMatchObject({
      severity: "success",
      summary: "Das Tutorial wurde erfolgreich in der Datenbank gespeichert.",
    });
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("Save ist der submit-Knopf des Formulars und beide Knopfe tragen ein Icon", async () => {
    const wrapper = mountTopic(thema);
    await flushPromises();

    const form = wrapper.get("form");
    const knoepfe = form.findAll("button");
    const save = knoepfe.find((b) => b.text().trim() === "Save")!;
    const cancel = knoepfe.find((b) => b.text().trim() === "Cancel")!;

    expect(save.attributes("type")).toBe("submit");
    expect(save.find("i.bi-save").exists()).toBe(true);
    expect(cancel.attributes("type")).toBe("button");
    expect(cancel.find("i.bi-x-lg").exists()).toBe(true);

    // Der Titel steht im Formular: Enter in ihm loest Save aus.
    expect(form.find("#topic-title").exists()).toBe(true);
  });
});

describe("VueNewTopic: Elternthema aendern", () => {
  it("belegt das Elternthema mit dem parentId des Themas vor", async () => {
    const wrapper = mountTopic(diodenThema);
    await flushPromises();

    expect(wrapper.findComponent(MTopicChooser).props("modelValue")).toBe("et");
  });

  it("speichert ein neu gewaehltes Elternthema", async () => {
    let gesendet: Topic | null = null;
    server.use(
      http.put(`${API_URL}/api/topic/et`, async ({ request }) => {
        gesendet = (await request.json()) as Topic;
        return HttpResponse.json(gesendet);
      }),
    );

    const wrapper = mountTopic(thema);
    await flushPromises();

    wrapper.findComponent(MTopicChooser).vm.$emit("update:modelValue", "mathe");
    await flushPromises();

    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(gesendet!.parentId).toBe("mathe");
  });

  it("entfernt das Elternthema, wenn keins mehr gewaehlt ist", async () => {
    let gesendet: Topic | null = null;
    server.use(
      http.put(`${API_URL}/api/topic/dio`, async ({ request }) => {
        gesendet = (await request.json()) as Topic;
        return HttpResponse.json(gesendet);
      }),
    );

    const wrapper = mountTopic(diodenThema);
    await flushPromises();

    // Die Auswahl im Baum leeren.
    wrapper.findComponent(MTopicChooser).vm.$emit("update:modelValue", "");
    await flushPromises();

    await wrapper.find("form").trigger("submit");
    await flushPromises();

    // null statt undefined: nur so entfernt der Server das Elternthema.
    expect(gesendet!.parentId).toBeNull();
  });

  it("bietet das Thema selbst und seine Nachfahren nicht als Elternthema an", async () => {
    const wrapper = mountTopic(thema);
    await flushPromises();

    const angeboten = wrapper
      .findComponent(MTopicChooser)
      .props("topics") as Topic[];
    const ids = angeboten.map((t) => t._id);

    // "et" selbst und das Kind "dio" fehlen, "mathe" bleibt waehlbar.
    expect(ids).not.toContain("et");
    expect(ids).not.toContain("dio");
    expect(ids).toContain("mathe");
  });
});
