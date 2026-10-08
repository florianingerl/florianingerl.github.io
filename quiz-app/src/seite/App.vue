<template>
  <VueHeader :seite="seite" />
  <VueHero :bild="seite.heroBild" />

  <main id="main">
    <component :is="abschnitt" v-for="(abschnitt, i) in seite.abschnitte" :key="i" />
    <VueContact :kontakt="seite.kontakt" />
  </main>

  <VueFooter :fuss="seite.fuss" />

  <div v-if="!geladen" id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center" :class="{ active: weitUnten }">
    <i class="bi bi-arrow-up-short"></i>
  </a>
  <!-- Vollbild für angeklickte Quiz-Bilder, ein Klick schließt es wieder -->
  <div id="fullpage" @click="schliesseVollbild"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import VueHeader from "./atoms/VueHeader.vue";
import VueHero from "./atoms/VueHero.vue";
import VueFooter from "./atoms/VueFooter.vue";
import VueContact from "./atoms/VueContact.vue";
import type { Seite } from "./sprachen";

// Texte, Menü und Abschnitte der Sprache, die seite.ts geladen hat
defineProps<{ seite: Seite }>();

// Der Ladekreis verschwindet, sobald die Seite mit allen Bildern da ist.
const geladen = ref(document.readyState === "complete");
// Der Pfeil nach oben erscheint erst, wenn man ein Stück gescrollt hat.
const weitUnten = ref(false);

function schliesseVollbild(ereignis: Event): void {
  (ereignis.currentTarget as HTMLElement).style.display = "none";
}

onMounted(() => {
  window.addEventListener("load", () => {
    geladen.value = true;
  });
  const pruefeScroll = () => {
    weitUnten.value = window.scrollY > 100;
  };
  document.addEventListener("scroll", pruefeScroll);
  pruefeScroll();
  // Abschnitte gleiten beim Scrollen herein
  AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
});
</script>
