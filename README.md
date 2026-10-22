# stu.at.waylands.com

Personal site of Stuart Wayland — a statically exported Next.js (App Router) site.

```sh
pnpm install
pnpm dev          # http://localhost:3000 (drafts visible)
pnpm build        # static export to out/
pnpm build:docs   # build and copy out/ to docs/, which GitHub Pages serves from main
pnpm lint && pnpm typecheck
```

## Content

- `content/research/*.mdx` — papers: `title`, `date`, `authors`, `arxiv`, `summary`, `featured`
- `content/projects/*.mdx` — projects: `title`, `date` or `role`, `summary`, `links`, `page`
- `content/writing/*.mdx` — essays: `title`, `date`, `summary`, `draft`

Bodies are MDX with `$…$` / `$$…$$` math (KaTeX, rendered at build time), GFM footnotes for
citations, and the components `<MarginNote>`, `<Figure>`, `<Theorem>`, `<Proof>`, plus the
sketches in `components/sketches.tsx`. `content/writing/style-guide.mdx` is a draft specimen of
every feature; drafts render only in development.

Moved URLs are listed in `LEGACY_REDIRECTS` (`lib/content.ts`) and get meta-refresh pages.
