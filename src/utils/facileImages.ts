// Die Bilder der *facile.com-Tests liegen unter dieser Adresse.
const FACILE_BILDER_URL = 'https://www.anglaisfacile.com/cgi2/myexam/images2/'

// Kleinste und groesste Nummer, die dort gefunden wurde. Beide sind als Bild
// vorhanden, dazwischen gibt es aber Luecken, deshalb wird jedes Mal geprueft.
const FACILE_BILD_MIN = 25648
const FACILE_BILD_MAX = 105000

// So viele Bilder werden auf einmal geprueft, damit ein Klick schnell bleibt.
const BILDER_PRO_DURCHLAUF = 6

// Wie lange auf ein Bild gewartet wird, bevor die Zahl als nicht vorhanden gilt.
const BILD_TIMEOUT_MS = 6000

// So viele Zahlen werden insgesamt gezogen, bevor aufgegeben wird.
const MAX_DURCHLAEUFE = 4

function zufallsNummer(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Prueft, ob es die Bilddatei gibt.
//
// Bewusst ueber ein Image-Element und nicht ueber fetch: anglaisfacile.com
// schickt kein Access-Control-Allow-Origin, deshalb wuerde fetch an der
// CORS-Pruefung scheitern, auch wenn das Bild existiert. Ein Bild anzeigen
// braucht diese Erlaubnis nicht, also liefert onload "ja" und onerror "nein".
function bildExistiert(url: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const bild = new Image()
    const fertig = (vorhanden: boolean) => {
      bild.onload = null
      bild.onerror = null
      resolve(vorhanden)
    }
    bild.onload = () => fertig(true)
    bild.onerror = () => fertig(false)
    // Sicherheitsnetz, falls der Server gar nicht antwortet.
    setTimeout(() => fertig(false), BILD_TIMEOUT_MS)
    bild.src = url
  })
}

// Zieht BILDER_PRO_DURCHLAUF verschiedene Zahlen und gibt die URL des ersten
// Bildes zurueck, das es wirklich gibt. Beide Endungen werden gleichzeitig
// geprueft, weil die Nummer je nach Bild mal .jpg und mal .gif ist.
async function findeFacileBild(): Promise<string> {
  const zahlen: number[] = []
  while (zahlen.length < BILDER_PRO_DURCHLAUF) {
    const nummer = zufallsNummer(FACILE_BILD_MIN, FACILE_BILD_MAX)
    if (!zahlen.includes(nummer)) zahlen.push(nummer)
  }

  const versuche: Promise<string>[] = []
  for (const nummer of zahlen) {
    for (const endung of ['jpg', 'gif']) {
      const url = `${FACILE_BILDER_URL}${nummer}.${endung}`
      versuche.push(bildExistiert(url).then((vorhanden) => (vorhanden ? url : '')))
    }
  }

  // Sobald ein Bild geladen ist, wird es zurueckgegeben und der Rest egal.
  for (const versuch of versuche) {
    const url = await versuch
    if (url !== '') return url
  }
  return ''
}

// Liefert die URL eines zufaelligen Bildes aus dem Bestand von *facile.com.
export async function findRandomImageUrlOnFacile(): Promise<string> {
  for (let durchlauf = 0; durchlauf < MAX_DURCHLAEUFE; durchlauf++) {
    const url = await findeFacileBild()
    if (url !== '') return url
  }
  throw new Error('Kein Bild unter ' + FACILE_BILDER_URL + ' gefunden')
}
