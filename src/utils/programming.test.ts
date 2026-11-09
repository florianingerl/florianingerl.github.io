import { describe, expect, it } from "vitest";
import {
  extractFunctionName,
  extractFunctionSignature,
  extractParameterNames,
  functionSignatureSkeleton,
  leanSignatureSkeleton,
  programmingSkeleton,
  stripCommentMarkers,
  stripCommentsAndContents,
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

describe("programming utils: comments", () => {
  it("removes JavaScript line comments and their contents", () => {
    const code = "function add(a, b) {\n  // return a + b;\n}";

    expect(stripCommentsAndContents(code, "JavaScript")).toBe(
      "function add(a, b) {\n  \n}",
    );
    expect(stripCommentMarkers(code, "JavaScript")).toBe(
      "function add(a, b) {\n   return a + b;\n}",
    );
    expect(programmingSkeleton(code, "JavaScript")).toBe(
      "function add(a, b) {\n  \n}",
    );
  });

  it("removes JavaScript block comments but keeps their contents for solutions", () => {
    const code = "function add(a, b) { /* return a + b; */ }";

    expect(stripCommentsAndContents(code, "JavaScript")).toBe(
      "function add(a, b) {  }",
    );
    expect(stripCommentMarkers(code, "JavaScript")).toBe(
      "function add(a, b) {  return a + b;  }",
    );
  });

  it("does not treat comment markers inside strings as comments", () => {
    const code = 'const url = "http://example.com"; // note\n';

    expect(stripCommentsAndContents(code, "JavaScript")).toBe(
      'const url = "http://example.com"; \n',
    );
    expect(stripCommentMarkers(code, "JavaScript")).toBe(
      'const url = "http://example.com";  note\n',
    );
  });

  it("removes Lean line comments and their contents", () => {
    const code = "def x := 1 -- note\ndef y := 2";

    expect(stripCommentsAndContents(code, "Lean 4")).toBe(
      "def x := 1 \ndef y := 2",
    );
    expect(stripCommentMarkers(code, "Lean 4")).toBe(
      "def x := 1  note\ndef y := 2",
    );
  });

  it("removes a whole commented-out Lean definition from the skeleton", () => {
    const code = "/-\ndef doubleNat (n : Nat) : Nat := n + n\n-/";

    expect(stripCommentsAndContents(code, "Lean 4")).toBe("\n\n");
    expect(stripCommentMarkers(code, "Lean 4")).toBe(
      "\ndef doubleNat (n : Nat) : Nat := n + n\n",
    );
    expect(programmingSkeleton(code, "Lean 4")).toBe("");
  });

  it("handles nested Lean block comments", () => {
    const code = "/- outer /- inner -/ still -/ def x := 1";

    expect(stripCommentsAndContents(code, "Lean 4")).toBe(" def x := 1");
    expect(stripCommentMarkers(code, "Lean 4")).toBe(
      " outer  inner  still  def x := 1",
    );
  });

  it("does not treat comment markers inside Lean strings as comments", () => {
    const code = 'def s := "-- not a comment" -- real';

    expect(stripCommentsAndContents(code, "Lean 4")).toBe(
      'def s := "-- not a comment" ',
    );
    expect(stripCommentMarkers(code, "Lean 4")).toBe(
      'def s := "-- not a comment"  real',
    );
  });

  it("handles Lean documentation comments", () => {
    const code = "/-- doc -/\ndef x := 1";

    expect(stripCommentsAndContents(code, "Lean 4")).toBe("\ndef x := 1");
    expect(stripCommentMarkers(code, "Lean 4")).toBe(" doc \ndef x := 1");
  });

  it("removes Python comments and their contents", () => {
    const code = "def add(a, b):\n    # return a + b";

    expect(stripCommentsAndContents(code, "Python")).toBe("def add(a, b):\n    ");
    expect(stripCommentMarkers(code, "Python")).toBe(
      "def add(a, b):\n     return a + b",
    );
    expect(programmingSkeleton(code, "Python")).toBe("def add(a, b):");
  });

  it("removes a whole commented-out Python function from the skeleton", () => {
    const code = "# def add(a, b):\n#     return a + b";

    expect(stripCommentsAndContents(code, "Python")).toBe("\n");
    expect(programmingSkeleton(code, "Python")).toBe("");
    expect(stripCommentMarkers(code, "Python")).toBe(
      " def add(a, b):\n     return a + b",
    );
  });

  it("does not treat # inside Python strings as a comment", () => {
    const code = 'text = """# not a comment"""\n# real';
    expect(stripCommentsAndContents(code, "Python")).toBe(
      'text = """# not a comment"""\n',
    );

    const singleQuoted = "value = '# not a comment' # real";
    expect(stripCommentsAndContents(singleQuoted, "Python")).toBe(
      "value = '# not a comment' ",
    );
  });

  it("removes Java comments and their contents", () => {
    const code = `static int add(int a, int b) {
  // return a + b;
  /* return a - b; */
}`;

    expect(stripCommentsAndContents(code, "Java")).toBe(`static int add(int a, int b) {
  
  
}`);
    expect(programmingSkeleton(code, "Java")).toBe(
      "static int add(int a, int b) {\n  \n  \n}",
    );
    expect(stripCommentMarkers(code, "Java")).toBe(`static int add(int a, int b) {
   return a + b;
   return a - b; 
}`);
  });

  it("does not treat comment markers inside Java text blocks as comments", () => {
    const code = 'String text = """\n// not a comment\n""";\n// real';
    expect(stripCommentsAndContents(code, "Java")).toBe(
      'String text = """\n// not a comment\n""";\n',
    );
    expect(stripCommentMarkers(code, "Java")).toBe(
      'String text = """\n// not a comment\n""";\n real',
    );
  });

  it("removes Racket comments and their contents", () => {
    const code = `(define (double x)
  ; (* 2 x)
  #| return x + x |#
)`;

    expect(stripCommentsAndContents(code, "Racket")).toBe(
      "(define (double x)\n  \n  \n)",
    );
    expect(stripCommentMarkers(code, "Racket")).toBe(
      "(define (double x)\n   (* 2 x)\n   return x + x \n)",
    );
  });

  it("does not treat ; inside Racket strings as a comment", () => {
    const code = '(define text "; not a comment")\n; real';
    expect(stripCommentsAndContents(code, "Racket")).toBe(
      '(define text "; not a comment")\n',
    );
    expect(stripCommentMarkers(code, "Racket")).toBe(
      '(define text "; not a comment")\n real',
    );
  });
});
