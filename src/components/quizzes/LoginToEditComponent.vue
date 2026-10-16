<!-- Leiste ueber dem Quiz: Knopfe zum Anlegen, Bearbeiten und Loeschen von
     Aufgaben, der Anmelde-Hinweis sowie An-, Ab- und Registrierung. Ob die
     Knopfe oder die Anmeldung zu sehen ist, entscheidet der Benutzer im Store. -->
<template>
  <div class="login-to-edit">
    <template v-if="auth.user">
      <div class="d-flex flex-wrap align-items-center gap-2">
        <button
          v-if="!formOpen"
          type="button"
          class="btn btn-success"
          title="Add a new exercise"
          @click="emit('create-clicked')"
        >
          <i class="bi bi-plus-lg" aria-hidden="true"></i>
        </button>
        <button
          v-if="!formOpen && canEdit"
          type="button"
          class="btn btn-primary"
          title="Edit the exercise"
          @click="emit('edit-clicked')"
        >
          <i class="bi bi-pencil-square" aria-hidden="true"></i>
        </button>
        <button
          v-if="!formOpen && canDelete"
          type="button"
          class="btn btn-danger"
          title="Delete the exercise"
          @click="emit('delete-clicked')"
        >
          <i class="bi bi-trash" aria-hidden="true"></i>
        </button>
      </div>

      <!-- Nimmt den Platz ein, der uebrig bleibt, und drueckt die rechte
           Gruppe nach rechts. -->
      <div class="login-to-edit__spacer flex-grow-1" aria-hidden="true"></div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <span
          class="badge text-bg-success login-to-edit__ellipsis"
          :title="'You are logged in as ' + auth.email"
        >
          You are logged in as {{ auth.email }}
        </span>
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          title="Modify your profile or your settings"
          @click="emit('profile-clicked')"
        >
          <i class="bi bi-person-gear me-1" aria-hidden="true"></i>
          Profile
        </button>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="emit('logout-clicked')"
        >
          <i class="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
          Logout
        </button>
      </div>
    </template>

    <template v-else>
      <label
        class="text-muted login-to-edit__ellipsis"
        title="Log in to create, edit or delete exercises and tutorials."
      >
        Log in to create, edit or delete exercises and tutorials.
      </label>

      <div class="login-to-edit__spacer flex-grow-1" aria-hidden="true"></div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="emit('signup-clicked')"
        >
          <i class="bi bi-person-plus me-1" aria-hidden="true"></i>
          Sign up
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="emit('login-clicked')"
        >
          <i class="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>
          Login
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

withDefaults(
  defineProps<{
    // Das Formular zum Anlegen/Bearbeiten ist offen: die Knopfe bleiben aus.
    formOpen?: boolean;
    // Es ist eine Aufgabe ausgewaehlt (bzw. mit _id gespeichert).
    canEdit?: boolean;
    canDelete?: boolean;
  }>(),
  {
    formOpen: false,
    canEdit: false,
    canDelete: false,
  }
);

const emit = defineEmits<{
  (e: "create-clicked"): void;
  (e: "edit-clicked"): void;
  (e: "delete-clicked"): void;
  (e: "login-clicked"): void;
  (e: "signup-clicked"): void;
  (e: "profile-clicked"): void;
  (e: "logout-clicked"): void;
}>();

const auth = useAuthStore();
</script>

<style scoped>
/* Die Leiste nimmt in ihrer Zeile den Platz ein, der uebrig bleibt, und
   verteilt ihre Gruppen mit dem transparenten Platzhalter nach rechts. */
.login-to-edit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
}

.login-to-edit__spacer {
  background-color: transparent;
}

/* Lange Texte (langer Benutzername/Email) duerfen schrumpfen und werden dann
   mit "..." abgeschnitten; der vollstaendige Text steht im title-Tooltip. */
.login-to-edit__ellipsis {
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
</style>
