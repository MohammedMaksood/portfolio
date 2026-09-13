"use client";

import { motion } from "motion/react";
import { useStillness } from "@/lib/useStillness";
import { notes, type Note } from "@/content/notes";

/**
 * Where each note is pinned, and at what angle. Kept here rather than in the
 * content file because it is layout, not copy.
 *
 * The cells are assigned explicitly rather than left to column flow, which
 * balances by height and would move the notes around as their text changes.
 * Filling column one then column two puts the two paper notes on opposite
 * corners and the two dark cards on the other pair.
 *
 *     col 1        col 2
 *   ┌──────────┬──────────┐
 *   │ 1 sticky │ 3 dark   │
 *   ├──────────┼──────────┤
 *   │ 2 dark   │ 4 sticky │
 *   └──────────┴──────────┘
 */
const arrangement = [
  { rotate: -2.6, cell: "sm:col-start-1 sm:row-start-1", offset: "sm:mt-0" },
  { rotate: 1.9, cell: "sm:col-start-1 sm:row-start-2", offset: "sm:mt-5" },
  { rotate: -1.6, cell: "sm:col-start-2 sm:row-start-1", offset: "sm:mt-10" },
  { rotate: 2.3, cell: "sm:col-start-2 sm:row-start-2", offset: "sm:mt-6" },
];

function Sticky({ note }: { note: Note }) {
  return (
    <div className="sticky-wrap">
      {/* Squarish, like a real pad sheet, so short notes leave paper showing
       * rather than shrink-wrapping to the text. */}
      <div className="sticky-paper min-h-[12.5rem] px-5 pb-8 pt-[1.15rem]">
        <p className="font-hand text-[1.45rem] leading-[1.55rem]">{note.text}</p>
      </div>
      <span aria-hidden="true" className="sticky-fold" />
    </div>
  );
}

function Callout({ note }: { note: Note }) {
  return (
    <div className="rounded-xl bg-invert-bg px-5 py-4 text-invert-text shadow-[0_12px_28px_-14px_rgba(0,0,0,0.55)]">
      <p className="pretty text-[0.8125rem] leading-[1.5]">{note.text}</p>
    </div>
  );
}

/**
 * The hero pinboard: notes pinned at slight angles, standing in for the
 * photo collage this layout usually carries. It arrives as part of the hero's
 * load sequence and then holds still.
 */
export function HeroNotes() {
  const reduce = useStillness();

  return (
    <div
      aria-label="Notes on how I build"
      role="group"
      className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:gap-6"
    >
      {notes.map((note, i) => {
        const { rotate, cell, offset } = arrangement[i % arrangement.length];
        return (
          <motion.div
            key={note.id}
            className={`${cell} ${offset}`}
            style={{ rotate }}
            initial={reduce ? false : { opacity: 0, y: 18, rotate: rotate * 2.2 }}
            animate={{ opacity: 1, y: 0, rotate }}
            transition={{
              duration: 0.7,
              delay: reduce ? 0 : 0.5 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reduce ? undefined : { rotate: 0, y: -5 }}
          >
            {note.kind === "sticky" ? (
              <Sticky note={note} />
            ) : (
              <Callout note={note} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
