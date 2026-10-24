import { describe, expect, it, vi } from "vitest";
import {
	bildAusClipboardEintraegen,
	bilddateiAusZwischenablage,
	istTexteingabe,
} from "./whiteboardBild";

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

	it("liest Bilder aus Clipboard-Eintraegen", async () => {
		const blob = new Blob(["png"], { type: "image/png" });
		const ergebnis = await bildAusClipboardEintraegen([
			{
				types: ["text/plain", "image/png"],
				getType: vi.fn(async (typ: string) => {
					expect(typ).toBe("image/png");
					return blob;
				}),
			},
		]);

		expect(ergebnis).toBeInstanceOf(File);
		expect(ergebnis?.type).toBe("image/png");
	});

	it("erkennt nur Text-Eingabefelder als Texteingaben", () => {
		const textarea = document.createElement("textarea");
		document.body.append(textarea);
		expect(istTexteingabe(textarea)).toBe(true);

		const file = document.createElement("input");
		file.type = "file";
		document.body.append(file);
		expect(istTexteingabe(file)).toBe(false);

		const button = document.createElement("input");
		button.type = "button";
		document.body.append(button);
		expect(istTexteingabe(button)).toBe(false);

		const content = document.createElement("div");
		content.contentEditable = "true";
		document.body.append(content);
		expect(istTexteingabe(content)).toBe(true);

		textarea.remove();
		file.remove();
		button.remove();
		content.remove();
	});
});
