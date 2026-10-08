<template>
  <VueSection id="bewusstsein" titel="Bewusstsein">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="conciousness">
          <VueQuiz quiz="consciousness" lg="de" />
        </div>
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Aus meinen paar halbwegs bewussten Gedanken in 30-Jahren-Überleben habe ich rechts ein Quiz zum Thema erstellt.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
