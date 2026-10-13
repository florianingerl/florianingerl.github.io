import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import ONavBar from "./ONavBar.vue";

function mountNav() {
	return mount(ONavBar, { global: { plugins: [i18n] } });
}

describe("ONavBar", () => {
	it("stellt den Menuepunkt Whiteboard direkt links neben About me", () => {
		const wrapper = mountNav();

		const hrefs = wrapper
			.findAll("#navbar > ul > li > a")
			.map((a) => a.attributes("href"));

		const wbIndex = hrefs.indexOf("/whiteboard");
		expect(wbIndex).toBeGreaterThan(-1);
		expect(hrefs[wbIndex + 1]).toBe("/#uebermich");
	});

	it("verlinkt die Sektions-Menuepunkte auf /#<sektion>", () => {
		const wrapper = mountNav();

		expect(wrapper.find('a[href="#matheuni"]').exists()).toBe(false);
		expect(wrapper.find('a[href="/#matheuni"]').exists()).toBe(true);
	});

	it("beschriftet den Whiteboard-Menuepunkt mit 'Whiteboard'", () => {
		const wrapper = mountNav();

		expect(wrapper.get('a[href="/whiteboard"]').text()).toContain("Whiteboard");
	});
});
