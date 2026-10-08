<template>
  <VueSection id="preise" titel="Preise und Termine">
    <div class="row">
      <div class="col-lg-6 content" data-aos="fade-right" data-aos-delay="100">
        <ul>
          <li>Einzelstunde (60 Minuten): 35 Euro</li>
          <li>Doppelstunde (120 Minuten): 65 Euro</li>
          <li>Probestunde (30 Minuten): kostenlos</li>
        </ul>
        <p>Bezahlt wird nach der Stunde per Überweisung oder bar.</p>
      </div>
      <div class="col-lg-6 content" data-aos="fade-left" data-aos-delay="100">
        <p>
          Termine gibt es unter der Woche ab 15 Uhr und samstags vormittags. Online treffen wir
          uns per Videokonferenz mit gemeinsamem Whiteboard, du brauchst nur einen Laptop mit Kamera.
        </p>
        <p>Absagen sind bis 24 Stunden vor dem Termin kostenlos.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
