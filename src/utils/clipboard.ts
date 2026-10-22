// Kopiert Text in die Zwischenablage. Wenn die moderne API fehlt oder
// scheitert (z.B. weil die Seite nicht im sicheren Kontext laeuft), wird auf
// ein verstecktes Textfeld zurueckgefallen.

export async function copyToClipboard(text: string): Promise<boolean> {
	if (navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			return fallbackCopy(text);
		}
	}
	return fallbackCopy(text);
}

function fallbackCopy(text: string): boolean {
	try {
		const feld = document.createElement("textarea");
		feld.value = text;
		feld.setAttribute("readonly", "true");
		feld.style.position = "fixed";
		feld.style.opacity = "0";
		document.body.appendChild(feld);
		feld.select();
		const erfolg = document.execCommand("copy");
		document.body.removeChild(feld);
		return erfolg;
	} catch {
		return false;
	}
}
