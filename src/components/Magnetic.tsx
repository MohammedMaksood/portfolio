"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useStillness } from "@/lib/useStillness";
import type { ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum pixels of pull toward the cursor. */
  strength?: number;
};

/**
 * Pulls its child gently toward the cursor. Pointer-driven only, so it
 * is inert on touch devices, and disabled under reduced motion.
 */
export function Magnetic({ children, className, strength = 6 }: Props) {
  const reduce = useStillness();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  if (reduce) return <span className={className}>{children}</span>;

  function handleMove(event: MouseEvent<HTMLSpanElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  );
}
