---
title: 'Hacktoberfest Prep'
date: '2018-10-02T04:44:40.853Z'
featuredImage_Url: 'images/Hacktoberfest_2018_opengraph_1200x630.png'
featuredImage_Alt: 'Logo for Hacktoberfest 2018'
categories:
  - programming
tags:
  - hacktoberfest
  - git
  - open source
---

![Logo for Hacktoberfest 2018.](images/Hacktoberfest_2018_opengraph_1200x630.png 'Logo courtesy of Hacktoberfest 2018')

The time of [Hacktoberfest](https://hacktoberfest.digitalocean.com/) is upon us! For the entire month of October, every pull request against an open-source repository on Github will count towards one's Hactoberfest rank. Submit at least 5 pull requests and you are eligible to earn a cool t-shirt and, more importantly, you get the experience of helping out an open-source project! Just register your github account on the Hacktoberfest site before the end of October in order to make this month's PRs count. I took part in this in 2016 and 2017 and earned t-shirts both years. The t-shirts are good looking, soft, and comfy.

Hacktoberfest is sponsored this year by [DigitalOcean](https://www.digitalocean.com/), [GitHub](https://github.com/), and [Twilio](https://www.twilio.com).

For projects that I am making a small grammar or spelling fix to, I typically just use the github editor on that repository's file and submit my PR totally within the Github GUI. However, most of my PRs are more in-depth and require forking the repository and working in-depth locally.

## Finding Something Hacktoberfest-worthy

Really, this is an exercise in finding something that you feel comfortable submitting an open-source pull request to. For starters, the easiest updates are those that come organically. When reading open-source documentation, if you find an error or a spot that could use more clarity, submit a pull request! The worst that can happen is that the repository manager says "no."

Sometimes, while using a library or a framework, you might find a bug. Before submitting a bug report, check to see if that bug is already reported and add any additional detail to that bug. Maybe you can fix it while you're at it? If so, pull request!

Specifically for Hacktoberfest, look at your favorite libraries and frameworks on Github and see if they have issues marked with a "hacktoberfest" tag. These are typically good for first-time or inexperienced open-source developers. See if you can fix that bug or implement that feature.

Always look for a file called something like `contributions.md` or a section on how to contribute in the `README` for that project. Following the instructions there will help ensure that your pull request is accepted with the least amount of strain.

Ultimately, Hacktoberfest is a great incentive to get into assisting open-source projects. Enjoy!

## Keeping A Fork Up-To-Date With The Forked Repository

Assume repo is "foo/Bar"

1. Fork the "foo/Bar" repo using the "fork" button on the on the Github site.
1. Clone my fork of the repo in my dev environment
   - `git clone git@github.com:ericpoe/bar.git`
1. Change into the new directory created
   - `cd !$`
1. Add forked repo as my remote upstream repository
   - `git remote upstream git@github.com:foo/bar.git`
1. Create a branch for my contribution
   - `git checkout -b myHappyContribution`

To sync my forked repo with the original repo:

1. `git pull upstream master`
1. `git push` -- pushes to my fork on github

This way, I can keep my local fork up-to-date with the original repository, even if I don't return to it for several months.
