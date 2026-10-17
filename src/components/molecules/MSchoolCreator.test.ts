import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { School } from "@/types/quiz";
import MSchoolCreator from "./MSchoolCreator.vue";

// Der "Add"-Knopf (neben ihm gibt es noch den Umschalt-Knopf fuer den schmalen
// Zustand).
function addKnopf(wrapper: VueWrapper) {
  return wrapper.findAll("button").find((b) => b.text().trim() === "Add")!;
}

// Merkt sich den an den "Server" (MSW) geschickten Namen.
function postFangen(): { gesendet: () => string | null } {
  let name: string | null = null;
  server.use(
    http.post(`${API_URL}/api/school`, async ({ request }) => {
      name = ((await request.json()) as School).name;
      return HttpResponse.json({ _id: "neu", name }, { status: 201 });
    }),
  );
  return { gesendet: () => name };
}

describe("MSchoolCreator: neue Schule anlegen", () => {
  it("zeigt Beschriftung, Textfeld und Add-Knopf", () => {
    const wrapper = mount(MSchoolCreator);

    expect(wrapper.text()).toContain("New school");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(addKnopf(wrapper).text()).toBe("Add");
  });

  it("legt die Schule an und meldet sie", async () => {
    const { gesendet } = postFangen();
    const wrapper = mount(MSchoolCreator);

    await wrapper.get("input").setValue("Uni Aachen");
    await addKnopf(wrapper).trigger("click");
    await flushPromises();

    expect(gesendet()).toBe("Uni Aachen");
    expect(wrapper.emitted("school-created")?.[0][0]).toMatchObject({
      _id: "neu",
      name: "Uni Aachen",
    });
    // Das Textfeld ist nach dem Anlegen wieder leer.
    expect((wrapper.get("input").element as HTMLInputElement).value).toBe("");
  });

  it("legt ohne Namen nichts an", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    let angefragt = false;
    server.use(
      http.post(`${API_URL}/api/school`, () => {
        angefragt = true;
        return HttpResponse.json({}, { status: 201 });
      }),
    );

    const wrapper = mount(MSchoolCreator);

    await addKnopf(wrapper).trigger("click");
    await flushPromises();

    expect(alertSpy).toHaveBeenCalled();
    expect(angefragt).toBe(false);
    expect(wrapper.emitted("school-created")).toBeFalsy();
    alertSpy.mockRestore();
  });

  it("klappt im schmalen Zustand ein Overlay auf und per Escape wieder zu", async () => {
    const wrapper = mount(MSchoolCreator, { attachTo: document.body });

    const umschalter = wrapper.get(".school-creator__toggle");
    await umschalter.trigger("click");
    expect(wrapper.classes()).toContain("school-creator--open");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();
    expect(wrapper.classes()).not.toContain("school-creator--open");

    wrapper.unmount();
  });

  it("schliesst das Overlay bei einem Klick ausserhalb", async () => {
    const wrapper = mount(MSchoolCreator, { attachTo: document.body });

    await wrapper.get(".school-creator__toggle").trigger("click");
    expect(wrapper.classes()).toContain("school-creator--open");

    document.dispatchEvent(new MouseEvent("mousedown"));
    await nextTick();
    expect(wrapper.classes()).not.toContain("school-creator--open");

    wrapper.unmount();
  });

  it("schliesst das Overlay nach dem Anlegen", async () => {
    postFangen();
    const wrapper = mount(MSchoolCreator, { attachTo: document.body });

    await wrapper.get(".school-creator__toggle").trigger("click");
    await wrapper.get("input").setValue("Uni Aachen");
    await addKnopf(wrapper).trigger("click");
    await flushPromises();

    expect(wrapper.classes()).not.toContain("school-creator--open");
    wrapper.unmount();
  });
});
