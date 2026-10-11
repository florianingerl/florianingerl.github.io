import { expect, test } from "@playwright/test";

// Beispiel-E2E-Test: testet dieselbe Dummy-Funktionalität wie der
// Vue-Test-Utils-Test, aber in einem echten Browser.
test.describe("Dummy counter", () => {
  test("increments, updates parity and greets the name", async ({ page }) => {
    await page.goto("/dummy.html");

    const button = page.getByTestId("increment");
    await expect(button).toHaveText(/count is 0/);
    await expect(page.getByTestId("parity")).toHaveText("even");

    await button.click();
    await expect(button).toHaveText(/count is 1/);
    await expect(page.getByTestId("parity")).toHaveText("odd");

    await page.getByTestId("name").fill("Florian");
    await expect(page.getByTestId("greeting")).toHaveText("Hello Florian");
  });
});
