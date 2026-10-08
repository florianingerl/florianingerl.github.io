<template>
<div @dblclick="openDict">

    <h4>Double-click on any word on this page to see a translation!</h4>
    Select your preferred dictionary:
     <select  v-model="selectedDict">
  <option disabled value="">Please select one</option>
   <option v-for="dict in dictionaries" :key="dict.name">{{ dict.name }}</option>
</select>

    <router-view/>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

interface Woerterbuch {
  name: string;
  url: string;
}

// Die Wörterbücher je Sprache, die Sprache steht in der Adresse (z. B. /fr/french)
const woerterbuecher: Record<string, Woerterbuch[]> = {
  french: [
    { name: "Word Reference French - German", url: "https://www.wordreference.com/frde/" },
    { name: "Word Reference French - English", url: "https://www.wordreference.com/fren/" },
    { name: "Larousse French - French", url: "https://www.larousse.fr/dictionnaires/francais/" },
    { name: "The free dictionary French - French", url: "https://fr.thefreedictionary.com/" },
  ],
  english: [
    { name: "Word Reference English - German", url: "https://www.wordreference.com/ende/" },
    { name: "Word Reference English - French", url: "https://www.wordreference.com/enfr/" },
    { name: "Oxford Learner's dictionary English - English", url: "https://www.oxfordlearnersdictionaries.com/definition/english/" },
    { name: "The free dictionary English - English", url: "https://en.thefreedictionary.com/" },
  ],
  deutsch: [
    { name: "The free dictionary Deutsch - Deutsch", url: "https://de.thefreedictionary.com/" },
    { name: "Word Reference Deutsch - Englisch", url: "https://www.wordreference.com/deen/" },
    { name: "Word Reference Deutsch - Französisch", url: "https://www.wordreference.com/defr/" },
    { name: "Word Reference Deutsch - Spanisch", url: "https://www.wordreference.com/dees/" },
    { name: "Pons Deutsch - Russisch", url: "https://de.pons.com/%C3%BCbersetzung-2/deutsch-russisch/" },
  ],
  espagnol: [
    { name: "Word Reference Französisch - Spanisch", url: "https://www.wordreference.com/espfr/" },
    { name: "The free dictionary Espagnol - Espagnol", url: "https://esp.thefreedictionary.com/" },
    { name: "Word Reference Spanisch - Deutsch", url: "https://www.wordreference.com/espde/" },
  ],
};

const route = useRoute();
const dictionaries = ref<Woerterbuch[]>([]);
const selectedDict = ref("The free dictionary French - French");

function setDictionaries(): void {
  dictionaries.value = woerterbuecher[String(route.params.language)] ?? [];
  selectedDict.value = dictionaries.value[0]?.name ?? "";
}

// Öffnet das markierte Wort im gewählten Wörterbuch
function openDict(): void {
  const wort = window.getSelection()?.toString() ?? "";
  const eintrag = dictionaries.value.find((dict) => dict.name === selectedDict.value);
  window.open((eintrag?.url ?? "https://fr.thefreedictionary.com/") + wort, "_blank")?.focus();
}

watch(() => route.fullPath, setDictionaries);
onMounted(setDictionaries);
</script>
