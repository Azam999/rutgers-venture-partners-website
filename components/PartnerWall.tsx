import Image from "next/image";
import type { CSSProperties } from "react";
import type { Partner } from "@/content/partners";
import { LINKS } from "@/content/site";

// Sizing every logo to the same box makes wide wordmarks look tiny and square marks
// look huge. Instead each logo gets roughly the same area, within width/height caps.
const LOGO_AREA = 7600; // px²
const MAX_WIDTH = 196;
const MAX_HEIGHT = 72;

function displayWidth({ width, height }: Partner) {
  const ratio = width / height;
  const byArea = Math.sqrt(LOGO_AREA * ratio);
  return Math.round(Math.min(byArea, MAX_WIDTH, MAX_HEIGHT * ratio));
}

export function PartnerWall({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px border border-cream/10 bg-cream/10 md:grid-cols-3 lg:grid-cols-4">
      {partners.map((partner) => (
        <li key={partner.name} className="flex aspect-[3/2] items-center justify-center bg-bg p-6 sm:aspect-[2/1]">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            style={{ "--logo-w": `${displayWidth(partner)}px` } as CSSProperties}
            className="h-auto w-[calc(var(--logo-w)*0.78)] max-w-full opacity-90 sm:w-(--logo-w)"
          />
        </li>
      ))}
      <li className="flex flex-col justify-center gap-3 bg-bg p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-stone">Interested in partnering with us?</p>
        <a href={LINKS.partnerInquiry} className="link self-start font-display text-xl font-medium">
          Become a partner<span aria-hidden="true"> →</span>
        </a>
      </li>
    </ul>
  );
}
