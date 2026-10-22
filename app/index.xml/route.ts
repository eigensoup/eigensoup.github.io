import { allEntries } from "@/lib/content";
import { rss } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return rss(allEntries(), "/index.xml");
}
