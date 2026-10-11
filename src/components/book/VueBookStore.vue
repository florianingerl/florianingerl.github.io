<!-- Ein Buchladen: zeigt alle Buecher eines Faches in einem Dropdown, das
     ausgewaehlte Buch in einem rollbaren Kasten (mit Vollbild-Knopf) und die
     Knoepfe zum Anlegen, Bearbeiten und Loeschen. Anlegen und Bearbeiten ist
     nur nach dem Login moeglich. Ausserdem kann eine gemeinsame Schreib-Sitzung
     gestartet werden. -->
<template>
  <div class="book-store">
    <h1 class="h3">{{ name }}</h1>

    <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
      <label for="bookSelect" class="form-label mb-0">Book:</label>
      <select id="bookSelect" v-model="selectedId" class="form-select w-auto">
        <option value="">Please choose a book</option>
        <option v-for="buch in store.books" :key="buch._id" :value="buch._id">
          {{ buch.name }}
        </option>
      </select>

      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        :title="fullscreen ? 'Leave fullscreen (Esc)' : 'Show in fullscreen'"
        @click="fullscreen = !fullscreen"
      >
        <i
          :class="fullscreen ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen'"
          aria-hidden="true"
        ></i>
      </button>

      <template v-if="auth.angemeldet">
        <button type="button" class="btn btn-success btn-sm" @click="buchHinzufuegen">
          <i class="bi bi-plus-lg me-1" aria-hidden="true"></i>
          Add a new book
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          :disabled="!selectedBook"
          @click="buchUmbenennen"
        >
          <i class="bi bi-pencil-square me-1" aria-hidden="true"></i>
          Edit
        </button>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          :disabled="!selectedBook"
          @click="buchLoeschen"
        >
          <i class="bi bi-trash me-1" aria-hidden="true"></i>
          Delete
        </button>
      </template>
      <template v-else>
        <span class="text-muted small">
          Please log in to create or edit books or to start a collaborative book
          writing session with someone else.
        </span>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="dialog = 'signup'">
          Sign up
        </button>
        <button type="button" class="btn btn-primary btn-sm" @click="dialog = 'login'">
          Login
        </button>
      </template>
    </div>

    <p v-if="store.fehler && store.books.length === 0" class="text-danger small">
      Books could not be loaded ({{ store.fehler }}). The example book is shown
      instead.
    </p>

    <!-- Einladung zu einer Schreib-Sitzung annehmen -->
    <div v-if="joinId && !collabCollaborating" class="alert alert-info py-2">
      <p class="mb-2">
        You have been invited to join a collaborative book writing session.
        Please log in or sign up to join, or join as a guest.
      </p>
      <div class="d-flex flex-wrap align-items-center gap-2">
        <button type="button" class="btn btn-primary btn-sm" @click="dialog = 'login'">
          Login
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="dialog = 'signup'">
          Sign up
        </button>
        <input
          v-model.trim="guestName"
          class="form-control form-control-sm w-auto"
          placeholder="Your name"
        />
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          :disabled="!guestName"
          @click="alsGastBeitreten"
        >
          Join as Guest
        </button>
      </div>
    </div>

    <!-- Link zur Schreib-Sitzung -->
    <div v-if="collabCollaborating" class="mb-2">
      <div class="d-flex flex-wrap align-items-center gap-2">
        <label class="form-label mb-0">Collaboration link:</label>
        <input class="form-control form-control-sm w-auto" :value="collabLink" readonly />
        <button type="button" class="btn btn-outline-primary btn-sm" @click="linkKopieren">
          Copy link
        </button>
      </div>
      <div v-if="collabMessage" class="alert alert-success py-1 my-2">
        {{ collabMessage }}
      </div>
    </div>
    <div v-if="collabFehler" class="alert alert-warning py-1">
      {{ collabFehler }}
    </div>

    <div ref="anzeige" class="book-display" :class="{ 'book-display-full': fullscreen }">
      <VueBookWriter
        v-if="selectedBook"
        :key="selectedBook._id"
        :book="selectedBook"
        :subject="subject"
        @login="dialog = 'login'"
        @signup="dialog = 'signup'"
        @logout="abmelden"
        @collaborate="zusammenarbeitStarten"
      />
      <p v-else class="text-muted mb-0">
        {{
          auth.angemeldet
            ? "No book selected. Add one or choose one from the dropdown."
            : "Please log in to create or edit books."
        }}
      </p>
    </div>

    <VueLogin
      v-if="dialog === 'login'"
      :email="loginEmail"
      @logged-in="dialog = null"
      @cancel-clicked="dialog = null"
    />
    <VueSignUp
      v-else-if="dialog === 'signup'"
      @signed-up="nachRegistrierung"
      @cancel-clicked="dialog = null"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import VueBookWriter from "./VueBookWriter.vue";
import VueLogin from "@/components/quizzes/VueLogin.vue";
import VueSignUp from "@/components/quizzes/VueSignUp.vue";
import { useAuthStore } from "@/stores/auth";
import { useBookStore } from "@/stores/books";
import { useBookCollab } from "./useBookCollab";

const props = defineProps<{ name: string; subject: string }>();

const auth = useAuthStore();
const store = useBookStore();
const {
  link: collabLink,
  fehler: collabFehler,
  collaborating: collabCollaborating,
  startSession,
  joinSession,
  beenden,
} = useBookCollab();

const selectedId = ref("");
const fullscreen = ref(false);
const dialog = ref<"login" | "signup" | null>(null);
const loginEmail = ref("");
const collabMessage = ref("");
const guestName = ref("");

const selectedBook = computed(() =>
  store.books.find((b) => b._id === selectedId.value),
);

// Ids aus einem Einladungslink.
const joinId = new URLSearchParams(window.location.search).get("bookSession");
const joinBookId = new URLSearchParams(window.location.search).get("book");

onMounted(async () => {
  auth.sitzungWiederherstellen();
  await store.loadBooks(props.subject);
  waehleErstesBuch();
  if (joinId && auth.angemeldet) zusammenarbeitBeitreten(joinId);
  window.addEventListener("keydown", beiTaste);
});

onBeforeUnmount(() => window.removeEventListener("keydown", beiTaste));

function waehleErstesBuch(): void {
  if (!selectedBook.value && store.books.length > 0) {
    selectedId.value = store.books[0]._id ?? "";
  }
}

watch(
  () => store.books.map((b) => b._id).join(","),
  () => waehleErstesBuch(),
);

// --- Buecher verwalten ----------------------------------------------

async function buchHinzufuegen(): Promise<void> {
  const name = window.prompt("Name of the new book:");
  if (!name) return;
  const gespeichert = await store.speichern({
    name,
    subject: props.subject,
    paragraphs: [],
    quizzes: [],
  });
  selectedId.value = gespeichert._id ?? "";
}

async function buchUmbenennen(): Promise<void> {
  const buch = selectedBook.value;
  if (!buch) return;
  const name = window.prompt("New name of the book:", buch.name);
  if (!name) return;
  await store.speichern({ ...buch, name });
}

async function buchLoeschen(): Promise<void> {
  const buch = selectedBook.value;
  if (!buch?._id) return;
  if (!window.confirm(`Do you really want to delete "${buch.name}"?`)) return;
  await store.entfernen(buch._id);
  selectedId.value = "";
  waehleErstesBuch();
}

function abmelden(): void {
  beenden();
  auth.abmelden();
  dialog.value = null;
  collabMessage.value = "";
}

function nachRegistrierung(email: string): void {
  loginEmail.value = email;
  dialog.value = "login";
}

// --- Schreib-Sitzung ------------------------------------------------

function zusammenarbeitStarten(): void {
  if (!auth.angemeldet) {
    dialog.value = "login";
    return;
  }
  collabMessage.value =
    "Collaboration link has been copied to your clipboard. Send the link to anyone you want to write a book with!";
  startSession(auth.user?.name || auth.email);
}

function zusammenarbeitBeitreten(id: string): void {
  if (joinBookId) selectedId.value = joinBookId;
  joinSession(id, auth.user?.name || auth.email);
}

function alsGastBeitreten(): void {
  if (!joinId || !guestName.value) return;
  joinSession(joinId, guestName.value);
}

async function linkKopieren(): Promise<void> {
  const text = collabLink.value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  collabMessage.value =
    "Collaboration link has been copied to your clipboard. Send the link to anyone you want to write a book with!";
}

// Sobald die Sitzung wirklich steht, den Link in die Zwischenablage legen.
watch(collabCollaborating, (aktiv) => {
  if (aktiv) void linkKopieren();
});

// --- Vollbild -------------------------------------------------------

function beiTaste(e: KeyboardEvent): void {
  if (e.key === "Escape" && fullscreen.value) fullscreen.value = false;
}
</script>

<style scoped>
.book-display {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.75rem;
  background: #f8f9fa;
}
.book-display-full {
  position: fixed;
  inset: 0;
  z-index: 1080;
  height: auto;
  background: #fff;
}
</style>
