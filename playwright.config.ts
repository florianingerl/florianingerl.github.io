import { defineConfig, devices } from "@playwright/test";

// E2E-Tests starten den Vite-Entwicklungsserver und öffnen echte Browser.
// Die Tests liegen in e2e/. Unit-Tests (Vitest) laufen getrennt über vite.config.ts.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --port 5173 --strictPort",
    url: "http://localhost:5173/dummy.html",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
