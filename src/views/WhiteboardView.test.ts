import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WhiteboardView from "./WhiteboardView.vue";

// Die Whiteboard-Seite soll genau einen gruenen, zentrierten Knopf zeigen.
describe("WhiteboardView", () => {
	it("zeigt genau einen Knopf mit dem Text 'Create new whitepaper'", () => {
		const wrapper = mount(WhiteboardView);

		const buttons = wrapper.findAll("button");
		expect(buttons).toHaveLength(1);
		expect(buttons[0].text()).toBe("Create new whitepaper");
	});

	it("haelt den Knopf in einem gruenen, zentrierten Container", () => {
		const wrapper = mount(WhiteboardView);

		const main = wrapper.get("main");
		expect(main.classes()).toContain("justify-content-center");
		expect(main.classes()).toContain("align-items-center");
		// Die gruene Farbe steckt in der Klasse whiteboard__create.
		expect(wrapper.get("button").classes()).toContain("whiteboard__create");
	});
});
