import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { Gallery } from "@/components/Gallery";
import { Landing } from "@/components/Landing";
import { Nav } from "@/components/Nav";
import { Section } from "@/components/Section";
import { SubscribeForm } from "@/components/SubscribeForm";
import { TeamGrid } from "@/components/TeamGrid";
import { CLUB_GALLERY } from "@/content/galleries";
import { LINKS, SITE } from "@/content/site";
import { TEAM } from "@/content/team";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: SITE.name,
  absoluteTitle: true,
  description:
    "Rutgers Venture Partners is the premier organization for Rutgers students interested in venture capital, entrepreneurship, and innovation.",
  path: "/",
});

const OFFERS = [
  "Workshops with industry professionals",
  "Speaker events featuring VCs and founders",
  "Pitch competitions and startup showcases",
  "Flagship VIP analyst training program",
];

export default function HomePage() {
  return (
    <>
      <Landing />
      <Nav current="/" />

      <main id="content" tabIndex={-1} className="scroll-mt-nav focus:outline-none">
        <div className="landing-reveal wrap pb-20 pt-20 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-36">
          <p className="eyebrow">Rutgers University</p>
          <h1 className="mt-6 max-w-[14ch] font-display text-display font-medium uppercase tracking-display">
            {SITE.name}
          </h1>
          <p className="mt-12 max-w-4xl font-display text-lead text-cream lg:mt-16">
            The premier organization for students interested in venture capital, entrepreneurship,
            and innovation.{" "}
            <span className="text-stone-dim">
              We bridge the gap between academic learning and real-world venture capital experience.
            </span>
          </p>
        </div>

        <Section id="mission" eyebrow="Mission" title="What we offer" layout="split">
          <ol className="grid gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {OFFERS.map((offer, i) => (
              <li key={offer} className="flex min-h-48 flex-col justify-between gap-10 bg-bg p-7 sm:p-8">
                <span aria-hidden="true" className="font-display text-2xl text-rvp-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-2xl leading-snug font-medium sm:text-[1.7rem]">{offer}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid gap-4 sm:grid-cols-8 sm:gap-8">
            <h3 className="eyebrow pt-1.5 sm:col-span-2">Our impact</h3>
            <p className="text-lg leading-relaxed text-stone sm:col-span-6">
              Our alumni have gone on to work at leading VC firms, start their own companies, and
              drive innovation across various industries. Join us to build your network and develop
              the skills needed to succeed in venture capital.
            </p>
          </div>
        </Section>

        <Section id="programs" eyebrow="Programs" title="What we run">
          <div className="grid gap-px border border-cream/10 bg-cream/10 lg:grid-cols-12">
            <article className="flex flex-col bg-surface p-8 sm:p-10 lg:col-span-7 lg:p-12">
              <p className="eyebrow">Flagship program</p>
              <h3 className="mt-5 font-display text-4xl font-medium sm:text-5xl">
                Venture Investor Program
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
                VIP is a 12-week, student-run venture-sourcing program. Every four weeks, one VC firm
                partners with a cohort of 12 Rutgers analyst-trainees.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-10">
                <Link href="/vip/" className="link font-medium">
                  About VIP<span aria-hidden="true"> →</span>
                </Link>
                <ExternalLink href={LINKS.apply} className="link font-medium">
                  Apply<span aria-hidden="true"> ↗</span>
                </ExternalLink>
              </div>
            </article>
            <article className="flex flex-col bg-surface p-8 sm:p-10 lg:col-span-5 lg:p-12">
              <p className="eyebrow">Weekly newsletter</p>
              <h3 className="mt-5 font-display text-4xl font-medium sm:text-5xl">Into the Ring</h3>
              <div className="mt-auto pt-10">
                <SubscribeForm id="home-subscribe" />
                <Link href="/newsletter/" className="link mt-8 inline-block font-medium">
                  More about the newsletter<span aria-hidden="true"> →</span>
                </Link>
              </div>
            </article>
          </div>
        </Section>

        <Section id="activities" eyebrow="Gallery" title="Club activities">
          <Gallery photos={CLUB_GALLERY} />
        </Section>

        <Section id="team" eyebrow="People" title="Our team">
          <TeamGrid groups={TEAM} />
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title="Get in touch"
          layout="split"
          intro="Ready to join the next generation of venture investors? Have questions about the program? We’d love to hear from you!"
        >
          <a
            href={`mailto:${LINKS.email}`}
            className="link break-all font-display text-[clamp(1.75rem,1.2rem+2.6vw,3.5rem)] font-medium leading-tight sm:break-normal"
          >
            {LINKS.email}
          </a>
          <ul className="mt-12 grid gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2">
            <li className="bg-bg">
              <ExternalLink
                href={LINKS.linkedin}
                className="flex items-center justify-between p-6 transition-colors hover:bg-surface"
              >
                <span>
                  <span className="eyebrow block">LinkedIn</span>
                  <span className="mt-2 block font-display text-xl">Rutgers Venture Capitalist Club</span>
                </span>
                <span aria-hidden="true" className="text-stone">↗</span>
              </ExternalLink>
            </li>
            <li className="bg-bg">
              <ExternalLink
                href={LINKS.instagram}
                className="flex items-center justify-between p-6 transition-colors hover:bg-surface"
              >
                <span>
                  <span className="eyebrow block">Instagram</span>
                  <span className="mt-2 block font-display text-xl">@ruventurecc</span>
                </span>
                <span aria-hidden="true" className="text-stone">↗</span>
              </ExternalLink>
            </li>
          </ul>
        </Section>
      </main>
    </>
  );
}
