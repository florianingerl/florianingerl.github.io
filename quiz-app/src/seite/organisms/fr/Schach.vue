<template>
  <VueSection id="schach" titel="Échec">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <VueChessPuzzle lg="fr" />
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>L'échec est bon pour la capacité d'imagination. Les problèmes à droite datent d'une époque
          pendant laquelle je
          donnais encore des cours d'échecs à l'école primaire.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueChessPuzzle from "../../atoms/VueChessPuzzle.vue";
</script>
