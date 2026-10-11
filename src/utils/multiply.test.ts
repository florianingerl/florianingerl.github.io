import { describe, expect, it } from "vitest";
import { multiply } from "./multiply";

describe("multiply", () => {
  it("multiplies two positive numbers", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it("returns zero when one factor is zero", () => {
    expect(multiply(0, 5)).toBe(0);
  });

  it("handles negative numbers", () => {
    expect(multiply(-4, 3)).toBe(-12);
    expect(multiply(-4, -3)).toBe(12);
  });
});
