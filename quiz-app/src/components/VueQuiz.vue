<template>
  <div>
    <div class="row justify-content-between">
      <button v-if="!formOffen" type="button" class="col-3 btn btn-success" title="Add a new exercise" @click="oeffneFormular(false)">
        <i class="bi bi-plus-lg" aria-hidden="true"></i>
      </button>
      <button v-if="!formOffen && aktuelle" type="button" class="col-3 btn btn-primary" title="Edit the exercise" @click="oeffneFormular(true)">
        <i class="bi bi-pencil-square" aria-hidden="true"></i>
      </button>
      <button v-if="!formOffen && aktuelle?._id" type="button" class="col-3 btn btn-danger" title="Delete the exercise" @click="loeschen">
        <i class="bi bi-trash" aria-hidden="true"></i>
      </button>
    </div>

    <div v-if="formOffen">
      <VueNewExercise
        :quiz="quiz"
        :questionOfQuiz="aktuelle"
        :editMode="editMode"
        @new-exercise-created="gespeichert"
        @cancel-clicked="formOffen = false"
      />
    </div>

    <div v-else class="row">
    <p v-if="laden">{{ t.laden }}</p>
    <p v-else-if="fehler" class="text-danger">{{ fehler }}</p>
    <template v-else>
      <select v-model="selectedTopic">
        <option value="">{{ t.alleThemen }}</option>
        <option v-for="topic in topics" :key="topic" :value="topic">
          {{ topic }}
        </option>
      </select>

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
        <VueImage v-if="aktuelle" :imageUrl="aktuelle.imageUrl">
          <VueMCGaps
            v-if="aktuelle.type === 'gapText'"
            :key="aktuelle._id ?? i"
            :instruction="aktuelle.instruction"
            :gaptext="aktuelle.gapText"
            :lg="lg"
          />
          <VueQuestion
            v-else
            :question="aktuelle"
            :lg="lg"
            @answered-event="calcScore"
          />
        </VueImage>
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
            style="width: 70px"
            @change="gehZu"
          />
          <span> / {{ letzterIndex }}</span>
        </ul>

        <p>Your score: {{ scoreText }}</p>
      </div>

      <div v-show="tab === 'tutorial'">...</div>
    </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import VueImage from "./VueImage.vue";
import VueMCGaps from "./VueMCGaps.vue";
import VueQuestion from "./VueQuestion.vue";
import VueNewExercise from "./VueNewExercise.vue";
import { API_URL, createExercise, deleteExercise, getExercises, updateExercise } from "../api.ts";
import type { Exercise, Lang, QuizName } from "../types.ts";

const props = defineProps<{ quiz: QuizName; lg: Lang }>();

// Zustand
const questions = ref<Exercise[]>([]);
const laden = ref(true);
const fehler = ref("");
const i = ref(0);
const scoreText = ref("");
const selectedTopic = ref("");
const tab = ref<"exercise" | "tutorial">("exercise");
const formOffen = ref(false);
const editMode = ref(false);

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
    alleThemen: "Alle Themen",
    keineFragen: "Keine Fragen vorhanden.",
    zurueck5: "Gehe 5 Aufgaben zurück",
    zurueck: "Vorige Aufgabe",
    weiter: "Nächste Aufgabe",
    weiter5: "Gehe 5 Aufgaben weiter",
    score: (r, b) => `Du hast ${r} von ${b} Fragen richtig beantwortet`,
  },
  en: {
    laden: "Loading questions ...",
    alleThemen: "All topics",
    keineFragen: "No questions available.",
    zurueck5: "Jump 5 exercises backward",
    zurueck: "Previous exercise",
    weiter: "Next exercise",
    weiter5: "Jump 5 exercises forward",
    score: (r, b) => `You have answered ${r} of ${b} questions correctly.`,
  },
  fr: {
    laden: "Chargement des questions ...",
    alleThemen: "Tous les thèmes",
    keineFragen: "Aucune question disponible.",
    zurueck5: "Sauter 5 exercices en arrière",
    zurueck: "Question précédente",
    weiter: "Question suivante",
    weiter5: "Sauter 5 questions",
    score: (r, b) => `Tu as répondu à ${r} parmi ${b} questions correctement.`,
  },
};

const t = computed(() => texte[props.lg]);

// Abgeleitete Werte
const topics = computed<string[]>(() => {
  const s = new Set<string>();
  questions.value.forEach((q) => q.topics?.forEach((tp) => s.add(tp)));
  return [...s];
});

const displayedQuestions = computed<Exercise[]>(() =>
  selectedTopic.value
    ? questions.value.filter((q) =>
        (q.topics ?? []).includes(selectedTopic.value),
      )
    : questions.value,
);

const aktuelle = computed<Exercise | undefined>(() => displayedQuestions.value[i.value])
const letzterIndex = computed(() => Math.max(displayedQuestions.value.length -1 , 0))

const indices = computed<number[]>(()=> {
    const a: number[] = []
    let j = Math.floor(i.value / 5) * 5
    for (let k = 0; k < 5 && j < displayedQuestions.value.length; k++, j++) a.push(j)
    return a
})

// Navigation
function springe (delta: number): void{
    i.value = Math.min(Math.max(i.value + delta , 0 ), letzterIndex.value)
}

function gehZu(e:Event): void {
    const u = parseInt((e.target as HTMLInputElement).value)
    if (!Number.isNaN(u) && u >= 0 && u < displayedQuestions.value.length) i.value = u
}

watch(selectedTopic, () => {
    i.value = 0

})

// Score
function calcScore(): void {
    let beantwortet = 0
    let richtig = 0
    questions.value.forEach((q) => {
        if (q.correctlyAnswered === undefined) return
        beantwortet++
        if (q.correctlyAnswered) richtig++

    })
    scoreText.value = t.value.score(richtig, beantwortet)

}

// Laden aus der Datenbank
onMounted(async () => {
    try {
        questions.value = await getExercises(props.quiz)
    } catch (e)
    {
        fehler.value = `Fragen konnten nicht geladen werden (${(e as Error).message}). Läuft das Backend unter ${API_URL}?`
    } finally
    {
        laden.value = false
    }
})

// Anlegen / bearbeiten / löschen
function oeffneFormular(bearbeiten: boolean): void {
  editMode.value = bearbeiten;
  formOffen.value = true;
}

async function gespeichert(ex: Exercise): Promise<void> {
  try {
    const bearbeiten = editMode.value && !!ex._id;
    const neu = bearbeiten ? await updateExercise(ex) : await createExercise(ex);
    if (bearbeiten) {
      const j = questions.value.findIndex((q) => q._id === neu._id);
      if (j !== -1) questions.value[j] = neu;
    } else {
      questions.value.push(neu);
    }
    formOffen.value = false;
    // Themenfilter aufheben, kurz warten (der Watcher springt auf 0) und dann zur gespeicherten Frage springen
    selectedTopic.value = "";
    await nextTick();
    i.value = Math.max(displayedQuestions.value.findIndex((q) => q._id === neu._id), 0);
  } catch (e) {
    alert(`Speichern fehlgeschlagen: ${(e as Error).message}`);
  }
}

async function loeschen(): Promise<void> {
  const q = aktuelle.value;
  if (!q?._id) return;
  if (!window.confirm("Do you really want to delete this question?")) return;
  try {
    await deleteExercise(q._id);
    questions.value = questions.value.filter((x) => x._id !== q._id);
    if (i.value > letzterIndex.value) i.value = letzterIndex.value;
  } catch (e) {
    alert(`Löschen fehlgeschlagen: ${(e as Error).message}`);
  }
}
</script>
