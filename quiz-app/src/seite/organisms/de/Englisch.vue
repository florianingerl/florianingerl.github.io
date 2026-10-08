<template>
  <VueSection id="englisch" titel="Englisch">
    <div class="row">
      <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
      <!-- <img src="assets/img/FlyerConditionalSentences.jpg" class="img-fluid" alt=""> -->
       <div id="english-quiz">
        <VueQuiz quiz="english" lg="de" />
       </div>
          </div>

      <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>You've got the nose full of English? Sag das nicht! Sag
          wenn schon "I'm fed up with English" und komm zum Üben in die
          Nachhilfe.</p>
        <p>In a private lesson we could practice: Grammar (<a href="Pdfs/English/Grammar/CreateOwnTestOnFrancaisFacileExercise.txt">1</a>,<a href="Pdfs/English/Grammar/Tuition Anna 30.5.2024 Grammar Had better or should.pdf">2</a>), text
          production (<a href="Pdfs/English/Love story lions Tuition Anna 12.4.2024.pdf">1</a>,<a href="Pdfs/English/Tuition English Anna 5.4.2024.pdf">2</a>, <a href="Pdfs/English/Tuition Anna 26.4.2024 Turtoises.pdf">3</a>, <a href="Pdfs/English/Nachhilfe Anna 17.5.2024 Detective story cat.pdf">4</a>), conversation (<a href="Pdfs/English/Konversation/BeziehungImFluss.txt">1</a>, <a href="Pdfs/English/Konversation/Questions.txt">2</a>, <a href="Pdfs/English/Konversation/FourEarsExercise.txt">3</a>) and more...</p>

        <p>Here are my tests on <a href="https://www.anglaisfacile.com/cgi2/myexam/mestests.php?qui=flori10&amp;quoi=0001&amp;popu=1">anglaisfacile.com</a></p>
        <p>Here are my short stories and grammar exercises: <a href="https://florianingerl.github.io/uebung.html#/en/english/shortstories/laraandherbird">My short stories and grammar exercises</a></p>

        <p></p><p>In einer Probestunde Englisch können wir z.B. Anfänger-Grammatik-Übungen machen. Für den Naturwischenschaftler sind z.B. Relativsätze, Präpositionen,etc... wichtige Themen</p><p></p>

        <VuePaypal sprache="english" />

      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
import VuePaypal from "../../../components/molecules/vue-paypal.vue";
</script>
