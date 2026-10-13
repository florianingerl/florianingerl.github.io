import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL, getAllExercises } from "@/api";
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

// Das Mathematik-Quiz (Fach "mathematics") laedt das Thema "Gruppen" und die
// dazugehoerigen Multiple-Choice-Aufgaben, die auf dem Wikipedia-Artikel ueber
// Gruppen beruhen.
describe("VueQuiz: Mathematik-Quiz laedt Thema 'Gruppen' und Aufgaben", () => {
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
            instruction: "W\u00e4hle die richtige Antwort.",
            question:
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
    const wrapper = mount(VueQuiz, {
      props: { quiz: MATHE, lg: "de" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();

    const aufgabe = wrapper
      .findComponent(VueExercise)
      .props("exercise") as Exercise;
    expect(aufgabe).toMatchObject({ _id: "em1", type: "multipleChoice" });
    expect(wrapper.text()).not.toContain("Keine Fragen vorhanden.");
  });
});

// Das Web-Programming-Quiz (Fach "webprogramming") laedt das Thema
// "TypeScript - destructuring expressions" und die Multiple-Choice-Aufgaben,
// die auf dem Medium-Artikel ueber ES6-Destructuring beruhen.
describe("VueQuiz: Web-Programming-Quiz laedt Destructuring-Thema und Aufgaben", () => {
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
            instruction: "Choose the correct answer.",
            question:
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
    const wrapper = mount(VueQuiz, {
      props: { quiz: WEB, lg: "de" },
      global: { plugins: [pinia] },
      shallow: true,
    });
    await flushPromises();

    const aufgabe = wrapper
      .findComponent(VueExercise)
      .props("exercise") as Exercise;
    expect(aufgabe).toMatchObject({ _id: "ew1", type: "multipleChoice" });
    expect(wrapper.text()).not.toContain("Keine Fragen vorhanden.");
  });
});

// Der Vollbild-Knopf neben An- bzw. Abmelden schaltet das Quiz in den
// Vollbildmodus. jsdom kennt die Fullscreen-API nicht, darum wird sie gestubbt.
describe("VueQuiz: Vollbildmodus", () => {
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
    const wrapper = mount(VueQuiz, {
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
      get: () => wrapper.element,
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
      get: () => wrapper.element,
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
});

// Ohne Anmeldung duerfen die drei Knoepfe zum Anlegen, Bearbeiten und Loeschen
// nicht sichtbar sein; stattdessen steht dort der Anmelde-Hinweis.
describe("VueQuiz: nicht angemeldet", () => {
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
            instruction: "Fill the gap",
            gapText: "a {b} c",
          },
        ]),
      ),
    );
  });

  it("zeigt statt der drei Knoepfe den Anmelde-Hinweis", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(VueQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: { plugins: [pinia] },
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
describe("VueQuiz: Multiple-Choice-Aufgabe anlegen (Server-Roundtrip)", () => {
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
    const wrapper = mount(VueQuiz, {
      props: { quiz: QUIZ, lg: "en" },
      global: {
        plugins: [pinia],
        // Nur das Aufgaben-Formular wird echt gebraucht; die uebrigen Kinder
        // (u.a. der Jodit-Editor in VueNewTopic) sind fuer den Test unnoetig.
        stubs: {
          VueNewTopic: true,
          VueExercise: true,
          VueTopicDisplayer: true,
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
    const selecte = formular.findAll("select");
    // selecte[0] = Thema, selecte[1] = Typ.
    await selecte[1].setValue("multipleChoice");

    // Thema "Topic 1" auswaehlen (Option 0 ist "Please select one").
    const themenSelect = selecte[0].element as HTMLSelectElement;
    themenSelect.selectedIndex = 1;
    await selecte[0].trigger("change");
    await flushPromises();

    // Die Frage eintippen (erstes Textfeld mit Klasse "form-control"; das Feld
    // "New option" und "Image url" kommen spaeter im DOM).
    const frageFeld = formular.findAll("input.form-control")[0];
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
    const speichern = formular
      .findAll("button")
      .find((b) => b.text().trim() === "Save")!;
    await speichern.trigger("click");
    await flushPromises();

    // Vom Server erneut laden und die zuletzt angelegte Aufgabe pruefen.
    const geladen = await getAllExercises(QUIZ);
    const letzte = geladen[geladen.length - 1];
    expect(geladen).toHaveLength(1);
    expect(letzte).toMatchObject({
      quiz: "q1",
      subject: QUIZ,
      type: "multipleChoice",
      question: "Wie heisst die Hauptstadt von Frankreich?",
      topic: "t1",
    });
    expect(letzte.options).toEqual([
      { option: "Paris", correct: true },
      { option: "Rom", correct: false },
      { option: "Madrid", correct: false },
    ]);
  });
});
