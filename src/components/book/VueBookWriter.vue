<!-- Editor fuer ein Buch: Absaetze und dazwischen eingefuegte Quizze.
     Angemeldete Benutzer sehen immer den JoditEditor (es gibt keine
     "Bearbeiten"-Knoepfe mehr) und speichern mit Strg+S. Solange es
     ungespeicherte Aenderungen gibt, steht ueber allen JoditEditoren und allen
     Quizzen ein Stern (*). Nicht angemeldete Benutzer sehen die Absaetze nur
     als Text.
     Die Zusammenarbeit (socket.io) schickt ausschliesslich die Inhalte der
     JoditEditoren - die Absaetze - hin und her. In den Quizzen wird nicht
     zusammengearbeitet, ein Buch-Quizz ist ein normales Quiz und wird mit dem
     bestehenden VueQuiz angezeigt. -->
<template>
  <div class="book-writer">
    <div
      v-for="block in blocks"
      :key="block.id"
      :ref="(el) => setzeBlockRef(block.id, el)"
      class="book-block"
    >
      <VueBookAccountBar
        :show-message="block.kind === 'paragraph'"
        :collaborating="collabCollaborating"
        :participants="collabParticipants"
        @login="emit('login')"
        @signup="emit('signup')"
        @logout="emit('logout')"
        @collaborate="emit('collaborate')"
      />

      <!-- Ein Stern ueber jedem Editor und jedem Quiz, solange ungespeicherte
           Aenderungen da sind. Strg+S speichert alles und die Sterne verschwinden. -->
      <p
        v-if="ungespeichert"
        class="unsaved-star mb-1"
        title="Unsaved changes. Press Ctrl+S to save."
      >
        *
      </p>

      <template v-if="block.kind === 'paragraph'">
        <VueJoditEditor
          v-if="editable"
          :ref="(el) => setzeEditorRef(block.id, el)"
          :model-value="block.html"
          @update:modelValue="geaendert(block, $event)"
        />
        <div v-else class="book-paragraph" v-html="block.html"></div>

        <div
          v-if="editable"
          class="d-flex flex-wrap justify-content-between gap-2 mt-2"
        >
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            title="Insert a quiz where the cursor is"
            @click="quizAnCursor(block)"
          >
            <i class="bi bi-list-check me-1" aria-hidden="true"></i>
            Insert quiz at cursor position
          </button>
          <button
            type="button"
            class="btn btn-success btn-sm"
            title="Add a quiz below this paragraph"
            @click="quizHinzufuegen(block)"
          >
            <i class="bi bi-plus-lg me-1" aria-hidden="true"></i>
            Add Quiz
          </button>
        </div>
      </template>

      <template v-else>
        <VueQuiz v-if="block.quizId" :quiz-id="block.quizId" :lg="lg" />
        <div v-if="editable" class="mt-1">
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            title="Add a paragraph below this quiz"
            @click="absatzNachQuiz(block)"
          >
            <i class="bi bi-plus-lg me-1" aria-hidden="true"></i>
            Add paragraph
          </button>
        </div>
      </template>
    </div>

    <p v-if="blocks.length === 0" class="text-muted">
      This book has no content yet.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import VueJoditEditor from "@/components/quizzes/VueJoditEditor.vue";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";
import VueBookAccountBar from "./VueBookAccountBar.vue";
import { useBookStore } from "@/stores/books";
import { useAuthStore } from "@/stores/auth";
import { useBookCollab } from "./useBookCollab";
import type { Lang } from "@/types/quiz";
import type { Book } from "@/types/book";

// Nur die Teile von Jodit, die hier gebraucht werden: das DOM-Element, der
// aktuelle Inhalt und die Auswahl (fuer "Insert quiz at cursor position").
interface JoditLike {
  value: string;
  editor: HTMLElement;
  selection: { range: Range };
}

interface UiBlock {
  id: number;
  kind: "paragraph" | "quiz";
  html: string;
  quizId?: string;
  // True, solange der Inhalt (noch) nicht mit Strg+S gespeichert wurde.
  unsaved: boolean;
}

const props = withDefaults(
  defineProps<{ book: Book; subject: string; lg?: Lang }>(),
  { lg: "de" },
);

const emit = defineEmits<{
  (e: "login"): void;
  (e: "signup"): void;
  (e: "logout"): void;
  (e: "collaborate"): void;
  (e: "book-updated", book: Book): void;
}>();

const auth = useAuthStore();
const store = useBookStore();
const {
  participants: collabParticipants,
  collaborating: collabCollaborating,
  sendUpdate,
  onUpdate,
} = useBookCollab();

const editable = computed(() => auth.angemeldet);
const blocks = ref<UiBlock[]>([]);
let naechsteId = 1;

const editorRefs = new Map<number, unknown>();
const blockRefs = new Map<number, HTMLElement>();

// Stern ueber allen Editoren und allen Quizzen, solange es ungespeicherte
// Aenderungen gibt (Strg+S speichert alles und entfernt die Sterne).
const ungespeichert = computed(() => blocks.value.some((b) => b.unsaved));

// Das Buch in eine Liste aus Absatz- und Quiz-Bloecken umwandeln. Zwischen zwei
// Absaetzen steht hoechstens ein Quiz, daher die Reihenfolge Absatz, Quiz,
// Absatz, Quiz, ...
function aufbauen(buch: Book): void {
  const liste: UiBlock[] = [];
  for (let i = 0; i < buch.paragraphs.length; i++) {
    liste.push(block("paragraph", buch.paragraphs[i] ?? ""));
    if (buch.quizzes[i]) liste.push(block("quiz", "", buch.quizzes[i]));
  }
  for (let i = buch.paragraphs.length; i < buch.quizzes.length; i++) {
    if (buch.quizzes[i]) liste.push(block("quiz", "", buch.quizzes[i]));
  }
  editorRefs.clear();
  blockRefs.clear();
  blocks.value = liste;
}

function block(kind: "paragraph" | "quiz", html: string, quizId?: string): UiBlock {
  return { id: naechsteId++, kind, html, unsaved: false, quizId };
}

watch(
  () => props.book._id,
  () => {
    aufbauen(props.book);
    sicherstellenErsterAbsatz();
  },
  { immediate: true },
);

// Beim Anmelden einen ersten Absatz anlegen (falls das Buch noch leer ist).
watch(editable, (an) => {
  if (an) sicherstellenErsterAbsatz();
});

function sicherstellenErsterAbsatz(): void {
  if (editable.value && blocks.value.length === 0) {
    blocks.value.push(block("paragraph", ""));
  }
}

// --- Inhalt aendern und speichern ----------------------------------

function absaetze(): string[] {
  return blocks.value.filter((b) => b.kind === "paragraph").map((b) => b.html);
}

function quizIds(): string[] {
  return blocks.value
    .filter((b) => b.kind === "quiz" && !!b.quizId)
    .map((b) => b.quizId as string);
}

// Eine Aenderung in einem Absatz merken, als ungespeichert markieren und die
// neuen Absaetze an die anderen Teilnehmer der Schreib-Sitzung schicken.
function geaendert(block: UiBlock, html: string): void {
  block.html = html;
  block.unsaved = true;
  broadcast();
}

// Strg+S speichert das ganze Buch; danach verschwinden alle Sterne.
async function speichern(): Promise<void> {
  if (!editable.value) return;
  const aktualisiert: Book = {
    ...props.book,
    paragraphs: absaetze(),
    quizzes: quizIds(),
  };
  const gespeichert = await store.speichern(aktualisiert);
  emit("book-updated", gespeichert);
  blocks.value.forEach((b) => (b.unsaved = false));
}

function beiTaste(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    void speichern();
  }
}

// --- Quiz einfuegen -------------------------------------------------

// Ein Quiz unterhalb des Absatzes anfuegen und darunter einen neuen, leeren
// Absatz zum Weiterschreiben oeffnen. Gespeichert wird alles mit Strg+S.
async function quizHinzufuegen(block: UiBlock): Promise<void> {
  const index = blocks.value.indexOf(block);
  if (index === -1) return;
  const quiz = await store.neuesQuiz(props.subject, props.book._id);
  const quizBlock = block2("quiz", quiz._id);
  const neuerAbsatz = block2("paragraph", "");
  quizBlock.unsaved = true;
  neuerAbsatz.unsaved = true;
  blocks.value.splice(index + 1, 0, quizBlock, neuerAbsatz);
  broadcast();
  await scrolleZu(neuerAbsatz.id);
}

// Das Quiz an der Cursor-Position einfuegen: den Absatz dort in zwei Absaetze
// teilen und das Quiz dazwischen setzen.
async function quizAnCursor(block: UiBlock): Promise<void> {
  const index = blocks.value.indexOf(block);
  if (index === -1) return;
  const { before, after } = teileAnCursor(block);
  block.html = before;
  block.unsaved = true;
  const quiz = await store.neuesQuiz(props.subject, props.book._id);
  const quizBlock = block2("quiz", quiz._id);
  const nachher = block2("paragraph", after);
  quizBlock.unsaved = true;
  nachher.unsaved = true;
  blocks.value.splice(index + 1, 0, quizBlock, nachher);
  broadcast();
  await scrolleZu(nachher.id);
}

function block2(kind: "paragraph" | "quiz", htmlOrId?: string): UiBlock {
  return {
    id: naechsteId++,
    kind,
    html: kind === "paragraph" ? htmlOrId ?? "" : "",
    unsaved: false,
    quizId: kind === "quiz" ? htmlOrId : undefined,
  };
}

// Den HTML-Inhalt eines Absatzes an der Cursor-Position in zwei Teile zerlegen.
function teileAnCursor(block: UiBlock): { before: string; after: string } {
  const inst = editorRefs.get(block.id) as
    | { getEditor?: () => JoditLike | null }
    | undefined;
  const ed = inst?.getEditor?.() ?? null;
  if (!ed) return { before: block.html, after: "" };
  try {
    const bereich = ed.selection.range;
    const container = ed.editor;
    const vor = document.createRange();
    vor.setStart(container, 0);
    vor.setEnd(bereich.startContainer, bereich.startOffset);
    const nach = document.createRange();
    nach.setStart(bereich.endContainer, bereich.endOffset);
    nach.setEnd(container, container.childNodes.length);
    return {
      before: fragmentHtml(vor.cloneContents()),
      after: fragmentHtml(nach.cloneContents()),
    };
  } catch {
    return { before: block.html, after: "" };
  }
}

function fragmentHtml(fragment: DocumentFragment): string {
  const div = document.createElement("div");
  div.appendChild(fragment);
  return div.innerHTML;
}

// Unterhalb eines Quiz einen Absatz anlegen (oder den bereits vorhandenen
// bearbeiten).
function absatzNachQuiz(block: UiBlock): void {
  if (!editable.value) return;
  const index = blocks.value.indexOf(block);
  if (index === -1) return;
  const naechster = blocks.value[index + 1];
  if (naechster && naechster.kind === "paragraph") {
    void scrolleZu(naechster.id);
    return;
  }
  const neu = block2("paragraph", "");
  neu.unsaved = true;
  blocks.value.splice(index + 1, 0, neu);
  broadcast();
  void scrolleZu(neu.id);
}

// --- Zusammenarbeit (nur die Jodit-Inhalte) -------------------------

// Aenderungen an die anderen Teilnehmer einer Schreib-Sitzung schicken. Es
// werden nur die Absaetze (Jodit-Inhalte) weitergegeben, nie die Quizze.
function broadcast(): void {
  sendUpdate({ paragraphs: absaetze() });
}

// Aenderungen anderer Teilnehmer uebernehmen. Auch hier gilt: Es kommen nur
// die Absaetze zurueck, die Quizze bleiben unveraendert.
onUpdate((payload) => {
  const p = payload as { paragraphs?: string[] } | null;
  if (!p?.paragraphs) return;
  let i = 0;
  for (const b of blocks.value) {
    if (b.kind !== "paragraph") continue;
    if (i < p.paragraphs.length) b.html = p.paragraphs[i] ?? "";
    i++;
  }
});

// --- Hilfsfunktionen ------------------------------------------------

async function scrolleZu(id: number): Promise<void> {
  await nextTick();
  const el = blockRefs.get(id);
  el?.scrollIntoView?.({ behavior: "smooth", block: "center" });
}

function setzeEditorRef(id: number, el: unknown): void {
  if (el) editorRefs.set(id, el);
  else editorRefs.delete(id);
}

function setzeBlockRef(id: number, el: unknown): void {
  if (el instanceof HTMLElement) blockRefs.set(id, el);
  else blockRefs.delete(id);
}

onMounted(() => window.addEventListener("keydown", beiTaste));
onBeforeUnmount(() => window.removeEventListener("keydown", beiTaste));
</script>

<style scoped>
.book-block + .book-block {
  margin-top: 1rem;
}
.book-paragraph {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 0.75rem;
  background: #fff;
}
.unsaved-star {
  color: #dc3545;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1;
  margin-bottom: 0.25rem;
}
</style>