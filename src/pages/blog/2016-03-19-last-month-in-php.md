---
title: 'Last Month in PHP: 2016 February'
tags:
  - php
  - last month in php
  - kcphpug
categories:
  - programming
date: '2016-03-19T20:15:00-06:00'
---

From a [KCPUG](http://kcpug.org/) lightning talk given on [02 Mar 2016](http://www.slideshare.net/poeeric/last-month-in-php-february-2016-59027277)

## PHP Updates

Security and bugfix updates to PHP were released in February. Upgrade if you have
a version less than:

- 7.0.3
  - Added [HTTP 451](https://en.wikipedia.org/wiki/HTTP_451)
- 5.6.18
  - Added HTTP 451
- 5.5.32

## CMSes

Drupal released security updates. **Upgrade!**  
WordPress released a security update. **Upgrade!**

- Drupal 8.0.4
- Drupal 7.4.3
- Drupal 6.3.8
  - Officially the last version of 6.x ever.
  - [EOL on Feb 24](https://www.drupal.org/drupal-6-eol)
- [WordPress 4.4.2](https://wordpress.org/news/2016/02/wordpress-4-4-2-security-and-maintenance-release/)
  - 2 Security fixes
  - 17 bug fixes

## μFrameworks

### Slim 3.2

- Support the `hostOnly` cookie flag
- Write to the PHP error log if `displayErrorDetails` is false to make it easier to find out what’s gone wrong!
- Support PHP 7+ errors in the same way that Exceptions are handled.

**See:** Slim Framework 3.2 [release notes](http://www.slimframework.com/2016/02/25/slim-3.2.0.html)

## Frameworks

Various frameworks had point releases. I'm not sure what changed, so I assume that these are bugfixes.

- Laravel 5.2.13
  - fixes a bug that can cause `Mail::queue` to send stale view data when using daemon queue workers.
- Symfony [3.0.3, 2.8.3, 2.7.10, 2.3.38]
- Zend Framework
  - No updates for ZF 2.5
  - Lots of work towards ZF 3 in Q3!
    - **See:** the [ZF3 Roadmap](http://framework.zend.com/blog/announcing-the-zend-framework-3-roadmap.html)

## Laravel Homestead

- Homestead 5.2
  - No version change
  - Added [support for MariaDB](https://laravel.com/docs/5.2/homestead#installing-mariadb)

## PHP: The Right Way

- PHP on Windows:
  - Added a [Windows setup resource](http://www.phptherightway.com/#windows_setup) (OpenServer)
  - Chris Tankersley’s blog post about [which tools he uses in Windows](http://ctankersley.com/2015/07/01/developing-on-windows)
- Added an example of a [boolean cast in an if-statement](http://www.phptherightway.com/pages/The-Basics.html#if-statements)
- Added a good idea to keep in mind when [committing configuration files](http://www.phptherightway.com/#configuration_files)
- A few grammar and word-choice updates.
  - **Note:** Every open-source project can use your help with documentation. What are you waiting for?

## Upcoming Conferences

[Midwest PHP](http://2016.midwestphp.org)  
Mar 4-5: Minneapolis, MN

- KCPHP Speaker!

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

## NomadPHP

[NomadPHP](http://nomadphp.com) is an online supplement to your in-real-life user group.

Mar 24: 01:00 PM CST

- [Asynchronous Awesome – Task Management in PHP](https://nomadphp.com/2015/12/18/asynchronous-awesome-task-management-in-php/)
- Eric Mann - [@ericmann](https://twitter.com/ericmann)

Mar 24: 08:00 PM CST

- [Amazon SimpleDB](https://nomadphp.com/2015/12/18/amazon-simpledb/)
- Eli White - [@EliW](https://twitter.com/EliW)

## Next Month's KCPUG

We're looking for speakers!
