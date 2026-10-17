import { API_URL, uploadImage } from '@/api'

// Sucht in den Daten einer Zwischenablage (Strg+V) ein Bild. Text wird
// durchgelassen (null), damit die Eingabe normal weiter funktioniert.
export function dateiAusZwischenablage(
  daten: DataTransfer | null | undefined,
): File | null {
  if (!daten) return null
  for (const datei of Array.from<File>(daten.files ?? [])) {
    if (datei.type.startsWith('image/')) return datei
  }
  for (const element of Array.from<DataTransferItem>(daten.items ?? [])) {
    if (element.kind === 'file' && element.type.startsWith('image/')) {
      const datei = element.getAsFile()
      if (datei) return datei
    }
  }
  return null
}

// Liest eine Datei als Data-URL ("data:image/png;base64,..."), so wie sie der
// Server erwartet.
function dateiAlsDatenUrl(datei: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const leser = new FileReader()
    leser.onload = () => resolve(String(leser.result))
    leser.onerror = () => reject(new Error('The pasted image could not be read.'))
    leser.readAsDataURL(datei)
  })
}

// Macht aus der Antwort des Servers eine URL, die der Browser laden kann.
// Bilder, die unser Server ausliefert, werden immer ueber API_URL geladen
// (auch wenn der Server hinter dem Proxy nur http gemeldet hat); eine fremde,
// absolute URL bleibt unveraendert.
export function bildUrl(url: string): string {
  const pfad = url.replace(/^https?:\/\/[^/]+/i, '')
  if (pfad.startsWith('/api/image/')) return `${API_URL}${pfad}`
  return /^https?:\/\//i.test(url) ? url : `${API_URL}${url}`
}

// Schickt ein eingefuegtes Bild an den Server (der das Tageslimit prueft) und
// liefert die vollstaendige URL des gespeicherten Bildes zurueck.
export async function uploadPastedImage(datei: File): Promise<string> {
  const datenUrl = await dateiAlsDatenUrl(datei)
  const antwort = await uploadImage(datenUrl)
  return bildUrl(antwort.url)
}

// Prueft, ob eine Eingabe wie die Adresse eines Bildes aussieht. Nur dann wird
// sie sofort als Bild uebernommen; unvollstaendige Adressen werden ignoriert.
export function istBildAdresse(wert: string): boolean {
  return /^(https?:\/\/|data:image\/|assets\/|\/)/i.test(wert.trim())
}
