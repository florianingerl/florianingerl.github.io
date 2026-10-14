import { expect, test, type Locator, type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

async function mockBackend(
  page: Page,
  seedExercises: Array<Record<string, unknown>> = [],
): Promise<void> {
  const quiz = {
    _id: "q-english",
    website: "web",
    subject: "english",
    name: "English",
  };
  const user = { _id: "u1", name: "E2E Tester", email: "e2e@example.com" };
  const createdExercises: Array<Record<string, unknown>> = [...seedExercises];

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
    if (request.method() === "POST" && url.pathname === "/api/exercise") {
      const body = request.postDataJSON() as Record<string, unknown>;
      const stored = { ...body, _id: "ex-created" };
      createdExercises.push(stored);
      await route.fulfill({
        status: 201,
        headers: corsHeaders,
        json: stored,
      });
      return;
    }
    let data: unknown = [];
    if (request.method() === "GET") {
      if (url.pathname === "/api/auth/user") {
        data = user;
      } else if (
        url.pathname === "/api/quiz" &&
        url.searchParams.get("subject") === "english"
      ) {
        data = [quiz];
      } else if (url.pathname === "/api/exercise") {
        data = createdExercises;
      }
    }
    await route.fulfill({ json: data, headers: corsHeaders });
  });
}

function typeSelect(section: Locator): Locator {
  return section.locator('div:has(> label:text-is("Type:")) > select');
}

function optionRow(section: Locator, text: string): Locator {
  return section
    .locator('div:has(> input[type="checkbox"])')
    .filter({ hasText: text });
}

test.describe("multiple choice: erstellen und loesen", () => {
  test("erste Option gruen, falsche Option rot", async ({ page }) => {
    await mockBackend(page);
    await page.goto("/");

    await page.locator('.language-bar a[title="English"]').click();

    const section = page.locator("#englisch");
    await section.getByTitle("Add a new exercise").click();

    await typeSelect(section).selectOption("multipleChoice");

    const optionsBox = section.locator("div.mb-3.mt-3").nth(1);
    const newOptionInput = optionsBox.locator('input[type="text"]');
    const addButton = optionsBox.locator("button", { hasText: "Add" });
    for (const option of ["Haus", "Maus", "Hose"]) {
      await newOptionInput.fill(option);
      await addButton.click();
    }

    await section.getByRole("button", { name: "Save" }).click();

    const haus = optionRow(section, "Haus");
    await haus.locator('input[type="checkbox"]').check();
    await expect(haus).toHaveClass(/correct/);

    await section.getByRole("button", { name: "Retry" }).click();

    const maus = optionRow(section, "Maus");
    await maus.locator('input[type="checkbox"]').check();
    await expect(maus).toHaveClass(/notcorrect/);
  });

  test("auch nach Neuladen (Server-Roundtrip) gruen/rot", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/");

    await page.locator('.language-bar a[title="English"]').click();

    const section = page.locator("#englisch");
    await section.getByTitle("Add a new exercise").click();

    await typeSelect(section).selectOption("multipleChoice");

    const optionsBox = section.locator("div.mb-3.mt-3").nth(1);
    const newOptionInput = optionsBox.locator('input[type="text"]');
    const addButton = optionsBox.locator("button", { hasText: "Add" });
    for (const option of ["Haus", "Maus", "Hose"]) {
      await newOptionInput.fill(option);
      await addButton.click();
    }

    await section.getByRole("button", { name: "Save" }).click();

    await page.reload();

    const haus = optionRow(section, "Haus");
    await haus.locator('input[type="checkbox"]').check();
    await expect(haus).toHaveClass(/correct/);

    await section.getByRole("button", { name: "Retry" }).click();

    const maus = optionRow(section, "Maus");
    await maus.locator('input[type="checkbox"]').check();
    await expect(maus).toHaveClass(/notcorrect/);
  });

  test("Altdaten mit mehreren richtigen Optionen: richtige Antwort gruen", async ({
    page,
  }) => {
    await mockBackend(page, [
      {
        _id: "ex-legacy",
        quiz: "q-english",
        subject: "english",
        type: "multipleChoice",
        imageUrl: "",
        question: "Was ist Reiki?",
        options: [
          { option: "Reiki", correct: true },
          { option: "Kaffee", correct: true },
          { option: "Zucker", correct: false },
        ],
      },
    ]);
    await page.goto("/");

    await page.locator('.language-bar a[title="English"]').click();

    const section = page.locator("#englisch");
    const reiki = optionRow(section, "Reiki");
    await reiki.locator('input[type="checkbox"]').check();
    await expect(reiki).toHaveClass(/correct/);
  });
});
