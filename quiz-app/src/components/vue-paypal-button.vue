<template>
  <div class="paypal-box">
    <p class="paypal-text">{{ text }}</p>
    <a
      class="btn btn-warning"
      :href="zahlungsLink"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ knopfText }}</a
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  betrag?: number;
  text?: string;
  knopfText?: string;
}>();

// Paypal Name
const PAYPAL_NAME = "HIER_KOMMT_DER_PAYPAL_NAME_REIN";

const zahlungsLink = computed(() => {
  const basis = `https://paypal.me/${PAYPAL_NAME}`;
  return props.betrag ? `${basis}/${props.betrag}EUR` : basis;
});
</script>

<style scoped>
.paypal-box {
  border: 2px solid #ffc439;
  border-radius: 5px;
  background-color: #fffaf0;
  padding: 12px 16px;
  margin: 20px 10px;
  max-width: 30em;
}

.paypal-text {
  margin-bottom: 8px;
}
</style>
