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
  return section.getByLabel("Image url");
}

test.describe("Exercise editor: Image url", () => {
  test("anlegen: Feld 'Image url' und Knopf 'Get image' sind sichtbar", async ({
    page,
  }) => {
    await mockBackend(page, []);
    await page.goto("/");

    const section = page.locator("#englisch");
    await section.getByTitle("Add a new exercise").click();

    await expect(imageUrlInput(section)).toBeVisible();
    await expect(
      section.getByRole("button", { name: "Get image" }),
    ).toBeVisible();
  });

  test("anlegen: eingegebene Bild-Adresse wird als Aufgabenbild uebernommen", async ({
    page,
  }) => {
    await mockBackend(page, []);
    await page.goto("/");

    const section = page.locator("#englisch");
    await section.getByTitle("Add a new exercise").click();

    const url = "https://example.com/pic.png";
    await imageUrlInput(section).fill(url);
    await section.getByRole("button", { name: "Get image" }).click();

    await expect(section.locator(`img[src="${url}"]`)).toBeVisible();
  });

  test("bearbeiten: Feld 'Image url' und Knopf 'Get image' sind sichtbar", async ({
    page,
  }) => {
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
    await expect(
      section.getByRole("button", { name: "Get image" }),
    ).toBeVisible();
  });
});