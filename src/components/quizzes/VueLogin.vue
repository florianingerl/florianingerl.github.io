<!-- Anmeldedialog. Erscheint an der Stelle des Quiz, wenn "Login" geklickt wird. -->
<template>
  <div class="auth-dialog">
    <div class="card auth-card border-0 shadow-lg">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <div class="auth-icon mx-auto mb-3">
            <i class="bi bi-box-arrow-in-right"></i>
          </div>

          <h2 class="h4 fw-bold mb-2">Log in</h2>
          <p class="text-muted mb-0">
            Log in to create, edit and delete exercises and tutorials.
          </p>
        </div>

        <form @submit.prevent="submitForm" novalidate>
          <div class="mb-3">
            <label for="login-email" class="form-label fw-semibold">
              Email address
            </label>

            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-envelope"></i>
              </span>

              <input
                id="login-email"
                v-model.trim="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="you@example.com"
                autocomplete="email"
                required
              />

              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label for="login-password" class="form-label fw-semibold">
              Password
            </label>

            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-lock"></i>
              </span>

              <input
                id="login-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Your password"
                autocomplete="current-password"
                required
              />

              <button
                type="button"
                class="btn btn-outline-secondary"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>

              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>
          </div>

          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ errorMessage }}
          </div>

          <div class="d-flex gap-2">
            <button
              type="submit"
              class="btn btn-primary flex-fill py-2 fw-semibold"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>

              {{ isSubmitting ? 'Logging in...' : 'Log in' }}
            </button>

            <button
              type="button"
              class="btn btn-outline-secondary py-2"
              :disabled="isSubmitting"
              @click="emit('cancel-clicked')"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { fehlerText } from "@/api";
import { useAuthStore } from "@/stores/auth";

const props = defineProps<{
  // Wird von der Anmeldung nach dem Registrieren vorgegeben, damit die
  // E-Mail-Adresse nicht noch einmal getippt werden muss.
  email?: string
}>()

const emit = defineEmits<{
  (e: 'logged-in'): void
  (e: 'cancel-clicked'): void
}>()

const auth = useAuthStore()

const form = reactive<{ email: string; password: string }>({
  email: props.email ?? "",
  password: '',
})

const errors = reactive<{ email: string; password: string }>({
  email: '',
  password: '',
})

const isSubmitting = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const errorMessage = ref<string>('')

watch(
  () => props.email,
  (neu) => {
    if (neu) form.email = neu
  }
)

function clearErrors(): void {
  errors.email = ''
  errors.password = ''
  errorMessage.value = ''
}

function validateForm(): boolean {
  clearErrors()

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let isValid = true

  if (!form.email) {
    errors.email = 'Please enter your email address.'
    isValid = false
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Please enter your password.'
    isValid = false
  }

  return isValid
}

async function submitForm(): Promise<void> {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    await auth.anmelden(form.email, form.password)
    form.password = ''
    emit('logged-in')
  } catch (error: unknown) {
    errorMessage.value = fehlerText(error, 'Login failed.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Wie beim Registrieren: Karte in der Mitte, sonst nichts daneben. */
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
