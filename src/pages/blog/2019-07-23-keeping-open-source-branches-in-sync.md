---
title: 'Keeping Open-Source Branches in Sync'
date: '2019-07-23T04:15:23.291Z'
categories: 
  - 'programming'
tags:
  - 'open-source'
  - 'git'
---
When working with contributing to open-source software, one typically works from a forked repository of the original repository. Depending on the frequency of updates to the original repository, it is very easy for both repositories to become out-of-sync very quickly.

A strategy that I learned is use inform the local git repository of two different repositories and to manually keep them in sync.

Let's use the [gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby) project as an example. If you follow this project for any length of time, you will notice that it gets updated often throughout the day. As a result, your fork of this repository can become out-of-sync with the original repository quite quickly.

![out-of-sync image](images/upstream-before.png 'Image showing github repository being 4170 commits behind master')

When I started to work with this open-source project, I noticed a documentation error, so I forked the repository into my own before submitting a pull-request to fix that documentation error: [ericpoe/gatsby](https://github.com/ericpoe/gatsby).

I cloned my fork of the project to my local environment: `git clone git@github.com:ericpoe/gatsby.git`.

Right now, my clone is as up-to-date as my fork of the project. However, since I use the Gatsby project for my personal site, I figure that I'll be submitting issues and pull-requests for bugs that I and others find along the way. Therefore, I want to have an easy way to have my fork of the project and the original project by synchronized whenever I work with the source code.

The trick is to think of the original repository as my "upstream" repository and inform my local git environment of this relationship: `git remote add upstream [upstream git URL]` or in this case: `git remote add upstream git@github.com:gatsbyjs/gatsby.git`

To sync the main branch of the two repositories, I can run something like `git pull upstream main-branch` or in this case `git pull upstream master`

I can then update my repository on github by running `git push`.

Now my forked-repository is up-to-date with the original-repository!

![out-of-sync image](images/upstream-after.png 'Image showing github repository being even with master')

Run this from the main branch of the repository before creating a branch to work on the code.

**Caveat:** If I am working on a branch before syncing the two repositories, I should probably commit my changes within that branch and then merge the main-branch into my working-branch: `git merge [main-branch]`, or in this case `git merge master`.
