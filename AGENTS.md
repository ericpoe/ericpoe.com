# Repository Guidelines

## Project Structure & Module Organization

- Gatsby site rooted in `src`; main app code in `src/pages`, shared layouts/components in `src/components`, hooks in `src/hooks`, templates in `src/templates`, and global styles in `src/styles`.
- Static assets live in `static` (copied as-is) and `src/images` (processed by Gatsby).
- Tailwind input is `src/styles/tailwind.css`; compiled CSS is written to `src/components/css/index.css` by the `css` script.

## Build, Test, and Development Commands

- Install dependencies: `npm install` (Gatsby CLI may be needed globally for convenience).
- Local dev server: `npm run develop` (builds Tailwind first, then starts Gatsby with hot reload).
- Debug dev server: `npm run develop:debug` (Node inspector on `127.0.0.1:9232`).
- Build production bundle: `npm run build` (runs Tailwind build then `gatsby build`).
- CSS-only rebuild: `npm run css` (helpful when adjusting Tailwind config).
- Lint: `npm run lint`; Format: `npm run format`.
- No automated tests exist; `npm test` currently fails intentionally—add frameworks before relying on it.

## Coding Style & Naming Conventions

- JavaScript/JSX with React 18; prefer functional components and hooks.
- Use Prettier (project config) for formatting and ESLint with `eslint-config-react-app`/`prettier` to avoid style drift.
- Indentation: 2 spaces; favor descriptive camelCase for vars/functions, PascalCase for components, kebab-case for file names in `src/pages`.
- Tailwind for utility-first styling; centralize custom tokens in `tailwind.config.js` to avoid ad-hoc inline styles.

## Testing Guidelines

- No test harness yet; when adding, align with Jest/React Testing Library conventions.
- Name future test files `*.test.js` beside the unit under test; prefer component-level tests over snapshots.
- Keep fixtures small and colocated; prefer msw for network mocking if needed.

## Commit & Pull Request Guidelines

- Use short, imperative commit messages (matches existing history: e.g., “Add entry for 2025-10-05”, “Fix language used for name”).
- Keep commits focused (one logical change); include context in the body if behavior changes or migrations are involved.
- PRs should describe the change, impact, and manual verification (commands run, screenshots for UI tweaks); link related issues/notes when available.
- Before opening a PR: run `npm run lint`, ensure `npm run build` succeeds, and regenerate Tailwind output if styles changed.

## Security & Configuration Tips

- Secrets and API keys should not be committed; use environment variables and `.env.*` files ignored by git.
- When adding plugins or loaders, review `gatsby-config.js` for site metadata, manifest, and analytics settings to keep deployments consistent.
