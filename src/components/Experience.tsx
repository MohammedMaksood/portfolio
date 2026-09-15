"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useStillness } from "@/lib/useStillness";
import { experience, type Milestone, type Role } from "@/content/experience";

/**
 * A node on the spine. It lights as the scroll progress passes its own
 * position in the list, so the rail reads as filling downward rather than
 * every dot appearing at once.
 */
function Node({
  progress,
  threshold,
  hollow = false,
  still,
}: {
  progress: MotionValue<number>;
  threshold: number;
  hollow?: boolean;
  still: boolean;
}) {
  const lit = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);

  return (
    <span
      aria-hidden="true"
      className={`relative mt-[0.45rem] grid size-3 shrink-0 place-items-center rounded-full border ${
        hollow ? "border-line-strong" : "border-line-strong"
      }`}
    >
      <motion.span
        style={{ opacity: still ? 1 : lit }}
        className={`block rounded-full ${
          hollow ? "size-1 bg-text-3" : "size-1.5 bg-text"
        }`}
      />
    </span>
  );
}

function Row({
  children,
  progress,
  threshold,
  hollow,
  still,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  threshold: number;
  hollow?: boolean;
  still: boolean;
}) {
  return (
    <li className="grid grid-cols-[0.75rem_1fr] gap-x-6 sm:gap-x-8">
      <Node progress={progress} threshold={threshold} hollow={hollow} still={still} />
      <Reveal className="min-w-0 pb-10" delay={0.05}>
        {children}
      </Reveal>
    </li>
  );
}

function RoleHeader({ role }: { role: Role }) {
  return (
    <>
      {role.kicker ? <p className="label mb-3">{role.kicker}</p> : null}
      <h3 className="font-display text-3xl leading-none sm:text-4xl">
        {role.company}
      </h3>
      <p className="mt-3 text-sm text-text">{role.position}</p>
      <p className="data mt-2">
        {role.start} to {role.end}
        {role.location ? ` · ${role.location}` : ""}
      </p>
      <p className="pretty mt-5 max-w-2xl text-base leading-relaxed text-text-2">
        {role.summary}
      </p>
    </>
  );
}

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  return (
    <>
      <div className="flex items-baseline gap-3">
        {milestone.step ? <span className="data">{milestone.step}</span> : null}
        <p className="text-base leading-snug text-text sm:text-lg">
          {milestone.text}
        </p>
      </div>
      {milestone.meta ? (
        <p className="pretty mt-2 max-w-xl text-sm leading-relaxed text-text-2">
          {milestone.meta}
        </p>
      ) : null}
    </>
  );
}

/**
 * The career as a single spine: one rail, a node per milestone, and a fill
 * that follows the scroll down the section.
 *
 * Everything is one flat `<ol>` so the rail is continuous and the reading
 * order matches the visual order. Role headers and milestones are rows on the
 * same list rather than separate nested structures.
 */
export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const still = useStillness();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.75"],
  });

  /* Flattened so each row gets a position on the rail. */
  const rows = experience.flatMap((role) => [
    { kind: "role" as const, role },
    ...role.milestones.map((milestone) => ({
      kind: "milestone" as const,
      role,
      milestone,
    })),
    { kind: "stack" as const, role },
  ]);

  return (
    <Section
      id="experience"
      title="Where I have built."
      lede="One platform, four systems, in the order they were built. The numbers behind each one are in the case studies below."
    >
      <div ref={ref} className="relative">
        {/* The rail sits behind the nodes, which are 0.75rem wide, so it runs
         * down their centre line. */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[0.375rem] top-3 w-px -translate-x-1/2 bg-[var(--border)]"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: still ? 1 : scrollYProgress }}
          className="absolute bottom-2 left-[0.375rem] top-3 w-px -translate-x-1/2 origin-top bg-[var(--border-strong)]"
        />

        <ol className="relative [&>li:last-child>*:last-child]:pb-0">
          {rows.map((row, i) => {
            const threshold = rows.length > 1 ? i / (rows.length - 1) : 0;
            const hollow = row.role.compact;

            if (row.kind === "role") {
              return (
                <Row
                  key={`${row.role.id}-role`}
                  progress={scrollYProgress}
                  threshold={threshold}
                  hollow={hollow}
                  still={still}
                >
                  <RoleHeader role={row.role} />
                </Row>
              );
            }

            if (row.kind === "milestone") {
              return (
                <Row
                  key={`${row.role.id}-${row.milestone.text}`}
                  progress={scrollYProgress}
                  threshold={threshold}
                  hollow={hollow}
                  still={still}
                >
                  <MilestoneRow milestone={row.milestone} />
                </Row>
              );
            }

            return (
              <Row
                key={`${row.role.id}-stack`}
                progress={scrollYProgress}
                threshold={threshold}
                hollow
                still={still}
              >
                <p className="label">{row.role.stackLabel ?? "Stack"}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {row.role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="data rounded-full border border-line px-2.5 py-1"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Row>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
