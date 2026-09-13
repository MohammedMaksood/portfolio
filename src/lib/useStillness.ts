"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * True when the visitor has asked for reduced motion, but only once
 * hydration is done.
 *
 * `useReducedMotion` reads the media query during render, so on the client
 * it can disagree with the prerendered HTML and produce a hydration
 * mismatch. Gating on mount keeps the first client render identical to the
 * server's, then settles to the real preference.
 */
export function useStillness() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(reduce);
}
