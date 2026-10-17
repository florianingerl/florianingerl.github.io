import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { searchKlipyImages } from "@/utils/klipy";
import MImageFromKlippyChooser from "./MImageFromKlippyChooser.vue";

vi.mock("@/utils/klipy", () => ({
  searchKlipyImages: vi.fn(),
}));

const suche = vi.mocked(searchKlipyImages);

beforeEach(() => {
  suche.mockReset();
  suche.mockResolvedValue(["https://klipy/1.jpg", "https://klipy/2.jpg"]);
});

describe("MImageFromKlippyChooser", () => {
  it("zeigt ein Suchfeld und die Schaltflaeche mit Tooltip", () => {
    const wrapper = mount(MImageFromKlippyChooser);

    const knopf = wrapper.get("button");
    expect(knopf.text()).toContain("Search image on Klippy");
    expect(knopf.attributes("title")).toBe("Search image on Klippy");
    expect(wrapper.find("input").exists()).toBe(true);
    expect(knopf.classes()).toContain("btn-secondary");
  });

  it("sucht mit dem Suchbegriff und meldet die gefundenen Bilder nacheinander", async () => {
    const wrapper = mount(MImageFromKlippyChooser);

    await wrapper.get("input").setValue("Haus");
    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(suche).toHaveBeenCalledWith("Haus", 1);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://klipy/1.jpg",
    ]);

    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([
      "https://klipy/2.jpg",
    ]);
  });

  it("sucht ohne Suchbegriff nicht", async () => {
    const wrapper = mount(MImageFromKlippyChooser);

    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(suche).not.toHaveBeenCalled();
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("zeigt einen Fehler, wenn die Suche fehlschlaegt", async () => {
    suche.mockRejectedValue(new Error("Klipy request failed: 500"));
    const wrapper = mount(MImageFromKlippyChooser);

    await wrapper.get("input").setValue("Haus");
    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(wrapper.text()).toContain("Klipy request failed: 500");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });
});
