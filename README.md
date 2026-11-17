# manuelfernandez.site

Personal site of Manuel Fernández. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Static export, no runtime dependencies beyond Next/React.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run preview  # build + serve: exactly what visitors would see (private copy removed)
```

## Disclosure control

Three levels for any piece of copy in `src/content/`:

| Level | How to write it | `npm run dev` (local) | Build / live |
|---|---|---|---|
| Public | `"plain string"` | Shown | Shown |
| Private | `priv("text")`, or a figure with `private: true` | Shown with red **Private** mark | Removed |
| Missing | `todo("what is needed")` | Yellow **Input needed** tag | Yellow tag (fill before launch) |

Workflow: draft freely with `priv()`, review locally, then promote only what is cleared to a plain string.

Deploy `out/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

Environment variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for canonical, Open Graph and sitemap URLs |
| `NEXT_PUBLIC_PUBLIC=1` | Leaves stealth mode. By default the site is noindex and robots.txt blocks all crawlers |
| `NEXT_PUBLIC_HIDE_TODOS=1` | Hides all "Input needed" markers (use only for a preview; fill them before launch) |

## Information architecture

| Page | Job | Key content |
|---|---|---|
| Home `/` | Explain what I do in 10 seconds, then prove it | Hero positioning · The thread (4-step evolution) · Selected work · 5 principles · Technical fluency · Interests |
| About `/about/` | The story: analytics → product ownership | Short version · The thread · What I own today · Who I work with |
| Work `/work/` + `/work/[slug]/` | Evidence | 4 case studies, each Problem → Context → My role → Approach → Decision → Outcome |
| Experience `/experience/` | Timeline, grouped into chapters, not a LinkedIn copy | 3 chapters + education + CV link |
| Thinking `/thinking/` | Future writing | Published notes (empty) + working titles |
| Contact | Footer on every page (`#contact`) | Email, LinkedIn |

Contact is a footer section, not a page: it is always one click (or scroll) away without adding a thin page.

## Design direction

- **Editorial, not SaaS.** Serif display (Newsreader) for headings, Inter for reading, JetBrains Mono for small labels and indices.
- **Layout does the work.** 12-column grid: section label on the left, content on the right. Lists and rules instead of cards.
- **One accent.** Deep green (`#1f5e4b`, lighter in dark mode) marks indices, the "now" step and the hero's key phrase.
- **Signature elements.** The italic "consumer insight" in the hero; the Product × E-commerce × Analytics × Consumer experience × Technology stack; the four-step evolution whose rules darken toward "Now".
- **Motion.** One 520 ms page fade, hover underlines and arrow nudges. All disabled under `prefers-reduced-motion`.
- **Dark mode** follows the system setting automatically (tokens in `globals.css`). No toggle.
- Fonts are self-hosted (`src/app/fonts`) for performance and privacy.

## Editing content

All copy lives in `src/content/`:

| File | Contains |
|---|---|
| `site.ts` | Name, metadata, nav, contact, evolution steps, principles, fluency, interests |
| `work.ts` | Case studies |
| `experience.ts` | Career chapters and education |
| `thinking.ts` | Posts and working titles |

`todo("...")` marks information only Manuel can supply; it renders as a yellow **Input needed** tag. Case-study sections with `draft: true` show "Draft · confirm or rewrite".

### Input needed before launch

- [ ] Public email and LinkedIn URL (`site.ts`)
- [ ] Optional CV PDF link (`site.ts`)
- [ ] Start year at Versuni (`experience.ts`, `work.ts`)
- [ ] Exact title, organization and years for the D2C e-commerce insights & analytics role
- [ ] Earlier roles: titles, organizations, years, one-line scope
- [ ] Education
- [ ] Per case study: period, Decision, Outcome (public-safe or relative indicators only)
- [ ] Search & discovery case: context and role
- [ ] Confirm or rewrite draft Approach sections (cases 01 and 04)
- [ ] Confirm or replace Thinking working titles
- [ ] Production URL (`NEXT_PUBLIC_SITE_URL`)

## Confidentiality rules

No confidential figures, internal architecture, stakeholder names, internal URLs, incidents or proprietary data. Outcomes use public-safe or relative indicators only.


## Deploy on Cloudflare Pages (password protected)

The site is a static export with a password gate in `functions/_middleware.js`.
Every request goes through the gate; the right password sets a 30-day cookie.

1. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git, pick this repo.
2. Build settings: framework preset **None**, build command `npm run build`, output directory `out`.
3. Settings > Variables and Secrets: add `SITE_PASSWORD` (type **Secret**) for Production and Preview.
4. Redeploy. Without `SITE_PASSWORD` the site stays locked.

Change the password any time by editing the variable and redeploying; everyone is then asked again.
