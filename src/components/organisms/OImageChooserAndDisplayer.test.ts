import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { findRandomImageUrlOnFacile } from "@/utils/facileImages";
import MPasteImageOrUrl from "@/components/molecules/MPasteImageOrUrl.vue";
import MImageFromKlippyChooser from "@/components/molecules/MImageFromKlippyChooser.vue";
import OImageChooserAndDisplayer from "./OImageChooserAndDisplayer.vue";

vi.mock("@/utils/facileImages", () => ({
  findRandomImageUrlOnFacile: vi.fn(),
}));

const facile = vi.mocked(findRandomImageUrlOnFacile);

beforeEach(() => {
  facile.mockReset();
});

// Ein Host mit echtem v-model, damit die gemeldete Bildadresse wie im Formular
// wieder als Prop hereinkommt. Nur so fuellt sich der Verlauf der Komponente.
function mountHost(start = "") {
  const url = ref(start);
  const wrapper = mount(
    defineComponent({
      setup() {
        return () =>
          h(OImageChooserAndDisplayer, {
            modelValue: url.value,
            "onUpdate:modelValue": (neu: string) => (url.value = neu),
          });
      },
    }),
  );
  return { wrapper, url };
}

describe("OImageChooserAndDisplayer", () => {
  it("setzt das Bild in einen Rahmen und zeigt die Waehler", () => {
    const wrapper = mount(OImageChooserAndDisplayer, {
      props: { modelValue: "https://example.com/cat.png" },
    });

    const bild = wrapper.get("img");
    expect(bild.attributes("src")).toBe("https://example.com/cat.png");
    expect(bild.classes()).toContain("image-chooser-and-displayer__img");
    expect(wrapper.classes()).toContain("image-chooser-and-displayer");
    expect(
      wrapper.find(".image-chooser-and-displayer__bild-wrapper").exists(),
    ).toBe(true);

    expect(wrapper.findComponent(MImageFromKlippyChooser).exists()).toBe(true);
    expect(wrapper.findComponent(MPasteImageOrUrl).exists()).toBe(true);
    expect(
      wrapper.get(".image-chooser-and-displayer__zufall").text(),
    ).toContain("Get random image from Facile");
  });

  it("zeigt ohne Bild kein Bild", () => {
    const wrapper = mount(OImageChooserAndDisplayer);

    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("meldet das von PasteImageOrUrl gemeldete Bild weiter", async () => {
    const wrapper = mount(OImageChooserAndDisplayer);

    wrapper
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/pasted.png");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://example.com/pasted.png",
    ]);
  });

  it("meldet das von ImageFromKlippyChooser gemeldete Bild weiter", async () => {
    const wrapper = mount(OImageChooserAndDisplayer);

    wrapper
      .findComponent(MImageFromKlippyChooser)
      .vm.$emit("update:modelValue", "https://klipy/1.jpg");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://klipy/1.jpg",
    ]);
  });

  it("meldet auf Klick ein zufaelliges Facile-Bild", async () => {
    facile.mockResolvedValue("https://facile/1.jpg");
    const wrapper = mount(OImageChooserAndDisplayer);

    await wrapper.get(".image-chooser-and-displayer__zufall").trigger("click");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://facile/1.jpg",
    ]);
  });

  it("zeigt einen Fehler, wenn kein Facile-Bild gefunden wird", async () => {
    facile.mockRejectedValue(new Error("Kein Bild gefunden"));
    const wrapper = mount(OImageChooserAndDisplayer);

    await wrapper.get(".image-chooser-and-displayer__zufall").trigger("click");
    await flushPromises();

    expect(wrapper.text()).toContain("Kein Bild gefunden");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("zeigt kleine Undo- und Redo-Knoepfe mit Bootstrap-Symbolen", () => {
    const wrapper = mount(OImageChooserAndDisplayer, {
      props: { modelValue: "https://example.com/cat.png" },
    });

    const knoepfe = wrapper.findAll(".image-chooser-and-displayer__verlauf");
    expect(knoepfe).toHaveLength(2);
    expect(knoepfe[0].find("i").classes()).toContain(
      "bi-arrow-counterclockwise",
    );
    expect(knoepfe[1].find("i").classes()).toContain("bi-arrow-clockwise");
    // Ohne vorherige bzw. naechste Auswahl gibt es nichts zu tun.
    expect(knoepfe[0].attributes("disabled")).toBeDefined();
    expect(knoepfe[1].attributes("disabled")).toBeDefined();
  });

  it("geht mit Rueckgaengig zum vorherigen Bild und mit Wiederholen wieder vor", async () => {
    const { wrapper, url } = mountHost();
    const waehler = wrapper.findComponent(OImageChooserAndDisplayer);

    waehler
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/1.png");
    await flushPromises();
    waehler
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/2.png");
    await flushPromises();
    expect(url.value).toBe("https://example.com/2.png");

    await waehler
      .findAll(".image-chooser-and-displayer__verlauf")[0]
      .trigger("click");
    expect(url.value).toBe("https://example.com/1.png");

    await waehler
      .findAll(".image-chooser-and-displayer__verlauf")[1]
      .trigger("click");
    expect(url.value).toBe("https://example.com/2.png");
  });

  it("verwirft den Redo-Zweig, wenn danach ein neues Bild gewaehlt wird", async () => {
    const { wrapper, url } = mountHost();
    const waehler = wrapper.findComponent(OImageChooserAndDisplayer);

    waehler
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/1.png");
    await flushPromises();
    waehler
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/2.png");
    await flushPromises();

    await waehler
      .findAll(".image-chooser-and-displayer__verlauf")[0]
      .trigger("click");
    expect(url.value).toBe("https://example.com/1.png");

    waehler
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/3.png");
    await flushPromises();
    expect(url.value).toBe("https://example.com/3.png");

    const redo = waehler.findAll(".image-chooser-and-displayer__verlauf")[1];
    expect(redo.attributes("disabled")).toBeDefined();
  });
});
