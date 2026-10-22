import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Section = "research" | "projects" | "writing";

export type Link = { label: string; href: string };

export type Entry = {
  section: Section;
  slug: string;
  title: string;
  date?: string;
  summary: string;
  body: string;
  authors?: string[];
  arxiv?: string;
  role?: string;
  links?: Link[];
  featured?: boolean;
  /** Whether the entry gets its own page (default: true). */
  page: boolean;
  order?: number;
  draft?: boolean;
};

const CONTENT = path.join(process.cwd(), "content");
const isProd = process.env.NODE_ENV === "production";

function load(section: Section): Entry[] {
  const dir = path.join(CONTENT, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        section,
        slug: file.replace(/\.mdx$/, ""),
        title: data.title,
        // gray-matter parses YAML dates into Date objects
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : undefined,
        summary: data.summary ?? "",
        body: content.trim(),
        authors: data.authors,
        arxiv: data.arxiv,
        role: data.role,
        links: data.links,
        featured: data.featured ?? false,
        page: data.page ?? true,
        order: data.order,
        draft: data.draft ?? false,
      } satisfies Entry;
    })
    .filter((e) => !(isProd && e.draft))
    .sort(
      (a, b) =>
        (a.order ?? Infinity) - (b.order ?? Infinity) ||
        (b.date ?? "").localeCompare(a.date ?? ""),
    );
}

export const getEntries = (section: Section) => load(section);

export function getEntry(section: Section, slug: string) {
  return load(section).find((e) => e.slug === slug);
}

export function entryUrl(e: Entry) {
  return `/${e.section}/${e.slug}/`;
}

export function arxivLinks(id: string): Link[] {
  return [
    { label: "arXiv", href: `https://arxiv.org/abs/${id}` },
    { label: "pdf", href: `https://arxiv.org/pdf/${id}` },
  ];
}

export function formatDate(date: string, style: "year" | "long" = "long") {
  const d = new Date(`${date}T00:00:00Z`);
  if (style === "year") return String(d.getUTCFullYear());
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/**
 * Hugo served the papers under /projects/. They now live under /research/;
 * these old paths get static redirect pages.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/projects/classical-algorithms-bipartite-quantum-max-cut/": "/research/classical-algorithms-bipartite-quantum-max-cut/",
  "/projects/monogamy-of-entanglement/": "/research/monogamy-of-entanglement/",
  "/projects/approximation-algorithms-quantum-max-d-cut/": "/research/approximation-algorithms-quantum-max-d-cut/",
  "/categories/": "/",
  "/tags/": "/",
};

export const allEntries = () => [...load("research"), ...load("projects"), ...load("writing")];
