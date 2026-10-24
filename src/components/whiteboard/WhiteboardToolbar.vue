<script setup lang="ts">
// Die Werkzeugleiste links auf dem Board: Werkzeuge waehlen, Farbe und
// Strichstaerke festlegen, Aktionen wie Rueckgaengig oder Loeschen.

import { useI18n } from "vue-i18n";
import type { WhiteboardTool } from "@/types/whiteboard";
import {
	WHITEBOARD_COLORS,
	WHITEBOARD_STROKE_WIDTHS,
} from "@/utils/whiteboard";

const props = defineProps<{
	tool: WhiteboardTool;
	color: string;
	fill: string;
	strokeWidth: number;
	canUndo: boolean;
	canRedo: boolean;
	canEdit: boolean;
	hasSelection: boolean;
}>();

const emit = defineEmits<{
	(e: "tool-change", tool: WhiteboardTool): void;
	(e: "color-change", color: string): void;
	(e: "fill-change", fill: string): void;
	(e: "stroke-change", width: number): void;
	(e: "undo"): void;
	(e: "redo"): void;
	(e: "delete"): void;
	(e: "copy"): void;
	(e: "paste"): void;
	(e: "duplicate"): void;
	(e: "zoom-in"): void;
	(e: "zoom-out"): void;
	(e: "zoom-fit"): void;
	(e: "image", datei: File): void;
}>();

const { t } = useI18n();

const werkzeuge: { tool: WhiteboardTool; icon: string; key: string }[] = [
	{ tool: "select", icon: "bi-cursor-fill", key: "select" },
	{ tool: "hand", icon: "bi-hand-index-thumb", key: "hand" },
	{ tool: "note", icon: "bi-sticky", key: "note" },
	{ tool: "text", icon: "bi-type", key: "text" },
	{ tool: "rect", icon: "bi-square", key: "rect" },
	{ tool: "ellipse", icon: "bi-circle", key: "ellipse" },
	{ tool: "line", icon: "bi-slash-lg", key: "line" },
	{ tool: "pen", icon: "bi-pencil", key: "pen" },
];

function onDatei(event: Event): void {
	const feld = event.target as HTMLInputElement;
	const datei = feld.files?.[0];
	if (datei) emit("image", datei);
	feld.value = "";
	feld.blur();
}
</script>

<template>
	<div class="wb-toolbar">
		<div class="wb-toolbar__gruppe">
			<button
				v-for="werkzeug in werkzeuge"
				:key="werkzeug.tool"
				type="button"
				class="wb-toolbar__knopf"
				:class="{ 'wb-toolbar__knopf--aktiv': props.tool === werkzeug.tool }"
				:title="t(`whiteboard.tools.${werkzeug.key}`)"
				:aria-label="t(`whiteboard.tools.${werkzeug.key}`)"
				:aria-pressed="props.tool === werkzeug.tool"
				@click="emit('tool-change', werkzeug.tool)"
			>
				<i class="bi" :class="werkzeug.icon"></i>
			</button>

			<label
				class="wb-toolbar__knopf wb-toolbar__datei"
				:title="t('whiteboard.tools.image')"
			>
				<i class="bi bi-image"></i>
				<input
					type="file"
					accept="image/*"
					class="visually-hidden"
					@change="onDatei"
				/>
			</label>
		</div>

		<div class="wb-toolbar__gruppe wb-toolbar__gruppe--farben">
			<span class="wb-toolbar__titel">{{ t("whiteboard.colors") }}</span>
			<div class="wb-toolbar__farben">
				<button
					v-for="farbe in WHITEBOARD_COLORS"
					:key="farbe"
					type="button"
					class="wb-toolbar__farbe"
					:class="{ 'wb-toolbar__farbe--aktiv': props.color === farbe }"
					:style="{ background: farbe }"
					:title="farbe"
					:aria-label="farbe"
					@click="emit('color-change', farbe)"
				></button>
			</div>
			<span class="wb-toolbar__titel">{{ t("whiteboard.noteColor") }}</span>
			<div class="wb-toolbar__farben">
				<button
					v-for="farbe in WHITEBOARD_COLORS"
					:key="farbe"
					type="button"
					class="wb-toolbar__farbe"
					:class="{ 'wb-toolbar__farbe--aktiv': props.fill === farbe }"
					:style="{ background: farbe }"
					:title="farbe"
					:aria-label="farbe"
					@click="emit('fill-change', farbe)"
				></button>
			</div>
		</div>

		<div class="wb-toolbar__gruppe">
			<span class="wb-toolbar__titel">{{ t("whiteboard.strokeWidth") }}</span>
			<div class="wb-toolbar__breiten">
				<button
					v-for="breite in WHITEBOARD_STROKE_WIDTHS"
					:key="breite"
					type="button"
					class="wb-toolbar__breite"
					:class="{ 'wb-toolbar__breite--aktiv': props.strokeWidth === breite }"
					:title="`${breite} px`"
					:aria-label="`${breite} px`"
					@click="emit('stroke-change', breite)"
				>
					<span :style="{ height: `${breite}px` }"></span>
				</button>
			</div>
		</div>

		<div class="wb-toolbar__gruppe">
			<button
				type="button"
				class="wb-toolbar__knopf"
				:disabled="!props.canUndo"
				:title="t('whiteboard.undo')"
				:aria-label="t('whiteboard.undo')"
				@click="emit('undo')"
			>
				<i class="bi bi-arrow-counterclockwise"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:disabled="!props.canRedo"
				:title="t('whiteboard.redo')"
				:aria-label="t('whiteboard.redo')"
				@click="emit('redo')"
			>
				<i class="bi bi-arrow-clockwise"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:disabled="!props.hasSelection"
				:title="t('whiteboard.copy')"
				:aria-label="t('whiteboard.copy')"
				@click="emit('copy')"
			>
				<i class="bi bi-copy"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:disabled="!props.hasSelection"
				:title="t('whiteboard.duplicate')"
				:aria-label="t('whiteboard.duplicate')"
				@click="emit('duplicate')"
			>
				<i class="bi bi-files"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:title="t('whiteboard.paste')"
				:aria-label="t('whiteboard.paste')"
				@click="emit('paste')"
			>
				<i class="bi bi-clipboard"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:disabled="!props.hasSelection"
				:title="t('whiteboard.delete')"
				:aria-label="t('whiteboard.delete')"
				@click="emit('delete')"
			>
				<i class="bi bi-trash"></i>
			</button>
		</div>

		<div class="wb-toolbar__gruppe">
			<button
				type="button"
				class="wb-toolbar__knopf"
				:title="t('whiteboard.zoomOut')"
				:aria-label="t('whiteboard.zoomOut')"
				@click="emit('zoom-out')"
			>
				<i class="bi bi-zoom-out"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:title="t('whiteboard.zoomIn')"
				:aria-label="t('whiteboard.zoomIn')"
				@click="emit('zoom-in')"
			>
				<i class="bi bi-zoom-in"></i>
			</button>
			<button
				type="button"
				class="wb-toolbar__knopf"
				:title="t('whiteboard.zoomFit')"
				:aria-label="t('whiteboard.zoomFit')"
				@click="emit('zoom-fit')"
			>
				<i class="bi bi-arrows-fullscreen"></i>
			</button>
		</div>
	</div>
</template>
