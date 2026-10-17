<template>
  <div class="container">

    <div class="row">
      <div class="col-12 mt-3">
        <OTopicChooserAndCreator
          :subject="subject ?? quiz"
          :quiz="quiz"
          @topic-selected="onTopicSelected"
          @topic-created="onTopicCreated"
        />
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
      <OImageChooserAndDisplayer v-model="exercise.imageUrl" />

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

    <div class="row justify-center">
      <button class="col btn-primary btn" @click="save">Save</button>
      <button class="col btn-primary btn" @click="emit('cancel-clicked')">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import OImageChooserAndDisplayer from '@/components/organisms/OImageChooserAndDisplayer.vue'
import OTopicChooserAndCreator from '@/components/organisms/OTopicChooserAndCreator.vue'
import type { Exercise, QuizName , School, Topic, TwoPartSentences } from '@/types/quiz'
import { createSchool, fehlerText } from '@/api';

// Die Schulen, aus denen die Schule der Aufgabe gewaehlt wird. Die Liste kommt
// vom Quiz (props.schools) und enthaelt nur Schulen, die im Quiz schon eine
// Aufgabe haben. Eine hier neu angelegte Schule kommt dazu (neueSchulen),
// ebenso die Schule der bearbeiteten Aufgabe, damit die Auswahl sichtbar bleibt.
const neueSchulen = ref<School[]>([])
const schulen = computed<School[]>(() => {
  const liste: School[] = [...(props.schools ?? [])]
  const vorhanden = new Set(
    liste.map((s) => s._id).filter((id): id is string => !!id),
  )
  const schuleDerAufgabe = props.questionOfQuiz?.school
  const extra: School[] = [...neueSchulen.value]
  if (schuleDerAufgabe && typeof schuleDerAufgabe !== 'string') {
    extra.push(schuleDerAufgabe)
  }
  for (const s of extra) {
    if (s._id && !vorhanden.has(s._id)) {
      liste.push(s)
      vorhanden.add(s._id)
    }
  }
  return liste
})
// _id der gewaehlten Schule oder "" fuer "keine Schule".
const gewaehlteSchule = ref<string>('');
// Der Name im Feld "New school".
const neueSchule = ref<string>('');

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
  (e: 'topic-created', topic: Topic): void
  (e: 'cancel-clicked'): void
}>()

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
    if (!neueSchulen.value.some((s) => s._id === schule._id)) {
      neueSchulen.value.push(schule)
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
// Das im Themen-Baum gewaehlte Thema wird das Thema der Aufgabe.
function onTopicSelected(topic: Topic | null): void {
  exercise.value.topic = topic ?? undefined;
}

// Ein neu angelegtes Thema ist schon gespeichert (mit _id) und wird gleich
// das Thema der Aufgabe; das Quiz pflegt es in seine Themenliste ein.
function onTopicCreated(topic: Topic): void {
  exercise.value.topic = topic;
  emit('topic-created', topic);
}


function addOption(): void {
  if (!newOption.value) return
  allOptions.value.push(newOption.value)
  newOption.value = ''
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

onMounted(async () => {
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
</script>

<style scoped>
.textarea {
  height: 10px;
  flex: 1;
  min-width: 0;
}
</style>
