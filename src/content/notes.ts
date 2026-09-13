export type Note = {
  id: string;
  /**
   * `sticky`  handwritten on warm paper, for opinions
   * `callout` inverted card, for a technical claim
   */
  kind: "sticky" | "callout";
  text: string;
};

/**
 * Order matters: the board places these into a two by two checkerboard, so
 * the array reads sticky, callout, callout, sticky and the two paper notes
 * land on opposite corners.
 *
 * The hero pinboard. Every note comes from a decision actually made in one of
 * the systems documented further down the page, so the board reads as
 * evidence of how he thinks rather than as decoration.
 */
export const notes: Note[] = [
  {
    id: "honesty",
    kind: "sticky",
    text: "a model that says “I don’t know” beats one that sounds sure and is wrong.",
  },
  {
    id: "hybrid",
    kind: "callout",
    text: "Dense-only retrieval paraphrases past the exact term. Hybrid search finds both.",
  },
  {
    id: "ocr",
    kind: "callout",
    text: "OCR only where extraction fails. A scanned page nobody can read is invisible to everything downstream.",
  },
  {
    id: "pinning",
    kind: "sticky",
    text: "pin the model id. “-latest” drifts.",
  },
];
