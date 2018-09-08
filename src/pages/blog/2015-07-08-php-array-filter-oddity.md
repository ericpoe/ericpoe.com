---
title: PHP's Array_Filter Oddity
tags:
    - php
    - community
categories:
    - programming
date: '2015-07-08T22:42:00Z'
---
I was studying the [`array_filter`](http://php.net/manual/en/function.array-filter.php) in PHP and was enjoying coming up with a test that could help me learn better `array_filter` magic. For instance, to filter all words whose first letter is a vowel, I created this PHPUnit test:

```php
public function testFilterVowelWords()
{
    $vowel = function ($word) {
        $vowels = ["a", "e", "i", "o", "u"];
        return in_array($word[0], $vowels);
    };

    $words = ["apple", "baby", "cookie", "danger", "element", "fountain", "grape"];

    $vowelWords = array_filter($words, $vowel);

    $this->assertEquals(["apple", "element"], array_values($vowelWords));
}
```

So, yay `array_filter`! But wait, what's this? There's an optional flag for `array_filter` that was introduced in PHP 5.6? It allows one to filter by array key, or if one is completely nuts, by both array value and array key. Woah.
<img src="https://s3.amazonaws.com/giphymedia/media/yUIktdHUIamcg/giphy.gif">

So, if one were to filter by key, easy-peasy. The flag is `ARRAY_FILTER_USE_KEY`:

```php
public function testFilterVowelWordsByKey()
{
    $vowel = function ($key) {
        $vowels = ["a", "e", "i", "o", "u"];
        return in_array($key, $vowels);
    };

    $words = ["a" => "apple", "b" => "baby", "c"=>"cookie", "d"=>"danger", "e"=>"element", "f"=>"fountain", "g"=>"grape"];

    $vowelWords = array_filter($words, $vowel, ARRAY_FILTER_USE_KEY);

    $this->assertEquals(["a"=>"apple", "e"=>"element"], $vowelWords);
}
```

So, if one wanted to filter by key AND value, the flag would be `ARRAY_FILTER_USE_BOTH`, right?

```php
public function testFilterVowelWordsByKeyAndValue()
{
    $strange = function ($key, $value) {
        $vowels = ["a", "e", "i", "o", "u"];

        if (in_array($key, $vowels)) {
            return true;
        }

        return (in_array($value[1], $vowels));
        }
    };

    $words = ["a" => "apple", "b" => "baby", "c"=>"cookie", "d"=>"danger", "e"=>"element", "f"=>"fountain", "g"=>"grape"];

    $vowelWords = array_filter($words, $strange, ARRAY_FILTER_USE_BOTH);

    $this->assertEquals(["a"=>"apple", "b"=>"baby", "c" => "cookie", "d" => "danger", "e" => "element", "f" => "fountain"], $vowelWords);
}
```

Yet, epic fail!

The `ARRAY_FILTER_USE_BOTH` flag requires the order: `value` then `key` NOT `key` then `value`

```php
public function testFilterVowelWordsByKeyAndValue()
{
    $strange = function ($value, $key) {
        $vowels = ["a", "e", "i", "o", "u"];

        if (in_array($value[1], $vowels)) {
            return true;
        }

        return (in_array($key, $vowels));
        }
    };

    $words = ["a" => "apple", "b" => "baby", "c"=>"cookie", "d"=>"danger", "e"=>"element", "f"=>"fountain", "g"=>"grape"];

    $vowelWords = array_filter($words, $strange, ARRAY_FILTER_USE_BOTH);

    $this->assertEquals(["a"=>"apple", "b"=>"baby", "c" => "cookie", "d" => "danger", "e" => "element", "f" => "fountain"], $vowelWords);
}
```

Yay! This test passes! But, what the heck? Why `value` then `key`? Every time we read about `key => value` pairs, it's in the order of `key` then `value`. Yet, this is `value` then `key`. What gives?

I looked into this. I couldn't find any [RFCs](https://wiki.php.net/rfc) recommending this order. I even checked PHP internals discussions and saw the question raised of [which should come first, key or value](http://marc.info/?l=php-internals&m=137159339704961&w=2), but the question doesn't get answered. Eventually, we get a statement of (paraphrased)["Hey, having flags for using key or using both key & value is great, I'll add it."](http://marc.info/?l=php-internals&m=138023845322301&w=2). The [pull request](https://github.com/php/php-src/pull/287), though it contains discussion on adding this flag, doesn't contain any discussion on parameter order. The [source code](https://github.com/php/php-src/blob/master/ext/standard/array.c#L4803) does not contain enough documentation to give an inkling as to why this is.

I struggled to figure out a good reason for `value` to come before `key` when using the `ARRAY_FILTER_USE_BOTH` flag. In desperation, I reached out to the PHP Internals dev who implemented this feature, Tjerk Meesters (aka '[datibbaw](https://twitter.com/datibbaW)'). As an exemplar of where the amazing PHP community shines, Tjerk responded within minutes with helpful background information on this feature. First, this feature was designed to not break existing implementations of `array_filter`. Adding `key` as the second parameter seemed to be the most polite way to do this. Secondly, this is the same order as used in JavaScript's [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). Boom.

The way I justify the order is by looking at the original intent of `array_filter` -- it was designed to filter an array based on the values contained within that array. So, value is first and foremost the primary thing this function checks against; the key is merely secondary. Therefore, when using the `ARRAY_FILTER_USE_BOTH` flag, the order of parameters for the callback will be `value` and then `key`.

If I were to treat this function as a consumer that turns food into another product, the main food this function eats is the value platter. For dessert, it might choose to eat a key lime pie. Or it might decide to order the full course and ask for both the value platter with dessert.

What had seemed like an oddity at first now makes sense in the right frame of mind. If you use `array_filter`, remember that it is all about the array `value`. If you want to include the `key` in the filter, know that `key` is always secondary to the original intent.
