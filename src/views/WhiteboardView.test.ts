import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";
import WhiteboardView from "./WhiteboardView.vue";

// Die Whiteboard-Seite soll genau einen gruenen, zentrierten Knopf zeigen.
describe("WhiteboardView", () => {
	function mountView() {
		const i18n = createI18n({
			legacy: false,
			locale: "de",
			messages: {
				de: {
					whiteboard: {
						createNew: "Create new whiteboard",
						creating: "Wird angelegt …",
						serverUnreachable: "Der Whiteboard-Server ist nicht erreichbar.",
						notFound: "Dieses Whiteboard gibt es nicht (mehr).",
					},
				},
			},
		});
		return mount(WhiteboardView, {
			global: {
				plugins: [i18n],
				mocks: {
					$route: { params: {} },
					$router: { push: vi.fn() },
				},
				stubs: {
					WhiteboardApp: true,
				},
			},
		});
	}

	it("zeigt genau einen Knopf mit dem Text 'Create new whiteboard'", () => {
		const wrapper = mountView();

		const buttons = wrapper.findAll("button");
		expect(buttons).toHaveLength(1);
		expect(buttons[0].text()).toBe("Create new whiteboard");
	});

	it("haelt den Knopf in einem gruenen, zentrierten Container", () => {
		const wrapper = mountView();

		const start = wrapper.get(".whiteboard__start");
		expect(start.classes()).toContain("justify-content-center");
		expect(start.classes()).toContain("align-items-center");
		// Die gruene Farbe steckt in der Klasse whiteboard__create.
		expect(wrapper.get("button").classes()).toContain("whiteboard__create");
	});
});


