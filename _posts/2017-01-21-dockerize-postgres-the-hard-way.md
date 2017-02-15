---
layout: post
title:  "Dockerizing Postgres the Hard Way"
excerpt: "Looking into the details of running a specific Postgres version on Docker for local development"
date:   2017-01-21 06:44
categories: notes
tags: ops
---

## Part 1 - Files
At the end of this section, your project folder should have these files:
{% highlight shell %}
  -rw-rw-r-- 1 docker-compose.yml
  -rwxrwxr-x 1 docker-entrypoint.sh
  -rw-rw-r-- 1 Dockerfile
  -rw-rw-r-- 1 .env
{% endhighlight %}
<p></p>

#### Docker Files
Download your docker files from the [GitHub Repo](https://github.com/docker-library/postgres).  Locate the specific Postgres version you want and copy `Dockerfile` and `docker-entrypoint.sh` files.  Give the shell script an execute permission by running `chmod +x ./docker-entrypoint.sh`.
<p></p>

#### Set the Environment Variables
Create a `.env` file with the following configuration.  It will allow you to easily set these values when switching host environments.  The host machine will override these values if the same variable names exist:
{% highlight text linenos %}
POSTGRES_HOST_PORT=9999
POSTGRES_PASSWORD=password
POSTGRES_USER=username
POSTGRES_DB=database_name
{% endhighlight %}
<p></p>

#### Docker Compose Files
Create a `docker-compose.yml` file with the following instructions.  The environment variables are picked up from the previous step.  You can run `docker-compose config` to see how your configuration file will be interpreted and to verify that the values are correctly set.
{% highlight yaml linenos %}
version: '2'
services:
postgres9_6:
    build: 
    context: .
    container_name: some_postgres
    ports:
    - "${POSTGRES_HOST_PORT}:5432"
    environment:
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    - POSTGRES_USER=${POSTGRES_USER}
    - POSTGRES_DB=${POSTGRES_DB}
{% endhighlight %}
<p></p>
<p></p>

## Part 2 - Commands
Start by running `docker-compose up` to build your image from the configuration files.  If you open a new terminal window and run `docker ps`, you will see the details of your running Postgres container.
<p></p>

#### Docker Compose Network
By default, Docker Compose creates a single network for your application, naming it based on where your project folder is.  You will need the network name to interact with the Postgres instance.  Run `docker network ls` to get it.
<p></p>

#### Connecting to Postgres
Run this to log in to your Postgres database:
{% highlight shell linenos %}
docker run -it --rm --link some_postgres:pghost \
  --net postgres_default \
  postgres_postgres9_6 \
  psql -h pghost -d dbname -U dbuser --password
{% endhighlight %}
<p></p>
**Where**

 - `-it` to allow shell interaction
 - `--rm` removes the container as soon as you exit or stop it
 - `--link some_postgres:pghost` links your container to a local named alias `pghost`
 - `--net postgres_default` is the network name taken from `docker network ls`
 - `postgres_postgres9_6` is the image name
 - `psql -h pghost -d dbname -U dbuser --password` is a standard `psql` command to connect to a database.  `pghost` is the same local alias name from the `--link` argument
<p></p>

## Part 3 - Data
<p></p>

#### Backups Using Volumes

This part assumes that you have done some database changes like table creation and data insertion.  Other alternatives to do the same task are using `docker exec IMAGENAME pg_dump ...`, [Data Volume Containers](https://docs.docker.com/engine/tutorials/dockervolumes/#/creating-and-mounting-a-data-volume-container) and running `docker commit` post database operations.  Personally, I find that the simplest approach is to use volume mounting.
{% highlight shell linenos %}
# host terminal
# creates an interactive session with the postgres container
docker run -it --rm --link some_postgres:pghost \
  --net postgres_default \
  -v $(pwd)/data:/backups \
  postgres_postgres9_6 \
  /bin/bash

# ---------------------------------
# container connection established
# ---------------------------------

# container terminal
# postgres commands are executed here
# works the same for database restores
pg_dump -h pghost -U dbuser --format=p dbname > /backups/backup.txt
{% endhighlight %}

<p></p>

**Where**

- `-v $(pwd)/data:/backups` mounts the host's `data` folder onto the container's `backups` folder
- `pg_dump ...` is the native postgres command to backup a database