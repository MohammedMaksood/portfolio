/**
 * A single fixed film-grain layer. The turbulence is baked into an inline
 * SVG data URI so it costs no network request, and it sits behind every
 * interactive element.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-20"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}
