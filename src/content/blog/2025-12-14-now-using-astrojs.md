---
title: Now Using Astro
date: '2025-12-15T02:28:56Z'
categories:
  - programming
  - tech
tags:
  - ai
  - ai-agent
  - astro
  - codex
  - gatsbyjs
  - meta
  - netlify
  - tailwindcss
---

In 2023, [GatsbyJS was purchased by Netlify](https://www.gatsbyjs.com/blog/gatsby-is-joining-netlify/). I think this was a great acquisition by [Netlify](https://www.netlify.com/); however, most of the Gatsby updates since the have been automated patches from [gatsbybot](https://github.com/gatsbybot). Looking at the [GatsbyJS pull requests](https://github.com/gatsbyjs/gatsby/pulls), it appears that there is some movement from meat bots, but not much has been updated by a human in the main branch for over a year. The project appears to be _mostly-abandoned_, as [Miracle Max](https://princessbride.fandom.com/wiki/Miracle_Max) would describe it.

Things that I really liked about GatsbyJS:

- I learned ReactJS and JSX
- I learned TailwindCSS
- It generated a very fast static site that consistently achieved high performance, SEO, and Accessibiliity marks on [Lighthouse](https://developer.chrome.com/docs/lighthouse)

Things that I really like about Netlify:

- Very inexpensive (free!) hosting for the basic tier
- Easy to test and deploy changes from within associated github pull-requests

It was with sadness that I began to look for alternatives to Gatsby. One option that I found again and again was [Astro](https://astro.build/). It offers many of the same features as Gatsby and has a nice [migration page](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/) that also shows some of the differences and similarities.

I have been pondering the switch for several months.

Meanwhile, at work we have been investigating <accr title="Artificial Intelligence">AI</accr> for use in various projects as well as figuring out how to use chat agents to assist with making code changes. Largely, AI seems to be a mystery tool looking for a problem to fix. A coworker had introduced me to using [Codex](https://developers.openai.com/codex/) as a coding agent. An agent is like having a junior developer do some coding and investigation for you -- you still have to review the code and guide them out of the weeds.

I tested Codex for helping me with a feature at work and, with some gentle coaxing and cajoling, it eventually did the required job. It also found some areas I had forgotten about in our 12+ year codebase.

I decided to try Codex for helping me migrate this site from using Gatsby to using Astro. It handled that in about an hour. Not satisfied, I then used it to add unit and e2e tests and added [MCP](https://modelcontextprotocol.io/docs/getting-started/intro) server connections for [Astro MCP](https://docs.astro.build/en/guides/build-with-ai/) and [Playwright MCP](https://github.com/microsoft/playwright-mcp). I also added features I had been considering for a while:

- Theme switcher (light vs dark mode), based on a light switch:
  - Down to turn off the lights (dark mode)
  - Up to turn them on (light mode)
- Visible tags, each with their own index page
- Menu based on categories, each with their own index page

This was fun and took a few afternoons to tweak and fiddle; however, the huge drawback for me is that I learned very little from the experience -- I am more dependent on the AI Agent now than when I had started. I will need to read up on Astro and practice with code in order to learn how the various parts can be manipulated and work together.
