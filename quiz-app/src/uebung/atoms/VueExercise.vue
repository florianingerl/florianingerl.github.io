<template>
<div class="mt-[30px] mb-[10px] rounded-[5px] border-2 border-solid border-[blue] bg-[#ccffff] p-[10px]">
<h2 v-if="lg==='fr'">Exercice</h2>
<h2 v-if="lg==='en'">Exercise</h2>
<h2 v-if="lg==='de'">Übung</h2>
<h4 class="bg-[yellow] text-black">{{instruction}}</h4>
<p v-if="topics !== undefined" class="text-[orange]">
Topics:
<div v-for="topic in topics" style="display: inline;">
<span  class="topic">{{ topic }} </span>
<button @click="google(topic)">Google</button>
</div>
</p>
<slot> </slot>
</div>
</template>

<script setup lang="ts">
// Der Rahmen um jede Übung mit Überschrift, Anweisung und Themen zum Nachschlagen
defineProps<{ instruction?: string; topics?: string[]; lg?: string }>();

function google(thema: string): void {
  window.open("https://www.google.com/search?q=" + thema, "_blank")?.focus();
}
</script>
