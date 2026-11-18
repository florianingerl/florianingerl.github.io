<script setup lang="ts">
// Landing page after an OAuth login ("/oauth-callback"). The backend redirects
// here with a JWT in "?token=..." and the page the user came from in
// "?returnTo=...". The token is stored like a normal login, then the user is
// sent back to the quiz they were on.
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { fehlerText } from "@/api";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { t } = useI18n();

const errorMessage = ref("");
const running = ref(true);

function queryValue(name: string): string {
  const value = route.query[name];
  return typeof value === "string" ? value : "";
}

onMounted(async () => {
  const error = queryValue("error");
  const token = queryValue("token");
  const returnTo = queryValue("returnTo");

  if (error || !token) {
    errorMessage.value = error || t("oauth.callbackError");
    running.value = false;
    return;
  }

  try {
    await auth.tokenUebernehmen(token);
    if (returnTo) {
      // Full reload, so the quiz picks up the stored token on startup.
      window.location.assign(returnTo);
      return;
    }
    await router.replace("/");
  } catch (e) {
    errorMessage.value = fehlerText(e, t("oauth.callbackFailed"));
    auth.abmelden();
  } finally {
    running.value = false;
  }
});
</script>

<template>
  <main class="oauth-callback d-flex justify-content-center">
    <div class="oauth-callback__card">
      <h1 class="oauth-callback__title">
        <span
          v-if="running"
          class="spinner-border spinner-border-sm me-2"
          aria-hidden="true"
        ></span>
        {{ running ? t("oauth.callbackTitle") : t("oauth.callbackError") }}
      </h1>

      <p v-if="errorMessage" class="oauth-callback__error">
        {{ errorMessage }}
      </p>

      <RouterLink v-if="!running" to="/" class="btn btn-primary">
        {{ t("verifyEmail.homeButton") }}
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.oauth-callback {
  min-height: 60vh;
  padding: 3rem 1rem;
}

.oauth-callback__card {
  width: 100%;
  max-width: 460px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
}

.oauth-callback__title {
  margin: 0;
  font-size: 1.3rem;
}

.oauth-callback__error {
  color: #a4262c;
  background: #fdecec;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  margin: 0;
}
</style>
