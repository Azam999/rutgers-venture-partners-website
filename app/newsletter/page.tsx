import { ExternalLink } from "@/components/ExternalLink";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubscribeForm } from "@/components/SubscribeForm";
import { MAILCHIMP, NEWSLETTER_BEATS, SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Into the Ring",
  description: `Subscribe to Into the Ring, the weekly newsletter from ${SITE.name}.`,
  path: "/newsletter/",
});

export default function NewsletterPage() {
  return (
    <>
      <Nav current="/newsletter/" />
      <main id="content" tabIndex={-1} className="scroll-mt-nav focus:outline-none">
        <PageHero eyebrow="Weekly newsletter" title="Into the Ring">
          <p>The weekly newsletter from {SITE.name}.</p>
        </PageHero>

        {/* Hidden until the copy exists; see NEWSLETTER_BEATS in content/site.ts. */}
        {NEWSLETTER_BEATS.length > 0 && (
          <Section id="every-issue" eyebrow="Inside" title="What’s in every issue">
            <ol className="grid gap-px border border-cream/10 bg-cream/10 md:grid-cols-3">
              {NEWSLETTER_BEATS.map((beat, i) => (
                <li key={beat.title} className="flex flex-col gap-8 bg-bg p-7 sm:p-8">
                  <span aria-hidden="true" className="font-display text-2xl text-rvp-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium">{beat.title}</h3>
                    <p className="mt-3 leading-relaxed text-stone">{beat.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section id="subscribe" eyebrow="Into the Ring" title="Subscribe" layout="split">
          <div className="border border-cream/10 bg-surface p-6 sm:p-10">
            <SubscribeForm />
          </div>
          <p className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-cream/10 pt-6">
            <span className="font-display text-2xl">Past issues</span>
            <ExternalLink href={MAILCHIMP.archiveUrl} className="link font-medium">
              Read the archive<span aria-hidden="true"> ↗</span>
            </ExternalLink>
          </p>
        </Section>
      </main>
    </>
  );
}
