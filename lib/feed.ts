import { plainText } from "@/components/math";
import { entryUrl, type Entry } from "./content";
import { site } from "./site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** RSS 2.0, replacing the feeds Hugo published at /index.xml and /projects/index.xml. */
export function rss(entries: Entry[], path: string, title = site.name) {
  const items = entries
    .filter((e) => e.page && e.date)
    .sort((a, b) => b.date!.localeCompare(a.date!))
    .map((e) => {
      const url = site.url + entryUrl(e);
      return `<item><title>${esc(plainText(e.title))}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(e.date!).toUTCString()}</pubDate><description>${esc(plainText(e.summary))}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="utf-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(title)}</title><link>${site.url}/</link><description>${esc(site.description)}</description><language>en-us</language><atom:link href="${site.url}${path}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

