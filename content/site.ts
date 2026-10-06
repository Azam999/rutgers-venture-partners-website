// Site-wide settings, links and contact details. Edit here; components read from this file.

export const SITE = {
  name: "Rutgers Venture Partners",
  shortName: "RVP",
  // Used for absolute URLs in social previews and the sitemap.
  url: "https://www.rutgersvip.com",
  university: "Rutgers, The State University of New Jersey",
  newsletter: "Venture Times",
  instagramHandle: "@rutgers.venture",
} as const;

const EMAIL = "rutgersvp@gmail.com";

export const LINKS = {
  apply: "https://forms.gle/ghLjEA6eUqcafcUZ6",
  email: EMAIL,
  partnerInquiry: `mailto:${EMAIL}?subject=Partnership%20Inquiry%20-%20Rutgers%20VIP`,
  instagram: "https://instagram.com/rutgers.venture",
  linkedin: "https://www.linkedin.com/company/rutgers-venture-capitalist-club/",
} as const;

export type NavLink = { href: string; label: string };

// Page links use trailing slashes to match the static export (`trailingSlash: true`).
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/vip/", label: "VIP" },
  { href: "/newsletter/", label: "Newsletter" },
  { href: "/resources/", label: "Resources" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
];

export const VIP_APPLICATION = {
  url: LINKS.apply,
  // The old site read "Apply for Spring 2026 Cohort · Application deadline: February 6, 2026".
  // That date has passed, so nothing is shown. Set these for the next cohort, e.g.
  // cohort: "Fall 2026", deadline: "September 12, 2026". Leave null to hide the line.
  cohort: null as string | null,
  deadline: null as string | null,
};

// Venture Times, the weekly newsletter (its name is SITE.newsletter). The subscribe box
// is a plain HTML form that posts straight to Mailchimp: no JavaScript, no API route.
// Find all three values in Mailchimp under Audience → Signup forms → Embedded forms.
export const MAILCHIMP = {
  // TODO MAILCHIMP: the form's `action` URL.
  formAction: "https://XXXX.usXX.list-manage.com/subscribe/post?u=XXXX&id=XXXX",
  // TODO MAILCHIMP: name of the hidden bot-trap input, b_<u value>_<id value>.
  botTrapName: "b_XXXX_XXXX",
  // TODO MAILCHIMP: public campaign archive (Campaigns → View archive).
  archiveUrl: "https://usXX.campaign-archive.com/home/?u=XXXX&id=XXXX",
};

export type IssueBeat = { title: string; description: string };

// TODO COPY: "What's in every issue" on /newsletter. Neither the old site nor the repo
// has this copy, so it ships empty and the section stays hidden until three beats are
// added here, e.g. { title: "…", description: "…" }.
export const NEWSLETTER_BEATS: IssueBeat[] = [];
