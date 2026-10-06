import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /**
   * "split": heading in a narrow left column, content to the right (from `lg`).
   * "stacked": heading row on top, content full width below.
   */
  layout?: "split" | "stacked";
};

// A page section with a hairline rule on top. `scroll-mt-nav` keeps the heading clear
// of the sticky nav when the section is reached by its anchor (e.g. /#team).
export function Section({ id, eyebrow, title, intro, children, layout = "stacked" }: SectionProps) {
  const headingId = `${id}-heading`;

  const heading = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="mt-5 font-display text-title font-medium">
        {title}
      </h2>
    </>
  );

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-nav">
      <div className="wrap">
        <div className="border-t border-cream/10 py-20 sm:py-24 lg:py-28">
          {layout === "split" ? (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                {heading}
                {intro && <div className="mt-6 max-w-md leading-relaxed text-stone">{intro}</div>}
              </div>
              <div className="lg:col-span-8">{children}</div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
                <div className="lg:col-span-7">{heading}</div>
                {intro && (
                  <div className="max-w-xl leading-relaxed text-stone lg:col-span-5">{intro}</div>
                )}
              </div>
              {children && <div className="mt-12 lg:mt-16">{children}</div>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
