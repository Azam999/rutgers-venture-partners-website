import { ExternalLink } from "@/components/ExternalLink";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { BOOKS, type LinkResource, PODCASTS, READING } from "@/content/resources";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resources",
  description: `Podcasts, videos, essays, newsletters and books on venture capital and startups, recommended by ${SITE.name}.`,
  path: "/resources/",
});

const SECTIONS = [
  { id: "podcasts", label: "Podcasts & videos" },
  { id: "reading", label: "Essential reading" },
  { id: "books", label: "Recommended books" },
];

function ResourceList({ items }: { items: LinkResource[] }) {
  return (
    <ul className="border-t border-cream/10">
      {items.map((item) => (
        <li
          key={item.href}
          className="group relative grid gap-3 border-b border-cream/10 py-7 sm:py-8 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl leading-tight font-medium sm:text-[1.7rem]">
              {/* ::after stretches this link over the whole row. */}
              <ExternalLink
                href={item.href}
                className="decoration-rvp-red underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-cream"
              >
                {item.title}
              </ExternalLink>
            </h3>
            <p className="mt-1.5 text-sm text-stone-dim">{item.byline}</p>
          </div>
          <p className="max-w-xl leading-relaxed text-stone lg:col-span-5">{item.description}</p>
          <p aria-hidden="true" className="text-sm font-medium text-cream lg:col-span-3 lg:text-right">
            {item.cta} <span className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Nav current="/resources/" />
      <main id="content" tabIndex={-1} className="scroll-mt-nav focus:outline-none">
        <PageHero eyebrow="Recommended by RVP" title="Resources">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-base">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="link">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </PageHero>

        <Section id="podcasts" eyebrow="Listen & watch" title="Podcasts & videos">
          <ResourceList items={PODCASTS} />
        </Section>

        <Section id="reading" eyebrow="Read" title="Essential reading">
          <ResourceList items={READING} />
        </Section>

        <Section id="books" eyebrow="Bookshelf" title="Recommended books">
          <ol className="grid gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKS.map((book, i) => (
              <li key={book.title} className="flex min-h-56 flex-col bg-bg p-7">
                <span aria-hidden="true" className="text-xs tabular-nums text-stone-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-auto pt-10 font-display text-2xl leading-tight font-medium">
                  {book.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{book.subtitle}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>
    </>
  );
}
