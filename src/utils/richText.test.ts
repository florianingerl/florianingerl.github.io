import { describe, expect, it } from "vitest";
import { renderRichText } from "./richText";

describe("renderRichText", () => {
  it("laesst reinen Text unveraendert", () => {
    expect(renderRichText("Fill the gap")).toBe("Fill the gap");
  });

  it("gibt erlaubte HTML-Tags durch", () => {
    const html = renderRichText('I <strong>am</strong> here');
    expect(html).toContain("<strong>am</strong>");
    expect(html).toContain("here");
  });

  it("entfernt script-Tags", () => {
    const html = renderRichText('<script>alert("x")</script>ok');
    expect(html).not.toContain("<script");
    expect(html).toContain("ok");
  });

  it("entfernt onclick-Attribute", () => {
    const html = renderRichText('<span onclick="evil()">x</span>');
    expect(html).not.toContain("onclick");
    expect(html).toContain(">x</span>");
  });

  it("rendert eine Inline-Formel mit KaTeX", () => {
    const html = renderRichText("Loesung: $x^2 + 1$");
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("$x^2");
  });

  it("rendert eine Display-Formel mit KaTeX", () => {
    const html = renderRichText("$$c = \\sqrt{a^2 + b^2}$$");
    expect(html).toContain("katex-display");
  });

  it("verarbeitet spitze Klammer in Formeln", () => {
    const html = renderRichText("$a < b$ und $c > d$");
    expect(html).toContain('class="katex"');
    expect(html).toContain("und");
  });

  it("verbindet HTML und Formel in einem Text", () => {
    const html = renderRichText('Loese <strong>$ax^2 + bx + c = 0$</strong>');
    expect(html).toContain("<strong>");
    expect(html).toContain('class="katex"');
  });

  it("zeigt ungueltige LaTeX als Text an, ohne zu werfen", () => {
    const html = renderRichText("$\\thisIsNoCommand{}$");
    expect(html).toContain("thisIsNoCommand");
  });
});
