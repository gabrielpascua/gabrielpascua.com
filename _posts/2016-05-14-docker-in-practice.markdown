---
layout: book
title:  "Docker in Practice"
excerpt: "Docker in Practice"
date:   2016-05-14
categories: books
book_url: https://www.manning.com/books/docker-in-practice
book_image: /img/book-docker-in-practice-360x452.jpg
tags: docker
---

#### Discovering Docker
* Docker is good for:
    - VM replacement. It is faster, lighter and can be controlled from the terminal
    - Prototyping - allowing you to run different software versions side by side
    - Packages software easily making it very portable across OS
    - Designed with microservices in mind
    - You can model your network or infrastructure easily
    - Full stack productivity even when offline
    - Reducing debugging overhead
    - Providing architecture documentation inherently
    - Making Continuous Delivery easy because build environments can be easily managed
* Docker image and container analogy
    - Programs and processes
    - Classes and objects
* Benefits
    - Reliability
    - Consistency
    - Less installation ambiguity
    - Portability
    - Reproducibility 
    - Inexpensive compared to VM’s
* Docker has a copy-on-write strategy for disk space optimization.  Compared to copy-on-startup, it layers changes allowing other parts of your architecture to share dependencies inside one machine.
<p></p>

#### Understanding Docker — inside the engine room
* Docker on a host machine consists of the client (the `docker` command) and the daemon (except WIndows) with a RESTful API.  It manages the state of your images and orchestrates interaction with the Docker hub
* `docker run --restart=FLAG` sets your container’s restart policy
* You can use `socat` to monitor the Docker API traffic
* A way to remember the `HOST:CONTAINER` arrangement is to think about how traffic flows - one gets access to a container from the host
* `--link` requires that you have an `EXPOSE PORT_NUMBER` declaration in your Dockerfile
* `docker search IMAGE_NAME` to find an image from the Docker registry
* `docker run -ti IMAGE TTY_APP` the `-t` indicates you want to run the container using a `tty` program, in this cash bash. `-i` is for interactive mode.
<p></p>
<p></p>

### Docker and development
<p></p>

#### Using Docker as a lightweight virtual machine
* Docker is not a VM technology and it is not constrained to the host’s hardware limits.  It is application oriented compared to VM’s which are OS oriented.
* The difference of `ADD` from `COPY` is that it unpacks tar, gzip and other compressed files onto the container
* `RUN service postgresql start && cat db/schema.sql | psql && service postgresql stop` will run a sql script when postgres starts???
* To leverage caching and faster container builds, one strategy to load files from the host in a multi-application configuration is to split copying per application.  Having multiple `COPY` instructions will isolate changes to the application without the need to rebuild the rest.  But if you want to truly isolate containers and have independent caching, you can create multiple docker files per service and use docker-compose to combine them
* For complex init process management in your containers, you can use [supervisord](http://supervisord.org/)
* Saving the state of your container to an image can be useful if you are making incremental changes to a dockerized database

```

  ## this will output an image id
  docker commit CONTAINER_NAME
  
  ## tag the created image for easy reference
  ## you can replace TAG with $(date +%s) to make it dynamic based on date
  docker tag IMAGE_ID IMAGE_NAME:TAG
  
  docker run IMAGE_NAME

```
<p></p>

#### Day-to-day Docker
* The `-v` or `--volume` argument indicates that a volume external to the container is required.
* `$ docker run -e HIST_FILE=/root/.bash_history -v=$HOME/.bash_history:/root/.bash_history -ti ubuntu /bin/bash` to have access to the bash’s history
* Data containers pattern is preferred over a simple volume mount because it prevents unexpected changes from the host.  With this pattern, you delegate the management of the volume strictly to docker.
* Technique 26 shows how GUIs are ran inside containers.  The motivation is purely for development purposes.  By running your development apps inside a container you can configure it however you want like in browsers, or use your own IDE when moving to different machines.
* Run `docker inspect --format GO_MUSTACHE_TEMPLATE` to select a specific container setting
* The difference between `docker stop` and `docker kill` is the same as these commands in Unix
* When using the ADD instruction, you can (1) wrap files with spaces in double quotes to preserve it and (2) you must append the location with a slash if your intent is to put it in a folder
* Run `docker rm -v` to remove the container and the volume.  Docker does not delete a volume without the `-v` flag to prevent accidentally deleting volumes that may be used by another container.
* `Ctrl-P` then `Ctrl-Q` to detach from a docker session.  It will not work if you are running your container with a `--rm` argument.  This will allow you to switch between terminal sessions without stopping the container.
* [Docker UI](https://github.com/crosbymichael/dockerui) provides an interface to manage your images and containers
* `docker volume rm 'docker volume ls -q -f dangling=true'` to remove unused volumes. Similarly `docker rmi $(docker images -q --filter dangling=true)` will remove unused images.
<p></p>

#### Configuration management — getting your house in order
* The array/exec form is the preferred way when using the `CMD` instruction.  This form will immediately execute your instruction as compared to the shell form that prepends `/bin/sh -c`.  
* When your Dockerfile contains sensitive information, it is advised that the image be flattened to avoid its exposure.  Technique 43 uses `export` and `import` to achieve this resulting in an image with a single layer.
<p></p>
<p></p>

## Docker and DevOps
<p></p>

#### Continuous integration: speeding up your development pipeline
* Use `route -n` to reference the host IP in your Dockerfile
* Running a GUI application in a container requires one to share the hosts X11 files.  An example docker command for debian is `docker run -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix --hostname=$HOSTNAME -v $HOME/.Xauthority:/root/.Xauthority -it ubuntu:14.04 bash`
<p></p>

#### Continuous delivery: a perfect fit for Docker principles
* The line that demarcates CI from CD is up to the point where your codebase has finished its build and is ready for deployment. 
* If you don’t have a docker registry to publish to you can use `docker export` or `docker save` to create tarballs of your image.  This can be extracted using `docker import` or `docker load`.  The `save` and `load` commands include the image’s history.
* `etcd` can be used as a configuration management storage.  [Look into this](https://github.com/coreos/etcd/blob/master/Documentation/docs.md)
<p></p>

#### Network simulation: realistic environment testing without the pain
* Technique 70 can be useful when you want a container to discover another.
* [Comcast](https://github.com/tylertreat/Comcast) is a tool that can simulate real network conditions on your linux server
<p></p>
<p></p>

## Docker in production
<p></p>

#### Container orchestration: managing multiple Docker containers
* You can use `systemd` to manage your container’s start and restart processes.
* [Spotify’s Helios](https://github.com/spotify/helios) together with [Apache’s Zookeeper](http://zookeeper.apache.org/) can help you deploy docker containers across multiple hosts
* Use [Docker Swarm](https://docs.docker.com/swarm/install-w-machine/) to manage containers on different hosts as a single cluster
* Author thinks Helios and Swarm are on opposite ends of Docker orchestration and situated in the middle is [Kubernetes](https://github.com/kubernetes/kubernetes)
<p></p>

#### Docker and security
* The ability of Docker to interact with the host is why it needs to be ran with `sudo`.  Docker API access is the same as having root access. This means that a root user on a container is the same root user on the host.
* Unix uses capabilities to assign user privileges.  `man 7 capabilities` details what they are.  Technique 84 has a tabular data of what is enabled by Docker.
* You can configure docker to run securely over a specific port by adding the `--tls-verify`. 
* [OpenShift Origin](https://github.com/openshift/origin) provides a Application Platform as a Service suite that can also handle user and resource management.
<p></p>

#### Plain sailing — Docker in production and operational considerations
* To capture container logs on your host system, you can 
Run `docker run --log-driver=syslog …`, OR
install a logging package `RUN apt-get update && apt-get install rsyslog` then volume mount `/dev` and `/var/log` in your Dockerfile.
* [cAdvisor](https://github.com/google/cadvisor) is a tool you can use to monitor your containers
* Some arguments that you can use with `docker run` to limit resource access of containers are `--cpuset-cpus=INT` to reserve cores, `--cpu-shares=INT` to allocate CPU, and `--memory=INT` to limit memory consumption.
<p></p>

#### Docker in production — dealing with challenges
* Some flags you can use with `docker run` to access the host’s resources are `--net=host` to use the host network and `--storage-opt dm.basesize=INT` to access devices.