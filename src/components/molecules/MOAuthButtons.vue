<!-- Sign in / sign up with Google or GitHub. The component only shows the
     providers that are configured on the backend. The actual OAuth flow runs
     on the backend, which redirects back to /oauth-callback. -->
<template>
  <div v-if="hasProvider" class="oauth-buttons">
    <div class="oauth-buttons__divider">
      <span>{{ t("oauth.or") }}</span>
    </div>

    <button
      v-if="providers?.google"
      type="button"
      class="btn btn-outline-secondary oauth-buttons__button"
      @click="start('google')"
    >
      <i class="bi bi-google me-2" aria-hidden="true"></i>
      {{ t("oauth.continueWithGoogle") }}
    </button>

    <button
      v-if="providers?.github"
      type="button"
      class="btn btn-outline-dark oauth-buttons__button"
      @click="start('github')"
    >
      <i class="bi bi-github me-2" aria-hidden="true"></i>
      {{ t("oauth.continueWithGitHub") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  getOAuthProviders,
  oauthStartUrl,
  type OAuthProvider,
  type OAuthProviderStatus,
} from "@/api";

const { t } = useI18n();
const providers = ref<OAuthProviderStatus | null>(null);

const hasProvider = computed(() =>
  Boolean(providers.value?.google || providers.value?.github)
);

onMounted(async () => {
  try {
    providers.value = await getOAuthProviders();
  } catch {
    // If the status can't be loaded, hide the buttons instead of sending the
    // user to a provider that might not be configured.
    providers.value = null;
  }
});

function start(provider: OAuthProvider): void {
  // Return to the current page after the OAuth round trip.
  window.location.assign(oauthStartUrl(provider, window.location.href));
}
</script>

<style scoped>
.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.oauth-buttons__button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1rem;
  font-weight: 600;
}

.oauth-buttons__divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.oauth-buttons__divider::before,
.oauth-buttons__divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #dee2e6;
}
</style>
