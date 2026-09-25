export const siteUrl = "https://maksood-alam-portfolio.vercel.app";

export const profile = {
  name: "Mohammed Maksood Alam",
  /** What he actually goes by. Never derive this from `name`: splitting on
   * the first word gives "Mohammed", which is not the name he uses. */
  shortName: "Maksood",
  formalName: "Mohammed Maksood Alam M",
  title: "AI Engineer",
  location: "Chennai, India",
  /**
   * The chip's second line, cycled one at a time. Keep each under about 40
   * characters so it does not truncate, and keep every one of them true.
   * The first is the canonical one: it is what screen readers are given and
   * what shows under reduced motion.
   */
  statusLines: [
    "Building RAG systems in production",
    "Retrieval, agents, LLM orchestration",
    "Grounded answers, measurable outcomes",
    "Open to AI Engineer roles",
  ],

  /** Hero statement. Large, editorial, set in the display serif. */
  statement:
    "I design and ship production GenAI systems: RAG pipelines, hybrid retrieval, and multi-agent orchestration that serve real users at scale.",

  /** One-line meta description used for SEO and the footer. */
  tagline:
    "AI Engineer building production RAG pipelines, hybrid retrieval, and multi-agent LLM systems.",


  links: {
    email: "maksood.alam1902@gmail.com",
    github: "https://github.com/MohammedMaksood",
    linkedin: "https://linkedin.com/in/mohammed-maksood-alam",
    resume: "/Mohammed-Maksood-Alam-AI-Engineer-Resume.pdf",
  },
} as const;
