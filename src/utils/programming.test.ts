import { describe, expect, it } from "vitest";
import {
  extractFunctionName,
  extractFunctionSignature,
  extractParameterNames,
  functionSignatureSkeleton,
  leanSignatureSkeleton,
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

describe("programming utils: Lean signature", () => {
  it("keeps only the fun signature before the arrow", () => {
    expect(leanSignatureSkeleton("def double := fun (x:Nat ) => x+x")).toBe(
      "def double := fun (x:Nat ) =>",
    );
  });

  it("keeps only the definition header before the assignment", () => {
    expect(
      leanSignatureSkeleton("def double (x : Nat ) : Nat := x + x"),
    ).toBe("def double (x : Nat ) : Nat :=");
  });

  it("ignores an assignment inside a default argument", () => {
    expect(leanSignatureSkeleton("def f (x : Nat := 0) : Nat := x")).toBe(
      "def f (x : Nat := 0) : Nat :=",
    );
  });

  it("does not treat a match body as a fun signature", () => {
    expect(
      leanSignatureSkeleton("def f (x : Nat) : Nat := match x with | 0 => 1 | _ => x"),
    ).toBe("def f (x : Nat) : Nat :=");
  });

  it("returns empty text when there is no Lean definition", () => {
    expect(leanSignatureSkeleton("const add = 3;")).toBe("");
  });
});
