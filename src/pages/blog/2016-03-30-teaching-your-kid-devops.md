---
title: Teaching your kid Dev-Ops
tags:
  - docker
  - learning
  - teaching
  - parenting
  - dev-ops
  - minecraft
categories: 
  - sysadmin
date: '2016-03-30T22:56:00-05:00'
draft: true
---

My kid, <abbr title="also known as">aka</abbr> "Elder Munchkin," loves Minecraft. When I say "loves," I mean that she obsesses over it. For this kid, Minecraft is a social activity; she and her friends will get together on Google Hangouts and chat or strategize over their next mission.

I love seeing this kid embrace her inner-nerd.

She approached me last weekend and asked if she could have [Minecraft Realms](https://minecraft.net/realms). At $7.99/mo for something out of my control, I was not feeling very amenable to doing so. I then looked at what Minecraft Realms is: a personal Minecraft server.

I told her my reasons for not wanting to spend $8/mo on Minecraft ("money doesn't grow on trees, donchaknow!") and asked her if she'd like to just build a server of her own.

This led us down a path of discovery and learning. This became a time to teach my kid some elements of dev-ops.

## Step 1: Introduce the Path

Before doing anything, I thought about what steps we would need to take in order to get a Minecraft server up and running for her and her friends to enjoy. I discussed those steps with her and let her ask any questions along the way.

1. Build the server in Docker
2. Make the data persist between reboots
3. Auto-start the server when booting my computer
4. Poke a hole in the firewall (port-forwarding)
5. Set up a dynamic DNS service so her friends could access the server by name rather than by dynamic IP address (which can change monthly).

We worked on this over the course of several evenings after homework was completed. Each evening started with a recap of what we had done and what remains to be done.

## Step 2: Build the server

I chose to build the server in Docker because I've been learning Docker and I knew that it would be much easier to work with than building from scratch.

This process took several evenings, largely because it was a process of discovery.

We opted for the [`itzg/minecraft-server`](https://hub.docker.com/r/itzg/minecraft-server/) docker image since it comes with good documentation, has an active github page, and appears to update the Minecraft server version as soon as Mojang releases a new version.

I started building the server in docker-compose, which certainly made it easier to explain the different aspects of the Minecraft server to Elder Munchkin. After each modification to the server, she would fire up her Minecraft client and test it out. This way, we could customize it for her needs.

One of the customizations we made was to set up Op/Administrator players. We started out with just her as an Op and then added a friend of hers as an Op. We then added her other Minecraft friends to the user whitelist.
