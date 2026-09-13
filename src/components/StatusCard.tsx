"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { useStillness } from "@/lib/useStillness";
import { profile } from "@/content/profile";

const channels = [
  { label: "Email", href: `mailto:${profile.links.email}`, Icon: Mail, external: false },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: Linkedin, external: true },
  { label: "GitHub", href: profile.links.github, Icon: Github, external: true },
  { label: "Résumé", href: profile.links.resume, Icon: Download, external: false },
];

/** Chennai wall-clock time, refreshed on the minute. */
function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/**
 * How long each status line holds before it swaps, in milliseconds, and how
 * long the fade between them takes, in seconds. Raise HOLD to slow the
 * rotation down; a full cycle is roughly (HOLD + 2 x FADE) per line.
 */
const HOLD = 6000;
const FADE = 0.45;

/**
 * Cycles the status lines, fading one out before the next fades in.
 *
 * It is `aria-hidden` and the chip carries a stable `aria-label` instead:
 * text that rewrites itself every few seconds inside a button would keep
 * changing that button's accessible name. Rotation pauses while the card is
 * open, so the line holds still while someone is reading it, and under
 * reduced motion it never rotates at all.
 */
function RotatingStatus({ paused, still }: { paused: boolean; still: boolean }) {
  const lines = profile.statusLines;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (still || paused || lines.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, HOLD);
    return () => clearInterval(id);
  }, [still, paused, lines.length]);

  if (still) {
    return (
      <span className="block truncate text-[0.6875rem] leading-[1.3] text-invert-text-2">
        {lines[0]}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="relative block h-[0.9rem] overflow-hidden text-[0.6875rem] leading-[1.3] text-invert-text-2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: FADE, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 block truncate"
        >
          {lines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * A floating identity chip pinned to the top centre of the viewport.
 *
 * It opens on hover, which is the interaction the design calls for. Hover
 * alone would strand keyboard and touch users, so focus opens it too and a
 * tap toggles it; `open` is simply whether any of those three is currently
 * true.
 *
 * Drawn in the inverted palette so it reads as an object above the page
 * rather than a panel cut into it: dark on the light theme, light on the
 * dark one.
 */
export function StatusCard() {
  const [inHero, setInHero] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useStillness();
  const time = useLocalTime();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const open = hovered || focused || tapped;

  useEffect(() => setMounted(true), []);

  /* The chip belongs to the hero. Once the hero has scrolled away the page
   * has its own headings to orient by, and a pinned card over every section
   * is just something permanently in the way. */
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInHero(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* Collapse on the way out, so it is not mid-open when it returns. */
  useEffect(() => {
    if (!inHero) {
      setHovered(false);
      setFocused(false);
      setTapped(false);
    }
  }, [inHero]);

  function closeAll() {
    setHovered(false);
    setFocused(false);
    setTapped(false);
  }

  /* Escape closes and hands focus back; an outside tap closes a pinned card. */
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      closeAll();
      toggleRef.current?.focus();
    }
    function onPointer(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      setTapped(false);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const spring = { type: "spring" as const, stiffness: 320, damping: 30, mass: 0.7 };

  return (
    /* The wrapper does the centring so the card is free to animate on the y
     * axis without fighting a transform. */
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-6">
      <AnimatePresence>
        {inHero ? (
      <motion.div
        key="status-card"
        ref={rootRef}
        initial={reduce || !mounted ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setFocused(false);
          }
        }}
        className="inverted pointer-events-auto w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-[1.35rem] bg-invert-bg text-invert-text shadow-[0_8px_30px_-10px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_16px_44px_-12px_rgba(0,0,0,0.55)]"
      >
        <div role="region" aria-label="Contact and availability">
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setTapped((v) => !v)}
            aria-expanded={open}
            aria-controls="status-card-links"
            aria-label={`${profile.shortName}, ${profile.title} in ${profile.location}. ${profile.statusLines[0]}. ${open ? "Hide" : "Show"} contact links.`}
            className="flex w-full items-center gap-4 px-3.5 py-2 text-left"
          >
            <span aria-hidden="true" className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                <span className="text-[0.8125rem] font-medium leading-[1.25]">
                  {profile.shortName}
                </span>
                {/* A data readout, so mono and a field separator are doing
                 * real work rather than decorating a heading. */}
                <span className="font-mono text-[0.65rem] leading-[1.25] tracking-tight text-invert-text-2">
                  {time ? `Chennai · ${time} IST` : "Chennai"}
                </span>
              </span>
              <RotatingStatus paused={open} still={reduce} />
            </span>

            <motion.span
              aria-hidden="true"
              animate={{ rotate: open ? 180 : 0 }}
              transition={reduce ? { duration: 0 } : spring}
              className="shrink-0 text-invert-text-2"
            >
              <ChevronDown size={14} strokeWidth={2} />
            </motion.span>

          </button>

          <motion.div
            id="status-card-links"
            initial={false}
            animate={{ height: open ? "auto" : 0 }}
            transition={reduce ? { duration: 0 } : spring}
            className="overflow-hidden"
            /* Keeps collapsed links out of the tab order and away from
             * screen readers without animating `display`. */
            inert={!open}
          >
            <ul className="flex gap-1.5 border-t border-[var(--invert-border)] px-2.5 py-2.5">
              {channels.map(({ label, href, Icon, external }, i) => (
                <motion.li
                  key={label}
                  initial={false}
                  animate={
                    open
                      ? { opacity: 1, y: 0 }
                      : { opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.28, delay: open ? 0.05 + i * 0.03 : 0 }
                  }
                  className="flex-1"
                >
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    download={label === "Résumé" ? true : undefined}
                    title={label}
                    className="flex h-9 items-center justify-center rounded-[0.8rem] bg-invert-surface text-invert-text-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-invert-text"
                  >
                    <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    <span className="sr-only">
                      {label}
                      {external ? ", opens in a new tab" : ""}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
