"use client";

import { motion } from "motion/react";
import { useStillness } from "@/lib/useStillness";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  /** Seconds of delay. Use the index of an item to stagger a group. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
};

/**
 * Fade and rise on entry. The plain one, used for prose and for anything
 * without a better idea attached to it.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const still = useStillness();
  const Component = motion[as];

  if (still) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/**
 * Type rising from behind a mask, as though the line were already set and the
 * page is lifting the cover off it. Used on the big display headings, where a
 * plain fade would be the generic choice.
 *
 * The wrapper clips, the inner element travels, so nothing is ever drawn
 * outside the line's own box.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const still = useStillness();

  if (still) return <span className={className}>{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "115%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * A card being placed down: it arrives slightly small and slightly turned,
 * then settles. Used on the paper objects, where a straight vertical fade
 * would fight the fact that they are meant to read as physical things.
 */
export function PlaceReveal({
  children,
  delay = 0,
  rotate = 0,
  className,
  as = "li",
}: Props & { rotate?: number }) {
  const still = useStillness();
  const Component = motion[as];

  if (still) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 26, scale: 0.965, rotate }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
