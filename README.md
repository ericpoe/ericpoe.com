# ericpoe.com

Personal site and blog for Eric Poe, now built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## Getting started

```sh
npm install
npm run dev
```

Open the local dev server URL printed by Astro to view the site.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run check` — Astro type/markup check
- `npm run lint` — ESLint for `.astro`, `.ts`, and `.js`
- `npm run format` — Prettier formatting
- `npm run test` / `npm run test:unit` — Vitest unit tests (jsdom, Testing Library)
- `npm run test:e2e` — Playwright end-to-end tests (starts the dev server automatically)
- `npm run test:e2e:ui` — Playwright’s interactive test runner

## Testing

- Unit/component tests use [Vitest](https://vitest.dev/) with jsdom and Testing Library. Run with `npm run test` or `npm run test:unit`.
- End-to-end tests use [Playwright](https://playwright.dev/). Run with `npm run test:e2e` (or `npm run test:e2e:ui` for the UI runner). The command will start the dev server if needed.
- Coverage (from Vitest) lands in `coverage/`. Playwright artifacts (reports, traces) land under `playwright-report/` and `test-results/` and are git-ignored.

## Content

Blog posts live in `src/content/blog`. Images used inside posts live in `src/content/blog/images`. Static assets that should pass through unchanged live in `public`.
