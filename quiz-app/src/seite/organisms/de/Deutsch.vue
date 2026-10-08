<template>
  <VueSection id="deutsch" titel="Deutsch (als Fremdsprache)">
    <template #untertitel>
      <p style="font-size: 15px;">Price for a class in German 10euro/60min (cheaper than on Preply)</p>
    </template>

    <div class="row">
      <div class="col-lg-6 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
           <div id="deutsch-quiz">

          <VueQuiz quiz="deutsch" lg="de" />
        </div>
        <!-- <img src="assets/img/deutsch.png" class="img-fluid" alt=""> -->
      </div>
      <div class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Willst du mehr Kreativität entwickeln durch das Schreiben kleiner Geschichten auf Deutsch? Oder willst du flüssigere Konversationen führen können?
           Dann kann ich dir als deutscher Muttersprachler, Autor vieler Kurzgeschichten (publiziert auf dieser Website) und langjähriger Nachhilfelehrer von vielen
           deutsch-, französisch-, englisch- und spanisch-sprachigen Schülern und Studenten optimal helfen.
        </p>
        <p>In einer Nachhilfestunde können wir machen: Grammatik, Geschichten schreiben/Textproduktion (<a href="https://florianingerl.github.io/uebung.html#/de/deutsch/kurzgeschichten/vogelundeichhoernchen">1</a>, <a href="https://florianingerl.github.io/uebung.html#/de/deutsch/kurzgeschichten/vogelmarcia">2</a>, <a href="https://florianingerl.github.io/uebung.html#/de/deutsch/kurzgeschichten/katzemagfisch">3</a>, <a href="Pdfs/Deutsch/Nachhilfe Vanessa 15.4.2024 Geschichte über Löwen.pdf">4</a>, <a href="Pdfs/Deutsch/Nachhilfe Vanessa 13.5.2024 Katzengeschichte.pdf">5</a>, <a href="Pdfs/Deutsch/Geschichtenschreiben mit Vanessa 22.4.2024.pdf">6</a>, <a href="Pdfs/Deutsch/Nachhilfe Vanessa 29.4.2024 Indianergeschichte.pdf">7</a>, <a href="Pdfs/Deutsch/Geschichte mit Philip 15.4.2025.pdf">8</a>), Konversation (<a href="Pdfs/Deutsch/Konversation/Beziehung im Fluss.txt">8</a>, <a href="Pdfs/Deutsch/Konversation/Fragen.txt">9</a>, <a href="Pdfs/Deutsch/Konversation/VierOhrenModell.txt">10</a>)</p>
        <p>Hier noch meine Tests auf <a href="https://www.allemandfacile.com/cgi2/myexam/mestests.php?qui=flori10&amp;quoi=9997&amp;popu=1">allemandfacile.com</a></p>
        <p>Hier der Link zu meinen Kurzgeschichten und Grammatikübungen: <a href="https://florianingerl.github.io/uebung.html#/de/deutsch/kurzgeschichten/vogelundeichhoernchen">Kurzgeschichten und Übungen für Deutsch</a></p>

        <p>In einer Probestunde Deutsch können wir z.B. Grammatik-Übungen machen. Für den Naturwischenschaftler sind z.B. Relativsätze, Präpositionen,etc... wichtige Themen</p>
        <VuePaypal sprache="deutsch" />
      </div>

    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
import VuePaypal from "../../../components/molecules/vue-paypal.vue";
</script>
