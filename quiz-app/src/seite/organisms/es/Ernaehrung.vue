<template>
  <VueSection id="ernaehrung" titel="Nutrición">
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="nutritionquiz">

          <VueQuiz quiz="nutrition" lg="fr" />
          </div>
      </div>
      <div class="col-lg-3 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>Mis alumnos a menudo se enferman de repente, generalmente 5 minutos antes de una lección privada.
           A la derecha hay un pequeño cuestionario sobre alimentación saludable.
        </p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
