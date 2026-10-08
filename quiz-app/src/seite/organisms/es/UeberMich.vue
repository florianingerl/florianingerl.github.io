<template>
  <VueSection id="uebermich" titel="Acerca de mí">
    <div class="row">
      <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
        <img src="assets/img/me3.jpg" class="img-fluid" alt="">
      </div>

      <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <ul style="list-style-type: disc;">
          <li>Máster en matemáticas y ciencias de la computación en la  Universidad LMU de Múnich con honores</li>
          <li>1er Exámen de estado de docencia y matemáticas en bachillerato.</li>
          <li>&gt;5 años de tutoría de numerosas matemáticas y física en la Universidad LMU de Múnich</li>
          <li>Diploma de bachillerato en inglés y francés.</li>
          <li>6 meses de experiencia en el instituto de Gröbenzell y Olching de Matemáticas y Física</li>
          <li>Tutor a tiempo completo desde Octubre del 2020</li>
          <li>1 año de experiencia profesional como Desarrollador de Software</li>
          <li>Formación de profesor de yoga en Sivananda Yoga en 2018</li>

        </ul>

      </div>
    </div>

    <div class="row" style="margin-top:10px;">
      <div class="col-lg-2 order-1 order-lg-1" data-aos="fade-right" data-aos-delay="100">
        <img src="assets/img/yoga/kopfstand2.jpg" class="img-fluid" alt="">
      </div>
      <div class="col-lg-10 pt-4 pt-lg-0 order-2 order-lg-2 content">
        <p>Nací en 1993, hijo de un ingeniero eléctrico y una nutricionista.
           Mi abuelo también influyó profundamente, pues vivía a partir de verduras de su huerto y a partir de dientes
           de león para poder sustentar el estudio de sus nietos.<br>
           Aprendí mucho también de mis tíos, quienes, como profesores de historia y lengua,
           siempre tenían un montón de historias divertidas que contar.<br>
           Me interesa todo lo relacionado con las matemáticas, la ciencia, la tecnología, los idiomas y la psicología,
           esta última para el deleite de mi psiquiatra,
           que se gana la vida escuchándome.<br>
           Para mantener la mente siempre fresca y preparada para aprender cosas nuevas e interesantes,
           doy muchos paseos por el bosque, practico yoga y deporte, te lo recomiendo también,
           sobre todo antes de un examen.
        </p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
