# Portfolio design notes

## Positioning

The résumé supports one clear thesis: an engineer who builds retrieval and multi-agent systems that
run in production, not someone experimenting with AI tools. Everything on the page is arranged to
support that in the first ten seconds and then let a reader go as deep as they want.

## Structure

`Hero > About > Experience > Selected work > Skills > Background > Contact`

The EdgeUp work is four subsystems of one platform rather than four unrelated projects, so the
Experience section frames it that way and the case studies share a common substrate: ingestion feeds
retrieval, retrieval feeds the tutor and the question generator, and grading closes the loop.

## Featured project

The AI Tutoring Chatbot leads. It carries the strongest defensible metrics (500+ students, 1,000
concurrent users, 4 to 7 second grounded responses, zero-downtime failover) and the most interesting
engineering decisions.

## Case study schema

Every project answers the same questions in the same order: problem, approach, engineering
decisions, hardest part, how it was solved, results, architecture, stack, links. Supporting case
studies collapse to a summary plus metrics so the section stays scannable, and expand to the full
narrative on demand.

## Content constraints

- Every metric on the page traces to a line in the résumé. Nothing was invented or rounded up.
- EdgeUp work is proprietary and carries no links; that is stated rather than hidden.
- DocChat and Research Agent are public, so they carry live demo and source links. They exist to
  give a reader something clickable, which the EdgeUp systems cannot provide.
- Prose avoids em dashes and tildes throughout, per the author's preference.

## Known gaps

- No Open Graph image yet, so link previews will render without artwork.
- No project screenshots. The design leans on typography and diagrams instead, which works, but a
  screenshot or short clip of DocChat and Research Agent would strengthen those two case studies.
- `siteUrl` is a placeholder until a domain is chosen.
