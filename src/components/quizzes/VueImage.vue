<template>
  <div class="vue-image">
    <img
      v-if="imageUrl"
      class="vue-image__img"
      :src="imageUrl"
      @click="imageClicked"
    />
    <!-- Direkt neben dem Bild: die Frage/Anweisung und die Antworten. -->
    <div class="vue-image__inhalt">
      <slot></slot>
    </div>
    <!-- Direkt unter dem Bild: z.B. die Paginierung zum Blaettern. -->
    <div class="vue-image__fuss">
      <slot name="pagination"></slot>
    </div>
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
/* Das Bild steht links, der Inhalt (Frage/Anweisung und Antworten) direkt
   daneben rechts. Die Paginierung bekommt eine eigene Zeile direkt unter dem
   Bild; ihre Breite schiebt den Inhalt nicht mehr vom Bild weg. */
.vue-image {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
}

.vue-image__img {
  grid-column: 1;
  grid-row: 1;
  height: 200px;
}

.vue-image__inhalt {
  grid-column: 2;
  grid-row: 1;
}

.vue-image__fuss {
  grid-column: 1 / -1;
  grid-row: 2;
}

/* Ohne Paginierung (z.B. im Editor) entfaellt die zweite Zeile. */
.vue-image__fuss:empty {
  display: none;
}
</style>
