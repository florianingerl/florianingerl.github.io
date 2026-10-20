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

// In der Informatik-Sektion der Uni ersetzen zwei Quizze die beiden Bilder:
// oben das Informatik-Quiz, unten das Programmierung-Quiz. Die Texte bleiben
// erhalten.
describe("OInfoUniSection", () => {
	it("ersetzt beide Bilder durch die beiden Quizze", () => {
		const wrapper = mountSection();

		// Kein Bild mehr: beide Bilder sind durch Quizze ersetzt.
		const bilder = wrapper
			.findAll("img")
			.map((img) => img.attributes("src"));
		expect(bilder).toEqual([]);

		// Oben das Informatik-Quiz, unten das Programmierung-Quiz.
		const quiz = wrapper.findAllComponents(OQuiz);
		expect(quiz).toHaveLength(2);
		expect(quiz[0].props("quiz")).toBe("informatics");
		expect(quiz[1].props("quiz")).toBe("programming");
	});
});
