import type { Metadata } from "next";
import { SITE } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
};

// app/opengraph-image.png, generated from the crest. Listed explicitly because a page
// that sets its own `openGraph` replaces the inherited one, image included.
const PREVIEW_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} crest`,
};

// Title, description, canonical URL and social preview for one page.
export function pageMetadata({ title, description, path, absoluteTitle }: PageMeta): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [PREVIEW_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [PREVIEW_IMAGE] },
  };
}
