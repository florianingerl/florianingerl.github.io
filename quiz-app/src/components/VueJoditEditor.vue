<template>
  <div ref="ziel" class="jodit-editor"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Jodit } from 'jodit'

// Duerchlaessige Huelle um Jodit, damit sie sich wie ein Vue-Baustein verhaelt.
// Jodit bringt kein eigenes Vue-Paket fuer Version 4 mit, deshalb wird es hier
// direkt eingebunden und nur sein Lebenszyklus an Vue gebunden.
const props = withDefaults(
  defineProps<{
    modelValue?: string
    options?: Record<string, unknown>
  }>(),
  {
    modelValue: '',
    options: () => ({}),
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', html: string): void
}>()

const ziel = ref<HTMLElement | null>(null)
// Der Rueckgabetyp von Jodit.make; der Konstruktor selbst ist nicht oeffentlich.
let editor: ReturnType<typeof Jodit.make> | null = null

onMounted(() => {
  if (!ziel.value) return

  editor = Jodit.make(ziel.value, {
    language: 'de',
    ...props.options,
    events: {
      // Wird bei jeder Aenderung ausgeloest, damit v-model aktuell bleibt.
      change: (neuerWert: string) => emit('update:modelValue', neuerWert),
      ...(props.options.events as Record<string, (...args: unknown[]) => void> | undefined),
    },
  })

  if (props.modelValue) editor.value = props.modelValue
})

// Uebernehmen, wenn der Inhalt von aussen kommt, etwa beim erneuten Oeffnen.
watch(
  () => props.modelValue,
  (neuerWert) => {
    if (editor && neuerWert !== editor.value) editor.value = neuerWert
  }
)

// Jodit haengt sich an das uebergeordnete Fenster und muss wieder abgeraeumt
// werden, sonst bleibt der Editor nach dem Schliessen des Formulars aktiv.
onBeforeUnmount(() => {
  editor?.destruct()
  editor = null
})
</script>

<style scoped>
/* Die von Jodit selbst erzeugten Elemente tragen keine scoped-Kennung, deshalb
   greift :deep() auf sie zu. So bleibt die Editorflaeche bei fester Hoehe und
   bekommt einen Rollbalken, statt den Kasten zu strecken. */
.jodit-editor :deep(.jodit-editor__area) {
  overflow-y: auto;
  max-height: 100%;
}
</style>
