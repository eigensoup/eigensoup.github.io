import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { ReactNode } from "react";
import { EuclidI1, PetersenGraph, SingletGraph, Torus } from "./sketches";

export function MarginNote({ children }: { children: ReactNode }) {
  return <aside className="marginnote">{children}</aside>;
}

export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="my-8">
      <div className="mx-auto max-w-sm [&>svg]:w-full">{children}</div>
      {caption && (
        <figcaption className="mt-3 text-center text-[0.92rem] text-pencil-ink">
          <span className="smallcaps text-graphite">Figure.</span> {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Theorem({ kind = "Theorem", n, children }: { kind?: string; n?: string; children: ReactNode }) {
  return (
    <div className="my-6">
      <span className="smallcaps font-medium">
        {kind}
        {n && ` ${n}`}.
      </span>{" "}
      <span className="italic [&>p]:inline">{children}</span>
    </div>
  );
}

export function Proof({ children }: { children: ReactNode }) {
  return (
    <div className="my-6">
      <span className="italic">Proof.</span> <span className="[&>p]:inline">{children}</span>
      <span className="float-right" aria-label="end of proof">∎</span>
    </div>
  );
}

const components = { MarginNote, Figure, Theorem, Proof, PetersenGraph, SingletGraph, Torus, EuclidI1 };

/** Compile and render MDX at build time (React Server Component). */
export async function MDX({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  });
  return <Content components={components} />;
}
