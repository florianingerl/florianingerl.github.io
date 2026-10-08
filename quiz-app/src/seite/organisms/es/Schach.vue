<template>
  <VueSection id="schach" titel="Ajedrez">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <VueChessPuzzle lg="de" />
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>El ajedrez es bueno para la capacidad de imaginación.
          Los problemas de la derecha datan de una época en la que todavía enseñaba ajedrez en la escuela primaria.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueChessPuzzle from "../../atoms/VueChessPuzzle.vue";
</script>
