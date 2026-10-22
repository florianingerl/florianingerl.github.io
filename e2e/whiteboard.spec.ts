import { expect, test, type Page } from "@playwright/test";

const corsHeaders = {
	"access-control-allow-origin": "*",
	"access-control-allow-headers": "*",
	"access-control-allow-methods": "*",
};

// Der Backend-Server laeuft in den E2E-Tests nicht. Alle Anfragen an ihn
// werden mit einer leeren Liste beantwortet, damit die Startseite rendert.
async function mockBackend(page: Page): Promise<void> {
	await page.route("http://localhost:8080/**", async (route) => {
		const request = route.request();
		if (request.method() === "OPTIONS") {
			await route.fulfill({ status: 204, headers: corsHeaders });
			return;
		}
		await route.fulfill({ json: [], headers: corsHeaders });
	});
}

test.describe("Whiteboard-Seite", () => {
	test("zeigt nur Sprache, Menueleiste und den Knopf; danach zurueck zur Startseite", async ({
		page,
	}) => {
		await mockBackend(page);
		await page.goto("/");

		// Auf der Startseite sind Inhalt und Fusszeile sichtbar.
		await expect(page.locator("#main")).toBeVisible();
		await expect(page.locator("#footer")).toBeVisible();

		// Klick auf den Menuepunkt "Whiteboard".
		await page.locator('a[href="/whiteboard"]').click();

		// Nur die Whiteboard-Seite mit dem gruenen Knopf ist uebrig.
		await expect(page).toHaveURL(/\/whiteboard$/);
		// Der Knopf traegt den Text der Sprache der Seite (Standard: Deutsch).
		await expect(
			page.getByRole("button", { name: "Neues Whitepaper anlegen" }),
		).toBeVisible();
		await expect(page.locator("#main")).toHaveCount(0);
		await expect(page.locator("#footer")).toHaveCount(0);

		// Sprache und Menueleiste bleiben sichtbar.
		await expect(page.locator(".language-bar")).toBeVisible();
		await expect(page.locator("#navbar")).toBeVisible();

		// Ein anderer Menuepunkt fuehrt zurueck zur Startseite mit Sektion.
		await page.locator('a[href="/#uebermich"]').first().click();
		await expect(page).toHaveURL(/#uebermich$/);
		await expect(page.locator("#main")).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Neues Whitepaper anlegen" }),
		).toHaveCount(0);
	});
});
