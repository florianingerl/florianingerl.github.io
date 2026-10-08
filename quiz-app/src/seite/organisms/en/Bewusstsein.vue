<template>
  <VueSection id="bewusstsein" titel="Consciousness">
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="conciousness">
          <VueQuiz quiz="consciousness" lg="en" />
        </div>
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>Consciousness should be a major in school, but it's
          not. In the quiz on the right, there are some questions about this
          topic.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
