// Bootstrap-Modals sperren das Scrollen der Seite, solange der body die Klasse
// "modal-open" traegt (CSS: body.modal-open { overflow: hidden }). Wird ein
// Modal entfernt, waehrend es noch offen ist (z.B. nach erfolgreicher Anmeldung
// oder Registrierung, wenn der Eltern-Dialog sofort schliesst), stellt Bootstrap
// diese Klasse nicht selbst zurueck und die Seite ist nicht mehr scrollbar.
// Diese Funktion raeumt den body wieder auf, damit die Scroll-Sperre niemals
// haengen bleibt. Da in dieser App immer nur ein Modal gleichzeitig offen ist,
// darf sie ohne Ruecksprache ruhig alle Spuren entfernen.
export function modalScrollSperreEntfernen(): void {
  document.body.classList.remove("modal-open");
  document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
  // Bootstrap bearbeitet den body auch inline (padding-right wegen des
  // verschobenen Scrollbalkens); solche Reste gehoeren ebenfalls weg.
  document.body.style.removeProperty("padding-right");
  document.body.style.removeProperty("overflow");
}