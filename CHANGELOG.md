# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- RSS feed at `/rss.xml` using `@astrojs/rss` for feed readers
- View Transitions via Astro's `<ClientRouter />` for smooth page-to-page navigation
- SEO utility module (`src/utils/seo.ts`) with testable functions for URL building, keyword parsing, and image resolution
- Expanded unit tests for `slugify` and `formatTitleMla` utilities covering edge cases
- New test suite for SEO utilities (`tests/unit/seo.test.ts`)
- GitHub Actions workflows for CI: unit tests (`unit-tests.yml`) and E2E tests (`e2e-tests.yml`)

### Changed

- Refactored `Seo.astro` component to use extracted utility functions for better testability

### Fixed

- Removed header-link to non-existent webmanifest

## [2.0.0] - 2025-12-14

### Added

- Rebuilt site with Astro, Tailwind integration, and content collections for blog posts.
- New Astro components/layouts for header, footer/colophon, SEO metadata, analytics, and blog timestamp.
- MDX support and a reusable Figure component for accessible images with captions/links; posts converted to use it.
- Manifest and icon now served from `public/` with trailing-slash routing.
- Testing stack added: Vitest (jsdom) with Testing Library for units, Playwright for E2E, and npm scripts to run them.
- Added `npm run check` usage to workflows; Astro check validates content collections and types.
- ESLint migrated to flat config for v9; new `eslint.config.mjs` with Astro JS/TS support.
- Tag listings with pagination (`/tag/[tag]/` and `/tag/[tag]/page/[page]/`), plus “Tagged with” chips on posts linking to those pages.
- Category navigation links in the header and category listing pages (with pagination) for each category.

### Changed

- Migrated all Markdown posts and images into `src/content/blog` using Astro content schema.
- Updated build/dev tooling (`npm run dev/build/preview/check`) plus lint/format scripts for Astro and TypeScript.
- Project now uses ES modules (package `"type": "module"`); Tailwind/PostCSS configs moved to `.cjs` for compatibility.
- Refreshed project docs (`AGENTS.md`, `README.md`) to describe the Astro setup.
- Upgraded Astro to v5 (with @astrojs/mdx, react, tailwind, sitemap matching).
- Upgraded React/ReactDOM to v19 and refreshed lint/tooling (ESLint 9, @typescript-eslint, Astro lint plugin).
- Normalized `featuredImage_Url` paths to local `./images/...` for content schema resolution.
- Figure component now uses Astro Image for imports and supports optional format/sizing props.
- Pagination pages redirect unknown page numbers to 404.
- Header theme toggle redesigned for better accessibility (focus-visible styles, live status text, reduced-motion support) and updated sun icon.
- Dark-mode aware code styling uses Solarized light/dark via Shiki and respects explicit `data-theme`.
- Menu/link colors aligned in dark mode to match the site title.
- Added Tailwind Typography plugin with custom code/pre colors; applied `prose` styling to summaries and post content while scoping link styling to content areas.

### Removed

- Gatsby-specific config, templates, and components; legacy static output and Gatsby build scripts.

## [1.7.0] - 2023-12-29

### Added

- Header with [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) and [Open Graph](https://ogp.me/) meta tags

### Changed

- Migrated from `gatsby-plugin-next-seo` and `react-helmet` to built-in Gatsby tools: `SEO` and `Head` respectively.
- Migrated from using Yarn to using npm primarily due to familiarity since I use npm at work. Consequently, this updated almost every package.
- Renamed "Last Edited" to "Updated" in blog timestamp
- Showing all timestamps in GMT time rather than unknown TZ
- Migrate from deprecated `StaticQuery` to React's `useStaticQuery`. This will make it easier to upgrade to Gatsby v6 when it comes out.

### Removed

- `eslint-config-airbnb` because it requires an older version of `eslint`
- `eslint-config-gatsby-standard` because it requires an older version of `eslint`
- `gatsby-plugin-next-seo` is not compatible with Gatsby v5 so it is removed.
- `react-helmet` in favor of built-in Head component
- `react-helmet-async`

## [1.6.0] - 2023-04-16

### Changed

- Upgraded to Gatsby 5

## [1.5.0] - 2022-01-17

### Added

- Installed `gatsby-plugin-next-seo` and `react-helmet-async` to make it easier to share links to posts via Twitter and other social media
- Added markdown frontmatter for `featuredImage_Url` and `featuredImage_Alt` to allow for including a non-default image in social media posts.

### Changed

- Updated prettier to also style markdown files
- Use GatsbySeo instead of Helmet where appropriate
- Show last-edited date on blog posts that have a last-edited date

## [1.4.1] - 2021-12-29

### Fixed

- eslint was broken on `gatsby-*.js` files, fixed by replacing `eslint-plugin-react` with `eslint-config-react-app`

### Removed

- Removed option for draft documents. I was not completing drafts, so this just adds to the complexity of the software.

## [1.4.0] - 2021-12-29

### Added

- Added `postcss` to work with `tailwindcss` v3

### Changed

- Upgraded `gatsby` to v4
- Upgraded `eslint` and associated libraries to latest
- Upgraded `prismjs` and associated libraries to latest
- Upgraded `react` and associated libraries to latest
- Upgraded `tailwindcss` to v3

### Fixed

- Fixed files based on new `eslint` rules

### Removed

- Removed `purgecss` since it is no longer used with `tailwindcss` v3

## [1.3.8] - 2020-04-27

### Added

- Set base version of node to fix build errors

### Changed

- Upgraded `eslint` to 6.8.0
- Upgraded `eslint-config-airbnb` to 18.1.0
- Upgraded `eslint-config-prettier` to 6.11.0
- Upgraded `eslint-plugin-import` to 2.20.2
- Upgraded `eslint-plugin-prettier` to 3.1.3
- Upgraded `eslint-plugin-react` to 7.19.0
- Upgraded `gatsby` to 2.21.0
- Upgraded `gatsby-plugin-google-analytics` 2.3.0
- Upgraded `gatsby-plugin-manifest` to 2.4.0
- Upgraded `gatsby-plugin-offline` to 3.2.0
- Upgraded `gatsby-plugin-react-helmet` to 3.3.0
- Upgraded `gatsby-plugin-sharp` to 2.6.0
- Upgraded `gatsby-plugin-sitemap` to 2.4.0
- Upgraded `gatsby-remark-images` to 3.3.0
- Upgraded `gatsby-remark-prismjs` to 3.5.0
- Upgraded `gatsby-source-filesystem` to 2.3.0
- Upgraded `gatsby-transformer-remark` to 2.8.0
- Upgraded `prettier` to 2.0.5
- Upgraded `prismjs` to 1.20.0
- Upgraded `prism-themes` to 1.4.0
- Upgraded `purgecss` to 2.1.2
- Upgraded `react` to 16.13.1
- Upgraded `react-dom` to 16.13.1
- Upgraded `react-helmet` to 6.0.0
- Upgraded `react-icons` to 3.10.0
- Upgraded `tailwindcss` to 1.3.5

## [1.3.7] - 2019-09-22

### Changed

- Upgraded `eslint` to 6.4.0
- Upgraded `eslint-config-airbnb` to 18.0.1
- Upgraded `eslint-config-prettier` to 6.3.0
- Upgraded `eslint-plugin-prettier` to 3.1.1
- Upgraded `gatsby` to 2.15.20
- Upgraded `gatsby-plugin-google-analytics` to 2.1.17
- Upgraded `gatsby-plugin-manifest` to 2.2.18
- Upgraded `gatsby-plugin-offline` to 3.0.8
- Upgraded `gatsby-plugin-react-helmet` to 3.1.8
- Upgraded `gatsby-plugin-sharp` to 2.2.25
- Upgraded `gatsby-plugin-sitemap` to 2.2.14
- Upgraded `gatsby-remark-images` to 3.1.23
- Upgraded `gatsby-remark-prismjs` to 3.3.14
- Upgraded `gatsby-source-filesystem` to 2.1.26
- Upgraded `gatsby-transformer-remark` to 2.6.24
- Upgraded `purgecss` to 1.4.0
- Upgraded `react` to 16.9.0
- Upgraded `react-dom` to 16.9.0
- Upgraded `tailwindcss` to 1.1.2
- Switched React.Fragment to fragment shorthand as suggested by eslint-plugin-react
- Add json & jsx to files under the aegis of `prettier`
- Added a debug option to `yarn develop` -- in VSCode, enable "Debug: Toggle Auto Attach"

### Fixed

- Added a Helmet statement to not defer showing the title when opening a new tab from a link (part of Helmet upgrade)

## [1.3.6] - 2019-07-14

### Changed

- Upgraded `eslint` to 5.16.0
- Upgraded `eslint-config-airbnb` to 2.2.0
- Upgraded `eslint-config-prettier` to 4.3.0
- Upgraded `eslint-plugin-import` to 2.18.0
- Upgraded `eslint-plugin-jsx-a11y` to 6.2.3
- Upgraded `eslint-plugin-prettier` to 3.1.0
- Upgraded `eslint-plugin-react` to 7.14.2
- Upgraded `gatsby` to 2.13.20
- Upgraded `gatsby-plugin-google-analytics` to 2.1.4
- Upgraded `gatsby-plugin-manifest` to 2.2.3
- Upgraded `gatsby-plugin-offline` to 2.2.4
- Upgraded `gatsby-plugin-react-helmet` to 3.1.2
- Upgraded `gatsby-plugin-sharp` to 2.2.7
- Upgraded `gatsby-plugin-sitemap` to 2.2.3
- Upgraded `gatsby-remark-images` to 3.1.6
- Upgraded `gatsby-remark-prismjs` to 3.3.3
- Upgraded `gatsby-source-filesystem` to 2.1.5
- Upgraded `gatsby-transformer-remark` to 2.6.5
- Upgraded `prettier` to 1.18.2
- Upgraded `prism-themes` to 1.1.0
- Upgraded `prismjs` to 1.16.0
- Upgraded `purgecss` to 1.3.0
- Upgraded `react` to 16.8.6
- Upgraded `react-dom` to 16.8.6
- Upgraded `react-helmet` to 5.2.1
- Upgraded `react-icons` to 3.7.0
- Upgraded `tailwindcss` to 1.0.5

### Fixed

- Added languages to language blocks missing languages

## [1.3.5] - 2019-02-05

### Changed

- Upgraded [security] `webpack-dev-server` to 3.1.14
- Upgraded `eslint` to 5.13.0
- Upgraded `gatsby` to 2.0.115
- Upgraded `prettier` to 1.16.4
- Upgraded `tailwindcss` to 0.7.4
- Upgraded `react` to 16.7.0
- Upgraded `react-dom` to 16.7.0
- Upgraded `react-icons` to 3.3.0
- Upgraded `eslint-config-gatsby-standard` to 2.1.1
- Upgraded `eslint-config-prettier` to 4.0.0
- Upgraded `eslint-plugin-import` to 2.16.0
- Upgraded `eslint-plugin-jsx-a11y` to 6.2.1
- Upgraded `eslint-plugin-prettier` to 3.0.1
- Upgraded `gatsby-plugin-google-analytics` to 2.0.13
- Upgraded `gatsby-plugin-manifest` to 2.0.17
- Upgraded `gatsby-plugin-offline` to 2.0.22
- Upgraded `gatsby-plugin-react-helmet` to 3.0.6
- Upgraded `gatsby-plugin-sharp` to 2.0.20
- Upgraded `gatsby-plugin-sitemap` to 2.0.5
- Upgraded `gatsby-remark-images` to 3.0.0
- Upgraded `gatsby-remark-prismjs` to 3.2.4
- Upgraded `gatsby-source-filesystem` to 2.0.20
- Upgraded `gatsby-transformer-remark` to 2.2.4

## [v1.3.4] - 2018-11-18

### Changed

- Upgraded `eslint` to 5.9.0
- Upgraded `eslint-config-gatsby-standard` to 2.1.0
- Upgraded `eslint-config-prettier` to 3.3.0
- upgraded `gatsby` to 2.0.50
- upgraded `gatsby-plugin-google-analytics` to 2.0.7
- upgraded `gatsby-plugin-manifest` to 2.0.9
- upgraded `gatsby-plugin-offline` to 2.0.15
- upgraded `gatsby-plugin-react-helmet` to 3.0.2
- upgraded `gatsby-plugin-sharp` to 2.0.12
- upgraded `gatsby-plugin-sitemap` to 2.0.2
- upgraded `gatsby-remark-images` 2.0.6
- upgraded `gatsby-remark-prismjs` to 3.0.3
- upgraded `gatsby-source-filesystem` to 2.0.8
- upgraded `gatsby-transformer-remark` to 2.1.12
- upgraded `prettier` to 1.15.2
- upgraded `react` to 16.6.3
- upgraded `react-dom` to 16.6.3
- upgraded `tailwindcss` to 0.7.2

## [v1.3.3] - 2018-10-25

### Changed

- Upgraded `eslint` to 5.7.0
- Upgraded `eslint-plugin-jsx-a11y` to 6.1.2
- Upgraded `gatsby` to 2.0.31
- Upgraded `gatsby-plugin-manifest` to 2.0.31
- Upgraded `gatsby-plugin-offline` to 2.0.6
- Upgraded `gatsby-plugin-sharp` to 2.0.8
- Upgraded `gatsby-remark-images` to 2.0.4
- Upgraded `gatsby-remark-prismjs` to 3.0.2
- Upgraded `gatsby-source-filesystem` to 2.0.5
- Upgraded `gatsby-transformer-remark` to 2.1.9
- Upgraded `react` to 16.6.0
- Upgraded `react-dom` to 16.6.0
- Upgraded `react-icons` to 3.2.2

## [v1.3.2] - 2018-10-01

### Changed

- Upgraded `eslint` to 5.6.1
- Upgraded `eslint-plugin-prettier` to 3.0.0
- Upgraded `gatsby` to 2.0.14
- Upgraded `gatsby-plugin-manifest` to 2.0.4
- Upgraded `gatsby-remark-images` to 2.0.3
- Upgraded `gatsby-remark-prismjs` to 3.0.1
- Upgraded `gatsby-transformer-remark` to 2.1.5

## [v1.3.1] - 2018-09-26

### Changed

- Upgraded `react` to 16.5.2
- Upgraded `react-dom` to 16.5.2
- Upgraded `gatsby` to 2.0.8
- Upgraded `gatsby-transformer-remark` to 2.1.3
- Upgraded `gatsby-remark-images` to 2.0.2
- Upgraded `gatsby-plugin-manifest` to 2.0.3
- Upgraded `gatsby-plugin-google-analytics` to 2.0.6
- Upgraded `tailwindcss` to 0.6.6
- Upgraded `prettier` to 1.14.3
- Upgraded `eslint-config-prettier` to 3.1.0

## [v1.3.0] - 2018-09-26

### Added

- Colophon - a location for social links & endmatter

### Changed

- Renamed certain divs to their HTML5 semantic-web equivalents
- Merged styles

## [v1.2.4] - 2018-09-17

### Changed

- Upgraded packages from rc to final version. Hooray Gatsby v2!
- Upgraded `eslint` to 5.6.0
- Upgraded `gatsby` to 2.0.0
- Upgraded `gatsby-plugin-google-analytics` to 2.0.5
- Upgraded `gatsby-plugin-manifest` to 2.0.2
- Upgraded `gatsby-plugin-offline` to 2.0.5
- Upgraded `gatsby-plugin-react-helmet` to 3.0.0
- Upgraded `gatsby-plugin-sharp` to 2.0.5
- Upgraded `gatsby-plugin-sitemap` to 2.0.1
- Upgraded `gatsby-remark-images` to 2.0.1
- Upgraded `gatsby-remark-prismjs` to 3.0.0
- Upgraded `gatsby-source-filesystem` to 2.0.1
- Upgraded `gatsby-transformer-remark` to 2.1.1
- Upgraded `react` to 16.5.1
- Upgraded `react-dom` to 16.5.1

## [v1.2.3] - 2018-09-17

### Changed

- Personalized web manifest

## [v1.2.2] - 2018-09-16

### Added

- Unique metadata for each page's keywords
- Page's title now appears first in the <title> tag

### Removed

- site metadata that should be unique for each page

## [v1.2.1] - 2018-09-12

### Changed

- Upgraded `gatsby` to the latest v2 rc
- Upgraded `gatsby-plugin-offline` to the latest v2 rc
- Upgraded `gatsby-plugin-sharp` to the latest v2 rc
- Upgraded `gatsby-remark-images` to the latest v2 rc
- Upgraded `gatsby-source-filesystem` to the latest v2 rc
- Upgraded `gatsby-transformer-remark` to the latest v2 rc

## [v1.2.0] - 2018-09-11

### Changed

- Changed styling to use TailwindCSS

### Added

- `tailwindcss` - For CSS styling
- `purgecss` - To ensure the minimum amount of CSS is downloaded to the user's browser

## [v1.1.1] - 2018-09-09

### Changed

- Upgraded `react` to 16.5.0
- Upgraded `react-dom` to 16.5.0

## [v1.1.0] - 2018-09-07

### Changed

- Upgraded `gatsby` to latest v2 rc
- Upgraded `gatsby-plugin-offline` to latest v2 rc
- Upgraded `gatsby-source-filesystem` to latest v2 rc
- Upgraded `gatsby-transformer-remark` to latest v2 rc
- Upgraded `gatsby-plugin-google-analytics` to latest v2 rc
- Images that have title attributes now show that title as their captions
- Other minor image setting tweaks

### Added

- `gatsby-remark-images` and `gatsby-plugin-sharp` to be able to use images in markdown
- `gatsby-plug-sitemap` for SEO stuff

## [v1.0.2] - 2018-09-06

### Changed

- Updated Gatsby to latest rc
- Updated `gatsby-plugin-offline` to the latest rc
- Upgraded `eslint` from 5.4 to 5.5
- Upgraded `eslint-config-gatsby-standard` from 1.2.2 to 2.0.0
  - Takes care of the deprecation error messages while linting. Yay!

## [v1.0.1] - 2018-09-04

### Changed

- Date format is converted to Zulu time and is displayed in Big Endian style. Today's date would be 2018-09-04 23:02
- Moved draft filter from generator to graphql

## [v1.0] - 2018-09-03

### Added

- Initialized default gatsby v2 project (based on `gatsby-starter-default`)
- License for code created specifically for this site
- eslint and rules for AirBnB style guide and Gatsby
- Testing out an a11y rule for eslint
- `editorconfig` to help with whitespace in code
- `gatsby-source-filesystem` to read markdown files from the filesystem
- `gatsby-transformer-remark` to transform those markdown files to HTML
- `gatsby-remark-prismjs` & `prismjs` to have nice code highlighting
- Existing markdown files from old blog - these are useful for testing the layout and design of the site
- `gatsby-plugin-google-analytics` to continue using Google Analytics

### Changed

- Renamed license for gatsby content to show that it is for the gatsby-created content
- Replaced `gatsby-start-default` branded content in `package.json` to reflect the name and goal of this project
- Renamed JS files that used jsx to have the `.jsx` extension.
- Renamed `.prettierrc` config file to `.prettierrc.json` to remind me of its format
- Removed h1 from header so that only one h1 per page will be available. This is for #a11y
- Allow a "draft: true" in the yml header of a markdown file to ensure that it won't get published

### Removed

- npm-based lock file since this project is using yarn instead

[Unreleased]: https://github.com/ericpoe/ericpoe.com/compare/2.0.0...HEAD
[2.0.0]: https://github.com/ericpoe/ericpoe.com/compare/1.7.0...2.0.0
[1.7.0]: https://github.com/ericpoe/ericpoe.com/compare/1.6.0...1.7.0
[1.6.0]: https://github.com/ericpoe/ericpoe.com/compare/1.5.0...1.6.0
[1.5.0]: https://github.com/ericpoe/ericpoe.com/compare/1.4.1...1.5.0
[1.4.1]: https://github.com/ericpoe/ericpoe.com/compare/1.4.0...1.4.1
[1.4.0]: https://github.com/ericpoe/ericpoe.com/compare/1.3.8...1.4.0
[1.3.8]: https://github.com/ericpoe/ericpoe.com/compare/1.3.7...1.3.8
[1.3.7]: https://github.com/ericpoe/ericpoe.com/compare/1.3.6...1.3.7
[1.3.6]: https://github.com/ericpoe/ericpoe.com/compare/1.3.5...1.3.6
[1.3.5]: https://github.com/ericpoe/ericpoe.com/compare/v1.3.4...1.3.5
[v1.3.4]: https://github.com/ericpoe/ericpoe.com/compare/v1.3.3...v1.3.4
[v1.3.3]: https://github.com/ericpoe/ericpoe.com/compare/v1.3.2...v1.3.3
[v1.3.2]: https://github.com/ericpoe/ericpoe.com/compare/v1.3.1...v1.3.2
[v1.3.1]: https://github.com/ericpoe/ericpoe.com/compare/v1.3.0...v1.3.1
[v1.3.0]: https://github.com/ericpoe/ericpoe.com/compare/v1.2.4...v1.3.0
[v1.2.4]: https://github.com/ericpoe/ericpoe.com/compare/v1.2.3...v1.2.4
[v1.2.3]: https://github.com/ericpoe/ericpoe.com/compare/v1.2.2...v1.2.3
[v1.2.2]: https://github.com/ericpoe/ericpoe.com/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/ericpoe/ericpoe.com/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/ericpoe/ericpoe.com/compare/v1.1.1...v1.2.0
[v1.1.1]: https://github.com/ericpoe/ericpoe.com/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/ericpoe/ericpoe.com/compare/v1.0.2...v1.1.0
[v1.0.2]: https://github.com/ericpoe/ericpoe.com/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/ericpoe/ericpoe.com/compare/v1.0...v1.0.1
[v1.0]: https://github.com/ericpoe/ericpoe.com/releases/tag/v1.0
