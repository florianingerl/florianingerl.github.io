import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildContract,
  computeFourHourPrice,
  computePrice,
  contractFilename,
  contractToHtml,
  createContractPdf,
  downloadBlob,
  subjectFactor,
  teachingLanguageFactor,
  weeksUntilExam,
  type ContractFields,
} from "./contract";

// ---------------------------------------------------------------------------
// Layout-Test für das PDF: createContractPdf zeichnet jeden Text mit jsPDF.
// Wir ersetzen jsPDF durch einen "Spion", der sich sx, y und Schriftgroesse
// jedes Textelements merkt. Dann pruefen wir, dass sich keine zwei Zeilen
// ueberlappen: Die Zeilenabstaende (1.5x Schriftgroesse) muessen eingehalten
// werden. Genau daran scheiterte die alte Version (Absaetze rückten nur um
// wenige Punkte statt um die volle Zeilenhoehe nach unten).
// ---------------------------------------------------------------------------
const mocks = vi.hoisted(() => ({
  calls: [] as { text: string[]; x: number; y: number; size: number; page: number }[],
  page: 0,
}));

vi.mock("jspdf", () => ({
  jsPDF: class {
    internal = {
      pageSize: { getWidth: () => 595.28, getHeight: () => 841.89 },
    };
    private size = 12;
    setProperties(): void {}
    setFont(_font: string): void {}
    setFontSize(size: number): void {
      this.size = size;
    }
    addPage(): void {
      mocks.page += 1;
    }
    getTextWidth(): number {
      return 12;
    }
    splitTextToSize(text: string): string[] {
      return [text];
    }
    text(text: string | string[], x: number, y: number): void {
      mocks.calls.push({
        text: Array.isArray(text) ? text : [text],
        x,
        y,
        size: this.size,
        page: mocks.page,
      });
    }
    output(): Blob {
      return new Blob([], { type: "application/pdf" });
    }
  },
}));

const LINE_HEIGHT = (fs: number): number => Math.ceil(fs * 1.5);

function dummyFields(): ContractFields {
  const price = computePrice("Mathematik", "2027-05-10", "de");
  return {
    firstName: "Erika",
    lastName: "Mustermann",
    address: "Beispielweg 12, 80992 München",
    subject: "Mathematik",
    goal: "eine 2 im Mathe-Abitur",
    institution: "Beispiel-Gymnasium München",
    date: "10.5.2027",
    price: price.price,
  };
}

interface Baseline {
  y: number;
  fs: number;
  page: number;
}

function collectBaselines(): Baseline[] {
  const out: Baseline[] = [];
  for (const c of mocks.calls) {
    const last = out[out.length - 1];
    if (last && last.page === c.page && Math.abs(last.y - c.y) < 0.5) {
      last.fs = Math.max(last.fs, c.size);
    } else {
      out.push({ y: c.y, fs: c.size, page: c.page });
    }
  }
  return out;
}

function expectNoOverlappingLines(lines: Baseline[]): void {
  for (let i = 1; i < lines.length; i++) {
    const prev = lines[i - 1];
    const cur = lines[i];
    if (prev.page !== cur.page) continue;
    const fs = Math.min(prev.fs, cur.fs);
    const gap = cur.y - prev.y;
    expect(gap).toBeGreaterThanOrEqual(LINE_HEIGHT(fs) * 0.85);
  }
}

describe("createContractPdf Layout", () => {
  beforeEach(() => {
    mocks.calls = [];
    mocks.page = 0;
  });

  it("erzeugt ein PDF (Blob) und rueckt keine Zeilen in den Autoraeumen", () => {
    const blocks = buildContract("de", dummyFields());
    const blob = createContractPdf(blocks, blocks[0].text);
    expect(blob).toBeInstanceOf(Blob);
    expect(mocks.calls.length).toBeGreaterThan(0);
    expectNoOverlappingLines(collectBaselines());
  });

  it("haelt den Zeilenabstand auch bei langen, umbrechenden Absaetzen ein", () => {
    const blocks = buildContract("de", {
      ...dummyFields(),
      goal: "ein sehr anspruchsvolles Ziel, das in diesem Test bewusst lang und mit vielen Wörtern beschrieben wird",
    });
    createContractPdf(blocks, blocks[0].text);
    expectNoOverlappingLines(collectBaselines());
  });

  it("verbindet Titel, Ueberschriften, Listen und Signaturen ueberlappungsfrei", () => {
    const blocks = buildContract("en", {
      ...dummyFields(),
      firstName: "John",
      lastName: "Doe",
      address: "123 Any Street, Somewhere",
      subject: "English",
      goal: "an A grade",
      institution: "Example College",
      price: computePrice("English", "2027-05-10", "en").price,
    });
    const blob = createContractPdf(blocks, blocks[0].text);
    expect(blob).toBeInstanceOf(Blob);
    expectNoOverlappingLines(collectBaselines());
  });
});

describe("computePrice: Alles-oder-Nichts-Formel (w*3h + r*m)*f*lg", () => {
  // Fester Stichtag, damit die Wochenzahl exakt ist: 4 Wochen bis zur Pruefung.
  const heute = new Date(2027, 3, 12);
  const pruefung = "2027-05-10";

  it("berechnet 460 Euro bei 4 Wochen und f=lg=1 (Beispiel aus Preise.html)", () => {
    const res = computePrice("Mathematik", pruefung, "de", heute);
    expect(res.weeks).toBeCloseTo(4, 5);
    expect(res.months).toBeCloseTo(1, 5);
    expect(res.factorF).toBe(1);
    expect(res.factorLG).toBe(1);
    expect(res.price).toBe(460);
  });

  it("halbiert den Preis, wenn das Fach eine Sprache ist (f=1/2)", () => {
    const res = computePrice("Französisch", pruefung, "de", heute);
    expect(res.factorF).toBe(1 / 2);
    expect(res.price).toBe(230);
  });

  it("wendet lg=5/6 bei Unterricht auf Franzoesisch an", () => {
    const res = computePrice("Mathematik", pruefung, "fr", heute);
    expect(res.factorLG).toBe(5 / 6);
    expect(res.price).toBe(Math.round(460 * (5 / 6)));
  });

  it("wendet lg=1 bei Unterricht auf Englisch an", () => {
    const res = computePrice("Mathematik", pruefung, "en", heute);
    expect(res.factorLG).toBe(1);
    expect(res.price).toBe(460);
  });

  it("kombiniert Fach- und Sprachenfaktor", () => {
    const res = computePrice("Spanisch", pruefung, "it", heute);
    expect(res.factorF).toBe(1 / 2);
    expect(res.factorLG).toBe(5 / 6);
    expect(res.price).toBe(Math.round(460 * (1 / 2) * (5 / 6)));
  });

  it("gibt bei vergangener Pruefung den Risikobetrag zurueck", () => {
    const res = computePrice("Mathe", "2020-01-01", "de", heute);
    expect(res.weeks).toBe(0);
    expect(res.price).toBe(0);
  });

  it("teachingLanguageFactor kennt nur de und en mit 1", () => {
    expect(teachingLanguageFactor("de")).toBe(1);
    expect(teachingLanguageFactor("en")).toBe(1);
    expect(teachingLanguageFactor("fr")).toBe(5 / 6);
    expect(teachingLanguageFactor("es")).toBe(5 / 6);
    expect(teachingLanguageFactor("it")).toBe(5 / 6);
  });

  it("subjectFactor erkennt Sprachfaecher", () => {
    expect(subjectFactor("Latein")).toBe(1 / 2);
    expect(subjectFactor("Français")).toBe(1 / 2);
    expect(subjectFactor("Mathe")).toBe(1);
  });

  it("weeksUntilExam liefert Gleitkommawochen", () => {
    expect(weeksUntilExam(pruefung, heute)).toBeCloseTo(4, 5);
    expect(weeksUntilExam("", heute)).toBe(0);
    expect(weeksUntilExam("ungueltig", heute)).toBe(0);
  });
});

describe("4-Stunden-Lernpaket mit Bonus", () => {
  it("berechnet 4 * 33 = 132 Euro und 4 * 6 = 24 Euro Rueckzahlung", () => {
    const res = computeFourHourPrice();
    expect(res.lessons).toBe(4);
    expect(res.hourlyRate).toBe(33);
    expect(res.price).toBe(132);
    expect(res.refundPerLesson).toBe(6);
    expect(res.refundTotal).toBe(24);
    expect(res.priceIfGoalMissed).toBe(108);
  });

  it("erzeugt in allen Sprachen einen Vertrag ohne Alles-oder-Nichts-Texte", () => {
    const fields = { ...dummyFields(), price: computeFourHourPrice().price };
    for (const lang of ["de", "en", "fr", "es", "it"] as const) {
      const blocks = buildContract(lang, fields, "fourHourBonus");
      const text = blocks.map((b) => b.text).join("\n");
      expect(text).not.toContain("Alles-oder-Nichts");
      expect(text).not.toContain("all-or-nothing");
      expect(text).toContain("132 €");
      expect(text).toContain("6");
    }
  });

  it("verwendet den richtigen Dateinamen", () => {
    expect(contractFilename("de", "2027-05-10", "pdf")).toBe(
      "Alles-oder-Nichts-Paket_de_2027-05-10.pdf"
    );
    expect(contractFilename("de", "2027-05-10", "pdf", "fourHourBonus")).toBe(
      "4-Stunden-Lernpaket-mit-Bonus_de_2027-05-10.pdf"
    );
    expect(contractFilename("en", "2027-05-10", "rtf", "fourHourBonus")).toBe(
      "4-Stunden-Lernpaket-mit-Bonus_en_2027-05-10.rtf"
    );
  });

  it("setzt den uebergebenen Titel in das Word-HTML", () => {
    const blocks = buildContract("en", dummyFields(), "fourHourBonus");
    const html = contractToHtml(blocks, blocks[0].text);
    expect(html).toContain("<title>Contract for a 4-hour learning package with bonus");
    expect(html).toContain("<h1>Contract for a 4-hour learning package with bonus");
  });

  it("erzeugt ein ueberlappungsfreies PDF", () => {
    mocks.calls = [];
    mocks.page = 0;
    const fields = { ...dummyFields(), price: computeFourHourPrice().price };
    const blocks = buildContract("de", fields, "fourHourBonus");
    const blob = createContractPdf(blocks, blocks[0].text);
    expect(blob).toBeInstanceOf(Blob);
    expect(mocks.calls.length).toBeGreaterThan(0);
    expectNoOverlappingLines(collectBaselines());
  });
});

describe("downloadBlob: Oeffnen & stilles Speichern ohne Dialog", () => {
  const createObjectURL = vi.fn(() => "blob:fake-url");
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revokeObjectURL,
    });
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
  });

  it("oeffnet eine PDF im Viewer (neuer Tab) und speichert sie still im Download-Ordner", async () => {
    vi.useFakeTimers();
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    try {
      await downloadBlob(
        new Blob(["%PDF-1.3"], { type: "application/pdf" }),
        "Alles-oder-Nichts-Paket_de_2027-05-10.pdf"
      );
      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(open).toHaveBeenCalledWith("blob:fake-url", "_blank", "noopener");
      expect(click).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(60_000);
      expect(revokeObjectURL).toHaveBeenCalledWith("blob:fake-url");
    } finally {
      vi.useRealTimers();
      open.mockRestore();
      click.mockRestore();
    }
  });

  it("laedt RTF- und Word-Dateien still herunter, ohne sie in einem Tab zu oeffnen", async () => {
    const open = vi.spyOn(window, "open");
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    try {
      await downloadBlob(
        new Blob(["{\\rtf1"], { type: "application/rtf" }),
        "Alles-oder-Nichts-Paket_de_2027-05-10.rtf"
      );
      await downloadBlob(
        new Blob(["<html></html>"], { type: "application/msword" }),
        "Alles-oder-Nichts-Paket_de_2027-05-10.doc"
      );
      expect(open).not.toHaveBeenCalled();
      expect(click).toHaveBeenCalledTimes(2);
      expect(createObjectURL).toHaveBeenCalledTimes(2);
    } finally {
      open.mockRestore();
      click.mockRestore();
    }
  });
});