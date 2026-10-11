<!-- Editor fuer ein Buch: Absaetze und dazwischen eingefuegte Quizze.
     Ein Absatz wird als JoditEditor bearbeitet und beim Verlassen des Feldes
     zu einem <div v-html="..."></div>. Ueber jedem Absatz und jedem Quiz
     stehen die Anmelde-Knoepfe (siehe VueBookAccountBar). -->
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

      <template v-if="block.kind === 'paragraph'">
        <div
          v-if="editable && block.editing"
          class="book-editor"
          @focusout="beiFokusVerlust(block, $event)"
        >
          <VueJoditEditor
            :ref="(el) => setzeEditorRef(block.id, el)"
            v-model="block.html"
            @update:modelValue="broadcast"
          />
          <div class="d-flex flex-wrap justify-content-between gap-2 mt-2">
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
        </div>

        <div v-else class="d-flex align-items-start gap-2">
          <div class="book-paragraph flex-grow-1" v-html="block.html"></div>
          <button
            v-if="editable"
            type="button"
            class="btn btn-outline-primary btn-sm"
            title="Edit the paragraph"
            @click="editieren(block)"
          >
            <i class="bi bi-pencil-square" aria-hidden="true"></i>
          </button>
        </div>

        <div v-if="editable && !block.editing" class="mt-1">
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
        <VueBookQuiz
          v-if="block.quizId"
          :quiz-id="block.quizId"
          :subject="subject"
        />
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
      <template v-if="editable">Start writing the first paragraph below.</template>
      <template v-else>This book has no content yet.</template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import VueJoditEditor from "@/components/quizzes/VueJoditEditor.vue";
import VueBookAccountBar from "./VueBookAccountBar.vue";
import VueBookQuiz from "./VueBookQuiz.vue";
import { useBookStore } from "@/stores/books";
import { useAuthStore } from "@/stores/auth";
import { useBookCollab } from "./useBookCollab";
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
  editing: boolean;
  quizId?: string;
}

const props = defineProps<{ book: Book; subject: string }>();

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
  return { id: naechsteId++, kind, html, editing: false, quizId };
}

watch(
  () => props.book._id,
  () => {
    aufbauen(props.book);
    sicherstellenErsterAbsatz();
  },
  { immediate: true },
);

// Beim Anmelden den ersten Absatz anlegen (falls das Buch noch leer ist).
watch(editable, (an) => {
  if (an) sicherstellenErsterAbsatz();
  else blocks.value.forEach((b) => (b.editing = false));
});

function sicherstellenErsterAbsatz(): void {
  if (editable.value && blocks.value.length === 0) {
    blocks.value.push(block("paragraph", ""));
    blocks.value[0].editing = true;
  }
}

// Immer nur ein Absatz gleichzeitig bearbeiten.
function editieren(block: UiBlock): void {
  if (!editable.value) return;
  blocks.value.forEach((b) => (b.editing = false));
  block.editing = true;
}

// --- Speichern ------------------------------------------------------

function absaetze(): string[] {
  return blocks.value.filter((b) => b.kind === "paragraph").map((b) => b.html);
}

function quizIds(): string[] {
  return blocks.value
    .filter((b) => b.kind === "quiz" && !!b.quizId)
    .map((b) => b.quizId as string);
}

async function speichern(): Promise<void> {
  if (!editable.value) return;
  const aktualisiert: Book = {
    ...props.book,
    paragraphs: absaetze(),
    quizzes: quizIds(),
  };
  const gespeichert = await store.speichern(aktualisiert);
  emit("book-updated", gespeichert);
}

// Beim Verlassen des Editors (Fokus weg) den Absatz zum <div> machen und
// speichern. Bleibt der Fokus im Editor (z.B. Klick auf einen Knopf darunter),
// bleibt der Absatz in Bearbeitung.
function beiFokusVerlust(block: UiBlock, e: FocusEvent): void {
  const wrap = e.currentTarget as HTMLElement | null;
  const next = e.relatedTarget as Node | null;
  if (wrap && next && wrap.contains(next)) return;
  void schliesseAbsatz(block);
}

async function schliesseAbsatz(block: UiBlock): Promise<void> {
  if (!block.editing) return;
  block.editing = false;
  await speichern();
}

// --- Quiz einfuegen -------------------------------------------------

// Ein Quiz unterhalb des Absatzes anfuegen und darunter einen neuen, leeren
// Absatz zum Weiterschreiben oeffnen.
async function quizHinzufuegen(block: UiBlock): Promise<void> {
  const index = blocks.value.indexOf(block);
  if (index === -1) return;
  block.editing = false;
  const quiz = await store.neuesQuiz(props.subject, props.book._id);
  const quizBlock = block2("quiz", quiz._id);
  const neuerAbsatz = block2("paragraph", "");
  neuerAbsatz.editing = true;
  blocks.value.splice(index + 1, 0, quizBlock, neuerAbsatz);
  await speichern();
  await scrolleZu(neuerAbsatz.id);
}

// Das Quiz an der Cursor-Position einfuegen: den Absatz dort in zwei Absaetze
// teilen und das Quiz dazwischen setzen.
async function quizAnCursor(block: UiBlock): Promise<void> {
  const index = blocks.value.indexOf(block);
  if (index === -1) return;
  const { before, after } = teileAnCursor(block);
  block.html = before;
  block.editing = false;
  const quiz = await store.neuesQuiz(props.subject, props.book._id);
  const quizBlock = block2("quiz", quiz._id);
  const nachher = block2("paragraph", after);
  nachher.editing = true;
  blocks.value.splice(index + 1, 0, quizBlock, nachher);
  await speichern();
  await scrolleZu(nachher.id);
}

function block2(kind: "paragraph" | "quiz", htmlOrId?: string): UiBlock {
  return {
    id: naechsteId++,
    kind,
    html: kind === "paragraph" ? htmlOrId ?? "" : "",
    editing: false,
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
    editieren(naechster);
    void scrolleZu(naechster.id);
    return;
  }
  const neu = block2("paragraph", "");
  neu.editing = true;
  blocks.value.splice(index + 1, 0, neu);
  void scrolleZu(neu.id);
}

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

// Aenderungen an die anderen Teilnehmer einer Schreib-Sitzung schicken.
function broadcast(): void {
  sendUpdate({ paragraphs: absaetze(), quizzes: quizIds() });
}

// Aenderungen anderer Teilnehmer uebernehmen.
onUpdate((payload) => {
  const p = payload as { paragraphs?: string[]; quizzes?: string[] } | null;
  if (!p) return;
  aufbauen({
    ...props.book,
    paragraphs: p.paragraphs ?? props.book.paragraphs,
    quizzes: p.quizzes ?? props.book.quizzes,
  });
});

// Strg+S speichert das Buch.
function beiTaste(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    void speichern();
  }
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
.book-editor {
  border: 1px solid #0d6efd;
  border-radius: 0.375rem;
  padding: 0.5rem;
}
</style>
