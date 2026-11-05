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
