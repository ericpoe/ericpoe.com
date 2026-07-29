---
name: run-ci-checks
description: Run the full CI-equivalent check sequence for ericpoe.com (type/content check, lint, format check, unit tests, build, e2e tests) when asked to run CI tests or verify the branch is CI-clean locally.
---

Run these in order:

```bash
npm run check
npm run lint
npx prettier --check '**/*.{js,jsx,ts,astro,md,mdx}'
npm run test:unit
npm run build
npm run test:e2e
```
