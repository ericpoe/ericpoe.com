---
title: 'Git-stash Magic'
date: '2018-09-09T17:57:27Z'
tags:
  - git
categories:
  - programming
---

On July 2nd of this year, I [discovered an amazing `git-stash` option](https://twitter.com/eric_poe/status/1013859363067449345) that lets me see the git-diff between what I currently have and what is in the stash: `git stash show -p`.

Shortly thereafter, Brian Fenton directed me to a great article on `git stash`, _[Useful tricks you might not know about Git stash](https://dev.to/srebalaji/useful-tricks-you-might-not-know-about-git-stash-117e)_. From this article, I also learned about how to stash everything-that-is-different, including files that are still untracked: `git stash save -u`

The more I use git, the more I discover that there are many useful aspects of it that I have yet to learn.
