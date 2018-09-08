---
title: A TDD FizzBuzz Kata - Part 3
tags:
  - composer
  - kata
  - php
  - phpunit
  - testing
categories: 
  - programming
date: '2015-01-02T11:16:00Z'
draft: true
---

## First Movement: Create the first test

Each test we create is a promise we are making with the program we are building. Inside of each test is an assertion that verifies that the promise is steadfast and true.

Since we are testing a class, we will need to instantiate that class, even if the class doesn't exist yet. We can derive implementation details from this test.

`FizzBuzzTest.php`

```php
<?php
include ('vendor/autoload.php');

class FizzBuzzTest extends PHPUnit_Framework_TestCase
{
    public function test3sAreFizz()
    {
        $fb = new FizzBuzz();
        $this->assertEquals('Fizz', $fb->analyze(3));
    }
}
```

When we run this test, we should expect it to fail.
`php vendor/phpunit/phpunit/phpunit FizzBuzzTest.php` returns a big scary error:

```bash
PHPUnit 4.4.1 by Sebastian Bergmann.

PHP Fatal error:  Class 'FizzBuzz' not found in /Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php on line 8
PHP Stack trace:
PHP   1. {main}() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:0
PHP   2. PHPUnit_TextUI_Command::main() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:62
PHP   3. PHPUnit_TextUI_Command->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:138
PHP   4. PHPUnit_TextUI_TestRunner->doRun() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:186
PHP   5. PHPUnit_Framework_TestSuite->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/TestRunner.php:423
PHP   6. PHPUnit_Framework_TestCase->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestSuite.php:751
PHP   7. PHPUnit_Framework_TestResult->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:722
PHP   8. PHPUnit_Framework_TestCase->runBare() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestResult.php:643
PHP   9. PHPUnit_Framework_TestCase->runTest() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:766
PHP  10. ReflectionMethod->invokeArgs() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881
PHP  11. FizzBuzzTest->test3sAreFizz() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881

Fatal error: Class 'FizzBuzz' not found in /Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php on line 8

Call Stack:
0.0002     230768   1. {main}() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:0
0.0023     559256   2. PHPUnit_TextUI_Command::main() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:62
0.0023     559880   3. PHPUnit_TextUI_Command->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:138
0.0265    2104448   4. PHPUnit_TextUI_TestRunner->doRun() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:186
0.0324    2437144   5. PHPUnit_Framework_TestSuite->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/TestRunner.php:423
0.0341    2454376   6. PHPUnit_Framework_TestCase->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestSuite.php:751
0.0341    2455920   7. PHPUnit_Framework_TestResult->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:722
0.0388    2536744   8. PHPUnit_Framework_TestCase->runBare() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestResult.php:643
0.0416    2648608   9. PHPUnit_Framework_TestCase->runTest() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:766
0.0416    2649368  10. ReflectionMethod->invokeArgs() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881
0.0416    2649456  11. FizzBuzzTest->test3sAreFizz() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881
```

The important part of that error message is the error line before the huge stack trace: `PHP Fatal error: Class 'FizzBuzz' not found in /Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php on line 8`

In other words, we need to create the 'FizzBuzz' class. We will create just enough of the 'FizzBuzz' class to pass this test.

`FizzBuzz.php`:

```PHP
<?php
class FizzBuzz
{

}
```

Then we tell 'FizzBuzzTest.php' where to find this class.

`FizzBuzzTest.php`:

```PHP
<?php
include ('vendor/autoload.php');
include ('FizzBuzz.php'); // The new line

class FizzBuzzTest extends PHPUnit_Framework_TestCase
{
    public function test3sAreFizz()
    {
        $fb = new FizzBuzz();
        $this->assertEquals('Fizz', $fb->analyze(3));
    }
}
```

And run the test again. `php vendor/phpunit/phpunit/phpunit FizzBuzzTest.php`

Another big, scary, error message. This time, it's a little different.

```bash
PHPUnit 4.4.1 by Sebastian Bergmann.

PHP Fatal error:  Call to undefined method FizzBuzz::analyze() in /Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php on line 10
PHP Stack trace:
PHP   1. {main}() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:0
PHP   2. PHPUnit_TextUI_Command::main() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:62
PHP   3. PHPUnit_TextUI_Command->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:138
PHP   4. PHPUnit_TextUI_TestRunner->doRun() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:186
PHP   5. PHPUnit_Framework_TestSuite->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/TestRunner.php:423
PHP   6. PHPUnit_Framework_TestCase->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestSuite.php:751
PHP   7. PHPUnit_Framework_TestResult->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:722
PHP   8. PHPUnit_Framework_TestCase->runBare() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestResult.php:643
PHP   9. PHPUnit_Framework_TestCase->runTest() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:766
PHP  10. ReflectionMethod->invokeArgs() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881
PHP  11. FizzBuzzTest->test3sAreFizz() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881

Fatal error: Call to undefined method FizzBuzz::analyze() in /Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php on line 10

Call Stack:
0.0002     230768   1. {main}() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:0
0.0026     559256   2. PHPUnit_TextUI_Command::main() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/phpunit:62
0.0026     559880   3. PHPUnit_TextUI_Command->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:138
0.0110    2105472   4. PHPUnit_TextUI_TestRunner->doRun() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/Command.php:186
0.0127    2438208   5. PHPUnit_Framework_TestSuite->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/TextUI/TestRunner.php:423
0.0137    2455936   6. PHPUnit_Framework_TestCase->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestSuite.php:751
0.0137    2457480   7. PHPUnit_Framework_TestResult->run() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:722
0.0145    2537800   8. PHPUnit_Framework_TestCase->runBare() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestResult.php:643
0.0152    2649632   9. PHPUnit_Framework_TestCase->runTest() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:766
0.0152    2650392  10. ReflectionMethod->invokeArgs() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881
0.0152    2650480  11. FizzBuzzTest->test3sAreFizz() /Users/eric/dev/temp/fizzbuzz/vendor/phpunit/phpunit/src/Framework/TestCase.php:881
```

Once again, the important line is before all of the stack traces. `PHP Fatal error: Call to undefined method FizzBuzz::analyze() in /Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php on line 10`

In other words, our new 'FizzBuzz' class doesn't have an 'analyze' method.

Let's add just enough to the 'FizzBuzz' class to make it pass this test.

`FizzBuzz.php`:

```PHP
<?php
class FizzBuzz
{
    /* new lines */
    public function analyze()
    {

    }
}
```

And run the test again. `php vendor/phpunit/phpunit/phpunit FizzBuzzTest.php` This time, our output is not a bunch of scary error messages, just a short message to say that a test failed.

```bash
PHPUnit 4.4.1 by Sebastian Bergmann.

F

Time: 18 ms, Memory: 3.25Mb

There was 1 failure:

1) FizzBuzzTest::test3sAreFizz
Failed asserting that null matches expected 'Fizz'.

/Users/eric/dev/temp/fizzbuzz/FizzBuzzTest.php:10

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```

The failing test was in testing that 3s are Fizz. Whatever was returned from 'FizzBuzz' was a null, not a 'Fizz' string.

That's an easy enough problem to resolve. Again, we just edit enough of 'FizzBuzz' to pass the tests.

`FizzBuzz.php`:

```PHP
<?php
class FizzBuzz
{
    public function analyze()
    {
        return 'Fizz'; // new line
    }
}
```

Run our test: `php vendor/phpunit/phpunit/phpunit FizzBuzzTest.php`

```bash
PHPUnit 4.4.1 by Sebastian Bergmann.

.

Time: 19 ms, Memory: 3.00Mb

OK (1 test, 1 assertion)
```

And we pass!
