<template>
  <VueSection id="lernenundlehren" titel="Lernen und Lehren">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <!-- <div id="rohkost"></div> -->
        <div id="lernenlehren">

          <VueQuiz quiz="lernenlehren" lg="de" />
          </div>
      </div>
      <div class="col-lg-3 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Wie lernt man am besten eine Fremdsprache, ein MINT-Fach oder das Zurechtkommen im Leben?
          Antwort: Am besten immer mit der Motivation, dein Gelerntes anderen auch beizubringen.
          Das Quiz rechts gibt Tipps dazu.
        </p>

      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
