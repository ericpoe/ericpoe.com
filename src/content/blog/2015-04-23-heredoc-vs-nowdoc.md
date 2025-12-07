---
title: 'Bite of PHP: Heredoc vs. Nowdoc'
tags:
  - php
  - learning
categories:
  - programming
  - Bite of PHP
date: '2015-04-23T07:42:00Z'
---

## Heredoc

Heredoc will define a string of text in a what-you-see-is-what-you-mean type
of format. So, if you want to echo out structured text, like so:

```text
I think that I
    Shall never pay
As much as I
    Have for 2015-04-23
```

You would put it in a heredoc like this:

```php
$today = date('Y-m-d');
$poem = <<<HTML
I think that I
    Shall never pay
As much as I
    Have for $today
HTML;

echo $poem;
```

**output:**

```text
I think that I
    Shall never pay
As much as I
    Have for 2015-04-23
```

Notice that heredoc can behave like a template and parse any PHP contained within.

Test it out on [3v4l.org](http://3v4l.org/GZl9Z).

## Nowdoc

Nowdoc will define a string of text in a what-you-see-is-what-you-get type of format. So, if you want to show the above example EXACTLY as written, put it in a nowdoc block.

```php
$today = date('Y-m-d');
$poem = <<<'HTML'
I think that I
    Shall never pay
As much as I
    Have for $today
HTML;

echo $poem;
```

**output:**

```text
I think that I
    Shall never pay
As much as I
    Have for $today
```

Test it out on [3v4l.org](http://3v4l.org/H1YjU).

Notice that the only difference between the heredoc block and the nowdoc block is that the nowdoc block's name is enclosed within single-quotes. For me, the single-quotes makes it easy to remember which block is literal and which block is rendered, just like the [difference between echoing single-quotes and double-quotes](/blog/2015/03/04/double-vs-single-quote-echo/).
