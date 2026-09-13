"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useStillness } from "@/lib/useStillness";

/** A one-pixel reading-progress hairline pinned to the top of the page. */
export function ScrollProgress() {
  const reduce = useStillness();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-px bg-[var(--border-strong)]"
    />
  );
}
