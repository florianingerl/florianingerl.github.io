<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import WhiteboardCanvas from "./WhiteboardCanvas.vue";
import WhiteboardShareBar from "./WhiteboardShareBar.vue";
import WhiteboardToolbar from "./WhiteboardToolbar.vue";
import { useWhiteboardSession } from "./useWhiteboardSession";
import { useWhiteboardEditor } from "./useWhiteboardEditor";
import { copyToClipboard } from "@/utils/clipboard";
import {
	applyPatch,
	boardLink,
	diffObjects,
	loadName,
	saveName,
} from "@/utils/whiteboard";
import type { WhiteboardObject, WhiteboardPenStroke } from "@/types/whiteboard";
import "./whiteboard.css";

const props = defineProps<{ boardId: string }>();

const { t } = useI18n();
const session = useWhiteboardSession();

const canvas = ref<InstanceType<typeof WhiteboardCanvas> | null>(null);
const serverObjects = ref<WhiteboardObject[]>([]);
const name = ref(loadName());
const copied = ref(false);
const fehler = ref("");

const link = computed(() => boardLink(window.location.origin, props.boardId));
const kannBearbeiten = computed(() => !fehler.value);

const cursors = computed(() => Object.values(session.cursors.value));
const penPreviews = computed(() => Object.values(session.penPreviews.value));

const editor = useWhiteboardEditor({
	canEdit: () => kannBearbeiten.value,
	afterChange: synchronisiere,
	getCanvasElement: () => canvas.value?.$el?.querySelector?.(".wb-canvas"),
	translate: (key) => t(key),
});

const {
	objects,
	selectedIds,
	tool,
	color,
	fill,
	strokeWidth,
	camera,
	fileError,
	canUndo,
	canRedo,
	hasSelection,
} = editor;

function setzeFehler(schluessel: string): void {
	fehler.value = t(schluessel);
}

function synchronisiere(): void {
	const patch = diffObjects(serverObjects.value, objects.value);
	if (!patch.upserts.length && !patch.deletes.length) return;
	session.sendPatch(patch);
	serverObjects.value = objects.value.map((obj) => ({ ...obj }));
}

const merkeStand = editor.rememberState;

function objectHinzugefuegt(obj: WhiteboardObject): void {
	editor.addObject(obj);
}

function canvasClick(punkt: { x: number; y: number }): void {
	editor.canvasClick(punkt);
}

function auswahlGedaehnt(ids: string[], dx: number, dy: number): void {
	editor.moveSelection(ids, dx, dy);
}

function objectGeaendert(id: string, box: { x: number; y: number; w: number; h: number }): void {
	editor.resizeObject(id, box);
}

function objectAktualisiert(obj: WhiteboardObject): void {
	editor.updateObject(obj);
}

async function bildEinfuegen(datei: File): Promise<void> {
	if (!(await editor.insertImage(datei))) {
		setzeFehler("whiteboard.imageFailed");
	}
}

async function auswahlOderBildEinfuegen(): Promise<void> {
	await editor.pasteImageOrSelection();
}

function onPaste(event: ClipboardEvent): void {
	void editor.pasteFromClipboardEvent(event);
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

function dateiSpeichern(): void {
	editor.saveFile(session.board.value?.title ?? "Whiteboard");
}

async function dateiOeffnen(datei: File): Promise<void> {
	if (await editor.openFile(datei)) {
		await nextTick();
		canvas.value?.fitToContent();
	}
}

onMounted(async () => {
	window.addEventListener("paste", onPaste);
	try {
		await session.joinBoard(props.boardId, name.value);
		editor.setObjects(session.board.value?.objects ?? [], false);
		serverObjects.value = objects.value.map((obj) => ({ ...obj }));
	} catch {
		setzeFehler("whiteboard.notFound");
	}
});

onBeforeUnmount(() => {
	window.removeEventListener("paste", onPaste);
});

session.onChanged((patch) => {
	objects.value = applyPatch(objects.value, patch);
	serverObjects.value = applyPatch(serverObjects.value, patch);
});

let letzteCursorMeldung = 0;

function cursorBewegt(punkt: { x: number; y: number }): void {
	const jetzt = Date.now();
	if (jetzt - letzteCursorMeldung < 60) return;
	letzteCursorMeldung = jetzt;
	session.sendCursor(punkt.x, punkt.y);
}

function stiftGestartet(stroke: WhiteboardPenStroke): void {
	session.sendPenStart(stroke);
}

function stiftPunkte(id: string, points: number[]): void {
	session.sendPenPoints(id, points);
}

function stiftAbgebrochen(id: string): void {
	session.sendPenCancel(id);
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
			:can-edit="kannBearbeiten"
			@copy="linkKopieren"
			@update:name="nameGeaendert"
			@save="dateiSpeichern"
			@open="dateiOeffnen"
		/>

		<div class="wb-app__body">
			<WhiteboardToolbar
				:tool="tool"
				:color="color"
				:fill="fill"
				:stroke-width="strokeWidth"
				:can-undo="canUndo"
				:can-redo="canRedo"
				:can-edit="kannBearbeiten"
				:has-selection="hasSelection"
				@tool-change="tool = $event"
				@color-change="color = $event"
				@fill-change="fill = $event"
				@stroke-change="strokeWidth = $event"
				@undo="editor.undo"
				@redo="editor.redo"
				@delete="editor.deleteSelected"
				@copy="editor.copySelection"
				@paste="auswahlOderBildEinfuegen"
				@duplicate="editor.duplicateSelected"
				@zoom-in="canvas?.zoomBy(1.2)"
				@zoom-out="canvas?.zoomBy(1 / 1.2)"
				@zoom-fit="canvas?.fitToContent()"
				@image="bildEinfuegen"
			/>

			<div class="wb-app__flaeche">
				<p v-if="fehler" class="wb-app__fehler">{{ fehler }}</p>
				<p v-if="fileError" class="wb-app__fehler">{{ fileError }}</p>
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
					:pen-previews="penPreviews"
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
					@pen-start="stiftGestartet"
					@pen-points="stiftPunkte"
					@pen-cancel="stiftAbgebrochen"
					@erase="editor.deleteObjects"
					@canvas-click="canvasClick"
				/>
			</div>
		</div>
	</div>
</template>
