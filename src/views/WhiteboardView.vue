<script setup lang="ts">
// Die Seite des Whiteboards.
//
// Ohne Board-Kennung in der Adresse steht hier der gruene Knopf "Create new
// whitepaper". Ein Klick legt ein neues Board auf dem Server an, kopiert den
// Einladungslink in die Zwischenablage und oeffnet das Board. Mit einer
// Board-Kennung (z.B. /whiteboard/abc123) wird direkt das Board gezeigt.

import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import WhiteboardApp from "@/components/whiteboard/WhiteboardApp.vue";
import { useWhiteboardSession } from "@/components/whiteboard/useWhiteboardSession";
import { copyToClipboard } from "@/utils/clipboard";
import { boardLink, loadName } from "@/utils/whiteboard";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const session = useWhiteboardSession();

const laeuft = ref(false);
const fehler = ref("");

const boardId = computed(() => {
	const param = route?.params?.id;
	return typeof param === "string" ? param : "";
});

async function neuesWhitepaper(): Promise<void> {
	if (laeuft.value) return;
	laeuft.value = true;
	fehler.value = "";
	try {
		const id = await session.createBoard("Whiteboard", loadName());
		// Der Link wird direkt kopiert, damit er sofort an die Mitarbeiter
		// geschickt werden kann.
		await copyToClipboard(boardLink(window.location.origin, id));
		await router.push(`/whiteboard/${id}`);
	} catch {
		fehler.value = t(session.error.value || "whiteboard.serverUnreachable");
	} finally {
		laeuft.value = false;
	}
}
</script>

<template>
	<main class="whiteboard">
		<WhiteboardApp v-if="boardId" :board-id="boardId" />

		<div v-else class="whiteboard__start justify-content-center align-items-center">
			<button
				type="button"
				class="whiteboard__create"
				:disabled="laeuft"
				@click="neuesWhitepaper"
			>
				{{ laeuft ? t("whiteboard.creating") : t("whiteboard.createNew") }}
			</button>
			<p v-if="fehler" class="whiteboard__fehler">{{ fehler }}</p>
		</div>
	</main>
</template>

<style scoped>
.whiteboard {
	min-height: 60vh;
	padding: 2rem 1rem;
}

.whiteboard__start {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	min-height: 50vh;
}

.whiteboard__create {
	background: #5fcf80;
	color: #fff;
	border: 2px solid #5fcf80;
	border-radius: 50px;
	padding: 12px 30px;
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	transition: background 0.3s, border-color 0.3s;
}

.whiteboard__create:hover:not(:disabled) {
	background: #3ac162;
	border-color: #3ac162;
}

.whiteboard__create:disabled {
	opacity: 0.6;
	cursor: progress;
}

.whiteboard__fehler {
	color: #a51d1d;
	background: #fdecec;
	border: 1px solid #f5c2c2;
	border-radius: 6px;
	padding: 0.5rem 1rem;
	margin: 0;
}
</style>
