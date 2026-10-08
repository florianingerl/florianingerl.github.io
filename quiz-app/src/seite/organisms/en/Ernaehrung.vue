<template>
  <VueSection id="ernaehrung" titel="Nutrition">
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="nutritionquiz">

          <VueQuiz quiz="nutrition" lg="en" />
          </div>
      </div>
      <div class="col-lg-3 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>Sometimes my pupils get suddenly ill 5 minutes before a scheduled tutoring session. That's why there is a
          quiz about proper nutrition on the right.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
