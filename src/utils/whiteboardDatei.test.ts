import { describe, expect, it } from "vitest";
import { createObject, splitPatch } from "./whiteboard";
import {
	parseWhiteboardFile,
	serializeWhiteboardFile,
	WHITEBOARD_FILE_FORMAT,
	WHITEBOARD_FILE_VERSION,
	whiteboardFileName,
} from "./whiteboardDatei";

describe("whiteboardDatei", () => {
	it("speichert und liest ein Whiteboard vollstaendig", () => {
		const strich = createObject("pen", 10, 20, 3, {
			color: "#123456",
			strokeWidth: 4,
			points: [0, 0, 5, 5, 10, 2],
		});

		const text = serializeWhiteboardFile("Mathe: Brueche", [strich]);
		const gelesen = parseWhiteboardFile(text);

		expect(gelesen?.format).toBe(WHITEBOARD_FILE_FORMAT);
		expect(gelesen?.version).toBe(WHITEBOARD_FILE_VERSION);
		expect(gelesen?.title).toBe("Mathe: Brueche");
		expect(gelesen?.objects).toEqual([strich]);
	});

	it("lehnt fremde, kaputte und unbekannte Dateien ab", () => {
		expect(parseWhiteboardFile("kein json")).toBeNull();
		expect(parseWhiteboardFile("[]")).toBeNull();
		expect(
			parseWhiteboardFile(
				JSON.stringify({
					format: "anderes-format",
					version: WHITEBOARD_FILE_VERSION,
					objects: [],
				}),
			),
		).toBeNull();
		expect(
			parseWhiteboardFile(
				JSON.stringify({
					format: WHITEBOARD_FILE_FORMAT,
					version: 2,
					objects: [],
				}),
			),
		).toBeNull();
		expect(
			parseWhiteboardFile(
				JSON.stringify({
					format: WHITEBOARD_FILE_FORMAT,
					version: WHITEBOARD_FILE_VERSION,
					objects: "keine liste",
				}),
			),
		).toBeNull();
	});

	it("uebernimmt nur gueltige Objekte aus einer Datei", () => {
		const notiz = createObject("note", 0, 0, 1, { text: "Hallo" });
		const text = JSON.stringify({
			format: WHITEBOARD_FILE_FORMAT,
			version: WHITEBOARD_FILE_VERSION,
			title: "Test",
			objects: [
				notiz,
				{ id: "kaputt", type: "unbekannt" },
				{ type: "note" },
			],
		});

		expect(parseWhiteboardFile(text)?.objects.map((obj) => obj.id)).toEqual([
			notiz.id,
		]);
	});

	it("lehnt Dateien ab, in denen kein einziges Objekt gueltig ist", () => {
		const text = JSON.stringify({
			format: WHITEBOARD_FILE_FORMAT,
			version: WHITEBOARD_FILE_VERSION,
			title: "Test",
			objects: [{ id: "kaputt", type: "unbekannt" }],
		});

		expect(parseWhiteboardFile(text)).toBeNull();
	});

	it("baut einen sicheren Dateinamen mit Datum", () => {
		const name = whiteboardFileName(
			"Mathe: Brueche/Prozent?",
			new Date(2026, 9, 23, 14, 5),
		);

		expect(name).toBe(
			"Mathe-Brueche-Prozent-2026-10-23_14-05.whiteboard.json",
		);
		expect(whiteboardFileName("   ", new Date(2026, 9, 23, 14, 5))).toBe(
			"Whiteboard-2026-10-23_14-05.whiteboard.json",
		);
	});
});

describe("whiteboard: grosse Aenderungen aufteilen", () => {
	it("teilt Aenderungen in Stuecke von hoechstens 200 Eintraegen", () => {
		const upserts = Array.from({ length: 450 }, (_, index) =>
			createObject("rect", index, 0, index),
		);
		const deletes = Array.from({ length: 250 }, (_, index) => `alt_${index}`);

		const teile = splitPatch({ upserts, deletes });

		expect(teile).toHaveLength(3);
		expect(
			teile.every(
				(teil) => teil.upserts.length <= 200 && teil.deletes.length <= 200,
			),
		).toBe(true);
		expect(teile.flatMap((teil) => teil.upserts)).toEqual(upserts);
		expect(teile.flatMap((teil) => teil.deletes)).toEqual(deletes);
	});
});
