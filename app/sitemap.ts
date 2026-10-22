import type { MetadataRoute } from "next";
import { allEntries, entryUrl } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/research/", "/projects/", "/writing/", "/cv/"].map((p) => ({ url: site.url + p }));
  const entries = allEntries()
    .filter((e) => e.page)
    .map((e) => ({ url: site.url + entryUrl(e), lastModified: e.date }));
  return [...pages, ...entries];
}
