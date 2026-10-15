import { http, HttpResponse } from "msw";
import { API_URL } from "@/api";

// Diese Handler beschreiben das Verhalten des "anderen Servers" (unseres
// Backends). In den Vitest-Tests werden sie von MSW abgefangen: Es läuft kein
// echter Server, die Anfrage bekommt trotzdem eine echte HTTP-Antwort.
//
// Einzelne Tests können das Verhalten mit `server.use(...)` überschreiben
// (siehe ABackendPing.test.ts).
export const handlers = [
  http.get(`${API_URL}/api/ping`, () =>
    HttpResponse.json({ message: "pong", server: "mocked-backend" }),
  ),
  // Die Schulliste ist im Test standardmaessig leer. Einzelne Tests koennen mit
  // server.use(...) eine eigene Liste liefern.
  http.get(`${API_URL}/api/school`, () => HttpResponse.json([])),
  // Eine neue Schule wird mit einer festen _id beantwortet.
  http.post(`${API_URL}/api/school`, async ({ request }) => {
    const { name } = (await request.json()) as { name: string };
    return HttpResponse.json({ _id: "mocked-school-id", name });
  }),
];
