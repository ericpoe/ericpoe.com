---
title: 'Last Month in PHP: 2016 March'
date: '2016-04-04T21:19:00Z'
categories:
  - programming
tags:
  - kcphpug
  - last-month-in-php
  - php
---

From a [KCPUG](http://kcpug.org/) lightning talk being given on [06 Apr 2016]().

## BASH COMING TO WINDOWS!

Yes, Microsoft is adding the linux Bash shell to Windows.

- Uses Ubuntu user mode binaries
- So, (maybe?) in the Windows Command Line: `apt-get install nginx php7-fpm mysql-server php7-mysql`

PHP development on Windows is about to get much better!

**See:** [MSDN: BASH Running in Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about)

## PHP Updates

Security and bugfix updates to PHP were released TWICE in March. Upgrade!

- 7.0.5 - **Upgrade!**
  - Security fixes
  - Bug fixes
- 5.6.20 - **Upgrade!**
  - Security fixes
  - Bug fixes
- 5.5.34 - **Upgrade!**
  - Security fixes
  - Bug fixes

## Composer

Composer [v1.0.0-beta1](https://github.com/composer/composer/releases/tag/1.0.0-beta1) & [v1.0.0-beta2](https://github.com/composer/composer/releases/tag/1.0.0-beta2) were released

- Many new things!
- Including:
  - Disables non-secure protocols
  - `prohibits` / `why-not` command to show what blocks an upgrade to a given _package:version_ pair
  - Added `--interactive` / `-i` to the `update` command, which lets you pick packages to update interactively

## CMSes

### Drupal 8

Drupal 8.0.5

- Maintenance release
  - No changes worthy of updating the [CHANGELOG.txt](http://cgit.drupalcode.org/drupal/plain/core/CHANGELOG.txt)

## μFrameworks

### Slim 3

Slim 3.2.1 & 3.2.2

- Bugfix: Do not use `DefferedCallable` in route callable.
  - **See:** Slim Framework 3.2.1 [release notes](http://www.slimframework.com/2016/03/01/slim-3.2.1.html)
- Bugfix: Make `$file` public in `UploadedFile`
  - **See:** Slim Framework 3.2.2 [release notes](http://www.slimframework.com/2016/03/05/slim-3.2.2.html)

Slim 3.3.0

- More closely aligns with [PSR-7](http://www.php-fig.org/psr/psr-7/)
  - **See:** Slim Framework 3.3.0 [release notes](http://www.slimframework.com/2016/03/10/slim-3.3.0.html)

## Frameworks

### Laravel

- Laravel 5.2.27
- Laravel 5.2.24
- Laravel 5.2.23
  - Adds `in_array` validation
  - Callback in `Arr::first()` & `Arr::last()` is now optional
  - Can now specify more than 1 middleware
  - Adds some interesting changes to Blades
  - **See:** [Mohamed Said: What's new in laravel 5.2.23](http://themsaid.github.io/laravel-5-2-23-20160305/)

### Symfony

- Symfony [3.0.4, 2.8.4, 2.7.11, 2.3.39]
  - Mostly bugfixes
- [Virtual Symfony Hackday](http://symfony.com/blog/virtual-symfony-hack-day-march-12th) was held on 17 March
- Announced in March: [Symfony Polyfill](http://symfony.com/blog/new-in-symfony-2-8-polyfill-components)

### Zend

- No updates for ZF 2.5
- Lots of work for upcoming ZF3!
  - **See:** the [Zend Framework 3 Update for 2016-03-24](http://framework.zend.com/blog/2016-03-24-zf3-update.html)

## PHP: The Right Way

- Added a Brazilian Portuguese translation
- **Note:** Every open-source project can use your help with documentation. What are you waiting for?

## Upcoming Conferences

[Lone Star PHP](http://lonestarphp.com)  
Apr 7-9: Dallas, TX

- KCPHP Speakers!

[Day Camp for Developers](https://daycamp4developers.com) - Modern PHP  
Apr 22: Online

[DrupalCon](https://events.drupal.org/neworleans2016)  
May 9-13: New Orleans, LA

- KCPHP Speaker!

[php[tek]](https://tek.phparch.com)  
May 23-27: St Louis, MO

- KCPHP Speaker!

[200 OK](http://200ok.us)  
June 3: Tulsa, OK

[Kansas City Developer Conference](http://kcdc.info)  
June 22-24 - Kansas City, MO

- 4 PHP talks
- KCPHP speakers!

[php[cruise]](https://cruise.phparch.com)  
July 17-24 - Bahamas

[Laracon US](http://laracon.us/)  
July 27-29 - Louisville, KY

## NomadPHP

[NomadPHP](http://nomadphp.com) is an online supplement to your in-real-life user group.

April 21: 01:00 PM CDT

- [Docker for PHP Developers](https://nomadphp.com/2016/01/25/docker-for-php-developers/)
- Chris Tankersley - [@dragonmantank](https://twitter.com/dragonmantank)

April 21: 08:00 PM CDT

- [Expressive Microservice Framework Blastoff](https://nomadphp.com/2016/01/25/expressive-microservice-framework-blastoff/)
- Adam Culp - [@AdamCulp](https://twitter.com/AdamCulp)

## Next Month's KCPUG

Joseph Maxwell will be presenting an update of his excellent February talk: "Writing Better Code with the New PHP 7"!

- To be presented at [php[tek]](https://tek.phparch.com) in May!
