// Helpers for programming exercises. They mirror the parsing used by the
// server so the authoring UI and the student view show the same parameters.

export interface FunctionSignature {
  name: string;
  parameters: string;
  bodyStart: number;
}

function findMatchingDelimiter(
  text: string,
  openIndex: number,
  openChar: string,
  closeChar: string,
): number {
  let depth = 0;
  let quote: string | null = null;
  let inLineComment = false;
  let inBlockComment = false;
  let escaped = false;

  for (let i = openIndex; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inLineComment) {
      if (char === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (char === "*" && next === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      i++;
      continue;
    }
    if (char === "/" && next === "*") {
      inBlockComment = true;
      i++;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) depth++;
    if (char === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function splitParameters(parameters: string): string[] {
  const result: string[] = [];
  let start = 0;
  let round = 0;
  let square = 0;
  let curly = 0;
  let quote: string | null = null;
  let escaped = false;

  for (let i = 0; i < parameters.length; i++) {
    const char = parameters[i];
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "(") round++;
    else if (char === ")") round--;
    else if (char === "[") square++;
    else if (char === "]") square--;
    else if (char === "{") curly++;
    else if (char === "}") curly--;
    else if (char === "," && round === 0 && square === 0 && curly === 0) {
      result.push(parameters.slice(start, i).trim());
      start = i + 1;
    }
  }

  const last = parameters.slice(start).trim();
  if (last) result.push(last);
  return result;
}

function parameterLabel(parameter: string): string {
  let text = parameter.trim();
  text = text.replace(/^(public|private|protected|readonly)\s+/, "");
  if (text.startsWith("...")) text = text.slice(3).trim();

  let round = 0;
  let square = 0;
  let curly = 0;
  let quote: string | null = null;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "(") round++;
    else if (char === ")") round--;
    else if (char === "[") square++;
    else if (char === "]") square--;
    else if (char === "{") curly++;
    else if (char === "}") curly--;
    else if ((char === ":" || char === "=") && round === 0 && square === 0 && curly === 0) {
      return text.slice(0, i).trim().replace(/\?$/, "");
    }
  }

  return text.replace(/\?$/, "");
}

export function extractFunctionSignature(code: string): FunctionSignature | null {
  const match = code.match(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/);
  if (!match || match.index === undefined) return null;

  const openParen = match.index + match[0].length - 1;
  const closeParen = findMatchingDelimiter(code, openParen, "(", ")");
  if (closeParen === -1) return null;

  const parameters = code.slice(openParen + 1, closeParen);
  let bodyStart = -1;
  for (let i = closeParen + 1; i < code.length; i++) {
    if (code[i] === "{") {
      bodyStart = i;
      break;
    }
    if (code[i] === ";" || code[i] === "=") break;
  }

  return { name: match[1], parameters, bodyStart };
}

export function extractFunctionName(code: string): string | null {
  return extractFunctionSignature(code)?.name ?? null;
}

export function extractParameterNames(code: string): string[] {
  const signature = extractFunctionSignature(code);
  if (!signature) return [];
  return splitParameters(signature.parameters)
    .map(parameterLabel)
    .filter((name) => name !== "");
}

type CommentLanguage = "JavaScript" | "TypeScript" | "Lean 4";

function isLean(language: CommentLanguage): boolean {
  return language === "Lean 4";
}

function isStringQuote(char: string, language: CommentLanguage): boolean {
  if (isLean(language)) return char === '"';
  return char === '"' || char === "'" || char === "`";
}

function stringEnd(code: string, start: number): number {
  const quote = code[start];
  let i = start + 1;
  while (i < code.length) {
    if (code[i] === "\\") {
      i += 2;
      continue;
    }
    if (code[i] === quote) return i + 1;
    i++;
  }
  return code.length;
}

function leanBlockOpenLength(code: string, index: number): number {
  if (code[index] !== "/" || code[index + 1] !== "-") return 0;
  return code[index + 2] === "-" || code[index + 2] === "!" ? 3 : 2;
}

export function stripCommentsAndContents(
  code: string,
  language: CommentLanguage,
): string {
  const lean = isLean(language);
  let result = "";
  let i = 0;

  while (i < code.length) {
    const char = code[i];
    const next = code[i + 1];

    if (isStringQuote(char, language)) {
      const end = stringEnd(code, i);
      result += code.slice(i, end);
      i = end;
      continue;
    }

    if (!lean && char === "/" && next === "/") {
      i += 2;
      while (i < code.length && code[i] !== "\n") i++;
      if (i < code.length) {
        result += "\n";
        i++;
      }
      continue;
    }
    if (lean && char === "-" && next === "-") {
      i += 2;
      while (i < code.length && code[i] !== "\n") i++;
      if (i < code.length) {
        result += "\n";
        i++;
      }
      continue;
    }
    if (!lean && char === "/" && next === "*") {
      i += 2;
      while (i < code.length) {
        if (code[i] === "*" && code[i + 1] === "/") {
          i += 2;
          break;
        }
        if (code[i] === "\n") result += "\n";
        i++;
      }
      continue;
    }
    if (lean && char === "/" && next === "-") {
      i += leanBlockOpenLength(code, i);
      let depth = 1;
      while (i < code.length) {
        if (code[i] === "/" && code[i + 1] === "-") {
          i += leanBlockOpenLength(code, i);
          depth++;
          continue;
        }
        if (code[i] === "-" && code[i + 1] === "/") {
          i += 2;
          depth--;
          if (depth === 0) break;
          continue;
        }
        if (code[i] === "\n") result += "\n";
        i++;
      }
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

export function stripCommentMarkers(
  code: string,
  language: CommentLanguage,
): string {
  const lean = isLean(language);
  let result = "";
  let i = 0;

  while (i < code.length) {
    const char = code[i];
    const next = code[i + 1];

    if (isStringQuote(char, language)) {
      const end = stringEnd(code, i);
      result += code.slice(i, end);
      i = end;
      continue;
    }

    if (!lean && char === "/" && next === "/") {
      i += 2;
      while (i < code.length) {
        result += code[i];
        i++;
        if (code[i - 1] === "\n") break;
      }
      continue;
    }
    if (lean && char === "-" && next === "-") {
      i += 2;
      while (i < code.length) {
        result += code[i];
        i++;
        if (code[i - 1] === "\n") break;
      }
      continue;
    }
    if (!lean && char === "/" && next === "*") {
      i += 2;
      while (i < code.length) {
        if (code[i] === "*" && code[i + 1] === "/") {
          i += 2;
          break;
        }
        result += code[i];
        i++;
      }
      continue;
    }
    if (lean && char === "/" && next === "-") {
      i += leanBlockOpenLength(code, i);
      let depth = 1;
      while (i < code.length) {
        if (code[i] === "/" && code[i + 1] === "-") {
          i += leanBlockOpenLength(code, i);
          depth++;
          continue;
        }
        if (code[i] === "-" && code[i + 1] === "/") {
          i += 2;
          depth--;
          if (depth === 0) break;
          continue;
        }
        result += code[i];
        i++;
      }
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

export function programmingSkeleton(
  code: string,
  language: CommentLanguage,
): string {
  return stripCommentsAndContents(code, language).trim();
}

// The code shown in the editor before the student starts: the correct function
// signature followed by an empty body.
export function functionSignatureSkeleton(code: string): string {
  const signature = extractFunctionSignature(code);
  if (!signature) return "";
  const header =
    signature.bodyStart === -1
      ? code.trim()
      : code.slice(0, signature.bodyStart).trimEnd();
  return `${header} {\n  \n}`;
}

// Finds a token outside parentheses, brackets, braces, strings and Lean
// comments.
function findTopLevelLeanToken(text: string, token: string): number {
  let round = 0;
  let square = 0;
  let curly = 0;
  let quote: string | null = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inLineComment) {
      if (char === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (char === "-" && next === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === "-" && next === "-") {
      inLineComment = true;
      i++;
      continue;
    }
    if (char === "/" && next === "-") {
      inBlockComment = true;
      i++;
      continue;
    }
    if (char === '"') {
      quote = char;
      continue;
    }

    if (round === 0 && square === 0 && curly === 0 && text.startsWith(token, i)) {
      return i;
    }

    if (char === "(") round++;
    else if (char === ")") round--;
    else if (char === "[") square++;
    else if (char === "]") square--;
    else if (char === "{") curly++;
    else if (char === "}") curly--;
  }

  return -1;
}

// The Lean editor skeleton keeps only the definition header: everything up to
// and including "=>" for a "fun" body, otherwise up to and including ":=".
export function leanSignatureSkeleton(code: string): string {
  const text = code.trim();
  if (!/^def\s/.test(text)) return "";

  const assign = findTopLevelLeanToken(text, ":=");
  if (assign === -1) return "";

  const afterAssign = text.slice(assign + 2);
  if (/^\s*fun\b/.test(afterAssign)) {
    const arrow = findTopLevelLeanToken(afterAssign, "=>");
    if (arrow !== -1) {
      return text.slice(0, assign + 2 + arrow + 2).trimEnd();
    }
  }

  return text.slice(0, assign + 2).trimEnd();
}
