<template>
  <div class="container">

    <div class="row">
      <label class="col" for="topic">Choose a topic (from tree):</label>
    </div>

    <div class="row">
      <div class="col-12 mt-3">
        <div ref="topicPicker" class="topic-picker position-relative">
          <button
            type="button"
            class="btn btn-outline-secondary text-start w-100"
            @click="treeOffen = !treeOffen"
          >
            {{ selectedTopicLabel || "Choose a topic..." }}
          </button>
          <div
            v-show="treeOffen"
            class="topic-tree-overlay border rounded bg-white shadow p-2"
          >
            <Tree
              :value="treeNodes"
              selectionMode="single"
              v-model:selectionKeys="selectionKeys"
              v-model:expandedKeys="expandedKeys"
              @nodeSelect="onNodeSelect"
              @nodeUnselect="onNodeUnselect"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mt-3 d-flex flex-wrap align-items-center gap-2">
        <label class="form-label mb-0" for="exerciseSchool">School</label>
        <select
          id="exerciseSchool"
          v-model="gewaehlteSchule"
          class="form-select w-auto"
        >
          <option value="">No school</option>
          <option v-for="s in schulen" :key="s._id" :value="s._id">
            {{ s.name }}
          </option>
        </select>
        <label class="form-label mb-0" for="newSchoolName">New school</label>
        <input
          id="newSchoolName"
          v-model="neueSchule"
          type="text"
          class="form-control w-auto"
          placeholder="e.g. Hochschule Regensburg"
        />
        <button type="button" class="btn btn-primary" @click="schuleAnlegen">
          Add
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mt-3 p-3 border border-dark rounded">
        <h5>New topic</h5>
        <div class="input-group mb-2">
          <label class="input-group-text" for="newTopicTitle">Title</label>
          <input
            id="newTopicTitle"
            v-model="newTopic"
            type="text"
            class="form-control"
            placeholder="Enter a new topic"
          />
        </div>
        <div class="text-center">
          <button class="btn btn-primary" @click="addNewTopicClicked">Add new topic</button>
        </div>
      </div>

    </div>

    <div>
      <label class="form-label" for="exercise-type">Type:</label>
      <select id="exercise-type" v-model="exercise.type">
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

    <div class="mt-2 mb-2">
      <label class="form-label" for="imageUrlInput">Image url</label>
      <div class="input-group">
        <input
          id="imageUrlInput"
          v-model="imageUrlInput"
          type="text"
          class="form-control"
          placeholder="https://..."
          @paste="imagePasted"
        />
        <button class="btn btn-secondary" type="button" @click="applyImageUrl">
          Get image
        </button>
      </div>
      <p v-if="imageUrlMessage" class="text-danger">{{ imageUrlMessage }}</p>
    </div>

    <div class="row justify-center">
      <button class="col btn-primary btn" @click="save">Save</button>
      <button class="col btn-primary btn" @click="emit('cancel-clicked')">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { API_URL, uploadImage } from '@/api'

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

// Sucht in den Daten einer Zwischenablage (Strg+V) ein Bild. Text wird
// durchgelassen (null), damit die Eingabe normal weiter funktioniert.
export function dateiAusZwischenablage(
  daten: DataTransfer | null | undefined,
): File | null {
  if (!daten) return null
  for (const datei of Array.from<File>(daten.files ?? [])) {
    if (datei.type.startsWith('image/')) return datei
  }
  for (const element of Array.from<DataTransferItem>(daten.items ?? [])) {
    if (element.kind === 'file' && element.type.startsWith('image/')) {
      const datei = element.getAsFile()
      if (datei) return datei
    }
  }
  return null
}

// Liest eine Datei als Data-URL ("data:image/png;base64,..."), so wie sie der
// Server erwartet.
function dateiAlsDatenUrl(datei: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const leser = new FileReader()
    leser.onload = () => resolve(String(leser.result))
    leser.onerror = () => reject(new Error('The pasted image could not be read.'))
    leser.readAsDataURL(datei)
  })
}

// Macht aus der Antwort des Servers eine URL, die der Browser laden kann.
// Bilder, die unser Server ausliefert, werden immer ueber API_URL geladen
// (auch wenn der Server hinter dem Proxy nur http gemeldet hat); eine fremde,
// absolute URL bleibt unveraendert.
export function bildUrl(url: string): string {
  const pfad = url.replace(/^https?:\/\/[^/]+/i, '')
  if (pfad.startsWith('/api/image/')) return `${API_URL}${pfad}`
  return /^https?:\/\//i.test(url) ? url : `${API_URL}${url}`
}

// Schickt ein eingefuegtes Bild an den Server (der das Tageslimit prueft) und
// liefert die vollstaendige URL des gespeicherten Bildes zurueck.
export async function uploadPastedImage(datei: File): Promise<string> {
  const datenUrl = await dateiAlsDatenUrl(datei)
  const antwort = await uploadImage(datenUrl)
  return bildUrl(antwort.url)
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, computed } from 'vue'
import VueImage from './VueImage.vue'
import type { Exercise, QuizName , School, Topic, TwoPartSentences } from '@/types/quiz'
import { createSchool, fehlerText, getAllTopics } from '@/api';
import Tree from 'primevue/tree';
import { buildTopicTree, topicPathString } from '@/utils/topicTree';

const newTopic = ref<string>('');
const topics = ref<Topic[]>([])
// Die Schulen aus der Datenbank, aus denen die Schule der Aufgabe gewaehlt
// wird. Die Liste kommt vom Quiz (props.schools); eine hier neu angelegte
// Schule wird zusaetzlich in diese eigene Liste aufgenommen, damit sie sofort
// in der Auswahl steht.
const schulen = ref<School[]>([])
// _id der gewaehlten Schule oder "" fuer "keine Schule".
const gewaehlteSchule = ref<string>('');
// Der Name im Feld "New school".
const neueSchule = ref<string>('');
// PrimeVue erwartet beim single-Modus ein Objekt { [key]: true }.
const selectionKeys = ref<Record<string, boolean>>({});
const selectedNode = ref<Topic | null>(null);
const expandedKeys = ref<Record<string, boolean>>({});
// Der Baum liegt als Menue ueber dem Formular und ist nur aufgeklappt sichtbar.
const treeOffen = ref(false);
const topicPicker = ref<HTMLElement | null>(null);

const props = defineProps<{
  // Name eines Website-Quizzes (z.B. "deutsch") oder - bei einem Buch-Quizz -
  // dessen _id. Gespeichert wird die Aufgabe mit diesem Wert als quiz.
  quiz: QuizName | string
  // Sprache oder Fach. Bei einem Buch-Quizz wird daraus das Thema (subject)
  // der Aufgabe und der Filter fuer die Themen-Dropdown-Liste.
  subject?: string
  questionOfQuiz?: Exercise
  editMode: boolean
  // Alle Schulen, die in der Datenbank stehen (vom Quiz geladen).
  schools?: School[]
}>()

const emit = defineEmits<{
  (e: 'new-exercise-created', exercise: Exercise): void
  (e: 'school-created', school: School): void
  (e: 'cancel-clicked'): void
}>()

// Die Schulliste des Quiz uebernehmen; neue Schulen (siehe unten) kommen nur
// dann dazu, wenn kein Quiz die Liste liefert (z.B. in Tests).
watch(
  () => props.schools ?? [],
  (liste) => {
    schulen.value = [...liste]
  },
  { immediate: true, deep: true },
)

// Legt die im Feld "New school" eingetippte Schule an, waehlt sie aus und
// macht sie zur Schule dieser Aufgabe. Der Server liefert eine schon
// vorhandene Schule mit demselben Namen zurueck, statt sie doppelt anzulegen.
async function schuleAnlegen(): Promise<void> {
  const name = neueSchule.value.trim()
  if (!name) {
    alert('Please enter a name for the new school.')
    return
  }
  try {
    const schule = await createSchool(name)
    if (!schulen.value.some((s) => s._id === schule._id)) {
      schulen.value.push(schule)
    }
    gewaehlteSchule.value = schule._id ?? ''
    neueSchule.value = ''
    emit('school-created', schule)
  } catch (e) {
    alert(`The school could not be saved: ${fehlerText(e, 'unknown error')}`)
  }
}

const exercise = ref<Exercise>({
  quiz: props.quiz,
  subject: props.subject,
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

// Das Textfeld neben dem Label "Image url". Es nimmt eine eingegebene oder
// eingefuegte Bild-Adresse auf; ein eingefuegtes Bild wird hochgeladen.
const imageUrlInput = ref('')
const imageUrlMessage = ref('')

// Bildsuche über Klipy
const searchString = ref('Duck')
let searchStringChanged = true
let imageUrls: string[] = []
let k = 0
let page = 1

function addNewTopicClicked(){
  if (!newTopic.value.trim()) {
    alert('Please enter a title for the new topic.')
    return
  }
  let parentId: string | undefined = undefined;

  if (selectedNode.value) {
    // Ist ein Thema im Baum ausgewaehlt, wird das neue Thema ein Unterthema
    // davon.
    parentId = selectedNode.value._id;
  }

  const topic: Topic = {
    subject: props.subject ?? (props.quiz || ''),
    title: newTopic.value.trim(),
    tutorial: '',
    quiz: props.quiz || undefined,
    parentId: parentId,
  };

  exercise.value.topic = topic;
  topics.value.push(topic);
  selectionKeys.value = {};
  selectedNode.value = null;
  newTopic.value = '';
  treeOffen.value = false;
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

// Uebernimmt die eingetippte/eingefuegte Adresse als Bild der Aufgabe.
function applyImageUrl(): void {
  const url = imageUrlInput.value.trim()
  if (!url) return
  imageUrlMessage.value = ''
  exercise.value.imageUrl = url
}

// Ein Bild aus der Zwischenablage wird erst an den Server geschickt und dann
// als Bild der Aufgabe uebernommen. Reiner Text wird normal eingefuegt.
async function imagePasted(event: ClipboardEvent): Promise<void> {
  const datei = dateiAusZwischenablage(event.clipboardData)
  if (!datei) return
  event.preventDefault()
  imageUrlMessage.value = ''
  try {
    const url = await uploadPastedImage(datei)
    exercise.value.imageUrl = url
    imageUrlInput.value = url
  } catch (e) {
    imageUrlMessage.value = fehlerText(e, 'The image could not be uploaded.')
  }
}

function save(): void {
  exercise.value.school = gewaehlteSchule.value || undefined
  if (exercise.value.type === 'multipleChoice') {
    if (allOptions.value.length < 2) {
      alert('A multiple choice exercise needs at least two options (the first one is the correct one).')
      return
    }
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
  // Die Themen werden nach Sprache/Fach gefiltert; bei Buch-Quizzen ist das
  // nicht der Quiz-Name, sondern das Fach (subject).
  topics.value = await getAllTopics(props.subject ?? props.quiz);

  console.log("Here are all the topics from the database for quiz " + (props.subject ?? props.quiz) );
  console.log(topics.value );


  if (!props.questionOfQuiz) return
  // Beim Bearbeiten wird die Frage mit ihrer _id über­nomen, beim Anlegen nur als Vorlage ohne _id
  const { _id, correctlyAnswered: _ca, gaps: _g, guessedSentences: _gs, wordorder: _wo, ...vorlage } = props.questionOfQuiz
  exercise.value = {
    ...vorlage,
    quiz: props.quiz,
    subject: props.subject ?? vorlage.subject,
    ...(props.editMode ? { _id } : {}),
  }
  allOptions.value = (props.questionOfQuiz.options ?? []).map((o) => o.option)
  if (props.questionOfQuiz.sentences?.length) {
    sentences.value = props.questionOfQuiz.sentences.map((s) => ({ ...s }))
  }
  wordOrderSentence.value = props.questionOfQuiz.wordorder?.sentence ?? ''
  // Die Schule der bearbeiteten Aufgabe auswaehlen. Der Server schickt sie als
  // Dokument mit, gespeichert wird aber die _id.
  const schule = props.questionOfQuiz.school
  gewaehlteSchule.value =
    typeof schule === 'string' ? schule : schule?._id ?? ''
  //TODO The topic of the exercise should be the topic of the exercise of the quiz
})

const treeNodes = computed(() => buildTopicTree(topics.value));

// "Wurzel->...->Thema" des aktuell fuer die Aufgabe gewaehlten Themas.
const selectedTopicLabel = computed(() => {
  const t = exercise.value.topic;
  if (!t || typeof t === 'string') return '';
  if (!t._id) return t.title;
  return topicPathString(topics.value, t._id);
});

function onNodeSelect(node: { data?: Topic }) {
  if (node.data) {
    selectedNode.value = node.data;
    exercise.value.topic = node.data;
    treeOffen.value = false;
  }
}

function onNodeUnselect() {
  selectedNode.value = null;
}

// Klick ausserhalb schliesst das aufgeklappte Themen-Menue.
function onClickAusserhalb(event: MouseEvent): void {
  if (topicPicker.value && !topicPicker.value.contains(event.target as Node)) {
    treeOffen.value = false;
  }
}

watch(treeOffen, (offen) => {
  if (offen) {
    document.addEventListener('mousedown', onClickAusserhalb);
  } else {
    document.removeEventListener('mousedown', onClickAusserhalb);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickAusserhalb);
});
</script>

<style scoped>
.textarea {
  height: 10px;
  flex: 1;
  min-width: 0;
}

.topic-tree-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 16rem;
  max-height: 20rem;
  overflow-y: auto;
}
</style>
