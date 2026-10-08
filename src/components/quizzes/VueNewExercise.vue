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
        <option value="matching">Matching</option>
        <option value="wordOrder">Word order</option>
      </select>
    </div>

    <div v-if="exercise.type !== 'multipleChoice'" class="mb-3 mt-3">
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

      <div v-if="exercise.type === 'matching'" class="mb-3 mt-3">
        <p>Sentences (at least 2, at most 5):</p>
        <div
          v-for="(s, i) in sentences"
          :key="i"
          class="row mb-2 align-items-center"
        >
          <label class="col-form-label col-sm-1">Part 1:</label>
          <input v-model="s.part1" type="text" class="form-control col" />
          <label class="col-form-label col-sm-1">Part 2:</label>
          <input v-model="s.part2" type="text" class="form-control col" />
          <button
            v-if="sentences.length > 2"
            class="col-sm-1 btn btn-secondary"
            @click="sentences.splice(i, 1)"
          >
            Remove
          </button>
        </div>
        <button
          v-if="sentences.length < 5"
          class="btn btn-secondary"
          @click="sentences.push({ part1: '', part2: '' })"
        >
          Add sentence
        </button>
      </div>

      <div v-if="exercise.type === 'wordOrder'" class="mb-3 mt-3">
        <label class="form-label">Sentence (it will be shown shuffled):</label>
        <input v-model="wordOrderSentence" type="text" class="form-control" />
      </div>
    </div>

    Search: <input v-model="searchString" type="text" />
    <button @click="nextImage">Change image</button>

    <div>
      <button class="btn btn-secondary" @click="randomFacileImage">
        Random image from *facile.com
      </button>
      <p v-if="randomImageFailed" class="text-danger">{{ randomImageFailed }}</p>
    </div>

    <div class="row justify-center">
      <button class="col btn-primary btn" @click="save">Save</button>
      <button class="col btn-primary btn" @click="emit('cancel-clicked')">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
// Die Bilder der *facile.com-Tests liegen unter dieser Adresse.
const FACILE_BILDER_URL = 'https://www.anglaisfacile.com/cgi2/myexam/images2/'

// Kleinste und groesste Nummer, die dort gefunden wurde. Beide sind als Bild
// vorhanden, dazwischen gibt es aber Luecken, deshalb wird jedes Mal geprueft.
const FACILE_BILD_MIN = 25648
const FACILE_BILD_MAX = 105000

// So viele Bilder werden auf einmal geprueft, damit ein Klick schnell bleibt.
const BILDER_PRO_DURCHLAUF = 6

// Wie lange auf ein Bild gewartet wird, bevor die Zahl als nicht vorhanden gilt.
const BILD_TIMEOUT_MS = 6000

// So viele Zahlen werden insgesamt gezogen, bevor aufgegeben wird.
const MAX_DURCHLAEUFE = 4

function zufallsNummer(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Prueft, ob es die Bilddatei gibt.
//
// Bewusst ueber ein Image-Element und nicht ueber fetch: anglaisfacile.com
// schickt kein Access-Control-Allow-Origin, deshalb wuerde fetch an der
// CORS-Pruefung scheitern, auch wenn das Bild existiert. Ein Bild anzeigen
// braucht diese Erlaubnis nicht, also liefert onload "ja" und onerror "nein".
function bildExistiert(url: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const bild = new Image()
    const fertig = (vorhanden: boolean) => {
      bild.onload = null
      bild.onerror = null
      resolve(vorhanden)
    }
    bild.onload = () => fertig(true)
    bild.onerror = () => fertig(false)
    // Sicherheitsnetz, falls der Server gar nicht antwortet.
    setTimeout(() => fertig(false), BILD_TIMEOUT_MS)
    bild.src = url
  })
}

// Zieht BILDER_PRO_DURCHLAUF verschiedene Zahlen und gibt die URL des ersten
// Bildes zurueck, das es wirklich gibt. Beide Endungen werden gleichzeitig
// geprueft, weil die Nummer je nach Bild mal .jpg und mal .gif ist.
async function findeFacileBild(): Promise<string> {
  const zahlen: number[] = []
  while (zahlen.length < BILDER_PRO_DURCHLAUF) {
    const nummer = zufallsNummer(FACILE_BILD_MIN, FACILE_BILD_MAX)
    if (!zahlen.includes(nummer)) zahlen.push(nummer)
  }

  const versuche: Promise<string>[] = []
  for (const nummer of zahlen) {
    for (const endung of ['jpg', 'gif']) {
      const url = `${FACILE_BILDER_URL}${nummer}.${endung}`
      versuche.push(bildExistiert(url).then((vorhanden) => (vorhanden ? url : '')))
    }
  }

  // Sobald ein Bild geladen ist, wird es zurueckgegeben und der Rest egal.
  for (const versuch of versuche) {
    const url = await versuch
    if (url !== '') return url
  }
  return ''
}

// Liefert die URL eines zufaelligen Bildes aus dem Bestand von *facile.com.
export async function findRandomImageUrlOnFacile(): Promise<string> {
  for (let durchlauf = 0; durchlauf < MAX_DURCHLAEUFE; durchlauf++) {
    const url = await findeFacileBild()
    if (url !== '') return url
  }
  throw new Error('Kein Bild unter ' + FACILE_BILDER_URL + ' gefunden')
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import VueImage from './VueImage.vue'
import type { Exercise, QuizName , Topic, TwoPartSentences } from '@/types/quiz'
import { getAllTopics } from '@/api';

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
// Der Satz einer word-order-Aufgabe.
const wordOrderSentence = ref('')
// Zwei leere Zeilen als Minimum, maximal 5 Saelze.
const sentences = ref<TwoPartSentences[]>([
  { part1: '', part2: '' },
  { part1: '', part2: '' },
])
const randomImageFailed = ref('')

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
    alert('Kein Klipy-Schlüssel: VITE_KLIPY_API_KEY in .env eintragen.')
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

async function randomFacileImage(): Promise<void> {
  randomImageFailed.value = ''
  try {
    exercise.value.imageUrl = await findRandomImageUrlOnFacile()
  } catch (e) {
    randomImageFailed.value = (e as Error).message
  }
}

function save(): void {
  if (exercise.value.type === 'multipleChoice') {
    exercise.value.options = allOptions.value.map((o, i) => ({ option: o, correct: i === 0 }))
  }
  if (exercise.value.type === 'matching') {
    const gefuellt = sentences.value.filter(
      (s) => s.part1.trim() !== '' && s.part2.trim() !== '',
    )
    if (gefuellt.length < 2 || gefuellt.length > 5) {
      alert('A matching exercise needs between 2 and 5 complete sentences.')
      return
    }
    exercise.value.sentences = gefuellt.map((s) => ({ part1: s.part1, part2: s.part2 }))
    delete exercise.value.guessedSentences
  } else {
    delete exercise.value.sentences
    delete exercise.value.guessedSentences
  }
  if (exercise.value.type === 'wordOrder') {
    const satz = wordOrderSentence.value.trim()
    if (!satz) {
      alert('Please write the sentence for the word order exercise.')
      return
    }
    // Nur der Satz selbst wird gespeichert, das Mischen passiert im Browser.
    exercise.value.wordorder = { sentence: satz }
  } else {
    delete exercise.value.wordorder
  }
  emit('new-exercise-created', exercise.value)
}

watch(searchString, () => {
  searchStringChanged = true
})

onMounted(async () => {
  //TODO Why doesn't this work ? It get alls the topics, not only of this quiz
  topics.value = await getAllTopics(props.quiz);

  console.log("Here are all the topics from the database for quiz " + props.quiz );
  console.log(topics.value );


  if (!props.questionOfQuiz) return
  // Beim Bearbeiten wird die Frage mit ihrer _id übernommen, beim Anlegen nur als Vorlage ohne _id
  const { _id, correctlyAnswered: _ca, gaps: _g, guessedSentences: _gs, wordorder: _wo, ...vorlage } = props.questionOfQuiz
  exercise.value = { ...vorlage, quiz: props.quiz, ...(props.editMode ? { _id } : {}) }
  allOptions.value = (props.questionOfQuiz.options ?? []).map((o) => o.option)
  if (props.questionOfQuiz.sentences?.length) {
    sentences.value = props.questionOfQuiz.sentences.map((s) => ({ ...s }))
  }
  wordOrderSentence.value = props.questionOfQuiz.wordorder?.sentence ?? ''
  //TODO The topic of the exercise should be the topic of the exercise of the quiz
})
</script>

<style scoped>
.textarea {
  height: 10px;
  flex: 1;
  min-width: 0;
}
</style>
