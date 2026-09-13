"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Layers, Search, ShieldCheck, TrendingDown, Workflow } from "lucide-react";
import { Section } from "./Section";
import { Metric } from "./Metric";
import { useStillness } from "@/lib/useStillness";
import { capabilities, type Capability } from "@/content/capabilities";

const icons = [Search, Workflow, ShieldCheck, TrendingDown, Layers];

/** True once the viewport is wide enough to lay the deck out in a row. */
function useWideViewport() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return wide;
}

/**
 * Where a card sits before the deck opens. The middle card is the pivot: the
 * others pull toward it, tilt away from it, and drop slightly, which is what
 * makes five rectangles read as a hand of cards rather than a row.
 */
function fanned(i: number, total: number) {
  const fromCentre = i - (total - 1) / 2;
  return {
    x: fromCentre * -128,
    y: Math.abs(fromCentre) * 22,
    rotate: fromCentre * 7,
  };
}

function Card({
  capability,
  index,
  total,
  progress,
  animate,
}: {
  capability: Capability;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const Icon = icons[index % icons.length];
  const rest = fanned(index, total);

  /* Each card interpolates from its fanned position to its grid position.
   * The grid supplies the final layout, so the transform only ever describes
   * the offset from it. */
  const x = useTransform(progress, [0, 1], [rest.x, 0]);
  const y = useTransform(progress, [0, 1], [rest.y, 0]);
  const rotate = useTransform(progress, [0, 1], [rest.rotate, 0]);

  return (
    <motion.article
      style={
        animate
          ? { x, y, rotate, background: `var(--tint-${index + 1})` }
          : { background: `var(--tint-${index + 1})` }
      }
      className="flex min-h-[22rem] flex-col rounded-2xl p-6 lg:min-h-[26rem]"
    >
      <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="text-text" />

      <p className="data mt-7">
        {capability.index} / {capability.label}
      </p>

      <h3 className="font-display mt-2 text-2xl leading-[1.1] text-text lg:text-[1.75rem]">
        {capability.title}
      </h3>

      <ul className="mt-7 space-y-2.5">
        {capability.points.map((point) => (
          <li key={point} className="text-sm leading-snug text-text-2">
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <p className="font-display text-3xl leading-none text-metric">
          <Metric value={capability.metric} />
        </p>
        <p className="label mt-2">{capability.metricLabel}</p>
      </div>
    </motion.article>
  );
}

/**
 * The deck arrives fanned and shuffles itself open as the section scrolls
 * into view. It is scroll-linked rather than timed, so scrolling back up
 * closes the fan again.
 *
 * Below the large breakpoint the cards stack in one column and the fan is
 * switched off entirely: a horizontal fan has nothing to say in a single
 * column, and neither does it under reduced motion.
 */
export function Capabilities() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useStillness();
  const wide = useWideViewport();
  const animate = wide && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.32"],
  });

  return (
    <Section
      id="capabilities"
      tone="band"
      title="What I bring to the table."
      lede="Five capabilities, and the number each one moved."
    >
      <div
        ref={ref}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
      >
        {capabilities.map((capability, i) => (
          <Card
            key={capability.index}
            capability={capability}
            index={i}
            total={capabilities.length}
            progress={scrollYProgress}
            animate={animate}
          />
        ))}
      </div>
    </Section>
  );
}
