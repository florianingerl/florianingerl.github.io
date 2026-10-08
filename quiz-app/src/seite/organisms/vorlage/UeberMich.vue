<template>
  <VueSection id="uebermich" titel="Über mich">
    <div class="row">
      <div class="col-lg-4" data-aos="fade-right" data-aos-delay="100">
        <img src="assets/img/vorlage/lena.svg" class="img-fluid" alt="Lena Muster">
      </div>
      <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
        <p>
          Ich habe Mathematik und Französisch auf Lehramt studiert und unterrichte seit zehn Jahren
          am Gymnasium. Nachhilfe gebe ich, weil ich dort Zeit für die eine Frage habe, die im
          Unterricht untergeht.
        </p>
        <p>
          Wenn ich nicht unterrichte, bin ich in den Bergen oder lese französische Krimis.
        </p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
