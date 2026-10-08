<script setup>
import { ref, computed } from 'vue'

const isValid = ref(true)

const inputStyle = computed(() => ({
  color: isValid.value ? 'green' : 'red'
}))
</script>

<template>
  <input v-model="text" :style="inputStyle" />

  <button @click="isValid = !isValid">
    Toggle color
  </button>
</template>
