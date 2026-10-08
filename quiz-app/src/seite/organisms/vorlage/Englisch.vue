<template>
  <VueSection id="englisch" titel="Englisch">
    <div class="row">
      <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <!-- Das Quiz holt seine Aufgaben vom Backend, hier zur Probe die englischen Aufgaben -->
        <VueQuiz quiz="english" lg="de" />
      </div>
      <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>
          Vokabeln, Zeiten, if-Sätze: Im Englischunterricht geht es oft schnell, und wer einmal
          den Anschluss verliert, kommt schwer wieder hinein. Wir üben in kleinen Schritten,
          bis du dich sicher fühlst.
        </p>
        <p>
          Probier gleich das Quiz nebenan aus. Es zeigt dir, wo du stehst, und wir fangen
          genau dort an.
        </p>
        <p>Mögliche Inhalte: Grammatik, Textverständnis, Aufsätze, mündliche Prüfung.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
