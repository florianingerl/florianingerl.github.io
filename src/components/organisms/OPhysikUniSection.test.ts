import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";
import OPhysikUniSection from "./OPhysikUniSection.vue";

function mountSection() {
	return mount(OPhysikUniSection, {
		global: { plugins: [i18n], stubs: { VueQuiz: true } },
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
		const quiz = wrapper.findComponent(VueQuiz);
		expect(quiz.exists()).toBe(true);
		expect(quiz.props("quiz")).toBe("physics");
	});
});
