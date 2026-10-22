import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MathText, plainText } from "@/components/math";
import { MDX } from "@/components/mdx";
import { formatDate, getEntries, getEntry } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getEntries("writing").map((e) => ({ slug: e.slug }));
  // Static export rejects an empty list; until something is published, emit a placeholder that 404s.
  return slugs.length ? slugs : [{ slug: "_" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEntry("writing", (await params).slug);
  if (!e) return {};
  const title = plainText(e.title);
  const description = plainText(e.summary);
  return {
    title,
    description,
    alternates: { canonical: `/writing/${e.slug}/` },
    openGraph: { type: "article", title, description, publishedTime: e.date },
  };
}

export default async function Essay({ params }: Props) {
  const e = getEntry("writing", (await params).slug);
  if (!e) notFound();
  return (
    <article>
      <header className="mb-10">
        {e.date && <p className="smallcaps mb-3 text-pencil-ink">{formatDate(e.date)}</p>}
        <h1 className="text-[2.3rem] leading-[1.1] sm:text-[2.8rem]">
          <MathText text={e.title} />
        </h1>
        {e.draft && <p className="smallcaps mt-3 text-burgundy">Draft — not published</p>}
      </header>
      <div className="prose">
        <MDX source={e.body} />
      </div>
      <p className="mt-12 flex items-baseline justify-between text-[0.95rem]">
        <Link href="/writing/" className="smallcaps">
          &larr; All writing
        </Link>
        <span aria-hidden="true" className="text-pencil">∎</span>
      </p>
    </article>
  );
}
