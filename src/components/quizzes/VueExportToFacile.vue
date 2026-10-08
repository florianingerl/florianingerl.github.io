<template>
  <div
    ref="dialog"
    class="modal fade"
    id="exportFacileModal"
    tabindex="-1"
    aria-labelledby="exportFacileModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exportFacileModalLabel">
            Export to {{ domain }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <p class="text-muted">
            Topic:
            <span class="badge text-bg-secondary">
              {{ topicDaten?.title ?? "ÔÇª" }}
            </span>
          </p>
          <label class="form-label" for="exportTestId">
            Test-ID of the test on {{ domain }} that will be changed
          </label>
          <input
            id="exportTestId"
            v-model="testId"
            class="form-control form-control-sm"
            type="number"
            min="1"
            step="1"
            placeholder="131777"
          />
          <small class="form-text d-block">
            Open the test on {{ domain }}. The number at the end of its address
            is its ID. The questions chosen below replace the questions of
            that test.
          </small>
          <fieldset>
            <legend class="fs-6">Type of exercise</legend>
            <div v-for="typ in typen" :key="typ.wert" class="form-check">
              <input
                :id="'uebungstyp-' + typ.wert"
                v-model="uebungstyp"
                class="form-check-input"
                type="radio"
                name="uebungstyp"
                :value="typ.wert"
              />
              <label class="form-check-label" :for="'uebungstyp-' + typ.wert">
                {{ typ.label }}
              </label>
            </div>
          </fieldset>

          <div class="row g-2 my-1">
            <div class="col">
              <label class="form-label" for="exportTitel">Title</label>
              <input
                id="exportTitel"
                v-model="titel"
                class="form-control form-control-sm"
                type="text"
              />
            </div>
            <div class="col-2">
              <label class="form-label" for="exportAuteur">Author</label>
              <input
                id="exportAuteur"
                v-model="auteur"
                class="form-control form-control-sm"
                type="text"
              />
            </div>
          </div>

          <label class="form-label" for="exportCookie">Session cookie</label>
          <textarea
            id="exportCookie"
            v-model="cookie"
            class="form-control form-control-sm"
            rows="3"
            placeholder="auteur_cookies=flori10; sessionid=ÔÇª; sessionid2=ÔÇª; PHPSESSID=ÔÇª"
          ></textarea>
          <div class="form-text">
            <strong>Copy the whole cookie, not just the session cookies.</strong>
            On *facile.com the cookie that identifies you is
            <code>auteur_cookies</code>. Without it the site ignores
            <code>sessionid</code>, <code>sessionid2</code> and
            <code>PHPSESSID</code> and shows the anonymous page.
            <br />
            How to get it: open {{ domain }}, log in, open DevTools ÔåÆ Network ÔåÆ
            click any request to {{ domain }} ÔåÆ copy the whole
            <code>cookie</code> line from "Request Headers". The easiest way is
            to reload the test page once so a new request appears.
            <br />
            Your own server forwards the cookie, because a browser is not allowed
            to set a cookie for another website.
          </div>

          <h2 class="fs-6 mt-3">
            Exercises ({{ gewaehlteAnzahl }} of {{ kandidaten.length }} selected)
          </h2>

          <p v-if="laden">{{ t }}</p>
          <p v-if="fehler" class="text-danger">{{ fehler }}</p>
          <p v-else-if="!laden && kandidaten.length === 0" class="text-muted">
            No exercise of this topic matches the selected type of exercise.
          </p>

          <ul v-else class="list-group" style="max-height: 40vh; overflow-y: auto">
            <li class="list-group-item">
              <input
                id="alleAuswaehlen"
                v-model="alleAusgewaehlt"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="alleAuswaehlen">
                <strong>Select All</strong>
              </label>
            </li>
            <li
              v-for="(ex, index) in kandidaten"
              :key="ex._id ?? index"
              class="list-group-item d-flex align-items-start gap-2"
            >
              <input
                v-model="ausgewaehlt[index]"
                class="form-check-input mt-1"
                type="checkbox"
              />
              <div class="flex-grow-1">
                <div>
                  <small class="text-muted">{{ ex.type }}</small>
                </div>
                <VueImage v-if="ex.imageUrl" :imageUrl="ex.imageUrl" class="export-bild" />
                <div class="font-monospace small">
                  q = {{ fragenAntworten[index]?.q }}
                </div>
                <div class="font-monospace small">
                  r = {{ fragenAntworten[index]?.r }}
                </div>
              </div>
            </li>
          </ul>

          <p v-if="hinweis" class="text-muted small mt-2">{{ hinweis }}</p>
          <p v-if="meldung" class="text-success">{{ meldung }}</p>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="gewaehlteAnzahl === 0 || !testIdNum"
            @click="exportieren"
          >
            Export to {{ domain }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
import { exportToFacile, getAllExercises, getTopic } from "@/api";
import VueImage from "./VueImage.vue";
import type {
  Exercise,
  ExportTestType,
  FrageAntwort,
  Lang,
  QuizName,
  Topic,
} from "@/types/quiz";

// Der Test auf *facile.com, der bei jedem Export neu eingegeben wird.

// Der Test, der auf *facile.com geändert wird.
const testId = ref("");
const testIdNum = computed(() => {
  const nummer = Number(testId.value.trim());
  return Number.isInteger(nummer) && nummer > 0 ? nummer : null;
});

// Ein Test auf *facile.com braucht mindestens so viele Fragen.
const MINDESTZAHL = 10;

// Die *facile.com-Seite zu jedem Quiz. F├╝r die ├╝brigen Quizzes gibt es keine Seite.
const SEITEN: Partial<Record<QuizName, string>> = {
  french: "francaisfacile.com",
  english: "anglaisfacile.com",
  espagnol: "espagnolfacile.com",
  italiano: "italienfacile.com",
  deutsch: "allemandfacile.com",
};

// Die Nummern der Testarten stehen in choice.php auf *facile.com.
const typen: { wert: ExportTestType; label: string; seitentyp: string }[] = [
  { wert: "trous", label: "1.1) Test ├á trous", seitentyp: "0" },
  {
    wert: "optionsDifferents",
    label: "1.2) Test avec des options diff├®rents pour chaque question",
    seitentyp: "3",
  },
  {
    wert: "optionsGleich",
    label: "1.3) Test avec les m├¬mes options pour chaque question",
    seitentyp: "1",
  },
];

const texte: Record<Lang, string> = {
  de: "Lade die Aufgaben des Themas ...",
  en: "Loading the exercises of the topic ...",
  fr: "Chargement des exercices du th├¿me ...",
};

const props = defineProps<{
  quiz: QuizName;
  topic: Topic | string | undefined;
  lg: Lang;
}>();

const emit = defineEmits<{ (e: "cancel-clicked"): void }>();

const t = computed(() => texte[props.lg]);
const domain = computed(() => SEITEN[props.quiz] ?? "ÔÇª");

const dialog = ref<HTMLElement | null>(null);
const topicDaten = ref<Topic | undefined>(undefined);
const alleAufgaben = ref<Exercise[]>([]);
const kandidaten = ref<Exercise[]>([]);
const ausgewaehlt = ref<boolean[]>([]);
const uebungstyp = ref<ExportTestType>("trous");
const titel = ref("");
const auteur = ref("flori10");
const cookie = ref("");
const laden = ref(true);
const fehler = ref("");
const meldung = ref("");
const hinweis = ref("");

// Zwischenspeicher, damit die Liste nicht bei jedem Rendern neu gerechnet wird.
const fragenAntworten = computed<(FrageAntwort | null)[]>(() =>
  kandidaten.value.map(frageAntwortBauen),
);

const gewaehlteAnzahl = computed(
  () => ausgewaehlt.value.filter((a) => a).length,
);

const alleAusgewaehlt = computed({
  get: () =>
    kandidaten.value.length > 0 &&
    gewaehlteAnzahl.value === kandidaten.value.length,
  set: (wert: boolean) => {
    ausgewaehlt.value = kandidaten.value.map(() => wert);
  },
});

// "La femme {qui|que} tient ..." => [["qui", "que"]]
function luecken(gapText: string): string[][] {
  const gefunden: string[][] = [];
  for (const treffer of gapText.matchAll(/\{([^{}]*)\}/g)) {
    gefunden.push(treffer[1].split("|"));
  }
  return gefunden;
}

// Eine L├╝cke ohne "|" ist eine Freitext-L├╝cke, sonst eine Auswahll├╝cke.
function istAuswahlluecke(lueckenDesTextes: string[][]): boolean {
  return lueckenDesTextes.length > 0 && lueckenDesTextes[0].length > 1;
}

function passtZurTestart(ex: Exercise, art: ExportTestType): boolean {
  if (ex.type === "multipleChoice") return art !== "trous";

  const gefunden = luecken(ex.gapText ?? "");
  if (gefunden.length === 0) return false;
  // Nur 1.3) nimmt auch Aufgaben mit mehreren L├╝cken.
  if (gefunden.length > 1) return art === "optionsGleich";
  // Eine Auswahll├╝cke geh├Ârt zu 1.2) und 1.3), eine Freitextl├╝cke zu 1.1) und 1.3).
  return art === "optionsGleich" || istAuswahlluecke(gefunden) === (art === "optionsDifferents");
}

function absoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  try {
    return new URL(url, document.baseURI).href;
  } catch {
    return url;
  }
}

function alsBild(ex: Exercise): string {
  if (!ex.imageUrl) return "";
  // <img> ist ein Void-Element: es braucht src statt href und darf keinen
  // schliessenden Tag haben. Mit href und </img> zeigte die Seite gar nichts an.
  const url = absoluteUrl(ex.imageUrl).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return `<img src="${url}"> `;
}

function ohneLuecken(text: string): string {
  return text.replace(/\{[^{}]*\}/g, "*").replace(/_{2,}/g, "*").trim();
}

// Die erste Option muss die richtige sein, deshalb kommt sie nach vorne.
function optionenMitRichtigerVorne(ex: Exercise): string[] {
  const alle = (ex.options ?? []).map((o) => o.option);
  const richtige = (ex.options ?? [])
    .filter((o) => o.correct)
    .map((o) => o.option);
  return [...richtige, ...alle.filter((o) => !richtige.includes(o))];
}

function frageAntwortBauen(ex: Exercise): FrageAntwort | null {
  if (ex.type === "multipleChoice") {
    const text = ohneLuecken(ex.question ?? ex.gapText ?? "");
    if (text === "") return null;
    return { q: alsBild(ex) + text, r: optionenMitRichtigerVorne(ex).join("|") };
  }

  const gefunden = luecken(ex.gapText ?? "");
  if (gefunden.length === 0) return null;
  return {
    q: alsBild(ex) + ohneLuecken(ex.gapText ?? ""),
    r: gefunden[0].join("|"),
  };
}

function fuelleAufMindestzahl(fragen: FrageAntwort[]): FrageAntwort[] {
  if (fragen.length === 0) return [];
  const gefuellt: FrageAntwort[] = [];
  for (let i = 0; i < MINDESTZAHL; i++) {
    gefuellt.push(fragen[Math.min(i, fragen.length - 1)]);
  }
  return gefuellt;
}

function baueBody(fragen: FrageAntwort[], testIdNummer: number): string {
  const gefuellt = fuelleAufMindestzahl(fragen);
  const seite = typen.find((x) => x.wert === uebungstyp.value) ?? typen[0];
  const testtitel = titel.value.trim();
  const felder = new URLSearchParams();

  felder.set("statut", "r");
  felder.set("top2", "");
  felder.set("auteur2", auteur.value.trim());
  felder.set("liaison2", "#adverbe#conjonction#");
  felder.set("casier", `clone du test ${testIdNummer}`);
  felder.set("anciensite", "0001");
  felder.set("yenamarre", "0001");
  felder.set("genre", "g");
  felder.set("difficulte", "2");
  felder.set("type", seite.seitentyp);
  felder.set("titre", testtitel);
  felder.set("titreenglish", testtitel);
  felder.set("ancientitreenglish", testtitel);
  felder.set("numero", "0");
  felder.set("message_textarea", topicDaten.value?.tutorial ?? "");
  felder.set("confirmer", "0");

  gefuellt.forEach((frage, index) => {
    const nummer = index + 1;
    felder.set(`q${nummer}`, frage.q);
    felder.set(`r${nummer}`, frage.r);
    felder.set(`e${nummer}`, "");
  });

  felder.set("mychoice", String(gefuellt.length));
  felder.set("grander", "");
  felder.set("nol2", "");
  felder.set("vieuxconfirm", "0");
  felder.set("forcer2", "");
  felder.set("enbaspage", "");
  felder.set("enbas", "");

  return felder.toString();
}

// Nur die Aufgaben, die zur gew├ñhlten Testart und zum geladenen Topic passen.
function filtereNachTestart(): void {
  const topicId = topicDaten.value?._id;
  kandidaten.value = alleAufgaben.value.filter(
    (ex) =>
      (typeof ex.topic === "string"
        ? ex.topic === topicId
        : ex.topic?._id === topicId) &&
      passtZurTestart(ex, uebungstyp.value),
  );
  ausgewaehlt.value = kandidaten.value.map(() => true);
  hinweis.value =
    gewaehlteAnzahl.value < MINDESTZAHL
      ? `Du hast weniger als ${MINDESTZAHL} Aufgaben gew├ñhlt. Die fehlenden werden beim Export Kopien der letzten Aufgabe.`
      : "";
}

async function ladeKandidaten(): Promise<void> {
  laden.value = true;
  fehler.value = "";
  hinweis.value = "";

  if (!SEITEN[props.quiz]) {
    fehler.value = `F├╝r das Quiz "${props.quiz}" gibt es keine *facile.com-Seite.`;
    laden.value = false;
    return;
  }

  if (!props.topic) {
    fehler.value = "Die aktuelle Aufgabe hat kein Topic! Bitte zuerst ein Thema w├ñhlen.";
    laden.value = false;
    return;
  }

  try {
    topicDaten.value =
      typeof props.topic === "string"
        ? await getTopic(props.topic)
        : props.topic;
    titel.value = topicDaten.value.title;

    alleAufgaben.value = await getAllExercises(props.quiz);
    filtereNachTestart();
  } catch (e) {
    fehler.value = `Die Aufgaben konnten nicht geladen werden: ${(e as Error).message}`;
    kandidaten.value = [];
    ausgewaehlt.value = [];
  } finally {
    laden.value = false;
  }
}

async function exportieren(): Promise<void> {
  fehler.value = "";
  meldung.value = "";
  hinweis.value = "";
  const testIdNummer = testIdNum.value;
  if (testIdNummer === null) {
    fehler.value = "Bitte eine Test-ID eingeben!";
    return;
  }

  const seite = SEITEN[props.quiz];
  if (!seite) {
    fehler.value = `F├╝r das Quiz "${props.quiz}" gibt es keine *facile.com-Seite.`;
    return;
  }

  const gewaehlte = kandidaten.value
    .map((ex, index) => (ausgewaehlt.value[index] ? frageAntwortBauen(ex) : null))
    .filter((f): f is FrageAntwort => f !== null);

  if (gewaehlte.length === 0) {
    fehler.value = "Bitte mindestens eine Aufgabe ausw├ñhlen!";
    return;
  }

  const gefuellt = fuelleAufMindestzahl(gewaehlte);
  const sitzungscookie = cookie.value.trim();

  if (sitzungscookie === "") {
    fehler.value = "Bitte den Session-Cookie aus den DevTools einf├╝gen!";
    return;
  }

  meldung.value = "Export l├ñuft ...";

  try {
    const antwort = await exportToFacile({
      site: seite,
      testId: testIdNummer,
      cookie: sitzungscookie,
      body: baueBody(gewaehlte, testIdNummer),
    });

    if (antwort.angemeldet === false) {
      meldung.value = "";
      fehler.value =
        antwort.message ??
        `Die Seite ${seite} hat den Test nicht gespeichert, weil der Cookie abgelaufen ist. Bitte dort neu anmelden und den Cookie neu kopieren.`;
      return;
    }

    if (!antwort.ok) {
      meldung.value = "";
      fehler.value = antwort.message ?? `${seite} hat den Export abgelehnt.`;
      return;
    }

    const art = typen.find((x) => x.wert === uebungstyp.value) ?? typen[0];
    const bestaetigt = antwort.gespeichert
      ? "Die Seite hat den Test gespeichert."
      : "Die Seite hat den Test angenommen, aber nicht best├ñtigt. Bitte kurz auf der Seite pr├╝fen, ob die Fragen ├╝bernommen wurden.";
    meldung.value = `Test ${testIdNummer} auf ${seite}: ${gefuellt.length} Fragen, Typ ${art.seitentyp}. ${bestaetigt}`;
  } catch (e) {
    meldung.value = "";
    // Bei einem 4xx/5xx wirft axios, und die brauchbare Meldung steckt in der
    // Antwort des Servers, nicht in e.message. Ohne das bleibt nur "400".
    const servertext = (e as { response?: { data?: { message?: string } } }).response?.data
      ?.message;
    fehler.value = servertext
      ? `Export fehlgeschlagen: ${servertext}`
      : `Export fehlgeschlagen: ${(e as Error).message}`;
  }
}

watch(uebungstyp, filtereNachTestart);

onMounted(async () => {
  await nextTick();
  await ladeKandidaten();

  if (!dialog.value) return;
  const modal = Modal.getOrCreateInstance(dialog.value);
  dialog.value.addEventListener("hidden.bs.modal", () => emit("cancel-clicked"));
  modal.show();
});
</script>

<style scoped>
.export-bild :deep(img) {
  height: 60px;
}
</style>
