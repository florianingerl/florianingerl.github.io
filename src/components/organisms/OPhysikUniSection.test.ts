import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import OQuiz from "@/components/quizzes/OQuiz.vue";
import OPhysikUniSection from "./OPhysikUniSection.vue";

function mountSection() {
	return mount(OPhysikUniSection, {
		global: { plugins: [i18n], stubs: { OQuiz: true } },
	});
}

// In der Physik-Sektion der Uni ersetzt das Quiz das bisherige Bild.
describe("OPhysikUniSection", () => {
	it("zeigt an der Stelle des Bildes das Physik-Quiz", () => {
		const wrapper = mountSection();

		// Das fruehere Bild (physikuni.png) ist verschwunden ...
		expect(wrapper.find("img").exists()).toBe(false);
		expect(wrapper.html()).not.toContain("physikuni.png");

		// ... und an seiner Stelle steht das Quiz.
		const quiz = wrapper.findComponent(OQuiz);
		expect(quiz.exists()).toBe(true);
		expect(quiz.props("quiz")).toBe("physics");
	});
});
