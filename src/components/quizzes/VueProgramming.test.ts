import { flushPromises, mount } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { reactive } from "vue";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import type { Exercise, Lang, ProgrammingValidationResult } from "@/types/quiz";
import VueProgramming from "./VueProgramming.vue";

function exercise(): Exercise {
  return {
    _id: "ex1",
    quiz: "informatics",
    type: "programming",
    imageUrl: "",
    questionOrInstruction: "Add two numbers.",
    programminglanguage: "JavaScript",
    function: "function add(a, b) { return a + b; }",
    testcases: "add(2, 3) == 5",
  };
}

function mountProgramming(ex: Exercise = exercise(), lg: Lang = "en") {
  const reactiveExercise = reactive(ex);
  const wrapper = mount(VueProgramming, {
    props: { exercise: reactiveExercise, lg },
  });
  return { wrapper, ex: reactiveExercise };
}

function validationHandler(result: ProgrammingValidationResult) {
  let sentCode = "";
  server.use(
    http.post(`${API_URL}/api/exercise/ex1/validate`, async ({ request }) => {
      const body = (await request.json()) as { code: string };
      sentCode = body.code;
      return HttpResponse.json(result);
    }),
  );
  return { sentCode: () => sentCode };
}

describe("VueProgramming: coding exercise", () => {
  it("shows the testcases expression and prefills the function signature", () => {
    const { wrapper } = mountProgramming();

    expect(wrapper.text()).toContain("add(2, 3) == 5");
    expect(
      (wrapper.get(".programming-exercise__code").element as HTMLTextAreaElement).value,
    ).toBe("function add(a, b) {\n  \n}");
  });

  it("validates the submitted code and marks the exercise as solved", async () => {
    const { sentCode } = validationHandler({
      passed: true,
      expression: "add(2, 3) == 5",
      actual: "true",
    });
    const { wrapper, ex } = mountProgramming();

    await wrapper.get(".programming-exercise__code").setValue(
      "function add(a, b) { return a + b; }",
    );
    await wrapper.get('button[title="Validate"]').trigger("click");
    await flushPromises();

    expect(sentCode()).toBe("function add(a, b) { return a + b; }");
    expect(ex.correctlyAnswered).toBe(true);
    expect(wrapper.text()).toContain("All tests passed");
  });

  it("marks the exercise as failed when the expression is not true", async () => {
    validationHandler({
      passed: false,
      expression: "add(2, 3) == 5",
      actual: "false",
    });
    const { wrapper, ex } = mountProgramming();

    await wrapper.get(".programming-exercise__code").setValue(
      "function add(a, b) { return a - b; }",
    );
    await wrapper.get('button[title="Validate"]').trigger("click");
    await flushPromises();

    expect(ex.correctlyAnswered).toBe(false);
    expect(wrapper.text()).toContain("Not all tests passed");
  });

  it("shows the stored solution and resets it on retry", async () => {
    const { wrapper, ex } = mountProgramming();

    await wrapper.get('button[title="Show me the solution"]').trigger("click");
    expect(
      (wrapper.get(".programming-exercise__code").element as HTMLTextAreaElement).value,
    ).toBe("function add(a, b) { return a + b; }");

    await wrapper.get('button[title="Retry"]').trigger("click");
    expect(
      (wrapper.get(".programming-exercise__code").element as HTMLTextAreaElement).value,
    ).toBe("function add(a, b) {\n  \n}");
    expect(ex.correctlyAnswered).toBeUndefined();
  });
});
