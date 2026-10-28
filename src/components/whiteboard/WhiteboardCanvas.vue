<script setup lang="ts">
// Die Zeichenflaeche des Whiteboards.
//
// Alle Objekte werden als SVG gezeichnet und liegen in "Weltkoordinaten".
// Die Kamera (Verschiebung und Zoom) liegt als Transform ueber der Gruppe
// <g>, damit sich alles gemeinsam verschieben und vergroessern laesst.

import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import type {
	WhiteboardCursor,
	WhiteboardObject,
	WhiteboardPenStroke,
	WhiteboardTool,
} from "@/types/whiteboard";
import {
	clampZoom,
	createObject,
	fitCamera,
	hitTest,
	objectBounds,
	objectsInRect,
	screenToWorld,
	topZ,
	worldToScreen,
	wrapText,
	type Point,
} from "@/utils/whiteboard";

const props = defineProps<{
	objects: WhiteboardObject[];
	selectedIds: string[];
	tool: WhiteboardTool;
	camera: { x: number; y: number; scale: number };
	color: string;
	fill: string;
	strokeWidth: number;
	cursors: WhiteboardCursor[];
	penPreviews?: WhiteboardObject[];
	canEdit: boolean;
}>();

const emit = defineEmits<{
	(e: "camera-change", camera: { x: number; y: number; scale: number }): void;
	(e: "select", ids: string[]): void;
	(e: "create", obj: WhiteboardObject): void;
	(e: "move", ids: string[], dx: number, dy: number): void;
	(e: "resize", id: string, box: { x: number; y: number; w: number; h: number }): void;
	(e: "update", obj: WhiteboardObject): void;
	(e: "tool-change", tool: WhiteboardTool): void;
	(e: "interaction-start"): void;
	(e: "interaction-end"): void;
	(e: "cursor", punkt: Point): void;
	(e: "pen-start", stroke: WhiteboardPenStroke): void;
	(e: "pen-points", id: string, points: number[]): void;
	(e: "pen-cancel", id: string): void;
	(e: "erase", ids: string[]): void;
	(e: "canvas-click", punkt: Point): void;
}>();

const svg = ref<SVGSVGElement | null>(null);

type Ecke = "nw" | "ne" | "sw" | "se";

type Ziehen =
	| { mode: "bewegen"; ids: string[]; letzte: Point }
	| { mode: "schieben"; start: Point; kamera: Point }
	| { mode: "rahmen"; start: Point; aktuell: Point }
	| { mode: "zeichnen"; start: Point; obj: WhiteboardObject }
	| { mode: "groesse"; id: string; ecke: Ecke; box: { x: number; y: number; w: number; h: number } }
	| { mode: "radieren"; geloescht: Set<string> };

const ziehen = ref<Ziehen | null>(null);
const entwurf = ref<WhiteboardObject | null>(null);
const editor = ref<{ id: string; wert: string } | null>(null);
const editorRef = ref<HTMLTextAreaElement | null>(null);

function editorOeffnen(id: string): void {
	const obj = props.objects.find((o) => o.id === id);
	if (!obj || (obj.type !== "note" && obj.type !== "text")) return;
	editor.value = { id, wert: obj.text ?? "" };
	nextTick(() => {
		const element = editorRef.value;
		if (!element) return;
		element.focus();
		element.select();
	});
}

const PEN_SEND_INTERVAL = 60;
let penPunkte: number[] = [];
let penTimer: number | null = null;
let letztePenSendung = 0;

function penPunkteSenden(sofort = false): void {
	const aktueller = ziehen.value;
	if (aktueller?.mode !== "zeichnen" || aktueller.obj.type !== "pen") return;
	if (!penPunkte.length) return;
	if (penTimer !== null) {
		window.clearTimeout(penTimer);
		penTimer = null;
	}
	const jetzt = Date.now();
	const wartezeit = PEN_SEND_INTERVAL - (jetzt - letztePenSendung);
	if (!sofort && wartezeit > 0) {
		penTimer = window.setTimeout(() => {
			penTimer = null;
			penPunkteSenden(true);
		}, wartezeit);
		return;
	}
	letztePenSendung = jetzt;
	const punkte = penPunkte;
	penPunkte = [];
	emit("pen-points", aktueller.obj.id, punkte);
}

function penZuruecksetzen(): void {
	if (penTimer !== null) {
		window.clearTimeout(penTimer);
		penTimer = null;
	}
	penPunkte = [];
	letztePenSendung = 0;
}

const sortierte = computed(() => [...props.objects].sort((a, b) => a.z - b.z));

const auswahlBounds = computed(() => {
	const gewaehlt = props.objects.filter((obj) => props.selectedIds.includes(obj.id));
	if (!gewaehlt.length) return null;
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	for (const obj of gewaehlt) {
		const b = objectBounds(obj);
		minX = Math.min(minX, b.x);
		minY = Math.min(minY, b.y);
		maxX = Math.max(maxX, b.x + b.w);
		maxY = Math.max(maxY, b.y + b.h);
	}
	return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
});

const rahmenRechteck = computed(() => {
	if (ziehen.value?.mode !== "rahmen") return null;
	const { start, aktuell } = ziehen.value;
	return {
		x: Math.min(start.x, aktuell.x),
		y: Math.min(start.y, aktuell.y),
		w: Math.abs(aktuell.x - start.x),
		h: Math.abs(aktuell.y - start.y),
	};
});

/** Textzeilen eines Objekts (fuer die Anzeige im SVG). */
function zeilen(obj: WhiteboardObject): string[] {
	const text = obj.text ?? "";
	if (!text) return [];
	const fontSize = obj.fontSize ?? 20;
	const breite = obj.type === "note" ? Math.max(20, obj.w - 32) : Math.max(20, obj.w);
	return wrapText(text, breite, fontSize, obj.type === "note");
}

/** Bildschirmposition eines Punktes (fuer Cursor und Textbearbeitung). */
function bildschirm(punkt: Point): Point {
	return worldToScreen(punkt, props.camera);
}

/** Zeigerposition in Weltkoordinaten. */
function weltPunkt(event: { clientX: number; clientY: number }): Point {
	const flaeche = svg.value?.getBoundingClientRect();
	const x = event.clientX - (flaeche?.left ?? 0);
	const y = event.clientY - (flaeche?.top ?? 0);
	return screenToWorld({ x, y }, props.camera);
}

function handleGroesse(): number {
	return 9 / props.camera.scale;
}

function ecken(box: { x: number; y: number; w: number; h: number }) {
	return [
		{ ecke: "nw" as Ecke, x: box.x, y: box.y },
		{ ecke: "ne" as Ecke, x: box.x + box.w, y: box.y },
		{ ecke: "sw" as Ecke, x: box.x, y: box.y + box.h },
		{ ecke: "se" as Ecke, x: box.x + box.w, y: box.y + box.h },
	];
}

/** Das oberste Objekt unter dem Zeiger. */
function trefferObjekt(punkt: Point): WhiteboardObject | null {
	const sortiert = [...props.objects].sort((a, b) => a.z - b.z);
	const toleranz = 8 / props.camera.scale;
	for (let i = sortiert.length - 1; i >= 0; i -= 1) {
		const obj = sortiert[i];
		const grenze = objectBounds(obj);
		const imUmfeld =
			punkt.x >= grenze.x - toleranz &&
			punkt.x <= grenze.x + grenze.w + toleranz &&
			punkt.y >= grenze.y - toleranz &&
			punkt.y <= grenze.y + grenze.h + toleranz;
		if (!imUmfeld) continue;
		if (obj.type === "ellipse" || obj.type === "line" || obj.type === "pen") {
			if (hitTest(obj, punkt.x, punkt.y, toleranz)) return obj;
		} else if (
			punkt.x >= obj.x &&
			punkt.x <= obj.x + obj.w &&
			punkt.y >= obj.y &&
			punkt.y <= obj.y + obj.h
		) {
			return obj;
		}
	}
	return null;
}

function onPointerDown(event: PointerEvent): void {
	if (event.button === 1 || props.tool === "hand") {
		ziehen.value = {
			mode: "schieben",
			start: { x: event.clientX, y: event.clientY },
			kamera: { x: props.camera.x, y: props.camera.y },
		};
		svg.value?.setPointerCapture?.(event.pointerId);
		return;
	}
	if (event.button !== 0) return;
	// Ohne Berechtigung (z.B. wenn das Board nicht gefunden wurde) wird nichts
	// gezeichnet.
	if (!props.canEdit && props.tool !== "select") return;

	const punkt = weltPunkt(event);
	emit("canvas-click", punkt);
	const add = event.shiftKey;

	if (props.tool === "eraser") {
		if (!props.canEdit) return;
		const treffer = trefferObjekt(punkt);
		if (treffer) {
			emit("interaction-start");
			emit("erase", [treffer.id]);
			ziehen.value = { mode: "radieren", geloescht: new Set([treffer.id]) };
		} else {
			ziehen.value = { mode: "radieren", geloescht: new Set() };
		}
		svg.value?.setPointerCapture?.(event.pointerId);
		return;
	}

	if (props.tool === "select") {
		const treffer = trefferObjekt(punkt);
		if (treffer) {
			let ids = props.selectedIds;
			if (add) {
				ids = ids.includes(treffer.id)
					? ids.filter((id) => id !== treffer.id)
					: [...ids, treffer.id];
			} else if (!ids.includes(treffer.id)) {
				ids = [treffer.id];
			}
			emit("select", ids);
			emit("interaction-start");
			ziehen.value = { mode: "bewegen", ids, letzte: punkt };
		} else {
			if (!add) emit("select", []);
			emit("interaction-start");
			ziehen.value = { mode: "rahmen", start: punkt, aktuell: punkt };
		}
		svg.value?.setPointerCapture?.(event.pointerId);
		return;
	}

	if (props.tool === "note" || props.tool === "text") {
		const z = topZ(props.objects) + 1;
		const obj =
			props.tool === "note"
				? createObject("note", punkt.x, punkt.y, z, {
						color: props.color,
						fill: props.fill,
					})
				: createObject("text", punkt.x, punkt.y, z, { color: props.color });
		emit("interaction-start");
		emit("create", obj);
		emit("select", [obj.id]);
		emit("tool-change", "select");
		ziehen.value = null;
		editorOeffnen(obj.id);
		return;
	}

	if (
		props.tool === "rect" ||
		props.tool === "ellipse" ||
		props.tool === "line" ||
		props.tool === "pen"
	) {
		const z = topZ(props.objects) + 1;
		const obj = createObject(props.tool, punkt.x, punkt.y, z, {
			color: props.color,
			strokeWidth: props.strokeWidth,
		});
		emit("interaction-start");
		entwurf.value = obj;
		ziehen.value = { mode: "zeichnen", start: punkt, obj };
		if (obj.type === "pen") {
			penZuruecksetzen();
			emit("pen-start", {
				id: obj.id,
				x: obj.x,
				y: obj.y,
				z: obj.z,
				color: obj.color,
				strokeWidth: obj.strokeWidth,
				author: obj.author,
			});
		}
		svg.value?.setPointerCapture?.(event.pointerId);
	}
}

function onPointerMove(event: PointerEvent): void {
	const punkt = weltPunkt(event);
	emit("cursor", punkt);
	const aktueller = ziehen.value;
	if (!aktueller) return;

	if (aktueller.mode === "schieben") {
		emit("camera-change", {
			...props.camera,
			x: aktueller.kamera.x + (event.clientX - aktueller.start.x),
			y: aktueller.kamera.y + (event.clientY - aktueller.start.y),
		});
		return;
	}

	if (aktueller.mode === "bewegen") {
		const dx = punkt.x - aktueller.letzte.x;
		const dy = punkt.y - aktueller.letzte.y;
		aktueller.letzte = punkt;
		if (dx !== 0 || dy !== 0) emit("move", aktueller.ids, dx, dy);
		return;
	}

	if (aktueller.mode === "rahmen") {
		aktueller.aktuell = punkt;
		return;
	}

	if (aktueller.mode === "radieren") {
		if (!props.canEdit) return;
		const treffer = trefferObjekt(punkt);
		if (treffer && !aktueller.geloescht.has(treffer.id)) {
			aktueller.geloescht.add(treffer.id);
			emit("erase", [treffer.id]);
		}
		return;
	}

	if (aktueller.mode === "groesse") {
		const box = aktueller.box;
		let x = box.x;
		let y = box.y;
		let w = box.w;
		let h = box.h;
		if (aktueller.ecke === "nw" || aktueller.ecke === "sw") {
			x = Math.min(punkt.x, box.x + box.w - 20);
			w = box.x + box.w - x;
		}
		if (aktueller.ecke === "ne" || aktueller.ecke === "se") {
			w = Math.max(20, punkt.x - box.x);
		}
		if (aktueller.ecke === "nw" || aktueller.ecke === "ne") {
			y = Math.min(punkt.y, box.y + box.h - 20);
			h = box.y + box.h - y;
		}
		if (aktueller.ecke === "sw" || aktueller.ecke === "se") {
			h = Math.max(20, punkt.y - box.y);
		}
		emit("resize", aktueller.id, { x, y, w, h });
		return;
	}

	if (aktueller.mode === "zeichnen") {
		const obj = aktueller.obj;
		if (obj.type === "pen") {
			const punkte = obj.points ?? [];
			const neue = [punkt.x - obj.x, punkt.y - obj.y];
			punkte.push(...neue);
			obj.points = punkte;
			penPunkte.push(...neue);
			penPunkteSenden();
		} else if (obj.type === "line") {
			obj.x2 = punkt.x;
			obj.y2 = punkt.y;
			obj.w = punkt.x - obj.x;
			obj.h = punkt.y - obj.y;
		} else {
			obj.w = punkt.x - obj.x;
			obj.h = punkt.y - obj.y;
		}
		entwurf.value = { ...obj };
	}
}

function onPointerUp(): void {
	const aktueller = ziehen.value;
	if (aktueller?.mode === "zeichnen" && aktueller.obj.type === "pen") {
		penPunkteSenden(true);
	}
	if (aktueller?.mode === "radieren") {
		ziehen.value = null;
		emit("interaction-end");
		return;
	}
	ziehen.value = null;
	if (!aktueller) return;
	emit("interaction-end");

	if (aktueller.mode === "rahmen") {
		const rechteck = {
			x: Math.min(aktueller.start.x, aktueller.aktuell.x),
			y: Math.min(aktueller.start.y, aktueller.aktuell.y),
			w: Math.abs(aktueller.aktuell.x - aktueller.start.x),
			h: Math.abs(aktueller.aktuell.y - aktueller.start.y),
		};
		if (rechteck.w < 3 && rechteck.h < 3) return;
		const treffer = objectsInRect(props.objects, rechteck).map((obj) => obj.id);
		emit("select", treffer);
		return;
	}

	if (aktueller.mode !== "zeichnen") return;

	const obj = aktueller.obj;
	entwurf.value = null;

	if (obj.type === "pen") {
		if ((obj.points?.length ?? 0) >= 4) {
			emit("create", obj);
		} else {
			emit("pen-cancel", obj.id);
		}
		penZuruecksetzen();
		return;
	}

	if (obj.type === "line") {
		const x2 = obj.x2 ?? obj.x;
		const y2 = obj.y2 ?? obj.y;
		if (Math.hypot(x2 - obj.x, y2 - obj.y) < 4) {
			obj.x2 = obj.x + 160;
			obj.y2 = obj.y;
			obj.w = 160;
			obj.h = 0;
		}
		emit("create", obj);
		emit("select", [obj.id]);
		emit("tool-change", "select");
		return;
	}

	const breite = Math.abs(obj.w);
	const hoehe = Math.abs(obj.h);
	obj.x = Math.min(obj.x, obj.x + obj.w);
	obj.y = Math.min(obj.y, obj.y + obj.h);
	obj.w = breite < 8 ? 180 : breite;
	obj.h = hoehe < 8 ? 120 : hoehe;
	emit("create", obj);
	emit("select", [obj.id]);
	emit("tool-change", "select");
}

function onPointerCancel(): void {
	const aktueller = ziehen.value;
	if (aktueller?.mode === "zeichnen" && aktueller.obj.type === "pen") {
		penZuruecksetzen();
		emit("pen-cancel", aktueller.obj.id);
		entwurf.value = null;
		ziehen.value = null;
		emit("interaction-end");
		return;
	}
	if (aktueller?.mode === "radieren") {
		ziehen.value = null;
		emit("interaction-end");
		return;
	}
	if (aktueller) {
		entwurf.value = null;
		ziehen.value = null;
		emit("interaction-end");
		return;
	}
	ziehen.value = null;
	entwurf.value = null;
}

const TASTEN_SCHRITT = 10;
const TASTEN_SCHRITT_GROSS = 50;
const PFEIL_TAKT = 150;
const PFEILRICHTUNG: Record<string, Point> = {
	ArrowLeft: { x: -1, y: 0 },
	ArrowRight: { x: 1, y: 0 },
	ArrowUp: { x: 0, y: -1 },
	ArrowDown: { x: 0, y: 1 },
};

const gedruecktePfeile = new Set<string>();
let pfeiltastenTimer: number | null = null;
let pfeiltastenShift = false;
let pfeiltastenObjekteBewegt = false;

function eingabeFokussiert(): boolean {
	const element = document.activeElement;
	if (!(element instanceof HTMLElement)) return false;
	if (element.isContentEditable) return true;
	if (element instanceof HTMLTextAreaElement) return !element.readOnly && !element.disabled;
	if (element instanceof HTMLInputElement) {
		if (element.readOnly || element.disabled) return false;
		return ["text", "search", "email", "url", "tel", "password", "number"].includes(
			element.type,
		);
	}
	return false;
}

function pfeiltastenInteraktionBeendet(): void {
	if (pfeiltastenTimer !== null) {
		window.clearTimeout(pfeiltastenTimer);
		pfeiltastenTimer = null;
	}
	if (pfeiltastenObjekteBewegt) {
		emit("interaction-end");
		pfeiltastenObjekteBewegt = false;
	}
	gedruecktePfeile.clear();
	pfeiltastenShift = false;
}

function pfeiltastenBewegen(): void {
	if (
		ziehen.value ||
		eingabeFokussiert() ||
		gedruecktePfeile.size === 0 ||
		(!props.canEdit && props.selectedIds.length)
	) {
		pfeiltastenInteraktionBeendet();
		return;
	}

	const richtungSchluessel = Array.from(gedruecktePfeile).at(-1);
	const richtung = richtungSchluessel ? PFEILRICHTUNG[richtungSchluessel] : null;
	if (!richtung) {
		pfeiltastenInteraktionBeendet();
		return;
	}

	const schritt = pfeiltastenShift ? TASTEN_SCHRITT_GROSS : TASTEN_SCHRITT;
	if (props.canEdit && props.selectedIds.length) {
		if (!pfeiltastenObjekteBewegt) {
			emit("interaction-start");
			pfeiltastenObjekteBewegt = true;
		}
		const skalierung = Math.max(0.0001, props.camera.scale);
		const dx = (richtung.x * schritt) / skalierung;
		const dy = (richtung.y * schritt) / skalierung;
		emit("move", props.selectedIds, dx, dy);
	} else if (!props.selectedIds.length) {
		emit("camera-change", {
			...props.camera,
			x: props.camera.x + richtung.x * schritt,
			y: props.camera.y + richtung.y * schritt,
		});
	} else {
		pfeiltastenInteraktionBeendet();
		return;
	}

	pfeiltastenTimer = window.setTimeout(pfeiltastenBewegen, PFEIL_TAKT);
}

function beiTaste(event: KeyboardEvent): void {
	if (
		event.defaultPrevented ||
		event.isComposing ||
		event.ctrlKey ||
		event.metaKey ||
		event.altKey
	) {
		return;
	}
	if (eingabeFokussiert() || ziehen.value) {
		pfeiltastenInteraktionBeendet();
		return;
	}
	const richtung = PFEILRICHTUNG[event.key];
	if (!richtung) return;
	event.preventDefault();

	if (event.type === "keyup") {
		gedruecktePfeile.delete(event.key);
		if (gedruecktePfeile.size === 0) {
			pfeiltastenInteraktionBeendet();
		}
		return;
	}

	pfeiltastenShift = event.shiftKey;
	if (!gedruecktePfeile.has(event.key)) {
		gedruecktePfeile.add(event.key);
		if (pfeiltastenTimer === null) {
			pfeiltastenBewegen();
			return;
		}
		return;
	}
}

onMounted(() => {
	window.addEventListener("keydown", beiTaste);
	window.addEventListener("keyup", beiTaste);
});
onBeforeUnmount(() => {
	window.removeEventListener("keydown", beiTaste);
	window.removeEventListener("keyup", beiTaste);
	pfeiltastenInteraktionBeendet();
});

onBeforeUnmount(penZuruecksetzen);

function onPointerDownHandle(event: PointerEvent, ecke: Ecke, id: string): void {
	const obj = props.objects.find((o) => o.id === id);
	if (!obj) return;
	const box = objectBounds(obj);
	emit("interaction-start");
	ziehen.value = {
		mode: "groesse",
		id,
		ecke,
		box: { x: box.x, y: box.y, w: box.w, h: box.h },
	};
	svg.value?.setPointerCapture?.(event.pointerId);
	event.stopPropagation();
}

function onWheel(event: WheelEvent): void {
	const flaeche = svg.value?.getBoundingClientRect();
	const bildschirmX = event.clientX - (flaeche?.left ?? 0);
	const bildschirmY = event.clientY - (flaeche?.top ?? 0);
	if (event.ctrlKey || event.metaKey) {
		const punkt = screenToWorld({ x: bildschirmX, y: bildschirmY }, props.camera);
		const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
		const scale = clampZoom(props.camera.scale * factor);
		// Der Punkt unter dem Zeiger bleibt an derselben Stelle.
		emit("camera-change", {
			scale,
			x: bildschirmX - punkt.x * scale,
			y: bildschirmY - punkt.y * scale,
		});
		return;
	}
	emit("camera-change", {
		...props.camera,
		x: props.camera.x - event.deltaX,
		y: props.camera.y - event.deltaY,
	});
}

function onDblClick(event: MouseEvent): void {
	if (!props.canEdit) return;
	const punkt = weltPunkt(event);
	const treffer = trefferObjekt(punkt);
	if (!treffer || (treffer.type !== "note" && treffer.type !== "text")) return;
	emit("select", [treffer.id]);
	emit("interaction-start");
	editorOeffnen(treffer.id);
}

const editorObjekt = computed(() => {
	if (!editor.value) return null;
	return props.objects.find((obj) => obj.id === editor.value?.id) ?? null;
});

const editorRechteck = computed(() => {
	const obj = editorObjekt.value;
	if (!obj) return null;
	const links = bildschirm({ x: obj.x, y: obj.y });
	const scale = props.camera.scale;
	const padding = obj.type === "note" ? 16 : 4;
	return {
		left: `${links.x + padding * scale}px`,
		top: `${links.y + padding * scale}px`,
		width: `${Math.max(40, (obj.w - padding * 2) * scale)}px`,
		height: `${Math.max(24, (obj.h - padding * 2) * scale)}px`,
		fontSize: `${(obj.fontSize ?? 20) * scale}px`,
	};
});

function editorSpeichern(): void {
	const aktueller = editor.value;
	const obj = editorObjekt.value;
	editor.value = null;
	if (!aktueller || !obj) return;
	emit("update", { ...obj, text: aktueller.wert });
	emit("interaction-end");
}

function editorAbbrechen(): void {
	editor.value = null;
}

function aufEditorInput(event: Event): void {
	if (!editor.value) return;
	editor.value = { ...editor.value, wert: (event.target as HTMLTextAreaElement).value };
}

function aufEditorKey(event: KeyboardEvent): void {
	if (event.key === "Escape") {
		event.preventDefault();
		editorAbbrechen();
	}
	if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
		event.preventDefault();
		editorSpeichern();
	}
}

/** Punkte eines Freihand-Objekts als Zeichenkette fuer <polyline>. */
function punktKette(obj: WhiteboardObject): string {
	const punkte = obj.points ?? [];
	const teile: string[] = [];
	for (let i = 0; i + 1 < punkte.length; i += 2) {
		teile.push(`${obj.x + punkte[i]},${obj.y + punkte[i + 1]}`);
	}
	return teile.join(" ");
}

function viewportGroesse(): { breite: number; hoehe: number } {
	const flaeche = svg.value?.getBoundingClientRect();
	return {
		breite: flaeche?.width || 800,
		hoehe: flaeche?.height || 600,
	};
}

/** Vergroessert oder verkleinert die Ansicht um die Mitte herum. */
function zoomBy(faktor: number): void {
	const { breite, hoehe } = viewportGroesse();
	const mittelpunktX = breite / 2;
	const mittelpunktY = hoehe / 2;
	const scale = clampZoom(props.camera.scale * faktor);
	const verhaeltnis = scale / props.camera.scale;
	emit("camera-change", {
		scale,
		x: mittelpunktX - (mittelpunktX - props.camera.x) * verhaeltnis,
		y: mittelpunktY - (mittelpunktY - props.camera.y) * verhaeltnis,
	});
}

/** Richtet die Ansicht auf den Inhalt aus. */
function fitToContent(): void {
	const { breite, hoehe } = viewportGroesse();
	emit("camera-change", fitCamera(props.objects, breite, hoehe));
}

defineExpose({ zoomBy, fitToContent });
</script>

<template>
	<div class="wb-board">
		<svg
			ref="svg"
			class="wb-canvas"
			:class="{ 'wb-canvas--draw': tool === 'pen', 'wb-canvas--erase': tool === 'eraser' }"
			xmlns="http://www.w3.org/2000/svg"
			@pointerdown="onPointerDown"
			@pointermove="onPointerMove"
			@pointerup="onPointerUp"
			@pointercancel="onPointerCancel"
			@dblclick="onDblClick"
			@wheel.prevent="onWheel"
		>
			<defs>
				<pattern
					id="wb-punkte"
					:width="24 / camera.scale"
					:height="24 / camera.scale"
					patternUnits="userSpaceOnUse"
					:patternTransform="`translate(${camera.x}, ${camera.y}) scale(${camera.scale})`"
				>
					<circle cx="1.5" cy="1.5" r="1.5" fill="#c9ced6" />
				</pattern>
				<marker
					id="wb-pfeil"
					viewBox="0 0 10 10"
					refX="9"
					refY="5"
					markerWidth="6"
					markerHeight="6"
					orient="auto-start-reverse"
				>
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#1f2933" />
				</marker>
			</defs>

			<rect
				class="wb-canvas__hintergrund"
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill="url(#wb-punkte)"
			/>

			<g :transform="`translate(${camera.x}, ${camera.y}) scale(${camera.scale})`">
				<g v-for="obj in sortierte" :key="obj.id">
					<!-- Sticky Note -->
					<g v-if="obj.type === 'note'">
						<rect
							:x="obj.x"
							:y="obj.y"
							:width="obj.w"
							:height="obj.h"
							:fill="obj.fill ?? '#ffd966'"
							stroke="transparent"
							stroke-width="2"
							rx="4"
						/>
						<text
							:x="obj.x + 16"
							:y="obj.y + 16 + (obj.fontSize ?? 20)"
							:font-size="obj.fontSize ?? 20"
							:fill="obj.color"
							font-family="'Open Sans', system-ui, sans-serif"
							font-weight="600"
						>
							<tspan
								v-for="(zeile, index) in zeilen(obj)"
								:key="index"
								:x="obj.x + 16"
								:dy="index === 0 ? 0 : (obj.fontSize ?? 20) * 1.3"
							>{{ zeile }}</tspan>
						</text>
					</g>

					<!-- Text -->
					<g v-else-if="obj.type === 'text'">
						<text
							:x="obj.x"
							:y="obj.y + (obj.fontSize ?? 20)"
							:font-size="obj.fontSize ?? 20"
							:fill="obj.color"
							font-family="'Open Sans', system-ui, sans-serif"
						>
							<tspan
								v-for="(zeile, index) in zeilen(obj)"
								:key="index"
								:x="obj.x"
								:dy="index === 0 ? 0 : (obj.fontSize ?? 20) * 1.3"
							>{{ zeile }}</tspan>
						</text>
					</g>

					<!-- Rechteck -->
					<rect
						v-else-if="obj.type === 'rect'"
						:x="obj.x"
						:y="obj.y"
						:width="obj.w"
						:height="obj.h"
						:stroke="obj.color"
						:stroke-width="obj.strokeWidth ?? 2"
						fill="none"
					/>

					<!-- Ellipse -->
					<ellipse
						v-else-if="obj.type === 'ellipse'"
						:cx="obj.x + obj.w / 2"
						:cy="obj.y + obj.h / 2"
						:rx="obj.w / 2"
						:ry="obj.h / 2"
						:stroke="obj.color"
						:stroke-width="obj.strokeWidth ?? 2"
						fill="none"
					/>

					<!-- Linie -->
					<line
						v-else-if="obj.type === 'line'"
						:x1="obj.x"
						:y1="obj.y"
						:x2="obj.x2 ?? obj.x + obj.w"
						:y2="obj.y2 ?? obj.y"
						:stroke="obj.color"
						:stroke-width="obj.strokeWidth ?? 2"
						stroke-linecap="round"
					/>

					<!-- Freihand -->
					<polyline
						v-else-if="obj.type === 'pen'"
						:points="punktKette(obj)"
						:stroke="obj.color"
						:stroke-width="obj.strokeWidth ?? 2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>

					<!-- Bild -->
					<image
						v-else-if="obj.type === 'image'"
						:x="obj.x"
						:y="obj.y"
						:width="obj.w"
						:height="obj.h"
						:href="obj.src"
						preserveAspectRatio="none"
					/>
				</g>

				<!-- Entwurf (wird gerade gezeichnet) -->
				<g v-if="entwurf">
					<rect
						v-if="entwurf.type === 'rect'"
						:x="entwurf.x"
						:y="entwurf.y"
						:width="entwurf.w"
						:height="entwurf.h"
						:stroke="entwurf.color"
						:stroke-width="entwurf.strokeWidth ?? 2"
						fill="none"
					/>
					<ellipse
						v-else-if="entwurf.type === 'ellipse'"
						:cx="entwurf.x + entwurf.w / 2"
						:cy="entwurf.y + entwurf.h / 2"
						:rx="Math.abs(entwurf.w / 2)"
						:ry="Math.abs(entwurf.h / 2)"
						:stroke="entwurf.color"
						:stroke-width="entwurf.strokeWidth ?? 2"
						fill="none"
					/>
					<line
						v-else-if="entwurf.type === 'line'"
						:x1="entwurf.x"
						:y1="entwurf.y"
						:x2="entwurf.x2 ?? entwurf.x"
						:y2="entwurf.y2 ?? entwurf.y"
						:stroke="entwurf.color"
						:stroke-width="entwurf.strokeWidth ?? 2"
					/>
					<polyline
						v-else-if="entwurf.type === 'pen'"
						:points="punktKette(entwurf)"
						:stroke="entwurf.color"
						:stroke-width="entwurf.strokeWidth ?? 2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>

				<!-- Laufende Striche der anderen Teilnehmer -->
				<g v-for="preview in penPreviews ?? []" :key="`pen-preview-${preview.id}`">
					<polyline
						v-if="preview.type === 'pen'"
						:points="punktKette(preview)"
						:stroke="preview.color"
						:stroke-width="preview.strokeWidth ?? 2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>

				<!-- Auswahl -->
				<g v-if="auswahlBounds">
					<rect
						:x="auswahlBounds.x"
						:y="auswahlBounds.y"
						:width="auswahlBounds.w"
						:height="auswahlBounds.h"
						fill="none"
						stroke="#2f6fed"
						stroke-width="1"
						stroke-dasharray="4 3"
						vector-effect="non-scaling-stroke"
					/>
					<template v-if="selectedIds.length === 1">
						<rect
							v-for="ecke in ecken(auswahlBounds)"
							:key="ecke.ecke"
							:x="ecke.x - handleGroesse() / 2"
							:y="ecke.y - handleGroesse() / 2"
							:width="handleGroesse()"
							:height="handleGroesse()"
							fill="#fff"
							stroke="#2f6fed"
							stroke-width="1"
							class="wb-handle"
							@pointerdown="onPointerDownHandle($event, ecke.ecke, selectedIds[0])"
						/>
					</template>
				</g>

				<!-- Auswahl mit der Maus -->
				<rect
					v-if="rahmenRechteck"
					:x="rahmenRechteck.x"
					:y="rahmenRechteck.y"
					:width="rahmenRechteck.w"
					:height="rahmenRechteck.h"
					fill="rgba(47, 111, 237, 0.12)"
					stroke="#2f6fed"
					stroke-width="1"
					vector-effect="non-scaling-stroke"
				/>
			</g>

			<!-- Cursor der anderen Teilnehmer (Bildschirmkoordinaten) -->
			<g v-for="cursor in cursors" :key="cursor.participant.id">
				<g
					:transform="`translate(${bildschirm({ x: cursor.x, y: cursor.y }).x}, ${bildschirm({ x: cursor.x, y: cursor.y }).y})`"
				>
					<path
						d="M 0 0 L 0 16 L 5 12 L 9 20 L 12 18 L 8 10 L 15 10 Z"
						:fill="cursor.participant.color"
					/>
					<text x="14" y="26" :fill="cursor.participant.color" font-size="13" font-weight="600">
						{{ cursor.participant.name }}
					</text>
				</g>
			</g>
		</svg>

		<!-- Textbearbeitung -->
		<textarea
			v-if="editor && editorRechteck"
			ref="editorRef"
			class="wb-editor"
			:style="editorRechteck"
			:value="editor.wert"
			@input="aufEditorInput"
			@blur="editorSpeichern"
			@keydown="aufEditorKey"
		></textarea>
	</div>
</template>
