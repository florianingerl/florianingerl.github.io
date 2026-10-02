<template>
  <div ref="ziel" class="jodit-editor"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Jodit } from 'jodit'
import { findRandomImageUrlOnFacile } from '../utils/randomFacileImage'

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

const execRandomImage = async (jodit: any) => {
  try {
    const url = await findRandomImageUrlOnFacile()
    if (url) {
      jodit.s.insertHTML(`<img src="${url}" alt="">`)
    } else {
      jodit.s.insertHTML(`<span style="color: #dc3545;">Kein Bild gefunden</span>`)
    }
  } catch (e) {
    jodit.s.insertHTML(`<span style="color: #dc3545;">Fehler beim Laden</span>`)
  }
}

;(Jodit as any).defaultOptions = (Jodit as any).defaultOptions || {}
;(Jodit as any).defaultOptions.controls = {
  ...( (Jodit as any).defaultOptions.controls || {} ),
  randomFacileImage: {
    name: 'randomFacileImage',
    title: 'Zufälliges Bild von anglaisfacile.com einfügen',
    tooltip: 'Zufälliges Bild von anglaisfacile.com einfügen',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    text: 'Bild zufällig',
    exec: execRandomImage,
  },
}

// Register plugin to insert random facile image
Jodit.plugins.add('randomFacileImage', (jodit: any) => {
  if (jodit.contextMenu && typeof jodit.contextMenu.add === 'function') {
    jodit.contextMenu.add('randomFacileImage', {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
      title: 'Zufälliges Bild von anglaisfacile.com einfügen',
      exec: () => execRandomImage(jodit),
    })
  }
})

onMounted(() => {
  if (!ziel.value) return

  editor = Jodit.make(ziel.value, {
    language: 'de',
    extraPlugins: ['randomFacileImage'],
    toolbar: true,
    toolbarButtonSize: 'small',
    toolbarSticky: false,
    toolbarAdaptive: true,
    ...props.options,
    buttons: (props.options.buttons as any) ?? [
      'source',
      'randomFacileImage',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'image',
      'link',
      'table',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'fullsize',
      'about',
    ],

    buttonsMD: (props.options.buttonsMD as any) ?? undefined,
    buttonsSM: (props.options.buttonsSM as any) ?? undefined,
    buttonsXS: (props.options.buttonsXS as any) ?? undefined,
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
