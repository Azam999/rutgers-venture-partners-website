import Link from "next/link";
import { LINKS, NAV_LINKS } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import { Lockup } from "./Lockup";
import { MobileMenu } from "./MobileMenu";

type NavProps = {
  /** href of the page being viewed, e.g. "/vip/". That link is marked as current. */
  current?: string;
};

// `sticky top-0` does all the work: on the home page the nav sits below the landing
// screen, scrolls up with the page and pins once it reaches the top.
export function Nav({ current }: NavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-bg">
      <div className="wrap flex h-nav items-center justify-between gap-8">
        <Lockup />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isCurrent = link.href === current;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`text-sm transition-colors hover:text-cream ${
                      isCurrent
                        ? "text-cream underline decoration-rvp-red decoration-[1.5px] underline-offset-[0.55em]"
                        : "text-stone"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center">
          <ExternalLink href={LINKS.apply} className="btn hidden lg:inline-flex">
            Apply to VIP
          </ExternalLink>
          <MobileMenu links={NAV_LINKS} current={current} applyUrl={LINKS.apply} />
        </div>
      </div>
    </header>
  );
}
