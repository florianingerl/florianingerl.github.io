import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Der MSW-Server läuft im Node-Prozess (Vitest/jsdom). Er fängt die vom
// Frontend ausgelösten HTTP-Anfragen ab. Lebenszyklus siehe src/test/setup.ts.
export const server = setupServer(...handlers);
