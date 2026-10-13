import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VueImage from "./VueImage.vue";

// Der Inhalt (Frage/Anweisung und Antworten) soll direkt neben dem Bild stehen.
// Die Paginierung soll direkt unter dem Bild stehen, ohne den Inhalt vom Bild
// wegzuschieben. Beides wird ueber das Raster (.vue-image) erreicht: der Inhalt
// liegt neben dem Bild, die Paginierung in der Zeile darunter.
describe("VueImage: Inhalt neben dem Bild, Paginierung darunter", () => {
  it("legt den Inhalt neben das Bild und die Paginierung in den Fuss", () => {
    const wrapper = mount(VueImage, {
      props: { imageUrl: "https://example.com/bild.png" },
      slots: {
        default: "<p>Antworten</p>",
        pagination: '<ul class="pagination"><li>1</li></ul>',
      },
    });

    // Der Inhalt steht im eigenen Bereich neben dem Bild ...
    const inhalt = wrapper.get(".vue-image__inhalt");
    expect(inhalt.find("p").text()).toBe("Antworten");
    // ... und nicht im Fuss, wo die Paginierung steht.
    const fuss = wrapper.get(".vue-image__fuss");
    expect(fuss.find("ul.pagination").exists()).toBe(true);
    expect(fuss.find("p").exists()).toBe(false);

    // Im DOM steht das Bild vor dem Inhalt, beide direkt im Raster.
    const raster = wrapper.get(".vue-image");
    const kinder = Array.from(raster.element.children).map((el) =>
      el.className.split(" ")[0],
    );
    expect(kinder).toEqual([
      "vue-image__img",
      "vue-image__inhalt",
      "vue-image__fuss",
    ]);
  });

  it("blendet den Fuss aus, wenn es keine Paginierung gibt", () => {
    const wrapper = mount(VueImage, {
      props: { imageUrl: "https://example.com/bild.png" },
    });
    expect(wrapper.get(".vue-image__fuss").element.children).toHaveLength(0);
  });
});
