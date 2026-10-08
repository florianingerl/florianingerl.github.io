<template>
  <VueSection id="bewusstsein" titel="Conscience">
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="conciousness">
          <VueQuiz quiz="consciousness" lg="fr" />
        </div>
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>La conscience devrait être une majeure à l'école mais elle ne l'est pas. </p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
