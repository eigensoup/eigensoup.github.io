import type { Metadata, Viewport } from "next";
import { EB_Garamond, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Footer, Header } from "@/components/chrome";
import { PencilDefs } from "@/components/sketches";
import { site } from "@/lib/site";

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { types: { "application/rss+xml": "/index.xml" } },
  openGraph: { type: "website", siteName: site.name, url: site.url, title: site.name, description: site.description },
  twitter: { card: "summary", creator: "@WaylandStuart" },
};

export const viewport: Viewport = { themeColor: "#f5f0e6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${newsreader.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-paper focus:px-3 focus:py-1"
        >
          Skip to content
        </a>
        <PencilDefs />
        <Header />
        <main id="main" className="mx-auto w-full max-w-[64rem] flex-1 px-5 pt-10 sm:px-8 lg:pt-16">
          <div className="notebook max-w-[40rem]">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
