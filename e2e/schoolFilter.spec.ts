import { expect, test, type Page } from "@playwright/test";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};

// Zwei Aufgaben im Fach "french"; nur die erste gehoert zur Schule, die im Link
// unten steht. So laesst sich pruefen, dass der Link wirklich filtert.
const QUIZ = {
  _id: "q-french",
  website: "web",
  subject: "french",
  name: "French",
};
const SCHULE = { _id: "s-bayern", name: "9.Klasse Gymnasium Bayern" };
const THEMEN = [
  {
    _id: "t-verbes",
    subject: "french",
    title: "Verbes reflechi",
    tutorial: "<p>Tutorial</p>",
  },
];
const AUFGABEN = [
  {
    _id: "e1",
    quiz: "q-french",
    subject: "french",
    topic: "t-verbes",
    school: SCHULE,
    type: "gapText",
    imageUrl: "",
    instruction: "Setze die Verben ein",
    gapText: "Je {me} lave",
  },
  {
    _id: "e2",
    quiz: "q-french",
    subject: "french",
    topic: "t-verbes",
    type: "gapText",
    imageUrl: "",
    instruction: "Andere Aufgabe",
    gapText: "Tu {te} laves",
  },
];

async function mockBackend(page: Page): Promise<void> {
  await page.route("http://localhost:8080/**", async (route) => {
    const request = route.request();
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }
    const url = new URL(request.url());
    let data: unknown = [];
    if (request.method() === "GET") {
      if (
        url.pathname === "/api/quiz" &&
        url.searchParams.get("subject") === "french"
      ) {
        data = [QUIZ];
      } else if (url.pathname === "/api/topic/french") {
        data = THEMEN;
      } else if (url.pathname === "/api/topic/t-verbes") {
        // Das Quiz laedt das Thema der aktuellen Aufgabe ueber seine _id nach.
        data = THEMEN[0];
      } else if (url.pathname === "/api/school") {
        data = [SCHULE];
      } else if (url.pathname === "/api/exercise") {
        data = AUFGABEN;
      }
    }
    await route.fulfill({ json: data, headers: corsHeaders });
  });
}

// Genau der Link aus der Aufgabe: Franz\u00f6sisch, Thema "Verbes reflechi" und
// Schule "9.Klasse Gymnasium Bayern".
const DEEP_LINK =
  "/#franzoesisch?frenchtopic=verbesreflechi&frenchschool=9klasseGymnasiumBayern";

test.describe("Schulfilter und Deep-Link", () => {
  test("die Filterzeile steht in einer Reihe, linksbuendig und mittig", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto(DEEP_LINK);

    const zeile = page.locator("#franzoesisch .filter-component");
    await expect(zeile).toBeVisible();

    const stil = await zeile.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        display: s.display,
        flexDirection: s.flexDirection,
        justifyContent: s.justifyContent,
        gap: s.gap,
        alignItems: s.alignItems,
      };
    });
    expect(stil).toEqual({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: "3px",
      alignItems: "center",
    });

    // Themenfilter, Schulauswahl und der Knopf fuer den erweiterten Filter
    // stehen alle in dieser Zeile.
    await expect(zeile.locator(".topic-filter")).toBeVisible();
    await expect(zeile.locator("#schoolFilter-q-french")).toBeVisible();
    await expect(
      section(page).locator('button[title="Show filtering options"]'),
    ).toBeVisible();
  });

  test("der Link waehlt Thema und Schule vor und filtert die Aufgaben", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto(DEEP_LINK);

    const franzoesisch = section(page);

    // Der Themenfilter zeigt den Pfad des Themas aus dem Link.
    await expect(
      franzoesisch.locator(".topic-filter button").first(),
    ).toContainText("Verbes reflechi");

    // Die Schulauswahl steht auf der Schule aus dem Link.
    await expect(franzoesisch.locator("#schoolFilter-q-french")).toHaveValue(
      "9.Klasse Gymnasium Bayern",
    );

    // Nur die Aufgabe dieser Schule bleibt uebrig (die andere ist ausgeblendet).
    await expect(franzoesisch.locator('input[type="number"]')).toHaveAttribute(
      "max",
      "0",
    );

    // Thema und Schule stehen als Badges an der Aufgabe.
    await expect(
      franzoesisch.locator(".badge", { hasText: "Verbes reflechi" }).first(),
    ).toBeVisible();
    await expect(
      franzoesisch.locator(".badge", { hasText: "9.Klasse Gymnasium Bayern" }).first(),
    ).toBeVisible();
  });
});

function section(page: Page) {
  return page.locator("#franzoesisch");
}
