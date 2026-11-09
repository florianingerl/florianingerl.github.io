import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import OQuiz from "@/components/quizzes/OQuiz.vue";
import OInfoUniSection from "./OInfoUniSection.vue";

function mountSection() {
	return mount(OInfoUniSection, {
		global: { plugins: [i18n], stubs: { OQuiz: true } },
	});
}

// In der Informatik-Sektion der Uni ersetzt das Informatik-Quiz das Bild.
// Die Programmierung hat eine eigene Sektion (siehe OProgrammierungSection).
describe("OInfoUniSection", () => {
	it("zeigt an der Stelle des Bildes das Informatik-Quiz", () => {
		const wrapper = mountSection();

		// Kein Bild mehr: es ist durch das Quiz ersetzt.
		expect(wrapper.find("img").exists()).toBe(false);

		const quiz = wrapper.findAllComponents(OQuiz);
		expect(quiz).toHaveLength(1);
		expect(quiz[0].props("quiz")).toBe("informatics");
	});
});
