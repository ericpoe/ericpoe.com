---
title: 'Last Month in PHP: 2015 December'
tags:
  - php
  - last month in php
  - kcphpug
categories:
  - programming
date: '2016-01-06T22:02:00Z'
---

From a [KCPUG](http://kcpug.org/) lightning talk given on [06 Jan 2016](http://www.slideshare.net/poeeric/last-month-in-php-december-2015)

December was a busy month in PHP. A major update to PHP was released,
PHP-FIG approved a new PSR, major CMSes had major releases and/or were patched,
and frameworks had major, minor, and patch releases.

## PHP 7.0.1

PHP 7.0 was released on 3 December and was patched to 7.0.1 two weeks later.
PHP 7 includes many new improvements, including:

- speed!
- Scalar type hinting
- Return type declarations (optional)
- New operators:
  - Null coalescing: `??`
  - Spaceship: `<=>`
- Constant arrays
- Anonymous classes

See [PHP 7 New Features](http://php.net/manual/en/migration70.new-features.php) for more information.

## PSR-6 Caching Interface

PSR-6 ensures a common interface for caching support in PHP, for those libraries and frameworks that utilize it.

- Allows free-standing libraries to support caching of intermediary data without effort.
- Provides a common interface for basic and intermediate-level caching needs.

On 8 December, this passed [amidst controversy](https://www.reddit.com/r/PHP/comments/3vzvxo/psr6_the_vote_for_psr6_has_passed_in_favor_of/).

See [PSR-6](http://www.php-fig.org/psr/psr-6/) for more information.

## WordPress 4.4: "Clifford"

On 8 December, the new version of WordPress, <abbr title "also known as">aka</abbr> "Clifford", was released.

Some of its new features:

- Theme: [Twenty-Sixteen](https://wordpress.org/themes/twentysixteen/)
- Responsive images
- Ability to [embed posts](https://codex.wordpress.org/Embeds) from:
  - Other WordPress sites
  - Other oEmbed providers (reddit, speaker deck, etc)
- [WordPress REST API](https://wordpress.org/plugins/rest-api/) in Core
- Other stuff under-the-hood

WordPress 4.4 requires PHP 5.2.4+, although [PHP 5.6+](https://wordpress.org/about/requirements/) is recommended.

See: [WordPress 4.4 announcement](https://wordpress.org/news/2015/12/clifford/) for more information.

## Drupal 8.0.1

Drupal 8 was released on 19 November and the first patch was released on 2 December.

New features of Drupal 8 include:

- HTML 5
- Out-of-the-box WYSIWYG editing
- Built with modern PHP practices & Libraries:
  - Composer, Symfony2, Guzzle, Twig, etc.
- REST web services

Drupal 8 requires PHP 5.5.9+.

See [Drupal 8](https://www.drupal.org/8) for more information.

## Slim 3.0 Microframework

Slim 3.0 was released on 7 December.

New features of Slim 3.0 include:

- [Dependency Injection Container](http://www.slimframework.com/docs/concepts/di.html)
- [PSR-7 Middleware](http://www.slimframework.com/docs/concepts/middleware.html) support
- [Route callback binding](http://www.slimframework.com/docs/objects/router.html#route-callbacks)
- Simpler codebase

Slim 3.0 requires PHP 5.5+

## Symfony framework

Symfony 3.0 was released on 30 November and was patched to 3.0.1 on 26 December.

New features of Symfony 3 include:

- Locale has been supplanted by Intl
- Simplified security
- Simplified voters
- Monolog Bridge is now [PSR-3](http://www.php-fig.org/psr/psr-3/) compatible
- Changes in the ways Property Access, Routing, Logging, Translator, Twig, Validator, Yaml, Process, & Swiftmailer, Config, & more are used

Symfony 3 requires PHP 5.5.9+

Patches:

- Symfony 3.0.1
- Symfony 2.8.1
- Symfony 2.7.8
- Symfony 2.3.36

## Laravel 5.2 framework

Laravel 5.2 was released on 21 December.

[New features of Laravel 5.2](https://laravel-news.com/2015/12/laravel-5-2-is-released/) include:

- Auth Scaffolding
- Implicit model bindingAppending output from scheduled tasks
- Form array validation
- Collections wildcards
- Database Session Driver
- Middleware Groups
- Rate Limiting
- Eloquent Global Scope

## Virtual Machine: Laravel Homestead 5.2

Now with:

- PHP7
- Composer
- git

Requires PHP 5.5.9+

See: [Homestead 5.2](https://laravel.com/docs/5.2/homestead)

## Upcoming Conferences

[Sunshine PHP](http://2016.sunshinephp.com/)
Feb 4-6: Miami, FL

[Midwest PHP](http://2016.midwestphp.org/)
Mar 4-5: Minneapolis, MN

[Lone Star PHP](http://lonestarphp.com)
Apr 7-9: Dallas, TX

[php[tek]](https://tek.phparch.com)
May 23-27: St Louis, MO

## NomadPHP

[NomadPHP](http://nomadphp.com) is an online supplement to your in-real-life user group.

Jan 21: 01:00 PM CST
[Puli: PHP's Next Package Revolution](https://nomadphp.com/2015/10/16/puli-phps-next-package-revolution/)

- Berhard Schussek - [@webmozart](https://twitter.com/webmozart)

Jan 21: 08:00 PM CST
[Building Better APIs](https://nomadphp.com/2015/10/16/building-better-apis/)

- Mike Stowe - [@mikegstowe](https://twitter.com/mikegstowe)
