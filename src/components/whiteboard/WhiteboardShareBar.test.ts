import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import WhiteboardShareBar from "./WhiteboardShareBar.vue";

function montiere(canEdit = true) {
	return mount(WhiteboardShareBar, {
		global: { plugins: [i18n] },
		props: {
			link: "https://beispiel.de/whiteboard/abc",
			participants: [],
			connected: true,
			name: "Test",
			copied: false,
			canEdit,
		},
	});
}

describe("WhiteboardShareBar: Datei", () => {
	it("meldet Speichern und eine ausgewaehlte Datei", async () => {
		const wrapper = montiere();
		const knoepfe = wrapper.findAll(".wb-share__datei button");

		await knoepfe[0].trigger("click");
		expect(wrapper.emitted("save")).toHaveLength(1);

		const feld = wrapper.get('input[type="file"]');
		const datei = new File(["{}"], "board.whiteboard.json", {
			type: "application/json",
		});
		Object.defineProperty(feld.element, "files", {
			configurable: true,
			value: [datei],
		});
		await feld.trigger("change");

		expect(wrapper.emitted("open")?.[0][0]).toBe(datei);
	});

	it("sperrt das Oeffnen, wenn das Board nicht bearbeitet werden darf", () => {
		const wrapper = montiere(false);
		const knoepfe = wrapper.findAll(".wb-share__datei button");

		expect(knoepfe[0].attributes("disabled")).toBeUndefined();
		expect(knoepfe[1].attributes("disabled")).toBeDefined();
	});
});
