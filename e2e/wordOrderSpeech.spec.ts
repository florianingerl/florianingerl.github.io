import { expect, test, type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

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
            _id: "ex-word-order",
            quiz: "q-english",
            subject: "english",
            type: "wordOrder",
            imageUrl: "",
            questionOrInstruction: "",
            wordorder: { sentence: "The duck wears a hat" },
          },
        ];
      }
    }
    await route.fulfill({ json: data, headers: corsHeaders });
  });
}

async function speechAufzeichnen(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const aufrufe: string[] = [];
    (window as unknown as { __spoken: string[] }).__spoken = aufrufe;
    class FakeUtterance {
      text: string;
      lang = "";
      voice: unknown = null;
      constructor(text = "") {
        this.text = text;
      }
    }
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      value: FakeUtterance,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        speak: (utterance: { text: string; lang: string }) =>
          aufrufe.push(`${utterance.text}|${utterance.lang}`),
        cancel: () => undefined,
        getVoices: () => [],
        addEventListener: () => undefined,
      },
      writable: true,
      configurable: true,
    });
  });
}

function gesprochen(page: Page): Promise<string[]> {
  return page.evaluate(
    () => (window as unknown as { __spoken: string[] }).__spoken,
  );
}

test.describe("Wortstellung: die Loesung wird vorgelesen", () => {
  test("liest die Loesung vor, wenn die richtige Antwort eingegeben wird", async ({
    page,
  }) => {
    await mockBackend(page);
    await speechAufzeichnen(page);
    await page.goto("/");
    await page.locator('.language-bar a[title="English"]').click();

    await page
      .locator("#englisch")
      .locator('input[type="text"]')
      .fill("The duck wears a hat");

    await expect.poll(async () => (await gesprochen(page)).length).toBeGreaterThan(0);
    expect(await gesprochen(page)).toContain("The duck wears a hat|en-US");
  });

  test("liest die Loesung vor, wenn die Loesung gezeigt wird", async ({ page }) => {
    await mockBackend(page);
    await speechAufzeichnen(page);
    await page.goto("/");
    await page.locator('.language-bar a[title="English"]').click();

    await page
      .locator("#englisch")
      .getByRole("button", { name: "Show me the solution" })
      .click();

    await expect.poll(async () => (await gesprochen(page)).length).toBeGreaterThan(0);
    expect(await gesprochen(page)).toContain("The duck wears a hat|en-US");
  });

  test("liest nichts vor, wenn die Antwort falsch ist", async ({ page }) => {
    await mockBackend(page);
    await speechAufzeichnen(page);
    await page.goto("/");
    await page.locator('.language-bar a[title="English"]').click();

    const abschnitt = page.locator("#englisch");
    await abschnitt.locator('input[type="text"]').fill("The duck wears a cap");
    await abschnitt.getByRole("button", { name: "Validate" }).click();

    expect(await gesprochen(page)).toEqual([]);
  });
});
