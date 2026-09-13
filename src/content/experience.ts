export type Milestone = {
  /** Position in the build order, shown on the spine. */
  step?: string;
  /** What was built. */
  text: string;
  /** What it did, and what it made possible next. */
  meta?: string;
};

export type Role = {
  id: string;
  company: string;
  position: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  milestones: Milestone[];
  stack: string[];
  /**
   * What the list underneath actually is. Defaults to "Stack" for work he
   * built with. The internship evaluated tools rather than shipping with
   * them, so labelling those four a stack would claim delivery work that did
   * not happen.
   */
  stackLabel?: string;
  /**
   * Renders as a single header row with no milestones. The internship is
   * genuinely smaller than the current role, so it is drawn smaller rather
   * than padded out to match.
   */
  compact?: boolean;
  /** Small marker above the company name, for anything before the current role. */
  kicker?: string;
};

export const experience: Role[] = [
  {
    id: "edgeup",
    company: "EdgeUp",
    position: "AI Engineer",
    start: "May 2025",
    end: "Present",
    location: "Chennai, India",
    summary:
      "I own the AI layer of an ed-tech platform. Four systems, built in this order, each one making the next possible.",
    milestones: [
      {
        step: "01",
        text: "Ingestion pipeline",
        meta: "Course PDFs, typeset and scanned, into multilingual vectors and a knowledge graph. Everything after this reads from it.",
      },
      {
        step: "02",
        text: "Tutoring chatbot",
        meta: "The first system built on that store. Retrieval scoped to a student's own course, so answers stay on syllabus.",
      },
      {
        step: "03",
        text: "Question generation",
        meta: "Same store, different job. Hybrid retrieval drafts exam questions, and a second pass of agents decides which ones are good enough to keep.",
      },
      {
        step: "04",
        text: "Grading and analytics",
        meta: "Closed the loop. Material in, questions out, scripts scored, and the results fed back as student analytics.",
      },
    ],
    stack: [
      "Python",
      "Django",
      "LangChain",
      "Qdrant",
      "Neo4j",
      "Redis",
      "Celery",
      "Kafka/Redpanda",
      "Socket.IO",
      "OpenAI",
      "Gemini",
      "AWS S3/CloudFront",
    ],
  },
  {
    id: "zaryah",
    company: "Zaryah Angels",
    position: "Junior Developer, Intern",
    start: "Jan 2025",
    end: "Mar 2025",
    location: "Chennai, India",
    summary:
      "Evaluated the emerging class of AI coding assistants and agentic developer tools against real development tasks, assessing where they genuinely accelerate work and where they do not.",
    milestones: [],
    kicker: "Before EdgeUp",
    stack: ["Claude Code", "Cursor", "GitHub Copilot", "Windsurf"],
    stackLabel: "Tools evaluated",
    compact: true,
  },
];
