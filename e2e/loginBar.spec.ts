import { expect, test, type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

// Der Backend-Server laeuft in den E2E-Tests nicht. Je nach Szenario wird ein
// angemeldeter Benutzer mit einer sehr langen Email ausgeliefert.
async function mockBackend(page: Page, email?: string): Promise<void> {
  await page.route("http://localhost:8080/**", async (route) => {
    const request = route.request();
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }
    const url = new URL(request.url());
    let data: unknown = [];
    if (request.method() === "GET") {
      if (url.pathname === "/api/auth/user" && email) {
        data = { _id: "u1", name: "E2E Tester", email };
      }
    }
    await route.fulfill({ json: data, headers: corsHeaders });
  });
}

test.describe("Login-Leiste: Tooltip und Ellipsis", () => {
  test("abgemeldet: der Hinweis ist ein Label mit Tooltip und Ellipsis", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/auth.html");

    const hinweis = page.locator("label.login-to-edit__ellipsis");
    await expect(hinweis).toBeVisible();
    await expect(hinweis).toHaveAttribute(
      "title",
      "Log in to create, edit or delete exercises and tutorials."
    );
    await expect(hinweis).toHaveText(
      "Log in to create, edit or delete exercises and tutorials."
    );

    const stil = await hinweis.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        overflow: cs.overflow,
        textOverflow: cs.textOverflow,
        whiteSpace: cs.whiteSpace,
      };
    });
    expect(stil).toEqual({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    });
  });

  test("angemeldet: der Benutzer-Badge traegt denselben Text als Tooltip und schrumpft mit Ellipsis", async ({
    page,
  }) => {
    const email =
      "sehr.sehr.langer.benutzername.mit.sehr.vielen.zeichen.und.noch.viel.mehr.zeichen@beispiel-domain-mit-sehr-langem-namen.de";
    await page.setViewportSize({ width: 360, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem("quiz-app-token", "e2e-token");
    });
    await mockBackend(page, email);
    await page.goto("/auth.html");

    const badge = page.locator(".badge.text-bg-success");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute("title", "You are logged in as " + email);
    await expect(badge).toHaveClass(/login-to-edit__ellipsis/);

    const stil = await badge.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        overflow: cs.overflow,
        textOverflow: cs.textOverflow,
        whiteSpace: cs.whiteSpace,
      };
    });
    expect(stil).toEqual({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    });

    // In einem begrenzten Platz (hier erzwungen, damit der Test nicht von der
    // Fensterbreite abhaengt) wird die lange Email tatsaechlich mit "..." gekuerzt.
    await page.addStyleTag({
      content: '.badge.text-bg-success { max-width: 160px; }',
    });
    const abgeschnitten = await badge.evaluate(
      (el) => el.scrollWidth > el.clientWidth
    );
    expect(abgeschnitten).toBe(true);
  });
});
