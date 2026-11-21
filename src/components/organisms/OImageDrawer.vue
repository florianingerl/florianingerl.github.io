<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import WhiteboardCanvas from "@/components/whiteboard/WhiteboardCanvas.vue";
import WhiteboardToolbar from "@/components/whiteboard/WhiteboardToolbar.vue";
import { useWhiteboardEditor } from "@/components/whiteboard/useWhiteboardEditor";
import { fehlerText, uploadDrawing } from "@/api";
import {
	drawnImageJson,
	IMAGE_DRAWER_HEIGHT,
	IMAGE_DRAWER_WIDTH,
	svgToPngDataUrl,
} from "@/utils/imageDrawer";
import "@/components/whiteboard/whiteboard.css";

const emit = defineEmits<{
	(e: "saved", value: { url: string; jsonUrl: string }): void;
	(e: "cancel"): void;
}>();

const { t } = useI18n();
const canvas = ref<InstanceType<typeof WhiteboardCanvas> | null>(null);
const saving = ref(false);
const fehler = ref("");

const editor = useWhiteboardEditor({
	getCanvasElement: () => canvas.value?.$el?.querySelector?.(".wb-canvas"),
});

const {
	objects,
	selectedIds,
	tool,
	color,
	fill,
	strokeWidth,
	camera,
	canUndo,
	canRedo,
	hasSelection,
} = editor;

function onPaste(event: ClipboardEvent): void {
	void editor.pasteFromClipboardEvent(event);
}

onMounted(() => window.addEventListener("paste", onPaste));
onBeforeUnmount(() => window.removeEventListener("paste", onPaste));

async function save(): Promise<void> {
	if (saving.value) return;
	saving.value = true;
	fehler.value = "";
	try {
		const root = canvas.value?.$el as Element | undefined;
		const svg = root?.querySelector("svg.wb-canvas") as SVGSVGElement | null;
		if (!svg) throw new Error(t("imageDrawer.noCanvas"));
		const pngDataUrl = await svgToPngDataUrl(svg, IMAGE_DRAWER_WIDTH, IMAGE_DRAWER_HEIGHT);
		const antwort = await uploadDrawing(pngDataUrl, drawnImageJson(objects.value));
		emit("saved", { url: antwort.url, jsonUrl: antwort.jsonUrl });
	} catch (e) {
		fehler.value = fehlerText(e, t("imageDrawer.saveFailed"));
	} finally {
		saving.value = false;
	}
}
</script>

<template>
	<div class="image-drawer">
		<WhiteboardToolbar
			:tool="tool"
			:color="color"
			:fill="fill"
			:stroke-width="strokeWidth"
			:can-undo="canUndo"
			:can-redo="canRedo"
			:can-edit="true"
			:has-selection="hasSelection"
			:show-hand="false"
			:show-zoom="false"
			@tool-change="tool = $event"
			@color-change="color = $event"
			@fill-change="fill = $event"
			@stroke-change="strokeWidth = $event"
			@undo="editor.undo"
			@redo="editor.redo"
			@delete="editor.deleteSelected"
			@copy="editor.copySelection"
			@paste="editor.pasteImageOrSelection"
			@duplicate="editor.duplicateSelected"
			@image="editor.insertImage"
		/>

		<div class="image-drawer__canvas">
			<WhiteboardCanvas
				ref="canvas"
				:objects="objects"
				:selected-ids="selectedIds"
				:tool="tool"
				:camera="camera"
				:color="color"
				:fill="fill"
				:stroke-width="strokeWidth"
				:cursors="[]"
				:pen-previews="[]"
				:can-edit="true"
				:show-grid="false"
				defs-id="image-drawer"
				:fixed-viewport="true"
				@select="selectedIds = $event"
				@create="editor.addObject"
				@move="editor.moveSelection"
				@resize="editor.resizeObject"
				@update="editor.updateObject"
				@tool-change="tool = $event"
				@interaction-start="editor.rememberState"
				@erase="editor.deleteObjects"
				@canvas-click="editor.canvasClick"
			/>
		</div>

		<p v-if="fehler" class="text-danger mb-0">{{ fehler }}</p>

		<div class="image-drawer__aktionen">
			<button
				type="button"
				class="btn btn-primary"
				:disabled="saving"
				@click="save"
			>
				<i class="bi bi-save" aria-hidden="true"></i> {{ t("imageDrawer.save") }}
			</button>
			<button type="button" class="btn btn-secondary" @click="emit('cancel')">
				<i class="bi bi-x-lg" aria-hidden="true"></i> {{ t("imageDrawer.cancel") }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.image-drawer {
	display: flex;
	flex-direction: column;
	gap: 2px;
	align-items: flex-start;
}

.image-drawer__canvas {
	width: 640px;
	height: 400px;
	flex: 0 0 auto;
	overflow: hidden;
	background: #ffffff;
	border: 1px solid #dee2e6;
}

.image-drawer__aktionen {
	display: flex;
	flex-direction: row;
	gap: 2px;
}
</style>
