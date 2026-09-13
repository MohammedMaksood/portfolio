"use client";

import { Metric } from "./Metric";
import type { Result } from "@/content/projects";

/**
 * The framed panel beside each project.
 *
 * These systems are covered by a non-disclosure agreement, so nothing about
 * how they are built appears here. What can be shown is what they achieved,
 * and the numbers are the most persuasive thing on the page regardless: the
 * lead figure is set large, the rest read as a measured list underneath.
 */
export function ResultsPanel({ results }: { results: Result[] }) {
  const [lead, ...rest] = results;

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-[var(--border-strong)]" />
          <span className="size-2 rounded-full bg-[var(--border)]" />
          <span className="size-2 rounded-full bg-[var(--border)]" />
        </span>
        <p className="data">measured outcomes</p>
      </header>

      <dl className="p-6 sm:p-8">
        <div>
          <dd className="font-display text-[clamp(3rem,7vw,5rem)] leading-[0.9] text-metric">
            <Metric value={lead.value} />
          </dd>
          <dt className="mt-3 text-sm text-text">{lead.label}</dt>
        </div>

        {rest.map((result) => (
          <div
            key={result.label}
            className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-5"
          >
            <dt className="label">{result.label}</dt>
            <dd className="font-display text-2xl leading-none text-metric">
              <Metric value={result.value} />
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
