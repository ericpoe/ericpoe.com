# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure & Module Organization

- Astro site rooted in `src`; pages live in `src/pages`, shared layouts/components in `src/layouts` and `src/components`, blog content in `src/content/blog`, and global styles in `src/styles`.
- Static assets live in `public` and are served as-is; blog images that ship with posts are under `src/content/blog/images`.
- Tailwind input is `src/styles/global.css` and is wired through the Astro Tailwind integration.

## Quick Reference

- Install dependencies: `npm install`.
- Local dev server: `npm run dev`.
- Build production bundle: `npm run build` (runs `astro build`).
- Preview production build locally: `npm run preview`.
- Lint: `npm run lint`; Format: `npm run format`; Type/markup check: `npm run check` (Astro content schema + type diagnostics).
- Tests: `npm run test` / `npm run test:unit` (Vitest + Testing Library), `npm run test:e2e` (Playwright).
- Run a single unit test: `npx vitest run tests/unit/slugify.test.ts`
- Run a single E2E test: `npx playwright test tests/e2e/home.spec.ts`
- CI tests: when asked to run CI tests, use the `run-ci-checks` skill (runs check, lint, format check, unit tests, build, e2e in order).
- After any code or content edits, run lint, `npm run check`, and unit tests before handing changes off. Run E2E when changing layouts/routes.

## Coding Style & Naming Conventions

- Astro + React islands as needed; prefer `.astro` components for static content.
- Use Prettier (project config) for formatting and ESLint with the Astro plugin.
- Indentation: 2 spaces; favor descriptive camelCase for vars/functions and PascalCase for components.
- Tailwind for utility-first styling; centralize custom tokens in `tailwind.config.js` to avoid ad-hoc inline styles.
- Blog frontmatter order must be: `title`, `date`, `categories`, `tags`, `featuredImage_Url`, `featuredImage_Alt`, then any other keys.
- Tags are lowercase kebab-case only; keep them alphabetized in frontmatter.

## Testing Guidelines

- Unit/component tests use Vitest (jsdom) with Testing Library helpers; place tests under `tests/unit` using `*.test.ts`.
- End-to-end tests use Playwright; place specs under `tests/e2e`.
- Run lint and unit tests before PRs; run E2E when changing routes/layouts.
- Keep fixtures small and colocated; prefer msw-style mocks if HTTP mocking is needed later.

## Commit & Pull Request Guidelines

- Use short, imperative commit messages (matches existing history: e.g., "Add entry for 2025-10-05", "Fix language used for name").
- Keep commits focused (one logical change); include context in the body if behavior changes or migrations are involved.
- PRs should describe the change, impact, and manual verification (commands run, screenshots for UI tweaks); link related issues/notes when available.
- Before opening a PR: run `npm run lint` and ensure `npm run build` succeeds.

## Security & Configuration Tips

- Secrets and API keys should not be committed; use environment variables and `.env.*` files ignored by git.
- When adding integrations or loaders, review `astro.config.mjs` and related configs to keep deployments consistent.
