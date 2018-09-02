---
title: 'Last Month in PHP: 2016 January'
tags:
  - php
  - last month in php
  - kcphpug
categories:
  - programming
date: '2016-02-06T11:37:00-0600'
---
From a [KCPUG](http://kcpug.org/) lightning talk given on [03 Feb 2016](http://www.slideshare.net/poeeric/last-month-in-php-january-2016)

January was a relatively light month in PHP. Yet, we saw an exciting new microframework get its first non-beta release.

## PHP Updates

Security and bugfix updates to PHP were released in January. Upgrade if you have
a version less than:

* 7.0.2
* 5.6.17
* 5.5.31

## CMSes

Drupal and WordPress both released point-releases.

* Drupal 8.0.2
  * bug fixes
* WordPress 4.4.1 (**Upgrade!**)
  * 1 Security fix for XSS vulnerability
  * 52 bug fixes

## μFrameworks
### Zend Expressive 1.0
Zend Expressive is a [PSR-7](http://www.php-fig.org/psr/psr-7/) Middleware. It looks pretty interesting and bears further investigation.

**Example:** [sitepoint: How to Build a NASA Photo Gallery with Zend Expressive](http://www.sitepoint.com/build-nasa-photo-gallery-zend-expressive/)

**See:** [Zend Expressive](https://zendframework.github.io/zend-expressive/)

### Lumen 5.2.4
5.2 introduces:

* stateless APIs
* No Sessions
  * This changes authentication

**See:** Lumen 5.2 [release notes](https://lumen.laravel.com/docs/5.2/releases)

### Silex 1.3.5

* Fixed typo

**See:** Silex 1.3.5 [changelog](https://github.com/silexphp/Silex/blob/1.3/doc/changelog.rst)

### Slim 3.1.0

* Adds `getParsedBodyParam()` and `getQueryParam()` to Slim\\Http\\Request
* Adds `App::process()` to allow Slim to run when a Request object and Response object already exist
* [HTTP status code 451](https://en.wikipedia.org/wiki/HTTP_451)

**See:** Slim 3.1.0 [release notes](http://www.slimframework.com/2016/01/08/slim-3.1.0.html)

## Frameworks
Various frameworks had point releases. I'm not sure what changed, so I assume that these are bugfixes.

* Laravel 5.2.12
* Symfony [2.8.2, 2.7.9, 2.6.13, 2.3.37]
* Zend Framework 2.5.3

## Upcoming Conferences
[Sunshine PHP](http://2016.sunshinephp.com/)
Feb 4-6: Miami, FL

[Midwest PHP](http://2016.midwestphp.org/)
Mar 4-5: Minneapolis, MN

[Lone Star PHP](http://lonestarphp.com)
Apr 7-9: Dallas, TX

[php[tek]](https://tek.phparch.com)
May 23-27: St Louis, MO

[Kansas City Developer Conference](http://kcdc.info)
June 22-24 - Kansas City, MO
Call for papers deadline: Feb 12

## NomadPHP
[NomadPHP](http://nomadphp.com) is an online supplement to your in-real-life user group.

Feb 18: 01:00 PM CST

* [The Life of an If Statement](https://nomadphp.com/2015/11/20/2016-02-eu/)
* Anthony Ferrara - [@ircmaxell](https://twitter.com/ircmaxell)

Feb 18: 08:00 PM CST

* [From Idea to Prototype in 50 Minutes with Laravel](https://nomadphp.com/2015/11/20/2016-02-us/)
* Matt Stauffer - [@stauffermatt](https://twitter.com/stauffermatt)

## Next Month's KCPUG

We will have a busy session next month!

* [John Kary](https://twitter.com/johnkary) will present "Rethinking Loops" &mdash; dealing with functional programming in PHP. This is the same talk that he will give at:
  * [Lone Star PHP](http://lonestarphp.com/sessions/#rethinking-loops)
  * [Midwest PHP](http://2016.midwestphp.org/session/rethinking-loops/)

* Joseph Maxwell will present a preview of his OAuth2 talks that he will give at:
  * [Lone Star PHP](http://lonestarphp.com/sessions/#demystifying-oauth2-an-understandable-way-to-approach-connecting-to-other-systems)
  * [php[tek]](https://tek.phparch.com/speakers/#70639)
