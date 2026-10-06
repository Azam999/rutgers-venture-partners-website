import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

const PAGES = ["/", "/vip/", "/newsletter/", "/resources/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({ url: new URL(path, SITE.url).toString() }));
}
