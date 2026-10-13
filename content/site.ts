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
// All three values come from Mailchimp's embed code (Audience → Signup forms → Embedded
// forms). They're public by design; never put a Mailchimp API key here.
export const MAILCHIMP = {
  // The embed code's <form action="…">, with each `&amp;` written as `&`.
  formAction:
    "https://gmail.us6.list-manage.com/subscribe/post?u=8e17dbf4bb836d12f64a813eb&id=71a2934004&f_id=00132fe3f0",
  // The hidden bot-trap input in the embed code: b_<u>_<id> from the URL above.
  botTrapName: "b_8e17dbf4bb836d12f64a813eb_71a2934004",
  // Public list of past issues: same u and id, on the account's us6 server.
  archiveUrl: "https://us6.campaign-archive.com/home/?u=8e17dbf4bb836d12f64a813eb&id=71a2934004",
};

export type IssueBeat = { title: string; description: string };

// TODO COPY: "What's in every issue" on /newsletter. Neither the old site nor the repo
// has this copy, so it ships empty and the section stays hidden until three beats are
// added here, e.g. { title: "…", description: "…" }.
export const NEWSLETTER_BEATS: IssueBeat[] = [];
