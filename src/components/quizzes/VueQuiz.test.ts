import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "@/api";
import { server } from "@/mocks/server";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import type { Exercise, QuizName, Topic, User } from "@/types/quiz";
import VueNewExercise from "./VueNewExercise.vue";
import VueExercise from "./VueExercise.vue";
import VueQuiz from "./VueQuiz.vue";

const QUIZ: QuizName = "english";

// Eine neue Aufgabe, deren Thema es noch nicht gibt (also ohne _id).
function neueAufgabe(themaTitel: string): Exercise {
  return {
    quiz: QUIZ,
    type: "gapText",
    imageUrl: "",
    instruction: "Fill the gap",
    gapText: "a {b} c",
    topic: { subject: QUIZ, title: themaTitel, tutorial: "" },
  };
}

// Der "andere Server" (Backend) wird mit MSW gemockt. Er haelt die Themen in
// einem internen Array. addTopic (POST /api/topic) haengt das neue Thema hinten
// an, getTopicsForQuizName (GET /api/topic/:quiz) liefert dieses Array zurueck.
describe("VueQuiz: neues Thema erscheint im Topic-Filter-Dropdown", () => {
  let themen: Topic[];

  beforeEach(() => {
    themen = [
      { _id: "t1", subject: QUIZ, title: "Topic 1", tutorial: "" },
      { _id: "t2", subject: QUIZ, title: "Topic 2", tutorial: "" },
      { _id: "t3", subject: QUIZ, title: "Topic 3", tutorial: "" },
    ];

    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () => HttpResponse.json(themen)),
      http.post(`${API_URL}/api/topic`, async ({ request }) => {
        const body = (await request.json()) as Topic;
        const neu: Topic = { ...body, _id: `t${themen.length + 1}` };
        themen.push(neu);
        return HttpResponse.json(neu, { status: 201 });
      }),
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])),
      http.post(`${API_URL}/api/exercise`, async ({ request }) => {
        const body = (await request.json()) as Exercise;
        return HttpResponse.json({ ...body, _id: "e1" }, { status: 201 });
      }),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(VueQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();

    // Angemeldet sein, damit sich das Formular oeffnen laesst.
    const auth = useAuthStore();
    auth.token = "test-token";
    auth.user = { name: "Tester", email: "tester@example.com" } as User;
    await flushPromises();
    return wrapper;
  }

  it("haengt das neue Thema hinten an, ohne die Auswahl zu aendern", async () => {
    const wrapper = await mountQuiz();

    // Das Formular zum Anlegen einer Aufgabe oeffnen.
    await wrapper.get('[title="Add a new exercise"]').trigger("click");
    await flushPromises();

    // Ein bestehendes Thema auswaehlen: 1x "alle Themen" + 3 Themen.
    await wrapper.get("#topicFilter").setValue("t2");
    expect(wrapper.findAll("#topicFilter option")).toHaveLength(4);

    // Eine neue Aufgabe mit einem neuen Thema speichern.
    const formular = wrapper.findComponent(VueNewExercise);
    expect(formular.exists()).toBe(true);
    formular.vm.$emit("new-exercise-created", neueAufgabe("Topic 4"));

    // getTopicsForQuizName wird erneut aufgerufen und liefert 4 Themen.
    await vi.waitFor(() => {
      expect(wrapper.findAll("#topicFilter option")).toHaveLength(5);
    });

    const optionen = wrapper.findAll("#topicFilter option");
    expect(optionen[optionen.length - 1].text()).toBe("Topic 4");
    // Die Auswahl bleibt "Topic 2".
    expect((wrapper.get("#topicFilter").element as HTMLSelectElement).value).toBe(
      "t2",
    );
  });
});

// Aufgaben werden nach dem Fach (subject) geladen und angezeigt. Der Filter
// "Only the exercises of this quiz" (Voreinstellung) blendet Aufgaben anderer
// Quizze des Faches aus; "All exercises for the same subject" zeigt sie an.
describe("VueQuiz: Aufgaben des Faches werden geladen und nach Umfang gefiltert", () => {
  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json([
          { _id: "t1", subject: QUIZ, title: "Topic 1", tutorial: "" },
        ]),
      ),
      // Zwei Aufgaben desselben Faches: eine dieses Quizzes (q1), eine eines
      // anderen Quizzes (q2) desselben Faches.
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "e1",
            quiz: "q1",
            subject: QUIZ,
            topic: "t1",
            type: "gapText",
            imageUrl: "",
            instruction: "Fill the gap",
            gapText: "a {b} c",
          },
          {
            _id: "e2",
            quiz: "q2",
            subject: QUIZ,
            type: "gapText",
            imageUrl: "",
            instruction: "Second exercise",
            gapText: "x {y} z",
          },
        ]),
      ),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(VueQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  function aktuellAngezeigt(wrapper: ReturnType<typeof mount>) {
    return wrapper.findComponent(VueExercise).props("exercise") as Exercise;
  }

  it("ueberlaesst den Umfang dem Filter", async () => {
    const wrapper = await mountQuiz();

    // Eine Aufgabe dieses Quizzes ist sichtbar (Voreinstellung "this quiz"),
    // die des anderen Quizzes ist ausgeblendet. Die Seitenzahl zeigt 1 Aufgabe.
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e1" });
    expect(wrapper.text()).not.toContain("No questions available.");
    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("0");

    // Umstellung auf "ganzes Fach" zeigt beide Aufgaben (2 Seiten).
    const filterStore = useFilterStore();
    filterStore.filterFor("q1").scope = "subject";
    await flushPromises();

    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("1");

    // Zur zweiten Aufgabe blattern, es ist die des anderen Quizzes.
    await wrapper
      .get('button[title="Next exercise"]')
      .trigger("click");
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e2" });
  });

  it("zeigt die Hinweis-Meldung, wenn keine Aufgaben da sind", async () => {
    server.use(http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])));
    const wrapper = await mountQuiz();
    expect(wrapper.text()).toContain("No questions available.");
  });
});
