---
title: A TDD FizzBuzz Kata - Part 2
timestamp: 2015-01-01 22:41
tags:
  - composer
  - kata
  - php
  - phpunit
  - testing
categories: 
  - programming
date: '2015-01-01T00:00:00-0600'
draft: true
---

## Zeroth Movement: Preparation

When starting a new PHP project, I like to start out with a fresh composer.json file. Composer lets me easily add dependencies and utilize namespace autoloading in that project. If the project uses PHPUnit, the PHPUnit dependencies get installed via Composer. (**note:** If you don't already have Composer installed, [download the latest version and install it](https://getcomposer.org/download/) from the official Composer site.)

For the purposes of this TDD Kata, we will be using PHPUnit. Therefore, make sure you add at least the `require-dev` bits to your composer.json file.

`composer.json`:

```json
{
  "name": "ericpoe/fizzbuzz",
  "description": "A Quick TDD FizzBuzz",
  "license": "MIT",
  "authors": [
    {
      "name": "Eric Poe",
      "email": "eric@ericpoe.com"
    }
  ],
  "require": {},
  "require-dev": {
    "phpunit/phpunit": "~4.4"
  }
}
```

Install via `composer install`. You should now have a "vendors" directory in your working directory.

Then we create the test skeleton.

`FizzBuzzTest.php`:

```php
<?php
include ('vendor/autoload.php');

class FizzBuzzTest extends PHPUnit_Framework_TestCase
{

}
```
