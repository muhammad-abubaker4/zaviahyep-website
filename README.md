# Zaviah

Marketing and community site for Zaviah, a youth-led non-profit connecting students across
Pakistan with mentors, workshops and opportunities. Live at [zaviah.org](https://zaviah.org).

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling, with a handful of shadcn/ui primitives (`src/components/ui`)
- **Framer Motion** for animation, loaded through `LazyMotion` with the `domAnimation` feature set
- **React Router 6**, client-side only
- Deployed on **Netlify**; the contact form uses **Netlify Forms**

## Getting started

```sh
npm install
npm run dev        # http://localhost:8080
```

No `.env` file is required. See `.env.example` for the one optional variable.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Runs `prebuild` (OG image + sitemap), Vite build, then prerenders every public route |
| `npm run preview` | Serves `dist/` for local verification |
| `npm run typecheck` | `tsc --noEmit` against `tsconfig.app.json` |
| `npm run lint` | ESLint over the repo |
| `npm run gallery` | Regenerates gallery image variants and the manifest |
| `npm run og:capture` | Re-shoots the hero screenshot behind the social share card (needs `npm run dev` running) |

### Verification

Worth running before a deploy. Needs `npm run build && npm run preview` up on port 4173:

```sh
node scripts/check-routes.mjs
```

It walks every route looking for console errors, failed requests, broken images, missing alt
text and dead internal links.

## Images

Photos live in `src/assets/{gallery,tahafuz-manzil,sessions}`. Drop originals into a folder and
run `npm run gallery`; it generates 640/1280/1920px WebP variants, records intrinsic dimensions
and blur placeholders in `src/data/galleryManifest.json`, and prunes variants at any other width.

Only the generated variants are imported — never the originals — which keeps full-size camera
files out of the bundle. `src/data/galleryAlbums.ts` groups the variants back into albums; the
album titles, dates and captions are declared there.

The hero carousel is separate: `src/data/heroSlides.ts` imports its five images directly so the
homepage never pulls the whole album dataset. The first slide is preloaded from `index.html` by
the `heroPreload` plugin in `vite.config.ts` — if you change `heroSlides[0]`, update
`HERO_LCP_SOURCE` there too, or the build will fail with a message telling you so.

## SEO

`public/sitemap.xml` is generated during `prebuild` by `scripts/generate-sitemap.mjs`. Both the
sitemap and the prerenderer pull their URL list from `scripts/lib/routes.mjs`, which reads the
`<Route>` patterns in `src/App.tsx` and expands dynamic segments from the data files, so neither
can drift from the router.

Per-page metadata is set at runtime by `src/components/PageMeta.tsx`. At the end of `npm run build`,
`scripts/prerender.mjs` boots the production build in Playwright, visits every public route, and
stamps that route's title / description / canonical / Open Graph / Twitter / JSON-LD onto a copy
of Vite's `index.html`. The result is one HTML file per route under `dist/` — so WhatsApp,
LinkedIn, Facebook, X, Slack and Discord all read the correct card without executing JavaScript.

The rendered body is intentionally not saved. Shipping it was measured and rejected: React's
`createRoot` tears down `#root` and rebuilds it, which reset the hero LCP candidate by ~800ms.
The head is what social crawlers need; Google executes JS for body content either way.

The Organization (NGO) and WebSite schema still live in `index.html` and are preserved on every
prerendered page.

### Social share card

`prebuild` crops `src/assets/og-preview-screenshot.png` into the three JPEGs that link previews
use. That source is a screenshot of the hero, so it goes stale whenever the hero changes — when
it does, start the dev server and run `npm run og:capture` to re-shoot it, then rebuild. The
capture runs with reduced motion so the carousel is always pinned to the first slide, and hides
the chat and WhatsApp widgets.

Only `assets/og-share.jpg` is referenced by the meta tags; `og-image.jpg` and `og-preview.jpg`
are older public URLs kept in sync so nothing external serves a stale card. After deploying,
re-scrape the URL in Facebook's Sharing Debugger and LinkedIn's Post Inspector, since both cache
preview images aggressively.

## Contact form

The contact form posts to Netlify Forms. Netlify discovers it at deploy time from
`public/__forms.html`, so that file must keep listing every field the React form submits.
Email notifications are configured in the Netlify dashboard, not in this repo.

The Google Forms used for membership, volunteering, mentoring, campus ambassador, core team and
partnership applications are unrelated to this and live in `src/data/opportunities.ts`.

## Deployment

Netlify builds from `netlify.toml`. The build command installs Chromium for Playwright, then runs
`npm run build` (which ends in the prerender step). `PLAYWRIGHT_BROWSERS_PATH=0` keeps the browser
download inside `node_modules` so Netlify caches it between deploys.

Security headers and the Content-Security-Policy are defined in `netlify.toml` and mirrored in
`public/_headers`. Unknown paths return a real HTTP 404 via `dist/404.html` (also produced by the
prerenderer) instead of the old soft-404 SPA fallback. Client-side navigation still works because
React boots on that page the same way it does on every other route.
