import Link from "next/link";
import { site } from "@/lib/site";
import { NavLinks } from "./nav-links";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[64rem] flex-wrap items-baseline justify-between gap-x-8 gap-y-1 px-5 pt-6 pb-2 sm:px-8 sm:pt-8 lg:pt-10">
      <Link href="/" className="plain font-display text-xl tracking-wide">
        Stuart Wayland
      </Link>
      <nav aria-label="Main">
        <NavLinks items={site.nav} />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[64rem] px-5 pb-12 sm:px-8">
      <div className="max-w-[40rem] border-t border-rule pt-6 text-[0.92rem] text-pencil-ink">
        <p className="smallcaps mb-2 text-graphite">Correspondence</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} rel={s.href.startsWith("http") ? "me noopener" : undefined}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.85rem]">
          Set in EB Garamond and Newsreader, with mathematics by KaTeX. &copy; {new Date().getFullYear()} {site.name}.
        </p>
      </div>
    </footer>
  );
}

/** A page heading set like the title of a paper section, with an optional sketch in the margin. */
export function PageHeading({ title, kicker, children }: { title: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-12">
      {children}
      {kicker && <p className="smallcaps mb-2 text-pencil-ink">{kicker}</p>}
      <h1 className="text-[2.6rem] leading-none sm:text-5xl">{title}</h1>
    </div>
  );
}
