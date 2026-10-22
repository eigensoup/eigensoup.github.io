import Link from "next/link";
import { BibEntry, NoteEntry } from "@/components/entries";
import { Tex } from "@/components/math";
import { PencilRule, PencilUnderline, SingletGraph } from "@/components/sketches";
import { getEntries } from "@/lib/content";

export const metadata = { alternates: { canonical: "/" } };

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20" aria-labelledby={`s${n}`}>
      <h2 id={`s${n}`} className="mb-6 text-[1.75rem]">
        <span className="mr-3 text-[0.8em] text-burgundy">§{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  const research = getEntries("research");
  const featured = research.filter((e) => e.featured);
  const projects = getEntries("projects");
  const writing = getEntries("writing").slice(0, 3);

  return (
    <>
      {/* Title block, set like the first page of a paper */}
      <div className="fade-in">
        <aside className="marginnote decorative" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait.jpg"
            alt=""
            width={480}
            height={480}
            className="w-40 -rotate-[1.5deg] border border-rule bg-paper-deep p-1.5 mix-blend-multiply"
          />
        </aside>
        <h1 className="relative inline-block text-[clamp(2.4rem,12vw,4.5rem)] leading-[0.95]">
          Stuart Wayland
          <PencilUnderline draw className="absolute -bottom-3 left-0 h-4 w-full" />
        </h1>
        <p className="mt-6 font-display text-[1.45rem] italic text-pencil-ink sm:text-[1.6rem]">
          Optimization in synthetic quantum systems.
        </p>

        <address className="mt-8 not-italic text-[0.97rem] leading-relaxed text-pencil-ink">
          PhD student, University of California, Santa Cruz
          <br />
          Visiting Affiliate,{" "}
          <a href="https://simons.berkeley.edu">Simons Institute for the Theory of Computing</a>, UC Berkeley
          <br />
          Founder, <a href="https://trials.krv.ai">Krv Labs</a> &middot; Berkeley, California
        </address>
      </div>

      <div className="mt-12">
        <aside className="marginnote decorative" aria-hidden="true">
          <Tex>{String.raw`H_G = \tfrac14 \sum_{ij \in E} \big(I - \vec\sigma_i \cdot \vec\sigma_j\big)`}</Tex>
          <span className="mt-2 block italic">the antiferromagnetic Heisenberg model on a graph G.</span>
        </aside>
        <p className="text-[1.05rem]">
          <span className="smallcaps mr-1 font-medium">Abstract.</span> My work sits at the intersection of
          spectral graph theory, quantum Hamiltonian complexity, and randomized algorithms. I focus on classical
          algorithms for ground-state problems such as Quantum Max-Cut and the antiferromagnetic Heisenberg model,
          and on the spectral theory of random graphs and expanders.
        </p>
      </div>

      <figure className="my-12">
        <SingletGraph draw className="mx-auto w-full max-w-[17rem]" />
        <figcaption className="mx-auto mt-4 max-w-[30rem] text-center text-[0.92rem] text-pencil-ink">
          <span className="smallcaps text-graphite">Figure 1.</span> A perfect matching <Tex>M</Tex> in a dense
          bipartite graph. Placing a singlet on each matched pair gives the product state{" "}
          <Tex>{String.raw`\bigotimes_{(u,v)\in M} |\psi^-\rangle_{uv}`}</Tex>.
        </figcaption>
      </figure>

      <Section n={1} title="Research">
        <p>
          I am pursuing a PhD at the University of California, Santa Cruz under Prof. Alexandra Kolla, and am
          currently living in Berkeley as a visiting affiliate of the Simons Institute for the Theory of Computing.
        </p>
        <ol className="mt-8 space-y-6">
          {featured.map((e) => (
            <BibEntry key={e.slug} entry={e} n={research.indexOf(e) + 1} />
          ))}
        </ol>
        <p className="mt-6 pl-[2.25rem] sm:pl-12">
          <Link href="/research/" className="smallcaps inline-block py-1">
            All research &rarr;
          </Link>
        </p>
      </Section>

      <Section n={2} title="Projects">
        <ul className="space-y-8">
          {projects.map((e) => (
            <NoteEntry key={e.slug} entry={e} />
          ))}
        </ul>
      </Section>

      {writing.length > 0 && (
        <Section n={3} title="Writing">
          <ul className="space-y-8">
            {writing.map((e) => (
              <NoteEntry key={e.slug} entry={e} />
            ))}
          </ul>
        </Section>
      )}

      <PencilRule className="mt-20" />

      <div className="mt-12 grid gap-10 text-[0.98rem] sm:grid-cols-2">
        <section aria-labelledby="education">
          <h2 id="education" className="smallcaps mb-3 text-[1.1rem]">
            Education
          </h2>
          <dl className="space-y-3">
            <div>
              <dt>PhD in Computer Science</dt>
              <dd className="text-pencil-ink">UC Santa Cruz, 2022–present</dd>
            </div>
            <div>
              <dt>B.S. Mathematics &amp; Computer Science</dt>
              <dd className="text-pencil-ink">UC Santa Barbara, 2018–2022 &middot; minor in music</dd>
            </div>
          </dl>
          <p className="mt-4">
            <Link href="/cv/" className="smallcaps inline-block py-1">
              Curriculum vitæ &rarr;
            </Link>
          </p>
        </section>
        <section aria-labelledby="tools">
          <h2 id="tools" className="smallcaps mb-3 text-[1.1rem]">
            Core stack
          </h2>
          <p className="text-pencil-ink">Python, Qiskit, Mathematica, and spectral theory.</p>
          <h2 className="smallcaps mt-6 mb-3 text-[1.1rem]">Beyond the lab</h2>
          <p className="text-pencil-ink">
            When I&rsquo;m not in front of a terminal, you can find me surfing, climbing, or making music.
          </p>
        </section>
      </div>
    </>
  );
}
