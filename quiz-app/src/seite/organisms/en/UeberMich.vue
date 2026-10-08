<template>
  <VueSection id="uebermich" titel="About me">
    <div class="row">
      <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <img src="assets/img/me3.jpg" class="img-fluid" alt="">
      </div>

      <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <ul style="list-style-type: disc;">
          <li>Mathematics and Computer Science Master at LMU University in
            Munich with top marks</li>
          <li>1st State Examination for teaching Physics and Mathematics in High School</li>
          <li>&gt;5 years tutor of many Mathematics and Physics lectures at LMU University in Munich</li>
          <!-- 5-year experience as a Mathematics and Physics tutor at LMU University in Munich -->
          <li>High School diploma in English and French</li>
          <li>6-month experience as a teacher in the High School of Gröbenzell and Olching for Mathematics and Physics
          </li>
          <li>Since October 2020 full-time tutor for students</li>
          <li>1-year professional experience as a Software Developer</li>
          <li>Yoga teacher training at Sivananda Yoga in 2018</li>
        </ul>

      </div>
    </div>

    <div class="row" style="margin-top:10px;">
      <div class="col-lg-2 order-1 order-lg-1" data-aos="fade-right" data-aos-delay="100">
        <img src="assets/img/yoga/kopfstand2.jpg" class="img-fluid" alt="">
      </div>
      <div class="col-lg-10 pt-4 pt-lg-0 order-2 order-lg-2 content">
        <p>I was born in 1993 as the son of an electrical engineer and a nutritionist. I was also deeply
          influenced by my grandfather, who partially lived on home-grown vegetables and partially on dandelions in order to be able to pass on more money to his grandchildren for their
          studies.<br>
          I also learned a lot from my aunt and uncle, who - because they were history and language
          teachers - always had a lot of entertaining stories to tell.<br>
          I, myself, am interested in everything to do with Maths, Science, Technology, Language and
          Psychology, the latter much to the delight of my psychiatrist who makes a fortune from
          listening to me.<br>
          To ensure that the mind is always fresh and ready to learn new, interesting things, I take a lot of walks in the forest and I do Yoga and sport and I recommend this to you as well, especially before an exam.
        </p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
