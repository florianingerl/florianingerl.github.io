<!-- Anlage eines neuen Themas: Beschriftung "New topic:", ein Textfeld fuer
     den Titel und ein Knopf "Add". Das neue Thema wird als Kind von
     parentTopic (das im Themen-Baum gewaehlte Thema) gespeichert; ist keins
     gewaehlt, wird es ein Wurzelthema. Das gespeicherte Thema (mit _id vom
     Server) wird per "topic-created" gemeldet. -->
<template>
  <div class="topic-creator">
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
</template>

<script setup lang="ts">
import { ref } from "vue";
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
    emit("topic-created", topic);
  } catch (e) {
    alert(`The topic could not be saved: ${fehlerText(e, "unknown error")}`);
  }
}
</script>

<style scoped>
.topic-creator {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
