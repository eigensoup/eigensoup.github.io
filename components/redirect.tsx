import type { Metadata } from "next";

/** GitHub Pages cannot send HTTP redirects, so moved URLs get a meta-refresh page. */
export function redirectMetadata(to: string): Metadata {
  return { title: "Moved", robots: { index: false }, alternates: { canonical: to } };
}

export function RedirectStub({ to }: { to: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p>
        This page has moved to <a href={to}>{to}</a>.
      </p>
    </>
  );
}
