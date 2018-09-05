---
title: 'GatsbyJS: Using a New Static Site-Builder'
tags:
  - gatsby
  - react
  - a11y
categories:
  - programming
  - colophon
date: '2018-09-03T22:30:52-05:00'
---

I had been searching for a new static-site generator for some time. I was delving into [Grav](https://getgrav.org/), which is more of a flat-file CMS than a static-site generator and is pretty awesome. Unfortunately, I couldn't make Grav work for my needs.

One of the things that I'd like to do is provide my source-code and source-documents in the same git repo so that I can push text updates and site updates (UI, a11y, themes, etc) via git.

A month or so ago, I was listening to the [Changelog Podcast](https://changelog.com/podcast/306) episode #306, and it was all about [Gatsby](https://www.gatsbyjs.org/) as a static-site generator built with [React](https://reactjs.org/). Things were clicking into place and I knew that I just had to try it out.

When I was home, I ran through the excellently written [tutorial](https://www.gatsbyjs.org/tutorial/), then started building a site using the ["Getting Started" documentation](https://www.gatsbyjs.org/docs/). I had fleshed a few ideas in this new site, like using accesssability-first, using a strict linter, and a few other minor details. Then Gatsby v2 went from being beta to release-candidate, so I decided to jump ship and start fresh as a v2 site.

Migrating my old site's content to Gatsby was fairly easy since the old content was already in [Markdown](https://daringfireball.net/projects/markdown/) with a yaml header. I just needed to reformat my dates-of-publication to use a consistent timestamp style and a few other minor details.

This initial view of the site is very plain, but I plan to update and upgrade fairly regularly. What you see is not its final form in my head. More to come!

I expect that I'll be writing more about Gatsby and about the migration.
