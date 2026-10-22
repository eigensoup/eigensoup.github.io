import { RedirectStub, redirectMetadata } from "@/components/redirect";

export const metadata = redirectMetadata("/");

export default function Page() {
  return <RedirectStub to="/" />;
}
