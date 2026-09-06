<template>
  <div class="d-flex flex-row">
    <img v-if="imageUrl" :src="imageUrl" @click="imageClicked" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ imageUrl?: string }>();

function imageClicked(): void {
  const fullPage = document.getElementById("fullpage");
  if (!fullPage || !props.imageUrl) return;
  fullPage.style.backgroundImage = `url(${props.imageUrl})`;
  fullPage.style.display = "block";
}
</script>

<style scoped>
img {
  height: 200px;
}
</style>
