// Beispiel für eine isolierte Funktion: reine Logik ohne Vue oder DOM.
// Solche Funktionen lassen sich direkt mit Vitest testen (siehe multiply.test.ts).
export function multiply(a: number, b: number): number {
  return a * b;
}
