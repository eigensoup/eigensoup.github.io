import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkList } from "@/components/entries";
import { MathText, plainText } from "@/components/math";
import { MDX } from "@/components/mdx";
import { RedirectStub, redirectMetadata } from "@/components/redirect";
import { formatDate, getEntries, getEntry, LEGACY_REDIRECTS } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

const legacy = (slug: string) => LEGACY_REDIRECTS[`/projects/${slug}/`];

export function generateStaticParams() {
  const pages = getEntries("projects").filter((e) => e.page);
  const moved = Object.keys(LEGACY_REDIRECTS)
    .filter((p) => p.startsWith("/projects/"))
    .map((p) => p.split("/")[2]);
  return [...pages.map((e) => e.slug), ...moved].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (legacy(slug)) return redirectMetadata(legacy(slug));
  const e = getEntry("projects", slug);
  if (!e) return {};
  return {
    title: plainText(e.title),
    description: plainText(e.summary),
    alternates: { canonical: `/projects/${e.slug}/` },
  };
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  if (legacy(slug)) return <RedirectStub to={legacy(slug)} />;
  const e = getEntry("projects", slug);
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
