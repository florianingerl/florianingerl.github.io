import { computed, nextTick, ref } from "vue";
import {
	copyToClipboard,
} from "@/utils/clipboard";
import {
	createObject,
	duplicateObjects,
	moveObjects,
	parseSelection,
	screenToWorld,
	serializeSelection,
	topZ,
	type Point,
} from "@/utils/whiteboard";
import {
	bildAusDatei,
	bildAusSystemZwischenablage,
	bilddateiAusZwischenablage,
	istTexteingabe,
} from "@/utils/whiteboardBild";
import {
	downloadTextFile,
	parseWhiteboardFile,
	readTextFile,
	serializeWhiteboardFile,
	whiteboardFileName,
} from "@/utils/whiteboardDatei";
import type { WhiteboardObject, WhiteboardTool } from "@/types/whiteboard";

const MAX_HISTORY = 50;

export interface WhiteboardEditorOptions {
	canEdit?: () => boolean;
	afterChange?: () => void;
	getCanvasElement?: () => Element | null | undefined;
	translate?: (key: string) => string;
}

function gleicheListe(a: WhiteboardObject[], b: WhiteboardObject[]): boolean {
	if (a.length !== b.length) return false;
	return a.every((obj, index) => {
		const andere = b[index];
		if (!andere) return false;
		return JSON.stringify(obj) === JSON.stringify(andere);
	});
}

export function useWhiteboardEditor(options: WhiteboardEditorOptions = {}) {
	const objects = ref<WhiteboardObject[]>([]);
	const selectedIds = ref<string[]>([]);
	const tool = ref<WhiteboardTool>("select");
	const color = ref("#1f2933");
	const fill = ref("#ffd966");
	const strokeWidth = ref(2);
	const camera = ref({ x: 0, y: 0, scale: 1 });
	const undoStack = ref<WhiteboardObject[][]>([]);
	const redoStack = ref<WhiteboardObject[][]>([]);
	const copyBuffer = ref<WhiteboardObject[]>([]);
	const lastClick = ref<Point | null>(null);
	const fileError = ref("");

	const canUndo = computed(() => undoStack.value.length > 0);
	const canRedo = computed(() => redoStack.value.length > 0);
	const hasSelection = computed(() => selectedIds.value.length > 0);

	function canEdit(): boolean {
		return options.canEdit?.() ?? true;
	}

	function translate(key: string): string {
		return options.translate?.(key) ?? key;
	}

	function changed(): void {
		options.afterChange?.();
	}

	function rememberState(): void {
		const stand = objects.value.map((obj) => ({ ...obj }));
		const vorher = undoStack.value[undoStack.value.length - 1];
		if (vorher && gleicheListe(vorher, stand)) return;
		undoStack.value = [...undoStack.value, stand];
		if (undoStack.value.length > MAX_HISTORY) {
			undoStack.value = undoStack.value.slice(-MAX_HISTORY);
		}
		redoStack.value = [];
	}

	function setObjects(neue: WhiteboardObject[], emitChange = true): void {
		objects.value = neue.map((obj) => ({ ...obj }));
		if (emitChange) changed();
	}

	function undo(): void {
		const vorher = undoStack.value.pop();
		if (!vorher) return;
		redoStack.value = [...redoStack.value, objects.value.map((obj) => ({ ...obj }))];
		objects.value = vorher;
		changed();
	}

	function redo(): void {
		const nachher = redoStack.value.pop();
		if (!nachher) return;
		undoStack.value = [...undoStack.value, objects.value.map((obj) => ({ ...obj }))];
		objects.value = nachher;
		changed();
	}

	function addObject(obj: WhiteboardObject): void {
		objects.value = [...objects.value, obj];
		changed();
	}

	function moveSelection(ids: string[], dx: number, dy: number): void {
		objects.value = moveObjects(objects.value, ids, dx, dy);
		changed();
	}

	function resizeObject(id: string, box: { x: number; y: number; w: number; h: number }): void {
		objects.value = objects.value.map((obj) => {
			if (obj.id !== id) return obj;
			const neu: WhiteboardObject = { ...obj, ...box };
			if (obj.type === "line") {
				neu.x2 = box.x + box.w;
				neu.y2 = box.y + box.h;
			}
			return neu;
		});
		changed();
	}

	function updateObject(obj: WhiteboardObject): void {
		objects.value = objects.value.map((alt) => (alt.id === obj.id ? obj : alt));
		changed();
	}

	function deleteObjects(ids: string[]): void {
		if (!ids.length || !canEdit()) return;
		rememberState();
		const zuLoeschen = new Set(ids);
		objects.value = objects.value.filter((obj) => !zuLoeschen.has(obj.id));
		selectedIds.value = selectedIds.value.filter((id) => !zuLoeschen.has(id));
		changed();
	}

	function deleteSelected(): void {
		deleteObjects(selectedIds.value);
	}

	function copySelection(): void {
		const gewaehlt = objects.value.filter((obj) => selectedIds.value.includes(obj.id));
		if (!gewaehlt.length) return;
		copyBuffer.value = gewaehlt;
		void copyToClipboard(serializeSelection(gewaehlt));
	}

	async function pasteSelection(): Promise<void> {
		let inhalt = copyBuffer.value;
		try {
			const text = await navigator.clipboard?.readText?.();
			const ausZwischenablage = text ? parseSelection(text) : [];
			if (ausZwischenablage.length) inhalt = ausZwischenablage;
		} catch {}
		if (!inhalt.length) return;
		rememberState();
		const kopien = inhalt.map((obj) => ({
			...obj,
			id: `${obj.id}_${Math.random().toString(36).slice(2, 8)}`,
			x: obj.x + 30,
			y: obj.y + 30,
			z: topZ(objects.value) + 1,
		}));
		objects.value = [...objects.value, ...kopien];
		selectedIds.value = kopien.map((obj) => obj.id);
		changed();
	}

	function duplicateSelected(): void {
		if (!selectedIds.value.length) return;
		rememberState();
		const vorher = objects.value.length;
		objects.value = duplicateObjects(objects.value, selectedIds.value, 24);
		selectedIds.value = objects.value
			.slice(vorher)
			.map((obj) => obj.id);
		changed();
	}

	function viewportCentre(): Point {
		const flaeche = options.getCanvasElement?.()?.getBoundingClientRect?.();
		const breite = flaeche?.width || 640;
		const hoehe = flaeche?.height || 400;
		const punkt = screenToWorld({ x: breite / 2, y: hoehe / 2 }, camera.value);
		return { x: punkt.x, y: punkt.y };
	}

	async function insertImage(file: File, pos?: Point): Promise<boolean> {
		if (!canEdit()) return false;
		try {
			const bild = await bildAusDatei(file);
			const z = topZ(objects.value) + 1;
			const ziel = pos ?? lastClick.value ?? viewportCentre();
			const obj = createObject("image", ziel.x - bild.w / 2, ziel.y - bild.h / 2, z, {
				src: bild.src,
				w: bild.w,
				h: bild.h,
			});
			rememberState();
			objects.value = [...objects.value, obj];
			selectedIds.value = [obj.id];
			changed();
			return true;
		} catch {
			return false;
		}
	}

	async function pasteImageOrSelection(): Promise<void> {
		const bild = await bildAusSystemZwischenablage();
		if (bild) {
			await insertImage(bild);
			return;
		}
		await pasteSelection();
	}

	async function pasteFromClipboardEvent(event: ClipboardEvent): Promise<boolean> {
		if (!canEdit() || istTexteingabe(document.activeElement)) return false;
		const datei = bilddateiAusZwischenablage(event.clipboardData);
		if (!datei) return false;
		event.preventDefault();
		return insertImage(datei);
	}

	function canvasClick(punkt: Point): void {
		lastClick.value = { x: punkt.x, y: punkt.y };
	}

	function saveFile(title: string): void {
		fileError.value = "";
		downloadTextFile(
			serializeWhiteboardFile(title, objects.value),
			whiteboardFileName(title),
		);
	}

	async function openFile(file: File): Promise<boolean> {
		fileError.value = "";
		try {
			const daten = parseWhiteboardFile(await readTextFile(file));
			if (!daten) {
				fileError.value = translate("whiteboard.fileInvalid");
				return false;
			}
			if (
				objects.value.length > 0 &&
				!window.confirm(translate("whiteboard.openConfirm"))
			) {
				return false;
			}
			rememberState();
			setObjects(daten.objects);
			selectedIds.value = [];
			await nextTick();
			return true;
		} catch {
			fileError.value = translate("whiteboard.fileReadFailed");
			return false;
		}
	}

	return {
		objects,
		selectedIds,
		tool,
		color,
		fill,
		strokeWidth,
		camera,
		undoStack,
		redoStack,
		fileError,
		canUndo,
		canRedo,
		hasSelection,
		rememberState,
		setObjects,
		undo,
		redo,
		addObject,
		moveSelection,
		resizeObject,
		updateObject,
		deleteObjects,
		deleteSelected,
		copySelection,
		pasteSelection,
		duplicateSelected,
		insertImage,
		pasteImageOrSelection,
		pasteFromClipboardEvent,
		canvasClick,
		saveFile,
		openFile,
	};
}
