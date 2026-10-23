<script setup lang="ts">
// Die Leiste oben auf dem Board. Sie enthaelt immer den Link, mit dem andere
// Personen mitarbeiten koennen, sowie die Liste der Teilnehmer.

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { WhiteboardParticipant } from "@/types/whiteboard";

const props = defineProps<{
	link: string;
	participants: WhiteboardParticipant[];
	connected: boolean;
	name: string;
	copied: boolean;
	canEdit: boolean;
}>();

const emit = defineEmits<{
	(e: "copy"): void;
	(e: "update:name", name: string): void;
	(e: "save"): void;
	(e: "open", datei: File): void;
}>();

const { t } = useI18n();
const dateiFeld = ref<HTMLInputElement | null>(null);

function onName(event: Event): void {
	emit("update:name", (event.target as HTMLInputElement).value);
}

function onDatei(event: Event): void {
	const feld = event.target as HTMLInputElement;
	const datei = feld.files?.[0];
	if (datei) emit("open", datei);
	feld.value = "";
}
</script>

<template>
	<div class="wb-share">
		<div class="wb-share__link">
			<label class="wb-share__label" for="wb-share-link">
				<i class="bi bi-link-45deg"></i>
				{{ t("whiteboard.share") }}
			</label>
			<input
				id="wb-share-link"
				class="wb-share__input"
				type="text"
				readonly
				:value="props.link"
				@click="($event.target as HTMLInputElement).select()"
				:aria-label="t('whiteboard.share')"
			/>
			<button
				type="button"
				class="wb-share__knopf"
				:title="t('whiteboard.copyLink')"
				:aria-label="t('whiteboard.copyLink')"
				@click="emit('copy')"
			>
				<i class="bi" :class="props.copied ? 'bi-check-lg' : 'bi-clipboard'"></i>
			</button>
		</div>

		<div class="wb-share__datei">
			<button
				type="button"
				class="wb-share__knopf"
				:title="t('whiteboard.saveFile')"
				:aria-label="t('whiteboard.saveFile')"
				@click="emit('save')"
			>
				<i class="bi bi-download"></i>
			</button>
			<button
				type="button"
				class="wb-share__knopf"
				:disabled="!props.canEdit"
				:title="t('whiteboard.openFile')"
				:aria-label="t('whiteboard.openFile')"
				@click="dateiFeld?.click()"
			>
				<i class="bi bi-folder2-open"></i>
			</button>
			<input
				ref="dateiFeld"
				type="file"
				accept=".json,application/json"
				class="visually-hidden"
				@change="onDatei"
			/>
		</div>

		<div class="wb-share__teilnehmer">
			<span class="wb-share__label">
				<i class="bi bi-people"></i>
				{{ t("whiteboard.participants") }}
			</span>
			<span
				v-for="person in props.participants"
				:key="person.id"
				class="wb-share__person"
				:title="person.name"
			>
				<span
					class="wb-share__punkt"
					:style="{ background: person.color }"
				></span>
				{{ person.name }}
			</span>
		</div>

		<div class="wb-share__status">
			<input
				class="wb-share__name"
				type="text"
				:value="props.name"
				:placeholder="t('whiteboard.yourName')"
				:aria-label="t('whiteboard.yourName')"
				@change="onName"
			/>
			<span
				class="wb-share__verbindung"
				:class="props.connected ? 'wb-share__verbindung--da' : 'wb-share__verbindung--nein'"
			>
				<i class="bi" :class="props.connected ? 'bi-wifi' : 'bi-wifi-off'"></i>
				{{ props.connected ? t("whiteboard.connected") : t("whiteboard.disconnected") }}
			</span>
		</div>
	</div>
</template>
