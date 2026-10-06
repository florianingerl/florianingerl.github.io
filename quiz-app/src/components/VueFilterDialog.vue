<!-- Filterdialog. Erscheint an der Stelle des Quiz, wenn der Filter-Button
     neben der Topic-Auswahl geklickt wird. Die Filterung geschieht sofort,
     die Werte liegen im Filter-Store. -->
<template>
  <div class="filter-dialog">
    <div class="card filter-card border-0 shadow-lg">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <div class="filter-icon mx-auto mb-3">
            <i class="bi bi-funnel"></i>
          </div>

          <h2 class="h4 fw-bold mb-2">Filtering options</h2>
          <p class="text-muted mb-0">
            Only the exercises matching all of the filters below are shown.
          </p>
        </div>

        <div class="mb-3">
          <label for="filter-topic" class="form-label fw-semibold">
            Filter for topic:
          </label>

          <select id="filter-topic" v-model="filter.topicId" class="form-select">
            <option value="">All topics</option>
            <option
              v-for="topic in topics"
              :key="topic._id"
              :value="topic._id"
            >
              {{ topic.title }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="filter-creator" class="form-label fw-semibold">
            Filter for creator:
          </label>

          <select
            id="filter-creator"
            v-model="filter.creator"
            class="form-select"
          >
            <option value="">All creators</option>
            <option v-for="c in creators" :key="c" :value="c">
              {{ creatorLabel(c) }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="filter-word" class="form-label fw-semibold">
            Exercise contains the word:
          </label>

          <input
            id="filter-word"
            v-model.trim="filter.word"
            type="text"
            class="form-control"
            placeholder="e.g. nutrition"
          />
          <div class="form-text">
            The word may occur in the topic, the instruction, the gap text,
            the question or in the options.
          </div>
        </div>

        <div class="form-check mb-4">
          <input
            id="filter-case"
            v-model="filter.caseSensitive"
            type="checkbox"
            class="form-check-input"
          />
          <label for="filter-case" class="form-check-label">
            Search for the word case sensitively
          </label>
        </div>

        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary flex-fill py-2"
            @click="resetClicked"
          >
            Reset filters
          </button>

          <button
            type="button"
            class="btn btn-primary flex-fill py-2 fw-semibold"
            @click="emit('cancel-clicked')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useFilterStore } from "../stores/filter";
import type { QuizName, Topic } from "../types.ts";

const props = defineProps<{
  quiz: QuizName;
  topics: Topic[];
  // Alle Benutzer-IDs, die mindestens eine der Aufgaben erstellt haben
  creators: string[];
}>();

const emit = defineEmits<{
  (e: 'cancel-clicked'): void
}>();

const auth = useAuthStore();
const filterStore = useFilterStore();
const filter = filterStore.filterFor(props.quiz);

// Die eigene Adresse ist freundlicher als die technische Benutzer-ID.
function creatorLabel(id: string): string {
  return auth.user?._id === id ? `${auth.email} (you)` : id;
}

function resetClicked(): void {
  filterStore.reset(props.quiz);
}
</script>

<style scoped>
/* Wie die Anmeldedialoge: Karte in der Mitte, sonst nichts daneben. */
.filter-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.filter-card {
  width: 100%;
  max-width: 440px;
  border-radius: 1rem;
}

.filter-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #0d6efd, #6610f2);
  border-radius: 50%;
  font-size: 1.6rem;
}
</style>
