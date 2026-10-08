<template>
  <VueSection id="bewusstsein" titel="Consciencia">
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="conciousness">
          <VueQuiz quiz="consciousness" lg="fr" />
        </div>
      </div>
      <div class="col-lg-4 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>La consciencia debería ser una asignatura principal en la escuela pero no lo es.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
