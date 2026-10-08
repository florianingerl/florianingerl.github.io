<template>
  <VueSection id="schach" titel="Schach">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <VueChessPuzzle lg="de" />
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Schach ist gut für räumliches Vorstellungsvermögen. Die Aufgaben rechts stammen aus einer
          Zeit, als ich noch Schachunterricht an der Grundschule gegeben habe.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueChessPuzzle from "../../atoms/VueChessPuzzle.vue";
</script>
