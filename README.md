# Rutgers Venture Partners website

The public site for Rutgers Venture Partners (RVP), the venture capital club at Rutgers.
It is a Next.js (App Router, TypeScript) site styled with Tailwind CSS v4 that builds to
plain static files, so any static host can serve it.

## Commands

```bash
npm install          # once
npm run dev          # local dev server at http://localhost:3000
npm run build        # static site in out/
npm start            # serve out/ locally (gzip/brotli, like a real host)
npm run lint
```

Deploy by uploading the contents of `out/` to the host serving the club domain.
Netlify, Cloudflare Pages, GitHub Pages, Vercel and plain nginx all work.
Pages are emitted as `/vip/index.html` and so on, so no rewrite rules are needed. The
host should serve `404.html` for missing pages; most do this automatically.

## Editing content

Everything the club is likely to change lives in `content/`. Components read from these
files, so you don't need to touch them.

| File | What's in it |
| --- | --- |
| `content/site.ts` | Links (apply form, email, Instagram, LinkedIn), nav, VIP cohort/deadline, Mailchimp settings, newsletter "What's in every issue" |
| `content/team.ts` | Team groups and members. Headshots go in `public/headshots/` (any portrait; cards crop to 4:5) |
| `content/partners.ts` | Partner logo wall on /vip |
| `content/galleries.ts` | The six photos on the home page and on /vip |
| `content/resources.ts` | Podcasts, reading and books on /resources |

Page copy (hero lines, section text) is in `app/**/page.tsx`.

## Still to fill in

Search the repo for `TODO`:

- **`TODO COPY`** (`content/site.ts`): the three "What's in every issue" beats for
  /newsletter. That section stays hidden until they're added.
- **VIP cohort and deadline** (`VIP_APPLICATION` in `content/site.ts`): the old site's
  "Spring 2026 · February 6, 2026" has passed, so no date is shown.

## Newsletter (Mailchimp)

The subscribe boxes on the home page and /newsletter post straight to the club's
Mailchimp audience; the "Read the archive" link opens its public list of past issues.
The three values are in `MAILCHIMP` in `content/site.ts`. If the club ever switches
audience or account, copy them again from Mailchimp's embed code (Audience → Signup
forms → Embedded forms). Only paste those values, not the whole embed snippet: the
site already has its own form, and Mailchimp's snippet adds its own styles and scripts.

## Images

`scripts/fetch-assets.mjs` was a one-time migration. It read the old rutgersvip.com,
downloaded every image it used and wrote web-ready copies into `public/`. It recolours
partner logos to a single cream so mismatched files look like one set. The site makes no
requests to the old domain.

The old site also had more photos than this one shows (eight former analysts and a
15-photo club carousel). All of them were kept in `public/` so they can be swapped in
from `content/` later.

### The crest

`public/logo.png` is the master crest: square, transparent background. Everything else
is generated from it by `npm run logo`:

- the landing-screen and nav/footer crests in `public/logo/`;
- the favicon and app icon, which use only the red centre disc because the ring
  lettering is unreadable at tab size;
- the home-screen icon and the link-preview image in `app/`.

To update the logo, replace `public/logo.png` and run `npm run logo`. The current file is
756px; a larger export (1500px+) or an SVG would keep the landing crest perfectly sharp
on big high-DPI screens.

## The landing screen

The home page opens on the crest alone. The first scroll from there (wheel, trackpad,
swipe, arrow keys, space or the arrow at the bottom of the screen) glides the page down to the site in one
smooth move, and scrolling up from the top of the site glides back. Everything below
the landing scrolls normally. The crest fading out is CSS tied to scroll position.

- Logic: `components/LandingGlide.tsx` (speed and easing are constants at the top).
- Motion: the `.landing-*` rules in `app/globals.css`.
- Visitors with "reduce motion" turned on, or without JavaScript, get plain scrolling.

## Brand

Colours are Tailwind tokens in `app/globals.css` (`rvp-red`, `cream`, `stone` and so on).
Type is Cormorant Garamond for display (stand-in for The Seasons), Inter for text, and
Alfa Slab One for loud accents only (the VIP stat numerals). Red text is too
low-contrast for small copy on black, so inline links are cream with a red underline.
