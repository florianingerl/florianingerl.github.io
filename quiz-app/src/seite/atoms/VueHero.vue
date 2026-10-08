<template>
  <section
    id="hero"
    class="d-flex justify-content-center align-items-center"
    :style="{ backgroundImage: `url('${bild}')`, backgroundPosition: 'top center' }"
  >
    <div class="container position-relative" data-aos="zoom-in" data-aos-delay="100"></div>
  </section>
</template>

<script setup lang="ts">
// Das große Bild oben, je Sprache ein anderes
defineProps<{ bild: string }>();
</script>
