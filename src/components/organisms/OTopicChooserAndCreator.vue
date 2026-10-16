<!-- Themen-Auswahl und -Anlage nebeneinander: Links die Beschriftung
     "Choose a topic (from tree):" mit dem Themen-Baum (VueTopicFilter),
     rechts daneben die Anlage eines neuen Themas (MTopicCreator) mit dem im
     Baum gewaehlten Thema als Elternthema. Die Themen werden ueber
     getAllTopics(subject) geladen. Ein neu angelegtes Thema erscheint im
     Baum und wird dort sofort ausgewaehlt. Beide Vorgaenge (Auswahl,
     Anlage) werden nach aussen gemeldet. -->
<template>
  <div class="topic-chooser-and-creator">
    <div class="topic-chooser">
      <label class="form-label mb-0">Choose a topic (from tree):</label>
      <VueTopicFilter v-model="selectedTopicId" :topics="topics" />
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
import VueTopicFilter from "@/components/quizzes/VueTopicFilter.vue";
import MTopicCreator from "@/components/molecules/MTopicCreator.vue";
import { getAllTopics } from "@/api";
import type { Topic } from "@/types/quiz";

const props = defineProps<{
  // Sprache oder Fach, nach dem die Themen geladen werden (z.B. "deutsch").
  subject: string;
  // Das Quiz, in dem neue Themen angelegt werden (Name oder _id).
  quiz?: string;
}>();

const emit = defineEmits<{
  (e: "topic-selected", topic: Topic | null): void;
  (e: "topic-created", topic: Topic): void;
}>();

// Alle Themen des Faches; ein neu angelegtes Thema kommt hinten dazu.
const topics = ref<Topic[]>([]);
// _id des im Baum gewaehlten Themas oder "" fuer keins.
const selectedTopicId = ref<string>("");

// Das im Baum gewaehlte Thema (Elternthema fuer "New topic").
const selectedTopic = computed<Topic | null>(
  () => topics.value.find((t) => t._id === selectedTopicId.value) ?? null,
);

// Die Auswahl im Baum wird nach aussen gemeldet.
watch(selectedTopicId, () => {
  emit("topic-selected", selectedTopic.value);
});

// Ein neu angelegtes Thema wird im Baum sichtbar und gleich ausgewaehlt.
function onTopicCreated(topic: Topic): void {
  topics.value.push(topic);
  selectedTopicId.value = topic._id ?? "";
  emit("topic-created", topic);
}

onMounted(async () => {
  try {
    topics.value = await getAllTopics(props.subject);
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
  flex-wrap: wrap;
  gap: 1rem;
}

.topic-chooser {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}
</style>
