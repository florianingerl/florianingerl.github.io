<template>
  <PaypalButton
    v-if="preis"
    :betrag="preis.betrag"
    :text="preis.text"
    :knopf-text="preis.knopfText"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import PaypalButton from "./vue-paypal-button.vue";
import { PREISE } from "./preise.ts";
const props = defineProps<{ sprache: string }>();
const preis = computed(() => PREISE[props.sprache]);
</script>
