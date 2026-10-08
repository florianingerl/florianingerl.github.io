<template>
  <VueSection id="italienisch" titel="Italienisch">
    <div class="row">
        <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
             <div id="italiano-quiz">

            <VueQuiz quiz="italiano" lg="de" />
          </div>
          <!-- <img src="assets/img/italienisch/testsurlafamille.png" class="img-fluid" alt=""> -->
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
          <p>Non sai parlare italiano ? Posso aiutarti.</p>

          <p>Ecco i miei esercizi di grammatica da <a href="https://www.italien-facile.com/cgi2/myexam/mestests.php?qui=flori10&amp;quoi=9995&amp;popu=1">Italien-facile.com</a></p>

          <p>In einer Probestunde Italienisch können wir z.B. Anfänger-Grammatik-Übungen machen. Für den Naturwischenschaftler sind z.B. Relativsätze, Präpositionen,etc... wichtige Themen</p>

          <VuePaypal sprache="italiano" />
        </div>

    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
import VuePaypal from "../../../components/molecules/vue-paypal.vue";
</script>
