export type Capability = {
  index: string;
  /** Short category, shown beside the number. */
  label: string;
  title: string;
  points: string[];
  /** The proof. Rendered in the accent, like every other number on the site. */
  metric: string;
  metricLabel: string;
};

/**
 * What a team gets by hiring him, written as outcomes rather than skills.
 * Every metric is the same figure that appears in the case study it came
 * from, so nothing here is a claim the work below cannot back up.
 *
 * Card 02 is named Guardrails rather than Agents because that is what its
 * mechanisms actually are. Each bullet is something running in a documented
 * system: untrusted-input handling and schema validation in DocChat and
 * Research Agent, refusal behaviour in DocChat, multi-agent validation in the
 * question generation engine. None of it is a general statement about why
 * guardrails matter.
 */
export const capabilities: Capability[] = [
  {
    index: "01",
    label: "Retrieval",
    title: "Grounded answers",
    points: [
      "Hybrid semantic search",
      "Retrieval scoped per user",
      "Citations back to source",
      "Multilingual embeddings",
    ],
    metric: "500+",
    metricLabel: "students served",
  },
  {
    index: "02",
    label: "Guardrails",
    title: "Fails safely",
    points: [
      "Untrusted input, injection-aware",
      "Refusal over invention",
      "Schema-validated output",
      "Multi-agent validation",
    ],
    metric: "90% to near-100%",
    metricLabel: "expert-reviewer acceptance",
  },
  {
    index: "03",
    label: "Reliability",
    title: "Stays up",
    points: [
      "Automatic provider failover",
      "Queue-backed messaging",
      "Token-by-token streaming",
      "Load-tested with QA at 1,000",
    ],
    metric: "1,000",
    metricLabel: "concurrent users, load-tested",
  },
  {
    index: "04",
    label: "Cost",
    title: "Lower model spend",
    points: [
      "Rate limiting",
      "Redis response caching",
      "Per-call cost logging",
      "Right model for the job",
    ],
    metric: "30%+",
    metricLabel: "LLM spend cut, verified on bills",
  },
  {
    index: "05",
    label: "Pipelines",
    title: "Documents made usable",
    points: [
      "PDF and OCR extraction",
      "Chunking with fallbacks",
      "Vector and graph stores",
      "13+ subjects, multilingual",
    ],
    metric: "500+",
    metricLabel: "documents ingested",
  },
];
