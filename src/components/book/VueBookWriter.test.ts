import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import { useAuthStore } from "@/stores/auth";
import { DUMMY_BOOK, DUMMY_BOOK_ID } from "./bookDummy";
import VueBookWriter from "./VueBookWriter.vue";

describe("VueBookWriter", () => {
  beforeEach(() => {
    server.use(
      http.post(`${API_URL}/api/bookquiz`, async ({ request }) => {
        const body = (await request.json()) as { subject: string; website: string };
        return HttpResponse.json({ ...body, _id: "quiz-1" }, { status: 201 });
      }),
      http.put(`${API_URL}/api/book/:id`, async ({ request }) => {
        const body = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({ ...body, _id: DUMMY_BOOK_ID });
      }),
    );
  });

  async function mountWriter() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(VueBookWriter, {
      props: { book: { ...DUMMY_BOOK }, subject: "deutsch" },
      global: {
        plugins: [pinia],
        stubs: {
          VueJoditEditor: true,
          VueBookQuiz: true,
          VueBookAccountBar: true,
        },
      },
    });
    await flushPromises();

    const auth = useAuthStore();
    auth.token = "test-token";
    auth.user = { name: "Tester", email: "tester@example.com" };
    await flushPromises();
    return wrapper;
  }

  it("zeigt die Absaetze eines Buchs als <div v-html>" , async () => {
    const wrapper = await mountWriter();

    // Drei Absaetze und zwischen ihnen zwei Quizze.
    expect(wrapper.findAll(".book-paragraph")).toHaveLength(3);
    expect(wrapper.findAllComponents({ name: "VueBookQuiz" })).toHaveLength(2);
  });

  it("verwandelt einen Absatz beim Klick auf Bearbeiten in einen Editor", async () => {
    const wrapper = await mountWriter();

    expect(wrapper.findAll(".book-editor")).toHaveLength(0);
    await wrapper.findAll('[title="Edit the paragraph"]')[0].trigger("click");
    await flushPromises();

    expect(wrapper.findAll(".book-editor")).toHaveLength(1);
    expect(wrapper.find('[title="Add a quiz below this paragraph"]').exists()).toBe(true);
  });

  it("fuegt hinter einem Absatz ein Quiz und einen neuen Absatz ein", async () => {
    const wrapper = await mountWriter();

    await wrapper.findAll('[title="Edit the paragraph"]')[0].trigger("click");
    await flushPromises();

    // "Add Quiz" gibt es im Editor und unter dem abgeschlossenen Absatz.
    await wrapper.find('[title="Add a quiz below this paragraph"]').trigger("click");
    await flushPromises();

    // Nach dem Einfuegen gibt es drei Paragraphen (2 Bloecke + neuer leere) und
    // drei Quizze (2 vorhandene + neues).
    expect(wrapper.findAll(".book-paragraph")).toHaveLength(3);
    expect(wrapper.findAllComponents({ name: "VueBookQuiz" })).toHaveLength(3);
  });
});