<template>
<div v-if="lg==='fr'">
<button v-if="show" @click="show=false;">Couvrir solution</button>
<button v-if="!show" @click="show=true;">Montre-moi la solution</button>
<slot v-if="show"> </slot>
</div>
<div v-else>
<button v-if="show" @click="show=false;">Hide solution</button>
<button v-if="!show" @click="show=true;">Show solution</button>
<slot v-if="show"> </slot>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Versteckt eine Lösung, bis der Schüler sie sehen will
defineProps<{ lg?: string }>();
const show = ref(false);
</script>
