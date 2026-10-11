<script setup lang="ts">
import { ref } from "vue";
import { client } from "@/api";

// Dummy-Komponente: Sie stellt eine Anfrage an den "anderen Server" (unser
// Backend) und zeigt dessen Antwort an. In ABackendPing.test.ts wird dieser
// Server mit MSW (Mock Service Worker) gemockt, ohne dass er wirklich läuft.
interface PingAntwort {
  message: string;
  server: string;
}

const antwort = ref<PingAntwort | null>(null);
const laden = ref(false);
const fehler = ref("");

async function pingen(): Promise<void> {
  laden.value = true;
  fehler.value = "";
  try {
    const r = await client.get<PingAntwort>("/api/ping");
    antwort.value = r.data;
  } catch {
    fehler.value = "Der Server antwortet nicht.";
  } finally {
    laden.value = false;
  }
}
</script>

<template>
	<div class="backend-ping">
		<button data-testid="ping" type="button" :disabled="laden" @click="pingen">
			Ping server
		</button>
		<p v-if="laden" data-testid="ping-loading">Loading…</p>
		<p v-else-if="fehler" data-testid="ping-error">{{ fehler }}</p>
		<p v-else-if="antwort" data-testid="ping-message">
			{{ antwort.message }} ({{ antwort.server }})
		</p>
		<p v-else data-testid="ping-idle">No response yet.</p>
	</div>
</template>

<style scoped>
.backend-ping {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	max-width: 20rem;
}
</style>
