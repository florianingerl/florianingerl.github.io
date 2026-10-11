<!-- Leiste mit Anmelde-Knoepfen ueber jedem Absatz und jedem Quiz.
     Rechts stehen "Sign up" und "Login" (bzw. nach dem Anmelden
     "Collaborate" und "Logout"). Links wird - nur ueber einem Absatz - die
     Aufforderung zum Schreiben angezeigt. -->
<template>
  <div
    class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2"
  >
    <span v-if="!auth.angemeldet && showMessage" class="text-muted small">
      Writing. Login or Sign up to create or edit books yourself or to start a
      writing session with someone else.
    </span>

    <span
      v-else-if="auth.angemeldet && collaborating && showMessage"
      class="small"
    >
      <span class="fw-semibold">Collaboration sessions:</span>
      <span
        v-for="p in participants"
        :key="p.id"
        class="ms-2 d-inline-flex align-items-center"
      >
        <span class="book-cursor" :style="{ backgroundColor: p.color }"></span>
        <span :style="{ color: p.color }" class="ms-1">{{ p.name }}</span>
      </span>
    </span>
    <span v-else></span>

    <div class="d-flex flex-wrap align-items-center gap-2 ms-auto">
      <template v-if="auth.angemeldet">
        <button
          v-if="!collaborating"
          type="button"
          class="btn btn-outline-primary btn-sm"
          title="Start a collaborative book writing session"
          @click="emit('collaborate')"
        >
          <i class="bi bi-people me-1" aria-hidden="true"></i>
          Collaborate
        </button>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="emit('logout')"
        >
          <i class="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
          Logout
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="emit('signup')"
        >
          <i class="bi bi-person-plus me-1" aria-hidden="true"></i>
          Sign up
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="emit('login')"
        >
          <i class="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>
          Login
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { CollaborationUser } from "@/types/book";

withDefaults(
  defineProps<{
    showMessage?: boolean;
    collaborating?: boolean;
    participants?: CollaborationUser[];
  }>(),
  {
    showMessage: false,
    collaborating: false,
    participants: () => [],
  },
);

const emit = defineEmits<{
  (e: "login"): void;
  (e: "signup"): void;
  (e: "logout"): void;
  (e: "collaborate"): void;
}>();

const auth = useAuthStore();
</script>

<style scoped>
.book-cursor {
  display: inline-block;
  width: 10px;
  height: 16px;
  border-radius: 2px;
  vertical-align: text-bottom;
}
</style>
