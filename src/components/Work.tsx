"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Section } from "./Section";
import { ProjectFolder } from "./ProjectFolder";
import { PlaceReveal } from "./Reveal";
import { CaseStudyDialog } from "./CaseStudyDialog";
import { projects } from "@/content/projects";

export function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((project) => project.slug === openSlug) ?? null;

  return (
    <Section
      id="work"
      tone="band"
      title="How each one was built."
      lede="Four of these run inside EdgeUp. Two are public, with the source and a live demo you can open."
    >
      {/* The grid stays put behind the dialog, so closing it returns the
        * reader to exactly the folder they opened. */}
      <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project, i) => (
          <PlaceReveal
            key={project.slug}
            delay={i * 0.07}
            rotate={i % 2 === 0 ? -1.6 : 1.6}
          >
            <ProjectFolder
              project={project}
              index={i}
              onOpen={() => setOpenSlug(project.slug)}
            />
          </PlaceReveal>
        ))}
      </ul>

      <AnimatePresence>
        {open ? (
          <CaseStudyDialog
            key={open.slug}
            project={open}
            onClose={() => setOpenSlug(null)}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
