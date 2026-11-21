<template>
  <div class="image-chooser-and-displayer">
    <OImageDrawer
      v-if="drawerVisible"
      @saved="drawingSaved"
      @cancel="drawerVisible = false"
    />

    <template v-else>
    <!-- Das gewaehlte Bild: der Rahmen scrollt, das Bild fuellt ihn aus. -->
    <div class="image-chooser-and-displayer__bild-wrapper">
      <img
        v-if="modelValue"
        class="image-chooser-and-displayer__img"
        :src="modelValue"
      />
    </div>

    <MImageFromKlippyChooser @update:modelValue="bildGewaehlt" />

    <div class="image-chooser-and-displayer__zufall-zeile">
      <button
        type="button"
        class="btn btn-secondary image-chooser-and-displayer__zufall"
        @click="zufallsBild"
      >
        Get random image from Facile
      </button>
      <button
        type="button"
        class="btn btn-secondary image-chooser-and-displayer__verlauf"
        :disabled="!kannZurueck"
        title="Undo"
        aria-label="Undo"
        @click="zurueck"
      >
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
      <button
        type="button"
        class="btn btn-secondary image-chooser-and-displayer__verlauf"
        :disabled="!kannVor"
        title="Redo"
        aria-label="Redo"
        @click="vor"
      >
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </div>

    <button
      type="button"
      class="btn btn-secondary image-chooser-and-displayer__zeichnen"
      @click="drawerVisible = true"
    >
      <i class="bi bi-pencil" aria-hidden="true"></i>
      {{ t("imageChooser.drawYourself") }}
    </button>
    <p v-if="fehler" class="text-danger mb-0">{{ fehler }}</p>

    <MPasteImageOrUrl @update:modelValue="bildGewaehlt" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MImageFromKlippyChooser from '@/components/molecules/MImageFromKlippyChooser.vue'
import MPasteImageOrUrl from '@/components/molecules/MPasteImageOrUrl.vue'
import OImageDrawer from '@/components/organisms/OImageDrawer.vue'
import { findRandomImageUrlOnFacile } from '@/utils/facileImages'

type BildEintrag = { url: string; jsonUrl?: string }

// Das aktuell angezeigte Bild kommt ueber v-model herein und wird ueber
// v-model wieder nach oben gemeldet, sobald eine der Unterkomponenten ein
// Bild auswaehlt.
const props = defineProps<{ modelValue?: string; imageJsonUrl?: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', url: string): void
  (e: 'update:imageJsonUrl', url: string): void
}>()

const { t } = useI18n()
const fehler = ref('')
const drawerVisible = ref(false)

// Der Verlauf der gewaehlten Bilder und die Stelle darin, an der wir stehen.
// "Rueckgaengig" geht eine Stelle zurueck, "wiederholen" eine Stelle vor.
const MAX_VERLAUF = 50
const verlauf = ref<BildEintrag[]>([])
const position = ref(-1)
let jsonUrlDerNaechstenMeldung: string | undefined

const kannZurueck = computed(() => position.value > 0)
const kannVor = computed(
  () => position.value >= 0 && position.value < verlauf.value.length - 1,
)

// Jede neue Bildauswahl kommt ueber v-model zurueck herein. Nur wenn sie sich
// vom aktuellen Eintrag unterscheidet, ist es wirklich eine neue Auswahl; bei
// "rueckgaengig"/"wiederholen" steht das gemeldete Bild schon im Verlauf.
watch(
  () => [props.modelValue, props.imageJsonUrl] as const,
  ([neu, jsonUrl]) => {
    if (!neu) return
    const zugehoerigesJson = jsonUrl || jsonUrlDerNaechstenMeldung || ""
    jsonUrlDerNaechstenMeldung = undefined
    const aktuell = verlauf.value[position.value]
    if (aktuell && aktuell.url === neu) {
      if ((aktuell.jsonUrl ?? "") !== zugehoerigesJson) {
        verlauf.value[position.value] = {
          ...aktuell,
          jsonUrl: zugehoerigesJson || undefined,
        }
      }
      return
    }
    verlauf.value = [
      ...verlauf.value.slice(0, position.value + 1),
      { url: neu, jsonUrl: zugehoerigesJson || undefined },
    ]
    if (verlauf.value.length > MAX_VERLAUF) {
      verlauf.value = verlauf.value.slice(-MAX_VERLAUF)
    }
    position.value = verlauf.value.length - 1
  },
  { immediate: true },
)

function bildGewaehlt(url: string): void {
  fehler.value = ''
  jsonUrlDerNaechstenMeldung = ''
  emit('update:modelValue', url)
  emit('update:imageJsonUrl', '')
}

function drawingSaved(value: { url: string; jsonUrl: string }): void {
  fehler.value = ''
  drawerVisible.value = false
  jsonUrlDerNaechstenMeldung = value.jsonUrl
  emit('update:modelValue', value.url)
  emit('update:imageJsonUrl', value.jsonUrl)
}

async function zufallsBild(): Promise<void> {
  fehler.value = ''
  try {
    const url = await findRandomImageUrlOnFacile()
    jsonUrlDerNaechstenMeldung = ''
    emit('update:modelValue', url)
    emit('update:imageJsonUrl', '')
  } catch (e) {
    fehler.value = (e as Error).message
  }
}

function zurueck(): void {
  if (!kannZurueck.value) return
  fehler.value = ''
  position.value -= 1
  const eintrag = verlauf.value[position.value]
  emit('update:modelValue', eintrag.url)
  emit('update:imageJsonUrl', eintrag.jsonUrl ?? '')
}

function vor(): void {
  if (!kannVor.value) return
  fehler.value = ''
  position.value += 1
  const eintrag = verlauf.value[position.value]
  emit('update:modelValue', eintrag.url)
  emit('update:imageJsonUrl', eintrag.jsonUrl ?? '')
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

/* Die Zeile mit dem Zufalls-Bild und den beiden kleinen Verlauf-Knoepfen. */
.image-chooser-and-displayer__zufall-zeile {
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: stretch;
}

.image-chooser-and-displayer__zufall {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0;
}

.image-chooser-and-displayer__zeichnen {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0;
}

/* Kleine, quadratische Knoepfe ohne Text, nur mit dem Bootstrap-Symbol. */
.image-chooser-and-displayer__verlauf {
  flex-grow: 0;
  flex-shrink: 0;
  width: 2.5rem;
  padding-left: 0;
  padding-right: 0;
}
</style>
