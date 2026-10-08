<template>
  <VueSection id="infoschule" titel="Informatik">
    <div class="row">
      <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <img src="assets/img/infoschule.jpg" class="img-fluid" alt="">
      </div>
      <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>Ein Computer kann zwar nichts fühlen und nicht selber
          denken, aber er kann zum Beispiel sehr schnell etwas sortieren.
          Deswegen ist es im Leben ganz nützlich zu wissen, wie man einen
          Algorithmus programmiert und dass die Computermaus nicht beißt.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
