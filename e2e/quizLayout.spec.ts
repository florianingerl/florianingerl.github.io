import { expect, test, type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

// Ein kleines Bild als Data-URI: 400x300 Pixel, damit es ohne Netzwerk laedt.
const BILD =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23aaccff'/%3E%3C/svg%3E";

// Der Backend-Server laeuft in den E2E-Tests nicht. Eine einzige Aufgabe mit
// Bild wird ausgeliefert, damit sich das Layout pruefen laesst.
async function mockBackend(page: Page): Promise<void> {
  await page.addInitScript(() => {
    localStorage.setItem("quiz-app-token", "e2e-token");
  });
  await page.route("http://localhost:8080/**", async (route) => {
    const request = route.request();
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }
    const url = new URL(request.url());
    let data: unknown = [];
    if (request.method() === "GET") {
      if (url.pathname === "/api/auth/user") {
        data = { _id: "u1", name: "E2E Tester", email: "e2e@example.com" };
      } else if (url.pathname === "/api/quiz") {
        data = [
          { _id: "q-english", website: "web", subject: "english", name: "English" },
        ];
      } else if (url.pathname === "/api/exercise") {
        data = [
          {
            _id: "ex-bild",
            quiz: "q-english",
            subject: "english",
            type: "multipleChoice",
            imageUrl: BILD,
            question: "Was ist auf dem Bild zu sehen?",
            options: [
              { option: "ein Rechteck", correct: true },
              { option: "ein Kreis", correct: false },
            ],
          },
        ];
      }
    }
    await route.fulfill({ json: data, headers: corsHeaders });
  });
}

test.describe("Quiz-Layout: Inhalt neben dem Bild, Paginierung darunter", () => {
  test("Frage und Antworten stehen direkt neben, die Paginierung unter dem Bild", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/");
    await page.locator('.language-bar a[title="English"]').click();

    const section = page.locator("#englisch");
    const bild = section.locator(".vue-image__img");
    await expect(bild).toBeVisible();
    await expect(section.getByText("Was ist auf dem Bild zu sehen?")).toBeVisible();

    const bildBox = await bild.boundingBox();
    const inhaltBox = await section.locator(".vue-image__inhalt").boundingBox();
    const paginationBox = await section.locator("ul.pagination").boundingBox();
    if (!bildBox || !inhaltBox || !paginationBox) throw new Error("kein Layout");

    // Der Inhalt beginnt direkt am rechten Bildrand (Toleranz 2px).
    expect(Math.abs(inhaltBox.x - (bildBox.x + bildBox.width))).toBeLessThanOrEqual(2);

    // Die Paginierung steht unter dem Bild und beginnt an dessen linkem Rand.
    expect(paginationBox.y).toBeGreaterThanOrEqual(bildBox.y + bildBox.height - 2);
    expect(Math.abs(paginationBox.x - bildBox.x)).toBeLessThanOrEqual(2);
  });
});
