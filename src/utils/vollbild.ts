// Regeln fuer die Groesse des Aufgabenbildes im Vollbildmodus.
//
// Das Bild soll die verfuegbare Hoehe ausfuellen; seine Breite ergibt sich aus
// dem Seitenverhaeltnis, damit die Proportionen erhalten bleiben.
//
// Bleiben rechts neben dem Bild weniger als MINDEST_PLATZ_RECHTS Pixel uebrig,
// wird die Breite auf (Viewportbreite - MINDEST_PLATZ_RECHTS) begrenzt. Die
// Hoehe folgt dann wieder dem Seitenverhaeltnis.

export const MINDEST_PLATZ_RECHTS = 400;

export interface VollbildMasse {
  // Breite des Viewports in Pixeln.
  viewportBreite: number;
  // Hoehe, die dem Bild im Vollbildmodus zur Verfuegung steht.
  verfuegbareHoehe: number;
  // Natuerliche Breite des Bildes.
  bildBreite: number;
  // Natuerliche Hoehe des Bildes.
  bildHoehe: number;
  // So viele Pixel muessen rechts neben dem Bild frei bleiben.
  mindestPlatzRechts?: number;
}

export interface BildGroesse {
  breite: number;
  hoehe: number;
}

// Berechnet Breite und Hoehe des Bildes im Vollbildmodus.
export function bildGroesseImVollbild({
  viewportBreite,
  verfuegbareHoehe,
  bildBreite,
  bildHoehe,
  mindestPlatzRechts = MINDEST_PLATZ_RECHTS,
}: VollbildMasse): BildGroesse {
  if (bildBreite <= 0 || bildHoehe <= 0) return { breite: 0, hoehe: 0 };

  const hoehe = Math.max(0, verfuegbareHoehe);
  const verhaeltnis = bildBreite / bildHoehe;

  // Zuerst die verfuegbare Hoehe ausfuellen.
  let breite = hoehe * verhaeltnis;
  let endHoehe = hoehe;

  // Falls rechts weniger als der Mindestplatz uebrig bliebe, die Breite
  // begrenzen und die Hoehe anpassen.
  const maxBreite = Math.max(0, viewportBreite - mindestPlatzRechts);
  if (breite > maxBreite) {
    breite = maxBreite;
    endHoehe = verhaeltnis > 0 ? breite / verhaeltnis : 0;
  }

  return { breite, hoehe: endHoehe };
}
