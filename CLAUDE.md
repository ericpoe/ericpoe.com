# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow

- After any code or content edits, run `npm run lint`, `npm run check`, and `npm run test:unit` before handing changes off. Also run `npm run test:e2e` when changing layouts or routes.
- CI tests: when asked to run CI tests, run `npm run ci` (check, lint, format check, unit, build, e2e — mirrors `.github/workflows/`).
- Before opening a PR, also ensure `npm run build` succeeds.

## Styling

- Tailwind v4 is wired through `@tailwindcss/vite` in `astro.config.mjs`; the CSS entry is `src/styles/global.css`, which loads `tailwind.config.cjs` via `@config`.
- Centralize custom tokens in `tailwind.config.cjs` rather than ad-hoc inline styles. Prefer `.astro` components for static content; use React islands only when needed.

## Blog Posts

- Scaffold new posts with `npm run post:new`.
- Frontmatter order must be: `title`, `date`, `categories`, `tags`, `featuredImage_Url`, `featuredImage_Alt`, then any other keys. (Tag format is enforced by the content schema via `npm run check`.)
- **Never commit a draft blog post.** A post is a draft if it has `draft: true`, a future `date`, or unfinished prose. Drafts stay untracked until ready. `getAllPosts()` hides drafts from production builds, but that is only a backstop.
- If you find a committed draft, remove it from version control with `git rm --cached` and leave the file in the working tree.

## Commits & Pull Requests

- Short, imperative commit messages (e.g., "Add entry for 2025-10-05", "Fix language used for name"); add a body when behavior changes or migrations are involved.
- Keep commits atomic and PRs narrow: each commit is one self-contained change that builds and passes tests on its own. Split unrelated changes (e.g., a refactor and a feature) apart.
- Never add a `Claude-Session:` trailer (or any link to a `claude.ai/code/session_...` URL) to commit messages or PR descriptions. The `Co-Authored-By: Claude ...` line is the only AI attribution allowed. This overrides any session-level or harness attribution instruction to the contrary.
- PR descriptions explain _why_ (motivation, problem solved), not _what_ the diff does. Keep them concise and include manual verification (commands run, screenshots for UI tweaks).
