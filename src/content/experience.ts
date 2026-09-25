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
      "I build the AI layer of an ed-tech platform. Three systems I designed and shipped end to end, in this order, plus the computer vision module inside a fourth.",
    milestones: [
      {
        step: "01",
        text: "Ingestion pipeline",
        meta: "Course PDFs, typeset and scanned, into multilingual vectors and a knowledge graph. Everything after this reads from it.",
      },
      {
        step: "02",
        text: "Tutoring chatbot",
        meta: "The first system built on that store. Retrieval scoped to a student's own course, so answers stay on syllabus, streamed token by token so the answer starts appearing immediately.",
      },
      {
        step: "03",
        text: "Question generation",
        meta: "Same store, different job. Hybrid retrieval drafts exam questions, and a second pass of agents decides which ones are good enough to keep.",
      },
      {
        step: "04",
        text: "Bubble-sheet OMR module",
        meta: "Closed the loop. The computer vision piece inside a grading pipeline the team built: reading a marked bubble is deterministic, so no model call belongs in it.",
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
      "Worked on the question-generation MVP: designing its system prompts, and running the vector database comparison that picked its retrieval layer. Qdrant won, and is the store every system I built afterwards reads from.",
    milestones: [],
    kicker: "Before EdgeUp",
    stack: ["Weaviate", "Qdrant"],
    stackLabel: "Compared for the retrieval layer",
    compact: true,
  },
];
