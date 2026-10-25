<!-- Profil- und Einstellungsdialog. Erscheint an der Stelle des Quiz, wenn der
     angemeldete Benutzer auf "Profile" klickt. -->
<template>
  <div class="auth-dialog">
    <div class="card auth-card border-0 shadow-lg">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <div class="auth-icon mx-auto mb-3">
            <i class="bi bi-person-gear"></i>
          </div>

          <h2 class="h4 fw-bold mb-2">Profile</h2>
          <p class="text-muted mb-0">Your account and your settings.</p>
        </div>

        <div v-if="istAdmin" class="alert alert-warning" role="alert">
          <i class="bi bi-exclamation-triangle me-2"></i>
          Admins are not allowed to edit their profile.
        </div>

        <form @submit.prevent="save" novalidate>
          <h3 class="h6 fw-bold mb-2">Personal data</h3>

          <div class="mb-3">
            <label for="profil-name" class="form-label fw-semibold">
              Name
            </label>

            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-person"></i>
              </span>

              <input
                id="profil-name"
                v-model.trim="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': !!fehler }"
                placeholder="Your name"
                autocomplete="name"
                :disabled="istAdmin"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="profil-email" class="form-label fw-semibold">
              Email address
            </label>

            <input
              id="profil-email"
              v-model.trim="email"
              type="email"
              class="form-control"
              autocomplete="email"
              :disabled="istAdmin"
            />

            <div class="form-text">
              Changing your email address will require re-verification.
            </div>
          </div>

          <h3 class="h6 fw-bold mt-4 mb-2">Settings for the quiz</h3>

          <div class="mb-3">
            <label class="form-label fw-semibold">Gap read mode</label>
            <div class="form-check">
              <input
                id="gap-read-gap"
                v-model="gapReadMode"
                class="form-check-input"
                type="radio"
                value="gap"
                :disabled="istAdmin"
              />
              <label class="form-check-label" for="gap-read-gap">
                Only gap
              </label>
            </div>
            <div class="form-check">
              <input
                id="gap-read-whole"
                v-model="gapReadMode"
                class="form-check-input"
                type="radio"
                value="whole"
                :disabled="istAdmin"
              />
              <label class="form-check-label" for="gap-read-whole">
                Whole sentences
              </label>
            </div>
          </div>

          <div v-if="fehler" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-circle me-2"></i>
            {{ fehler }}
          </div>

          <div v-if="successMessage" class="alert alert-success" role="alert">
            <i class="bi bi-check-circle me-2"></i>
            {{ successMessage }}
          </div>

          <div class="d-flex gap-2">
            <button
              type="submit"
              class="btn btn-primary flex-fill py-2 fw-semibold"
              :disabled="isSaving || !geaendert || istAdmin"
            >
              <span
                v-if="isSaving"
                class="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>

              {{ isSaving ? 'Saving...' : 'Save' }}
            </button>

            <button
              type="button"
              class="btn btn-outline-secondary py-2"
              :disabled="isSaving"
              @click="emit('cancel-clicked')"
            >
              Cancel
            </button>
          </div>

          <button
            type="button"
            class="btn btn-outline-danger w-100 mt-3"
            :disabled="isSaving"
            @click="emit('logout-clicked')"
          >
            <i class="bi bi-box-arrow-right me-2"></i>
            Log out
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { fehlerText } from "@/api";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  (e: "saved"): void
  (e: "cancel-clicked"): void
  (e: "logout-clicked"): void
}>()

const auth = useAuthStore()

const name = ref<string>(auth.user?.name ?? "");
const email = ref<string>(auth.user?.email ?? "");
const gapReadMode = ref<"gap" | "whole">(auth.user?.quizSettings?.gapReadMode ?? "gap");
const isSaving = ref<boolean>(false);
const fehler = ref<string>('');
const successMessage = ref<string>('');

// Nach dem Anmelden oder einem Speichern den angezeigten Namen angleichen.
watch(
  () => auth.user,
  (neu) => {
    name.value = neu?.name ?? "";
    email.value = neu?.email ?? "";
    gapReadMode.value = neu?.quizSettings?.gapReadMode ?? "gap";
  },
  { deep: true }
);

const istAdmin = computed(() => !!auth.user?.isAdmin);

const geaendert = computed(() => {
  if (istAdmin.value) return false;
  return (
    name.value !== (auth.user?.name ?? "") ||
    email.value !== (auth.user?.email ?? "") ||
    gapReadMode.value !== (auth.user?.quizSettings?.gapReadMode ?? "gap")
  );
});

async function save(): Promise<void> {
  if (istAdmin.value) {
    fehler.value = "Admins are not allowed to edit their profile.";
    return;
  }
  if (!name.value) {
    fehler.value = "Please enter your name.";
    return;
  }
  if (!email.value) {
    fehler.value = "Please enter your email address.";
    return;
  }
  if (!geaendert.value) return;

  isSaving.value = true;
  fehler.value = "";
  successMessage.value = "";

  try {
    await auth.profilSpeichern(name.value, email.value, { gapReadMode: gapReadMode.value });
    if (email.value !== (auth.user?.email ?? "")) {
      successMessage.value = "Your profile has been saved. A verification email has been sent to your new address.";
    } else {
      successMessage.value = "Your profile has been saved.";
    }
    emit("saved");
  } catch (e) {
    fehler.value = fehlerText(e, "Saving the profile failed.");
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.auth-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  border-radius: 1rem;
}

.auth-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #0d6efd, #6610f2);
  border-radius: 50%;
  font-size: 1.6rem;
}

.input-group .form-control:focus {
  z-index: 3;
}

.input-group-text {
  min-width: 46px;
  justify-content: center;
  border-right: 0;
}

.input-group .form-control {
  border-left: 0;
}

.input-group .form-control:focus {
  border-left: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
}

.input-group .invalid-feedback {
  width: 100%;
  margin-left: 46px;
}
</style>
