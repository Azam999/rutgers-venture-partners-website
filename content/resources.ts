// Lists on /resources. Add, remove or reorder entries freely.

export type LinkResource = {
  title: string;
  byline: string;
  description: string;
  href: string;
  cta: string;
};

export type Book = { title: string; subtitle: string };

export const PODCASTS: LinkResource[] = [
  {
    title: "Uncapped",
    byline: "with Jack Altman",
    description: "Deep dives into venture capital and startups with top founders and investors",
    href: "https://www.youtube.com/@uncappedpod",
    cta: "Watch on YouTube",
  },
  {
    title: "20VC",
    byline: "with Harry Stebbings",
    description:
      "The world’s largest independent venture podcast with leading VCs and founders",
    href: "https://www.youtube.com/@20VC",
    cta: "Watch on YouTube",
  },
  {
    title: "Startup/VC Playlist",
    byline: "Curated collection",
    description:
      "Essential videos covering startup fundamentals, VC insights, and founder stories",
    href: "https://www.youtube.com/playlist?list=PLzQgStRQHwpOxsLuneDBS3LYSNu7Q3tQg",
    cta: "View playlist",
  },
];

export const READING: LinkResource[] = [
  {
    title: "Paul Graham Essays",
    byline: "Y Combinator Library",
    description:
      "Foundational essays on startups, growth, and venture capital from YC’s co-founder",
    href: "https://www.ycombinator.com/library/carousel/Essays%20by%20Paul%20Graham",
    cta: "Read essays",
  },
  {
    title: "Outlier’s Path",
    byline: "by Alfred Lin",
    description:
      "Company-building frameworks and principles from a Sequoia partner for founders navigating critical business moments",
    href: "https://outlierspath.com",
    cta: "Visit site",
  },
  {
    title: "David Cahn’s Newsletter",
    byline: "by David Cahn",
    description:
      "AI, technology, and startup trends from a Sequoia partner and author of “AI’s $600B Question”",
    href: "https://dcahn.substack.com",
    cta: "Read newsletter",
  },
  {
    title: "Product Market Fit",
    byline: "by Guillermo Flor",
    description:
      "Weekly insights on startup growth, fundraising, and achieving product-market fit, used by Notion, Stripe, and OpenAI",
    href: "https://www.productmarketfit.tech",
    cta: "Read newsletter",
  },
];

export const BOOKS: Book[] = [
  { title: "Pattern Breakers", subtitle: "The secrets behind the world’s most successful startups" },
  { title: "Zero to One", subtitle: "Notes on startups, or how to build the future" },
  { title: "The Unfair Advantage", subtitle: "How you already have what it takes to succeed" },
  { title: "Secrets of Sand Hill Road", subtitle: "Venture capital and how to get it" },
  {
    title: "The Mom Test",
    subtitle: "How to talk to customers & learn if your business is a good idea",
  },
  {
    title: "Loonshots",
    subtitle:
      "How to nurture the crazy ideas that win wars, cure diseases, and transform industries",
  },
  { title: "Hooked", subtitle: "How to build habit-forming products" },
  {
    title: "The Great American Drug Deal",
    subtitle:
      "How to navigate biotech startups, and learn about why medicine is so expensive for patients",
  },
];
