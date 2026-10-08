<template>
  <VueSection id="ernaehrung" titel="Nourriture">
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <div id="nutritionquiz">

          <VueQuiz quiz="nutrition" lg="fr" />
          </div>
      </div>
      <div class="col-lg-3 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p>Mes élèves tombent souvent et soudainement malades, dans la plupart des cas 5 minutes
          avant un cours particulier. Donc, il y a un petit quiz à droite pour la nourriture saine.
        </p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
