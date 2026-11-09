<template>
  <form
    class="container"
    :class="{ 'exercise-form--vollbild': vollbild }"
    @submit.prevent="save"
  >
    <div class="row">
      <div class="col-12 mt-3">
        <OTopicChooserAndCreator
          v-model="gewaehltesThema"
          :subject="subject ?? quiz"
          :quiz="quiz"
          @topic-selected="onTopicSelected"
          @topic-created="onTopicCreated"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12 mt-3">
        <OSchoolChooserAndCreator
          v-model="gewaehlteSchule"
          :schools="schulenFuerFormular"
          @school-created="schuleAngelegt"
        />
      </div>
    </div>

    <div class="d-flex flex-wrap align-items-end gap-2">
      <div>
        <label class="form-label" for="exercise-type">Type:</label>
        <select id="exercise-type" v-model="exercise.type" class="form-select">
          <option value="gapText">Gap text</option>
          <option value="multipleChoice">Multiple choice</option>
          <option value="matching">Matching</option>
          <option value="wordOrder">Word order</option>
          <option value="programming">Programming</option>
        </select>
      </div>
      <div v-if="exercise.type === 'programming'">
        <label class="form-label" for="programming-language">Language:</label>
        <select id="programming-language" v-model="programmingLanguage" class="form-select">
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Lean 4">Lean 4</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>
    </div>

    <div style="display:flex; flex-direction: row; gap: 2px;" class="mb-3 mt-3">
      <label>Instruction/Question:</label>
      <input style="flex-grow:1;" v-model="exercise.questionOrInstruction" type="text" class="form-control" />
    </div>

    <Splitter style="flex-grow: 1;">
      <SplitterPanel :size="50" :minSize="10">
        <OImageChooserAndDisplayer v-model="exercise.imageUrl" />
      </SplitterPanel>

      <SplitterPanel :size="50" :minSize="10">
        <textarea style="display: block; width: 100%; height: 100%; box-sizing: border-box;"
          v-if="exercise.type === 'gapText'"
          v-model="exercise.gapText"
          rows="3"
        ></textarea>

        <div v-if="exercise.type === 'multipleChoice'" style="display:flex; flex-direction: column; gap: 2px;">
          <div style="display:flex; flex-direction:row;">
          <ul style="flex-grow: 1;" class="list-group">
            <li
              v-for="(o, idx) in allOptions"
              :key="idx"
              class="list-group-item"
              :class="{ active: selectedIndex === idx }"
              style="cursor: pointer;"
              @click="selectOption(idx)"
            >
              {{ o }}<span v-if="idx === 0"> ✓ (richtige Antwort)</span>
            </li>
          </ul>
          <div style="display:flex; flex-direction: column; gap: 2px; justify-content: flex-start;">
            <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="selectedIndex === null || allOptions.length <= 1" @click="moveUp">
              <i class="bi bi-arrow-up"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="selectedIndex === null || allOptions.length <= 1" @click="moveDown">
              <i class="bi bi-arrow-down"></i>
            </button>
          </div>
          </div>
          <div class="mb-3 mt-3">
            <label class="form-label">New option (die erste ist die richtige):</label>
            <input v-model="newOption" type="text" class="form-control" />
            <button type="button" @click="addOption">Add</button>
            <button type="button" @click="allOptions = []">Clear</button>
          </div>
        </div>

        <div v-if="exercise.type === 'matching'"  class="mb-3 mt-3">
          <p >Sentences (at least 2, at most 5):</p>
          <div style="display: grid; grid-template-columns: auto 1fr auto 1fr;"
            v-for="(s, i) in sentences"
            :key="i"
            class="row mb-2 align-items-center"
          >
            <label style="white-space: nowrap;">Part 1:</label>
            <input v-model="s.part1" type="text" style="overflow: auto;" class="form-control col" placeholder="Part 1"/>
            <label style="white-space: nowrap;">Part 2:</label>
            <input v-model="s.part2" type="text" style="overflow: auto;" class="form-control col" placeholder="Part 2" />
            <button
              v-if="sentences.length > 2"
              type="button"
              class="col-sm-1 btn btn-secondary"
              @click="sentences.splice(i, 1)"
            >
              Remove
            </button>
          </div>
          <button
            v-if="sentences.length < 5"
            type="button"
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

        <div v-if="exercise.type === 'programming'" class="mb-3 mt-3 programming-editor">
          <div class="mb-2">
            <label class="form-label" for="programming-solution">
              Function to be implemented (signature and solution):
            </label>
            <textarea
              id="programming-solution"
              v-model="programmingSolution"
              class="form-control programming-code"
              rows="8"
              spellcheck="false"
            ></textarea>
            <div class="form-text">
              Write the complete solution and comment out the part the student must find.
              The student editor removes comments and their contents; "Show solution" removes
              only the comment markers.
            </div>
            <div class="form-text">
              JavaScript/TypeScript example:
              <code>function add(a, b) { /* return a + b; */ }</code>
            </div>
            <div class="form-text">
              Lean 4 example:
              <code>/- def double (x : Nat) : Nat := x + x -/</code>
            </div>
            <div class="form-text">
              Python example:
              <code>def add(a, b):<br />    # return a + b</code>
            </div>
            <div class="form-text">
              Java example (the server wraps it in a Main class):
              <code>static int add(int a, int b) {<br />  // return a + b;<br />}</code>
            </div>
            <div
              v-if="!isLean && !isPython && !isJava && programmingSolution.trim() && !programmingSignature"
              class="form-text"
            >
              Hint: JavaScript/TypeScript solutions need a function declaration somewhere so the
              server can find the function to test. Commenting it out is fine.
            </div>
          </div>

          <div class="mb-2">
            <label class="form-label" for="programming-testcases">Testcases:</label>
            <textarea
              id="programming-testcases"
              v-model="programmingTestcases"
              class="form-control programming-code"
              rows="4"
              spellcheck="false"
              :placeholder="isLean
                ? 'example : double 7 = 14 := rfl'
                : isPython
                  ? 'add(2, 3) == 5 and add(-1, 1) == 0'
                  : isJava
                    ? 'add(2, 3) == 5 && add(-1, 1) == 0'
                    : 'max([7,9,4]) == 9 && max([3,2,1]) == 3'"
            ></textarea>
            <div class="form-text">
              {{ isLean
                ? 'Enter Lean 4 test declarations, for example: example : double 7 = 14 := rfl'
                : isPython
                  ? 'Enter a Python boolean expression that must evaluate to true, for example: add(2, 3) == 5 and add(-1, 1) == 0'
                  : isJava
                    ? 'Enter a Java boolean expression that must evaluate to true, for example: add(2, 3) == 5 && add(-1, 1) == 0'
                    : 'Enter a boolean expression that must evaluate to true.' }}
            </div>
          </div>
        </div>
      </SplitterPanel>
    </Splitter>

    <div class="row justify-content-center">
      <button type="submit" class="col btn btn-primary"><i class="bi bi-save" aria-hidden="true"></i> Save</button>
      <button type="button" class="col btn btn-secondary" @click="emit('cancel-clicked')"><i class="bi bi-x-lg" aria-hidden="true"></i> Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'

import { computed, onMounted, ref } from 'vue'
import OImageChooserAndDisplayer from '@/components/organisms/OImageChooserAndDisplayer.vue'
import OTopicChooserAndCreator from '@/components/organisms/OTopicChooserAndCreator.vue'
import OSchoolChooserAndCreator from '@/components/organisms/OSchoolChooserAndCreator.vue'
import type {
  Exercise,
  ProgrammingLanguage,
  QuizName,
  School,
  Topic,
  TwoPartSentences,
} from '@/types/quiz'
import { extractFunctionSignature, stripCommentMarkers } from '@/utils/programming'

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
  // Im Vollbildmodus fuellt der Splitter die verfuegbare Hoehe.
  vollbild?: boolean
}>()

const emit = defineEmits<{
  (e: 'new-exercise-created', exercise: Exercise): void
  (e: 'school-created', school: School): void
  (e: 'topic-created', topic: Topic): void
  (e: 'cancel-clicked'): void
}>()

function idOfSchule(schule: Exercise['school']): string {
  return typeof schule === 'string' ? schule : schule?._id ?? ''
}

function idOfThema(thema: Exercise['topic']): string {
  return typeof thema === 'string' ? thema : thema?._id ?? ''
}

// _id der gewaehlten Schule oder "" fuer "keine Schule".
const gewaehlteSchule = ref<string>(idOfSchule(props.questionOfQuiz?.school))
// _id des gewaehlten Themas oder "" fuer keins.
const gewaehltesThema = ref<string>(idOfThema(props.questionOfQuiz?.topic))

// Die Schule der aktuellen Aufgabe muss auch dann im Dropdown stehen, wenn
// die vom Quiz gelieferte Schulliste sie (noch) nicht enthaelt.
const schulenFuerFormular = computed<School[]>(() => {
  const liste = [...(props.schools ?? [])]
  const schule = props.questionOfQuiz?.school
  if (
    schule &&
    typeof schule !== 'string' &&
    schule._id &&
    !liste.some((s) => s._id === schule._id)
  ) {
    liste.unshift(schule)
  }
  return liste
})

// Eine neu angelegte Schule wird ans Quiz weitergemeldet, damit es seine
// Schulenliste pflegen kann.
function schuleAngelegt(schule: School): void {
  emit('school-created', schule)
}

const exercise = ref<Exercise>({
  quiz: props.quiz,
  subject: props.subject,
  type: 'gapText',
  imageUrl: 'assets/img/spanisch/bonitamuyer.jpg',
  questionOrInstruction: '',
  gapText: '',
})

const newOption = ref('')
const allOptions = ref<string[]>([])
const selectedIndex = ref<number | null>(null)
// Der Satz einer word-order-Aufgabe.
const wordOrderSentence = ref('')
// Programming exercise: language, solution and test cases.
const programmingLanguage = ref<ProgrammingLanguage>('JavaScript')
const programmingSolution = ref('')
const programmingTestcases = ref('')
const revealedSolution = computed(() =>
  stripCommentMarkers(programmingSolution.value, programmingLanguage.value),
)
const programmingSignature = computed(() =>
  extractFunctionSignature(revealedSolution.value),
)
const isLean = computed(() => programmingLanguage.value === 'Lean 4')
const isPython = computed(() => programmingLanguage.value === 'Python')
const isJava = computed(() => programmingLanguage.value === 'Java')
// Zwei leere Zeilen als Minimum, maximal 5 Saelze.
const sentences = ref<TwoPartSentences[]>([
  { part1: '', part2: '' },
  { part1: '', part2: '' },
])
// Das im Themen-Baum gewaehlte Thema wird das Thema der Aufgabe.
function onTopicSelected(topic: Topic | null): void {
  exercise.value.topic = topic ?? undefined
}

// Ein neu angelegtes Thema ist schon gespeichert (mit _id) und wird gleich
// das Thema der Aufgabe; das Quiz pflegt es in seine Themenliste ein.
function onTopicCreated(topic: Topic): void {
  exercise.value.topic = topic
  emit('topic-created', topic)
}

function selectOption(idx: number): void {
  if (selectedIndex.value === idx) {
    selectedIndex.value = null
    return
  }
  selectedIndex.value = idx
}

function moveUp(): void {
  if (selectedIndex.value === null || allOptions.value.length <= 1) return
  const idx = selectedIndex.value
  const arr = allOptions.value
  const newIdx = (idx - 1 + arr.length) % arr.length
  const [item] = arr.splice(idx, 1)
  arr.splice(newIdx, 0, item)
  selectedIndex.value = newIdx
}

function moveDown(): void {
  if (selectedIndex.value === null || allOptions.value.length <= 1) return
  const idx = selectedIndex.value
  const arr = allOptions.value
  const newIdx = (idx + 1) % arr.length
  const [item] = arr.splice(idx, 1)
  arr.splice(newIdx, 0, item)
  selectedIndex.value = newIdx
}

function addOption(): void {
  if (!newOption.value) return
  allOptions.value.push(newOption.value)
  // Die neue Option wird angehaengt und gleich ausgewaehlt, damit sie mit den
  // Pfeil-Knoepfen nach oben (auf die Position der richtigen Antwort) bewegt
  // werden kann.
  selectedIndex.value = allOptions.value.length - 1
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
  if (exercise.value.type === 'programming') {
    const solution = programmingSolution.value.trim()
    if (!solution) {
      alert('Please write the complete solution for the programming exercise.')
      return
    }
    const testcases = programmingTestcases.value.trim()
    if (!testcases) {
      alert('A programming exercise needs at least one test case.')
      return
    }
    exercise.value.programminglanguage = programmingLanguage.value
    exercise.value.function = programmingSolution.value
    exercise.value.testcases = testcases
  } else {
    delete exercise.value.programminglanguage
    delete exercise.value.function
    delete exercise.value.testcases
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
  selectedIndex.value = null
  if (props.questionOfQuiz.sentences?.length) {
    sentences.value = props.questionOfQuiz.sentences.map((s) => ({ ...s }))
  }
  wordOrderSentence.value = props.questionOfQuiz.wordorder?.sentence ?? ''
  programmingLanguage.value = props.questionOfQuiz.programminglanguage ?? 'JavaScript'
  programmingSolution.value = props.questionOfQuiz.function ?? ''
  programmingTestcases.value = props.questionOfQuiz.testcases ?? ''
})
</script>

<style scoped>
/* Im Vollbild wird das Formular eine Spalte und der Splitter nimmt die
   verfuegbare Hoehe ein; das Bild darf dann in sein Panel hineinwachsen. */
.exercise-form--vollbild {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
}

.textarea {
  height: 10px;
  flex: 1;
  min-width: 0;
}

.programming-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.9rem;
}

.programming-editor {
  max-height: 100%;
  overflow: auto;
}
</style>
