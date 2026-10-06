import { ExternalLink } from "@/components/ExternalLink";
import { Gallery } from "@/components/Gallery";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { PartnerWall } from "@/components/PartnerWall";
import { Section } from "@/components/Section";
import { VIP_GALLERY } from "@/content/galleries";
import { PARTNERS } from "@/content/partners";
import { LINKS, VIP_APPLICATION } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rutgers VIP – Venture Investor Program",
  absoluteTitle: true,
  description:
    "A 12-week student-run venture sourcing program connecting Rutgers students with top VC firms. Gain hands-on experience in venture capital through sourcing, analysis, and pitching to real investors.",
  path: "/vip/",
});

const STATS = [
  {
    value: "12",
    label: "Weeks",
    detail: "Comprehensive training in venture capital fundamentals and practical sourcing",
  },
  {
    value: "10",
    label: "VC Partners",
    detail: "Work directly with top-tier venture capital firms throughout the program",
  },
];

const ANALYST_WORK = [
  { title: "Sourcing & Interviewing Startups", detail: "Cold outreach and warm intros" },
  {
    title: "Fundamentals of a Great Startup",
    detail: "Qualitative drivers, market analysis, team evaluation",
  },
  {
    title: "Live Interaction with VC Pros",
    detail: "Office visits, feedback sessions, and presentations",
  },
  { title: "Guest Speakers", detail: "Operators, partners, startup founders, etc." },
];

function ApplicationTiming() {
  const { cohort, deadline } = VIP_APPLICATION;
  if (!cohort && !deadline) return null;
  return (
    <p className="text-sm text-stone">
      {cohort && <span className="text-cream">{cohort} cohort</span>}
      {cohort && deadline && <span aria-hidden="true"> · </span>}
      {deadline && <>Application deadline: {deadline}</>}
    </p>
  );
}

export default function VipPage() {
  return (
    <>
      <Nav current="/vip/" />
      <main id="content" tabIndex={-1} className="scroll-mt-nav focus:outline-none">
        <PageHero
          eyebrow="Flagship program"
          title="Venture Investor Program"
          actions={
            <>
              <ExternalLink href={VIP_APPLICATION.url} className="btn px-6 py-3 text-base">
                Apply to VIP
              </ExternalLink>
              <ApplicationTiming />
            </>
          }
        >
          <p>
            Join the premier 12-week venture sourcing program connecting Rutgers students with
            founders and top-tier VC firms.
          </p>
        </PageHero>

        <Section id="structure" eyebrow="Program" title="Program structure" layout="split">
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-stone">
            <p>
              VIP is a 12-week, student-run venture-sourcing program. Every four weeks, one VC firm
              partners with a cohort of 12 Rutgers analyst-trainees.
            </p>
            <p>
              Each cycle ends with a live or virtual pitch session where each team presents 3
              pre-screened startups, custom-selected for your investment thesis, followed by
              feedback.
            </p>
          </div>
          <dl className="mt-14 grid gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-bg p-7 sm:p-8">
                <dt className="order-2 mt-5 font-display text-2xl font-medium">{stat.label}</dt>
                <dd className="order-1 font-slab text-7xl leading-none text-rvp-red sm:text-8xl">
                  {stat.value}
                </dd>
                <dd className="order-3 mt-3 leading-relaxed text-stone">{stat.detail}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="analysts" eyebrow="The work" title="What analysts do" layout="split">
          <ol className="border-t border-cream/10">
            {ANALYST_WORK.map((item, i) => (
              <li
                key={item.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-cream/10 py-7 sm:grid-cols-[3.5rem_1fr_1fr] sm:gap-x-8 sm:py-8"
              >
                <span aria-hidden="true" className="font-display text-2xl leading-none text-rvp-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl leading-tight font-medium">{item.title}</h3>
                <p className="col-start-2 mt-2 leading-relaxed text-stone sm:col-start-3 sm:mt-0">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="partners"
          eyebrow="Partners"
          title="Our partners"
          intro="Completed sourcing work for partners and associates at:"
        >
          <PartnerWall partners={PARTNERS} />
        </Section>

        <Section id="gallery" eyebrow="Gallery" title="VIP in action">
          <Gallery photos={VIP_GALLERY} />
        </Section>

        <section aria-labelledby="apply-heading" className="wrap">
          <div className="border-t border-cream/10 py-24 sm:py-32 lg:py-40">
            <p className="eyebrow">Applications</p>
            <h2
              id="apply-heading"
              className="mt-6 max-w-4xl font-display text-title font-medium"
            >
              Ready to join the next generation of venture investors?
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ExternalLink href={VIP_APPLICATION.url} className="btn px-6 py-3 text-base">
                Apply to VIP
              </ExternalLink>
              <ApplicationTiming />
              <p className="text-sm text-stone">
                Have questions about the program?{" "}
                <a href={`mailto:${LINKS.email}`} className="link">
                  {LINKS.email}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
