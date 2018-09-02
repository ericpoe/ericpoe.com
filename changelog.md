# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased] - yyyy-mm-dd

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

### Changed

- Renamed license for gatsby content to show that it is for the gatsby-created content
- Replaced `gatsby-start-default` branded content in `package.json` to reflect the name and goal of this project
- Renamed JS files that used jsx to have the `.jsx` extension.
- Renamed `.prettierrc` config file to `.prettierrc.json` to remind me of its format
- Removed h1 from header so that only one h1 per page will be available. This is for #a11y
- Allow a "draft: true" in the yml header of a markdown file to ensure that it won't get published

### Removed

- npm-based lock file since this project is using yarn instead
