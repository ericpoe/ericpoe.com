---
title: Code Like You Need Protection
tags:
  - python
  - api
categories:
  - programming
date: '2014-02-14T00:00:00-06:00'
---
## Background ##

I was recently tasked with  programming a connecty-bit between a Google Drive Form and our instance of SolarWinds Web Help Desk. Both are great products. Both offer fabulous APIs.

My overall plan was to periodically grab all information from the default worksheet of the Google Drive Form, translate it to JSON, and submit it to Web Help Desk to generate a ticket for each Google Drive Form record. I realized that I was faced with a dilemma: how do I retain client records in the Google Drive Form and only read from the newest records to generate these tickets?

I first  thought to add a "read" flag to each record that I had read and created a ticket. The problem that I saw with this algorithm was that I would have to read through N records each time I wanted to check for new tickets. If the tickets were in the lower-end of the number spectrum, I would hardly notice the time it took to iterate through all of these tickets; but once the amount of records reaches a "critical mass,"" the read-delay might exceed the period-length between the times the underlying-script checks for new records.

I decided that my best bet would be to create a new worksheet, an "archive" worksheet, and move each record, once processed, from from the default worksheet to this new "archive" worksheet.

## How it’s done ##

My first love, in regards to programming, is PHP, so I thought I might program the  intermediate script in PHP; however, the server I was to run this on did not include PHP. On the other hand, it did run Python 2.

It has been a while since I have coded anything in Python, and even longer since I have written anything in Python 2. So, I fired up my browser and a handy VIM instance and checked out the very worthy [Python The Hard Way](http://learnpythonthehardway.org/book/).

After spending a day on that site, I felt that I was ready to tackle the Python 2 aspects of the Google Drive API ("gdata"). The trick was in figuring out which aspects of the gdata API would grab the data that I needed.

Meanwhile, one of my coworkers found the json API documentation from [Stormwinds Web Helpdesk API](http://www.webhelpdesk.com/api/) and provided a proof-of-concept via CURL and some code from the documentation. Once I knew that json would work, I knew that I had to generate json code from the gdata API and submit it to our instance of the Solar Winds Web Helpdesk application via their API and my personal API key.

The rest of the script required that I determine how to generate the originating JSON and how to submit that JSON text via Python2.

The title of this document is something like "code like you need protection." This is in reference to something that I recently (aka "last 6 months") heard that goes something like: code like the next person to read your code is a serial killer who knows where you live. In other words, make sure that the code you write is well structured, well documented, and makes logical sense. To that end, I probably spent more time documenting and refactoring my code so that the 6-months-from-now-me who has to tweak the code doesn’t have to spend an inordinate amount of time trying to figure out what my present-me was attempting to do.

The final script can be seen in my [GitHub repository](https://github.com/ericpoe/ask-a-tech).
