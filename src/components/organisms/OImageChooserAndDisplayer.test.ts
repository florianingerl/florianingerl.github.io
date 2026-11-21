import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h, ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { i18n } from "@/i18n";
import { findRandomImageUrlOnFacile } from "@/utils/facileImages";
import MPasteImageOrUrl from "@/components/molecules/MPasteImageOrUrl.vue";
import MImageFromKlippyChooser from "@/components/molecules/MImageFromKlippyChooser.vue";
import OImageDrawer from "./OImageDrawer.vue";
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
function mountHost(start = "", jsonStart = "") {
  const url = ref(start);
  const jsonUrl = ref(jsonStart);
  const wrapper = mount(
    defineComponent({
      setup() {
        return () =>
          h(OImageChooserAndDisplayer, {
            modelValue: url.value,
            imageJsonUrl: jsonUrl.value,
            "onUpdate:modelValue": (neu: string) => (url.value = neu),
            "onUpdate:imageJsonUrl": (neu: string) => (jsonUrl.value = neu),
          });
      },
    }),
    { global: { plugins: [i18n] } },
  );
  return { wrapper, url, jsonUrl };
}

describe("OImageChooserAndDisplayer", () => {
  it("setzt das Bild in einen Rahmen und zeigt die Waehler", () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] },
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
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] } });

    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("meldet das von PasteImageOrUrl gemeldete Bild weiter", async () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] } });

    wrapper
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/pasted.png");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://example.com/pasted.png",
    ]);
    expect(wrapper.emitted("update:imageJsonUrl")?.[0]).toEqual([""]);
  });

  it("meldet das von ImageFromKlippyChooser gemeldete Bild weiter", async () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] } });

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
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] } });

    await wrapper.get(".image-chooser-and-displayer__zufall").trigger("click");
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://facile/1.jpg",
    ]);
  });

  it("zeigt einen Fehler, wenn kein Facile-Bild gefunden wird", async () => {
    facile.mockRejectedValue(new Error("Kein Bild gefunden"));
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] } });

    await wrapper.get(".image-chooser-and-displayer__zufall").trigger("click");
    await flushPromises();

    expect(wrapper.text()).toContain("Kein Bild gefunden");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("zeigt kleine Undo- und Redo-Knoepfe mit Bootstrap-Symbolen", () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] },
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

  it("ersetzt den Waehler durch den Zeichner, wenn 'Draw image yourself' geklickt wird", async () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] }, shallow: true });

    await wrapper.get(".image-chooser-and-displayer__zeichnen").trigger("click");

    expect(wrapper.findComponent(OImageDrawer).exists()).toBe(true);
    expect(wrapper.findComponent(MPasteImageOrUrl).exists()).toBe(false);
  });

  it("meldet die gespeicherte Zeichnung und schliesst den Zeichner wieder", async () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] }, shallow: true });

    await wrapper.get(".image-chooser-and-displayer__zeichnen").trigger("click");
    wrapper.findComponent(OImageDrawer).vm.$emit("saved", {
      url: "/api/image/drawn.png",
      jsonUrl: "/api/image/drawn.json",
    });
    await flushPromises();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "/api/image/drawn.png",
    ]);
    expect(wrapper.emitted("update:imageJsonUrl")?.[0]).toEqual([
      "/api/image/drawn.json",
    ]);
    expect(wrapper.findComponent(OImageDrawer).exists()).toBe(false);
    expect(wrapper.findComponent(MPasteImageOrUrl).exists()).toBe(true);
  });

  it("verwirft die JSON-Adresse bei einer anderen Bildauswahl und stellt sie beim Rueckgaengig wieder her", async () => {
    const { wrapper, url, jsonUrl } = mountHost();
    const waehler = wrapper.findComponent(OImageChooserAndDisplayer);

    await waehler.get(".image-chooser-and-displayer__zeichnen").trigger("click");
    waehler.findComponent(OImageDrawer).vm.$emit("saved", {
      url: "/api/image/drawn.png",
      jsonUrl: "/api/image/drawn.json",
    });
    await flushPromises();
    expect(url.value).toBe("/api/image/drawn.png");
    expect(jsonUrl.value).toBe("/api/image/drawn.json");

    waehler
      .findComponent(MPasteImageOrUrl)
      .vm.$emit("update:modelValue", "https://example.com/other.png");
    await flushPromises();
    expect(url.value).toBe("https://example.com/other.png");
    expect(jsonUrl.value).toBe("");

    await waehler
      .findAll(".image-chooser-and-displayer__verlauf")[0]
      .trigger("click");
    expect(url.value).toBe("/api/image/drawn.png");
    expect(jsonUrl.value).toBe("/api/image/drawn.json");
  });

  it("schliesst den Zeichner beim Abbrechen ohne neue Bildmeldung", async () => {
    const wrapper = mount(OImageChooserAndDisplayer, { global: { plugins: [i18n] }, shallow: true });

    await wrapper.get(".image-chooser-and-displayer__zeichnen").trigger("click");
    wrapper.findComponent(OImageDrawer).vm.$emit("cancel");
    await flushPromises();

    expect(wrapper.findComponent(OImageDrawer).exists()).toBe(false);
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    expect(wrapper.emitted("update:imageJsonUrl")).toBeFalsy();
  });
});
