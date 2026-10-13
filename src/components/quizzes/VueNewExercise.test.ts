import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import VueImage from "./VueImage.vue";
import VueNewExercise, { bildUrl, uploadPastedImage } from "./VueNewExercise.vue";

// Das Formular laedt beim Anlegen die Themen des Faches. Ohne diesen Handler
// wuerde MSW die Anfrage als unerwartet melden.
beforeEach(() => {
  server.use(http.get(`${API_URL}/api/topic/english`, () => HttpResponse.json([])));
});

async function mountForm() {
  const wrapper = mount(VueNewExercise, {
    props: { quiz: "english", editMode: false },
    shallow: true,
  });
  await flushPromises();
  return wrapper;
}

describe("VueNewExercise: benutzerdefiniertes Bild", () => {
  it("uebernimmt eine eingetippte URL als Bild der Aufgabe", async () => {
    const wrapper = await mountForm();

    await wrapper.get("#imageUrlInput").setValue("https://example.com/cat.png");
    const knopf = wrapper
      .findAll("button")
      .find((b) => b.text() === "Get image");
    expect(knopf).toBeTruthy();
    await knopf!.trigger("click");

    expect(wrapper.findComponent(VueImage).props("imageUrl")).toBe(
      "https://example.com/cat.png",
    );
  });

  it("schickt ein eingefuegtes Bild zum Server und nimmt die Antwort-URL", async () => {
    let gesendeteDatenUrl = "";
    server.use(
      http.post(`${API_URL}/api/image`, async ({ request }) => {
        const body = (await request.json()) as { dataUrl: string };
        gesendeteDatenUrl = body.dataUrl;
        return HttpResponse.json(
          { id: "abc", url: "/api/image/abc", remaining: 1 },
          { status: 201 },
        );
      }),
    );

    const datei = new File([new Uint8Array([137, 80, 78, 71])], "cat.png", {
      type: "image/png",
    });
    const url = await uploadPastedImage(datei);

    expect(gesendeteDatenUrl.startsWith("data:image/png;base64,")).toBe(true);
    expect(url).toBe(`${API_URL}/api/image/abc`);
  });

  it("laesst fremde absolute URLs unveraendert", async () => {
    server.use(
      http.post(`${API_URL}/api/image`, () =>
        HttpResponse.json(
          { id: "abc", url: "https://cdn.example.com/abc.png", remaining: 1 },
          { status: 201 },
        ),
      ),
    );

    const datei = new File([new Uint8Array([1, 2, 3])], "cat.png", {
      type: "image/png",
    });
    expect(await uploadPastedImage(datei)).toBe(
      "https://cdn.example.com/abc.png",
    );
  });

  it("laedt Server-Bilder ueber API_URL, auch bei http-Antwort", () => {
    expect(bildUrl("/api/image/abc")).toBe(`${API_URL}/api/image/abc`);
    expect(bildUrl("http://14ofbe9.cserverhost.cloud/api/image/abc")).toBe(
      `${API_URL}/api/image/abc`,
    );
    expect(bildUrl("https://example.com/x.jpg")).toBe(
      "https://example.com/x.jpg",
    );
  });
});
