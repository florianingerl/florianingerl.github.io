import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildContract,
  computePrice,
  createContractPdf,
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
  const price = computePrice("Mathematik", "2027-05-10");
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
      price: computePrice("English", "2027-05-10").price,
    });
    const blob = createContractPdf(blocks, blocks[0].text);
    expect(blob).toBeInstanceOf(Blob);
    expectNoOverlappingLines(collectBaselines());
  });
});