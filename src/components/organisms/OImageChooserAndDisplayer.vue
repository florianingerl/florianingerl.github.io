<template>
  <div class="image-chooser-and-displayer">
    <!-- Das gewaehlte Bild: der Rahmen scrollt, das Bild fuellt ihn aus. -->
    <div class="image-chooser-and-displayer__bild-wrapper">
      <img
        v-if="modelValue"
        class="image-chooser-and-displayer__img"
        :src="modelValue"
      />
    </div>

    <MImageFromKlippyChooser @update:modelValue="bildGewaehlt" />

    <button
      type="button"
      class="btn btn-secondary image-chooser-and-displayer__zufall"
      @click="zufallsBild"
    >
      Get random image from Facile
    </button>
    <p v-if="fehler" class="text-danger mb-0">{{ fehler }}</p>

    <MPasteImageOrUrl @update:modelValue="bildGewaehlt" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MImageFromKlippyChooser from '@/components/molecules/MImageFromKlippyChooser.vue'
import MPasteImageOrUrl from '@/components/molecules/MPasteImageOrUrl.vue'
import { findRandomImageUrlOnFacile } from '@/utils/facileImages'

// Das aktuell angezeigte Bild kommt ueber v-model herein und wird ueber
// v-model wieder nach oben gemeldet, sobald eine der Unterkomponenten ein
// Bild auswaehlt.
defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', url: string): void }>()

const fehler = ref('')

function bildGewaehlt(url: string): void {
  fehler.value = ''
  emit('update:modelValue', url)
}

async function zufallsBild(): Promise<void> {
  fehler.value = ''
  try {
    emit('update:modelValue', await findRandomImageUrlOnFacile())
  } catch (e) {
    fehler.value = (e as Error).message
  }
}
</script>

<style scoped>
.image-chooser-and-displayer {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: stretch;
  /* Im Vollbild (die Variable ist dann 100%) fuellt die Komponente ihr Panel. */
  height: 100%;
  min-height: 0;
}

.image-chooser-and-displayer__bild-wrapper {
  overflow: auto;
  flex-grow: 1;
  height: var(--exercise-image-height);
  min-height: 0;
}

.image-chooser-and-displayer__img {
  display: block;
  object-fit: cover;
  object-position: center;
}

.image-chooser-and-displayer__zufall {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  align-self: stretch;
}
</style>
