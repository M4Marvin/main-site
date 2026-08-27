import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink } from "lucide-react";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  layoutId = "hoverBackground",
}: {
  items: {
    title: string;
    venue?: string;
    year?: number;
    description: string;
    link: string;
  }[];
  className?: string;
  layoutId?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const card = (item: (typeof items)[number]) => (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <CardTitle>{item.title}</CardTitle>
        {item.link.startsWith("http") && (
          <ExternalLink
            className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400 group-hover:text-zinc-200"
            aria-label="opens in a new tab"
          />
        )}
      </div>
      {(item.venue || item.year) && (
        <CardVenue>
          {item.venue}
          {item.venue && item.year ? " · " : ""}
          {item.year}
        </CardVenue>
      )}
      <CardDescription>{item.description}</CardDescription>
    </Card>
  );

  const hoverLayer = (idx: number) => (
    <AnimatePresence>
      {hoveredIndex === idx && (
        <motion.span
          className="absolute inset-0 h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8] block"
          layoutId={layoutId}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.1 },
          }}
        />
      )}
    </AnimatePresence>
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => {
        const isLink = item.link !== "" && item.link !== "#";
        const isExternal = isLink && item.link.startsWith("http");

        if (!isLink) {
          return (
            <div
              key={item.title}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoverLayer(idx)}
              {card(item)}
            </div>
          );
        }

        return (
          <a
            href={item.link}
            key={item.title}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="relative group block p-2 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded-2xl"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoverLayer(idx)}
            {card(item)}
          </a>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">{children}</div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
export const CardVenue = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-xs font-medium text-blue-400 tracking-wide",
        className
      )}
    >
      {children}
    </p>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};