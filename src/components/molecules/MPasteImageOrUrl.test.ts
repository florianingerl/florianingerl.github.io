import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import MPasteImageOrUrl from "./MPasteImageOrUrl.vue";

function bildDatei(): File {
  return new File([new Uint8Array([1, 2, 3])], "cat.png", { type: "image/png" });
}

// Loest ein echtes Einfuegen (Strg+V) mit einem Bild aus. jsdom erzeugt kein
// ClipboardEvent mit Daten, deshalb wird clipboardData von Hand gesetzt.
async function bildEinfuegen(wrapper: ReturnType<typeof mount>): Promise<void> {
  const input = wrapper.get("input").element as HTMLInputElement;
  const event = new Event("paste", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "clipboardData", {
    value: { files: [bildDatei()], items: [] } as unknown as DataTransfer,
  });
  input.dispatchEvent(event);
  await flushPromises();
}

describe("MPasteImageOrUrl", () => {
  it("meldet eine eingetippte Bildadresse sofort", async () => {
    const wrapper = mount(MPasteImageOrUrl);

    await wrapper.get("input").setValue("https://example.com/cat.png");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
      "https://example.com/cat.png",
    ]);
  });

  it("meldet unvollstaendige Eingaben nicht", async () => {
    const wrapper = mount(MPasteImageOrUrl);

    await wrapper.get("input").setValue("https:/");

    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("laedt ein eingefuegtes Bild hoch und meldet die Server-URL", async () => {
    server.use(
      http.post(`${API_URL}/api/image`, () =>
        HttpResponse.json(
          { id: "abc", url: "/api/image/abc", remaining: 1 },
          { status: 201 },
        ),
      ),
    );
    const wrapper = mount(MPasteImageOrUrl);

    await bildEinfuegen(wrapper);

    await vi.waitFor(() =>
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([
        `${API_URL}/api/image/abc`,
      ]),
    );
    expect((wrapper.get("input").element as HTMLInputElement).value).toBe(
      `${API_URL}/api/image/abc`,
    );
  });

  it("zeigt einen Fehler, wenn das Bild nicht hochgeladen werden kann", async () => {
    server.use(
      http.post(`${API_URL}/api/image`, () =>
        HttpResponse.json({ message: "zu gross" }, { status: 413 }),
      ),
    );
    const wrapper = mount(MPasteImageOrUrl);

    await bildEinfuegen(wrapper);

    await vi.waitFor(() => expect(wrapper.text()).toContain("zu gross"));
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });
});

