"use client";

import { useStillness } from "@/lib/useStillness";
import { tools, type Tool } from "@/content/tools";

function Mark({ tool }: { tool: Tool }) {
  return (
    <li className="group relative shrink-0">
      <span className="sr-only">{tool.name}</span>

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-[1.35rem] fill-current text-text-3 transition-colors duration-300 group-hover:text-text"
      >
        <path d={tool.path} />
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-invert-bg px-2 py-1 text-[0.6875rem] text-invert-text opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {tool.name}
      </span>
    </li>
  );
}

/**
 * The tools the systems on this page are built with, scrolling slowly left.
 *
 * The track carries the list twice: the first copy is the real one, the
 * second is `aria-hidden` so a screen reader reads twenty-eight tools rather
 * than fifty-six. Hovering anywhere pauses the whole track, which is what
 * makes the per-mark labels usable.
 *
 * Under reduced motion it is not a marquee at all: it becomes a static
 * wrapped row. That is deliberate rather than a slowed-down animation, since
 * an animation stopped mid-transform would simply sit at the wrong offset.
 */
export function ToolStrip() {
  const still = useStillness();

  if (still) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
          {tools.map((tool) => (
            <Mark key={tool.name} tool={tool} />
          ))}
        </ul>
      </div>
    );
  }

  /* The track is clipped horizontally, which also clips anything drawn above
   * the row, so the top padding gives the hover labels room to appear inside
   * that clip rather than off the edge of it. */
  return (
    <div className="marquee marquee-mask relative overflow-hidden pb-1 pt-12">
      <div className="marquee-track">
        <ul className="flex shrink-0 items-center gap-x-12 pr-12 sm:gap-x-14 sm:pr-14">
          {tools.map((tool) => (
            <Mark key={tool.name} tool={tool} />
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="flex shrink-0 items-center gap-x-12 pr-12 sm:gap-x-14 sm:pr-14"
        >
          {tools.map((tool) => (
            <Mark key={`${tool.name}-copy`} tool={tool} />
          ))}
        </ul>
      </div>
    </div>
  );
}
