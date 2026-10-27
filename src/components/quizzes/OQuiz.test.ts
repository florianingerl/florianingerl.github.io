import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { http, HttpResponse } from "msw";
import ToastEventBus, { type ToastMessage } from "primevue/toasteventbus";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { API_URL, getAllExercises } from "@/api";
import { i18n } from "@/i18n";
import { server } from "@/mocks/server";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import type { Exercise, QuizName, School, Topic, User } from "@/types/quiz";
import FilterComponent from "./FilterComponent.vue";
import VueNewExercise from "./VueNewExercise.vue";
import MSchoolChooser from "@/components/molecules/MSchoolChooser.vue";
import MTopicChooser from "@/components/molecules/MTopicChooser.vue";
import OExercise from "./OExercise.vue";
import OQuiz from "./OQuiz.vue";

const QUIZ: QuizName = "english";

// Eine neue Aufgabe, deren Thema es noch nicht gibt (also ohne _id).
function neueAufgabe(themaTitel: string): Exercise {
  return {
    quiz: QUIZ,
    type: "gapText",
    imageUrl: "",
    questionOrInstruction: "Fill the gap",
    gapText: "a {b} c",
    topic: { subject: QUIZ, title: themaTitel, tutorial: "" },
  };
}

// Der "andere Server" (Backend) wird mit MSW gemockt. Er haelt die Themen in
// einem internen Array. addTopic (POST /api/topic) haengt das neue Thema hinten
// an, getTopicsForQuizName (GET /api/topic/:quiz) liefert dieses Array zurueck.
describe("OQuiz: neues Thema erscheint im Topic-Filter-Dropdown", () => {
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
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Die Knopfleiste soll echt gerendert werden (shallow stubbt sie sonst).
        stubs: { LoginToEditComponent: false },
      },
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

    // Ein bestehendes Thema filtern (der Themenfilter ist jetzt ein Baum).
    const filterStore = useFilterStore();
    filterStore.filterFor(QUIZ).topicId = "t2";
    await flushPromises();
    expect(filterStore.filterFor(QUIZ).topicId).toBe("t2");

    // Eine neue Aufgabe mit einem neuen Thema speichern.
    const formular = wrapper.findComponent(VueNewExercise);
    expect(formular.exists()).toBe(true);
    formular.vm.$emit("new-exercise-created", neueAufgabe("Topic 4"));

    // getTopicsForQuizName wird erneut aufgerufen und liefert 4 Themen.
    await vi.waitFor(() => {
      const themen = wrapper
        .findComponent(FilterComponent)
        .props("topics") as Topic[];
      expect(themen).toHaveLength(4);
      expect(themen[themen.length - 1].title).toBe("Topic 4");
    });

    // Die Auswahl bleibt "Topic 2".
    expect(filterStore.filterFor(QUIZ).topicId).toBe("t2");
  });
});

// Aufgaben werden nach dem Fach (subject) geladen und angezeigt. Der Filter
// "Only the exercises of this quiz" (Voreinstellung) blendet Aufgaben anderer
// Quizze des Faches aus; "All exercises for the same subject" zeigt sie an.
describe("OQuiz: Aufgaben des Faches werden geladen und nach Umfang gefiltert", () => {
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
            questionOrInstruction: "Fill the gap",
            gapText: "a {b} c",
          },
          {
            _id: "e2",
            quiz: "q2",
            subject: QUIZ,
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Second exercise",
            gapText: "x {y} z",
          },
        ]),
      ),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Die Paginierung steht jetzt direkt im Quiz (unter dem Splitter);
        // ExerciseNavigation wird echt gerendert, sonst waeren die
        // Blaetterknoepfe nicht im DOM.
        stubs: {
          ExerciseNavigation: false,
        },
      },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  function aktuellAngezeigt(wrapper: ReturnType<typeof mount>) {
    return wrapper.findComponent(OExercise).props("exercise") as Exercise;
  }

  it("ueberlaesst den Umfang dem Filter", async () => {
    const wrapper = await mountQuiz();

    // Voreinstellung "ganzes Fach": beide Aufgaben des Faches sind sichtbar
    // (die Seitenzahl zeigt 2 Aufgaben).
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e1" });
    expect(wrapper.text()).not.toContain("No questions available.");
    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("1");

    // Zur zweiten Aufgabe blattern, es ist die des anderen Quizzes.
    await wrapper.get('button[title="Next exercise"]').trigger("click");
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e2" });

    // Umstellung auf "nur dieses Quiz" blendet die Aufgabe des anderen
    // Quizzes aus (nur noch 1 Aufgabe).
    const filterStore = useFilterStore();
    filterStore.filterFor("q1").scope = "quiz";
    await flushPromises();

    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("0");
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e1" });
  });

  it("zeigt die Hinweis-Meldung, wenn keine Aufgaben da sind", async () => {
    server.use(http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])));
    const wrapper = await mountQuiz();
    expect(wrapper.text()).toContain("No questions available.");
  });
});

// Das Mathematik-Quiz (Fach "mathematics") laedt das Thema "Gruppen" und die
// dazugehoerigen Multiple-Choice-Aufgaben, die auf dem Wikipedia-Artikel ueber
// Gruppen beruhen.
describe("OQuiz: Mathematik-Quiz laedt Thema 'Gruppen' und Aufgaben", () => {
  const MATHE: QuizName = "mathematics";
  const WIKI = "https://de.wikipedia.org/wiki/Gruppe_(Mathematik)";

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "qm", website: "web", subject: MATHE, name: "Mathematics" },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json([
          {
            _id: "tg",
            subject: MATHE,
            title: "Gruppen",
            tutorial: `<a href="${WIKI}">Wikipedia-Artikel \u00fcber Gruppen</a>`,
          },
        ]),
      ),
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "em1",
            quiz: "qm",
            subject: MATHE,
            topic: "tg",
            type: "multipleChoice",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rubik%27s_cube.svg/500px-Rubik%27s_cube.svg.png",
            questionOrInstruction:
              "Welche der folgenden Strukturen ist bez\u00fcglich der angegebenen Verkn\u00fcpfung eine Gruppe?",
            options: [
              { option: "(\u2124, +)", correct: true },
              { option: "(\u2124, \u00b7)", correct: false },
              { option: "(\u2115, +)", correct: false },
            ],
          },
        ]),
      ),
    );
  });

  it("zeigt die Multiple-Choice-Aufgabe des Faches mathematics an", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: MATHE, lg: "de" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();

    const aufgabe = wrapper
      .findComponent(OExercise)
      .props("exercise") as Exercise;
    expect(aufgabe).toMatchObject({ _id: "em1", type: "multipleChoice" });
    expect(wrapper.text()).not.toContain("Keine Fragen vorhanden.");
  });
});

// Das Web-Programming-Quiz (Fach "webprogramming") laedt das Thema
// "TypeScript - destructuring expressions" und die Multiple-Choice-Aufgaben,
// die auf dem Medium-Artikel ueber ES6-Destructuring beruhen.
describe("OQuiz: Web-Programming-Quiz laedt Destructuring-Thema und Aufgaben", () => {
  const WEB: QuizName = "webprogramming";
  const ARTIKEL =
    "https://medium.com/@taitasciore/es6-destructuring-in-depth-when-using-typescript-bdf7c899768a";

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "qw", website: "web", subject: WEB, name: "Web programming" },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json([
          {
            _id: "tw",
            subject: WEB,
            title: "TypeScript - destructuring expressions",
            tutorial: `<a href="${ARTIKEL}">Tutorial about destructuring expresions</a>`,
          },
        ]),
      ),
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "ew1",
            quiz: "qw",
            subject: WEB,
            topic: "tw",
            type: "multipleChoice",
            imageUrl:
              "https://miro.medium.com/v2/resize:fit:1400/1*CyOusrkRxuYbXG0klN2xiw.png",
            questionOrInstruction:
              "How do you unpack the properties id and title of an object res into variables with the same names?",
            options: [
              { option: "const { id, title } = res;", correct: true },
              { option: "const [id, title] = res;", correct: false },
              { option: "const { id: title } = res;", correct: false },
            ],
          },
        ]),
      ),
    );
  });

  it("zeigt die Multiple-Choice-Aufgabe des Faches webprogramming an", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: WEB, lg: "de" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();

    const aufgabe = wrapper
      .findComponent(OExercise)
      .props("exercise") as Exercise;
    expect(aufgabe).toMatchObject({ _id: "ew1", type: "multipleChoice" });
    expect(wrapper.text()).not.toContain("Keine Fragen vorhanden.");
  });
});

// Das Informatik-Quiz (Fach "informatics") laedt das Thema
// "UML - Aktivit\u00e4tsdiagramme" und die dazugehoerigen Multiple-Choice-Aufgaben,
// die auf dem Wikipedia-Artikel ueber Aktivit\u00e4tsdiagramme beruhen.
describe("OQuiz: Informatik-Quiz laedt UML-Aktivit\u00e4tsdiagramm-Thema und Aufgaben", () => {
  const INFO: QuizName = "informatics";
  const WIKI = "https://de.wikipedia.org/wiki/Aktivit%C3%A4tsdiagramm";

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "qi", website: "web", subject: INFO, name: "Informatik" },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json([
          {
            _id: "ti",
            subject: INFO,
            title: "UML - Aktivit\u00e4tsdiagramme",
            tutorial: `<a href="${WIKI}">Wikipedia-Artikel \u00fcber Aktivit\u00e4tsdiagramme</a>`,
          },
        ]),
      ),
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "ei1",
            quiz: "qi",
            subject: INFO,
            topic: "ti",
            type: "multipleChoice",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml-Activity-Beispiel3_Deutsch.svg/500px-Uml-Activity-Beispiel3_Deutsch.svg.png",
            questionOrInstruction:
              "Was wird mit einem Aktivit\u00e4tsdiagramm meist beschrieben?",
            options: [
              { option: "der Ablauf eines Anwendungsfalls", correct: true },
              { option: "die Struktur einer Klasse", correct: false },
              { option: "die Sichtbarkeit von Attributen", correct: false },
            ],
          },
        ]),
      ),
    );
  });

  it("zeigt die Multiple-Choice-Aufgabe des Faches informatics an", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: INFO, lg: "de" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();

    const aufgabe = wrapper
      .findComponent(OExercise)
      .props("exercise") as Exercise;
    expect(aufgabe).toMatchObject({ _id: "ei1", type: "multipleChoice" });
    expect(wrapper.text()).not.toContain("Keine Fragen vorhanden.");
  });
});

// Der Vollbild-Knopf neben An- bzw. Abmelden schaltet das Quiz in den
// Vollbildmodus. jsdom kennt die Fullscreen-API nicht, darum wird sie gestubbt.
describe("OQuiz: Vollbildmodus", () => {
  beforeEach(() => {
    // jsdom kennt keinen Vollbildmodus: neutraler Ausgangszustand.
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => null,
    });
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () => HttpResponse.json([])),
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  it("schaltet den Vollbildmodus ein und wieder aus", async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    const exitFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(HTMLElement.prototype, "requestFullscreen", {
      configurable: true,
      writable: true,
      value: requestFullscreen,
    });
    Object.defineProperty(Document.prototype, "exitFullscreen", {
      configurable: true,
      writable: true,
      value: exitFullscreen,
    });

    const wrapper = await mountQuiz();

    const hinein = wrapper.get('[title="Fullscreen"]');
    await hinein.trigger("click");
    expect(requestFullscreen).toHaveBeenCalledTimes(1);

    // Der Browser meldet, dass das Quiz jetzt im Vollbild ist.
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => wrapper.get("[data-quiz-root]").element,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    await flushPromises();

    const heraus = wrapper.get('[title="Leave fullscreen"]');
    await heraus.trigger("click");
    expect(exitFullscreen).toHaveBeenCalledTimes(1);
  });

  it("setzt das Icon zurueck, wenn der Browser per ESC den Vollbildmodus verlaesst", async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(HTMLElement.prototype, "requestFullscreen", {
      configurable: true,
      writable: true,
      value: requestFullscreen,
    });

    const wrapper = await mountQuiz();
    await wrapper.get('[title="Fullscreen"]').trigger("click");

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => wrapper.get("[data-quiz-root]").element,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    await flushPromises();
    expect(wrapper.find('[title="Leave fullscreen"]').exists()).toBe(true);

    // ESC: fullscreenElement verschwindet und der Browser meldet die Aenderung.
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => null,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    await flushPromises();
    expect(wrapper.find('[title="Fullscreen"]').exists()).toBe(true);
  });

  it("haengt die Vollbild-Klasse nur im Vollbildmodus an das Quiz", async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(HTMLElement.prototype, "requestFullscreen", {
      configurable: true,
      writable: true,
      value: requestFullscreen,
    });

    const wrapper = await mountQuiz();
    expect(wrapper.get("[data-quiz-root]").classes()).not.toContain(
      "quiz-vollbild",
    );

    await wrapper.get('[title="Fullscreen"]').trigger("click");
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => wrapper.get("[data-quiz-root]").element,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    await flushPromises();
    expect(wrapper.get("[data-quiz-root]").classes()).toContain("quiz-vollbild");

    // Beim Verlassen des Vollbildmodus wird die Klasse wieder entfernt.
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => null,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    await flushPromises();
    expect(wrapper.get("[data-quiz-root]").classes()).not.toContain(
      "quiz-vollbild",
    );
  });

  it("gibt den Vollbildzustand an die Aufgaben-Komponente weiter", async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(HTMLElement.prototype, "requestFullscreen", {
      configurable: true,
      writable: true,
      value: requestFullscreen,
    });
    server.use(
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json([
          {
            _id: "e1",
            quiz: QUIZ,
            subject: QUIZ,
            type: "multipleChoice",
            imageUrl: "data:image/svg+xml,%3Csvg/%3E",
            questionOrInstruction: "Frage?",
            options: [{ option: "a", correct: true }],
          },
        ]),
      ),
    );

    const wrapper = await mountQuiz();
    await flushPromises();
    expect(wrapper.findComponent(OExercise).props("vollbild")).toBe(false);

    await wrapper.get('[title="Fullscreen"]').trigger("click");
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => wrapper.get("[data-quiz-root]").element,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    await flushPromises();

    expect(wrapper.findComponent(OExercise).props("vollbild")).toBe(true);
  });
});

// Ohne Anmeldung duerfen die drei Knoepfe zum Anlegen, Bearbeiten und Loeschen
// nicht sichtbar sein; stattdessen steht dort der Anmelde-Hinweis.
describe("OQuiz: nicht angemeldet", () => {
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
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "e1",
            quiz: "q1",
            subject: QUIZ,
            topic: "t1",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Fill the gap",
            gapText: "a {b} c",
          },
        ]),
      ),
    );
  });

  it("zeigt statt der drei Knoepfe den Anmelde-Hinweis", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Der Anmelde-Hinweis steht in der Knopfleiste, also echt rendern.
        stubs: { LoginToEditComponent: false },
      },
      shallow: true,
    });
    await flushPromises();

    // Sicher abgemeldet: kein Token, kein Benutzer.
    const auth = useAuthStore();
    auth.abmelden();
    await flushPromises();

    expect(wrapper.find('[title="Add a new exercise"]').exists()).toBe(false);
    expect(wrapper.find('[title="Edit the exercise"]').exists()).toBe(false);
    expect(wrapper.find('[title="Delete the exercise"]').exists()).toBe(false);
    expect(wrapper.text()).toContain(
      "Log in to create, edit or delete exercises and tutorials.",
    );
  });
});

// Eine Multiple-Choice-Aufgabe wird ueber das Formular angelegt, gespeichert
// und danach ueber die API (getAllExercises) wieder geladen. So wird geprueft,
// dass die erste Option als die richtige Antwort in der Datenbank landet.
describe("OQuiz: Multiple-Choice-Aufgabe anlegen (Server-Roundtrip)", () => {
  let aufgaben: Exercise[];

  beforeEach(() => {
    aufgaben = [];
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
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json(aufgaben)),
      http.post(`${API_URL}/api/exercise`, async ({ request }) => {
        const body = (await request.json()) as Exercise;
        const neu = { ...body, _id: `e${aufgaben.length + 1}` };
        aufgaben.push(neu);
        return HttpResponse.json(neu, { status: 201 });
      }),
    );
  });

  it("speichert die erste Option als richtige Antwort", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Nur das Aufgaben-Formular wird echt gebraucht; die uebrigen Kinder
        // (u.a. der Jodit-Editor in VueNewTopic) sind fuer den Test unnoetig.
        stubs: {
          VueNewTopic: true,
          OExercise: true,
          MTopicAndSchoolDisplayer: true,
          VueExportToFacile: true,
          VueSignUp: true,
          VueLogin: true,
          VueProfile: true,
          VueFilterDialog: true,
        },
      },
    });
    await flushPromises();

    const auth = useAuthStore();
    auth.token = "test-token";
    auth.user = { name: "Tester", email: "tester@example.com" } as User;
    await flushPromises();

    // Das Formular zum Anlegen einer Aufgabe oeffnen.
    await wrapper.get('[title="Add a new exercise"]').trigger("click");
    await flushPromises();

    const formular = wrapper.findComponent(VueNewExercise);
    // Im Formular den Aufgabentyp waehlen (die erste Auswahl ist die Schule).
    await formular.get("#exercise-type").setValue("multipleChoice");

    // Thema "Topic 1" im Baum auswaehlen.
    const themenKnoten = formular
      .findAll(".p-treenode-content")
      .find((n) => n.text().includes("Topic 1"));
    expect(themenKnoten).toBeTruthy();
    await themenKnoten!.trigger("click");
    await flushPromises();

    // Die Frage eintippen (das Eingabefeld im Kasten mit der Beschriftung
    // "Question"; "New topic" hat eigene form-control-Felder).
    const frageBox = formular
      .findAll("div.mb-3.mt-3")
      .find((d) => d.text().includes("Question"))!;
    const frageFeld = frageBox.find("input.form-control");
    await frageFeld.setValue("Wie heisst die Hauptstadt von Frankreich?");

    // Drei Optionen anlegen; die erste ist die richtige.
    const optionsBox = formular
      .findAll("div.mb-3.mt-3")
      .find((d) => d.text().includes("New option"))!;
    const optionsFeld = optionsBox.find('input[type="text"]');
    const hinzufuegen = optionsBox
      .findAll("button")
      .find((b) => b.text().trim() === "Add")!;
    for (const option of ["Paris", "Rom", "Madrid"]) {
      await optionsFeld.setValue(option);
      await hinzufuegen.trigger("click");
    }

    // Speichern; das loest den POST an die gemockte Datenbank aus.
    // Save ist jetzt der submit-Knopf des Formulars (VueNewExercise), in
    // jsdom loest ein Klick auf type="submit" keinen submit-Event aus.
    await formular.find("form").trigger("submit");
    await flushPromises();

    // Vom Server erneut laden und die zuletzt angelegte Aufgabe pruefen.
    const geladen = await getAllExercises(QUIZ);
    const letzte = geladen[geladen.length - 1];
    expect(geladen).toHaveLength(1);
    expect(letzte).toMatchObject({
      quiz: "q1",
      subject: QUIZ,
      type: "multipleChoice",
      questionOrInstruction: "Wie heisst die Hauptstadt von Frankreich?",
      topic: "t1",
    });
    expect(letzte.options).toEqual([
      { option: "Paris", correct: true },
      { option: "Rom", correct: false },
      { option: "Madrid", correct: false },
    ]);
  });
});

// Die Schule haengt an der Aufgabe (nicht mehr am Thema). Aufgaben mit
// derselben Schule duerfen im Filter "School:" ausgewaehlt werden. In der
// Schulauswahl erscheinen nur die Schulen, die in diesem Quiz schon eine
// Aufgabe haben.
describe("OQuiz: nach Schule filtern", () => {
  const ALLE_SCHULEN: School[] = [
    { _id: "s1", name: "8.Klasse Gymnasium Bayern" },
    { _id: "s2", name: "9.Klasse Gymnasium Bayern" },
    { _id: "s3", name: "Hochschule Wismar" },
  ];

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () => HttpResponse.json([])),
      http.get(`${API_URL}/api/school`, () => HttpResponse.json(ALLE_SCHULEN)),
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "e1",
            quiz: "q1",
            subject: QUIZ,
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "",
            school: "s2",
          },
          {
            _id: "e2",
            quiz: "q1",
            subject: QUIZ,
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "",
            school: ALLE_SCHULEN[0],
          },
          {
            _id: "e3",
            quiz: "q1",
            subject: QUIZ,
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "",
          },
          {
            _id: "e4",
            quiz: "q2",
            subject: QUIZ,
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "",
            school: "s3",
          },
        ]),
      ),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        stubs: {
          ExerciseNavigation: false,
        },
      },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  function aktuellAngezeigt(wrapper: ReturnType<typeof mount>) {
    return wrapper.findComponent(OExercise).props("exercise") as Exercise;
  }

  it("zeigt alle Aufgaben, solange keine Schule gewaehlt ist", async () => {
    const wrapper = await mountQuiz();
    // Voreinstellung "ganzes Fach": alle vier Aufgaben des Faches, auch die
    // des anderen Quizzes (e4).
    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("3");
  });

  it("zeigt nur die Aufgaben der gewaehlten Schule", async () => {
    const wrapper = await mountQuiz();

    // Die Schule wird ueber die _id gefunden: "s2" steht in der Schulliste,
    // die gewaehlte Aufgabe traegt nur die _id.
    const filterStore = useFilterStore();
    filterStore.filterFor("q1").school = "9.Klasse Gymnasium Bayern";
    await flushPromises();

    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e1" });
    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("0");

    // Die Schule eines anderen Aufgaben-Dokuments kommt als Objekt an.
    filterStore.filterFor("q1").school = "8.Klasse Gymnasium Bayern";
    await flushPromises();
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e2" });
  });

  it("gibt nur die Schulen mit Aufgaben dieses Quizzes an die Filterzeile weiter", async () => {
    const wrapper = await mountQuiz();
    // Voreinstellung "ganzes Fach": s1, s2 und s3 kommen in Aufgaben des
    // Faches vor.
    expect(wrapper.findComponent(FilterComponent).props("schools")).toEqual([
      ALLE_SCHULEN[0],
      ALLE_SCHULEN[1],
      ALLE_SCHULEN[2],
    ]);

    // Bei "nur dieses Quiz" bleiben s1 und s2 (Aufgaben dieses Quizzes), s3
    // nur in einem anderen Quiz und darf deshalb nicht erscheinen.
    useFilterStore().filterFor("q1").scope = "quiz";
    await flushPromises();
    expect(wrapper.findComponent(FilterComponent).props("schools")).toEqual([
      ALLE_SCHULEN[0],
      ALLE_SCHULEN[1],
    ]);
  });

  it("setzt die gewaehlte Schule zurueck, wenn der Umfang wechselt", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").school = "9.Klasse Gymnasium Bayern";
    await flushPromises();
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e1" });

    // Der Wechsel des Umfangs aendert die Schulauswahl und verwirft deshalb
    // die bisher gewaehlte Schule.
    filterStore.filterFor("q1").scope = "quiz";
    await flushPromises();
    expect(filterStore.filterFor("q1").school).toBe("");
  });
});

// Ein Link wie
// https://florianingerl.github.io/#englisch?topic=...&school=...
// soll das Thema und die Schule schon auswaehlen. Die generischen Parameter
// topic/school gelten nur, wenn der Anker der URL zu diesem Quiz gehoert.
describe("OQuiz: Deep-Link waehlt Thema und Schule", () => {
  const SCHULEN: School[] = [
    { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
  ];

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json<Topic[]>([
          {
            _id: "t-verbes",
            subject: QUIZ,
            title: "Verbes reflechi",
            tutorial: "",
          },
          { _id: "t2", subject: QUIZ, title: "Topic 2", tutorial: "" },
        ]),
      ),
      http.get(`${API_URL}/api/school`, () => HttpResponse.json(SCHULEN)),
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])),
    );
  });

  afterEach(() => {
    // Keine Spuren im jsdom-URL-Objekt hinterlassen.
    window.location.hash = "";
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  it("waehlt Thema und Schule aus dem Link aus", async () => {
    window.location.hash =
      "#englisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern";
    await mountQuiz();

    const filterStore = useFilterStore();
    expect(filterStore.filterFor("q1").topicId).toBe("t-verbes");
    expect(filterStore.filterFor("q1").school).toBe("9.Klasse Gymnasium Bayern");
  });

  it("ignoriert den Link, wenn der Anker zu einem anderen Quiz gehoert", async () => {
    window.location.hash =
      "#franzoesisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern";
    await mountQuiz();

    const filterStore = useFilterStore();
    expect(filterStore.filterFor("q1").topicId).toBe("");
    expect(filterStore.filterFor("q1").school).toBe("");
  });

  it("laesst den Filter in Ruhe, wenn der Link nichts Passendes nennt", async () => {
    window.location.hash = "#englisch?topic=Gibt%20es%20nicht";
    await mountQuiz();

    const filterStore = useFilterStore();
    expect(filterStore.filterFor("q1").topicId).toBe("");
    expect(filterStore.filterFor("q1").school).toBe("");
  });
});

// Bug: Oeffnet man einen geteilten Link, wird richtig gefiltert, aber in der
// Filterzeile (FilterComponent) erscheinen Thema und Schule nicht als
// ausgewaehlt. Die Filterzeile muss die Auswahl des Deep-Links widerspiegeln -
// auch dann, wenn in der Aufgabenliste (noch) keine Schule auftaucht, aus der
// sich die Schulauswahl sonst aufbaut.
describe("OQuiz: Filterzeile zeigt die Auswahl eines Deep-Links", () => {
  const SCHULEN: School[] = [
    { _id: "s1", name: "9.Klasse Gymnasium Bayern" },
  ];

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json<Topic[]>([
          {
            _id: "t-verbes",
            subject: QUIZ,
            title: "Verbes reflechi",
            tutorial: "",
          },
        ]),
      ),
      http.get(`${API_URL}/api/school`, () => HttpResponse.json(SCHULEN)),
      // Keine Aufgaben: so fehlt die Schule in der aus den Aufgaben
      // abgeleiteten Liste, und die Auswahl kann nur aus der Wahl selbst
      // kommen.
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])),
    );
  });

  afterEach(() => {
    window.location.hash = "";
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: false,
    });
    await flushPromises();
    return wrapper;
  }

  it("waehlt die Schule aus dem Link auch in der Filterzeile aus", async () => {
    window.location.hash =
      "#englisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern";
    const wrapper = await mountQuiz();

    const chooser = wrapper
      .findComponent(FilterComponent)
      .findComponent(MSchoolChooser);
    expect(chooser.props("modelValue")).toBe("s1");
  });

  it("zeigt das Thema aus dem Link auch in der Filterzeile", async () => {
    window.location.hash =
      "#englisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern";
    const wrapper = await mountQuiz();

    const chooser = wrapper
      .findComponent(FilterComponent)
      .findComponent(MTopicChooser);
    expect(chooser.props("modelValue")).toBe("t-verbes");
  });
});

// Aendert die Lehrkraft im Quiz Thema oder Schule, wird der passende Link
// in die Zwischenablage kopiert und unten rechts ein Hinweis gezeigt. Bleibt
// beides leer, wird nichts kopiert. Beim Oeffnen einer Seite mit Deep-Link
// wird die Zwischenablage nicht angefasst.
describe("OQuiz: Link wird beim Aendern von Thema/Schule kopiert", () => {
  const SCHULEN: School[] = [{ _id: "s1", name: "9.Klasse Gymnasium Bayern" }];
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json<Topic[]>([
          {
            _id: "t-verbes",
            subject: QUIZ,
            title: "Verbes reflechi",
            tutorial: "",
          },
        ]),
      ),
      http.get(`${API_URL}/api/school`, () => HttpResponse.json(SCHULEN)),
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])),
    );
  });

  afterEach(() => {
    window.location.hash = "";
    vi.useRealTimers();
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  // Der erwartete Link baut auf der URL der jsdom-Umgebung auf.
  function erwarteterLink(params: string): string {
    return `${window.location.origin}${window.location.pathname}#englisch?${params}`;
  }

  it("kopiert den Link zum Thema und zeigt den Hinweis", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t-verbes";
    await flushPromises();

    expect(writeText).toHaveBeenCalledWith(
      erwarteterLink("topic=Verbes%20reflechi")
    );
    expect(wrapper.find(".kopier-hinweis").text()).toContain(
      `Link ${erwarteterLink("topic=Verbes%20reflechi")} has been copied to your clipboard`
    );
  });

  it("kopiert den Link mit Thema und Schule, wenn beides gewaehlt ist", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t-verbes";
    await flushPromises();
    filterStore.filterFor("q1").school = "9.Klasse Gymnasium Bayern";
    await flushPromises();

    expect(writeText).toHaveBeenLastCalledWith(
      erwarteterLink(
        "topic=Verbes%20reflechi&school=9.Klasse%20Gymnasium%20Bayern"
      )
    );
    expect(wrapper.find(".kopier-hinweis").text()).toContain("9.Klasse");
  });

  it("blendet den Hinweis nach 3 Sekunden aus", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    // Die Nettwerk-Abfragen laufen bei echten Timern, das Ausblenden des
    // Hinweises wird danach mit faulen Timern geprueft.
    vi.useFakeTimers();
    filterStore.filterFor("q1").topicId = "t-verbes";
    await nextTick();
    await nextTick();
    expect(wrapper.find(".kopier-hinweis").exists()).toBe(true);

    vi.advanceTimersByTime(3000);
    await nextTick();
    expect(wrapper.find(".kopier-hinweis").exists()).toBe(false);
  });

  it("kopiert nichts und zeigt keinen Hinweis, wenn Thema und Schule leer bleiben", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    // Erst eine Auswahl (Hinweis erscheint), dann zurueck auf "alle":
    // dadurch entsteht weder ein neuer Link noch ein neuer Hinweis.
    // Die Nettwerk-Abfragen laufen bei echten Timern, die Zeit danach nicht.
    vi.useFakeTimers();
    filterStore.filterFor("q1").school = "9.Klasse Gymnasium Bayern";
    await nextTick();
    await nextTick();
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".kopier-hinweis").exists()).toBe(true);

    vi.advanceTimersByTime(3000);
    await nextTick();
    expect(wrapper.find(".kopier-hinweis").exists()).toBe(false);

    filterStore.filterFor("q1").school = "";
    await nextTick();
    await nextTick();
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".kopier-hinweis").exists()).toBe(false);
  });

  it("kopiert beim Oeffnen einer Seite mit Deep-Link nicht", async () => {
    window.location.hash =
      "#englisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern";
    const wrapper = await mountQuiz();

    expect(writeText).not.toHaveBeenCalled();
    expect(wrapper.find(".kopier-hinweis").exists()).toBe(false);
  });
});

// Aendert die Lehrkraft Thema oder Schule, wird die Adresse zurueckgeschrieben,
// damit die Adresszeile immer einen teilbaren Link zeigt. Der Anker wechselt
// dabei auf das gerade bearbeitete Quiz; die "-Parameter" vor dem "#" (z.B.
// lang=) bleiben erhalten. Beim Oeffnen mit Deep-Link wird nicht geschrieben.
describe("OQuiz: Adresse wird beim Aendern von Thema/Schule zurueckgeschrieben", () => {
  const SCHULEN: School[] = [{ _id: "s1", name: "9.Klasse Gymnasium Bayern" }];

  beforeEach(() => {
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json<Topic[]>([
          {
            _id: "t-verbes",
            subject: QUIZ,
            title: "Verbes reflechi",
            tutorial: "",
          },
        ]),
      ),
      http.get(`${API_URL}/api/school`, () => HttpResponse.json(SCHULEN)),
      http.get(`${API_URL}/api/exercise`, () => HttpResponse.json([])),
    );
  });

  afterEach(() => {
    window.location.hash = "";
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  it("schreibt das gewaehlte Thema in den Anker der Adresse", async () => {
    await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t-verbes";
    await flushPromises();

    expect(window.location.hash).toBe(
      "#englisch?topic=Verbes%20reflechi"
    );
  });

  it("schreibt Thema und Schule gemeinsam, korrekt kodiert", async () => {
    await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t-verbes";
    await flushPromises();
    filterStore.filterFor("q1").school = "9.Klasse Gymnasium Bayern";
    await flushPromises();

    expect(window.location.hash).toBe(
      "#englisch?topic=Verbes%20reflechi&school=9.Klasse%20Gymnasium%20Bayern"
    );
  });

  it("entfernt die Parameter wieder, wenn Thema und Schule geleert werden", async () => {
    await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t-verbes";
    await flushPromises();
    filterStore.filterFor("q1").topicId = "";
    await flushPromises();

    expect(window.location.hash).toBe("#englisch");
  });

  it("wechselt den Anker auf das gerade bearbeitete Quiz", async () => {
    // Die Adresse zeigt (noch) ein anderes Quiz.
    window.location.hash = "#franzoesisch?topic=Etwas";
    await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t-verbes";
    await flushPromises();

    expect(window.location.hash).toBe(
      "#englisch?topic=Verbes%20reflechi"
    );
  });

  it("laesst die Parameter vor dem # (z.B. lang=) unangetastet", async () => {
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?lang=fr`
    );
    await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").school = "9.Klasse Gymnasium Bayern";
    await flushPromises();

    expect(window.location.search).toBe("?lang=fr");
    expect(window.location.hash).toBe(
      "#englisch?school=9.Klasse%20Gymnasium%20Bayern"
    );
    window.history.replaceState({}, "", window.location.pathname);
  });

  it("schreibt beim Oeffnen mit Deep-Link nicht in die Adresse", async () => {
    window.location.hash =
      "#englisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern";
    await mountQuiz();

    // Der Deep-Link nennt die Schule leicht anders; die Adresse bleibt, wie
    // sie im Link stand, statt neu geschrieben zu werden.
    expect(window.location.hash).toBe(
      "#englisch?topic=Verbes%20reflechi&school=9klasseGymnasiumBayern"
    );
  });
});

// Aufgabe 16 aus InstructionsForTheAI.txt: Nur die Besitzerin der Aufgabe
// oder der Benutzer mit der Adresse imelflorianingerl@gmail.com darf
// bearbeiten und loeschen. Die Knopfe duerfen dann nicht sichtbar sein.
describe("OQuiz: Bearbeiten und Loeschen nur fuer Besitzerin oder Admin", () => {
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
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "e1",
            quiz: "q1",
            subject: QUIZ,
            topic: "t1",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Fill the gap",
            gapText: "a {b} c",
            user: "u-owner",
          },
        ]),
      ),
    );
  });

  async function mountMitBenutzer(user: User) {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Die Knopfleiste soll echt gerendert werden.
        stubs: { LoginToEditComponent: false },
      },
      shallow: true,
    });
    await flushPromises();

    const auth = useAuthStore();
    auth.token = "test-token";
    auth.user = user;
    await flushPromises();
    return wrapper;
  }

  it("fremder Benutzer sieht keinen Edit- und keinen Delete-Knopf", async () => {
    const wrapper = await mountMitBenutzer({
      _id: "u-other",
      name: "Other",
      email: "other@example.com",
    } as User);

    expect(wrapper.find('[title="Add a new exercise"]').exists()).toBe(true);
    expect(wrapper.find('[title="Edit the exercise"]').exists()).toBe(false);
    expect(wrapper.find('[title="Delete the exercise"]').exists()).toBe(false);
  });

  it("die Besitzerin der Aufgabe sieht Edit- und Delete-Knopf", async () => {
    const wrapper = await mountMitBenutzer({
      _id: "u-owner",
      name: "Owner",
      email: "owner@example.com",
    } as User);

    expect(wrapper.find('[title="Edit the exercise"]').exists()).toBe(true);
    expect(wrapper.find('[title="Delete the exercise"]').exists()).toBe(true);
  });

  it("die Admin-Adresse sieht beide Knoepfe, auch ohne Besitz", async () => {
    const wrapper = await mountMitBenutzer({
      _id: "u-admin",
      name: "Admin",
      email: "imelflorianingerl@gmail.com",
    } as User);

    expect(wrapper.find('[title="Edit the exercise"]').exists()).toBe(true);
    expect(wrapper.find('[title="Delete the exercise"]').exists()).toBe(true);
  });

  it("eine Aufgabe ohne Besitzerin darf nur die Admin-Adresse bearbeiten", async () => {
    server.use(
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "e2",
            quiz: "q1",
            subject: QUIZ,
            topic: "t1",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Fill the gap",
            gapText: "a {b} c",
          },
        ]),
      ),
    );

    const fremd = await mountMitBenutzer({
      _id: "u-other",
      name: "Other",
      email: "other@example.com",
    } as User);
    expect(fremd.find('[title="Edit the exercise"]').exists()).toBe(false);
    expect(fremd.find('[title="Delete the exercise"]').exists()).toBe(false);
    fremd.unmount();

    const admin = await mountMitBenutzer({
      _id: "u-admin",
      name: "Admin",
      email: "IMELFlorianingerl@Gmail.com",
    } as User);
    expect(admin.find('[title="Edit the exercise"]').exists()).toBe(true);
    expect(admin.find('[title="Delete the exercise"]').exists()).toBe(true);
  });
});

// Navigation mit den Pfeiltasten zwischen den Aufgaben: Pfeil links/rechts
// bewegt um eine Aufgabe, mit Umschalttaste (oder Bild auf/ab) um fuenf. An
// den Raendern wird gestoppt, nicht umgebrochen. Waehrend der Eingabe in einem
// Feld sowie im Formular oder Tutorial-Tab sind die Tasten wirkungslos.
describe("OQuiz: Navigation mit den Pfeiltasten", () => {
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
      // Sieben Aufgaben, damit Sprünge um fuenf sichtbar werden.
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>(
          Array.from({ length: 7 }, (_, k) => ({
            _id: `e${k + 1}`,
            quiz: "q1",
            subject: QUIZ,
            topic: "t1",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Fill the gap",
            gapText: `a {${k}} c`,
          })),
        ),
      ),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        stubs: { ExerciseNavigation: false },
      },
      // Damit das Wurzelelement ans document angebunden wird (fuer keydown).
      attachTo: document.body,
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  function aktuell(wrapper: ReturnType<typeof mount>) {
    return wrapper.findComponent(OExercise).props("exercise") as Exercise;
  }

  // Der Handler haengt am Quiz-Wurzelelement; Tasten werden dort ausgeloest.
  async function taste(
    wrapper: ReturnType<typeof mount>,
    key: string,
    init: KeyboardEventInit = {},
  ) {
    await wrapper
      .get("[data-quiz-root]")
      .trigger("keydown", { key, ...init });
    await flushPromises();
  }

  it("geht mit Pfeil rechts/links um je eine Aufgabe", async () => {
    const wrapper = await mountQuiz();
    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });

    await taste(wrapper, "ArrowRight");
    expect(aktuell(wrapper)).toMatchObject({ _id: "e2" });

    await taste(wrapper, "ArrowLeft");
    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });
    wrapper.unmount();
  });

  it("springt mit Umschalt+Pfeil um fuenf Aufgaben", async () => {
    const wrapper = await mountQuiz();

    await taste(wrapper, "ArrowRight", { shiftKey: true });
    expect(aktuell(wrapper)).toMatchObject({ _id: "e6" });

    await taste(wrapper, "ArrowLeft", { shiftKey: true });
    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });
    wrapper.unmount();
  });

  it("springt mit Bild auf/ab um fuenf Aufgaben", async () => {
    const wrapper = await mountQuiz();

    await taste(wrapper, "PageDown");
    expect(aktuell(wrapper)).toMatchObject({ _id: "e6" });

    await taste(wrapper, "PageUp");
    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });
    wrapper.unmount();
  });

  it("stoppt am Anfang und am Ende, ohne umzubrechen", async () => {
    const wrapper = await mountQuiz();

    await taste(wrapper, "ArrowLeft");
    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });

    await taste(wrapper, "ArrowRight", { shiftKey: true });
    expect(aktuell(wrapper)).toMatchObject({ _id: "e6" });
    await taste(wrapper, "ArrowRight", { shiftKey: true });
    expect(aktuell(wrapper)).toMatchObject({ _id: "e7" });
    await taste(wrapper, "ArrowRight", { shiftKey: true });
    expect(aktuell(wrapper)).toMatchObject({ _id: "e7" });
    wrapper.unmount();
  });

  it("reagiert nicht, wenn ein Eingabefeld den Fokus hat", async () => {
    const wrapper = await mountQuiz();
    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });

    // Ein Eingabefeld im Quiz: die Tasten sollen die Aufgabe nicht wechseln.
    const input = wrapper
      .get("[data-quiz-root]")
      .element.ownerDocument.createElement("input");
    wrapper.get("[data-quiz-root]").element.appendChild(input);
    input.focus();

    // keydown blubbert vom fokussierten Feld zum Quiz-Wurzelelement.
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
    await flushPromises();

    expect(aktuell(wrapper)).toMatchObject({ _id: "e1" });
    wrapper.unmount();
  });

  it("navigiert nur das fokussierte Quiz, wenn mehrere auf der Seite liegen", async () => {
    // Die Startseite rendert mehrere Quizze gleichzeitig. Nur das fokussierte
    // Quiz darf auf die Tasten reagieren, damit z.B. die franzoesische Aufgabe
    // nicht vom (frueher eingebundenen) Mathematik-Quiz "geschluckt" wird.
    const erstes = await mountQuiz();
    const zweites = await mountQuiz();

    // Tasten gehen an das zweite Quiz.
    await taste(zweites, "ArrowRight");
    expect(aktuell(zweites)).toMatchObject({ _id: "e2" });
    // Das erste Quiz bleibt unveraendert.
    expect(aktuell(erstes)).toMatchObject({ _id: "e1" });

    // Und umgekehrt: nur das erste Quiz reagiert.
    await taste(erstes, "ArrowRight");
    expect(aktuell(erstes)).toMatchObject({ _id: "e2" });
    expect(aktuell(zweites)).toMatchObject({ _id: "e2" });

    erstes.unmount();
    zweites.unmount();
  });
});

describe("OQuiz: Erfolgs-Toasts nach dem Speichern und Loeschen", () => {
  const aufgabe: Exercise = {
    _id: "e1",
    quiz: QUIZ,
    subject: QUIZ,
    topic: "t1",
    type: "gapText",
    imageUrl: "",
    questionOrInstruction: "Fill the gap",
    gapText: "a {b} c",
    user: "u-owner",
  };

  let toasts: ToastMessage[];
  let onAdd: (message: ToastMessage) => void;

  beforeEach(() => {
    toasts = [];
    onAdd = (message) => toasts.push(message);
    ToastEventBus.on("add", onAdd);
    i18n.global.locale.value = "de";

    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      http.get(`${API_URL}/api/topic/:quiz`, () =>
        HttpResponse.json<Topic[]>([
          { _id: "t1", subject: QUIZ, title: "Topic 1", tutorial: "" },
        ]),
      ),
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([aufgabe]),
      ),
      http.post(`${API_URL}/api/exercise`, async ({ request }) => {
        const body = (await request.json()) as Exercise;
        return HttpResponse.json({ ...body, _id: "e2" }, { status: 201 });
      }),
      http.put(`${API_URL}/api/exercise/:id`, async ({ request }) => {
        const body = (await request.json()) as Exercise;
        return HttpResponse.json(body);
      }),
      http.delete(`${API_URL}/api/exercise/:id`, () =>
        HttpResponse.json({ message: "deleted" }),
      ),
    );
  });

  afterEach(() => {
    ToastEventBus.off("add", onAdd);
    vi.restoreAllMocks();
  });

  async function mountMitOwner() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Die Knopfleiste soll echt gerendert werden.
        stubs: { LoginToEditComponent: false },
      },
      shallow: true,
    });
    await flushPromises();

    const auth = useAuthStore();
    auth.token = "test-token";
    auth.user = {
      _id: "u-owner",
      name: "Owner",
      email: "owner@example.com",
    } as User;
    await flushPromises();
    return wrapper;
  }

  it("zeigt nach dem Anlegen eine Erfolgsmeldung", async () => {
    const wrapper = await mountMitOwner();

    await wrapper.get('[title="Add a new exercise"]').trigger("click");
    await flushPromises();

    wrapper.findComponent(VueNewExercise).vm.$emit("new-exercise-created", {
      quiz: QUIZ,
      type: "gapText",
      imageUrl: "",
      questionOrInstruction: "Fill the gap",
      gapText: "x {y} z",
      topic: "t1",
    } as Exercise);
    await flushPromises();

    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toMatchObject({
      severity: "success",
      summary: "Die Aufgabe wurde erfolgreich in der Datenbank erstellt.",
    });
  });

  it("zeigt nach dem Bearbeiten eine Erfolgsmeldung", async () => {
    const wrapper = await mountMitOwner();

    await wrapper.get('[title="Edit the exercise"]').trigger("click");
    await flushPromises();

    wrapper
      .findComponent(VueNewExercise)
      .vm.$emit("new-exercise-created", { ...aufgabe, gapText: "x {y} z" });
    await flushPromises();

    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toMatchObject({
      severity: "success",
      summary: "Die Aufgabe wurde erfolgreich in der Datenbank aktualisiert.",
    });
  });

  it("zeigt nach dem Loeschen eine Erfolgsmeldung", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const wrapper = await mountMitOwner();

    await wrapper.get('[title="Delete the exercise"]').trigger("click");
    await flushPromises();

    expect(window.confirm).toHaveBeenCalledWith(
      "Do you really want to delete this question?",
    );
    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toMatchObject({
      severity: "success",
      summary: "Die Aufgabe wurde erfolgreich aus der Datenbank gelöscht.",
    });
  });

  it("zeigt keine Erfolgsmeldung, wenn das Loeschen abgebrochen wird", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const wrapper = await mountMitOwner();

    await wrapper.get('[title="Delete the exercise"]').trigger("click");
    await flushPromises();

    expect(toasts).toHaveLength(0);
  });
});

// Wenn der Benutzer nach einem Thema filtert, zeigt das Quiz die Aufgaben
// dieses Themas und aller seiner Unterthemen (rekursiv) an. Die Aufgaben der
// Elternthemen werden dabei nicht mit angezeigt.
describe("OQuiz: Themenfilter zeigt die Aufgaben der Unterthemen", () => {
  beforeEach(() => {
    // Der Filter-Watcher kopiert den Deep-Link; ohne Stub schlaegt das in
    // jsdom fehl.
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    server.use(
      http.get(`${API_URL}/api/quiz`, () =>
        HttpResponse.json([
          { _id: "q1", website: "web", subject: QUIZ, name: QUIZ },
        ]),
      ),
      // Dieselbe URL liefert entweder alle Themen des Faches (getAllTopics)
      // oder ein einzelnes Thema (getTopic fuer die aktuelle Aufgabe).
      http.get(`${API_URL}/api/topic/:quiz`, ({ params }) => {
        const themen: Topic[] = [
          { _id: "t1", subject: QUIZ, title: "Thema 1", tutorial: "" },
          {
            _id: "t2",
            subject: QUIZ,
            title: "Unterthema 1.1",
            tutorial: "",
            parentId: "t1",
          },
          {
            _id: "t3",
            subject: QUIZ,
            title: "Unterthema 1.1.1",
            tutorial: "",
            parentId: "t2",
          },
        ];
        if (params.quiz === QUIZ) return HttpResponse.json(themen);
        const thema = themen.find((t) => t._id === params.quiz);
        return thema
          ? HttpResponse.json(thema)
          : HttpResponse.json({ message: "not found" }, { status: 404 });
      }),
      http.get(`${API_URL}/api/school`, () => HttpResponse.json([])),
      http.get(`${API_URL}/api/exercise`, () =>
        HttpResponse.json<Exercise[]>([
          {
            _id: "e1",
            quiz: "q1",
            subject: QUIZ,
            topic: "t1",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Aufgabe des Themas",
            gapText: "a {b} c",
          },
          {
            _id: "e2",
            quiz: "q1",
            subject: QUIZ,
            topic: "t2",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Aufgabe des Unterthemas",
            gapText: "d {e} f",
          },
          {
            _id: "e3",
            quiz: "q1",
            subject: QUIZ,
            topic: "t3",
            type: "gapText",
            imageUrl: "",
            questionOrInstruction: "Aufgabe des Unter-Unterthemas",
            gapText: "g {h} i",
          },
        ]),
      ),
    );
  });

  async function mountQuiz() {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(OQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Die Paginierung soll echt gerendert werden, damit die Anzahl der
        // angezeigten Aufgaben ablesbar ist.
        stubs: { ExerciseNavigation: false },
      },
      shallow: true,
    });
    await flushPromises();
    return wrapper;
  }

  function aktuellAngezeigt(wrapper: ReturnType<typeof mount>) {
    return wrapper.findComponent(OExercise).props("exercise") as Exercise;
  }

  it("zeigt beim Filter auf ein Eltern-Thema auch alle Unterthemen an", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t1";
    await flushPromises();

    // Thema (e1), Unterthema (e2) und Unter-Unterthema (e3): 3 Aufgaben.
    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("2");
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e1" });
  });

  it("zeigt beim Filter auf ein Unterthema nicht die Aufgaben des Eltern-Themas", async () => {
    const wrapper = await mountQuiz();
    const filterStore = useFilterStore();

    filterStore.filterFor("q1").topicId = "t2";
    await flushPromises();

    // Nur Unterthema (e2) und dessen Unterthema (e3): e1 fehlt.
    expect(wrapper.get('input[type="number"]').attributes("max")).toBe("1");
    expect(aktuellAngezeigt(wrapper)).toMatchObject({ _id: "e2" });
  });
});
