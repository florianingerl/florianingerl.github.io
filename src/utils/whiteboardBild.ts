// Bilder fuer das Whiteboard einlesen.
//
// Grosse Fotos werden vorher verkleinert, damit das Board nicht zu schnell
// zu gross wird (der Server speichert die Bilder mit).

const MAX_KANTE = 1200;
const MAX_DATEN = 1_500_000;

export interface WhiteboardBild {
	src: string;
	w: number;
	h: number;
}

export function bilddateiAusZwischenablage(daten: DataTransfer | null): File | null {
	if (!daten) return null;
	const direkt = Array.from(daten.files).find((datei) =>
		datei.type.startsWith("image/"),
	);
	if (direkt) return direkt;
	for (const eintrag of Array.from(daten.items)) {
		if (eintrag.kind !== "file" || !eintrag.type.startsWith("image/")) continue;
		const datei = eintrag.getAsFile();
		if (datei) return datei;
	}
	return null;
}

export async function bildAusDatei(datei: File): Promise<WhiteboardBild> {
	const datenUrl = await dateiAlsDatenUrl(datei);
	const groesse = await bildGroesse(datenUrl);
	const { src, breite, hoehe } = await verkleinere(datenUrl, groesse);
	// Hoechstens 600 Pixel breit auf der Flaeche anzeigen.
	const faktor = Math.min(1, 600 / breite);
	return { src, w: Math.round(breite * faktor), h: Math.round(hoehe * faktor) };
}

function dateiAlsDatenUrl(datei: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const leser = new FileReader();
		leser.onload = () => resolve(String(leser.result ?? ""));
		leser.onerror = () => reject(new Error("Die Datei konnte nicht gelesen werden."));
		leser.readAsDataURL(datei);
	});
}

function bildGroesse(src: string): Promise<{ breite: number; hoehe: number }> {
	return new Promise((resolve, reject) => {
		const bild = new Image();
		bild.onload = () => resolve({ breite: bild.naturalWidth, hoehe: bild.naturalHeight });
		bild.onerror = () => reject(new Error("Das Bild konnte nicht geladen werden."));
		bild.src = src;
	});
}

async function verkleinere(
	src: string,
	groesse: { breite: number; hoehe: number },
): Promise<{ src: string; breite: number; hoehe: number }> {
	const zuGross = groesse.breite > MAX_KANTE || groesse.hoehe > MAX_KANTE;
	if (!zuGross && src.length <= MAX_DATEN) {
		return { src, breite: groesse.breite, hoehe: groesse.hoehe };
	}
	const faktor = Math.min(
		1,
		MAX_KANTE / Math.max(1, groesse.breite),
		MAX_KANTE / Math.max(1, groesse.hoehe),
	);
	const breite = Math.max(1, Math.round(groesse.breite * faktor));
	const hoehe = Math.max(1, Math.round(groesse.hoehe * faktor));
	const flaeche = document.createElement("canvas");
	flaeche.width = breite;
	flaeche.height = hoehe;
	const ctx = flaeche.getContext("2d");
	if (!ctx) return { src, breite: groesse.breite, hoehe: groesse.hoehe };
	const bild = new Image();
	await new Promise<void>((resolve) => {
		bild.onload = () => resolve();
		bild.onerror = () => resolve();
		bild.src = src;
	});
	ctx.drawImage(bild, 0, 0, breite, hoehe);
	return { src: flaeche.toDataURL("image/jpeg", 0.85), breite, hoehe };
}
