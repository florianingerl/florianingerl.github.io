<template>
  <VueSection id="spanisch" titel="Spanisch">
    <div class="row">

        <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
          <!-- <img src="assets/img/espagnol.png" class="img-fluid" alt=""> -->
           <div id="ser-estar-quiz">

            <VueQuiz quiz="espagnol" lg="de" />
          </div>
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
          <p>¿No sabes hablar ni escribir español? Puedo ayudarte.</p>

          <p>Aquí están mis pruebas sobre <a href="https://www.espagnolfacile.com/cgi2/myexam/mestests.php?qui=flori10&amp;quoi=9998&amp;popu=1">espagnolfacile.com</a></p>

          <p></p><p>In einer Probestunde Spanisch können wir z.B. Anfänger-Grammatik-Übungen machen. Für den Naturwischenschaftler sind z.B. Relativsätze, Präpositionen,etc... wichtige Themen</p><p></p>

          <VuePaypal sprache="espagnol" />
        </div>

    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
import VuePaypal from "../../../components/molecules/vue-paypal.vue";
</script>
