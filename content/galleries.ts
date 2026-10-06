// Photo galleries. Each shows the first six photos listed; the first one is shown large.
// More photos from the old site's carousels are in /public/club-gallery and
// /public/vip-gallery. Swap a filename here to change what appears.

export type Photo = { src: string; alt: string };

export const CLUB_GALLERY: Photo[] = [
  {
    src: "/club-gallery/img_0772.webp",
    alt: "Club members gather for a group photo at a Kleiner Perkins speaker event",
  },
  {
    src: "/club-gallery/img_0769.webp",
    alt: "Students listen to a fireside conversation at the Kleiner Perkins event",
  },
  {
    src: "/club-gallery/img_8654.webp",
    alt: "A member speaks to a packed room at a club meeting",
  },
  {
    src: "/club-gallery/img_1736.webp",
    alt: "Members at the club’s table during a campus tabling event",
  },
  {
    src: "/club-gallery/img_4333.webp",
    alt: "Students present at the front of a workshop room in the Hatchery",
  },
  {
    src: "/club-gallery/30981872.webp",
    alt: "A large group photo of club members after a meeting",
  },
];

export const VIP_GALLERY: Photo[] = [
  {
    src: "/vip-gallery/gallery-1.webp",
    alt: "The VIP cohort poses for a group photo in a meeting room",
  },
  {
    src: "/vip-gallery/gallery-2.webp",
    alt: "Analysts compare notes on laptops around a table",
  },
  {
    src: "/vip-gallery/gallery-3.webp",
    alt: "Four analysts working side by side on laptops",
  },
  {
    src: "/vip-gallery/gallery-4.webp",
    alt: "Analysts gathered around a laptop during a working session",
  },
  {
    src: "/vip-gallery/gallery-5.webp",
    alt: "Analysts at their laptops during a sourcing session",
  },
  {
    src: "/vip-gallery/gallery-6.webp",
    alt: "An analyst leans in to help a teammate at a laptop",
  },
];
