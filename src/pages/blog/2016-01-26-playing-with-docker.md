---
title: Playing with Docker and Linked Containers
tags:
  - php
  - docker
  - mysql
  - drupal
categories:
  - sysadmin
date: '2016-01-26T21:48:00Z'
---

In my current job, I am starting the process to upgrade our PHP 5.4 application to a PHP 5.6 application (PHP 7 is not yet support by the majority of the 3rd party libraries we use). I have been tasked with building the staging server for use in testing our legacy application as well as our newer Symfony-based application. We are using an older version of MySQL as well.

At some point, we will want to experiment with PHP 7.x and later versions of MySQL or MariaDB. Yet, will we want to build a brand new server each time?

This seems like a perfect opportunity to play with [Docker](http://docker.io).

I had first looked at Docker a little over a year ago. I had tried to build a dev environment entirely from Docker, but it and I were not yet ready for each other. I could not see Docker as anything other than another way to launch a Vagrant box for development.

This weekend, I looked at Docker again. Now Docker includes a feature called "[Docker Compose](https://docs.docker.com/compose/)." This allows one to build a Docker manifest within a YAML file rather than as a complex command-line string.

I played. I looked at building a new Drupal 8 box with a separate MySQL server. As a docker-compose YAML file, this is pretty straight-forward:

`docker-compose.yml`

```yaml
drupal8:
  image: drupal
  links:
    - drupal_database:mysql
  ports:
    - 8085:80
drupal_database:
  container_name: drupal_database
  image: mariadb:5.5
  environment:
    MYSQL_ROOT_PASSWORD: examplepass
    MYSQL_USER: user
    MYSQL_PASSWORD: password
    MYSQL_DATABASE: drupal_db
```

The above creates two Docker machines: "drupal8" and "drupal_database." The "drupal8" Docker machine is linked to the "drupal_database" which is running MariaDB 5.5. To launch this, I just run `docker-compose up` from the directory that contains this `docker-compose.yml` file. This is the equivalent to running:

```
docker run --name drupal_database \
  -e MYSQL_ROOT_PASSWORD=examplepass \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  -e MYSQL_DATABASE=drupal_db \
  -d mariadb:5.5

docker run --name drupal8 \
  -p 8085:80 \
  --link drupal_database:mysql \
  -d drupal
```

I was able to come up with a working `docker-compose.yml` file within 30 minutes. It took me much longer to come up with the right `docker run` statements to make two Docker containers and have the Drupal container link to the MySQL container. Natch, had I read further down the [Docker Hub Drupal page](https://hub.docker.com/_/drupal/), I would have been given a huge clue as to how to connect the two; I just needed to add the appropriate port. Nonetheless, the YAML is much easier me to configure and update than the two `docker run` commands are.
