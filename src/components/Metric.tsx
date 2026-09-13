"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useStillness } from "@/lib/useStillness";

/**
 * Matches a value that is a number wearing only symbols, such as "500+",
 * "1,000", "98%+" or "$0". Deliberately strict: anything with words in it
 * ("BM25 + dense", "4 to 7s", "Hours to minutes") is left alone, because
 * counting a fragment of a phrase produces nonsense like "BM0 + dense".
 */
const NUMERIC = /^([$~]?)(\d[\d,]*(?:\.\d+)?)([%+s]*)$/;

/**
 * Counts a metric up once when it enters view. Values with no leading
 * number, such as "4 to 7s" or "Hours to minutes", render unchanged rather
 * than being mangled into a count.
 *
 * The count runs on a motion value rather than React state, so a page with
 * twenty of these does not re-render on every animation frame. The first
 * render always emits the real value so the prerendered HTML and the
 * hydration pass agree.
 */
export function Metric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const still = useStillness();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const match = value.match(NUMERIC);
  const target = match ? Number(match[2].replace(/,/g, "")) : null;
  const grouped = Boolean(match && match[2].includes(","));
  const decimals =
    match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const count = useMotionValue(0);
  const text = useTransform(count, (latest) =>
    latest.toLocaleString("en-US", {
      useGrouping: grouped,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  const animating = mounted && !still && target !== null;

  useEffect(() => {
    if (!animating || !inView || target === null) return;
    const controls = animate(count, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [animating, inView, target, count]);

  if (!animating) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {/* The full value stays available to assistive technology. */}
      <span aria-hidden="true">
        {match![1]}
        <motion.span>{text}</motion.span>
        {match![3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
