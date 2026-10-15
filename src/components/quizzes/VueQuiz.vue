<template>
  <div ref="quizRoot" :class="{ 'quiz-vollbild': istVollbild }">
  
    <div class="d-flex flex-row align-items-center gap-2 mb-3">
      <LoginToEditComponent
        v-if="dialog === null"
        class="flex-grow-1"
        :form-open="formOffen"
        :can-edit="!!aktuelle"
        :can-delete="!!aktuelle?._id"
        @create-clicked="oeffneFormular(false)"
        @edit-clicked="oeffneFormular(true)"
        @delete-clicked="loeschen"
        @login-clicked="dialogOeffnen('login')"
        @signup-clicked="dialogOeffnen('signup')"
        @profile-clicked="dialogOeffnen('profile')"
        @logout-clicked="abmelden"
      />

      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        :title="istVollbild ? t.vollbildBeenden : t.vollbild"
        @click="vollbildUmschalten"
      >
        <i
          class="bi"
          :class="istVollbild ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'"
          aria-hidden="true"
        ></i>
      </button>
    </div>

    <!-- Solange kein Dialog offen ist, wird das Quiz gezeigt. -->
    <template v-if="dialog === null">
    <div v-if="formOffen && tab === 'exercise'">
      <VueNewExercise
        :quiz="formQuiz"
        :subject="formSubject"
        :questionOfQuiz="aktuelle"
        :editMode="editMode"
        @new-exercise-created="gespeichert"
        @cancel-clicked="formOffen = false"
      />
    </div>

    <p v-if="laden">{{ t.laden }}</p>
    <p v-if="fehler" class="text-danger">{{ fehler }}</p>

    <div v-show="!formOffen" class="d-flex flex-wrap align-items-center gap-2 mb-3">
      <label for="topicFilter" class="form-label mb-0">
        Filter for topic:
      </label>
      <VueTopicFilter v-model="filter.topicId" :topics="topics" />
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        title="Show filtering options"
        @click="dialogOeffnen('filter')"
      >
        <i class="bi bi-funnel" aria-hidden="true"></i>
      </button>
    </div>

  
    <ul class="nav nav-tabs" role="tablist" v-show="!formOffen">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: tab === 'exercise' }"
          type="button"
          role="tab"
          @click="tab = 'exercise'"
        >
          Exercises
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: tab === 'tutorial' }"
          type="button"
          role="tab"
          @click="tab = 'tutorial'"
        >
          Tutorial
        </button>
      </li>
    </ul>

    <div v-show="tab === 'exercise' && !formOffen">
      <VueExercise
        v-if="aktuelle"
        :key="aktuelle._id ?? i"
        :exercise="aktuelle"
        :lg="lg"
        @answered-event="calcScore"
      >
        <!-- Die Paginierung steht direkt unter dem Aufgabenbild. -->
        <template #pagination>
          <ul class="pagination">
            <li class="page-item">
              <button class="page-link" :title="t.zurueck5" @click="springe(-5)">
                <i class="bi bi-chevron-double-left" aria-hidden="true"></i>
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" :title="t.zurueck" @click="springe(-1)">
                <i class="bi bi-chevron-left" aria-hidden="true"></i>
              </button>
            </li>
            <li
              v-for="q in indices"
              :key="q"
              class="page-item"
              :class="{ active: q === i }"
            >
              <button class="page-link" @click="i = q">{{ q }}</button>
            </li>
            <li class="page-item">
              <button class="page-link" :title="t.weiter" @click="springe(1)">
                <i class="bi bi-chevron-right" aria-hidden="true"></i>
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" :title="t.weiter5" @click="springe(5)">
                <i class="bi bi-chevron-double-right" aria-hidden="true"></i>
              </button>
            </li>
            <input
              type="number"
              min="0"
              :max="letzterIndex"
              :value="i"
              style="width: 50px"
              @change="gehZu"
            />
            <span> / {{ letzterIndex }}</span>
          </ul>
        </template>
      </VueExercise>

      <p v-if="displayedQuestions.length === 0">{{ t.keineFragen }}</p>

      <p>Your score: {{ scoreText }}</p>
    </div> <!-- End of <div v-if= " tab === 'exercise'"></div>-->

    <div v-show="tab === 'tutorial' && !formOffen">
      <div class="row">
      <VueTopicDisplayer class="col" :topic="aktuelle?.topic" />

      
      <div class="col">
        <button
          v-if="darfExportieren"
          @click="exportToFrancaisFacileClicked"
        >
          Export to francaisfacile.com
        </button>
      </div>
    </div>

      <div
        v-if="!formOffen"
        style="height: 167px; overflow-y: auto; background-color: antiquewhite;"
        v-html="currentTutorial"
      ></div>

      <VueNewTopic
        v-if="formOffen"
        :questionOfQuiz="aktuelle"
        :topics="topics"
        @cancel-clicked="formOffen = false"
        @tutorial-saved="formOffen = false; tutorialGespeichert($event)"
      />
    </div>

    <VueExportToFacile
      v-if="exportOffen && darfExportieren && !props.quizId"
      :quiz="exportQuiz"
      :topic="aktuelle?.topic"
      :lg="lg"
      @cancel-clicked="exportOffen = false"
    />
    </template>

    <!-- Ist ein Dialog offen, ist die restliche Oberflaeche unsichtbar. -->
    <VueSignUp
      v-else-if="dialog === 'signup'"
      @signed-up="nachRegistrierung"
      @cancel-clicked="dialog = null"
    />

    <VueLogin
      v-else-if="dialog === 'login'"
      :email="loginEmail"
      @logged-in="dialog = null"
      @cancel-clicked="dialog = null"
    />

    <VueProfile
      v-else-if="dialog === 'profile'"
      @saved="dialog = null"
      @cancel-clicked="dialog = null"
      @logout-clicked="abmelden"
    />

    <VueFilterDialog
      v-else-if="dialog === 'filter'"
      :quiz="quizSchluessel"
      :topics="topics"
      :creators="creators"
      @cancel-clicked="dialog = null"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import VueExercise from "./VueExercise.vue";
import VueTopicDisplayer from "./VueTopicDisplayer.vue";
import VueNewExercise from "./VueNewExercise.vue";
import VueNewTopic from "./VueNewTopic.vue";
import VueExportToFacile from "./VueExportToFacile.vue";
import VueSignUp from "./VueSignUp.vue";
import VueLogin from "./VueLogin.vue";
import VueProfile from "./VueProfile.vue";
import VueFilterDialog from "./VueFilterDialog.vue";
import VueTopicFilter from "./VueTopicFilter.vue";
import LoginToEditComponent from "./LoginToEditComponent.vue";
import {
  API_URL,
  createExercise,
  deleteExercise,
  getExercises,
  getExercisesBySubject,
  getQuiz,
  getQuizByName,
  istNichtAngemeldet,
  updateExercise,
  getAllTopics,
  createTopic,
  getTopic
} from "@/api";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import { bildGroesseImVollbild } from "@/utils/vollbild";
import { oldestAncestorSchool } from "@/utils/topicTree";
import type { Exercise, Lang, Quiz, QuizName, Topic } from "@/types/quiz";

// "quiz" ist der Name eines Website-Quizzes (z.B. "deutsch"). Buch-Quizzes
// haben keine eigene Seite, sondern werden ueber ihre _id geladen ("quizId");
// ihre Sprache/Fach steckt dann im Quiz-Dokument.
const props = defineProps<{ quiz?: QuizName; quizId?: string; lg: Lang }>();

// Nur diesem Benutzer wird der Export-Button angezeigt. Die Grossschreibung
// wird ignoriert, damit die Schreibweise des Kontos keine Rolle spielt.
const EXPORT_EMAIL = "imelflorianingerl@gmail.com";

// Anmeldung. Ohne Anmeldung darf nichts angelegt, geaendert oder geloescht
// werden, deshalb pruefen die Schaltflaechen unten auf auth.angemeldet.
const auth = useAuthStore();

// Der Export gehoert nur dem unten genannten Benutzer.
const darfExportieren = computed(
  () => auth.angemeldet && auth.email.trim().toLowerCase() === EXPORT_EMAIL
);

// Welcher Dialog gerade an der Stelle des Quiz steht (null = keiner).
type DialogArt = "signup" | "login" | "profile" | "filter";
const dialog = ref<DialogArt | null>(null);
const loginEmail = ref<string>("");

// Filter der Aufgaben. Die Werte liegen im Store, damit sie den Dialog
// ueberleben und pro Quiz getrennt gespeichert sind. Der Schluessel ist bei
// einem Buch-Quizz dessen _id, sonst der Name des Website-Quizzes.
const filterStore = useFilterStore();
const quizSchluessel = ref<string>(props.quizId ?? props.quiz ?? "");
const filter = computed(() => filterStore.filterFor(quizSchluessel.value));

// Das geladene Quiz-Dokument. Bei einem Buch-Quizz steckt es hinter der quizId,
// bei einem Website-Quizz wird es ueber sein Fach (props.quiz) nachgeschlagen.
const geladenesQuiz = ref<Quiz | null>(null);

// Sprache oder Fach des angezeigten Quizzes (z.B. "deutsch", "nutrition").
const subject = computed(() => geladenesQuiz.value?.subject ?? props.quiz ?? "");
// Die _id des angezeigten Quizzes, wenn bekannt. Sie entscheidet beim Filter
// "Only the exercises of this quiz" darueber, welche Aufgaben zu diesem Quiz
// gehoeren.
const currentQuizId = computed(
  () => geladenesQuiz.value?._id ?? props.quizId ?? "",
);

// Womit das Formular neue Aufgaben speichert bzw. welche Themen es anbietet:
// die _id des Quizzes (Website- und Buch-Quizz), sonst dessen Name.
const formQuiz = computed(() => currentQuizId.value || props.quiz || "");
const formSubject = computed(() => subject.value);
// Von wo Themen geladen werden: alle Themen des Faches.
const topicsVon = computed(() => subject.value);
// Der Export gibt es nur fuer die Website-Quizze. Von dort werden die Aufgaben
// ueber den Quiz-Namen nachgeschlagen.
const exportQuiz = computed<QuizName>(() => props.quiz ?? "deutsch");

// Zustand
const questions = ref<Exercise[]>([]);
const laden = ref(true);
const fehler = ref("");
const i = ref(0);
const scoreText = ref("");
const tab = ref<"exercise" | "tutorial">("exercise");
const formOffen = ref(false);
const editMode = ref(false);
const exportOffen = ref(false);

// Vollbildmodus: Der Knopf neben An- bzw. Abmelden schaltet das Quiz in den
// Vollbildmodus. Der Browser verlaesst ihn mit ESC und meldet das ueber das
// fullscreenchange-Ereignis.
const quizRoot = ref<HTMLElement | null>(null);
const istVollbild = ref(false);

async function vollbildUmschalten(): Promise<void> {
  const el = quizRoot.value;
  if (!el) return;
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen();
    }
  } catch {
    // Erlaubt der Browser keinen Vollbildmodus, bleibt die Anzeige unveraendert.
  }
}

function vollbildGeaendert(): void {
  istVollbild.value = document.fullscreenElement === quizRoot.value;
  void nextTick(() => {
    if (istVollbild.value) {
      vollbildGroesseAnpassen();
    } else {
      vollbildGroesseZuruecksetzen();
    }
  });
}

// Im Vollbildmodus soll das Aufgabenbild die verfuegbare Hoehe ausfuellen,
// ohne das Seitenverhaeltnis zu verzerren. Dabei bleibt unter dem Bild Platz
// fuer die Paginierung, die dort in ihrer bevorzugten Hoehe steht. Rechts neben
// dem Bild bleiben mindestens 400px fuer die Antwortmoeglichkeiten.
const PAGINIERUNG_ABSTAND = 8;

function vollbildGroesseAnpassen(): void {
  const root = quizRoot.value;
  if (!root || !istVollbild.value) return;
  const img = root.querySelector<HTMLImageElement>(".vue-image__img");
  if (!img) return;

  // Noch nicht geladene Bilder haben keine Naturgroesse; dann warten wir auf
  // das load-Ereignis und passen die Groesse danach an.
  if (!img.complete) {
    img.addEventListener("load", () => vollbildGroesseAnpassen(), {
      once: true,
    });
    return;
  }
  if (!img.naturalWidth || !img.naturalHeight) return;

  // Die Paginierung steht direkt unter dem Bild und behaelt ihre Hoehe.
  const pagination = root.querySelector<HTMLElement>(".pagination");
  const reservierteHoehe = pagination
    ? pagination.offsetHeight + PAGINIERUNG_ABSTAND
    : 0;

  const rootRect = root.getBoundingClientRect();
  const imgRect = img.getBoundingClientRect();
  const verfuegbareHoehe = root.clientHeight - (imgRect.top - rootRect.top);

  const { breite, hoehe } = bildGroesseImVollbild({
    viewportBreite: window.innerWidth,
    verfuegbareHoehe,
    bildBreite: img.naturalWidth,
    bildHoehe: img.naturalHeight,
    reservierteHoehe,
  });

  img.style.width = `${breite}px`;
  img.style.height = `${hoehe}px`;
}

// Beim Verlassen des Vollbildmodus wieder die normale Darstellung herstellen.
function vollbildGroesseZuruecksetzen(): void {
  const root = quizRoot.value;
  if (!root) return;
  root.querySelectorAll<HTMLImageElement>(".vue-image__img").forEach((img) => {
    img.style.width = "";
    img.style.height = "";
  });
}

// Aendert sich die Fenstergroesse, wird die Bildgroesse neu berechnet.
function beiFensterGroesse(): void {
  if (istVollbild.value) vollbildGroesseAnpassen();
}

// Texte
interface Texte {
  laden: string;
  alleThemen: string;
  keineFragen: string;
  zurueck5: string;
  zurueck: string;
  weiter: string;
  weiter5: string;
  vollbild: string;
  vollbildBeenden: string;
  score: (richtig: number, beantwortet: number) => string;
}

const texte: Record<Lang, Texte> = {
  de: {
    laden: "Lade Fragen ...",
    alleThemen: "Bitte wähle ein Thema !",
    keineFragen: "Keine Fragen vorhanden.",
    zurueck5: "Gehe 5 Aufgaben zurück",
    zurueck: "Vorige Aufgabe",
    weiter: "Nächste Aufgabe",
    weiter5: "Gehe 5 Aufgaben weiter",
    vollbild: "Vollbildmodus",
    vollbildBeenden: "Vollbildmodus beenden",
    score: (r, b) => `Du hast ${r} von ${b} Fragen richtig beantwortet`,
  },
  en: {
    laden: "Loading questions ...",
    alleThemen: "Please choose a topic !",
    keineFragen: "No questions available.",
    zurueck5: "Jump 5 exercises backward",
    zurueck: "Previous exercise",
    weiter: "Next exercise",
    weiter5: "Jump 5 exercises forward",
    vollbild: "Fullscreen",
    vollbildBeenden: "Leave fullscreen",
    score: (r, b) => `You have answered ${r} of ${b} questions correctly.`,
  },
  fr: {
    laden: "Chargement des questions ...",
    alleThemen: "Choisis un thème !",
    keineFragen: "Aucune question disponible.",
    zurueck5: "Sauter 5 exercices en arrière",
    zurueck: "Question précédente",
    weiter: "Question suivante",
    weiter5: "Sauter 5 questions",
    vollbild: "Plein écran",
    vollbildBeenden: "Quitter le plein écran",
    score: (r, b) => `Tu as répondu à ${r} parmi ${b} questions correctement.`,
  },
};

const currentTutorial = ref<string>();

const t = computed(() => texte[props.lg]);

// Abgeleitete Werte
const topics = ref<Topic[]>([]);

// Alle Benutzer, die mindestens eine dieser Aufgaben erstellt haben.
const creators = computed<string[]>(() => {
  const ids = new Set<string>();
  questions.value.forEach((q) => {
    if (q.user) ids.add(q.user);
  });
  return [...ids].sort();
});

// Alle Stellen einer Aufgabe, in denen das Suchwort vorkommen darf: das
// Topic, die Anweisung, der Lückentext, die Frage(n), die Optionen und die
// Sätze einer matching-Aufgabe.
function suchTexte(q: Exercise): string[] {
  const titel =
    typeof q.topic === "string"
      ? topics.value.find((t) => t._id === q.topic)?.title ?? ""
      : q.topic?.title ?? "";
  return [
    titel,
    q.instruction ?? "",
    q.gapText ?? "",
    q.question ?? "",
    q.questionEn ?? "",
    q.questionFr ?? "",
    ...(q.options ?? []).map((o) => o.option),
    ...(q.optionsEn ?? []).map((o) => o.option),
    ...(q.optionsFr ?? []).map((o) => o.option),
    ...(q.sentences ?? []).flatMap((s) => [s.part1, s.part2]),
    q.wordorder?.sentence ?? "",
  ];
}

function norm(s: string): string {
  return filter.value.caseSensitive ? s : s.toLowerCase();
}

// Frontend-Filterung: Quiz-Umfang ("nur dieses Quiz" oder "ganzes Fach"),
// Theme, Ersteller und Suchwort werden hier angewandt.
const displayedQuestions = computed<Exercise[]>(() =>
  questions.value.filter((q) => {
    const f = filter.value;
    // Ohne bekannte Quiz-_id (z.B. noch nicht migrierte Daten) entfaellt die
    // Einschraenkung auf dieses Quiz, damit weiterhin Aufgaben zu sehen sind.
    if (f.scope === "quiz" && currentQuizId.value) {
      const quizId = typeof q.quiz === "string" ? q.quiz : q.quiz?._id;
      if (quizId !== currentQuizId.value) return false;
    }
    if (f.topicId) {
      const id = typeof q.topic === "string" ? q.topic : q.topic?._id;
      if (id !== f.topicId) return false;
    }
    if (f.school) {
      const id = typeof q.topic === "string" ? q.topic : q.topic?._id;
      const schule = id
        ? oldestAncestorSchool(topics.value, id)
        : typeof q.topic === "object"
          ? q.topic?.school ?? ""
          : "";
      if (schule !== f.school) return false;
    }
    if (f.creator && q.user !== f.creator) return false;
    if (
      f.word &&
      !suchTexte(q).some((s) => norm(s).includes(norm(f.word)))
    )
      return false;
    return true;
  })
);

const aktuelle = computed<Exercise | undefined>(
  () => displayedQuestions.value[i.value]
);

const letzterIndex = computed(() =>
  Math.max(displayedQuestions.value.length - 1, 0)
);

const indices = computed<number[]>(() => {
  const a: number[] = [];
  let j = Math.floor(i.value / 5) * 5;
  for (let k = 0; k < 5 && j < displayedQuestions.value.length; k++, j++)
    a.push(j);
  return a;
});

function exportToFrancaisFacileClicked(): void {
  if (!darfExportieren.value) return;
  exportOffen.value = true;
}

// Anmeldung ---------------------------------------------------------

// Beim Oeffnen eines Dialogs werden die Formulare geschlossen, damit sie nicht
// mit veralteten Daten im Hintergrund weiterlaufen.
function dialogOeffnen(art: DialogArt): void {
  formOffen.value = false;
  exportOffen.value = false;
  dialog.value = art;
}

// Nach dem Registrieren direkt den Login-Dialog zeigen und die Adresse
// uebernehmen, damit sie nicht noch einmal getippt werden muss.
function nachRegistrierung(email: string): void {
  loginEmail.value = email;
  dialog.value = "login";
}

function abmelden(): void {
  auth.abmelden();
  dialog.value = null;
  loginEmail.value = "";
}

// Das Token des Servers gilt nur eine Stunde. Wer dann noch gespeichert oder
// geloescht hat, bekommt wieder den Login-Dialog.
function sitzungAbgelaufen(e: unknown): boolean {
  if (!istNichtAngemeldet(e)) return false;
  auth.abmelden();
  dialogOeffnen("login");
  return true;
}


// Navigation
function springe(delta: number): void {
  i.value = Math.min(Math.max(i.value + delta, 0), letzterIndex.value);
}

function gehZu(e: Event): void {
  const u = parseInt((e.target as HTMLInputElement).value);
  if (
    !Number.isNaN(u) &&
    u >= 0 &&
    u < displayedQuestions.value.length
  )
    i.value = u;
}

// Bei jeder Filteraenderung wieder bei der ersten Aufgabe beginnen und das
// Tutorial der neuen aktuellen Aufgabe nachladen.
watch(
  () => [
    filter.value.scope,
    filter.value.topicId,
    filter.value.creator,
    filter.value.word,
    filter.value.caseSensitive,
  ],
  () => {
    i.value = 0;
    setCurrentTutorial();
  }
);

async function setCurrentTutorial() {
  if(displayedQuestions.value.length == 0){
    currentTutorial.value = "";
    return;
  }
  let ex: Exercise = displayedQuestions.value[i.value];
  if (!ex.topic) {
    currentTutorial.value =
      "<h1>This exercise doesn't have a topic! So you can't write a tutorial!</h1>";
    return;
  }
  if (typeof ex.topic === "string") {
    ex.topic = await getTopic(ex.topic);
  }
  currentTutorial.value = ex.topic.tutorial;
}

watch(i, async () => {
  setCurrentTutorial();
});

// Das Topic der gespeicherten Frage im Speicher aktualisieren und die Anzeige neu laden
function tutorialGespeichert(topic: Topic): void {
  const j = questions.value.findIndex((q) => q._id === aktuelle.value?._id);
  if (j !== -1) questions.value[j].topic = topic;
  // Auch die Themenliste aktualisieren, damit z.B. die Schule im Baum stimmt.
  const k = topics.value.findIndex((t) => t._id === topic._id);
  if (k !== -1) topics.value[k] = topic;
  setCurrentTutorial();
}

watch(formOffen, async () => {
  setCurrentTutorial();
});

// Score
function calcScore(): void {
  let beantwortet = 0;
  let richtig = 0;
  questions.value.forEach((q) => {
    if (q.correctlyAnswered === undefined) return;
    beantwortet++;
    if (q.correctlyAnswered) richtig++;
  });
  scoreText.value = t.value.score(richtig, beantwortet);
}

// Laden aus der Datenbank
onMounted(async () => {
  // Eine auf der letzten Seite begonnene Anmeldung fortsetzen.
  auth.sitzungWiederherstellen();

  // Zuerst das Quiz-Dokument laden: Bei einem Buch-Quizz ueber seine _id, bei
  // einem Website-Quizz ueber sein Fach. Daraus kommen die Sprache/fach (fuer
  // die Themen und Aufgaben) und die _id (fuer den Filter "nur dieses Quiz").
  if (props.quizId) {
    try {
      geladenesQuiz.value = await getQuiz(props.quizId);
    } catch (e) {
      fehler.value = `Das Quiz konnte nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`;
    }
  } else if (props.quiz) {
    try {
      geladenesQuiz.value = (await getQuizByName(props.quiz)) ?? null;
    } catch (e) {
      fehler.value = `Das Quiz konnte nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`;
    }
  }
  quizSchluessel.value = props.quizId ?? currentQuizId.value ?? props.quiz ?? "";

  try {
    topics.value = await getAllTopics(topicsVon.value);

    console.log(
      "Here are all the topics from the database for subject " + topicsVon.value
    );
    console.log(topics.value);
  } catch (e) {
    fehler.value = `Themen konnten nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`;
  }

  try {
    // Alle Aufgaben des Faches laden; der Filter entscheidet danach, ob nur die
    // Aufgaben dieses Quizzes uebrig bleiben.
    questions.value = subject.value
      ? await getExercisesBySubject(subject.value)
      : await getExercises(props.quiz);
    console.log(questions.value);
  } catch (e) {
    fehler.value = `Fragen konnten nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`;
  } finally {
    laden.value = false;
  }

  setCurrentTutorial();
});

// Den Vollbildzustand verfolgen, damit das Icon und die Beschriftung passen.
onMounted(() => {
  document.addEventListener("fullscreenchange", vollbildGeaendert);
  window.addEventListener("resize", beiFensterGroesse);
});
onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", vollbildGeaendert);
  window.removeEventListener("resize", beiFensterGroesse);
});

// Anlegen / bearbeiten / löschen
function oeffneFormular(bearbeiten: boolean): void {
  if (!auth.angemeldet) {
    dialogOeffnen("login");
    return;
  }
  editMode.value = bearbeiten;
  formOffen.value = true;
}

async function gespeichert(ex: Exercise): Promise<void> {
  console.log("Exercise to be inserted:");
  console.log(ex);

  // Ein neues Thema (noch ohne _id) wird zuerst angelegt. Erst danach kann die
  // Aufgabe mit der _id des Themas gespeichert werden.
  const neuesThema =
    !!ex.topic && typeof ex.topic !== "string" && ex.topic._id === undefined;

  try {
    if (neuesThema && ex.topic && typeof ex.topic !== "string") {
      ex.topic = await createTopic(ex.topic);
      console.log("Id of the topic is " + ex.topic._id);
    }

    const bearbeiten = editMode.value && !!ex._id;
    const neu = bearbeiten
      ? await updateExercise(ex)
      : await createExercise(ex);
    if (bearbeiten) {
      const j = questions.value.findIndex((q) => q._id === neu._id);
      if (j !== -1) questions.value[j] = neu;
    } else {
      questions.value.push(neu);
    }
    editMode.value = false;
    formOffen.value = false;

    // Die bisherige Auswahl im Thema-Dropdown merken, damit sie sich beim
    // Aktualisieren der Liste nicht aendert.
    const gewaehltesThema = filter.value.topicId;

    // Filter aufheben, kurz warten (der Watcher springt auf 0) und dann zur gespeicherten Frage springen
    filterStore.reset(quizSchluessel.value);

    // Wurde ein neues Thema angelegt, die Themenliste erneut aus der Datenbank
    // laden, damit das neue Thema im Filter-Dropdown erscheint. Es steht am
    // Ende der Liste. Die Auswahl wird danach wiederhergestellt.
    if (neuesThema) {
      topics.value = await getAllTopics(topicsVon.value);
      filter.value.topicId = gewaehltesThema;
    }

    await nextTick();
    i.value = Math.max(
      displayedQuestions.value.findIndex((q) => q._id === neu._id),
      0
    );
  } catch (e) {
    if (sitzungAbgelaufen(e)) return;
    alert(`Speichern fehlgeschlagen: ${(e as Error).message}`);
  }
}

async function loeschen(): Promise<void> {
  if (!auth.angemeldet) {
    dialogOeffnen("login");
    return;
  }
  const q = aktuelle.value;
  if (!q?._id) return;
  if (!window.confirm("Do you really want to delete this question?")) return;
  try {
    await deleteExercise(q._id);
    questions.value = questions.value.filter((x) => x._id !== q._id);
    if (i.value > letzterIndex.value) i.value = letzterIndex.value;
  } catch (e) {
    if (sitzungAbgelaufen(e)) return;
    alert(`Löschen fehlgeschlagen: ${(e as Error).message}`);
  }
}
</script>

<style scoped>
/* Im Vollbildmodus nimmt das Quiz den ganzen Bildschirm ein und behaelt
   dieselben Farben (Hintergrund und Textfarbe) wie in der normalen Ansicht. */
.quiz-vollbild {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
  color: #444444;
}

.quiz-vollbild:fullscreen {
  width: 100vw;
  height: 100vh;
}

.quiz-vollbild::backdrop {
  background-color: #fff;
}
</style>
