---
title: TDD Kata
timestamp: 2014-12-22 23:26
tags:
  - kata
  - php
  - phpunit
  - testing
categories: 
  - programming
date: '2014-12-22T00:00:00-0600'
---

## Kata

Kata are a series of movements which, when repeated, migrate mindful action into
muscle memory. An example kata is performed by [Rika Usami](http://youtu.be/iiiznDpoapQ?t=50s)
of Japan during the 2012 World Karate Championship in Paris.

Kata can be thought of in terms of playing an instrument or a craft. During the
warmup before a concert, listen to the musicians. They are playing their scales
and odd passages, they are practicing their kata to get their brains and fingers
in the right place to pull off something difficult and awesome.

_Kata, like scales, are temporary in nature. They are to be practiced, then discarded, then practiced again._

Programming also requires practice; kata are a great way to formalize that practice.

## TDD

Test-Driven Development (aka "TDD") is the practice of writing a test before any
other code is written. Write a test that fails, then write the minimum of code to
pass that test, then write another test that fails, etc. When there are no more
tests to write, then the program is complete. In theory.

The blessing of TDD is that each test is like a public contract: when X is applied, Y shall happen, but
not Z. If a change is made sometime later and the tests still pass, then relief
can be sighed; otherwise, the failed tests right away point out that the recent
change was not appropriate.

The curse of TDD is that it's hard, it takes too much time, quite a few of the
tests are rendered useless over time, and if you start out a project in TDD,
changing direction is rather difficult. <abbr title=" David Heinemeier Hansson">DHH</abbr>
lobbed an anti-TDD bomb in April 2014 with "[TDD is dead. Long live testing.](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html)"

These are all valid points, but as Martin Fowler and Kent Beck also said in
[Is TDD Dead? [Part V &amp; VI]](http://youtu.be/gWD6REVeKW4), TDD forces one to approach
a hard problem one small step at a time; once the hugely difficult problem is
reduced to smaller, easier to understand problems, the difficult bits are easier
to approach and figure out. In the same video above, even DHH says that TDD is
the gateway drug to better practices. Similarly, I have read elsewhere and have
heard from several mentors that TDD is also an important step to take in learning
good programming skills. For instance, learning TDD also forces one to learn and
practice [<abbr title="Single responsibility, Open-closed, Liskov substitution, Interface segregation, and Dependency inversion">SOLID</abbr> principals](http://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29).

I will admit that at work, our codebase is not test-driven. Yet, we do utilize
unit tests for core features and try to ensure 100% code coverage for those tests.
This helps us feel better that changes we make to the core code will not break the
code (or at least not as much) as compared to anxiety we would fee if we did not
have tests in place.

## TDD Kata

Given that Kata help drive difficult movement into muscle memory and that TDD is
beneficial to learning good programming practices, I try to incorporate TDD Kata
into my weekly routine.

I use TDD Kata to help me internalize new skills. My latest TDD kata have helped
me learn to use [Composer](https://getcomposer.org/), [PSR-4](http://www.php-fig.org/psr/psr-4/), [PHPUnit](https://phpunit.de/), and basic <accr title="Object Oriented Programming">OOP</accr>.

Some interesting TDD Kata to attempt can be found at the [Cyber Dojo](http://cyber-dojo.org/).
In a near-future post, I will attempt to walk through the TDD Fizz Buzz Kata.
