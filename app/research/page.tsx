import { PageHeading } from "@/components/chrome";
import { BibEntry } from "@/components/entries";
import { Tex } from "@/components/math";
import { PetersenGraph } from "@/components/sketches";
import { getEntries } from "@/lib/content";

export const metadata = {
  title: "Research",
  description: "Papers and preprints by Stuart Wayland on quantum Max-Cut, qudit Hamiltonians, and spectral graph theory.",
  alternates: { canonical: "/research/" },
};

export default function Research() {
  const research = getEntries("research");
  return (
    <>
      <PageHeading title="Research" kicker="Papers & preprints">
        <aside className="marginnote decorative">
          <PetersenGraph draw className="w-32" />
          <span className="mt-2 block">
            The Petersen graph, with spectrum <Tex>{String.raw`\{3,\, 1^{(5)},\, -2^{(4)}\}`}</Tex>.
          </span>
        </aside>
      </PageHeading>
      <p className="mb-12 max-w-[36rem]">
        My work sits at the intersection of spectral graph theory, quantum Hamiltonian complexity, and randomized
        algorithms. I focus on classical algorithms for ground-state problems such as Quantum Max-Cut and the
        antiferromagnetic Heisenberg model, and on the spectral theory of random graphs and expanders.
      </p>
      <h2 className="smallcaps mb-6 border-b border-rule pb-2 text-[1.1rem]">References</h2>
      <ol className="space-y-9">
        {research.map((e, k) => (
          <BibEntry key={e.slug} entry={e} n={k + 1} abstract />
        ))}
      </ol>
    </>
  );
}
