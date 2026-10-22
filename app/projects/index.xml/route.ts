import { getEntries } from "@/lib/content";
import { rss } from "@/lib/feed";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Hugo's projects feed held the papers too, so this keeps both sections.
export function GET() {
  return rss([...getEntries("research"), ...getEntries("projects")], "/projects/index.xml", `Projects · ${site.name}`);
}
