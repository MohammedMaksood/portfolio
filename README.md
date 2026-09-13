# Mohammed Maksood Alam, AI Engineer

Personal portfolio. Next.js 15 (App Router) + TypeScript + Tailwind v4 + Motion, exported as a
fully static site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run typecheck
```

Stop the dev server before running a build. Both use `.next/`, so building while `npm run dev` is
running leaves the dev server serving chunks that no longer exist, and every asset 404s until you
restart it.

`npm run build` writes a plain static site to `out/`. It can be hosted anywhere: Vercel, Netlify,
GitHub Pages, Cloudflare Pages, or any static file server.

## Updating the content

All content lives in `src/content/`. Nothing in `src/components/` needs to be touched to add or
change a project, a role, or a skill.

| File | Holds |
| --- | --- |
| `profile.ts` | Name, title, hero statement, About narrative, the "At a glance" facts, all links, and `siteUrl` |
| `experience.ts` | Roles for the Experience timeline |
| `projects.ts` | The case studies, including architecture diagrams |
| `skills.ts` | Skill groups and the terms that map each skill to projects |
| `education.ts` | Degrees and certifications |

### Adding a project

Append an object to the `projects` array in `src/content/projects.ts`. The `Project` type at the top
of that file documents every field. Notes:

- `featured: true` promotes a project to the flagship slot. Exactly one project should have it.
- `index` is the number shown in the interface (`"07"`, and so on).
- `architecture.stages` renders the diagram. Each stage is a labelled node; add `branch: [...]` to
  fan parallel components out of a stage.
- `links` is optional. Leave it empty and nothing renders, so there are never dead links.
- `confidential: true` renders the "Proprietary work" note in place of links.

### Skill to project mapping

Each skill in `skills.ts` has a `match` array. Those strings are matched, case-insensitively, as
substrings against every project's `stack` entries. Hovering the skill lists the projects that hit.
An empty `match` array means the skill is listed but maps to nothing, which is correct for
technologies not used in any documented project.

## Before going live

1. Set the real domain in `src/content/profile.ts` (`siteUrl`), `public/robots.txt`, and
   `public/sitemap.xml`.
2. Add an Open Graph image at `public/og.png` (1200x630) and reference it in the `openGraph` and
   `twitter` blocks in `src/app/layout.tsx`. There is currently no social preview image.
3. Replace `public/Mohammed-Maksood-Alam-AI-Engineer-Resume.pdf` whenever the résumé changes. The
   filename is referenced in `profile.links.resume`.

## Design notes

- Dark is the default theme; a warm ivory light theme is available from the switcher and is stored
  in `localStorage`. Neither theme uses pure black or pure white.
- Colour, spacing, and type tokens are CSS variables in `src/app/globals.css`. Base and component
  rules are wrapped in `@layer` so Tailwind utilities can always override them at the call site.
- Motion is built from a few named primitives rather than ad-hoc animation:
  `Reveal` (fade and rise on entry), `ScrollText` (words light word by word as a paragraph passes
  through the viewport), `Metric` (counts a number up once on entry), `Magnetic`, `CursorGlow`,
  and the pulse built into `ArchitectureDiagram`.
- Every animated component reads `useStillness()` from `src/lib/`, not `useReducedMotion` directly.
  The raw hook reads its media query during render, which disagrees with the prerendered HTML and
  causes a hydration mismatch; `useStillness` gates on mount so the first client render always
  matches the server.
- Under reduced motion the hero canvas paints a single static frame, reveals resolve instantly,
  counters show their final value immediately, diagram pulses are not rendered at all, and the
  cursor glow is absent.
- `Metric` only counts values that are a number wearing symbols (`500+`, `1,000`, `98%+`, `$0`).
  Anything containing words (`4 to 7s`, `BM25 + dense`, `Hours to minutes`) renders untouched, so
  adding a new metric can never produce something like `BM0 + dense` mid-animation.
- The featured case study pins its architecture column with CSS sticky. Its technology list is moved
  into the scrolling column so the pinned box stays shorter than the viewport and can actually
  travel.
- The hero canvas pauses entirely once it scrolls out of view.
