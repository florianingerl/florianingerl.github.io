<script setup lang="ts">
// Eigene Seite fuer die E-Mail-Verifizierung ("/verify-email"). Sie wird ueber
// den Link in der Registrierungs-E-Mail geoeffnet. Die E-Mail-Adresse steckt in
// "?email=..."; der Benutzer tippt den Einmal-Code aus der E-Mail ein.
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { fehlerText, resendVerifizierung, verifiziereEmail } from "@/api";

const { t } = useI18n();
const route = useRoute();

const email = ref("");
const code = ref("");
const laeuft = ref(false);
const erledigt = ref(false);
const meldung = ref("");
const fehlerMeldung = ref("");
const hinweis = ref("");

onMounted(() => {
  const wert = route.query.email;
  email.value = typeof wert === "string" ? wert : "";
});

const emailVorhanden = computed(() => email.value.trim().length > 0);

async function bestaetigen(): Promise<void> {
  if (!emailVorhanden.value || !code.value.trim() || laeuft.value) return;
  laeuft.value = true;
  fehlerMeldung.value = "";
  meldung.value = "";
  try {
    const antwort = await verifiziereEmail({
      email: email.value.trim(),
      code: code.value.trim(),
    });
    meldung.value = antwort.message;
    erledigt.value = true;
  } catch (e) {
    fehlerMeldung.value = fehlerText(e, t("verifyEmail.verifyError"));
  } finally {
    laeuft.value = false;
  }
}

async function neuenCodeSenden(): Promise<void> {
  if (!emailVorhanden.value || laeuft.value) return;
  laeuft.value = true;
  fehlerMeldung.value = "";
  hinweis.value = "";
  try {
    const antwort = await resendVerifizierung({ email: email.value.trim() });
    hinweis.value = antwort.message;
  } catch (e) {
    fehlerMeldung.value = fehlerText(e, t("verifyEmail.resendError"));
  } finally {
    laeuft.value = false;
  }
}
</script>

<template>
  <main class="verify d-flex justify-content-center">
    <form class="verify__card" @submit.prevent="bestaetigen">
      <h1 class="verify__title">{{ t("verifyEmail.title") }}</h1>

      <p v-if="!emailVorhanden" class="verify__fehler">
        {{ t("verifyEmail.noEmail") }}
      </p>

      <template v-else>
        <p class="verify__text">
          {{ t("verifyEmail.sentTo") }} <strong>{{ email }}</strong>
        </p>

        <p v-if="erledigt" class="verify__erfolg">{{ meldung }}</p>
        <p v-else-if="fehlerMeldung" class="verify__fehler">
          {{ fehlerMeldung }}
        </p>

        <label class="verify__label" for="verify-code">
          {{ t("verifyEmail.codeLabel") }}
        </label>
        <input
          id="verify-code"
          v-model="code"
          class="verify__input"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="6"
          :placeholder="'000000'"
        />
        <p class="verify__hinweis">{{ t("verifyEmail.codeHelp") }}</p>

        <button class="verify__button" type="submit" :disabled="laeuft">
          {{ t("verifyEmail.verifyButton") }}
        </button>

        <button
          class="verify__resend"
          type="button"
          :disabled="laeuft"
          @click="neuenCodeSenden"
        >
          {{ t("verifyEmail.resendButton") }}
        </button>

        <p v-if="hinweis" class="verify__erfolg">{{ hinweis }}</p>
      </template>
    </form>
  </main>
</template>

<style scoped>
.verify {
  min-height: 60vh;
  padding: 3rem 1rem;
}

.verify__card {
  width: 100%;
  max-width: 460px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.verify__title {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
}

.verify__text,
.verify__hinweis {
  color: #555;
  font-size: 0.95rem;
  margin: 0;
}

.verify__label {
  margin-top: 0.5rem;
  font-weight: 600;
}

.verify__input {
  padding: 12px 14px;
  font-size: 1.3rem;
  letter-spacing: 0.3rem;
  text-align: center;
  border: 2px solid #d0d0d0;
  border-radius: 8px;
}

.verify__input:focus {
  outline: none;
  border-color: #5fcf80;
}

.verify__button {
  margin-top: 0.75rem;
  background: #5fcf80;
  color: #fff;
  border: 2px solid #5fcf80;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
  width: 100%;
}

.verify__button:hover:not(:disabled) {
  background: #3ac162;
  border-color: #3ac162;
}

.verify__button:disabled,
.verify__resend:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.verify__resend {
  background: none;
  border: none;
  color: #5fcf80;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem;
}

.verify__erfolg {
  color: #1d7a3c;
  background: #e6f7ec;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  margin: 0;
}

.verify__fehler {
  color: #a4262c;
  background: #fdecec;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  margin: 0;
}
</style>
