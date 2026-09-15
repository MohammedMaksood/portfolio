import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { MaskReveal, Reveal } from "./Reveal";
import { profile } from "@/content/profile";

const channels = [
  {
    label: "Email",
    value: profile.links.email,
    href: `mailto:${profile.links.email}`,
    Icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/mohammed-maksood-alam",
    href: profile.links.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "MohammedMaksood",
    href: profile.links.github,
    Icon: Github,
    external: true,
  },
  {
    label: "Résumé",
    value: "PDF, one page",
    href: profile.links.resume,
    Icon: FileText,
    external: false,
  },
];

/**
 * The page closes by inverting canvas and text. It is the loudest surface
 * on the site and costs nothing from the accent budget, which stays
 * reserved for verifiable numbers.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="inverted bg-invert-bg text-invert-text"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 md:py-28">
        <h2 id="contact-heading" className="max-w-4xl">
          <MaskReveal className="font-display balance text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.98]">
            Have an interesting problem?
          </MaskReveal>
          <MaskReveal
            delay={0.1}
            className="font-display balance text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.98] text-invert-text-2"
          >
            Let&rsquo;s build something intelligent.
          </MaskReveal>
        </h2>

        <Reveal as="p" delay={0.24} className="pretty mt-9 max-w-xl text-base leading-relaxed text-invert-text-2 sm:text-lg">
          I am open to AI Engineer roles, in {profile.location} and remote. If
          you are building retrieval systems, agents, or anything where a model
          has to be right rather than merely fluent, I would like to hear about
          it.
        </Reveal>

        <Reveal delay={0.32} className="mt-12">
          <Magnetic strength={8}>
            <a
              href={`mailto:${profile.links.email}`}
              className="inline-flex items-center rounded-full bg-invert-text px-7 py-4 text-sm font-medium text-invert-bg transition-opacity duration-300 hover:opacity-90 sm:text-base"
            >
              Start a conversation
            </a>
          </Magnetic>
        </Reveal>

        <ul className="mt-20 grid border-t border-[var(--invert-border)] sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, value, href, Icon, external }) => (
            <li key={label} className="border-b border-[var(--invert-border)]">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                download={label === "Résumé" ? true : undefined}
                className="group flex h-full flex-col justify-between gap-8 py-7 pr-6 sm:pr-8"
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-invert-text-2 transition-colors duration-300 group-hover:text-invert-text"
                  />
                  <span className="text-[0.8125rem] font-medium text-invert-text-2">
                    {label}
                  </span>
                </span>
                <span className="break-all text-sm sm:text-base">{value}</span>
                {external ? (
                  <span className="sr-only">Opens in a new tab</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
