import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { WhiteboardObject, WhiteboardTool } from "@/types/whiteboard";
import WhiteboardCanvas from "./WhiteboardCanvas.vue";

function montiere(
	tool: WhiteboardTool = "pen",
	penPreviews: WhiteboardObject[] = [],
): VueWrapper {
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
			penPreviews,
			canEdit: true,
		},
	});
}

function montiereMitAuswahl(
	selectedIds: string[],
	objects: WhiteboardObject[] = [],
): VueWrapper {
	return mount(WhiteboardCanvas, {
		props: {
			objects,
			selectedIds,
			tool: "select",
			camera: { x: 0, y: 0, scale: 1 },
			color: "#1f2933",
			fill: "#ffd966",
			strokeWidth: 2,
			cursors: [],
			penPreviews: [],
			canEdit: true,
		},
	});
}

function rechteck(): WhiteboardObject {
	return {
		id: "rechteck1",
		type: "rect",
		x: 10,
		y: 20,
		w: 100,
		h: 80,
		z: 1,
		color: "#1f2933",
	};
}

async function zeichneStrich(wrapper: VueWrapper): Promise<void> {
	const svg = wrapper.get("svg.wb-canvas");
	await svg.trigger("pointerdown");
	await svg.trigger("pointermove");
	await svg.trigger("pointermove");
	await svg.trigger("pointerup");
}

describe("WhiteboardCanvas: Pfeiltasten", () => {
	it("verschiebt ausgewaehlte Objekte statt der Zeichenflaeche", () => {
		vi.useFakeTimers();
		const wrapper = montiereMitAuswahl(["rechteck1"], [rechteck()]);

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));

		expect(wrapper.emitted("move")).toHaveLength(1);
		expect(wrapper.emitted("move")?.[0]).toEqual([["rechteck1"], 10, 0]);
		expect(wrapper.emitted("camera-change")).toBeUndefined();
		expect(wrapper.emitted("interaction-start")).toHaveLength(1);
		expect(wrapper.emitted("interaction-end")).toBeUndefined();

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
		expect(wrapper.emitted("interaction-end")).toHaveLength(1);
		vi.useRealTimers();
		wrapper.unmount();
	});

	it("verschiebt die Zeichenflaeche, wenn nichts ausgewaehlt ist", () => {
		vi.useFakeTimers();
		const wrapper = montiereMitAuswahl([]);

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));

		expect(wrapper.emitted("move")).toBeUndefined();
		expect(wrapper.emitted("camera-change")?.[0]).toEqual([
			{ x: 10, y: 0, scale: 1 },
		]);

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
		vi.useRealTimers();
		wrapper.unmount();
	});

	it("verschiebt mit gedrueckter Umschalttaste weiter", () => {
		vi.useFakeTimers();
		const wrapper = montiereMitAuswahl(["rechteck1"], [rechteck()]);

		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "ArrowDown", shiftKey: true }),
		);

		expect(wrapper.emitted("move")?.[0]).toEqual([["rechteck1"], 0, 50]);

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown" }));
		vi.useRealTimers();
		wrapper.unmount();
	});

	it("wiederholt beim Gedrueckt halten mit zeitlichem Abstand", () => {
		vi.useFakeTimers();
		const wrapper = montiereMitAuswahl(["rechteck1"], [rechteck()]);

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
		expect(wrapper.emitted("move")).toHaveLength(1);
		expect(wrapper.emitted("interaction-start")).toHaveLength(1);

		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "ArrowRight", repeat: true }),
		);
		vi.advanceTimersByTime(149);
		expect(wrapper.emitted("move")).toHaveLength(1);

		vi.advanceTimersByTime(1);
		expect(wrapper.emitted("move")).toHaveLength(2);

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
		expect(wrapper.emitted("interaction-end")).toHaveLength(1);
		vi.useRealTimers();
		wrapper.unmount();
	});

	it("ignoriert Pfeiltasten in Eingabefeldern", () => {
		vi.useFakeTimers();
		const wrapper = montiereMitAuswahl(["rechteck1"], [rechteck()]);
		const eingabe = document.createElement("input");
		document.body.append(eingabe);
		eingabe.focus();

		window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));

		expect(wrapper.emitted("move")).toBeUndefined();
		expect(wrapper.emitted("camera-change")).toBeUndefined();
		eingabe.remove();
		vi.useRealTimers();
		wrapper.unmount();
	});
});

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
		wrapper.unmount();
	});

	it("erlaubt mehrere Striche hintereinander, weil der Stift ausgewaehlt bleibt", async () => {
		const wrapper = montiere();

		await zeichneStrich(wrapper);
		await zeichneStrich(wrapper);

		expect(wrapper.emitted("create")).toHaveLength(2);
		expect(wrapper.emitted("select")).toBeUndefined();
		expect(wrapper.emitted("tool-change")).toBeUndefined();
		wrapper.unmount();
	});

	it("meldet Start und neue Punkte schon vor dem Loslassen", async () => {
		const wrapper = montiere();
		const svg = wrapper.get("svg.wb-canvas");

		await svg.trigger("pointerdown");
		await svg.trigger("pointermove");
		await svg.trigger("pointermove");

		const start = wrapper.emitted("pen-start");
		expect(start).toHaveLength(1);
		const strich = start?.[0][0] as { id: string };
		expect(typeof strich.id).toBe("string");

		const punkte = wrapper.emitted("pen-points");
		expect(punkte).toBeDefined();
		expect(wrapper.emitted("create")).toBeUndefined();

		await svg.trigger("pointerup");
		expect(wrapper.emitted("create")).toHaveLength(1);
		const allePunkte = punkte!.flatMap((eintrag) => eintrag[1] as number[]);
		expect(allePunkte).toHaveLength(4);
		wrapper.unmount();
	});

	it("zeigt laufende Striche anderer Teilnehmer", () => {
		const wrapper = montiere("pen", [
			{
				id: "vorschau1",
				type: "pen",
				x: 10,
				y: 20,
				w: 0,
				h: 0,
				z: 1,
				color: "#ff0000",
				points: [0, 0, 5, 5],
			},
		]);

		const linie = wrapper
			.findAll("polyline")
			.find((element) => element.attributes("points") === "10,20 15,25");
		expect(linie).toBeDefined();
		wrapper.unmount();
	});

	it("bricht einen zu kurzen Stiftstrich fuer die anderen ab", async () => {
		const wrapper = montiere();
		const svg = wrapper.get("svg.wb-canvas");

		await svg.trigger("pointerdown");
		await svg.trigger("pointermove");
		await svg.trigger("pointerup");

		expect(wrapper.emitted("create")).toBeUndefined();
		expect(wrapper.emitted("pen-cancel")).toHaveLength(1);
		wrapper.unmount();
	});

	it("bricht einen abgebrochenen Stiftstrich ab", async () => {
		const wrapper = montiere();
		const svg = wrapper.get("svg.wb-canvas");

		await svg.trigger("pointerdown");
		await svg.trigger("pointermove");
		await svg.trigger("pointercancel");

		expect(wrapper.emitted("create")).toBeUndefined();
		expect(wrapper.emitted("pen-cancel")).toHaveLength(1);
		wrapper.unmount();
	});
});
