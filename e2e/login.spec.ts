import { expect, test } from "@playwright/test";

// Der Login-Dialog ist ein Bootstrap-Modal. Der Backend-Server wird gemockt,
// damit die Quiz-Seite ohne echten Server lädt; danach wird nur geprüft, ob
// sich das Modal öffnen und über den Schließen-Knopf wieder schließen lässt.
test.describe("Login dialog", () => {
  test.beforeEach(async ({ page }) => {
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
  });

  test("shows up as a modal and closes again", async ({ page }) => {
    await page.goto("/login.html");

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
