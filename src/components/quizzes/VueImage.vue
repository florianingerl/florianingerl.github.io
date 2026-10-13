<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column align-items-start">
      <img
        v-if="imageUrl"
        class="vue-image__img"
        :src="imageUrl"
        @click="imageClicked"
      />
      <!-- Direkt unter dem Bild: z.B. die Paginierung zum Blaettern. -->
      <slot name="pagination"></slot>
    </div>
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
