---
title: 'Docker and Selenium'
date: '2018-10-23T05:01:01.489Z'
categories:
  - 'programming'
  - 'devops'
tags:
  - 'testing'
  - 'docker'
  - 'selenium'
  - 'codeception'
---

Yesterday, we started our second "hackathon" at work. We divided up into teams of 3 of various skill sets with the goal of building something that would benefit the organization, the overall project, and/or the team. My team wants to create automated acceptance tests. We are two devs and our QA person.

At first, our QA was concerned that we were trying to program her out of a job. Not the case! When we, as devs, send her tickets to QA, we include the steps that we take to ensure that the feature is complete. She, then, doesn't get time to explore the new feature the way our users would. With automated acceptance testing, we could write the tests to ensure that the feature is complete and then she could explore the feature the way our users do. She seemed happy about that prospect.

One thing that convinced me of the need for automated acceptance tests was when we upgraded from PHP 5.4 to PHP 7.1. Half of our application was written in a style that was prominent 15 years ago, and therefore does not contain tests (I've heard it said that legacy code is any code that isn't tested). Our newer code uses modern dev concepts and is pretty well tested. Our modern tests passed when run under the newer version of PHP, but who knows what would fail in our legacy code? We took all of our features and wrote out step-by-step tests to be run manually by our QA. Before we could flip the switch from the ancient PHP 5.4 to the modern PHP 7.1 (and see a 2X speed improvement), our QA had to run through all of those manual tests, as well as do her regular QA job. We need to upgrade to PHP 7.2 or, in a few months, PHP 7.3; what a pain for her and for us to wait for her to run through all of those tests again using a newer version of PHP! Had those tests been written as automated acceptance tests, we'd have seen almost immediately what upgrading would cost. We are wanting to upgrade from Symfony 2 to Symfony 4 in the near future, but do we really want QA to take time away from testing the application to testing it in a new version of our framework? Automated tests to the rescue!

For our [acceptance tests](https://codeception.com/docs/03-AcceptanceTests), we are exploring using [Selenium](https://www.seleniumhq.org/) via [Codeception](https://codeception.com/). One thing that I like about this combination is that our QA and we have been pushing for acceptance testing via Selenium for over a year. Our QA has been studying it via [Pluralsight](https://www.pluralsight.com/search?q=selenium) and other online training options. Something else that this combination has going for it is that Codeception enjoys a large community whose resources we can draw upon.

After watching our QA struggle with getting a local Selenium server built for her studies of Selenium, I was pleased to find a docker image that does the same thing. By typing in `docker run -p 4444:4444 -v /dev/shm:/dev/shm --name selenium-chrome selenium/standalone-chrome` to our terminal, we were able to immediately run any created acceptance tests against it. Because of Docker, building Selenium was not our bottleneck. Instead, we were able to focus on writing acceptance tests that worked.

**Note:** these automated acceptance tests do not replace the need for user-acceptance tests. Our client still has to sign off that this feature behaves the way they want it to!

Among many cool things about running these acceptance tests with Selenium is that any errors will generate a screenshot of the browser in that error state. That helped us to figure out what was wrong with our tests in the first place. We also found out that we could see these tests in action, albeit much more slowly than in "headless" mode, if we used the debug-version of Selenium and used [VNC](https://en.wikipedia.org/wiki/Virtual_Network_Computing) to access the server while it was running the tests. `docker run -p 4444:4444 -p 5902:5900 -v /dev/shm:/dev/shm --name selenium-chrome-debug selenium/standalone-chrome-debug` allows for this. So cool!

Today, we are hoping to get an entire module (a small module) tested via automated acceptance tests. Fingers crossed!
