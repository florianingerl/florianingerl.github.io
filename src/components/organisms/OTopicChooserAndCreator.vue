<!-- Themen-Auswahl und -Anlage nebeneinander: Links die Beschriftung
     "Choose a topic (from tree):" mit dem Themen-Baum (MTopicChooser),
     rechts daneben die Anlage eines neuen Themas (MTopicCreator) mit dem im
     Baum gewaehlten Thema als Elternthema. Die Themen werden ueber
     getAllTopics(subject) geladen. Ein neu angelegtes Thema erscheint im
     Baum und wird dort sofort ausgewaehlt. Beide Vorgaenge (Auswahl,
     Anlage) werden nach aussen gemeldet. -->
<template>
  <div class="topic-chooser-and-creator">
    <div class="topic-chooser">
      <MTopicChooser
        :model-value="selectedTopicId"
        :topics="topics"
        label="Choose a topic (from tree):"
        @update:model-value="waehleThema"
      />
    </div>
    <MTopicCreator
      :parentTopic="selectedTopic"
      :subject="subject"
      :quiz="quiz"
      @topic-created="onTopicCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import MTopicChooser from "@/components/molecules/MTopicChooser.vue";
import MTopicCreator from "@/components/molecules/MTopicCreator.vue";
import { getAllTopics } from "@/api";
import type { Topic } from "@/types/quiz";

const props = defineProps<{
  // Sprache oder Fach, nach dem die Themen geladen werden (z.B. "deutsch").
  subject: string;
  // Das Quiz, in dem neue Themen angelegt werden (Name oder _id).
  quiz?: string;
  // _id des vorausgewaehlten Themas oder "" fuer keins.
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "topic-selected", topic: Topic | null): void;
  (e: "topic-created", topic: Topic): void;
}>();

// Alle Themen des Faches; ein neu angelegtes Thema kommt hinten dazu.
const topics = ref<Topic[]>([]);
// _id des im Baum gewaehlten Themas oder "" fuer keins.
const selectedTopicId = ref<string>(props.modelValue ?? "");

// Das im Baum gewaehlte Thema (Elternthema fuer "New topic").
const selectedTopic = computed<Topic | null>(
  () => topics.value.find((t) => t._id === selectedTopicId.value) ?? null,
);

// Eine von aussen gesetzte Vorauswahl wird nur uebernommen. Sie darf nicht
// als Benutzerauswahl gemeldet werden, sonst wuerde das Formular sein Thema
// verlieren, solange die Themenliste noch nicht geladen ist.
watch(
  () => props.modelValue,
  (value) => {
    selectedTopicId.value = value ?? "";
  },
);

function waehleThema(id: string): void {
  selectedTopicId.value = id;
  emit("update:modelValue", id);
  emit("topic-selected", selectedTopic.value);
}

// Ein neu angelegtes Thema wird im Baum sichtbar und gleich ausgewaehlt.
function onTopicCreated(topic: Topic): void {
  topics.value.push(topic);
  const id = topic._id ?? "";
  selectedTopicId.value = id;
  emit("update:modelValue", id);
  emit("topic-created", topic);
}

onMounted(async () => {
  try {
    const vomServer = await getAllTopics(props.subject);
    // Waehrend die Themen geladen werden, kann der Benutzer schon ein neues
    // Thema angelegt haben. Die geladene Liste darf ein solches Thema daher
    // nicht ueberschreiben, sonst verliert der Baum seine Auswahl und das
    // naechste Thema haengt nicht mehr am richtigen Elternthema. Deshalb nur
    // noch fehlende Themen ergaenzen.
    const bekannt = new Set(topics.value.map((t) => t._id));
    topics.value.push(...vomServer.filter((t) => !bekannt.has(t._id)));
  } catch (e) {
    console.error("The topics couldn't be loaded:", e);
  }
});
</script>

<style scoped>
.topic-chooser-and-creator {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 1rem;
  /* Als Container fuer die Container-Abfrage im MTopicCreator (schmaler
     Zustand klappt die Anlage zu einem Overlay-Knopf zusammen). */
  container-type: inline-size;
}

.topic-chooser {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}
</style>
