import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "@/mocks/server";

// Wird von Vitest vor allen Tests geladen (vite.config.ts -> test.setupFiles).
// MSW fängt die Anfragen an den "anderen Server" ab, damit die Unit-Tests ohne
// laufendes Backend und ohne Internet funktionieren.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
