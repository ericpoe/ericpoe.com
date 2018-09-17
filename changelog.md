# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2018-09-16

### Added

- Unique metadata for each page's keywords
- Page's title now appears first in the <title> tag

### Removed

- site metadata that should be unique for each page

## [1.2.1] - 2018-09-12

### Changed

- Upgraded `gatsby` to the latest v2 rc
- Upgraded `gatsby-plugin-offline` to the latest v2 rc
- Upgraded `gatsby-plugin-sharp` to the latest v2 rc
- Upgraded `gatsby-remark-images` to the latest v2 rc
- Upgraded `gatsby-source-filesystem` to the latest v2 rc
- Upgraded `gatsby-transformer-remark` to the latest v2 rc

## [1.2.0] - 2018-09-11

### Changed

- Changed styling to use TailwindCSS

### Added

- `tailwindcss` - For CSS styling
- `purgecss` - To ensure the minimum amount of CSS is downloaded to the user's browser

## [1.1.1] - 2018-09-09

### Changed

- Upgraded `react` to 16.5.0
- Upgraded `react-dom` to 16.5.0

## [1.1.0] - 2018-09-07

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

## [1.0.2] - 2018-09-06

### Changed

- Updated Gatsby to latest rc
- Updated `gatsby-plugin-offline` to the latest rc
- Upgraded `eslint` from 5.4 to 5.5
- Upgraded `eslint-config-gatsby-standard` from 1.2.2 to 2.0.0
  - Takes care of the deprecation error messages while linting. Yay!

## [1.0.1] - 2018-09-04

### Changed

- Date format is converted to Zulu time and is displayed in Big Endian style. Today's date would be 2018-09-04 23:02
- Moved draft filter from generator to graphql

## [1.0] - 2018-09-03

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
