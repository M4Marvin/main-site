import { cn } from "@/lib/utils";
import { profile, type NavItem } from "@/lib/portfolio-data";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md">
        <div className="flex items-center gap-1">
          {navItems.map((navItem, idx: number) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
              )}
            >
              {navItem.name}
            </a>
          ))}
        </div>

        <div className="h-5 w-px bg-white/10" />

        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full bg-linear-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 active:scale-[0.97]"
        >
          <span>Resume</span>
        </a>
      </div>
    </div>
  );
};