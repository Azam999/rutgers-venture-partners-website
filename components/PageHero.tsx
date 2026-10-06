import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
};

// Opening block of a page: uppercase display title with the brand's wide tracking.
export function PageHero({ eyebrow, title, children, actions }: PageHeroProps) {
  return (
    <div className="wrap pb-20 pt-20 sm:pb-24 sm:pt-28 lg:pb-32 lg:pt-36">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-6 max-w-[16ch] font-display text-display font-medium uppercase tracking-display">
        {title}
      </h1>
      {children && (
        <div className="mt-8 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">{children}</div>
      )}
      {actions && <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>}
    </div>
  );
}
