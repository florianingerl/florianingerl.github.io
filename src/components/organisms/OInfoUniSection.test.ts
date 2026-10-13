import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { i18n } from "@/i18n";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";
import OInfoUniSection from "./OInfoUniSection.vue";

function mountSection() {
	return mount(OInfoUniSection, {
		global: { plugins: [i18n], stubs: { VueQuiz: true } },
	});
}

// In der Informatik-Sektion der Uni ersetzt das Quiz das obere Bild; das
// untere Bild (programming.png) und der Text bleiben erhalten.
describe("OInfoUniSection", () => {
	it("ersetzt das obere Bild durch das Informatik-Quiz", () => {
		const wrapper = mountSection();

		// Nur noch das untere Bild ist da, das obere (infouni2) fehlt.
		const bilder = wrapper
			.findAll("img")
			.map((img) => img.attributes("src"));
		expect(bilder).toEqual(["assets/img/programming.png"]);

		// Das Quiz steht genau einmal in der Sektion.
		const quiz = wrapper.findAllComponents(VueQuiz);
		expect(quiz).toHaveLength(1);
		expect(quiz[0].props("quiz")).toBe("informatics");
	});
});
