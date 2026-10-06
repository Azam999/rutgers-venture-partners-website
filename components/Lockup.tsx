import Image from "next/image";
import Link from "next/link";

// Crest plus the stacked RUTGERS / VENTURE PARTNERS wordmark, linking home.
export function Lockup({ size = "sm" }: { size?: "sm" | "lg" }) {
  const large = size === "lg";
  return (
    <Link href="/" className="inline-flex items-center gap-3 text-cream">
      <Image
        src="/logo/crest-160.webp"
        alt=""
        width={160}
        height={160}
        className={large ? "size-14" : "size-10"}
      />
      <span
        className={`font-display font-semibold uppercase leading-[1.08] tracking-display ${
          large ? "text-[1rem]" : "text-[0.84rem]"
        }`}
      >
        <span className="block">Rutgers</span>
        <span className="block">Venture Partners</span>
      </span>
    </Link>
  );
}
