import { describe, expect, it } from "vitest";
import { bildGroesseImVollbild, MINDEST_PLATZ_RECHTS } from "./vollbild";

describe("bildGroesseImVollbild", () => {
  it("fuellt die verfuegbare Hoehe und folgt dabei dem Seitenverhaeltnis", () => {
    // Hochkantbild (1:2). Bei 1000px Hoehe ist es 500px breit; rechts bleiben
    // 1500px uebrig, also greift die 400px-Regel nicht.
    expect(
      bildGroesseImVollbild({
        viewportBreite: 2000,
        verfuegbareHoehe: 1000,
        bildBreite: 800,
        bildHoehe: 1600,
      }),
    ).toEqual({ breite: 500, hoehe: 1000 });
  });

  it("begrenzt ein breites Bild auf Viewportbreite - 400px", () => {
    // Querformatbild (2:1). Es waere 2000px breit, rechts bliebe nichts uebrig,
    // also wird die Breite auf 2000 - 400 = 1600px gesetzt; die Hoehe folgt.
    expect(
      bildGroesseImVollbild({
        viewportBreite: 2000,
        verfuegbareHoehe: 1000,
        bildBreite: 1600,
        bildHoehe: 800,
      }),
    ).toEqual({ breite: 1600, hoehe: 800 });
  });

  it("aendert nichts, wenn genau 400px uebrig bleiben", () => {
    // Quadratisches Bild: bei 600px Hoehe ist es 600px breit. Der Viewport ist
    // 1000px breit, also bleiben genau 400px uebrig.
    expect(
      bildGroesseImVollbild({
        viewportBreite: 1000,
        verfuegbareHoehe: 600,
        bildBreite: 600,
        bildHoehe: 600,
      }),
    ).toEqual({ breite: 600, hoehe: 600 });
  });

  it("begrenzt die Breite auch, wenn der Viewport schmaler als 400px ist", () => {
    expect(
      bildGroesseImVollbild({
        viewportBreite: 300,
        verfuegbareHoehe: 1000,
        bildBreite: 800,
        bildHoehe: 1600,
      }),
    ).toEqual({ breite: 0, hoehe: 0 });
  });

  it("beruecksichtigt einen eigenen Mindestplatz", () => {
    expect(
      bildGroesseImVollbild({
        viewportBreite: 2000,
        verfuegbareHoehe: 1000,
        bildBreite: 1600,
        bildHoehe: 800,
        mindestPlatzRechts: 800,
      }),
    ).toEqual({ breite: 1200, hoehe: 600 });
  });

  it("liefert Nullgroessen ohne verfuegbare Hoehe oder ohne Bildmasse", () => {
    expect(
      bildGroesseImVollbild({
        viewportBreite: 2000,
        verfuegbareHoehe: 0,
        bildBreite: 800,
        bildHoehe: 1600,
      }),
    ).toEqual({ breite: 0, hoehe: 0 });

    expect(
      bildGroesseImVollbild({
        viewportBreite: 2000,
        verfuegbareHoehe: 1000,
        bildBreite: 0,
        bildHoehe: 0,
      }),
    ).toEqual({ breite: 0, hoehe: 0 });
  });

  it("hat 400px als Standard-Mindestplatz", () => {
    expect(MINDEST_PLATZ_RECHTS).toBe(400);
  });
});
