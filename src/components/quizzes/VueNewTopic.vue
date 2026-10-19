<template>
  <form
    :class="{ 'vue-new-topic--vollbild': vollbild }"
    @submit.prevent="saveTutorialClicked"
  >

    <div class="d-flex flex-row align-items-center gap-2 mb-2">
      <label for="topic-title" class="form-label mb-0">Titel</label>
      <input id="topic-title" type="text" v-model="topicTitle" />
      <MTopicChooser
        v-model="elternId"
        :topics="auswaehlbareThemen"
        label="Parent topic:"
      />
    </div>

    <div class="topic-editor">
      <VueJoditEditor v-model="editorContent" :options="joditOptionen" ref="editorRef" />
    </div>
    <button type="button" @click="insertRandomFacileImage" class="mt-2 mb-2">
      Zufälliges Bild von anglaisfacile.com einfügen
    </button>
    <div class="row">
        <button type="submit" class="col"><i class="bi bi-save" aria-hidden="true"></i> Save</button>
      </div>
      <div class="col">
        <button type="button" @click="emit('cancel-clicked')"><i class="bi bi-x-lg" aria-hidden="true"></i> Cancel</button>
      </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import VueJoditEditor from "./VueJoditEditor.vue";
import MTopicChooser from "@/components/molecules/MTopicChooser.vue";
import { getAllTopics, getTopic, updateTopic } from "@/api";
import type { Exercise, Topic } from "@/types/quiz";
import { findTopicPath } from "@/utils/topicTree";
import "jodit/es2021/jodit.min.css";
import { findRandomImageUrlOnFacile } from "@/utils/facileImages";

const props = defineProps<{
  questionOfQuiz?: Exercise
  // Im Vollbildmodus fuellt der Editor die verfuegbare Hoehe.
  vollbild?: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel-clicked'): void
  (e: 'tutorial-saved', topic: Topic): void
}>()

const editorContent = ref<string>('')
const topicTitle = ref<string>('')
const editorRef = ref<InstanceType<typeof VueJoditEditor> | null>(null)
// Das gerade bearbeitete Thema (falls vorhanden).
const thema = ref<Topic | null>(null)
// Alle Themen des Faches, aus denen das Elternthema gewaehlt wird.
const alleThemen = ref<Topic[]>([])
// _id des gewaehlten Elternthemas oder "" fuer "kein Elternthema" (Wurzel).
const elternId = ref<string>('')

// Das bearbeitete Thema darf nicht sein eigenes Elternthema werden: es selbst
// und alle seine Nachfahren fallen aus der Auswahlliste.
const auswaehlbareThemen = computed<Topic[]>(() => {
  const eigeneId = thema.value?._id
  if (!eigeneId) return alleThemen.value
  return alleThemen.value.filter(
    (t) =>
      !t._id ||
      !findTopicPath(alleThemen.value, t._id).some((k) => k._id === eigeneId),
  )
})

// Entspricht ungefaehr der Toolbar von TinyMCE: Formatierung, Listen, Links,
// Tabellen, Bilder, Zeichentabelle und Quelltext.
const joditOptionen = {
  // Der Editor fuellt seinen Rahmen (.topic-editor); dessen Hoehe kommt aus der
  // gemeinsamen CSS-Variablen (im Vollbild 100%).
  height: '100%',
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
    thema.value = null
    elternId.value = ''
    alleThemen.value = []
    return
  }
  if (!ex.topic) {
    editorContent.value = ""
    topicTitle.value = ''
    thema.value = null
    elternId.value = ''
    alleThemen.value = []
    return
  }

  try {
    const topic =
      typeof ex.topic === 'string' ? await getTopic(ex.topic) : ex.topic
    editorContent.value = topic.tutorial ?? ''
    topicTitle.value = topic.title ?? ''
    thema.value = topic
    // Das aktuelle Elternthema vorbelegen, damit "Parent topic:" beim
    // Speichern nicht versehentlich geleert wird.
    elternId.value = topic.parentId ?? ''
  } catch (e) {
    console.error("The topic couldn't be loaded:", e)
    editorContent.value = ''
    topicTitle.value = ''
    thema.value = null
    elternId.value = ''
  }
  await ladeThemen()
}

// Die Themen des Faches laden, aus denen das Elternthema gewaehlt wird.
async function ladeThemen(): Promise<void> {
  const ex = props.questionOfQuiz
  const quiz = ex?.quiz
  const fach =
    thema.value?.subject ??
    ex?.subject ??
    (typeof quiz === 'string' ? quiz : quiz?._id)
  if (!fach) {
    alleThemen.value = []
    return
  }
  try {
    alleThemen.value = await getAllTopics(fach)
  } catch (e) {
    console.error("The topics couldn't be loaded:", e)
    alleThemen.value = []
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

async function insertRandomFacileImage(): Promise<void> {
  try {
    const url = await findRandomImageUrlOnFacile()
    const editor = editorRef.value?.getEditor?.()
    if (editor) {
      editor.selection.insertHTML(`<img src="${url}" />`)
    } else {
      editorContent.value = editorContent.value + `<img src="${url}" />`
    }
  } catch (e) {
    alert(`Bild konnte nicht eingefügt werden: ${(e as Error).message}`)
  }
}

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
    const topic: Topic = {
      ...geladen,
      tutorial: editorContent.value,
      title: topicTitle.value,
      // null statt undefined: nur so entfernt der Server das Elternthema,
      // wenn keins mehr gewaehlt ist.
      parentId: elternId.value || null,
    }
    const gespeichert = await updateTopic(topic)
    alert("The tutorial was inserted into the database!")
    emit('tutorial-saved', gespeichert)
  } catch (e) {
    alert(`Speichern fehlgeschlagen: ${(e as Error).message}`)
  }
}

</script>

<style scoped>
/* Ausserhalb des Vollbilds hat der Editor dieselbe Hoehe wie das Aufgabenbild
   (gemeinsame CSS-Variable); im Vollbild nimmt er die verfuegbare Resthoehe
   ein und der Rahmen waechst mit. */
.topic-editor {
  height: var(--exercise-image-height);
}

.vue-new-topic--vollbild {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
}

.vue-new-topic--vollbild .topic-editor {
  flex-grow: 1;
  min-height: 0;
}
</style>
