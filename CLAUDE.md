# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

```bash
npm run dev          # Start dev server (port 4321)
npm run build        # Production build
npm run check        # Astro type/content schema validation
npm run lint         # ESLint
npm run format       # Prettier
npm run test         # Unit tests (Vitest)
npm run test:e2e     # E2E tests (Playwright, auto-starts server)
```

Run a single unit test: `npx vitest run tests/unit/slugify.test.ts`
Run a single E2E test: `npx playwright test tests/e2e/home.spec.ts`

## Architecture Overview

This is an **Astro static site** (ericpoe.com) using file-based routing with React islands for interactivity.

### Content Flow

Blog posts (`src/content/blog/*.md`) → Content Collection validation → Dynamic routes (`[slug].astro`) → Static HTML

### Key Patterns

**Pagination**: Home, category, and tag pages paginate at 10 posts. The pattern uses `[page].astro` dynamic segments with `getStaticPaths()` generating numbered pages.

**Dark Mode**: CSS class-based (`dark:` utilities). The `ThemeToggle.astro` component handles client-side persistence.

**Content Collections**: Blog schema enforces:

- Tags must be lowercase kebab-case (validated via regex)
- Tags must be alphabetically sorted in frontmatter
- Frontmatter order: `title`, `date`, `categories`, `tags`, `featuredImage_Url`, `featuredImage_Alt`

### File Relationships

- `BaseLayout.astro` wraps all pages (contains `<Header>`, `<Colophon>`, slot)
- `Seo.astro` generates meta tags from page props and `siteMetadata.ts`
- Route pages import `BaseLayout` and pass title/description for SEO

## Blog Post Frontmatter

```yaml
---
title: 'Post Title'
date: 2025-01-06
categories:
  - Category Name
tags:
  - first-tag
  - second-tag
featuredImage_Url: ./images/image.png
featuredImage_Alt: 'Description of image'
---
```

## Testing Notes

- Unit tests: `tests/unit/` - utilities tested with Vitest + Testing Library
- E2E tests: `tests/e2e/` - user flows tested with Playwright
- E2E uses port 4321 (configured in `playwright.config.ts`)

## Additional Guidelines

See `AGENTS.md` for comprehensive coding style, commit conventions, and PR guidelines.
