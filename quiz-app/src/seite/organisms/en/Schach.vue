<template>
  <VueSection id="schach" titel="Chess">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <VueChessPuzzle lg="en" />
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Chess is good for spatial awareness. The problems on the right are from a time when I was
          still giving chess lessons in elementary school.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueChessPuzzle from "../../atoms/VueChessPuzzle.vue";
</script>
