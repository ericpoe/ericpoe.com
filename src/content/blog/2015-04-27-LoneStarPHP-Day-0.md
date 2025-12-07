---
title: 'Lone Star PHP 2015: Day 0'
date: '2015-04-27T19:06:00Z'
categories:
  - programming
tags:
  - conferences
  - learning
  - php
---

The first day of Lone Star 2015 was devoted to training. The workshop track I took was geared towards unit testing.

## Getting Started with PHPUnit

- [Matt Frost](http://shortwhitebaldguy.com/)
- Twitter: [@shrtwhitebldguy](https://twitter.com/shrtwhitebldguy)
- [Slides](http://www.slideshare.net/mfrost503/getting-startedphp-unit)

One reason I took this workshop was so that I could become more familiar with mocks. I had a mental block when it comes to mocks and had a hard time seeing their value. After taking this workshop and talking about mocks with Matt, I can see and appreciate their value. Mock the things we don't directly test (ex. database connections, sql queries, filesystem i/o, etc) to speed up the individual unit tests. Mock the things we don't directly control (ex. 3rd-party API, access to another server on our network, etc) since we don't want to fail a test due to a temporary connection error.

What I loved about this workshop was the easy-going manner in which Matt got us to embrace unit testing and mocking. Matt even provided a [git repo](https://github.com/mfrost503/phpunit-tutorial) for us to clone in order to get started on the fun part of the workshop. Mocking was definitely covered in the interactive part of the workshop.

Unfortunately, our getting started on the interactive portion of the workshop was delayed due to poor wifi signal. By the time most of us were able to get the git repo cloned and run `composer install`, we only had time to do one of the two mocking exercises. Yet, since I still have the repo cloned on my machine, there's no reason I shouldn't be able to finish the workshop at my leisure.

## Wax On, Wax Off: Coder Dojo

- [Yitzchok Willroth](https://coderabbi.github.io/)
- Twitter: [@coderabbi](https://twitter.com/coderabbi)
- Slides unavailable

I have [done kata](/blog/2014/12/22/a-tdd-fizz-buzz-kata) before and am a proponent of using them to strengthen knowledge and skills, so this was a workshop I had mentally signed up for as soon as I heard it was being offered.

Rabbi Yitzchok Willroth (aka "CodeRabbi") leads his audience with gentle enthusiasm through an intellectual exercise replete with philosophy and references to psychological studies. During this workshop, Coderabbi had a few friends (luminaries of the PHP community, really) float around to offer guidance to the perplexed during each kata exercise. Their assistance was much appreciated.

The kata we worked on was [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). We did not have the remainder of the workshop to work on this kata. Instead, we had 30 minutes (you read that right) to work on it. Since this is not something one can learn the rules to and code in a sitting, this seemed unfair -- like being told that the [Couch-to-5K](http://www.coolrunning.com/engine/2/2_3/181.shtml) program we were going to follow is to get off the couch and then run 5 kilometers in 30 minutes. As you can imagine, the beginning runner will not complete 5K in 30 minutes, but eventually will with repeated practice. So, too, can one eventually completely code the Game of Life in 30 minutes with repeated practice. What seemed unfair initially, was really a challenge to us to improve, continuously.

One aspect of this workshop that I enjoyed was that at the end of every 30 minute sprint, we were to discard our previous work and start fresh, but with a new constraint to keep our minds sharp. So the second sprint's constraint was to pair up with someone else and see what we could do together. After 30 minutes, the constraint was to make the Cell or Organism (whatever we called it) class not maintain state.

There were times in these kata exercises in which I felt frustrated or angry. Good! For an intellectual exercise, this is the equivalent to feeling muscle strain and soreness in a weight-resistance exercise.

My first pair-up was with a guy who wanted to do the kata in object-oriented javascript and use HTM5 Canvas. At a PHP conference. Yet, once I embraced that he had a better plan of attack than I did, I enjoyed the learning process of watching someone code in a manner that I do not. In that instance, I was not a good pair-partner since I had nothing to contribute regarding Canvas nor from-scratch OOJS. Yet it was a good exercise.

I enjoyed the intellectual exercise of making the Cell Class stateless in that it gave my pair-partner and me the opportunity to discuss what that meant and how to deal with that constraint. We didn't end up with more than an incomplete sketch (in the form of code), but it got our brain juices flowing.

I plan to play with this kata some more on my own and will add additional rules to perhaps mimic competing organisms in the same space. Or, what if one of these organisms has a completely foreign set of rules (like, perhaps cancer cells)?

We started with a Composer-based [PHPUnit skeleton](https://github.com/coderabbi/coder-dojo) and a [complicated kata](http://www.codingdojo.org/cgi-bin/index.pl?action=browse&diff=1&id=KataGameOfLife). We ended up with a newfound respect for the squishy gray stuff between our ears.

## Conclusion

This was the first year that Lone Star PHP had a day devoted to training. The problems we all shared with wifi were frustrating, but overcome personally by my attendee-coworker with a call to our IT department to turn on the ability to hotspot our phones (thanks, Darren!). A glance at all the [Wifi access points](https://twitter.com/sdawncasey/status/589097774852935680) at the conference center showed that we were not the only ones to do this. But really, for the workshops, wifi wasn't important except for at the beginning of each workshop so we could clone git repos and run `composer install`.

The night before the workshop, I had built a vagrant box exclusively for use at the conference. [Juan Treminio](https://twitter.com/juantreminio)'s (a speaker at Lone Star PHP 2014!) [Puphpet](https://puphpet.com/) tool proved to be invaluable for this purpose. Had I been aware of the need to clone git repos and get the required components installed via composer, I would have done so ahead of time.

In short, the workshops were great, yet too much time was wasted by all in doing something that takes maybe a minute on the office or hotel wifi but takes for-frikkin-ever on a shared conference wifi. I would like to see more notice next time for required environments so we can hit the ground running. The topics were great, and I would have loved to have been able to attend them all!
