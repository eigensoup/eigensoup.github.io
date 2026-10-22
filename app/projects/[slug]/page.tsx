import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkList } from "@/components/entries";
import { MathText, plainText } from "@/components/math";
import { MDX } from "@/components/mdx";
import { formatDate, getEntries, getEntry } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries("projects")
    .filter((e) => e.page)
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEntry("projects", (await params).slug);
  if (!e) return {};
  return {
    title: plainText(e.title),
    description: plainText(e.summary),
    alternates: { canonical: `/projects/${e.slug}/` },
  };
}

export default async function Project({ params }: Props) {
  const e = getEntry("projects", (await params).slug);
  if (!e) notFound();
  return (
    <article>
      <header className="mb-8">
        <p className="smallcaps mb-3 text-pencil-ink">{e.date ? formatDate(e.date, "year") : e.role}</p>
        <h1 className="text-[2.15rem] leading-[1.1] sm:text-[2.6rem]">
          <MathText text={e.title} />
        </h1>
        {e.links && (
          <p className="mt-3">
            <LinkList links={e.links} />
          </p>
        )}
      </header>
      <p className="text-[1.08rem]">
        <MathText text={e.summary} />
      </p>
      {e.body && (
        <div className="prose mt-8">
          <MDX source={e.body} />
        </div>
      )}
      <p className="mt-12 flex items-baseline justify-between text-[0.95rem]">
        <Link href="/projects/" className="smallcaps">
          &larr; All projects
        </Link>
        <span aria-hidden="true" className="text-pencil">∎</span>
      </p>
    </article>
  );
}
