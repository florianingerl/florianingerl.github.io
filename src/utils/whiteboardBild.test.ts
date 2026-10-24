import { describe, expect, it } from "vitest";
import { bilddateiAusZwischenablage } from "./whiteboardBild";

function bilddatei(name = "bild.png", type = "image/png"): File {
	return new File(["Bild"], name, { type });
}

function zwischenablage(werte: {
	files?: File[];
	items?: Array<{ kind: string; type: string; datei: File | null }>;
}): DataTransfer {
	return {
		files: werte.files ?? [],
		items:
			werte.items?.map((eintrag) => ({
				kind: eintrag.kind,
				type: eintrag.type,
				getAsFile: () => eintrag.datei,
			})) ?? [],
	} as unknown as DataTransfer;
}

describe("whiteboardBild", () => {
	it("nimmt eine Bilddatei direkt aus der Zwischenablage", () => {
		const datei = bilddatei();

		const ergebnis = bilddateiAusZwischenablage(zwischenablage({ files: [datei] }));

		expect(ergebnis).toBe(datei);
	});

	it("nimmt eine Bilddatei aus den Zwischenablage-Eintraegen", () => {
		const datei = bilddatei("screenshot.jpg", "image/jpeg");

		const ergebnis = bilddateiAusZwischenablage(
			zwischenablage({
				items: [{ kind: "file", type: "image/jpeg", datei }],
			}),
		);

		expect(ergebnis).toBe(datei);
	});

	it("ignoriert Text und andere Dateitypen", () => {
		const ergebnis = bilddateiAusZwischenablage(
			zwischenablage({
				files: [new File(["Text"], "notiz.txt", { type: "text/plain" })],
				items: [{ kind: "string", type: "text/plain", datei: null }],
			}),
		);

		expect(ergebnis).toBeNull();
	});

	it("liefert ohne Zwischenablage nichts", () => {
		expect(bilddateiAusZwischenablage(null)).toBeNull();
	});
});
