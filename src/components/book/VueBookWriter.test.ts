import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { http, HttpResponse } from "msw";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import { useAuthStore } from "@/stores/auth";
import { DUMMY_BOOK, DUMMY_BOOK_ID } from "./bookDummy";
import VueBookWriter from "./VueBookWriter.vue";

// Jede gemountete Komponente haengt einen keydown-Listener an window. Ohne
// Unmount wuerde ein Strg+S aus mehreren Tests gleichzeitig ausgeloest.
enableAutoUnmount(afterEach);

// Ersatz fuer den echten Jodit-Editor: eine Textarea, die bei jeder Eingabe
// das v-model-Event ausloest (so wie Jodit es tut).
const JoditStub = {
  name: "VueJoditEditor",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  template:
    '<textarea class="jodit-stub" :value="modelValue" ' +
    "@input=\"$emit('update:modelValue', $event.target.value)\"></textarea>",
};

describe("VueBookWriter", () => {
  let putCount = 0;

  beforeEach(() => {
    putCount = 0;
    server.use(
      http.post(`${API_URL}/api/quiz`, async ({ request }) => {
        const body = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({ ...body, _id: "quiz-1" }, { status: 201 });
      }),
      http.put(`${API_URL}/api/book/:id`, async ({ request }) => {
        putCount++;
        const body = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({ ...body, _id: DUMMY_BOOK_ID });
      }),
    );
  });

  async function mountWriter(anmelden: boolean) {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(VueBookWriter, {
      props: { book: { ...DUMMY_BOOK }, subject: "deutsch" },
      global: {
        plugins: [pinia],
        stubs: {
          VueJoditEditor: JoditStub,
          OQuiz: { name: "OQuiz", template: "<div />" },
          VueBookAccountBar: true,
        },
      },
    });
    await flushPromises();

    if (anmelden) {
      const auth = useAuthStore();
      auth.token = "test-token";
      auth.user = { name: "Tester", email: "tester@example.com" };
      await flushPromises();
    }
    return wrapper;
  }

  it("zeigt die Absaetze eines Buchs ohne Anmeldung nur als <div v-html>", async () => {
    const wrapper = await mountWriter(false);

    // Drei Absaetze, dazwischen zwei Quizze (OQuiz), aber keine Editoren.
    expect(wrapper.findAll(".book-paragraph")).toHaveLength(3);
    expect(wrapper.findAllComponents({ name: "OQuiz" })).toHaveLength(2);
    expect(wrapper.findAll(".jodit-stub")).toHaveLength(0);
  });

  it("zeigt nach dem Login immer die JoditEditoren und keine Bearbeiten-Knoepfe", async () => {
    const wrapper = await mountWriter(true);

    expect(wrapper.findAll(".jodit-stub")).toHaveLength(3);
    expect(wrapper.findAll(".book-paragraph")).toHaveLength(0);
    expect(wrapper.find('[title="Edit the paragraph"]').exists()).toBe(false);
  });

  it("zeigt Sterne bei ungespeicherten Aenderungen und entfernt sie mit Strg+S", async () => {
    const wrapper = await mountWriter(true);

    // Vor der ersten Aenderung: kein Stern.
    expect(wrapper.findAll(".unsaved-star")).toHaveLength(0);

    // Im ersten Absatz etwas tippen.
    const textarea = wrapper.findAll(".jodit-stub")[0];
    await textarea.setValue("<p>Es war einmal anders.</p>");
    await flushPromises();

    // Ein Stern ueber jedem Editor und jedem Quiz: 3 Absaetze + 2 Quizze.
    expect(wrapper.findAll(".unsaved-star")).toHaveLength(5);

    // Strg+S speichert das Buch und alle Sterne verschwinden.
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "s", ctrlKey: true }),
    );
    await flushPromises();

    expect(putCount).toBe(1);
    expect(wrapper.findAll(".unsaved-star")).toHaveLength(0);
  });

  it("fuegt hinter einem Absatz ein Quiz und einen neuen Absatz ein", async () => {
    const wrapper = await mountWriter(true);

    await wrapper
      .findAll('[title="Add a quiz below this paragraph"]')[0]
      .trigger("click");
    await flushPromises();

    // Ein Quiz mehr (2 -> 3) und ein Absatz mehr (3 -> 4).
    expect(wrapper.findAllComponents({ name: "OQuiz" })).toHaveLength(3);
    expect(wrapper.findAll(".jodit-stub")).toHaveLength(4);
  });
});
