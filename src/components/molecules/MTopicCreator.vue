<!-- Anlage eines neuen Themas: Beschriftung "New topic:", ein Textfeld fuer
     den Titel und ein Knopf "Add". Das neue Thema wird als Kind von
     parentTopic (das im Themen-Baum gewaehlte Thema) gespeichert; ist keins
     gewaehlt, wird es ein Wurzelthema. Das gespeicherte Thema (mit _id vom
     Server) wird per "topic-created" gemeldet.
     Wird der umgebende Behälter (OTopicChooserAndCreator) zu schmal, klappt
     die Anlage per Container-Abfrage zu einem Knopf zusammen; ein Klick darauf
     oeffnet sie als Overlay. Ein Klick ausserhalb, Escape oder das Anlegen
     schliesst das Overlay wieder. -->
<template>
  <div
    ref="wurzel"
    class="topic-creator"
    :class="{ 'topic-creator--open': offen }"
  >
    <button
      type="button"
      class="topic-creator__toggle btn btn-outline-primary"
      aria-controls="newTopicTitle"
      :aria-expanded="offen"
      @click="offen = !offen"
    >
      New topic
    </button>

    <div class="topic-creator__body">
      <label class="form-label mb-0" for="newTopicTitle">New topic:</label>
      <input
        id="newTopicTitle"
        v-model="title"
        type="text"
        class="form-control w-auto"
        placeholder="Enter a new topic"
      />
      <button type="button" class="btn btn-primary" @click="addTopicClicked">
        Add
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { createTopic, fehlerText } from "@/api";
import type { Topic } from "@/types/quiz";

const props = defineProps<{
  // Das im Themen-Baum gewaehlte Thema; das neue Thema wird sein Kind.
  parentTopic?: Topic | null;
  // Sprache oder Fach, z.B. "deutsch" oder "Mathematik".
  subject: string;
  // Das Quiz, in dem das Thema angelegt wird (Name oder _id).
  quiz?: string;
}>();

const emit = defineEmits<{
  (e: "topic-created", topic: Topic): void;
}>();

// Der Titel des neuen Themas, wie er im Textfeld steht.
const title = ref("");
// Ob das Overlay im schmalen Zustand aufgeklappt ist.
const offen = ref(false);
const wurzel = ref<HTMLElement | null>(null);

async function addTopicClicked(): Promise<void> {
  const titel = title.value.trim();
  if (!titel) {
    alert("Please enter a title for the new topic.");
    return;
  }
  try {
    const topic = await createTopic({
      subject: props.subject,
      title: titel,
      tutorial: "",
      quiz: props.quiz || undefined,
      parentId: props.parentTopic?._id,
    });
    title.value = "";
    offen.value = false;
    emit("topic-created", topic);
  } catch (e) {
    alert(`The topic could not be saved: ${fehlerText(e, "unknown error")}`);
  }
}

// Klick ausserhalb der Komponente schliesst das Overlay.
function onClickAusserhalb(event: MouseEvent): void {
  if (wurzel.value && !wurzel.value.contains(event.target as Node)) {
    offen.value = false;
  }
}

// Escape schliesst das Overlay.
function onEscape(event: KeyboardEvent): void {
  if (event.key === "Escape") offen.value = false;
}

watch(offen, (istOffen) => {
  if (istOffen) {
    document.addEventListener("mousedown", onClickAusserhalb);
    document.addEventListener("keydown", onEscape);
  } else {
    document.removeEventListener("mousedown", onClickAusserhalb);
    document.removeEventListener("keydown", onEscape);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onClickAusserhalb);
  document.removeEventListener("keydown", onEscape);
});
</script>

<style scoped>
.topic-creator {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
}

/* Im breiten Zustand ist nur das Formular sichtbar. */
.topic-creator__toggle {
  display: none;
}

.topic-creator__body {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
}

/* Ist der umgebende Behälter zu schmal, wird das Formular zum Knopf und klappt
   bei Klick als Overlay ueber den uebrigen Elementen auf. */
@container (max-width: 560px) {
  .topic-creator__toggle {
    display: inline-flex;
  }

  .topic-creator:not(.topic-creator--open) .topic-creator__body {
    display: none;
  }

  .topic-creator--open .topic-creator__body {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    padding: 0.375rem 0.5rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
}
</style>
