<template>
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 footer-contact">
            <template v-if="fuss.telefon"><strong>{{ fuss.telefon }}</strong>{{ fuss.telefonnummer }}<br></template> <strong>Email:</strong><a :href="'mailto:' + fuss.mailadresse">{{ fuss.mailadresse }}</a><br>
          </div>
        </div>
      </div>
    </div>

    <!-- Die fremdsprachigen Seiten zeigen noch die Symbole aus der Vorlage, Links führen nirgendwohin -->
    <div v-if="fuss.sozial" class="container d-md-flex py-4">
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a> <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a> <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a> <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a> <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Fusszeile } from "./sprachen";

defineProps<{ fuss: Fusszeile }>();
</script>
