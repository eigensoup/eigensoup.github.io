import Link from "next/link";
import { PageHeading } from "@/components/chrome";
import { Tex } from "@/components/math";

export default function NotFound() {
  return (
    <>
      <PageHeading title="Not found" kicker="Error 404" />
      <p>
        This page is not in the notebook. Its preimage under <Tex>{String.raw`\mathrm{url}`}</Tex> is empty.
      </p>
      <p className="mt-6">
        <Link href="/" className="smallcaps">
          &larr; Return to the first page
        </Link>
      </p>
    </>
  );
}
