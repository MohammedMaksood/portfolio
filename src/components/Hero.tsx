"use client";

import { motion } from "motion/react";
import { HeroNotes } from "./HeroNotes";
import { ToolStrip } from "./ToolStrip";
import { Magnetic } from "./Magnetic";
import { useStillness } from "@/lib/useStillness";
import { profile } from "@/content/profile";

const statementWords = profile.statement.split(" ");
const leadCount = `${profile.statement.split(": ")[0]}:`.split(" ").length;

/**
 * The page's single orchestrated moment: the left column rises, then the
 * pinboard on the right pins itself up note by note. Everything below the
 * hero stays still until a reader acts on it.
 */
export function Hero() {
  const reduce = useStillness();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-canvas pb-24 pt-32"
    >
      <div aria-hidden="true" className="dot-field mask-fade absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <motion.h1
            {...rise(0.05)}
            className="font-display balance text-[clamp(2.5rem,6.6vw,5rem)] leading-[0.96]"
          >
            {profile.name}
          </motion.h1>

          <motion.p {...rise(0.14)} className="mt-6 text-base text-text-2">
            {profile.title} in {profile.location}
          </motion.p>

          <motion.div
            {...rise(0.2)}
            className="mt-8 h-px w-full max-w-md bg-[var(--border)]"
          />

          <p className="pretty mt-8 max-w-xl text-lg leading-relaxed text-text-2 sm:text-xl">
            {statementWords.map((word, i) => (
              <span key={`${word}-${i}`}>
                <motion.span
                  className={`inline-block ${i < leadCount ? "text-text" : ""}`}
                  initial={reduce ? false : { opacity: 0, y: "0.4em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: reduce ? 0 : 0.3 + i * 0.028,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
                {i < statementWords.length - 1 ? " " : null}
              </span>
            ))}
          </p>

          <motion.div
            {...rise(0.46)}
            className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center rounded-full bg-text px-7 py-3.5 text-sm font-medium text-canvas transition-opacity duration-300 hover:opacity-90"
              >
                View selected work
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={profile.links.resume}
                download
                className="inline-flex items-center rounded-full border border-line px-7 py-3.5 text-sm text-text-2 transition-colors duration-300 hover:border-line-strong hover:text-text"
              >
                Download résumé
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <HeroNotes />
        </div>
      </div>

      {/* Closes the hero: what the systems above are actually built with. */}
      <motion.div
        {...rise(0.95)}
        className="relative mt-20 w-full lg:mt-28"
      >
        <ToolStrip />
      </motion.div>
    </section>
  );
}
