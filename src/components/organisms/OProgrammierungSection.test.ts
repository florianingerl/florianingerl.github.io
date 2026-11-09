import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import OQuiz from "@/components/quizzes/OQuiz.vue";
import OProgrammierungSection from "./OProgrammierungSection.vue";

function mountSection() {
	return mount(OProgrammierungSection, {
		global: { plugins: [i18n], stubs: { OQuiz: true } },
	});
}

// In der Programmierung-Sektion der Uni ersetzt das Programmierung-Quiz das Bild.
describe("OProgrammierungSection", () => {
	it("zeigt an der Stelle des Bildes das Programmierung-Quiz", () => {
		const wrapper = mountSection();

		expect(wrapper.find("img").exists()).toBe(false);

		const quiz = wrapper.findAllComponents(OQuiz);
		expect(quiz).toHaveLength(1);
		expect(quiz[0].props("quiz")).toBe("programming");
	});
});
