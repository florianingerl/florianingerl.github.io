// Sucht ueber die Klipy-API nach Bildern zu einem Suchbegriff und liefert die
// Adressen der Treffer einer Seite. Der Schluessel steht in VITE_KLIPY_API_KEY.
export async function searchKlipyImages(
  suchbegriff: string,
  seite: number,
  proSeite = 10,
): Promise<string[]> {
  const key = import.meta.env.VITE_KLIPY_API_KEY
  if (!key) {
    alert('Kein Klipy-Schlüssel: VITE_KLIPY_API_KEY in .env eintragen.')
    return []
  }
  const url = new URL(`https://api.klipy.com/api/v1/${key}/gifs/search`)
  url.searchParams.set('q', suchbegriff)
  url.searchParams.set('page', String(seite))
  url.searchParams.set('per_page', String(proSeite))
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Klipy request failed: ${response.status}`)
  const result = (await response.json()) as {
    data: { data: Array<{ file: { hd: { jpg: { url: string } } } }> }
  }
  return result.data.data.map((e) => e.file.hd.jpg.url)
}
