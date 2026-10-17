import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { School } from "@/types/quiz";
import MSchoolCreator from "./MSchoolCreator.vue";

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
    expect(wrapper.get("button").text()).toBe("Add");
  });

  it("legt die Schule an und meldet sie", async () => {
    const { gesendet } = postFangen();
    const wrapper = mount(MSchoolCreator);

    await wrapper.get("input").setValue("Uni Aachen");
    await wrapper.get("button").trigger("click");
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

    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(alertSpy).toHaveBeenCalled();
    expect(angefragt).toBe(false);
    expect(wrapper.emitted("school-created")).toBeFalsy();
    alertSpy.mockRestore();
  });
});
