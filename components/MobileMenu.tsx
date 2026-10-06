"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/content/site";
import { ExternalLink } from "./ExternalLink";

type MobileMenuProps = {
  links: NavLink[];
  current?: string;
  applyUrl: string;
};

// The site's only client component: the menu toggle below the `lg` breakpoint.
export function MobileMenu({ links, current, applyUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="-mr-2.5 grid size-11 place-items-center text-cream"
      >
        <span className="sr-only">Menu</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 9h17M3.5 15h17" />}
        </svg>
      </button>

      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100svh-var(--spacing-nav))] overflow-y-auto border-b border-cream/10 bg-bg"
      >
        <nav aria-label="Main" className="wrap pb-8 pt-2">
          <ul className="divide-y divide-cream/10">
            {links.map((link) => {
              const isCurrent = link.href === current;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-center justify-between py-4 font-display text-2xl ${
                      isCurrent ? "text-cream" : "text-stone"
                    }`}
                  >
                    {link.label}
                    {isCurrent && <span aria-hidden="true" className="size-1.5 rounded-full bg-rvp-red" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ExternalLink href={applyUrl} onClick={close} className="btn mt-6 w-full py-3.5">
            Apply to VIP
          </ExternalLink>
        </nav>
      </div>
    </div>
  );
}
