"use client";

import { Metric } from "./Metric";
import type { Project } from "@/content/projects";

/**
 * A project as a paper folder: a tinted tab above the card and the folder's
 * back panel showing beneath it, so the card reads as something with a behind
 * rather than a flat rectangle.
 *
 * The front stays deliberately readable. Filing six case studies behind a
 * click already costs a skimming reader most of the numbers in this section,
 * so the folder carries the lead metric and the status without being opened.
 */
export function ProjectFolder({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const lead = project.results[0];
  const tint = `var(--tint-${(index % 6) + 1})`;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open the ${project.title} case study`}
      className="group relative block h-full w-full pt-4 text-left"
    >
      {/* The folder's back panel, peeking out below and to the side. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-1 bottom-[-6px] top-4 rounded-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1"
        style={{ background: tint }}
      />
      {/* The tab. */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-0 h-6 w-28 rounded-t-xl transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:h-7"
        style={{ background: tint }}
      />

      <span className="relative flex h-full min-h-[19rem] flex-col rounded-2xl border border-line bg-surface p-7 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_44px_-18px_rgba(0,0,0,0.6)]">
        <span className="data">{project.index}</span>

        <span className="font-display mt-4 block min-h-[2.5em] text-2xl leading-tight text-text">
          {project.title}
        </span>

        <span className="mt-auto block pt-10">
          <span className="font-display block text-3xl leading-none text-metric">
            <Metric value={lead.value} />
          </span>
          <span className="label mt-2 block">{lead.label}</span>
        </span>

      </span>
    </button>
  );
}
