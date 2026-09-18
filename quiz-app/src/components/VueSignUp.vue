<!-- VueSignUp.vue -->
<template>
  <div class="signup-page d-flex align-items-center justify-content-center min-vh-100">
    <div class="card signup-card border-0 shadow-lg">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <div class="signup-icon mx-auto mb-3">
            <i class="bi bi-person-plus-fill"></i>
          </div>

          <h1 class="h3 fw-bold mb-2">Create your account</h1>
          <p class="text-muted mb-0">
            Sign up with your name, email and password.
          </p>
        </div>

        <form @submit.prevent="submitForm" novalidate>
          <div class="mb-3">
            <label for="name" class="form-label fw-semibold">
              Name
            </label>

            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-person"></i>
              </span>

              <input
                id="name"
                v-model.trim="form.name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                placeholder="Your name"
                autocomplete="name"
                required
              />

              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">
              Email address
            </label>

            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-envelope"></i>
              </span>

              <input
                id="email"
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
            <label for="password" class="form-label fw-semibold">
              Password
            </label>

            <div class="input-group">
              <span class="input-group-text bg-light">
                <i class="bi bi-lock"></i>
              </span>

              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Your password"
                autocomplete="new-password"
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

          <div v-if="successMessage" class="alert alert-success" role="alert">
            <i class="bi bi-check-circle me-2"></i>
            {{ successMessage }}
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100 py-2 fw-semibold"
            :disabled="isSubmitting"
          >
            <span
              v-if="isSubmitting"
              class="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>

            {{ isSubmitting ? 'Creating account...' : 'Create account' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { client } from '../api'

interface SignUpForm {
  name: string
  email: string
  password: string
}

interface FormErrors {
  name: string
  email: string
  password: string
}

const form = reactive<SignUpForm>({
  name: '',
  email: '',
  password: ''
})

const errors = reactive<FormErrors>({
  name: '',
  email: '',
  password: ''
})

const isSubmitting = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

function clearErrors(): void {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errorMessage.value = ''
  successMessage.value = ''
}

function validateForm(): boolean {
  clearErrors()

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let isValid = true

  if (!form.name) {
    errors.name = 'Please enter your name.'
    isValid = false
  }

  if (!form.email) {
    errors.email = 'Please enter your email address.'
    isValid = false
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Please enter a password.'
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
    const data = {
      name: form.name,
      email: form.email,
      password: form.password
    }

    await client.post('/api/register', data)

    successMessage.value = 'Your account has been created successfully.'

    form.name = ''
    form.email = ''
    form.password = ''
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Unable to connect to the server.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>


<style scoped>
.signup-page {
  background:
    linear-gradient(135deg, rgba(13, 110, 253, 0.12), transparent 50%),
    #f8f9fa;
  padding: 1rem;
}

.signup-card {
  width: 100%;
  max-width: 440px;
  border-radius: 1rem;
}

.signup-icon {
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
