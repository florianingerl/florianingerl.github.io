import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Topic } from "@/types/quiz";
import VueTopicFilter from "@/components/quizzes/VueTopicFilter.vue";
import MTopicCreator from "@/components/molecules/MTopicCreator.vue";
import OTopicChooserAndCreator from "./OTopicChooserAndCreator.vue";

const themen: Topic[] = [
  {
    _id: "et",
    subject: "english",
    title: "Elektrotechnik",
    tutorial: "",
  },
  {
    _id: "dio",
    subject: "english",
    title: "Dioden",
    tutorial: "",
    parentId: "et",
  },
];

beforeEach(() => {
  server.use(
    http.get(`${API_URL}/api/topic/english`, () => HttpResponse.json(themen)),
  );
});

describe("OTopicChooserAndCreator", () => {
  it("laedt die Themen und gibt sie an den Themen-Baum weiter", async () => {
    const wrapper = mount(OTopicChooserAndCreator, {
      props: { subject: "english" },
    });
    await flushPromises();

    expect(wrapper.text()).toContain("Choose a topic (from tree):");
    expect(wrapper.findComponent(VueTopicFilter).props("topics")).toEqual(
      themen,
    );
    // Ohne Auswahl gibt es kein Elternthema.
    expect(wrapper.findComponent(MTopicCreator).props("parentTopic")).toBeNull();
  });

  it("meldet eine Auswahl und gibt sie als Elternthema weiter", async () => {
    const wrapper = mount(OTopicChooserAndCreator, {
      props: { subject: "english" },
    });
    await flushPromises();

    // Den Baum aufklappen und "Elektrotechnik" waehlen.
    await wrapper.findComponent(VueTopicFilter).get("button").trigger("click");
    const knoten = wrapper
      .findAll(".p-treenode-content")
      .find((n) => n.text().includes("Elektrotechnik"));
    expect(knoten).toBeTruthy();
    await knoten!.trigger("click");
    await flushPromises();

    expect(wrapper.emitted("topic-selected")?.at(-1)).toEqual([themen[0]]);
    expect(wrapper.findComponent(MTopicCreator).props("parentTopic")).toEqual(
      themen[0],
    );
  });

  it("uebernimmt ein neu angelegtes Thema in den Baum und waehlt es", async () => {
    const wrapper = mount(OTopicChooserAndCreator, {
      props: { subject: "english" },
    });
    await flushPromises();

    const neu: Topic = {
      _id: "zeh",
      subject: "english",
      title: "Zehnerdiode",
      tutorial: "",
      parentId: "dio",
    };
    wrapper.findComponent(MTopicCreator).vm.$emit("topic-created", neu);
    await flushPromises();

    // Das neue Thema haengt an den Themen des Baumes ...
    const filter = wrapper.findComponent(VueTopicFilter);
    expect((filter.props("topics") as Topic[]).at(-1)).toEqual(neu);
    // ... und ist dort ausgewaehlt, sodass sein Pfad angezeigt wird.
    expect(filter.props("modelValue")).toBe("zeh");
    expect(wrapper.text()).toContain("Elektrotechnik->Dioden->Zehnerdiode");
    // Die Anlage wird nach aussen weitergemeldet.
    expect(wrapper.emitted("topic-created")?.[0][0]).toEqual(neu);
  });

  it("behaelt ein waehrend des Ladens angelegtes Thema als Elternthema", async () => {
    // Die Anfangsliste kommt erst NACH dem Anlegen des ersten Themas an. Ohne
    // Zusammenfuehren wuerde sie das neue Thema verdraengen und das zweite
    // Thema haette kein Elternhema mehr.
    let freigeben!: () => void;
    const anfangsListe = new Promise<Response>((res) => {
      freigeben = () => res(HttpResponse.json(themen));
    });
    let zaehler = 0;
    let letzterBody: Topic | null = null;
    server.use(
      http.get(`${API_URL}/api/topic/english`, () => anfangsListe),
      http.post(`${API_URL}/api/topic`, async ({ request }) => {
        letzterBody = (await request.json()) as Topic;
        return HttpResponse.json<Topic>(
          { ...letzterBody, _id: `neu${++zaehler}` },
          { status: 201 },
        );
      }),
    );

    const wrapper = mount(OTopicChooserAndCreator, {
      props: { subject: "english" },
    });
    await flushPromises();

    const erstellen = wrapper.findComponent(MTopicCreator);
    await erstellen.get("input").setValue("Grammaire");
    await erstellen
      .findAll("button")
      .find((b) => b.text().trim() === "Add")!
      .trigger("click");
    await flushPromises();

    // Jetzt trifft die urspruenglich angeforderte Themenliste ein.
    freigeben();
    await flushPromises();

    await erstellen.get("input").setValue("Pronoms");
    await erstellen
      .findAll("button")
      .find((b) => b.text().trim() === "Add")!
      .trigger("click");
    await flushPromises();

    // "Pronoms" wurde mit "Grammaire" als Eltern gespeichert ...
    expect(letzterBody).toMatchObject({ title: "Pronoms", parentId: "neu1" });
    // ... und haengt im Baum darunter.
    expect(wrapper.text()).toContain("Grammaire->Pronoms");
  });
});
