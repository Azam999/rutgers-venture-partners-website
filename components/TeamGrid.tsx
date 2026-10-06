import Image from "next/image";
import type { TeamGroup } from "@/content/team";

export function TeamGrid({ groups }: { groups: TeamGroup[] }) {
  return (
    <div className="space-y-16 lg:space-y-24">
      {groups.map((group) => (
        <div key={group.title} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h3 className="flex items-baseline gap-3 lg:col-span-3">
            <span className="font-display text-3xl font-medium">{group.title}</span>
            <span className="text-xs tabular-nums text-stone-dim">
              {String(group.members.length).padStart(2, "0")}
            </span>
          </h3>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:col-span-9 xl:grid-cols-4">
            {group.members.map((member) => (
              <li key={member.name} className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 220px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-4 font-display text-xl leading-tight font-medium">
                  {/* The name is the LinkedIn link; ::after stretches it over the whole card. */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="decoration-rvp-red underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-cream"
                  >
                    {member.name}
                    <span className="sr-only">, {member.role}, on LinkedIn (opens in a new tab)</span>
                  </a>
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-stone-dim">
                  {member.role}
                  <LinkedInMark />
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current opacity-70">
      <path d="M13.6 0H2.4A2.4 2.4 0 0 0 0 2.4v11.2A2.4 2.4 0 0 0 2.4 16h11.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 13.6 0ZM4.9 13.3H2.6V6.1h2.3v7.2ZM3.7 5.1a1.3 1.3 0 1 1 0-2.7 1.3 1.3 0 0 1 0 2.7Zm9.6 8.2H11V9.8c0-.8 0-1.9-1.2-1.9s-1.4.9-1.4 1.8v3.6H6.2V6.1h2.2v1h.1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v3.8Z" />
    </svg>
  );
}
