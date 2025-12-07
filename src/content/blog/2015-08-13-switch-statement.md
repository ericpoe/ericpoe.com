---
title: 'Bite of PHP: Switch Statement'
date: '2015-08-13T00:37:00Z'
categories:
  - programming
tags:
  - bite-of-php
  - learning
  - php
---

The "switch" statement within various languages, contains a similar structure. This makes the [PHP switch](http://php.net/manual/en/control-structures.switch.php) statement familiar.

A failing example of PHP's switch statement was brought up yesterday at work. Someone asked why the expected responses to this were not received.

```php
<?php

$convertQ = function ($str) {
    switch ($str) {
        case 0:
            return 'no';
        case 'No':
            return 'no';
        case 1:
            return 'yes';
        case 'Yes':
            return 'yes';
        case 'Unsure':
            return 'maybe';

        default:
            throw new \InvalidArgumentException('Unaccounted for value for questionnaire field: ' . $str);
    }
};

var_dump($convertQ(0)); // expect 'no', get 'no'
var_dump($convertQ('No')); // expect 'no', get 'no'
var_dump($convertQ(1)); // expect 'yes', get 'no'
var_dump($convertQ('Yes')); // expect 'yes', get 'no'
var_dump($convertQ('Unsure')); // expect 'maybe', get 'no'
var_dump($convertQ('a')); // expect thrown error, get 'no'
```

(see: [3v4l.org](http://3v4l.org/Qdblq))

There are several problems with this switch statement. The first being that a classic switch statement utilizes fall-through when the responses are the same. So, in this case, we can refactor this switch statement and get the same responses via:

```php
<?php

$convertQ = function ($str) {
    switch ($str) {
        case 0:
        case 'No':
            return 'no';

        case 1:
        case 'Yes':
            return 'yes';

        case 'Unsure':
            return 'maybe';

        default:
            throw new \InvalidArgumentException('Unaccounted for value for questionnaire field: ' . $str);
    }
};

var_dump($convertQ(0)); // expect 'no', get 'no'
var_dump($convertQ('No')); // expect 'no', get 'no'
var_dump($convertQ(1)); // expect 'yes', get 'no'
var_dump($convertQ('Yes')); // expect 'yes', get 'no'
var_dump($convertQ('Unsure')); // expect 'maybe', get 'no'
var_dump($convertQ('a')); // expect thrown error, get 'no'
```

(see: [3v4l.org](http://3v4l.org/hSXPS))

The second problem with this switch statement is that [PHP switch statements use loose comparison](http://php.net/manual/en/control-structures.switch.php), at least as of PHP 7.0 alpha 3. To correct for this, we should try the following:

```php
<?php

$convertQ = function ($str) {
    switch ($str) {
        case '0': // was 0, is now '0'
        case 'No':
            return 'no';

        case '1': // was 1, is now '1'
        case 'Yes':
            return 'yes';

        case 'Unsure':
            return 'maybe';

        default:
            throw new \InvalidArgumentException('Unaccounted for value for questionnaire field: ' . $str);
    }
};

var_dump($convertQ(0)); // expect 'no', get 'no'
var_dump($convertQ('No')); // expect 'no', get 'no'
var_dump($convertQ(1)); // expect 'yes', get 'yes'
var_dump($convertQ('Yes')); // expect 'yes', get 'yes'
var_dump($convertQ('Unsure')); // expect 'maybe', get 'maybe'
var_dump($convertQ('a')); // expect thrown error, get error thrown
```

(see [3v4l.org](http://3v4l.org/Y8kdD))

As can be seen, this switch statement is the same as the following. I find the switch statement in this case a slightly less clear than the if-statement.

```php
<?php

$convertQ = function ($str) {
    if ('No' === $str || '0' == $str) {
        return 'no';
    }

    if ('Yes' === $str || '1' == $str) {
        return 'yes';
    }

    if ('Unsure' === $str) {
        return 'maybe';
    }

    throw new \InvalidArgumentException('Unaccounted for value for questionnaire field: ' . $str);
};

var_dump($convertQ(0)); // expect 'no', get 'no'
var_dump($convertQ('No')); // expect 'no', get 'no'
var_dump($convertQ(1)); // expect 'yes', get 'yes'
var_dump($convertQ('Yes')); // expect 'yes', get 'yes'
var_dump($convertQ('Unsure')); // expect 'maybe', get 'maybe'
```

(see [3v4l.org](http://3v4l.org/p6901))

I would like to see the switch statement use strict coupling to be useful in this use-case. I have not yet run into a time when the switch-statement is more useful than the if-statement.
