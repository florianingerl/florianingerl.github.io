<template>
  <div>
    
    <label for="topic-title">Titel</label>
    <input id="topic-title" type="text" v-model="topicTitle" />
    <VueJoditEditor v-model="editorContent" :options="joditOptionen" />
    <div class="row">
      <div class="col">
        <button @click="saveTutorialClicked">Save</button>
      </div>
      <div class="col">
        <button @click="emit('cancel-clicked')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import VueJoditEditor from "./VueJoditEditor.vue";
import { getTopic, updateTopic } from "@/api";
import type { Exercise, Topic } from "@/types/quiz";
import "jodit/es2021/jodit.min.css";

const props = defineProps<{
  questionOfQuiz?: Exercise
}>()

const emit = defineEmits<{
  (e: 'cancel-clicked'): void
  (e: 'tutorial-saved', topic: Topic): void
}>()

const editorContent = ref<string>('')
const topicTitle = ref<string>('')

// Entspricht ungefaehr der Toolbar von TinyMCE: Formatierung, Listen, Links,
// Tabellen, Bilder, Zeichentabelle und Quelltext.
const joditOptionen = {
  // Gleiche Hoehe wie die Tutorial-Anzeige, mit Rollbalken bei zu viel Text.
  height: 167,
  allowResizeY: true,
  buttons: [
    'bold', 'italic', 'underline', 'strikethrough',
    '|', 'sup', 'sub',
    '|', 'paragraph', 'font', 'fontsize',
    '|', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
    '|', 'unorderedList', 'orderedList', 'outdent', 'indent',
    '|', 'link', 'unlink', 'image', 'table', 'hr', 'source',
  ],
}

async function updateEditorContent(): Promise<void> {
  const ex = props.questionOfQuiz
  if (!ex) {
    editorContent.value = "No exercise and thus no topic to be edited!"
    topicTitle.value = ''
    return
  }
  if (!ex.topic) {
    editorContent.value = ""
    topicTitle.value = ''
    return
  }

  try {
    const topic =
      typeof ex.topic === 'string' ? await getTopic(ex.topic) : ex.topic
    editorContent.value = topic.tutorial ?? ''
    topicTitle.value = topic.title ?? ''
  } catch (e) {
    console.error("The topic couldn't be loaded:", e)
    editorContent.value = ''
    topicTitle.value = ''
  }
}

onMounted(() => {
  updateEditorContent()
})

watch(
  () => props.questionOfQuiz,
  () => {
    updateEditorContent()
  }
)

async function saveTutorialClicked(): Promise<void> {
  const ex = props.questionOfQuiz

  if (!ex?.topic) {
    alert("The current exercise hasn't got a topic!")
    emit('cancel-clicked')
    return
  }

  try {
    const geladen =
      typeof ex.topic === 'string' ? await getTopic(ex.topic) : ex.topic
    const topic: Topic = { ...geladen, tutorial: editorContent.value, title: topicTitle.value }
    const gespeichert = await updateTopic(topic)
    alert("The tutorial was inserted into the database!")
    emit('tutorial-saved', gespeichert)
  } catch (e) {
    alert(`Speichern fehlgeschlagen: ${(e as Error).message}`)
  }
}

</script>
