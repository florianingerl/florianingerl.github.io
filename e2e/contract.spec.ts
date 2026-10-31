import { expect, test, type Page } from "@playwright/test";

// Rueckt auf der Startseite den Vertragsdialog auf und fuellt die
// Pflichtfelder, bis die drei Download-Buttons erscheinen.
async function openDialogAndGenerate(
  page: Page,
  openButton = "#contract-open-all-or-nothing"
) {
  await page.goto("/");
  await page.locator(openButton).click();
  const dialog = page.locator(".contract-dialog");
  await expect(dialog).toBeVisible();
  await page.locator("#contract-date").fill("2027-05-10");
  await page.locator("#contract-institution").fill("Beispiel-Gymnasium München");
  await page.locator("#contract-first-name").fill("Erika");
  await page.locator("#contract-last-name").fill("Mustermann");
  await page.locator("#contract-address").fill("Beispielweg 12, 80992 München");
  await page.locator("#contract-goal").fill("eine 2 im Mathe-Abitur");
  await page.locator("#contract-subject").fill("Mathematik");
  await dialog.locator(".contract-footer .btn-primary").click();
  return dialog;
}

test.describe("Vertrags-Download ohne weiteren Klick", () => {
  test("PDF oeffnet sich automatisch im Viewer und wird zugleich still gespeichert", async ({
    page,
  }) => {
    const dialog = await openDialogAndGenerate(page);

    // Der Headless-Chromium hält Popups bei blob:-Zielen auf about:blank;
    // deshalb merken wir uns die aufgerufene URL über window.open.
    await page.evaluate(() => {
      const w = window as unknown as { __contractOpenedUrl: string };
      w.__contractOpenedUrl = "";
      const original = window.open.bind(window);
      window.open = (url?: string, target?: string, features?: string) => {
        w.__contractOpenedUrl = String(url ?? "");
        return original(url, target, features);
      };
    });
    const downloadPromise = page.waitForEvent("download");
    await dialog.getByRole("button", { name: /PDF/i }).click();

    const download = await downloadPromise;
    const openedUrl = await page.evaluate(
      () => (window as unknown as { __contractOpenedUrl: string }).__contractOpenedUrl
    );
    expect(openedUrl).toMatch(/^blob:/);
    expect(download.suggestedFilename()).toBe("Alles-oder-Nichts-Paket_de_2027-05-10.pdf");
  });

  test("RTF und Word werden ohne Dialog still heruntergeladen", async ({ page }) => {
    const dialog = await openDialogAndGenerate(page);

    const rtfPromise = page.waitForEvent("download");
    await dialog.getByRole("button", { name: /RTF/i }).click();
    expect((await rtfPromise).suggestedFilename()).toBe(
      "Alles-oder-Nichts-Paket_de_2027-05-10.rtf"
    );

    const docPromise = page.waitForEvent("download");
    await dialog.getByRole("button", { name: /Word/i }).click();
    expect((await docPromise).suggestedFilename()).toBe(
      "Alles-oder-Nichts-Paket_de_2027-05-10.doc"
    );
  });

  test("4-Stunden-Lernpaket: Preis 132 Euro und eigener Dateiname", async ({ page }) => {
    const dialog = await openDialogAndGenerate(page, "#contract-open-four-hour");
    await expect(dialog).toContainText("132");

    const downloadPromise = page.waitForEvent("download");
    await dialog.getByRole("button", { name: /PDF/i }).click();
    expect((await downloadPromise).suggestedFilename()).toBe(
      "4-Stunden-Lernpaket-mit-Bonus_de_2027-05-10.pdf"
    );
  });
});
