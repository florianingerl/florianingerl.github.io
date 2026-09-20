<template>
  <div class="container">
    <!--
    <div class="row">
      <span class="fw-bold">Topics:</span> {{ (exercise.topics ?? []).join(', ') }}
      <button @click="exercise.topics = []">Clear</button>
    </div>

    <div class="row mb-3">
      <label class="col-3">New topic:</label>
      <input v-model="newTopic" type="text" class="col-7" placeholder="Enter a new topic" />
      <button class="col-2" @click="addTopic">Add</button>
    </div> -->

    <div class="row">
       <label class="col" for="topic">Choose a topic:</label>

  <select class="col" id="topic" v-model="exercise.topic">
    <option disabled value="">Please select one</option>

    <option
      v-for="topic in topics"
      :key="topic.title"
      :value="topic"
    >
      {{ topic.title }}
    </option>
  </select>

  <label class="col" for="newTopic">New topic:</label>
   <input class="col"
    id="newTopic"
    v-model="newTopic"
    type="text"
    placeholder="Enter a new topic"
  />

  <button class="col" @click="addNewTopicClicked">Add</button>

    </div>

    <div>
      <label class="form-label">Type:</label>
      <select v-model="exercise.type">
        <option value="gapText">Gap text</option>
        <option value="multipleChoice">Multiple choice</option>
      </select>
    </div>

    <div v-if="exercise.type === 'gapText'" class="mb-3 mt-3">
      <label class="form-label">Instruction:</label>
      <input v-model="exercise.instruction" type="text" class="form-control" />
    </div>

    <div v-if="exercise.type === 'multipleChoice'" class="mb-3 mt-3">
      <label class="form-label">Question:</label>
      <input v-model="exercise.question" type="text" class="form-control" />
    </div>

    <div style="display: flex">
      <VueImage :imageUrl="exercise.imageUrl" />

      <textarea v-if="exercise.type === 'gapText'" v-model="exercise.gapText" rows="3"></textarea>

      <div v-if="exercise.type === 'multipleChoice'">
        <ul class="list-group">
          <li v-for="(o, idx) in allOptions" :key="idx" class="list-group-item">
            {{ o }}<span v-if="idx === 0"> ✓ (richtige Antwort)</span>
          </li>
        </ul>
        <div class="mb-3 mt-3">
          <label class="form-label">New option (die erste ist die richtige):</label>
          <input v-model="newOption" type="text" class="form-control" />
          <button @click="addOption">Add</button>
          <button @click="allOptions = []">Clear</button>
        </div>
      </div>
    </div>

    Search: <input v-model="searchString" type="text" />
    <button v-if="!editMode" @click="nextImage">Change image</button>

    <div class="row justify-center">
      <button class="col btn-primary btn" @click="save">Save</button>
      <button class="col btn-primary btn" @click="emit('cancel-clicked')">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import VueImage from './VueImage.vue'
import type { Exercise, QuizName , Topic } from '../types.ts'
import { getAllTopics } from '../api.ts';

const newTopic = ref<string>('');
const topics = ref<Topic[]>([])

const props = defineProps<{
  quiz: QuizName
  questionOfQuiz?: Exercise
  editMode: boolean
}>()

const emit = defineEmits<{
  (e: 'new-exercise-created', exercise: Exercise): void
  (e: 'cancel-clicked'): void
}>()

const exercise = ref<Exercise>({
  quiz: props.quiz,
  type: 'gapText',
  imageUrl: 'assets/img/spanisch/bonitamuyer.jpg',
  instruction: '',
  gapText: '',
})

const newOption = ref('')
const allOptions = ref<string[]>([])

// Bildsuche über Klipy
const searchString = ref('Duck')
let searchStringChanged = true
let imageUrls: string[] = []
let k = 0
let page = 1

function addNewTopicClicked(){
  let topic: Topic = { 
    quiz: props.quiz,
    title: newTopic.value,
    tutorial: '' 
  };

  exercise.value.topic = topic;

  topics.value.push(topic);
}


function addOption(): void {
  if (!newOption.value) return
  allOptions.value.push(newOption.value)
  newOption.value = ''
}

async function findGifUrls(): Promise<string[]> {
  const key = import.meta.env.VITE_KLIPY_API_KEY
  
  //const key = "GblaAUO3H2fVadJMh2BBPfeNpoAcdpI0TQKEx7HGN2GDeCVNpLY9CgEB10yhcnZb";
  
  if (!key) {
    alert('Kein Klipy-Schlüssel: VITE_KLIPY_API_KEY in quiz-app/.env eintragen.')
    return []
  }
  const url = new URL(`https://api.klipy.com/api/v1/${key}/gifs/search`)
  url.searchParams.set('q', searchString.value)
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', '10')
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Klipy request failed: ${response.status}`)
  const result = (await response.json()) as { data: { data: Array<{ file: { hd: { jpg: { url: string } } } }> } }
  return result.data.data.map((e) => e.file.hd.jpg.url)
}

async function nextImage(): Promise<void> {
  if (!searchStringChanged) {
    k++
    if (k < imageUrls.length) {
      exercise.value.imageUrl = imageUrls[k]
      return
    }
    page++
    k = 0
  }
  imageUrls = await findGifUrls()
  k = 0
  searchStringChanged = false
  if (imageUrls[k]) exercise.value.imageUrl = imageUrls[k]
}

function save(): void {
  if (exercise.value.type === 'multipleChoice') {
    exercise.value.options = allOptions.value.map((o, i) => ({ option: o, correct: i === 0 }))
  }
  emit('new-exercise-created', exercise.value)
}

watch(searchString, () => {
  searchStringChanged = true
})

onMounted(async () => {
  topics.value = await getAllTopics(props.quiz);

  console.log("Here are all the topics from the database for quiz " + props.quiz );
  console.log(topics.value );


  if (!props.questionOfQuiz) return
  // Beim Bearbeiten wird die Frage mit ihrer _id übernommen, beim Anlegen nur als Vorlage ohne _id
  const { _id, correctlyAnswered: _ca, ...vorlage } = props.questionOfQuiz
  exercise.value = { ...vorlage, quiz: props.quiz, ...(props.editMode ? { _id } : {}) }
  allOptions.value = (props.questionOfQuiz.options ?? []).map((o) => o.option)
})
</script>

<style scoped>
.textarea {
  height: 10px;
  flex: 1;
  min-width: 0;
}
</style>
