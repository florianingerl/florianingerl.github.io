<template>
  <VueSection id="ernaehrung" titel="Länger Lernen mit Sprossen">
    <div class="row">
      <div class="col-lg-8 order-2 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <!-- <div id="rohkost"></div> -->
        <div id="nutritionquiz">

          <VueQuiz quiz="nutrition" lg="de" />
          </div>
            <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/NaIzFGJDX5M?si=lsSFKXtUcneJY_EA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
      </div>
      <div class="col-lg-3 pt-4 pt-lg-0 order-1 order-lg-1 content">
        <p>Mit einer gesunden Ernährung mit frischen Sprossen wird alles interessant und motivierend.
          </p>

          <p>
            In einer Probestunde "Länger lernen mit Sprossen" lösen wir zusammen das Quiz,
            das ich zusammen mit dem Gesundheitsberater <a href="https://www.normennauber.de/">Normen Nauber</a> erstellt habe.
          </p>

      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
import VueQuiz from "../../../components/molecules/VueQuiz.vue";
</script>
