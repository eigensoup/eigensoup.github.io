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
        <a href="/cv.pdf" className="smallcaps">
          Download PDF
        </a>
      </p>
      <object
        data="/cv.pdf"
        type="application/pdf"
        className="h-[80vh] w-full border border-rule bg-white lg:w-[calc(100%+12rem)]"
        aria-label="Stuart Wayland CV"
      >
        <p className="p-4">
          Your browser cannot display PDFs inline. <a href="/cv.pdf">Download the CV</a>.
        </p>
      </object>
    </>
  );
}
