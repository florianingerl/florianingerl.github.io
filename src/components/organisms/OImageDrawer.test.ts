import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { uploadDrawing } from "@/api";
import { i18n } from "@/i18n";
import WhiteboardCanvas from "@/components/whiteboard/WhiteboardCanvas.vue";
import WhiteboardToolbar from "@/components/whiteboard/WhiteboardToolbar.vue";
import { drawnImageJson, svgToPngDataUrl } from "@/utils/imageDrawer";
import OImageDrawer from "./OImageDrawer.vue";

vi.mock("@/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/api")>();
  return { ...actual, uploadDrawing: vi.fn() };
});

vi.mock("@/utils/imageDrawer", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/utils/imageDrawer")>();
  return { ...actual, drawnImageJson: vi.fn(), svgToPngDataUrl: vi.fn() };
});

const pngDataUrl = "data:image/png;base64,PNG";
const json = '{"objects":[]}';

beforeEach(() => {
  vi.mocked(uploadDrawing).mockReset();
  vi.mocked(svgToPngDataUrl).mockReset();
  vi.mocked(drawnImageJson).mockReset();
  vi.mocked(svgToPngDataUrl).mockResolvedValue(pngDataUrl);
  vi.mocked(drawnImageJson).mockReturnValue(json);
});

describe("OImageDrawer", () => {
  it("zeigt eine weisse, feste 640x400-Zeichenflaeche ohne Hand- und Zoomwerkzeuge", () => {
    const wrapper = mount(OImageDrawer, { global: { plugins: [i18n] } });

    const canvas = wrapper.findComponent(WhiteboardCanvas);
    const toolbar = wrapper.findComponent(WhiteboardToolbar);

    expect(canvas.props("showGrid")).toBe(false);
    expect(canvas.props("defsId")).toBe("image-drawer");
    expect(canvas.props("fixedViewport")).toBe(true);
    expect(toolbar.props("showHand")).toBe(false);
    expect(toolbar.props("showZoom")).toBe(false);
    expect(wrapper.find("svg.wb-canvas").exists()).toBe(true);
    expect(wrapper.get(".wb-canvas__hintergrund").attributes("fill")).toBe("#ffffff");
  });

  it("laedt PNG und JSON beim Speichern hoch und meldet die Adressen", async () => {
    vi.mocked(uploadDrawing).mockResolvedValue({
      id: "drawing1",
      url: "/api/image/drawing1",
      jsonUrl: "/api/image/drawing1.json",
      remaining: 4,
    });
    const wrapper = mount(OImageDrawer, { global: { plugins: [i18n] } });

    await wrapper.get(".image-drawer__aktionen .btn-primary").trigger("click");
    await flushPromises();

    const svg = wrapper.get("svg.wb-canvas").element as SVGSVGElement;
    expect(svgToPngDataUrl).toHaveBeenCalledWith(svg, 640, 400);
    expect(drawnImageJson).toHaveBeenCalledWith([]);
    expect(uploadDrawing).toHaveBeenCalledWith(pngDataUrl, json);
    expect(wrapper.emitted("saved")?.[0]).toEqual([
      { url: "/api/image/drawing1", jsonUrl: "/api/image/drawing1.json" },
    ]);
  });

  it("zeigt beim Fehlschlag des Uploads eine Fehlermeldung", async () => {
    vi.mocked(uploadDrawing).mockRejectedValue(new Error("Upload fehlgeschlagen"));
    const wrapper = mount(OImageDrawer, { global: { plugins: [i18n] } });

    await wrapper.get(".image-drawer__aktionen .btn-primary").trigger("click");
    await flushPromises();

    expect(wrapper.text()).toContain("Upload fehlgeschlagen");
    expect(wrapper.emitted("saved")).toBeFalsy();
  });

  it("meldet beim Abbrechen keine Zeichnung", async () => {
    const wrapper = mount(OImageDrawer, { global: { plugins: [i18n] } });

    await wrapper.get(".image-drawer__aktionen .btn-secondary").trigger("click");

    expect(wrapper.emitted("cancel")).toHaveLength(1);
    expect(wrapper.emitted("saved")).toBeFalsy();
  });
});
