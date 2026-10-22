import { PageHeading } from "@/components/chrome";
import { NoteEntry } from "@/components/entries";
import { Tex } from "@/components/math";
import { EuclidI1 } from "@/components/sketches";
import { getEntries } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description: "Notes, essays, and technical articles by Stuart Wayland.",
  alternates: { canonical: "/writing/" },
};

export default function Writing() {
  const writing = getEntries("writing");
  return (
    <>
      <PageHeading title="Writing" kicker="Notes & essays">
        <aside className="marginnote decorative">
          <EuclidI1 draw className="w-44" />
          <span className="mt-2 block italic">Elements I.1: on a given finite straight line, to construct an equilateral triangle.</span>
        </aside>
      </PageHeading>
      {writing.length > 0 ? (
        <ul className="space-y-10">
          {writing.map((e) => (
            <NoteEntry key={e.slug} entry={e} />
          ))}
        </ul>
      ) : (
        <p className="text-pencil-ink">
          The set of published essays is, for the moment, <Tex>{String.raw`\varnothing`}</Tex>. Notes and essays will
          appear here.
        </p>
      )}
    </>
  );
}
