import { expect, test, type Locator, type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

async function mockBackend(page: Page, exercises: unknown[]): Promise<void> {
  const quiz = {
    _id: "q-english",
    website: "web",
    subject: "english",
    name: "English",
  };
  const user = { _id: "u1", name: "E2E Tester", email: "e2e@example.com" };

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
        data = user;
      } else if (
        url.pathname === "/api/quiz" &&
        url.searchParams.get("subject") === "english"
      ) {
        data = [quiz];
      } else if (
        url.pathname === "/api/exercise" &&
        url.searchParams.get("subject") === "english"
      ) {
        data = exercises;
      }
    }
    await route.fulfill({ json: data, headers: corsHeaders });
  });
}

function imageUrlInput(section: Locator) {
  return section.getByLabel("URL:");
}

test.describe("Exercise editor: Image url", () => {
  test("anlegen: Feld 'URL:' und Bildwaehler sind sichtbar", async ({
    page,
  }) => {
    await mockBackend(page, []);
    await page.goto("/");

    const section = page.locator("#englisch");
    await section.getByTitle("Add a new exercise").click();

    await expect(imageUrlInput(section)).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get random image from Facile" }),
    ).toBeVisible();
  });

  test("anlegen: eingegebene Bild-Adresse wird sofort als Aufgabenbild uebernommen", async ({
    page,
  }) => {
    await mockBackend(page, []);
    await page.goto("/");

    const section = page.locator("#englisch");
    await section.getByTitle("Add a new exercise").click();

    const url = "https://example.com/pic.png";
    await imageUrlInput(section).fill(url);

    await expect(section.locator(`img[src="${url}"]`)).toBeVisible();
  });

  test("bearbeiten: Feld 'URL:' ist sichtbar", async ({ page }) => {
    const exercise = {
      _id: "ex1",
      quiz: "q-english",
      type: "multipleChoice",
      imageUrl: "",
      question: "What does 'maison' mean?",
      options: [
        { option: "house", correct: true },
        { option: "table", correct: false },
      ],
      user: "u1",
    };
    await mockBackend(page, [exercise]);
    await page.goto("/");

    const section = page.locator("#englisch");
    await section.getByTitle("Edit the exercise").click();

    await expect(imageUrlInput(section)).toBeVisible();
  });
});

// Bei breitem Layout bleiben die Anlagen von Schule und Thema nebeneinander
// sichtbar; wird der Behälter zu schmal, klappen sie (per Container-Abfrage) zu
// einem Knopf zusammen, der das Formular als Overlay oeffnet.
test.describe("Exercise editor: Anlagen klappen bei schmalem Layout ein", () => {
  test.describe("breites Layout", () => {
    test.use({ viewport: { width: 1400, height: 900 } });

    test("Schule und Thema bleiben inline sichtbar", async ({ page }) => {
      await mockBackend(page, []);
      await page.goto("/");
      const section = page.locator("#englisch");
      await section.getByTitle("Add a new exercise").click();

      await expect(section.locator("#newSchoolName")).toBeVisible();
      await expect(section.locator("#newTopicTitle")).toBeVisible();
      await expect(section.locator(".school-creator__toggle")).toBeHidden();
      await expect(section.locator(".topic-creator__toggle")).toBeHidden();
    });
  });

  test.describe("schmales Layout", () => {
    test.use({ viewport: { width: 420, height: 900 } });

    test("die Schul-Anlage wird zum Overlay-Knopf", async ({ page }) => {
      await mockBackend(page, []);
      await page.goto("/");
      const section = page.locator("#englisch");
      await section.getByTitle("Add a new exercise").click();

      const umschalter = section.locator(".school-creator__toggle");
      await expect(umschalter).toBeVisible();
      await expect(section.locator("#newSchoolName")).toBeHidden();

      await umschalter.click();
      await expect(section.locator("#newSchoolName")).toBeVisible();

      // Escape schliesst das Overlay wieder.
      await page.keyboard.press("Escape");
      await expect(section.locator("#newSchoolName")).toBeHidden();
    });

    test("die Themen-Anlage wird zum Overlay-Knopf", async ({ page }) => {
      await mockBackend(page, []);
      await page.goto("/");
      const section = page.locator("#englisch");
      await section.getByTitle("Add a new exercise").click();

      const umschalter = section.locator(".topic-creator__toggle");
      await expect(umschalter).toBeVisible();
      await expect(section.locator("#newTopicTitle")).toBeHidden();

      await umschalter.click();
      await expect(section.locator("#newTopicTitle")).toBeVisible();

      // Ein Klick ausserhalb schliesst das Overlay wieder.
      await page.locator("body").click({ position: { x: 5, y: 5 } });
      await expect(section.locator("#newTopicTitle")).toBeHidden();
    });
  });
});