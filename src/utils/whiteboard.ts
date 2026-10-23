// Reine Logik des Whiteboards: Objekte anlegen, Aenderungen berechnen,
// Trefferpunkte bestimmen, Text umbrechen. Alles ohne Vue, damit es leicht
// getestet werden kann (siehe whiteboard.test.ts).

import type {
	WhiteboardObject,
	WhiteboardObjectType,
	WhiteboardPatch,
} from "@/types/whiteboard";

export const WHITEBOARD_FONT =
	"'Open Sans', 'Segoe UI', system-ui, -apple-system, sans-serif";

/** Farben fuer Fuellung und Linien (wie bei Miro). */
export const WHITEBOARD_COLORS = [
	"#ffffff",
	"#ffd966",
	"#f8cecc",
	"#c9daf8",
	"#b6d7a8",
	"#e6b8af",
	"#d9d2e9",
	"#ffe599",
	"#93c47d",
	"#76a5af",
];

export const WHITEBOARD_STROKE_WIDTHS = [1, 2, 4, 8];

export const NOTE_WIDTH = 200;
export const NOTE_HEIGHT = 200;

export const DEFAULT_FONT_SIZE = 20;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 4;
export const MAX_PATCH_ITEMS = 200;

export interface Point {
	x: number;
	y: number;
}

/** Kurze, eindeutige Kennung fuer ein Objekt. */
export function newId(prefix = "o"): string {
	const zufall = Math.random().toString(36).slice(2, 10);
	return `${prefix}_${Date.now().toString(36)}_${zufall}`;
}

/** Hoechstes Z (Ebenenreihenfolge) der Objekte. */
export function topZ(objects: WhiteboardObject[]): number {
	return objects.reduce((max, obj) => Math.max(max, obj.z), 0);
}

/** Obergrenze fuer Freihandpunkte, passend zur Serverpruefung. */
export const MAX_PEN_POINTS = 4000;

/** Haengt neue Punkte an einen Stiftstrich an und begrenzt die Gesamtzahl. */
export function appendPenPoints(
	obj: WhiteboardObject,
	points: number[],
	max = MAX_PEN_POINTS,
): WhiteboardObject {
	if (!points.length) return obj;
	const vorhandene = obj.points ?? [];
	const zusammen = [...vorhandene, ...points].slice(0, Math.max(0, max));
	if (zusammen.length % 2 !== 0) zusammen.pop();
	return { ...obj, points: zusammen };
}

export interface CreateObjectOptions {
	color?: string;
	fill?: string;
	strokeWidth?: number;
	text?: string;
	fontSize?: number;
	w?: number;
	h?: number;
	author?: string;
	/** Freihand: flache Liste x0,y0,x1,y1,... */
	points?: number[];
	/** Bild: Daten-URL. */
	src?: string;
}

/** Legt ein neues Objekt an (Sticky Note, Text, Rechteck, ...). */
export function createObject(
	type: WhiteboardObjectType,
	x: number,
	y: number,
	z: number,
	options: CreateObjectOptions = {},
): WhiteboardObject {
	const obj: WhiteboardObject = {
		id: newId(),
		type,
		x,
		y,
		w: options.w ?? 0,
		h: options.h ?? 0,
		z,
		color: options.color ?? "#1f2933",
	};
	if (options.fill !== undefined) obj.fill = options.fill;
	if (options.strokeWidth !== undefined) obj.strokeWidth = options.strokeWidth;
	if (options.text !== undefined) obj.text = options.text;
	if (options.fontSize !== undefined) obj.fontSize = options.fontSize;
	if (options.author !== undefined) obj.author = options.author;
	if (options.src !== undefined) obj.src = options.src;

	switch (type) {
		case "note":
			obj.w = options.w ?? NOTE_WIDTH;
			obj.h = options.h ?? NOTE_HEIGHT;
			obj.color = options.color ?? "#1f2933";
			obj.fill = options.fill ?? "#ffd966";
			obj.fontSize = options.fontSize ?? DEFAULT_FONT_SIZE;
			break;
		case "text":
			obj.w = options.w ?? 200;
			obj.h = options.h ?? 40;
			obj.fontSize = options.fontSize ?? DEFAULT_FONT_SIZE;
			break;
		case "rect":
			obj.w = options.w ?? 180;
			obj.h = options.h ?? 120;
			break;
		case "ellipse":
			obj.w = options.w ?? 180;
			obj.h = options.h ?? 120;
			break;
		case "line":
			obj.w = options.w ?? 200;
			obj.h = options.h ?? 0;
			obj.x2 = x + (options.w ?? 200);
			obj.y2 = y;
			break;
		case "pen":
			obj.w = options.w ?? 0;
			obj.h = options.h ?? 0;
			obj.points = options.points ?? [];
			break;
		case "image":
			obj.w = options.w ?? 200;
			obj.h = options.h ?? 150;
			break;
	}
	return obj;
}

/** Vergleicht zwei Objektlisten und liefert die noetige Aenderung. */
export function diffObjects(
	prev: WhiteboardObject[],
	next: WhiteboardObject[],
): WhiteboardPatch {
	const vorher = new Map(prev.map((obj) => [obj.id, obj]));
	const nachher = new Map(next.map((obj) => [obj.id, obj]));
	const upserts: WhiteboardObject[] = [];
	const deletes: string[] = [];

	for (const obj of next) {
		const alt = vorher.get(obj.id);
		if (!alt || !gleichesObjekt(alt, obj)) upserts.push(obj);
	}
	for (const obj of prev) {
		if (!nachher.has(obj.id)) deletes.push(obj.id);
	}
	return { upserts, deletes };
}

export function splitPatch(
	patch: WhiteboardPatch,
	max = MAX_PATCH_ITEMS,
): WhiteboardPatch[] {
	const grenze = Math.max(1, Math.floor(max));
	const anzahl = Math.max(
		Math.ceil(patch.upserts.length / grenze),
		Math.ceil(patch.deletes.length / grenze),
	);
	const teile: WhiteboardPatch[] = [];
	for (let i = 0; i < anzahl; i += 1) {
		const upserts = patch.upserts.slice(i * grenze, (i + 1) * grenze);
		const deletes = patch.deletes.slice(i * grenze, (i + 1) * grenze);
		if (upserts.length || deletes.length) teile.push({ upserts, deletes });
	}
	return teile;
}

/**
 * Sind zwei Objekte gleich? Der Vergleich schaut auf jeden einzelnen Wert, damit
 * die Reihenfolge der Felder keine Rolle spielt (der Server baut die Objekte
 * neu auf und liefert sie in einer anderen Reihenfolge zurueck).
 */
function gleichesObjekt(a: WhiteboardObject, b: WhiteboardObject): boolean {
	const schluessel = new Set([...Object.keys(a), ...Object.keys(b)]);
	for (const name of schluessel) {
		const links = (a as unknown as Record<string, unknown>)[name];
		const rechts = (b as unknown as Record<string, unknown>)[name];
		if (JSON.stringify(links) !== JSON.stringify(rechts)) return false;
	}
	return true;
}

/** Wendet eine Aenderung auf eine Objektliste an. */
export function applyPatch(
	objects: WhiteboardObject[],
	patch: WhiteboardPatch,
): WhiteboardObject[] {
	const ohneGeloeschte = objects.filter((obj) => !patch.deletes.includes(obj.id));
	const ersetzt = new Map(patch.upserts.map((obj) => [obj.id, obj]));
	const aktualisiert = ohneGeloeschte.map((obj) => ersetzt.get(obj.id) ?? obj);
	const vorhanden = new Set(aktualisiert.map((obj) => obj.id));
	const neue = patch.upserts.filter((obj) => !vorhanden.has(obj.id));
	return [...aktualisiert, ...neue];
}

/** Rechteck (Umriss) eines Objekts - auch fuer Linien und Freihand. */
export function objectBounds(obj: WhiteboardObject): {
	x: number;
	y: number;
	w: number;
	h: number;
} {
	if (obj.type === "line") {
		const x2 = obj.x2 ?? obj.x + obj.w;
		const y2 = obj.y2 ?? obj.y;
		return {
			x: Math.min(obj.x, x2),
			y: Math.min(obj.y, y2),
			w: Math.abs(x2 - obj.x),
			h: Math.abs(y2 - obj.y),
		};
	}
	if (obj.type === "pen" && obj.points?.length) {
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (let i = 0; i < obj.points.length; i += 2) {
			const px = obj.points[i];
			const py = obj.points[i + 1];
			minX = Math.min(minX, px);
			minY = Math.min(minY, py);
			maxX = Math.max(maxX, px);
			maxY = Math.max(maxY, py);
		}
		return { x: obj.x + minX, y: obj.y + minY, w: maxX - minX, h: maxY - minY };
	}
	return { x: obj.x, y: obj.y, w: obj.w, h: obj.h };
}

/** Abstand von einem Punkt zu einer Strecke. */
export function distanceToSegment(
	px: number,
	py: number,
	ax: number,
	ay: number,
	bx: number,
	by: number,
): number {
	const dx = bx - ax;
	const dy = by - ay;
	const laengeQuadrat = dx * dx + dy * dy;
	if (laengeQuadrat === 0) return Math.hypot(px - ax, py - ay);
	let t = ((px - ax) * dx + (py - ay) * dy) / laengeQuadrat;
	t = Math.max(0, Math.min(1, t));
	return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Liegt der Punkt auf dem Objekt? */
export function hitTest(
	obj: WhiteboardObject,
	px: number,
	py: number,
	toleranz = 6,
): boolean {
	switch (obj.type) {
		case "ellipse": {
			const rx = obj.w / 2;
			const ry = obj.h / 2;
			if (rx <= 0 || ry <= 0) return false;
			const cx = obj.x + rx;
			const cy = obj.y + ry;
			// Die Toleranz vergroessert die Radien, damit die Linie gut zu
			// treffen ist.
			const rx2 = rx + toleranz;
			const ry2 = ry + toleranz;
			return ((px - cx) / rx2) ** 2 + ((py - cy) / ry2) ** 2 <= 1;
		}
		case "line": {
			const x2 = obj.x2 ?? obj.x + obj.w;
			const y2 = obj.y2 ?? obj.y;
			return (
				distanceToSegment(px, py, obj.x, obj.y, x2, y2) <=
				toleranz + (obj.strokeWidth ?? 2) / 2
			);
		}
		case "pen": {
			const punkte = obj.points ?? [];
			const breite = (obj.strokeWidth ?? 2) / 2 + toleranz;
			for (let i = 0; i + 3 < punkte.length; i += 2) {
				const d = distanceToSegment(
					px,
					py,
					obj.x + punkte[i],
					obj.y + punkte[i + 1],
					obj.x + punkte[i + 2],
					obj.y + punkte[i + 3],
				);
				if (d <= breite) return true;
			}
			return false;
		}
		default: {
			return (
				px >= obj.x &&
				px <= obj.x + obj.w &&
				py >= obj.y &&
				py <= obj.y + obj.h
			);
		}
	}
}

/** Das oberste Objekt unter dem Punkt (groesstes z gewinnt). */
export function objectAt(
	objects: WhiteboardObject[],
	px: number,
	py: number,
	toleranz = 6,
): WhiteboardObject | null {
	const sortiert = [...objects].sort((a, b) => a.z - b.z);
	for (let i = sortiert.length - 1; i >= 0; i -= 1) {
		if (hitTest(sortiert[i], px, py, toleranz)) return sortiert[i];
	}
	return null;
}

/** Alle Objekte, die von einem Rechteck beruehrt werden. */
export function objectsInRect(
	objects: WhiteboardObject[],
	rect: { x: number; y: number; w: number; h: number },
): WhiteboardObject[] {
	const x1 = Math.min(rect.x, rect.x + rect.w);
	const y1 = Math.min(rect.y, rect.y + rect.h);
	const x2 = Math.max(rect.x, rect.x + rect.w);
	const y2 = Math.max(rect.y, rect.y + rect.h);
	return objects.filter((obj) => {
		const b = objectBounds(obj);
		return (
			b.x + b.w >= x1 && b.x <= x2 && b.y + b.h >= y1 && b.y <= y2
		);
	});
}

/** Verschiebt alle Objekte einer Auswahl um (dx, dy). */
export function moveObjects(
	objects: WhiteboardObject[],
	ids: string[],
	dx: number,
	dy: number,
): WhiteboardObject[] {
	return objects.map((obj) => {
		if (!ids.includes(obj.id)) return obj;
		const bewegt: WhiteboardObject = { ...obj, x: obj.x + dx, y: obj.y + dy };
		if (obj.type === "line") {
			bewegt.x2 = (obj.x2 ?? obj.x + obj.w) + dx;
			bewegt.y2 = (obj.y2 ?? obj.y) + dy;
		}
		return bewegt;
	});
}

/** Dupliziert Objekte (mit neuen IDs) und verschiebt sie leicht. */
export function duplicateObjects(
	objects: WhiteboardObject[],
	ids: string[],
	offset = 20,
): WhiteboardObject[] {
	const kopien = objects
		.filter((obj) => ids.includes(obj.id))
		.map((obj) => {
			const kopie: WhiteboardObject = {
				...obj,
				id: newId(),
				x: obj.x + offset,
				y: obj.y + offset,
				z: obj.z + 1,
			};
			if (obj.type === "line") {
				kopie.x2 = (obj.x2 ?? obj.x + obj.w) + offset;
				kopie.y2 = (obj.y2 ?? obj.y) + offset;
			}
			return kopie;
		});
	return [...objects, ...kopien];
}

/** Kopiert Objekte in die Zwischenablage des Browsers (Text). */
export function serializeSelection(objects: WhiteboardObject[]): string {
	return JSON.stringify(objects);
}

/** Liest Objekte aus der Zwischenablage des Browsers. */
export function parseSelection(text: string): WhiteboardObject[] {
	try {
		const daten = JSON.parse(text) as unknown;
		if (!Array.isArray(daten)) return [];
		return daten.filter(
			(wert): wert is WhiteboardObject =>
				typeof wert === "object" &&
				wert !== null &&
				typeof (wert as WhiteboardObject).id === "string" &&
				typeof (wert as WhiteboardObject).type === "string",
		);
	} catch {
		return [];
	}
}

let messContext: CanvasRenderingContext2D | null | undefined;

/** Textbreite messen. Ohne Canvas (z.B. im Test) wird geschaetzt. */
export function measureText(
	text: string,
	fontSize: number,
	bold = false,
): number {
	if (messContext === undefined) {
		try {
			const canvas = document.createElement("canvas");
			messContext = canvas.getContext("2d");
		} catch {
			messContext = null;
		}
	}
	if (!messContext) return text.length * fontSize * 0.55;
	messContext.font = `${bold ? "600 " : ""}${fontSize}px ${WHITEBOARD_FONT}`;
	return messContext.measureText(text).width;
}

/** Bricht einen Text in Zeilen um, die hoechstens maxBreite breit sind. */
export function wrapText(
	text: string,
	maxBreite: number,
	fontSize: number,
	bold = false,
): string[] {
	const zeilen: string[] = [];
	for (const absatz of text.split("\n")) {
		if (absatz === "") {
			zeilen.push("");
			continue;
		}
		let aktuelle = "";
		for (const wort of absatz.split(" ")) {
			const kandidat = aktuelle === "" ? wort : `${aktuelle} ${wort}`;
			if (measureText(kandidat, fontSize, bold) <= maxBreite || aktuelle === "") {
				aktuelle = kandidat;
			} else {
				zeilen.push(aktuelle);
				aktuelle = wort;
			}
		}
		zeilen.push(aktuelle);
	}
	return zeilen;
}

/** Hoehe des Textes, wenn er in die angegebene Breite umbrochen wird. */
export function textHeight(
	text: string,
	maxBreite: number,
	fontSize: number,
	bold = false,
): number {
	const zeilen = wrapText(text, maxBreite, fontSize, bold);
	return Math.max(fontSize * 1.3, zeilen.length * fontSize * 1.3);
}

/** Der Einladungslink zu einem Board. */
export function boardLink(origin: string, boardId: string): string {
	return `${origin.replace(/\/$/, "")}/whiteboard/${boardId}`;
}

const NAME_SPEICHER = "whiteboardName";

/** Zufallsname fuer Personen, die sich nicht mit Namen angemeldet haben. */
export function guestName(): string {
	const zahl = Math.floor(Math.random() * 900 + 100);
	return `Gast ${zahl}`;
}

/** Der zuletzt benutzte Name (im Browser gespeichert). */
export function loadName(): string {
	try {
		const gespeichert = localStorage.getItem(NAME_SPEICHER);
		if (gespeichert && gespeichert.trim()) return gespeichert.trim();
	} catch {
		// Der localStorage kann gesperrt sein - dann gilt der Zufallsname.
	}
	return guestName();
}

/** Merkt sich den Namen fuer das naechste Whiteboard. */
export function saveName(name: string): void {
	try {
		localStorage.setItem(NAME_SPEICHER, name);
	} catch {
		// Ohne localStorage wird der Name nur fuer diese Sitzung gehalten.
	}
}

/** Umrechnung zwischen Bildschirm- und Weltkoordinaten. */
export function screenToWorld(
	point: Point,
	kamera: { x: number; y: number; scale: number },
): Point {
	return {
		x: (point.x - kamera.x) / kamera.scale,
		y: (point.y - kamera.y) / kamera.scale,
	};
}

export function worldToScreen(
	point: Point,
	kamera: { x: number; y: number; scale: number },
): Point {
	return {
		x: point.x * kamera.scale + kamera.x,
		y: point.y * kamera.scale + kamera.y,
	};
}

export function clampZoom(scale: number): number {
	return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale));
}

/** Kleinste gemeinsame Ecke fuer Zoom auf den Inhalt. */
export function fitCamera(
	objects: WhiteboardObject[],
	breite: number,
	hoehe: number,
	rand = 60,
): { x: number; y: number; scale: number } {
	if (!objects.length || breite <= 0 || hoehe <= 0) {
		return { x: breite / 2, y: hoehe / 2, scale: 1 };
	}
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	for (const obj of objects) {
		const b = objectBounds(obj);
		minX = Math.min(minX, b.x);
		minY = Math.min(minY, b.y);
		maxX = Math.max(maxX, b.x + b.w);
		maxY = Math.max(maxY, b.y + b.h);
	}
	const inhaltBreite = Math.max(1, maxX - minX);
	const inhaltHoehe = Math.max(1, maxY - minY);
	const scale = clampZoom(
		Math.min((breite - rand * 2) / inhaltBreite, (hoehe - rand * 2) / inhaltHoehe),
	);
	return {
		x: breite / 2 - ((minX + maxX) / 2) * scale,
		y: hoehe / 2 - ((minY + maxY) / 2) * scale,
		scale,
	};
}
