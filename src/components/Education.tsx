import { Section } from "./Section";
import { PlaceReveal, Reveal } from "./Reveal";
import { certifications, degree } from "@/content/education";

/**
 * A certificate seal, drawn rather than imported. IBM's mark has been pulled
 * from every icon set, and mixing two real logos with one lettermark would
 * look like an accident, so all three cards carry the same glyph in different
 * tints instead.
 */
function Seal({ tint }: { tint: string }) {
  const ticks = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

  return (
    <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true" style={{ color: tint }}>
      <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="6.5" fill="currentColor" opacity="0.35" />
      {ticks.map((angle) => (
        <line
          key={angle}
          x1="20"
          y1="4.5"
          x2="20"
          y2="7.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
    </svg>
  );
}

export function Education() {
  return (
    <Section id="education" title="Background.">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-7">
        {/* Each group is named. Without a label the three certificate cards
         * are just three cards, and a reader has to guess what they are. */}
        <Reveal className="flex flex-col lg:col-span-5">
          <h3 className="label mb-4">Degree</h3>
          <article className="group relative flex min-h-[15rem] flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-500 ease-out hover:-translate-y-1">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1"
            style={{ background: "var(--tint-1)" }}
          />
          <div>
            <p className="font-display text-5xl leading-none text-text">
              {degree.abbreviation}
            </p>
            <h3 className="pretty mt-5 text-lg leading-snug text-text">
              {degree.qualification}
            </h3>
          </div>
          <div className="mt-10">
            <p className="text-sm text-text-2">{degree.institution}</p>
            <p className="data mt-1">{degree.year}</p>
          </div>
          </article>
        </Reveal>

        <Reveal className="flex flex-col lg:col-span-7" delay={0.12}>
          <h3 className="label mb-4">
            Certifications
            <span className="sr-only">, {certifications.length} of them</span>
          </h3>
          <div className="grid flex-1 gap-6 sm:grid-cols-3 lg:gap-7">
          {certifications.map((cert, i) => (
            <PlaceReveal
              key={cert.name}
              as="div"
              className="h-full"
              delay={0.18 + i * 0.08}
              rotate={i % 2 === 0 ? -1.4 : 1.4}
            >
            <article
              className="group relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-500 ease-out hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `var(--tint-${i + 2})` }}
              />
              <div className="transition-transform duration-500 ease-out group-hover:rotate-[18deg]">
                <Seal tint={`var(--tint-${i + 2})`} />
              </div>
              <div className="mt-10">
                <h3 className="pretty min-h-[2.6em] text-[0.95rem] leading-snug text-text">
                  {cert.name}
                </h3>
                <p className="data mt-2">{cert.issuer}</p>
              </div>
            </article>
            </PlaceReveal>
          ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
