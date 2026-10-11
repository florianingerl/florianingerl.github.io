import { expect, test, type Page } from "@playwright/test";

// Login- und Registrierdialog sind Bootstrap-Modals. Der Backend-Server wird
// gemockt, damit die Quiz-Seite ohne echten Server lädt; danach wird nur
// geprüft, ob sich das jeweilige Modal öffnen und über den Schließen-Knopf
// wieder schließen lässt.
async function mockBackend(page: Page): Promise<void> {
  const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "*",
  };

  await page.route("http://localhost:8080/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }
    await route.fulfill({ json: [], headers: corsHeaders });
  });
}

test.beforeEach(async ({ page }) => {
  await mockBackend(page);
});

test.describe("Login dialog", () => {
  test("shows up as a modal and closes again", async ({ page }) => {
    await page.goto("/auth.html");

    await page.getByRole("button", { name: "Login" }).click();

    const modal = page.locator("#loginModal");
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal/);

    const closeButton = modal.getByRole("button", { name: "Close" });
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(modal).toBeHidden();
  });
});

test.describe("Sign up dialog", () => {
  test("shows up as a modal and closes again", async ({ page }) => {
    await page.goto("/auth.html");

    await page.getByRole("button", { name: "Sign up" }).click();

    const modal = page.locator("#signupModal");
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal/);

    const closeButton = modal.getByRole("button", { name: "Close" });
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(modal).toBeHidden();
  });
});
