import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VueImage from "./VueImage.vue";

// Die Paginierung (der Slot "pagination") soll direkt unter dem Bild stehen:
// also in derselben Spalte und im DOM nach dem Bild.
describe("VueImage: Paginierung direkt unter dem Bild", () => {
  it("setzt die Paginierung in die Bildspalte, nach dem Bild", () => {
    const wrapper = mount(VueImage, {
      props: { imageUrl: "https://example.com/bild.png" },
      slots: {
        pagination: '<ul class="pagination"><li>1</li></ul>',
        default: "<p>Antworten</p>",
      },
    });

    // Die linke Spalte enthaelt Bild und Paginierung.
    const spalte = wrapper.get(".d-flex.flex-column");
    expect(spalte.find("img.vue-image__img").exists()).toBe(true);
    expect(spalte.find("ul.pagination").exists()).toBe(true);

    // Das Bild steht im DOM vor der Paginierung.
    const html = spalte.html();
    expect(html.indexOf("vue-image__img")).toBeLessThan(
      html.indexOf("pagination")
    );

    // Die Antworten stehen ausserhalb der Bildspalte (rechts daneben).
    expect(spalte.find("p").exists()).toBe(false);
  });
});
