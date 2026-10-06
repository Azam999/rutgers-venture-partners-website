import Link from "next/link";
import { LINKS, NAV_LINKS, SITE } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import { Lockup } from "./Lockup";

export function Footer() {
  return (
    <footer className="border-t border-cream/10">
      <div className="wrap grid gap-12 py-16 sm:py-20 md:grid-cols-12">
        <div className="md:col-span-6">
          <Lockup size="lg" />
          <p className="mt-6 text-sm text-stone-dim">{SITE.university}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow">Site</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-stone transition-colors hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${LINKS.email}`} className="text-stone transition-colors hover:text-cream">
                {LINKS.email}
              </a>
            </li>
            <li>
              <ExternalLink href={LINKS.linkedin} className="text-stone transition-colors hover:text-cream">
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={LINKS.instagram} className="text-stone transition-colors hover:text-cream">
                Instagram
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={LINKS.apply} className="text-stone transition-colors hover:text-cream">
                Apply to VIP
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap">
        <p className="border-t border-cream/10 py-6 text-xs text-stone-dim">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
