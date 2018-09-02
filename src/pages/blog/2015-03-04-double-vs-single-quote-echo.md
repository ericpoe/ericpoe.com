---
title: 'Bite of PHP: Double vs Single Quote Echo'
tags:
  - php
  - learning
categories:
  - programming
  - Bite of PHP
date: '2015-03-04T22:50:24-06:00'
---

In PHP, we have two ways of formatting an echo statement: we can choose to
use single-quotes or double-quotes. The choice is less dependent upon which
side of the Atlantic we learned to read and more dependent upon what we hope
to accomplish with echoing that string.

If you want to echo the string without parsing it, use single-quotes. If you
want to parse the string while echoing it, use double-quotes. Observe:

## Single-Quote Example

```php
$greeting = "Howdy";
$audience = "World";
echo '$greeting, $audience';
```

_Output:_ `$greeting, $audience`

## Double-Quote Example

```php
$greeting = "Howdy";
$audience = "World";
echo "$greeting, $audience";
```

_Output:_ `Howdy, World`

What if you want to add a character to the output of one of those variables?
Just enclose the variable in a curly bracket!

## Special Double-Quote Example

```php
$greeting = "Howdy";
$audience = "World";
echo "$greeting, {$audience}!";
```

_Output:_ `Howdy, World!`

Test it out on [3v4l.org](http://3v4l.org/XnKdK).
