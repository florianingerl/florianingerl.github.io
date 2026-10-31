import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { i18n } from "@/i18n";
import OPreiseSection from "./OPreiseSection.vue";

function mountSection() {
  i18n.global.locale.value = "de";
  return mount(OPreiseSection, {
    global: { plugins: [i18n] },
    attachTo: document.body,
  });
}

function dialog(): HTMLElement | null {
  return document.body.querySelector(".contract-dialog");
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("OPreiseSection", () => {
  it("zeigt je einen Vertragsbutton pro Lernpaket", () => {
    const wrapper = mountSection();
    expect(wrapper.get("#contract-open-four-hour").text()).toBe("Vertrag erstellen");
    expect(wrapper.find("#contract-open-all-or-nothing").exists()).toBe(true);
  });

  it("oeffnet den Dialog fuer das 4-Stunden-Lernpaket mit 132 Euro", async () => {
    const wrapper = mountSection();
    await wrapper.get("#contract-open-four-hour").trigger("click");
    await nextTick();

    const el = dialog();
    expect(el).not.toBeNull();
    expect(el?.textContent).toContain("4-Stunden-Lernpaket mit Bonus: Vertrag erstellen");
    expect(el?.textContent).toContain("132");
    expect(el?.textContent).toContain("6 Euro pro Stunde");
    expect(el?.textContent).not.toContain("Alles-oder-Nichts-Paket: Vertrag erstellen");
  });

  it("schliesst den 4-Stunden-Dialog ueber Abbrechen", async () => {
    const wrapper = mountSection();
    await wrapper.get("#contract-open-four-hour").trigger("click");
    await nextTick();

    const cancel = Array.from(dialog()?.querySelectorAll("button") ?? []).find(
      (button) => button.textContent?.trim() === "Abbrechen"
    );
    expect(cancel).toBeDefined();
    cancel?.click();
    await nextTick();

    expect(dialog()).toBeNull();
  });

  it("oeffnet weiterhin den Alles-oder-Nichts-Dialog", async () => {
    const wrapper = mountSection();
    await wrapper.get("#contract-open-all-or-nothing").trigger("click");
    await nextTick();

    expect(dialog()?.textContent).toContain("Alles-oder-Nichts-Paket: Vertrag erstellen");
  });
});
