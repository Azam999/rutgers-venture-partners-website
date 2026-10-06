import Image from "next/image";
import { LandingGlide } from "./LandingGlide";

// Full-screen opener on the home page: pure black and the crest, nothing else. The
// crest's own black disc is #000 too, so only its red ring, lettering and centre show.
// <LandingGlide> turns the first scroll into one smooth move down to the site; the
// <Nav> that follows in the DOM rises with it and pins itself with `position: sticky`.
export function Landing() {
  return (
    <div data-landing className="relative grid h-svh place-items-center overflow-hidden bg-black">
      <Image
        src="/logo/crest.webp"
        alt="Rutgers Venture Partners"
        width={756}
        height={756}
        // The crest is the page's LCP and is in the initial HTML: fetch it first.
        // (Next 16 deprecated `priority`; its docs prefer this over `preload`.)
        loading="eager"
        fetchPriority="high"
        className="landing-crest h-auto w-[min(64vw,54svh,540px)]"
      />
      <LandingGlide />
    </div>
  );
}
