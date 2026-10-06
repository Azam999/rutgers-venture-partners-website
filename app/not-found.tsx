import Link from "next/link";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="content" tabIndex={-1} className="scroll-mt-nav focus:outline-none">
        <PageHero
          eyebrow="404"
          title="Page not found"
          actions={
            <Link href="/" className="btn px-6 py-3 text-base">
              Back to home
            </Link>
          }
        >
          <p>This page doesn’t exist or has moved.</p>
        </PageHero>
      </main>
    </>
  );
}
