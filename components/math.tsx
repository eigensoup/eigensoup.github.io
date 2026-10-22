import katex from "katex";
import { Fragment } from "react";

/** Typeset a TeX expression at build time; no KaTeX JavaScript reaches the browser. */
export function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, { displayMode: display, throwOnError: false });
  return display ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function withMath(text: string) {
  return text.split(/(\$[^$]+\$)/g).map((part, i) =>
    part.startsWith("$") && part.endsWith("$") && part.length > 2 ? (
      <Tex key={i}>{part.slice(1, -1)}</Tex>
    ) : (
      part
    ),
  );
}

/**
 * Plain text with $…$ inline math, as used in titles and summaries.
 * Hyphenated words ("Max-Cut", "Max-$d$-Cut") are kept from breaking at the hyphen.
 */
export function MathText({ text }: { text: string }) {
  return text.match(/(?:\$[^$]+\$|[^\s$]+)+|\s+/g)?.map((word, i) =>
    /-/.test(word.replace(/\$[^$]+\$/g, "")) ? (
      <span key={i} className="whitespace-nowrap">
        {withMath(word)}
      </span>
    ) : (
      <Fragment key={i}>{withMath(word)}</Fragment>
    ),
  );
}

/** Strip $…$ delimiters for contexts that cannot render math (titles, feeds). */
export function plainText(text: string) {
  return text.replace(/\$([^$]+)\$/g, "$1");
}
