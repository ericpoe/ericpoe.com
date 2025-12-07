# Repository Guidelines

## Project Structure & Module Organization

- Astro site rooted in `src`; pages live in `src/pages`, shared layouts/components in `src/layouts` and `src/components`, blog content in `src/content/blog`, and global styles in `src/styles`.
- Static assets live in `public` and are served as-is; blog images that ship with posts are under `src/content/blog/images`.
- Tailwind input is `src/styles/global.css` and is wired through the Astro Tailwind integration.

## Build, Test, and Development Commands

- Install dependencies: `npm install`.
- Local dev server: `npm run dev`.
- Build production bundle: `npm run build` (runs `astro build`).
- Preview production build locally: `npm run preview`.
- Lint: `npm run lint`; Format: `npm run format`; Type/markup check: `npm run check`.
- After any code or content edits, run both lint and format before handing changes off.
- No automated tests exist yet.

## Coding Style & Naming Conventions

- Astro + React islands as needed; prefer `.astro` components for static content.
- Use Prettier (project config) for formatting and ESLint with the Astro plugin.
- Indentation: 2 spaces; favor descriptive camelCase for vars/functions and PascalCase for components.
- Tailwind for utility-first styling; centralize custom tokens in `tailwind.config.js` to avoid ad-hoc inline styles.
- Blog frontmatter order must be: `title`, `date`, `categories`, `tags`, `featuredImage_Url`, `featuredImage_Alt`, then any other keys.
- Tags are lowercase kebab-case only; keep them alphabetized in frontmatter.

## Testing Guidelines

- No test harness yet; when adding, align with Jest/React Testing Library or Astro’s testing recommendations.
- Name future test files `*.test.js` beside the unit under test; prefer component-level tests over snapshots.
- Keep fixtures small and colocated; prefer msw for network mocking if needed.

## Commit & Pull Request Guidelines

- Use short, imperative commit messages (matches existing history: e.g., “Add entry for 2025-10-05”, “Fix language used for name”).
- Keep commits focused (one logical change); include context in the body if behavior changes or migrations are involved.
- PRs should describe the change, impact, and manual verification (commands run, screenshots for UI tweaks); link related issues/notes when available.
- Before opening a PR: run `npm run lint` and ensure `npm run build` succeeds.

## Security & Configuration Tips

- Secrets and API keys should not be committed; use environment variables and `.env.*` files ignored by git.
- When adding integrations or loaders, review `astro.config.mjs` and related configs to keep deployments consistent.
