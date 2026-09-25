export type Result = { value: string; label: string };

export type ProjectLink = {
  kind: "demo" | "code" | "docs";
  label: string;
  href: string;
};

/**
 * No architecture, component topology or implementation detail is stored
 * here. The EdgeUp work is covered by a non-disclosure agreement, so the
 * shape of those systems is deliberately absent from the repo rather than
 * merely hidden from the page.
 */
export type Project = {
  slug: string;
  index: string;
  title: string;
  context: string;
  /** One line a recruiter can read in two seconds. */
  summary: string;
  /** Shown as a small pill beside the title. Must stay literally true. */
  status: string;
  year: string;
  featured?: boolean;
  problem: string;
  /**
   * Absent on the EdgeUp systems. Those are covered by a non-disclosure
   * agreement, so how they are built is not in this repo at all rather than
   * merely hidden from the page.
   */
  approach?: string;
  decisions?: { title: string; body: string }[];
  challenge?: string;
  solution?: string;
  results: Result[];
  stack: string[];
  links: ProjectLink[];
  /** Set when the work is proprietary and has no public artefact. */
  confidential?: boolean;
};

export const projects: Project[] = [
  {
    slug: "tutoring-chatbot",
    index: "01",
    title: "AI Tutoring Chatbot",
    context: "EdgeUp",
    summary:
      "A curriculum-grounded RAG tutor over course books and past papers, serving 500+ students, with streaming responses and automatic failover between model providers.",
    status: "In production",
    year: "2025",
    featured: true,
    confidential: true,
    problem:
      "Students working through course material get stuck at the exact moment a human tutor is unavailable. A general-purpose chatbot is worse than nothing here: it answers fluently from the open internet rather than from the syllabus the student is actually being examined on, so it is confidently off-curriculum. The system had to answer from course material only, fast enough to feel conversational, and stay up during a live class when hundreds of students arrive at once.",
    results: [
      { value: "500+", label: "Students served" },
      { value: "4 to 7s", label: "Response time, down from 10s" },
      { value: "1,000", label: "Concurrent users, load-tested" },
      { value: "2", label: "Providers, automatic failover" },
    ],
    stack: [
      "Python",
      "Django",
      "LangChain",
      "Socket.IO",
      "Kafka/Redpanda",
      "Qdrant",
      "Redis",
      "Celery",
      "OpenAI GPT-4o-mini",
      "Gemini 2.5 Flash",
    ],
    links: [],
  },
  {
    slug: "question-generation",
    index: "02",
    title: "Intelligent Question Generation Engine",
    context: "EdgeUp",
    summary:
      "A hybrid-retrieval engine generating thousands of MCQs across 22 courses, with a multi-agent validation pipeline that lifted expert-reviewer acceptance from 90% to near-100%.",
    status: "In production",
    year: "2025",
    confidential: true,
    problem:
      "Writing exam questions by hand does not scale to 22 courses and competitive exams including UPSC, TNPSC, SSC, Banking, and RRB. Asking a model to generate them directly does scale, but produces questions that are subtly wrong, off-syllabus, or duplicated, and a bad question in an exam bank is worse than a missing one.",
    results: [
      { value: "90% to near-100%", label: "Expert-reviewer acceptance" },
      { value: "30%+", label: "LLM spend cut, verified on bills" },
      { value: "22", label: "Courses covered" },
      { value: "1,000s", label: "MCQs generated" },
    ],
    stack: [
      "Python",
      "Django",
      "Gemini 2.5 Pro",
      "Qdrant",
      "Neo4j",
      "Redis",
      "Sentence Transformers",
      "IndicBERT",
    ],
    links: [],
  },
  {
    slug: "exam-grading",
    index: "03",
    title: "Bubble-Sheet OMR Module",
    context: "EdgeUp",
    summary:
      "The OpenCV module that reads bubble-sheet answers off scanned exam scripts, feeding a grading pipeline the team built that cut turnaround from hours to minutes.",
    status: "In production",
    year: "2025",
    confidential: true,
    problem:
      "Marking bubble sheets by hand takes hours per batch, and the delay is not administrative: students lose the feedback loop while the material is still fresh. Reading a marked bubble is a solved computer vision problem, so the part worth getting right was accuracy on real scans, where paper is skewed, marks are faint and the odd sheet is photographed rather than scanned.",
    results: [
      { value: "Hours to minutes", label: "Grading turnaround, team pipeline" },
      { value: "OpenCV", label: "Deterministic, no model call" },
    ],
    stack: ["Python", "OpenCV", "Gemini", "Celery Beat", "AWS S3/CloudFront"],
    links: [],
  },
  {
    slug: "ingestion-pipeline",
    index: "04",
    title: "PDF Vectorization and Knowledge Ingestion",
    context: "EdgeUp",
    summary:
      "The retrieval substrate underneath every other system: 500+ documents across 13+ subjects turned into multilingual vectors and Neo4j knowledge graphs.",
    status: "In production",
    year: "2025",
    confidential: true,
    problem:
      "Every downstream AI feature, the tutor, the question generator, the analytics, is only as good as what it can retrieve. Course material arrives as PDFs of wildly varying quality across 13+ subjects, some digitally typeset and some scanned, and much of it is not in English. Content that fails to extract cleanly simply becomes invisible to every system built on top of it.",
    results: [
      { value: "500+", label: "Documents ingested" },
      { value: "13+", label: "Subjects covered" },
      { value: "Multilingual", label: "IndicBERT embeddings" },
    ],
    stack: [
      "Python",
      "Django",
      "PyMuPDF",
      "Tesseract OCR",
      "IndicBERT",
      "Qdrant",
      "Neo4j",
      "Gemini 2.5 Flash",
      "Gradio",
    ],
    links: [],
  },
  {
    slug: "docchat",
    index: "05",
    title: "DocChat",
    context: "Open source",
    summary:
      "Advanced RAG over your own documents: hybrid BM25 and dense retrieval fused with Reciprocal Rank Fusion, schema-validated cited answers, and per-call cost logging.",
    status: "Live demo",
    year: "2026",
    problem:
      "Most chat-with-your-PDF projects do naive top-k vector search and parse the model's raw text with json.loads. That fails in three predictable ways: exact terms get paraphrased past by dense-only retrieval, answers cannot be traced back to a source, and nobody knows what any of it costs.",
    approach:
      "I built DocChat the way a production RAG service should work. Text PDFs, scanned PDFs, and web URLs all normalize into one chunk pipeline. Retrieval combines BM25 lexical search with dense embeddings, fused by Reciprocal Rank Fusion so the two ranking scales do not need tuning against each other. Answers come back as schema-constrained JSON, validated with Pydantic, and every model call is logged with tokens, latency, and cost.",
    decisions: [
      {
        title: "Reciprocal Rank Fusion over score blending",
        body: "BM25 scores and cosine similarity live on incompatible scales, so blending them means hand-tuning a weight per corpus. RRF fuses by rank instead, which needs no tuning and does not silently break when a corpus changes.",
      },
      {
        title: "Schema-constrained output, never json.loads",
        body: "The model returns JSON constrained by a Pydantic schema through the provider's structured output mode, then it is parsed and validated. A malformed response fails loudly instead of half-parsing into a wrong answer.",
      },
      {
        title: "Document text treated as untrusted data",
        body: "Uploaded documents can contain instructions aimed at the model. The system prompt treats retrieved text and the user question as data, and refuses instructions embedded inside them.",
      },
      {
        title: "Vision as an opt-in, bounded call",
        body: "Answering about figures and charts needs the page image, which is expensive in tokens. Vision is opt-in and capped at two pages per question, so the cost stays a deliberate choice.",
      },
    ],
    challenge:
      "The hosted deployment target runs a Python and protobuf combination that breaks the vector database's bundled telemetry dependency, and the usual shims no longer apply because the pure-Python protobuf path was removed.",
    solution:
      "I import-guarded the vector store and added an in-memory NumPy cosine index as a fallback, so the deployed build runs on NumPy while local development keeps the full vector database. Both paths are verified, and the app is live.",
    results: [
      { value: "BM25 + dense", label: "Hybrid retrieval with RRF" },
      { value: "Every call", label: "Token, latency, cost logged" },
      { value: "3 sources", label: "PDF, scanned, and web" },
    ],
    stack: [
      "Python",
      "Streamlit",
      "ChromaDB",
      "BM25",
      "Pydantic",
      "Gemini",
      "Ollama",
      "Tesseract OCR",
    ],
    links: [
      { kind: "demo", label: "Live demo", href: "https://maksood-docchat.streamlit.app/" },
      { kind: "code", label: "Source", href: "https://github.com/MohammedMaksood/docchat" },
    ],
  },
  {
    slug: "research-agent",
    index: "06",
    title: "Research Agent",
    context: "Open source",
    summary:
      "A LangGraph state machine where agents plan, research, write, critique their own draft, and revise it, with the whole run bounded to a handful of model calls.",
    status: "Live demo",
    year: "2026",
    problem:
      "Agent demos tend to be one mega-prompt wearing a costume, and they either loop until the budget is gone or accept their first draft uncritically. I wanted a research agent with real role separation and a hard ceiling on what a single run can cost.",
    approach:
      "I modelled the agent as a typed LangGraph state machine with distinct nodes: plan the searches, fetch and extract the results, write a cited draft, critique that draft against the sources, and revise if the critic finds unsupported claims. Search is free through DuckDuckGo and uses no model calls at all, so the LLM budget goes only to reasoning.",
    decisions: [
      {
        title: "A typed state machine, not a prompt chain",
        body: "LangGraph makes the roles and transitions explicit, so the reflection loop is a structure in code that can be traced and tested rather than an instruction the model may ignore.",
      },
      {
        title: "The revision loop is bounded to one pass",
        body: "An unbounded critic and reviser can argue with itself indefinitely. Capping revisions at one guarantees convergence and keeps the run inside a predictable 3 to 5 model calls.",
      },
      {
        title: "Search and extraction cost no model calls",
        body: "Fetching and extracting main text is deterministic work. Keeping it out of the LLM path means the budget is spent on planning, writing, and critique, and fetched text is truncated per source.",
      },
      {
        title: "Optional tracing, off by default",
        body: "LangSmith tracing is env-gated. With a key, every node and model call is traceable with inputs, latency, and token usage. Without one it is a verified no-op, so the project runs for anyone who clones it.",
      },
    ],
    challenge:
      "A self-critiquing agent has no natural stopping point, and the same graph had to run against both a hosted model and a local one without forking the logic.",
    solution:
      "A bounded revision counter in the graph state gives the loop a guaranteed exit, and the model client is abstracted behind one interface so the identical graph runs on hosted Gemini or a local model. Runs are cost-logged and the total is shown in the interface.",
    results: [
      { value: "3 to 5", label: "Model calls per run, bounded" },
      { value: "1", label: "Revision pass, guaranteed exit" },
      { value: "$0", label: "Web search cost" },
    ],
    stack: [
      "Python",
      "LangGraph",
      "Streamlit",
      "Gemini",
      "Ollama",
      "DuckDuckGo Search",
      "LangSmith",
    ],
    links: [
      { kind: "demo", label: "Live demo", href: "https://maksood-research-agent.streamlit.app/" },
      { kind: "code", label: "Source", href: "https://github.com/MohammedMaksood/research-agent" },
    ],
  },
];
