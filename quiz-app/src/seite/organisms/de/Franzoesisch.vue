<template>
  <VueSection id="franzoesisch" titel="Französisch">
    <div class="row">
      <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <!-- <img src="assets/img/franzoesisch.png" class="img-fluid" alt="" -->
          <div id="francais-quiz">

          <VueQuiz quiz="french" lg="de" />
        </div>
      </div>
      <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Tu ne peux rien dire en français à part que "Bonjour"? Je
          peux t'aider! Das soll heißen: Ich kann dir helfen, wenn du auf
          Französisch nichts anderes außer "Bonjour" sagen kannst.</p>

        <p>Dans un cours particulier, on pourrait faire: Grammaire (<a href="Pdfs/Französisch/Grammaire/Cours de soutien Marie 27.8.2024 Dont Duquel.pdf">1</a>, <a href="Pdfs/Französisch/Nachhilfe Französisch Viola 23.4.2023.pdf">2</a>,<a href="Pdfs/Französisch/DirekteUndIndirektePronomenUndEn.pdf">3</a>),
          production écrite (<a href="Pdfs/Französisch/Cours de soutien Marie 3.4.2024 Lion.pdf">1</a>, <a href="Pdfs/Französisch/Cours de soutien Marie 17.04.2024 - Kopie.pdf">2</a>, <a href="Pdfs/Französisch/Cours de soutien Marie 30.4.2024 Indianer.pdf">3</a>. <a href="Pdfs/Französisch/Cours de soutien Marie chat 14.5.2024.pdf">4</a>), compréhension orale, compréhension d'un texte
          ou conversation (<a href="Pdfs/Französisch/Konversation/JeuDeConversationBeziehungImFluss.txt">1</a>, <a href="Pdfs/Französisch/Konversation/JeuDeConversationQuestions.txt">2</a>, <a href="Pdfs/Französisch/Konversation/JeuDeConversationQuareOreilles.txt">3</a>, <a href="Pdfs/Französisch/Konversation/JeuDeKonversationPereOuMere.txt">4</a>, <a href="Pdfs/Französisch/Konversation/JeuDeConversationObservateurALInterieur.txt">5</a>).</p>
        <p>Voir aussi mes tests sur <a href="https://www.francaisfacile.com/cgi2/myexam/mestests.php?qui=flori10&amp;quoi=0002&amp;popu=1">FrancaisFacile.com</a></p>
        <p>Et voilà le lien pour mon profil sur <a href="https://www.superprof.de/nachhilfe-franzosisch-von-einem-mathenachhilfelehrer-der-auch-vielen-franzosischen-studenten-nachhilfe-gibt.html">Superprof</a></p>
        <p>Et le lien pour mes brèves histoires et mes exercices de grammaire: <a href="https://florianingerl.github.io/uebung.html#/fr/french/breveshistoires/deuxgamins">Mes brèves histoires et exercices de grammaire</a></p>
        <p><a href="https://www.youtube.com/watch?v=ba8V3UVpw9Q">Link zu meinen YouTube-Videos zum Französisch-Lernen</a></p>

        <p>In einer Probestunde Französisch können wir z.B. Anfänger-Grammatik-Übungen machen. Für den Naturwischenschaftler sind z.B. Relativsätze, Präpositionen,etc... wichtige Themen</p>
        <VuePaypal sprache="french" />

      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
import VuePaypal from "../../../components/molecules/vue-paypal.vue";
</script>
