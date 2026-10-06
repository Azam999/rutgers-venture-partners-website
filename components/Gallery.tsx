import Image from "next/image";
import type { Photo } from "@/content/galleries";

// Six-photo mosaic. Desktop: one large photo with five around it. Mobile: the large
// photo, a 2×2 block, then the last photo full width. Fixed aspect ratios reserve the
// space before images load, so nothing shifts.
export function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
      {photos.slice(0, 6).map((photo, i) => {
        const isFeature = i === 0;
        const isLast = i === 5;
        return (
          <li
            key={photo.src}
            className={`relative overflow-hidden bg-surface ${
              isFeature
                ? "col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto"
                : isLast
                  ? "col-span-2 aspect-[3/2] lg:col-span-1"
                  : "aspect-[3/2]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={isFeature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
              className="object-cover"
            />
          </li>
        );
      })}
    </ul>
  );
}
