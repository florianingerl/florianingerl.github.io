<template>

<!--
 if !formoppen
    display filtercomponent ok 
    display tab ok 
    if tab == 'exercise' ok
      if question 
        OExercise
        ExerciseNavigat
        Score panel
      else
        display no question
    else if tab == 'tutorial'
      if question
        VueTutorialDisplayer(need to create)
      else
        display no question     
 else 
    if tab == 'exercise' 
      display VueNewExercise
    else
      display VueNewTopic  
-->


  <div style="display:flex; flex-direction: column; gap: 2px; align-items: stretch;" ref="quizRoot" data-quiz-root tabindex="0" :class="{ 'quiz-vollbild': istVollbild }" @keydown="beiTaste">
  
    <div class="d-flex flex-row align-items-center gap-2 mb-3">
      <LoginToEditComponent
        v-if="dialog === null"
        class="flex-grow-1"
        :form-open="formOffen"
        :can-edit="!!aktuelle && darfAendern"
        :can-delete="!!aktuelle?._id && darfAendern"
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

    <div v-show="!formOffen && dialog==null " class="quiz-body">
      <FilterComponent
      
      class="mb-3"
      :quiz="quizSchluessel"
      :topics="topics"
      :schools="schulenFuerFilter"
      @open-advanced-filter="dialogOeffnen('filter')"/>
      
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

<div v-if="tab == 'exercise'" class="quiz-tab">
     <div v-if="displayedQuestions.length > 0" class="quiz-tab__inner" style="display: flex; flex-direction: column;">
     <OExercise
        style="flex-grow: 1; align-self: stretch; "
        v-if="aktuelle"
        :key="aktuelle._id ?? i"
        :exercise="aktuelle"
        :lg="lg"
        :vollbild="istVollbild"
        @answered-event="calcScore"
      />

      <!-- Die Paginierung steht unter dem Splitter, nicht in einem Panel. -->
      <ExerciseNavigation
        v-if="displayedQuestions.length != 0"
        :i="i"
        :indices="indices"
        :letzter-index="letzterIndex"
        :lg="lg"
        @navigate="springe"
        @select="waehleIndex"
      />
      <p>Your score: {{ scoreText }}</p>
      </div> <!-- End of div displayedQuestins.length > 0 -->

      <p v-if="displayedQuestions.length <= 0">{{ t.keineFragen }}</p>
        </div> <!-- End of div tab == 'exercise'-->
    
    <div v-if="tab == 'tutorial'" class="quiz-tab">
        <div style="display:flex; flex-direction: row; gap: 2px;">
            <MTopicDisplayer :topic="aktuelle?.topic" />
             <button
                v-if="darfExportieren"
                @click="exportToFrancaisFacileClicked"
              >
                Export to francaisfacile.com
              </button>
      
        </div>
        <div 
        class="quiz-tutorial"
        v-html="currentTutorial"
      ></div>
    </div> <!-- End of div tab=="tutorial"-->
      
  </div> <!--End of div !formOffen -->
      
  
   

   
     

    <!-- Solange kein Dialog offen ist, wird das Quiz gezeigt. -->
    <div v-if="formOffen && dialog==null" class="quiz-form" style="flex-grow: 1; display:flex; flex-direction: column; gap: 2px;" >
     

      <VueNewExercise
        v-if="tab == 'exercise'"
        style="flex-grow: 1;"
        :quiz="formQuiz"
        :subject="formSubject"
        :questionOfQuiz="aktuelle"
        :editMode="editMode"
        :schools="verfuegbareSchulen"
        :vollbild="istVollbild"
        @new-exercise-created="gespeichert"
        @school-created="schuleHinzugefuegt"
        @topic-created="themaErstellt"
        @cancel-clicked="formOffen = false"
      />

       <VueNewTopic
        v-if="tab == 'tutorial'"
        style="flex-grow: 1;"
        :questionOfQuiz="aktuelle"
        :vollbild="istVollbild"
        @cancel-clicked="formOffen = false"
        @tutorial-saved="formOffen = false; tutorialGespeichert($event)"
      />
    </div>     <!-- End of div formOpen-->     

  </div>


  <!-- Here come the dialogs now-->
    <VueExportToFacile
      v-if="exportOffen && darfExportieren && !props.quizId"
      :quiz="exportQuiz"
      :topic="aktuelle?.topic"
      :lg="lg"
      @cancel-clicked="exportOffen = false"
    />

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
      :schools="schulenFuerFilter"
      @cancel-clicked="dialog = null"
    />

   <!-- Kurzhinweis unten rechts, wenn das Aendern von Thema oder Schule den
         Link in die Zwischenablage kopiert hat. -->
    <div v-if="kopierHinweis" class="kopier-hinweis" role="status">
      {{ kopierHinweis }}
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
import OExercise from "./OExercise.vue";
import ExerciseNavigation from "./ExerciseNavigation.vue";
import MTopicDisplayer from "@/components/molecules/MTopicDisplayer.vue";
import VueNewExercise from "./VueNewExercise.vue";
import VueNewTopic from "./VueNewTopic.vue";
import VueExportToFacile from "./VueExportToFacile.vue";
import VueSignUp from "./VueSignUp.vue";
import VueLogin from "./VueLogin.vue";
import VueProfile from "./VueProfile.vue";
import VueFilterDialog from "./VueFilterDialog.vue";
import FilterComponent from "./FilterComponent.vue";
import LoginToEditComponent from "./LoginToEditComponent.vue";
import { QUIZ_ANKER } from "./quizAnker";
import {
  API_URL,
  createExercise,
  deleteExercise,
  fehlerText,
  getExercises,
  getExercisesBySubject,
  getQuiz,
  getQuizByName,
  getSchools,
  istNichtAngemeldet,
  updateExercise,
  getAllTopics,
  createTopic,
  getTopic
} from "@/api";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import { bildGroesseImVollbild } from "@/utils/vollbild";
import { showSuccessToast } from "@/utils/toast";
import {
  getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz,
  getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject,
} from "@/utils/school";
import { findSubtreeIds } from "@/utils/topicTree";
import type { Exercise, Lang, Quiz, QuizName, School, Topic } from "@/types/quiz";

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
  vollbild: string;
  vollbildBeenden: string;
  score: (richtig: number, beantwortet: number) => string;
}

const texte: Record<Lang, Texte> = {
  de: {
    laden: "Lade Fragen ...",
    alleThemen: "Bitte wähle ein Thema !",
    keineFragen: "Keine Fragen vorhanden.",
    vollbild: "Vollbildmodus",
    vollbildBeenden: "Vollbildmodus beenden",
    score: (r, b) => `Du hast ${r} von ${b} Fragen richtig beantwortet`,
  },
  en: {
    laden: "Loading questions ...",
    alleThemen: "Please choose a topic !",
    keineFragen: "No questions available.",
    vollbild: "Fullscreen",
    vollbildBeenden: "Leave fullscreen",
    score: (r, b) => `You have answered ${r} of ${b} questions correctly.`,
  },
  fr: {
    laden: "Chargement des questions ...",
    alleThemen: "Choisis un thème !",
    keineFragen: "Aucune question disponible.",
    vollbild: "Plein écran",
    vollbildBeenden: "Quitter le plein écran",
    score: (r, b) => `Tu as répondu à ${r} parmi ${b} questions correctement.`,
  },
  it: {
    laden: "Caricamento delle domande ...",
    alleThemen: "Scegli un argomento !",
    keineFragen: "Nessuna domanda disponibile.",
    vollbild: "Schermo intero",
    vollbildBeenden: "Esci dallo schermo intero",
    score: (r, b) => `Hai risposto correttamente a ${r} di ${b} domande.`,
  },
  es: {
    laden: "Cargando las preguntas ...",
    alleThemen: "¡Elige un tema!",
    keineFragen: "No hay preguntas disponibles.",
    vollbild: "Pantalla completa",
    vollbildBeenden: "Salir de pantalla completa",
    score: (r, b) => `Has respondido correctamente ${r} de ${b} preguntas.`,
  },
};

const currentTutorial = ref<string>();

const t = computed(() => texte[props.lg]);

// Abgeleitete Werte
const topics = ref<Topic[]>([]);

// Alle Schulen aus der Datenbank. In die Auswahllisten (Filterzeile,
// Filterdialog, Formular) kommen aber nur die, die hier im Quiz schon eine
// Aufgabe haben (siehe verfuegbareSchulen).
const schools = ref<School[]>([]);

// Eine im Formular neu angelegte Schule in die Auswahlliste aufnehmen.
function schuleHinzugefuegt(schule: School): void {
  if (!schools.value.some((s) => s._id === schule._id || s.name === schule.name)) {
    schools.value.push(schule);
  }
}

// Ein im Formular neu angelegtes Thema in die Themenliste aufnehmen, damit
// es auch im Themen-Filter erscheint. Es ist schon gespeichert (mit _id).
function themaErstellt(thema: Topic): void {
  if (!topics.value.some((t) => t._id === thema._id)) {
    topics.value.push(thema);
  }
}

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
    q.questionOrInstruction ?? "",
    q.gapText ?? "",
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
// Der Name der Schule einer Aufgabe. Der Server schickt die Schule als
// Dokument mit (populate); ist nur die _id bekannt, wird der Name in der
// geladenen Schulliste nachgeschlagen.
function schulName(q: Exercise): string {
  const s = q.school;
  if (!s) return "";
  if (typeof s !== "string") return s.name ?? "";
  return schools.value.find((x) => x._id === s)?.name ?? "";
}

// Gehoert die Aufgabe zum angezeigten Quiz? Ohne bekannte Quiz-_id (z.B. noch
// nicht migrierte Daten) werden alle Aufgaben als zugehoerig betrachtet.
function gehoertZumQuiz(q: Exercise): boolean {
  if (!currentQuizId.value) return true;
  const quizId = typeof q.quiz === "string" ? q.quiz : q.quiz?._id;
  return quizId === currentQuizId.value;
}

// Nur die Schulen, die im gewaehlten Umfang (scope) schon mindestens eine
// Aufgabe haben. Sie erscheinen in der Schulauswahl der Filterzeile, des
// erweiterten Filterdialogs und des Aufgaben-Formulars. Eine Schule ohne
// Aufgabe waere dort nutzlos. Bei "subject" zaehlen alle Aufgaben desselben
// Faches, bei "quiz" nur die dieses Quizzes.
const verfuegbareSchulen = computed<School[]>(() =>
  filter.value.scope === "subject"
    ? getAllSchoolsWhereTHereisAtLeastOneExerciseForThatSchoolInTheSubject(
        questions.value,
        schools.value,
        subject.value,
      )
    : getAllSchoolsWhereThereisAtLeastOneExerciseWithThatSchoolInTheQuiz(
        questions.value,
        schools.value,
        currentQuizId.value,
      ),
);

// Fuer die Schulauswahl in der Filterzeile: die verfuegbaren Schulen. Ist schon
// eine Schule gewaehlt (z.B. aus einem Deep-Link), wird sie immer mit
// aufgenommen - auch bevor die Aufgaben geladen sind. Sonst koennte die
// Auswahl nicht angezeigt werden, solange verfuegbareSchulen noch leer ist.
const schulenFuerFilter = computed<School[]>(() => {
  const liste = verfuegbareSchulen.value;
  const gewaehlt = filter.value.school;
  if (!gewaehlt) return liste;
  if (liste.some((s) => s.name === gewaehlt)) return liste;
  const ausListe = schools.value.find((s) => s.name === gewaehlt);
  if (!ausListe) return liste;
  return [ausListe, ...liste];
});

// Wechselt der Umfang ("nur dieses Quiz" <-> "ganzes Fach"), aendert sich die
// Liste der waehlbaren Schulen. Damit keine Schule ausgewaehlt bleibt, die es
// im neuen Umfang nicht mehr gibt, wird die Schulauswahl dann zurueckgesetzt.
watch(
  () => filter.value.scope,
  () => {
    filter.value.school = "";
  },
);

// Frontend-Filterung: Quiz-Umfang ("nur dieses Quiz" oder "ganzes Fach"),
// Theme, Schule, Ersteller und Suchwort werden hier angewandt.
// Bei einer Themenfilter-Auswahl zeigt das Quiz alle Aufgaben des
// gewaehlten Themas und alle Aufgaben seiner Unterthemen (rekursiv, also bis
// zur tiefsten Ebene). Die _id des Themas inklusive aller Unterthemen werden
// ermittelt.
const gefilterteThemenIds = computed<string[]>(() =>
  filter.value.topicId ? findSubtreeIds(topics.value, filter.value.topicId) : [],
);

const displayedQuestions = computed<Exercise[]>(() =>
  questions.value.filter((q) => {
    const f = filter.value;
    // Ohne bekannte Quiz-_id (z.B. noch nicht migrierte Daten) entfaellt die
    // Einschraenkung auf dieses Quiz, damit weiterhin Aufgaben zu sehen sind.
    if (f.scope === "quiz" && !gehoertZumQuiz(q)) return false;
    if (f.topicId) {
      const id = typeof q.topic === "string" ? q.topic : q.topic?._id;
      // Der Themenfilter zeigt alle Aufgaben des Themas und alle Aufgaben
      // seiner Unterthemen (rekursiv) an.
      if (!id || !gefilterteThemenIds.value.includes(id)) return false;
    }
    if (f.school && schulName(q) !== f.school) return false;
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

// Nur die Besitzerin der Aufgabe oder der Benutzer mit der Admin-Adresse
// darf Aufgaben aendern und loeschen (Aufgabe 16 aus InstructionsForTheAI).
// Der Server prueft dasselbe und antwortet sonst mit 403. Ein neues Thema
// ohne _id hat noch keine Besitzerin - das darf nur die Admin-Adresse
// bearbeiten.
const darfAendern = computed(() => {
  if (!auth.angemeldet || !aktuelle.value) return false;
  if (auth.email.trim().toLowerCase() === EXPORT_EMAIL) return true;
  return !!aktuelle.value.user && aktuelle.value.user === auth.user?._id;
});

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

function waehleIndex(index: number): void {
  if (
    !Number.isNaN(index) &&
    index >= 0 &&
    index < displayedQuestions.value.length
  )
    i.value = index;
}

// Tastatur-Navigation zwischen den Aufgaben: Pfeil links/rechts bewegt um
// eine Aufgabe, mit gedrueckter Umschalttaste (oder Bild auf/ab) um fuenf.
// Der Handler haengt am Quiz-Wurzelelement (tabindex), sodass auf einer Seite
// mit mehreren Quizzen nur das angeklickte bzw. fokussierte Quiz reagiert.
// Waehrend der Eingabe in einem Textfeld, waehrend des Formulars, eines
// Dialogs oder im Tutorial-Tab sind die Tasten wirkungslos.
function istEingabefeld(ziel: EventTarget | null): boolean {
  if (!(ziel instanceof HTMLElement)) return false;
  const tag = ziel.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    ziel.isContentEditable
  );
}

function beiTaste(event: KeyboardEvent): void {
  if (event.defaultPrevented) return;
  if (tab.value !== "exercise") return;
  if (formOffen.value || dialog.value != null || exportOffen.value) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (istEingabefeld(event.target)) return;

  switch (event.key) {
    case "ArrowLeft":
      springe(event.shiftKey ? -5 : -1);
      break;
    case "ArrowRight":
      springe(event.shiftKey ? 5 : 1);
      break;
    case "PageUp":
      springe(-5);
      break;
    case "PageDown":
      springe(5);
      break;
    default:
      return;
  }
  event.preventDefault();
}

// Bei jeder Filteraenderung wieder bei der ersten Aufgabe beginnen und das
// Tutorial der neuen aktuellen Aufgabe nachladen.
watch(
  () => [
    filter.value.scope,
    filter.value.topicId,
    filter.value.school,
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

// Vergleicht Titel bzw. Schulnamen unabhaengig von Grossschreibung, Leer- und
// Sonderzeichen, damit "9.Klasse Gymnasium Bayern" zu "9klasseGymnasiumBayern"
// aus dem Link passt.
function normalisiert(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Ein Link wie
// "#franzoesisch?topic=verbesreflechi&school=9klasseGymnasiumBayern"
// springt zum Quiz und waehlt dort schon Thema und Schule aus. Die generischen
// Parameter topic/school gelten nur, wenn der Anker der URL zu diesem Quiz
// gehoert (siehe QUIZ_ANKER) - auf der Startseite stehen ja mehrere Quize.
function deepLinkAnwenden(): void {
  if (!props.quiz) return;
  const fragezeichen = window.location.hash.indexOf("?");
  const anker = window.location.hash.slice(
    1,
    fragezeichen === -1 ? undefined : fragezeichen
  );
  if (anker !== QUIZ_ANKER[props.quiz]) return;
  if (fragezeichen === -1) return;
  const params = new URLSearchParams(
    window.location.hash.slice(fragezeichen + 1)
  );

  const thema = params.get("topic");
  if (thema) {
    const gefunden = topics.value.find(
      (t) => normalisiert(t.title) === normalisiert(thema)
    );
    if (gefunden?._id) filter.value.topicId = gefunden._id;
  }

  const schule = params.get("school");
  if (schule) {
    const gefunden = schools.value.find(
      (s) => normalisiert(s.name) === normalisiert(schule)
    );
    if (gefunden) filter.value.school = gefunden.name;
  }
}

// Kopieren des Links in die Zwischenablage ---------------------------

// Hinweis unten rechts und sein Ausblende-Timer.
const kopierHinweis = ref("");
let kopierHinweisTimer: ReturnType<typeof setTimeout> | undefined;

function zeigeKopierHinweis(text: string): void {
  kopierHinweis.value = text;
  if (kopierHinweisTimer) clearTimeout(kopierHinweisTimer);
  kopierHinweisTimer = setTimeout(() => {
    kopierHinweis.value = "";
    kopierHinweisTimer = undefined;
  }, 3000);
}

onBeforeUnmount(() => {
  if (kopierHinweisTimer) clearTimeout(kopierHinweisTimer);
});

// Der Link, den die Lehrkraft an die Schueler schicken kann:
// "https://florianingerl.github.io/#franzoesisch?topic=...&school=...".
// Ohne Website-Quiz (z.B. Buch-Quizz) gibt es keinen Anker und damit keinen
// Link. Ohne Thema und ohne Schule gibt es keinen Link zur Auswahl - dann
// wird auch nichts kopiert und kein Hinweis gezeigt.
function teilbarerLink(): string | undefined {
  if (!props.quiz) return undefined;
  const anker = QUIZ_ANKER[props.quiz];
  if (!anker) return undefined;

  const teile: string[] = [];
  if (filter.value.topicId) {
    const titel = topics.value.find((t) => t._id === filter.value.topicId)
      ?.title;
    if (titel) teile.push(`topic=${encodeURIComponent(titel)}`);
  }
  if (filter.value.school)
    teile.push(`school=${encodeURIComponent(filter.value.school)}`);
  if (teile.length === 0) return undefined;

  const grund = `${window.location.origin}${window.location.pathname}#${anker}`;
  return teile.length === 0 ? grund : `${grund}?${teile.join("&")}`;
}

// Der Anker-Teil der Adresse (ohne Domain/Pfad), passend zum gerade
// bearbeiteten Quiz: "#franzoesisch?topic=...&school=...". Ist weder Thema
// noch Schule gewaehlt, bleibt nur "#franzoesisch".
function ankerMitParametern(): string | undefined {
  if (!props.quiz) return undefined;
  const anker = QUIZ_ANKER[props.quiz];
  if (!anker) return undefined;

  const teile: string[] = [];
  if (filter.value.topicId) {
    const titel = topics.value.find((t) => t._id === filter.value.topicId)
      ?.title;
    if (titel) teile.push(`topic=${encodeURIComponent(titel)}`);
  }
  if (filter.value.school)
    teile.push(`school=${encodeURIComponent(filter.value.school)}`);

  return teile.length === 0 ? `#${anker}` : `#${anker}?${teile.join("&")}`;
}

// Schreibt die aktuelle Themen-/Schulwahl in die Adresse zurueck, damit die
// Adresszeile jederzeit einen teilbaren Link zeigt. Der Anker wechselt dabei
// auf das gerade bearbeitete Quiz. Die "?-Parameter" vor dem "#" (z.B. lang=)
// bleiben unangetastet. replaceState statt pushState, damit jeder
// Auswahlschritt keinen neuen Verlaufseintrag anlegt.
function schreibeAdresseZurueck(): void {
  const anker = ankerMitParametern();
  if (!anker) return;
  const neu = `${window.location.pathname}${window.location.search}${anker}`;
  const jetzt = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (neu !== jetzt) {
    window.history.replaceState(window.history.state, "", neu);
  }
}

// Wird nach dem Laden (und nach dem Anwenden eines Deep-Links) registriert,
// damit das Setzen der Filter beim Start keinen Kopierhinweis ausloest.
function linkAufKopierablage(): void {
  const link = teilbarerLink();
  if (!link) return;
  // Ohne Zwischenablage (z.B. unsicherer Kontext) bleibt es beim Hinweis.
  void navigator.clipboard?.writeText(link).catch(() => {});
  zeigeKopierHinweis(`Link ${link} has been copied to your clipboard`);
}

// Laden aus der Datenbank
onMounted(async () => {  // Eine auf der letzten Seite begonnene Anmeldung fortsetzen.
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

  // Die Schulliste gehoert zum Filter und zum Formular. Fehlt der Endpunkt
  // (z.B. auf einem noch nicht aktualisierten Server), laeuft das Quiz ohne
  // Schulen weiter.
  try {
    schools.value = await getSchools();
  } catch (e) {
    console.warn(
      "Schulen konnten nicht geladen werden: " + (e as Error).message
    );
  }

  // Ein Link wie "#franzoesisch?topic=verbesreflechi&school=..."
  // waehlt Thema und Schule schon aus.
  deepLinkAnwenden();

  // Erst nach dem Laden und nach dem Deep-Link beginnt das Kopieren: Bei
  // jeder Aenderung von Thema oder Schule (ausser der Auswahl "alle") geht
  // der passende Link in die Zwischenablage und der Hinweis erscheint.
  // Ausserdem wird die Adresse zurueckgeschrieben, damit sie immer einen
  // teilbaren Link zeigt.
  watch(
    () => [filter.value.topicId, filter.value.school],
    () => {
      schreibeAdresseZurueck();
      if (!filter.value.topicId && !filter.value.school) return;
      linkAufKopierablage();
    }
  );

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
  if (bearbeiten && !darfAendern.value) return;
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

    showSuccessToast(
      bearbeiten ? "toasts.exerciseUpdated" : "toasts.exerciseCreated"
    );

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
    // Bei 403 zeigt der Server den Grund (fremde Aufgabe), deshalb wird
    // bevorzugt die Meldung des Servers angezeigt.
    alert(`Speichern fehlgeschlagen: ${fehlerText(e, (e as Error).message)}`);
  }
}

async function loeschen(): Promise<void> {
  if (!auth.angemeldet) {
    dialogOeffnen("login");
    return;
  }
  const q = aktuelle.value;
  if (!q?._id || !darfAendern.value) return;
  if (!window.confirm("Do you really want to delete this question?")) return;
  try {
    await deleteExercise(q._id);
    questions.value = questions.value.filter((x) => x._id !== q._id);
    if (i.value > letzterIndex.value) i.value = letzterIndex.value;
    showSuccessToast("toasts.exerciseDeleted");
  } catch (e) {
    if (sitzungAbgelaufen(e)) return;
    alert(`Löschen fehlgeschlagen: ${fehlerText(e, (e as Error).message)}`);
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
  /* Im Vollbild fuellen Bild- und Tutorial-Flaechen die verfuegbare Hoehe. */
  --exercise-image-height: 100%;
}

/* Im Vollbild wird der Inhalt unter der Filterzeile zu einer Spalte: die
   jeweils sichtbare Tab-Flaeche (und darin die Aufgabe bzw. das Tutorial) nimmt
   die verbleibende Hoehe ein. */
.quiz-vollbild .quiz-body,
.quiz-vollbild .quiz-tab,
.quiz-vollbild .quiz-tab__inner,
.quiz-vollbild .quiz-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
}

/* Die Tutorialsicht hat ausserhalb des Vollbilds dieselbe Hoehe wie das
   Aufgabenbild und fuellt im Vollbild die verbleibende Hoehe. */
.quiz-tutorial {
  flex-grow: 1;
  height: var(--exercise-image-height);
  min-height: 0;
  overflow-y: auto;
  background-color: antiquewhite;
}

.quiz-vollbild:fullscreen {
  width: 100vw;
  height: 100vh;
}

.quiz-vollbild::backdrop {
  background-color: #fff;
}

/* Kurzhinweis mit dem kopierten Link: fixiert unten rechts im Viewport,
   unabhaengig vom Scrollstand der Seite. */
.kopier-hinweis {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1080;
  max-width: min(32rem, calc(100vw - 2rem));
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #333333;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  word-break: break-all;
}
</style>
