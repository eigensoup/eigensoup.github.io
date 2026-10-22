import { PageHeading } from "@/components/chrome";

export const metadata = {
  title: "CV",
  description: "Curriculum vitae of Stuart Wayland.",
  alternates: { canonical: "/cv/" },
};

export default function CV() {
  return (
    <>
      <PageHeading title="Curriculum Vitæ" />
      <p className="mb-6">
        <a href="/cv.pdf" className="smallcaps inline-block py-2">
          <span className="sm:hidden">Open the CV (PDF) &rarr;</span>
          <span className="hidden sm:inline">Download PDF</span>
        </a>
      </p>
      {/* Phone browsers render embedded PDFs poorly (iOS shows page one only), so the embed is for larger screens. */}
      <object
        data="/cv.pdf"
        type="application/pdf"
        className="hidden h-[80vh] w-full border border-rule bg-white sm:block lg:w-[calc(100%+12rem)]"
        aria-label="Stuart Wayland CV"
      >
        <p className="p-4">
          Your browser cannot display PDFs inline. <a href="/cv.pdf">Download the CV</a>.
        </p>
      </object>
    </>
  );
}
