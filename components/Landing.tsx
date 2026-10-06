import Image from "next/image";

// Full-screen opener on the home page: pure black and the crest, nothing else.
// There's no scripting here. The page scrolls natively and the <Nav> that follows in
// the DOM rises into view and pins itself with `position: sticky`.
export function Landing() {
  return (
    <div className="relative grid h-svh place-items-center bg-black">
      <Image
        src="/logo/crest.png"
        alt="Rutgers Venture Partners"
        width={664}
        height={664}
        // The crest is the page's LCP and is in the initial HTML: fetch it first.
        // (Next 16 deprecated `priority`; its docs prefer this over `preload`.)
        loading="eager"
        fetchPriority="high"
        className="h-auto w-[min(64vw,54svh,540px)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="absolute bottom-8 left-1/2 w-5 -translate-x-1/2 text-cream/30"
      >
        <path d="M2 2l10 8 10-8" />
      </svg>
    </div>
  );
}
