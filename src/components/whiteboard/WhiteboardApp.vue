<script setup lang="ts">
// Das Whiteboard: verbindet sich mit dem Server, haelt die Objekte, die
// Werkzeugleiste, die Leiste mit dem Einladungslink und die Zeichenflaeche.

import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import WhiteboardCanvas from "./WhiteboardCanvas.vue";
import WhiteboardShareBar from "./WhiteboardShareBar.vue";
import WhiteboardToolbar from "./WhiteboardToolbar.vue";
import { useWhiteboardSession } from "./useWhiteboardSession";
import { copyToClipboard } from "@/utils/clipboard";
import {
	applyPatch,
	boardLink,
	createObject,
	diffObjects,
	duplicateObjects,
	loadName,
	moveObjects,
	parseSelection,
	saveName,
	serializeSelection,
	topZ,
} from "@/utils/whiteboard";
import { bildAusDatei } from "@/utils/whiteboardBild";
import type { WhiteboardObject, WhiteboardTool } from "@/types/whiteboard";
import "./whiteboard.css";

const props = defineProps<{ boardId: string }>();

const { t } = useI18n();
const session = useWhiteboardSession();

const objects = ref<WhiteboardObject[]>([]);
const serverObjects = ref<WhiteboardObject[]>([]);
const selectedIds = ref<string[]>([]);
const tool = ref<WhiteboardTool>("select");
const color = ref("#1f2933");
const fill = ref("#ffd966");
const strokeWidth = ref(2);
const camera = ref({ x: 0, y: 0, scale: 1 });
const undoStack = ref<WhiteboardObject[][]>([]);
const redoStack = ref<WhiteboardObject[][]>([]);
const name = ref(loadName());
const copied = ref(false);
const kopierPuffer = ref<WhiteboardObject[]>([]);
const fehler = ref("");
const canvas = ref<InstanceType<typeof WhiteboardCanvas> | null>(null);

const link = computed(() => boardLink(window.location.origin, props.boardId));
const kannBearbeiten = computed(() => !fehler.value);

const cursors = computed(() => Object.values(session.cursors.value));

function fehlerText(schluessel: string): string {
	return t(schluessel);
}

// -------------------------------------------------------------- Boarddaten

function setzeFehler(schluessel: string): void {
	fehler.value = fehlerText(schluessel);
}

/** Schickt die Unterschiede zum Serverstand an den Server. */
function synchronisiere(): void {
	const patch = diffObjects(serverObjects.value, objects.value);
	if (!patch.upserts.length && !patch.deletes.length) return;
	session.sendPatch(patch);
	serverObjects.value = objects.value.map((obj) => ({ ...obj }));
}

/** Merkt sich den Stand vor der Aenderung fuer das Rueckgaengig. */
function merkeStand(): void {
	const stand = objects.value.map((obj) => ({ ...obj }));
	// Wenn sich nichts geaendert hat, gibt es auch nichts rueckgaengig zu machen.
	const vorher = undoStack.value[undoStack.value.length - 1];
	if (vorher && gleicheListe(vorher, stand)) return;
	undoStack.value = [...undoStack.value, stand];
	if (undoStack.value.length > 50) undoStack.value = undoStack.value.slice(-50);
	redoStack.value = [];
}

/** Sind zwei Objektlisten gleich? */
function gleicheListe(a: WhiteboardObject[], b: WhiteboardObject[]): boolean {
	if (a.length !== b.length) return false;
	return a.every((obj, index) => {
		const andere = b[index];
		if (!andere) return false;
		return JSON.stringify(obj) === JSON.stringify(andere);
	});
}

function rueckgaengig(): void {
	const vorher = undoStack.value.pop();
	if (!vorher) return;
	redoStack.value = [...redoStack.value, objects.value.map((obj) => ({ ...obj }))];
	objects.value = vorher;
	synchronisiere();
}

function wiederherstellen(): void {
	const nachher = redoStack.value.pop();
	if (!nachher) return;
	undoStack.value = [...undoStack.value, objects.value.map((obj) => ({ ...obj }))];
	objects.value = nachher;
	synchronisiere();
}

// --------------------------------------------------------------- Aktionen

function objectHinzugefuegt(obj: WhiteboardObject): void {
	objects.value = [...objects.value, obj];
	synchronisiere();
}

function auswahlGedaehnt(ids: string[], dx: number, dy: number): void {
	objects.value = moveObjects(objects.value, ids, dx, dy);
	synchronisiere();
}

function objectGeaendert(box: { x: number; y: number; w: number; h: number }, id: string): void {
	objects.value = objects.value.map((obj) => {
		if (obj.id !== id) return obj;
		const neu: WhiteboardObject = { ...obj, ...box };
		if (obj.type === "line") {
			neu.x2 = box.x + box.w;
			neu.y2 = box.y + box.h;
		}
		return neu;
	});
	synchronisiere();
}

function objectAktualisiert(obj: WhiteboardObject): void {
	objects.value = objects.value.map((alt) => (alt.id === obj.id ? obj : alt));
	synchronisiere();
}

function auswahlLoeschen(): void {
	if (!selectedIds.value.length) return;
	merkeStand();
	const zuLoeschen = new Set(selectedIds.value);
	objects.value = objects.value.filter((obj) => !zuLoeschen.has(obj.id));
	selectedIds.value = [];
	synchronisiere();
}

function auswahlKopieren(): void {
	const gewaehlt = objects.value.filter((obj) => selectedIds.value.includes(obj.id));
	if (!gewaehlt.length) return;
	kopierPuffer.value = gewaehlt;
	void copyToClipboard(serializeSelection(gewaehlt));
}

async function auswahlEinfuegen(): void {
	let inhalt = kopierPuffer.value;
	try {
		const text = await navigator.clipboard?.readText?.();
		const ausZwischenablage = text ? parseSelection(text) : [];
		if (ausZwischenablage.length) inhalt = ausZwischenablage;
	} catch {
		// Ohne Zugriff auf die Zwischenablage wird der eigene Puffer genutzt.
	}
	if (!inhalt.length) return;
	merkeStand();
	const kopien = inhalt.map((obj) => ({
		...obj,
		id: `${obj.id}_${Math.random().toString(36).slice(2, 8)}`,
		x: obj.x + 30,
		y: obj.y + 30,
		z: topZ(objects.value) + 1,
	}));
	objects.value = [...objects.value, ...kopien];
	selectedIds.value = kopien.map((obj) => obj.id);
	synchronisiere();
}

function auswahlDuplizieren(): void {
	if (!selectedIds.value.length) return;
	merkeStand();
	const vorher = objects.value.length;
	objects.value = duplicateObjects(objects.value, selectedIds.value, 24);
	selectedIds.value = objects.value
		.slice(vorher)
		.map((obj) => obj.id);
	synchronisiere();
}

async function bildEinfuegen(datei: File): Promise<void> {
	try {
		const bild = await bildAusDatei(datei);
		const z = topZ(objects.value) + 1;
		const obj = createObject("image", camera.value.x, camera.value.y, z, {
			src: bild.src,
			w: bild.w,
			h: bild.h,
		});
		merkeStand();
		objects.value = [...objects.value, obj];
		selectedIds.value = [obj.id];
		synchronisiere();
	} catch {
		setzeFehler("whiteboard.imageFailed");
	}
}

async function linkKopieren(): Promise<void> {
	const erfolg = await copyToClipboard(link.value);
	if (erfolg) {
		copied.value = true;
		window.setTimeout(() => (copied.value = false), 2000);
	}
}

function nameGeaendert(neuerName: string): void {
	name.value = neuerName.trim() || loadName();
	saveName(name.value);
}

// ----------------------------------------------------------------- Server

onMounted(async () => {
	try {
		await session.joinBoard(props.boardId, name.value);
		objects.value = session.board.value?.objects ?? [];
		serverObjects.value = objects.value.map((obj) => ({ ...obj }));
	} catch {
		setzeFehler("whiteboard.notFound");
	}
});

session.onChanged((patch) => {
	objects.value = applyPatch(objects.value, patch);
	serverObjects.value = applyPatch(serverObjects.value, patch);
});

let letzteCursorMeldung = 0;

function cursorBewegt(x: number, y: number): void {
	const jetzt = Date.now();
	if (jetzt - letzteCursorMeldung < 60) return;
	letzteCursorMeldung = jetzt;
	session.sendCursor(x, y);
}
</script>

<template>
	<div class="wb-app">
		<WhiteboardShareBar
			:link="link"
			:participants="session.participants.value"
			:connected="session.connected.value"
			:name="name"
			:copied="copied"
			@copy="linkKopieren"
			@update:name="nameGeaendert"
		/>

		<div class="wb-app__body">
			<WhiteboardToolbar
				:tool="tool"
				:color="color"
				:fill="fill"
				:stroke-width="strokeWidth"
				:can-undo="undoStack.length > 0"
				:can-redo="redoStack.length > 0"
				:can-edit="kannBearbeiten"
				:has-selection="selectedIds.length > 0"
				@tool-change="tool = $event"
				@color-change="color = $event"
				@fill-change="fill = $event"
				@stroke-change="strokeWidth = $event"
				@undo="rueckgaengig"
				@redo="wiederherstellen"
				@delete="auswahlLoeschen"
				@copy="auswahlKopieren"
				@paste="auswahlEinfuegen"
				@duplicate="auswahlDuplizieren"
				@zoom-in="canvas?.zoomBy(1.2)"
				@zoom-out="canvas?.zoomBy(1 / 1.2)"
				@zoom-fit="canvas?.fitToContent()"
				@image="bildEinfuegen"
			/>

			<div class="wb-app__flaeche">
				<p v-if="fehler" class="wb-app__fehler">{{ fehler }}</p>
				<WhiteboardCanvas
					ref="canvas"
					:objects="objects"
					:selected-ids="selectedIds"
					:tool="tool"
					:camera="camera"
					:color="color"
					:fill="fill"
					:stroke-width="strokeWidth"
					:cursors="cursors"
					:can-edit="kannBearbeiten"
					@camera-change="camera = $event"
					@select="selectedIds = $event"
					@create="objectHinzugefuegt"
					@move="auswahlGedaehnt"
					@resize="objectGeaendert"
					@update="objectAktualisiert"
					@tool-change="tool = $event"
					@interaction-start="merkeStand"
					@interaction-end="synchronisiere"
					@cursor="cursorBewegt"
				/>
			</div>
		</div>
	</div>
</template>
