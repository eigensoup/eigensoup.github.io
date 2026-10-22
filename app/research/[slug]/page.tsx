import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Authors, LinkList } from "@/components/entries";
import { MathText, plainText } from "@/components/math";
import { MDX } from "@/components/mdx";
import { arxivLinks, formatDate, getEntries, getEntry } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries("research").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEntry("research", (await params).slug);
  if (!e) return {};
  const title = plainText(e.title);
  const description = plainText(e.summary);
  return {
    title,
    description,
    authors: e.authors?.map((name) => ({ name })),
    alternates: { canonical: `/research/${e.slug}/` },
    openGraph: { type: "article", title, description, publishedTime: e.date },
  };
}

export default async function Paper({ params }: Props) {
  const e = getEntry("research", (await params).slug);
  if (!e) notFound();
  return (
    <article>
      <header className="mb-10">
        <p className="smallcaps mb-3 text-pencil-ink">
          {e.arxiv && <>arXiv:{e.arxiv} &middot; </>}
          {e.date && formatDate(e.date).replace(/ \d+,/, "")}
        </p>
        <h1 className="text-[2.15rem] leading-[1.1] sm:text-[2.6rem]">
          <MathText text={e.title} />
        </h1>
        {e.authors && (
          <p className="mt-4 text-pencil-ink">
            <Authors names={e.authors} />
          </p>
        )}
        {e.arxiv && (
          <p className="mt-2">
            <LinkList links={arxivLinks(e.arxiv)} />
          </p>
        )}
      </header>

      <section aria-label="Abstract" className="mx-auto mb-10 max-w-[34rem] text-[1rem] leading-relaxed">
        <p className="hyphens-auto text-justify">
          <span className="smallcaps mr-1 font-medium">Abstract.</span>
          <MathText text={e.summary} />
        </p>
      </section>

      {e.body && (
        <div className="prose">
          <MDX source={e.body} />
        </div>
      )}

      <p className="mt-12 flex items-baseline justify-between text-[0.95rem]">
        <Link href="/research/" className="smallcaps">
          &larr; All research
        </Link>
        <span aria-hidden="true" className="text-pencil">∎</span>
      </p>
    </article>
  );
}
