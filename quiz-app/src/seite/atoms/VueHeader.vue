<template>
  <!-- Platzhalter in Höhe der festen Kopfzeile, damit nichts darunter verschwindet -->
  <div id="behindheader" class="invisible" :style="{ height: hoehe + 'px' }"></div>

  <header id="header" ref="kopf" class="fixed-top">
    <div class="container d-flex align-items-center">
      <h1 class="logo me-auto">
        <a :href="seite.start ?? 'index.html'">{{ t("logo") }}</a>
      </h1>

      <nav id="navbar" class="navbar order-last order-lg-0" :class="{ 'navbar-mobile': mobil }">
        <ul>
          <template v-for="(gruppe, i) in seite.menue" :key="gruppe.titel">
            <li v-if="gruppe.eintraege.length" class="dropdown">
              <a :class="{ active: i === 0 }" :href="gruppe.ziel" @click="klappe(i, $event)">
                <span>{{ gruppe.titel }}</span> <i class="bi bi-chevron-down"></i>
              </a>
              <ul :class="{ 'dropdown-active': offen.includes(i) }">
                <li v-for="eintrag in gruppe.eintraege" :key="eintrag.ziel">
                  <a :href="eintrag.ziel">{{ eintrag.titel }}</a>
                </li>
              </ul>
            </li>
            <li v-else>
              <a :class="{ active: i === 0 }" :href="gruppe.ziel">{{ gruppe.titel }}</a>
            </li>
          </template>
        </ul>
        <i class="bi mobile-nav-toggle" :class="mobil ? 'bi-x' : 'bi-list'" @click="mobil = !mobil"></i>
      </nav>

      <a href="#contact" class="get-started-btn">{{ t("knopf") }}</a>

      <!-- Sprachumschalter, nur wenn die Hülle mehr als eine Sprache anbietet; ein Klick wechselt ohne Neuladen -->
      <div v-if="angeboten.length > 1" id="selectlanguage" class="ml-[10px] flex flex-col">
        <a v-for="sprache in angeboten" :key="sprache" :href="'?lang=' + sprache" @click.prevent="lade(sprache)"><img :src="flaggen[sprache]?.bild" :alt="flaggen[sprache]?.alt" class="h-[10px]"></a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Seite } from "../sprachen";
import { flaggen } from "../sprachen/flaggen";
import { angeboten, lade } from "../sprache";

defineProps<{ seite: Seite }>();
const { t } = useI18n();

const kopf = ref<HTMLElement>();
const hoehe = ref(0);
// Handy-Ansicht: Menü offen und welche Gruppen aufgeklappt sind
const mobil = ref(false);
const offen = ref<number[]>([]);

// Auf dem Handy klappt ein Klick die Gruppe auf statt zum Abschnitt zu springen.
function klappe(i: number, ereignis: Event): void {
  if (!mobil.value) return;
  ereignis.preventDefault();
  offen.value = offen.value.includes(i) ? offen.value.filter((n) => n !== i) : [...offen.value, i];
}

onMounted(() => {
  hoehe.value = kopf.value?.offsetHeight ?? 0;
  // Anker-Sprünge sollen unter der festen Kopfzeile landen, nicht dahinter.
  document.documentElement.style.scrollPaddingTop = `${hoehe.value}px`;
});
</script>
