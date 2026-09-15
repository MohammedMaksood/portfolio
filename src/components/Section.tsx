import type { ReactNode } from "react";
import { MaskReveal, Reveal } from "./Reveal";

type Props = {
  id: string;
  /** Omit when the section supplies its own <h2 id={`${id}-heading`}>. */
  title?: string;
  lede?: string;
  children: ReactNode;
  /**
   * Sections alternate ground so each one reads as its own surface. This
   * replaces the numbered eyebrow labels: the change in background is what
   * tells a reader a new section has started.
   */
  tone?: "canvas" | "band";
};

export function Section({ id, title, lede, children, tone = "canvas" }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-t border-line ${
        tone === "band" ? "bg-band" : "bg-canvas"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 md:py-24 lg:py-28">
        {title ? (
          <header className="max-w-3xl">
            <h2 id={`${id}-heading`}>
              <MaskReveal className="font-display balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                {title}
              </MaskReveal>
            </h2>
            {lede ? (
              <Reveal
                as="p"
                delay={0.12}
                className="pretty mt-6 max-w-2xl text-base leading-relaxed text-text-2"
              >
                {lede}
              </Reveal>
            ) : null}
          </header>
        ) : null}

        <div className={title ? "mt-12 md:mt-16" : ""}>{children}</div>
      </div>
    </section>
  );
}
