// Das Token des Backend-Servers wird im localStorage gehalten, damit die
// Anmeldung ein Neuladen der Seite uebersteht. Getrennt von api.ts, weil der
// Axios-Interceptor hier den Token liest und der Store ihn schreibt, ohne dass
// die beiden Module einander importieren muessen.

const SCHLUESSEL = "quiz-app-token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(SCHLUESSEL);
  } catch {
    // Im privaten Modus kann der localStorage fehlen.
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token === null) {
      localStorage.removeItem(SCHLUESSEL);
    } else {
      localStorage.setItem(SCHLUESSEL, token);
    }
  } catch {
    // Dann gilt die Anmeldung eben nur fuer diese Seite.
  }
}
