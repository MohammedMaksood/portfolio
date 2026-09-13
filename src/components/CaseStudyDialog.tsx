"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { ResultsPanel } from "./ResultsPanel";
import { useStillness } from "@/lib/useStillness";
import type { Project } from "@/content/projects";

function Links({ project }: { project: Project }) {
  if (project.links.length === 0) {
    if (!project.confidential) return null;
    return (
      <p className="label inline-flex items-center gap-2">
        <Lock size={12} strokeWidth={1.5} aria-hidden="true" />
        Proprietary, so the source is not public
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {project.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-text-2 transition-colors duration-300 hover:border-line-strong hover:text-text"
          >
            {link.label}
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">, {project.title}, opens in a new tab</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Everything that used to sit inline. The architecture now lives in the panel
 * above, so it is not repeated here.
 */
function Narrative({ project }: { project: Project }) {
  const blocks = [
    { label: "Problem", body: project.problem },
    { label: "Approach", body: project.approach },
  ].filter((block) => Boolean(block.body));

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className={project.decisions ? "lg:col-span-7" : "lg:col-span-12"}>
        {blocks.map((block) => (
          <div key={block.label} className="mb-9 last:mb-0">
            <p className="label">{block.label}</p>
            <p className="pretty mt-3 max-w-3xl text-base leading-[1.75] text-text-2">
              {block.body}
            </p>
          </div>
        ))}

      </div>

      {project.decisions ? (
        <div className="lg:col-span-5">
          <p className="label">Engineering decisions</p>
          <ul className="mt-4 space-y-5">
            {project.decisions.map((decision) => (
              <li key={decision.title} className="border-l border-line pl-4">
                <p className="text-sm leading-snug text-text">{decision.title}</p>
                <p className="pretty mt-1.5 text-sm leading-relaxed text-text-2">
                  {decision.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.challenge && project.solution ? (
        <div className="rounded-xl border border-line bg-surface p-6 lg:col-span-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="label">Hardest part</p>
              <p className="pretty mt-3 text-base leading-[1.75] text-text">
                {project.challenge}
              </p>
            </div>
            <div>
              <p className="label">How it was solved</p>
              <p className="pretty mt-3 text-base leading-[1.75] text-text-2">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="lg:col-span-12">
        <p className="label">Built with</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="data rounded-full border border-line px-3 py-1.5"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The case study as a modal.
 *
 * A dialog has to earn its keyboard behaviour or it traps people rather than
 * focus: Tab cycles inside the panel, Escape closes, the page behind cannot
 * scroll, and focus returns to the folder that opened it. The backdrop is
 * clickable because a reader who opened the wrong folder should not have to
 * hunt for the close button.
 */
export function CaseStudyDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduce = useStillness();

  /* Send focus in, and put it back where it came from on the way out. */
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => previous?.focus?.();
  }, []);

  /* Hold the page still behind the dialog, compensating for the scrollbar so
   * the layout does not jump as it disappears. */
  useEffect(() => {
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, []);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!items || items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.99 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center p-4 sm:p-6 lg:p-10"
      onKeyDown={onKeyDown}
    >
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        {...motionProps}
        className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-band shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      >
        <header className="flex shrink-0 flex-wrap items-start justify-between gap-6 border-b border-line bg-band px-6 py-6 sm:px-10">
          <div className="min-w-0">
            <p className="data">
              {project.index} · {project.context} · {project.status}
            </p>
            <h3
              id="case-study-title"
              className="font-display mt-2 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.05]"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-text-2 transition-colors duration-300 hover:border-line-strong hover:text-text"
          >
            <X size={14} strokeWidth={1.75} aria-hidden="true" />
            Close
            <span className="sr-only">the {project.title} case study</span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="pretty text-lg leading-relaxed text-text-2">
                {project.summary}
              </p>
              <div className="mt-8">
                <Links project={project} />
              </div>
            </div>
            <div className="lg:col-span-5">
              <ResultsPanel results={project.results} />
            </div>
          </div>

          <div className="mt-16">
            <Narrative project={project} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
