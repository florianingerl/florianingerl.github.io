import { describe, expect, it } from "vitest";
import {
	appendPenPoints,
	applyPatch,
	boardLink,
	createObject,
	diffObjects,
	duplicateObjects,
	fitCamera,
	hitTest,
	moveObjects,
	newId,
	objectAt,
	objectsInRect,
	parseSelection,
	serializeSelection,
	screenToWorld,
	textHeight,
	topZ,
	worldToScreen,
	wrapText,
} from "./whiteboard";
import type { WhiteboardObject } from "@/types/whiteboard";

function notiz(x: number, y: number, z = 1): WhiteboardObject {
	return createObject("note", x, y, z, { text: "Hallo" });
}

describe("whiteboard", () => {
	it("legt eine KlebeNotiz mit Standardgroesse an", () => {
		const obj = createObject("note", 10, 20, 3);

		expect(obj.type).toBe("note");
		expect(obj.x).toBe(10);
		expect(obj.y).toBe(20);
		expect(obj.z).toBe(3);
		expect(obj.w).toBeGreaterThan(0);
		expect(obj.h).toBeGreaterThan(0);
		expect(obj.id).toContain("_");
		expect(obj.id).not.toBe(newId());
	});

	it("gibt jedem Objekt eine eigene Kennung", () => {
		const ids = new Set(
			Array.from({ length: 50 }, () => createObject("rect", 0, 0, 1).id),
		);
		expect(ids.size).toBe(50);
	});

	it("findet das oberste Objekt unter dem Zeiger", () => {
		const unten = notiz(0, 0, 1);
		const oben = notiz(10, 10, 2);

		expect(objectAt([unten, oben], 50, 50)?.id).toBe(oben.id);
		expect(objectAt([unten, oben], 500, 500)).toBeNull();
	});

	it("erkennt den Mittelpunkt einer Ellipse", () => {
		const ellipse = createObject("ellipse", 0, 0, 1, { w: 100, h: 60 });

		expect(hitTest(ellipse, 50, 30)).toBe(true);
		expect(hitTest(ellipse, 120, 30)).toBe(false);
	});

	it("berechnet die Aenderung zwischen zwei Objektlisten", () => {
		const a = notiz(0, 0, 1);
		const b = notiz(0, 0, 2);
		const c = notiz(50, 50, 3);

		const patch = diffObjects([a, b], [b, c]);

		expect(patch.deletes).toEqual([a.id]);
		expect(patch.upserts).toHaveLength(1);
		expect(patch.upserts[0].id).toBe(c.id);
	});

	it("wendet eine Aenderung auf die Objektliste an", () => {
		const a = notiz(0, 0, 1);
		const b = notiz(10, 10, 2);
		const c = notiz(20, 20, 3);

		const ergebnis = applyPatch([a, b], { upserts: [c], deletes: [a.id] });

		expect(ergebnis.map((obj) => obj.id)).toEqual([b.id, c.id]);
	});

	it("verschiebt nur die ausgewaehlten Objekte", () => {
		const a = notiz(0, 0, 1);
		const b = notiz(100, 100, 2);

		const ergebnis = moveObjects([a, b], [a.id], 10, 5);

		expect(ergebnis[0].x).toBe(10);
		expect(ergebnis[0].y).toBe(5);
		expect(ergebnis[1].x).toBe(100);
	});

	it("haengt Stiftpunkte an und begrenzt sie", () => {
		const stift = createObject("pen", 10, 20, 1, { points: [1, 2] });

		const erweitert = appendPenPoints(stift, [3, 4, 5, 6]);
		expect(erweitert.points).toEqual([1, 2, 3, 4, 5, 6]);

		const begrenzt = appendPenPoints(stift, [3, 4, 5, 6], 4);
		expect(begrenzt.points).toEqual([1, 2, 3, 4]);
		expect(appendPenPoints(stift, [], 4)).toBe(stift);
	});

	it("dupliziert Objekte mit neuen Kennungen", () => {
		const a = notiz(0, 0, 1);

		const ergebnis = duplicateObjects([a], [a.id], 20);

		expect(ergebnis).toHaveLength(2);
		expect(ergebnis[1].id).not.toBe(a.id);
		expect(ergebnis[1].x).toBe(20);
	});

	it("findet alle Objekte in einem Auswahlrechteck", () => {
		const a = notiz(0, 0, 1);
		const b = notiz(300, 300, 2);

		const treffer = objectsInRect([a, b], { x: -10, y: -10, w: 100, h: 100 });

		expect(treffer.map((obj) => obj.id)).toEqual([a.id]);
	});

	it("bricht Text in Zeilen um", () => {
		const zeilen = wrapText("eins zwei drei vier fuenf", 60, 20);

		expect(zeilen.length).toBeGreaterThan(1);
		expect(zeilen.join(" ")).toBe("eins zwei drei vier fuenf");
	});

	it("berechnet die Texthoehe", () => {
		const einzeilig = textHeight("kurz", 400, 20);
		const mehrzeilig = textHeight(
			"das ist ein deutlich laengerer text der umbrechen muss",
			80,
			20,
		);

		expect(mehrzeilig).toBeGreaterThan(einzeilig);
	});

	it("baut den Einladungslink", () => {
		expect(boardLink("https://beispiel.de", "abc123")).toBe(
			"https://beispiel.de/whiteboard/abc123",
		);
		expect(boardLink("https://beispiel.de/", "abc123")).toBe(
			"https://beispiel.de/whiteboard/abc123",
		);
	});

	it("rechnet zwischen Bildschirm- und Weltkoordinaten um", () => {
		const kamera = { x: 100, y: 50, scale: 2 };

		const welt = screenToWorld({ x: 300, y: 150 }, kamera);
		const bildschirm = worldToScreen(welt, kamera);

		expect(welt).toEqual({ x: 100, y: 50 });
		expect(bildschirm).toEqual({ x: 300, y: 150 });
	});

	it("berechnet die hoechste Ebene", () => {
		expect(topZ([notiz(0, 0, 1), notiz(0, 0, 7)])).toBe(7);
	});

	it("richtet die Kamera auf den Inhalt aus", () => {
		const kamera = fitCamera([notiz(0, 0, 1), notiz(400, 400, 2)], 800, 600);

		expect(kamera.scale).toBeGreaterThan(0);
		expect(Number.isFinite(kamera.x)).toBe(true);
		expect(Number.isFinite(kamera.y)).toBe(true);
	});

	it("speichert und liest eine Auswahl aus der Zwischenablage", () => {
		const a = notiz(0, 0, 1);

		const text = serializeSelection([a]);
		const gelesen = parseSelection(text);

		expect(gelesen).toHaveLength(1);
		expect(gelesen[0].id).toBe(a.id);
		expect(parseSelection("kein json")).toEqual([]);
	});
});
