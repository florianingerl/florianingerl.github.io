import { describe, expect, it } from "vitest";
import {
  extractFunctionName,
  extractFunctionSignature,
  extractParameterNames,
  functionSignatureSkeleton,
} from "./programming";

describe("programming utils: function signature", () => {
  it("extracts the name and parameters of a TypeScript function", () => {
    const code =
      "function add(a: number, b?: number): number { return a + (b ?? 0); }";

    expect(extractFunctionName(code)).toBe("add");
    expect(extractParameterNames(code)).toEqual(["a", "b"]);
    expect(extractFunctionSignature(code)?.name).toBe("add");
  });

  it("handles nested parameter types and default values", () => {
    const code =
      "function pick(values: number[], options: { min: number } = { min: 0 }) { return values[0]; }";

    expect(extractParameterNames(code)).toEqual(["values", "options"]);
  });

  it("creates the skeleton with an empty body", () => {
    const code = "function add(a: number, b: number): number { return a + b; }";
    expect(functionSignatureSkeleton(code)).toBe(
      "function add(a: number, b: number): number {\n  \n}",
    );
  });

  it("returns empty values when there is no function declaration", () => {
    expect(extractFunctionName("const add = 3;")).toBeNull();
    expect(extractParameterNames("const add = 3;")).toEqual([]);
    expect(functionSignatureSkeleton("const add = 3;")).toBe("");
  });
});
