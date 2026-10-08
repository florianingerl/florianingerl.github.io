<template>
  <div>
  
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <div v-if="dialog === null" class="d-flex flex-wrap align-items-center gap-2">
        <button
          v-if="auth.angemeldet && !formOffen"
          type="button"
          class="btn btn-success"
          title="Add a new exercise"
          @click="oeffneFormular(false)"
        >
          <i class="bi bi-plus-lg" aria-hidden="true"></i>
        </button>
        <button
          v-if="auth.angemeldet && !formOffen && aktuelle"
          type="button"
          class="btn btn-primary"
          title="Edit the exercise"
          @click="oeffneFormular(true)"
        >
          <i class="bi bi-pencil-square" aria-hidden="true"></i>
        </button>
        <button
          v-if="auth.angemeldet && !formOffen && aktuelle?._id"
          type="button"
          class="btn btn-danger"
          title="Delete the exercise"
          @click="loeschen"
        >
          <i class="bi bi-trash" aria-hidden="true"></i>
        </button>
        <span v-if="!auth.angemeldet" class="text-muted">
          Log in to create, edit or delete exercises and tutorials.
        </span>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <template v-if="auth.angemeldet">
          <span v-if="dialog === null" class="badge text-bg-success">
            Logged in with {{ auth.email }}
          </span>
          <button
            v-if="dialog === null"
            type="button"
            class="btn btn-outline-secondary btn-sm"
            title="Modify your profile or your settings"
            @click="dialogOeffnen('profile')"
          >
            <i class="bi bi-person-gear me-1" aria-hidden="true"></i>
            Profile
          </button>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click="abmelden"
          >
            <i class="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
            Logout
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            @click="dialogOeffnen('signup')"
          >
            <i class="bi bi-person-plus me-1" aria-hidden="true"></i>
            Sign up
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="dialogOeffnen('login')"
          >
            <i class="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>
            Login
          </button>
        </template>
      </div>
    </div>

    <!-- Solange kein Dialog offen ist, wird das Quiz gezeigt. -->
    <template v-if="dialog === null">
    <div v-if="formOffen && tab === 'exercise'">
      <VueNewExercise
        :quiz="quiz"
        :questionOfQuiz="aktuelle"
        :editMode="editMode"
        @new-exercise-created="gespeichert"
        @cancel-clicked="formOffen = false"
      />
    </div>

    <p v-if="laden">{{ t.laden }}</p>
    <p v-if="fehler" class="text-danger">{{ fehler }}</p>

    <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
      <label for="topicFilter" class="form-label mb-0">
        Filter for topic:
      </label>
      <select id="topicFilter" v-model="filter.topicId">
        <option value="">{{ t.alleThemen }}</option>
        <option v-for="topic in topics" :key="topic._id" :value="topic._id">
          {{ topic.title }}
        </option>
      </select>
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        title="Show filtering options"
        @click="dialogOeffnen('filter')"
      >
        <i class="bi bi-funnel" aria-hidden="true"></i>
      </button>
    </div>

  
    <ul class="nav nav-tabs" role="tablist">
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

    <div v-show="tab === 'exercise'">
      <VueExercise
        v-if="aktuelle"
        :key="aktuelle._id ?? i"
        :exercise="aktuelle"
        :lg="lg"
        @answered-event="calcScore"
      />

      <p v-if="displayedQuestions.length === 0">{{ t.keineFragen }}</p>

      <ul class="pagination">
        <li class="page-item">
          <button class="page-link" :title="t.zurueck5" @click="springe(-5)">
            <i class="fa fa-fast-backward" aria-hidden="true"></i>
          </button>
        </li>
        <li class="page-item">
          <button class="page-link" :title="t.zurueck" @click="springe(-1)">
            <i class="fa fa-backward" aria-hidden="true"></i>
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
            <i class="fa fa-forward" aria-hidden="true"></i>
          </button>
        </li>
        <li class="page-item">
          <button class="page-link" :title="t.weiter5" @click="springe(5)">
            <i class="fa fa-fast-forward" aria-hidden="true"></i>
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

      <p>Your score: {{ scoreText }}</p>
    </div> <!-- End of <div v-if= " tab === 'exercise'"></div>-->

    <div v-show="tab === 'tutorial'">
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
        @cancel-clicked="formOffen = false"
        @tutorial-saved="formOffen = false; tutorialGespeichert($event)"
      />
    </div>

    <VueExportToFacile
      v-if="exportOffen && darfExportieren"
      :quiz="quiz"
      :topic="aktuelle?.topic"
      :lg="lg"
      @cancel-clicked="exportOffen = false"
    />
    </template>

    <!-- Ist ein Dialog offen, ist die restliche Oberflaeche unsichtbar. -->
    <VueSignUp
      v-else-if="dialog === 'signup'"
      dialog
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
      :quiz="quiz"
      :topics="topics"
      :creators="creators"
      @cancel-clicked="dialog = null"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import VueExercise from "./VueExercise.vue";
import VueTopicDisplayer from "./VueTopicDisplayer.vue";
import VueNewExercise from "./VueNewExercise.vue";
import VueNewTopic from "./VueNewTopic.vue";
import VueExportToFacile from "./VueExportToFacile.vue";
import VueSignUp from "./VueSignUp.vue";
import VueLogin from "./VueLogin.vue";
import VueProfile from "./VueProfile.vue";
import VueFilterDialog from "./VueFilterDialog.vue";
import {
  API_URL,
  createExercise,
  deleteExercise,
  getExercises,
  istNichtAngemeldet,
  updateExercise,
  getAllTopics,
  createTopic,
  getTopic
} from "@/api";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import type { Exercise, Lang, QuizName, Topic } from "@/types/quiz";

const props = defineProps<{ quiz: QuizName; lg: Lang }>();

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
// ueberleben und pro Quiz getrennt gespeichert sind.
const filterStore = useFilterStore();
const filter = filterStore.filterFor(props.quiz);

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

// Texte
interface Texte {
  laden: string;
  alleThemen: string;
  keineFragen: string;
  zurueck5: string;
  zurueck: string;
  weiter: string;
  weiter5: string;
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
  return filter.caseSensitive ? s : s.toLowerCase();
}

// Frontend-Filterung: Theme, Ersteller und Suchwort werden hier angewandt.
const displayedQuestions = computed<Exercise[]>(() =>
  questions.value.filter((q) => {
    if (filter.topicId) {
      const id = typeof q.topic === "string" ? q.topic : q.topic?._id;
      if (id !== filter.topicId) return false;
    }
    if (filter.creator && q.user !== filter.creator) return false;
    if (filter.word && !suchTexte(q).some((s) => norm(s).includes(norm(filter.word))))
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
  () => [filter.topicId, filter.creator, filter.word, filter.caseSensitive],
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

  try {
    topics.value = await getAllTopics(props.quiz);

    console.log(
      "Here are all the topics from the database for quiz " + props.quiz
    );
    console.log(topics.value);
  } catch (e) {
    fehler.value = `Themen konnten nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`;
  }

  try {
    questions.value = await getExercises(props.quiz);
    console.log(questions.value);
  } catch (e) {
    fehler.value = `Fragen konnten nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`;
  } finally {
    laden.value = false;
  }

  setCurrentTutorial();
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

  if (ex.topic && typeof ex.topic !== "string" && ex.topic._id === undefined) {
    ex.topic = await createTopic(ex.topic);
    console.log("Id of the topic is " + ex.topic._id);
  }

  try {
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
    // Filter aufheben, kurz warten (der Watcher springt auf 0) und dann zur gespeicherten Frage springen
    filterStore.reset(props.quiz);
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
