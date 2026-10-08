<template>
  <section id="contact" class="contact">
    <div data-aos="fade-up">
      <iframe
        v-if="kontakt.karte"
        :src="kontakt.karte"
        class="w-full border-0"
        :style="{ height: kontakt.karteHoehe }"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>

    <div :id="kontakt.containerId" class="container" data-aos="fade-up">
      <div class="row mt-5">
        <div class="col-lg-4">
          <div class="info">
            <div class="address">
              <i class="bi bi-geo-alt"></i>
              <h4>{{ t("kontakt.adresse") }}</h4>
              <p>{{ kontakt.strasse }}</p>
              <p>{{ kontakt.ort }}</p>
            </div>

            <div class="email">
              <i class="bi bi-envelope"></i>
              <h4>{{ t("kontakt.email") }}</h4>
              <p>
                <a :href="'mailto:' + kontakt.mailadresse">{{ kontakt.mailadresse }}</a>
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-8 mt-5 mt-lg-0">
          <p>{{ t("kontakt.absatz") }}</p>

          <!-- Das Formular geht an einen Formulardienst, der es als E-Mail weiterleitet. -->
          <form name="myForm" :action="formular.action" method="post" role="form" class="php-email-form" @submit="pruefe">
            <input v-if="formular.accessKey" type="hidden" name="access_key" :value="formular.accessKey">

            <div class="row">
              <div class="col-md-6 form-group">
                <input type="text" name="name" class="form-control" id="name" :placeholder="t('formular.name')" required>
              </div>
              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input type="email" class="form-control" name="email" id="email" :placeholder="t('formular.mail')" required>
              </div>
            </div>

            <div v-if="te('formular.betreff')" class="form-group mt-3">
              <input type="text" class="form-control" name="subject" id="subject" :placeholder="t('formular.betreff')" required>
            </div>

            <div class="form-group mt-3">
              <textarea class="form-control" name="message" rows="5" :placeholder="t('formular.nachricht')" required></textarea>
            </div>

            <div v-if="te('formular.gesendet')" class="my-3">
              <div class="loading">Lädt</div>
              <div class="error-message"></div>
              <div class="sent-message">{{ t("formular.gesendet") }}</div>
            </div>

            <div v-if="te('formular.roboter.frage')">
              <p>{{ t("formular.roboter.hinweis") }}</p>
              <p>{{ t("formular.roboter.frage") }} <input v-model="antwort" type="text" name="fname"></p>
            </div>

            <input v-if="formular.weiterleitung" type="hidden" name="redirect" :value="formular.weiterleitung">
            <input v-if="formular.botcheck" type="checkbox" name="botcheck" class="hidden">

            <div class="text-center">
              <button type="submit">{{ t("formular.knopf") }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Kontakt } from "../sprachen";

const props = defineProps<{ kontakt: Kontakt }>();
const formular = computed(() => props.kontakt.formular);
// t holt den Text, te sagt, ob es ihn in dieser Sprache überhaupt gibt
const { t, te } = useI18n();
// Antwort auf die Rechenfrage gegen Roboter
const antwort = ref("");

// Nur abschicken, wenn die Rechenfrage (falls es eine gibt) richtig beantwortet ist.
function pruefe(ereignis: Event): void {
  if (!te("formular.roboter.frage") || antwort.value === t("formular.roboter.antwort")) return;
  alert(t("formular.roboter.fehler"));
  ereignis.preventDefault();
}
</script>
