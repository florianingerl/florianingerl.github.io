import type {
	WhiteboardObject,
	WhiteboardObjectType,
} from "@/types/whiteboard";

export const WHITEBOARD_FILE_FORMAT = "floriloveslanguages-whiteboard";
export const WHITEBOARD_FILE_VERSION = 1;

const OBJEKT_ARTEN: readonly WhiteboardObjectType[] = [
	"note",
	"text",
	"rect",
	"ellipse",
	"line",
	"pen",
	"image",
];

const MAX_PUNKTE_PRO_OBJEKT = 4000;
const MAX_TEXTLAENGE = 5000;
const MAX_BILDGROESSE = 1_500_000;

export interface WhiteboardFile {
	format: typeof WHITEBOARD_FILE_FORMAT;
	version: typeof WHITEBOARD_FILE_VERSION;
	title: string;
	savedAt: string;
	objects: WhiteboardObject[];
}

function istZahl(wert: unknown): wert is number {
	return typeof wert === "number" && Number.isFinite(wert);
}

function istDatensatz(wert: unknown): wert is Record<string, unknown> {
	return typeof wert === "object" && wert !== null && !Array.isArray(wert);
}

function istObjektArt(wert: string): wert is WhiteboardObjectType {
	return (OBJEKT_ARTEN as readonly string[]).includes(wert);
}

function normiereObjekt(eingabe: unknown): WhiteboardObject | null {
	if (!istDatensatz(eingabe)) return null;

	const id =
		typeof eingabe.id === "string" ? eingabe.id.trim().slice(0, 64) : "";
	const typ = typeof eingabe.type === "string" ? eingabe.type : "";
	if (!id || !istObjektArt(typ)) return null;

	const objekt: WhiteboardObject = {
		id,
		type: typ,
		x: istZahl(eingabe.x) ? eingabe.x : 0,
		y: istZahl(eingabe.y) ? eingabe.y : 0,
		w: istZahl(eingabe.w) ? eingabe.w : 0,
		h: istZahl(eingabe.h) ? eingabe.h : 0,
		z: istZahl(eingabe.z) ? eingabe.z : 0,
		color:
			typeof eingabe.color === "string"
				? eingabe.color.slice(0, 32)
				: "#1f2933",
	};

	if (typeof eingabe.fill === "string") objekt.fill = eingabe.fill.slice(0, 32);
	if (istZahl(eingabe.strokeWidth)) {
		objekt.strokeWidth = Math.min(Math.max(eingabe.strokeWidth, 1), 64);
	}
	if (typeof eingabe.text === "string") {
		objekt.text = eingabe.text.slice(0, MAX_TEXTLAENGE);
	}
	if (istZahl(eingabe.fontSize)) {
		objekt.fontSize = Math.min(Math.max(eingabe.fontSize, 6), 400);
	}
	if (typeof eingabe.author === "string") {
		objekt.author = eingabe.author.slice(0, 40);
	}
	if (istZahl(eingabe.x2)) objekt.x2 = eingabe.x2;
	if (istZahl(eingabe.y2)) objekt.y2 = eingabe.y2;
	if (Array.isArray(eingabe.points)) {
		objekt.points = eingabe.points
			.filter(istZahl)
			.slice(0, MAX_PUNKTE_PRO_OBJEKT);
	}
	if (
		typeof eingabe.src === "string" &&
		eingabe.src.startsWith("data:image/")
	) {
		objekt.src = eingabe.src.slice(0, MAX_BILDGROESSE);
	}

	return objekt;
}

export function serializeWhiteboardFile(
	title: string,
	objects: WhiteboardObject[],
): string {
	const datei: WhiteboardFile = {
		format: WHITEBOARD_FILE_FORMAT,
		version: WHITEBOARD_FILE_VERSION,
		title: title.trim().slice(0, 80) || "Whiteboard",
		savedAt: new Date().toISOString(),
		objects,
	};
	return JSON.stringify(datei, null, 2);
}

export function parseWhiteboardFile(text: string): WhiteboardFile | null {
	let daten: unknown;
	try {
		daten = JSON.parse(text);
	} catch {
		return null;
	}
	if (!istDatensatz(daten)) return null;
	if (daten.format !== WHITEBOARD_FILE_FORMAT) return null;
	if (daten.version !== WHITEBOARD_FILE_VERSION) return null;
	if (!Array.isArray(daten.objects)) return null;

	const objekte: WhiteboardObject[] = [];
	const gesehen = new Set<string>();
	for (const eintrag of daten.objects) {
		const objekt = normiereObjekt(eintrag);
		if (!objekt || gesehen.has(objekt.id)) continue;
		gesehen.add(objekt.id);
		objekte.push(objekt);
	}
	if (daten.objects.length > 0 && objekte.length === 0) return null;

	return {
		format: WHITEBOARD_FILE_FORMAT,
		version: WHITEBOARD_FILE_VERSION,
		title:
			typeof daten.title === "string"
				? daten.title.trim().slice(0, 80) || "Whiteboard"
				: "Whiteboard",
		savedAt: typeof daten.savedAt === "string" ? daten.savedAt : "",
		objects: objekte,
	};
}

function sichereTitel(titel: string): string {
	const bereinigt = titel
		.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^[-.\s]+|[-.\s]+$/g, "")
		.slice(0, 80)
		.replace(/[-.\s]+$/g, "");
	return bereinigt || "Whiteboard";
}

export function whiteboardFileName(
	title: string,
	date: Date = new Date(),
): string {
	const zwei = (wert: number): string => String(wert).padStart(2, "0");
	const datum = [
		date.getFullYear(),
		zwei(date.getMonth() + 1),
		zwei(date.getDate()),
	].join("-");
	const zeit = [
		zwei(date.getHours()),
		zwei(date.getMinutes()),
	].join("-");
	return `${sichereTitel(title)}-${datum}_${zeit}.whiteboard.json`;
}

export function readTextFile(datei: File): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const leser = new FileReader();
		leser.onload = () => resolve(String(leser.result ?? ""));
		leser.onerror = () => reject(leser.error ?? new Error("read failed"));
		leser.readAsText(datei);
	});
}

export function downloadTextFile(
	inhalt: string,
	dateiname: string,
	typ = "application/json",
): void {
	const blob = new Blob([inhalt], { type: typ });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = dateiname;
	a.rel = "noopener";
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
