import Link from "next/link";
import { PageHeading } from "@/components/chrome";
import { NoteEntry } from "@/components/entries";
import { Tex } from "@/components/math";
import { Torus } from "@/components/sketches";
import { getEntries } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Projects by Stuart Wayland.",
  alternates: { canonical: "/projects/" },
};

export default function Projects() {
  return (
    <>
      <PageHeading title="Projects" kicker="Things built & explored">
        <aside className="marginnote decorative">
          <Torus draw className="w-44" />
          <span className="mt-2 block">
            Two loops that generate <Tex>{String.raw`\pi_1(T^2) \cong \mathbb{Z}^2`}</Tex>.
          </span>
        </aside>
      </PageHeading>
      <ul className="space-y-10">
        {getEntries("projects").map((e) => (
          <NoteEntry key={e.slug} entry={e} />
        ))}
      </ul>
      <p className="mt-14 text-[0.95rem] text-pencil-ink">
        Papers that used to live here have moved to <Link href="/research/">Research</Link>.
      </p>
    </>
  );
}
