import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { School } from "@/types/quiz";
import MSchoolChooser from "@/components/molecules/MSchoolChooser.vue";
import MSchoolCreator from "@/components/molecules/MSchoolCreator.vue";
import OSchoolChooserAndCreator from "./OSchoolChooserAndCreator.vue";

const vomServer: School[] = [
  { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
  { _id: "s2", name: "LMU Muenchen" },
];

beforeEach(() => {
  server.use(
    http.get(`${API_URL}/api/school`, () => HttpResponse.json(vomServer)),
  );
});

describe("OSchoolChooserAndCreator", () => {
  it("laedt die Schulen und gibt sie an den Schullaender weiter", async () => {
    const wrapper = mount(OSchoolChooserAndCreator);
    await flushPromises();

    expect(wrapper.text()).toContain("School:");
    expect(wrapper.text()).toContain("New school");
    expect(wrapper.findComponent(MSchoolChooser).props("schools")).toEqual(
      vomServer,
    );
    expect(wrapper.findComponent(MSchoolCreator).exists()).toBe(true);
  });

  it("meldet die Auswahl ueber v-model und school-selected", async () => {
    const wrapper = mount(OSchoolChooserAndCreator);
    await flushPromises();

    await wrapper.findComponent(MSchoolChooser).get("select").setValue("s2");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["s2"]);
    expect(wrapper.emitted("school-selected")?.[0]).toEqual([vomServer[1]]);
  });

  it("waehlt nach dem Anlegen die neue Schule aus und meldet sie", async () => {
    const wrapper = mount(OSchoolChooserAndCreator);
    await flushPromises();

    // Eine neue Schule wird ueber den MSchoolCreator gemeldet.
    const neu: School = { _id: "neu", name: "Uni Aachen" };
    wrapper.findComponent(MSchoolCreator).vm.$emit("school-created", neu);
    await flushPromises();

    // Die Anlage wird nach aussen gemeldet ...
    expect(wrapper.emitted("school-created")?.[0][0]).toEqual(neu);
    // ... die neue Schule steht in der Liste ...
    const chooser = wrapper.findComponent(MSchoolChooser);
    expect((chooser.props("schools") as School[]).map((s) => s._id)).toContain(
      "neu",
    );
    // ... und ist ausgewaehlt.
    expect(chooser.props("modelValue")).toBe("neu");
  });

  it("behaelt eine neu angelegte Schule, wenn der Server sie (noch) nicht liefert", async () => {
    // Der Server liefert beim erneuten Laden eine Liste ohne die neue Schule.
    server.use(http.get(`${API_URL}/api/school`, () => HttpResponse.json([])));
    const wrapper = mount(OSchoolChooserAndCreator);
    await flushPromises();

    const neu: School = { _id: "neu", name: "Uni Aachen" };
    wrapper.findComponent(MSchoolCreator).vm.$emit("school-created", neu);
    await flushPromises();

    const chooser = wrapper.findComponent(MSchoolChooser);
    const optionen = (chooser.props("schools") as School[]).map((s) => s._id);
    expect(optionen).toContain("neu");
    expect(chooser.props("modelValue")).toBe("neu");
  });
});
