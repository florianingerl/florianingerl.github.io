import katex from "katex";
import DOMPurify from "dompurify";

const MATH_PATTERN = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

export function renderRichText(text: string): string {
  const formeln: string[] = [];
  const ohneMath = text.replace(
    MATH_PATTERN,
    (treffer, display: string | undefined, inline: string | undefined) => {
      const tex = display ?? inline ?? treffer;
      try {
        formeln.push(
          katex.renderToString(tex, {
            displayMode: display !== undefined,
            throwOnError: false,
            strict: false,
            trust: false,
          }),
        );
      } catch {
        formeln.push(treffer);
      }
      return `@@MATH${formeln.length - 1}@@`;
    },
  );

  const safe = DOMPurify.sanitize(ohneMath);

  return safe.replace(/@@MATH(\d+)@@/g, (_treffer, nr: string) => {
    return formeln[Number(nr)] ?? "";
  });
}
