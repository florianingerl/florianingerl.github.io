import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { WhiteboardObject, WhiteboardTool } from "@/types/whiteboard";
import WhiteboardCanvas from "./WhiteboardCanvas.vue";

function montiere(tool: WhiteboardTool = "pen"): VueWrapper {
	return mount(WhiteboardCanvas, {
		props: {
			objects: [],
			selectedIds: [],
			tool,
			camera: { x: 0, y: 0, scale: 1 },
			color: "#1f2933",
			fill: "#ffd966",
			strokeWidth: 2,
			cursors: [],
			canEdit: true,
		},
	});
}

async function zeichneStrich(wrapper: VueWrapper): Promise<void> {
	const svg = wrapper.get("svg.wb-canvas");
	await svg.trigger("pointerdown");
	await svg.trigger("pointermove");
	await svg.trigger("pointermove");
	await svg.trigger("pointerup");
}

describe("WhiteboardCanvas: Stift", () => {
	it("legt einen Stiftstrich an, ohne ihn auszuwaehlen oder das Werkzeug zu wechseln", async () => {
		const wrapper = montiere();

		await zeichneStrich(wrapper);

		const erstellt = wrapper.emitted("create");
		expect(erstellt).toHaveLength(1);
		const objekt = erstellt?.[0][0] as WhiteboardObject;
		expect(objekt.type).toBe("pen");
		expect(objekt.points?.length).toBeGreaterThanOrEqual(4);
		expect(wrapper.emitted("select")).toBeUndefined();
		expect(wrapper.emitted("tool-change")).toBeUndefined();
	});

	it("erlaubt mehrere Striche hintereinander, weil der Stift ausgewaehlt bleibt", async () => {
		const wrapper = montiere();

		await zeichneStrich(wrapper);
		await zeichneStrich(wrapper);

		expect(wrapper.emitted("create")).toHaveLength(2);
		expect(wrapper.emitted("select")).toBeUndefined();
		expect(wrapper.emitted("tool-change")).toBeUndefined();
	});
});
