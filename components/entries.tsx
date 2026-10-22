import Link from "next/link";
import { arxivLinks, entryUrl, formatDate, type Entry, type Link as LinkT } from "@/lib/content";
import { site } from "@/lib/site";
import { MathText } from "./math";

export function Authors({ names }: { names: string[] }) {
  return names.map((name, k) => (
    <span key={name}>
      {k > 0 && (k === names.length - 1 ? (names.length > 2 ? ", and " : " and ") : ", ")}
      {name === site.name ? <span className="font-medium text-graphite">{name}</span> : name}
    </span>
  ));
}

export function LinkList({ links }: { links: LinkT[] }) {
  return (
    <span className="inline-flex flex-wrap gap-x-3">
      {links.map((l) => (
        <a key={l.href} href={l.href} className="smallcaps inline-block py-1">
          {l.label}
        </a>
      ))}
    </span>
  );
}

/** A numbered bibliography item with a hanging label in the gutter. */
export function BibEntry({ entry, n, abstract = false }: { entry: Entry; n: number; abstract?: boolean }) {
  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr]">
      <span className="pt-[0.1em] font-display text-burgundy" aria-hidden="true">
        [{n}]
      </span>
      <div>
        <Link href={entryUrl(entry)} className="plain font-display text-[1.3rem] leading-snug hover:text-burgundy">
          <MathText text={entry.title} />
        </Link>
        {entry.authors && (
          <p className="mt-1 text-[0.95rem] text-pencil-ink">
            <Authors names={entry.authors} />
          </p>
        )}
        <p className="mt-0.5 text-[0.95rem] text-pencil-ink">
          {entry.arxiv && <span className="italic">arXiv:{entry.arxiv}</span>}
          {entry.date && <>, {formatDate(entry.date, "year")}.</>}{" "}
          {entry.arxiv && <LinkList links={arxivLinks(entry.arxiv)} />}
        </p>
        {abstract && entry.summary && (
          <details className="group mt-2 text-[0.97rem]">
            <summary className="smallcaps w-fit cursor-pointer list-none py-1.5 text-pencil-ink hover:text-burgundy [&::-webkit-details-marker]:hidden">
              <span className="inline-block transition-transform group-open:rotate-90">›</span> Abstract
            </summary>
            <p className="mt-2 border-l border-rule pl-4 text-graphite/90">
              <MathText text={entry.summary} />
            </p>
          </details>
        )}
      </div>
    </li>
  );
}

/** An editorial list item: year or role in the gutter, then title, summary, and links. */
export function NoteEntry({ entry }: { entry: Entry }) {
  const gutter = entry.date ? formatDate(entry.date, "year") : entry.role;
  return (
    <li className="grid gap-x-6 sm:grid-cols-[5rem_1fr]">
      <span className="smallcaps pt-[0.35em] text-pencil-ink">{gutter}</span>
      <div>
        <h3 className="text-[1.45rem]">
          {entry.page ? (
            <Link href={entryUrl(entry)} className="plain hover:text-burgundy">
              <MathText text={entry.title} />
            </Link>
          ) : (
            <MathText text={entry.title} />
          )}
        </h3>
        <p className="mt-1.5 text-graphite/90">
          <MathText text={entry.summary} />
        </p>
        {entry.links && (
          <p className="mt-1">
            <LinkList links={entry.links} />
          </p>
        )}
      </div>
    </li>
  );
}
