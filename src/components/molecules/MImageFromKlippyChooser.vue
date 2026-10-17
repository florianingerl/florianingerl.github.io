<template>
  <div class="image-from-klippy-chooser">
    <input
      v-model="suchbegriff"
      type="text"
      class="form-control"
      placeholder="Search on Klippy"
      @keyup.enter="bildSuchen"
    />
    <button
      type="button"
      class="btn btn-secondary image-from-klippy-chooser__button"
      :title="schaltflaecheText"
      @click="bildSuchen"
    >
      <i class="bi bi-images"></i> {{ schaltflaecheText }}
    </button>
  </div>
  <p v-if="fehler" class="text-danger mb-0">{{ fehler }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { searchKlipyImages } from '@/utils/klipy'

// Die Komponente meldet das gefundene Bild ueber v-model nach oben.
const emit = defineEmits<{ (e: 'update:modelValue', url: string): void }>()

// Der Text der Schaltflaeche; derselbe Text steht als Tooltip (title) daran.
const schaltflaecheText = 'Search image on Klippy'

const suchbegriff = ref('')
const fehler = ref('')

// Die Treffer der zuletzt gesuchten Seite und die naechste noch nicht
// gezeigte; weitere Klicks zeigen so lange neue Bilder, bis eine neue Suche
// die Liste zuruecksetzt.
let treffer: string[] = []
let naechster = 0
let seite = 1
let letzterBegriff = ''

async function bildSuchen(): Promise<void> {
  fehler.value = ''
  const begriff = suchbegriff.value.trim()
  if (!begriff) return
  try {
    if (begriff !== letzterBegriff) {
      treffer = []
      naechster = 0
      seite = 1
      letzterBegriff = begriff
    }
    if (naechster >= treffer.length) {
      treffer = await searchKlipyImages(begriff, seite)
      naechster = 0
      if (treffer.length === 0) return
      seite += 1
    }
    const url = treffer[naechster]
    naechster += 1
    if (url) emit('update:modelValue', url)
  } catch (e) {
    fehler.value = (e as Error).message
  }
}
</script>

<style scoped>
.image-from-klippy-chooser {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 2px;
}

.image-from-klippy-chooser .form-control {
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0;
}

/* Feste Breite; zu langer Text wird mit "..." abgeschnitten. Der volle Text
   steht als Tooltip (title) an der Schaltflaeche. */
.image-from-klippy-chooser__button {
  width: 12rem;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-from-klippy-chooser .text-danger {
  flex-basis: 100%;
}
</style>
