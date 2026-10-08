<template>
  <VueSection id="franzoesisch" titel="Französisch">
    <div class="row">
      <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <VueQuiz quiz="french" lg="de" />
      </div>
      <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>
          Tu ne comprends rien? Pas de panique. Französisch braucht vor allem Übung beim Sprechen,
          und genau dafür ist die Nachhilfe da.
        </p>
        <p>
          Wir lesen kurze Texte, sprechen über den Alltag und üben nebenbei die Grammatik, die
          gerade in der Schule dran ist: passé composé, Pronomen, Verneinung und mehr.
        </p>
        <p>Das Quiz nebenan kannst du jederzeit ausprobieren.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
