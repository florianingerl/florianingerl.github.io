<template>
  <div class="paste-image-or-url">
    <label class="form-label mb-0" for="pasteImageOrUrlInput">URL:</label>
    <input
      id="pasteImageOrUrlInput"
      v-model="eingabe"
      type="text"
      class="form-control"
      placeholder="https://..."
      @input="eingabeGeaendert"
      @paste="bildEingefuegt"
    />
    <p v-if="fehler" class="text-danger mb-0">{{ fehler }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fehlerText } from '@/api'
import { dateiAusZwischenablage, istBildAdresse, uploadPastedImage } from '@/utils/images'

// Die Komponente meldet die gewaehlte Bildadresse ueber v-model nach oben.
const emit = defineEmits<{ (e: 'update:modelValue', url: string): void }>()

const eingabe = ref('')
const fehler = ref('')

// Eine eingetippte oder eingefuegte Bildadresse wird sofort gemeldet.
function eingabeGeaendert(): void {
  const wert = eingabe.value.trim()
  if (!istBildAdresse(wert)) return
  fehler.value = ''
  emit('update:modelValue', wert)
}

// Ein Bild aus der Zwischenablage wird sofort zum Server geschickt und die
// Adresse des gespeicherten Bildes gemeldet. Reiner Text wird normal eingefuegt
// und danach von eingabeGeaendert uebernommen.
async function bildEingefuegt(event: ClipboardEvent): Promise<void> {
  const datei = dateiAusZwischenablage(event.clipboardData)
  if (!datei) return
  event.preventDefault()
  fehler.value = ''
  try {
    const url = await uploadPastedImage(datei)
    eingabe.value = url
    emit('update:modelValue', url)
  } catch (e) {
    fehler.value = fehlerText(e, 'The image could not be uploaded.')
  }
}
</script>

<style scoped>
.paste-image-or-url {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
}

.paste-image-or-url label {
  flex-shrink: 0;
}

.paste-image-or-url .form-control {
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0;
}

/* Eine Fehlermeldung nimmt die ganze Breite in einer neuen Zeile ein. */
.paste-image-or-url .text-danger {
  flex-basis: 100%;
}
</style>
