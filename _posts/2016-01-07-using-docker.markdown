---
layout: book
title:  "Using Docker"
excerpt: "Developing and Deploying Software with Containers"
date:   2016-01-07
categories: books
book_url: http://shop.oreilly.com/product/0636920035671.do
book_image: /img/book-using-docker-350x459.jpg
tags: docker
---

### Chapter 1. The What and Why of Containers
* “Containers are a lightweight and portable store (encapsulation) for an application and its dependencies.”
* Advantages of Containers over VM’s:
	- Incurs little or no overhead, efficient and faster because it runs directly on top of an OS (not on a hypervisor like in VM’s)
	- Portable and OS interoperable
	- multiple containers can be ran at the same time to mirror a production distributed system.
	- Removes the need for configuration, installation and considerations for the difference between development and deploy environments.
* Docker’s name is tied to the shipping industry with the same goal of bringing the benefits of putting shipping goods inside containers to IT.
* Docker’s “Infrastructure Plumbing Manifesto” from docker.com:
	- Whenever possible, re-use existing plumbing and contribute improvements back.
	- When you need to create new plumbing, make it easy to re-use and contribute improvements back. This grows the common pool of available components, and everyone benefits.
- Follow the unix principles: several simple components are better than a single, complicated one.
* Microservices are the biggest use-case and driver behind containers.  The speed and flexibility of containers make them a great fit for the design principle of microservices to scale out making provisioning a lot easier.
<p></p>

### Chapter 2. Installation
* Run `sudo apt-get update` first.  The best way to install it on linux is through the installation script at [https://get.docker.com/](https://get.docker.com/).  On a Red Hat-based distribution change SELinux to a permissive mode to avoid “Permission Denied” errors - `sestatus` then `sudo setenforce 0`.
* For Mac and Windows, [Docker Toolbox](https://www.docker.com/products/docker-toolbox) is an option
<p></p>

### Chapter 3. First steps
* A container is a Docker image with a thin writeable layer. An image is a read only layer that can be shared between several containers.  An image turns into a container when you run it.  At that point a WRITE filesystem layer is created on top of the image.  A container can be in `created`, `restarting`, `running`, `paused`, or `exited` state. [https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/) 
* `docker run -h MYHOSTNAME -i -t debian /bin/bash` runs a command prompt inside a linux container with an explicit hostname
* `docker ps -a`, `docker inspect CONTAINER_NAME_OR_ID` with `|grep` or `--format` arguments, and `docker diff CONTAINER_NAME` commands give details about a container
* `docker logs CONTAINER_NAME` will list everything that happened in a container
* `docker rm CONTAINER_NAME` removes a container, and `docker rm -v $(docker ps -aq -f status=exited)` removes all containers that are stopped
* A `Dockerfile` is a text file that contains instructions on how an image should be built
* You can execute a shell script file `.sh` within a `Dockerfile` via the `ENTRYPOINT` section, e.g. `ENTRYPOINT [“/myshellscript.sh”]`
* Tag an image by using semicolon after the repository name `docker build -t REPOSITORY/IMAGE_NAME:TAG`
* Images prefixed with the user’s handle belong to the user namespace. The ones without prefixes belong to the root namespace - these are images curated by Docker for software companies.  Images prefixed with IPs belong to either 3rd party or self hosted registries
<p></p>

### Chapter 4. Docker Fundamentals
*  Namespaces isolate containers making sure that they are separated from the rest of the system
*  Supporting technologies in Docker
    - Swarm for clustering
    - Compose tool for building and running applications primarily for development and testing
    - Machine to configure Docker hosts and clients
    - Kitematic to manage containers on Macs and PCs
    - Docker Trusted Registry a local version of Docker hub to store images on-premise
*  Building Docker images
    - Other than a Dockerfile, `docker build` also requires a build context.  It can be teh current directory you're on `.`, a git repository, or an archive file `tar.gz`, `xz`, or `bzip2`.  When using a git repository, it is advised to pull the branch locally to have more flexibility.
    - You can use a `.DockerIgnore` file to remove unneeded files and folders like `.git`
    - Each instruction in a Dockerfile results in a new image layer that are cached for speed
    - When debugging why an image build fails you can build an image from a commit hash in the history before it failed `docker history mongo:latest` > `docker run -it COMMIT_HASH`
    - Image caches are invalidated when the checksum or metadata for any file has changed. Be aware of this when you download files, clone repos, or run `apt-get update`.  Also `docker build` with `--no-cache` will invalidate it.
    - It's still best to pull an image from the official source rather than roll out your own.  If an official issue doesn't have a feature you need, consider opening a ticket on the source. Chances are other people are having the same issues as you.
* Some useful Dockerfile instructions
    - ADD > copies files from the build context.
    - CMD > runs the given instruction when the container starts
    - COPY > copy files from the build context like ADD but simpler and preferred
    - ENTRYPOINT > runs an executable when the container starts
    - ENV > sets the environment variables
    - EXPOSE > sets the port, space separated
    - FROM > sets the base image in the format of `IMAGE:TAG` or `debian:wheezy`
    - MAINTAINER > sets the author
    - ONBUILD > instructions to be executed later
    - RUN > run instructions and commit the results
    - USER > sets the user or UID to use for RUN, CMD, or ENTRYPOINT
    - VOLUME > declares the file or a directory to be a volume
    - WORKDIR > set the working directory for RUN, CMD, ENTRYPOINT, ADD, or COPY
<p></p>

### Chapter 5. Using Docker in Development
* `localhost` is not available when using  a Docker machine on a Mac or Windows.  You can use `curl $(docker-machine ip default):5000` instead.
* “bind mount” the source folder to the container to allow code changes without stopping and rebuilding the image `docker run -d -p 5000:5000 -v "$(pwd)"/app:/app identidock`
* Use `docker ps -lq` with `stop` or `rm` to control the last ran container, e.g. `docker stop $(docker ps  -lq)`
* Always declare your `USER`. Without it your container will run as `root` which poses security concerns.
    <pre>

    RUN groupadd -r expressapp && useradd -r -g expressapp expressapp
    …
    USER expressapp
    </pre>
* `docker run -d -P --name NAME_OF_PORT CONTAINER_NAME` to let Docker map a random port number on the host.  `docker port NAME_OF_PORT` to list the mappings.  This is useful when you have multiple containers on a single host instead of tracking unused ports.
* Use `-e` to set the environment, e.g. `docker run -e "ENV=DEV"` 
* Use Docker Compose to avoid typing shell commands to run your containers.  It works by having a `docker-compose.yml` file where your shell commands are declared. To execute it all you need to do is run `docker-compose up`.  Hit `ctrl-c` to stop the container when you’re done.
* `docker-compose up -d` to download an image during the build process if it hasn’t done so
<p></p>

### Chapter 6: Creating a Simple Web App
* `docker rmi $(docker images -a | grep "^<none>" | awk "{print $3}")` deletes untagged images
* `docker rm $(docker stop ps -q)` stop and remove containers
* `docker rm $(docker ps -aq)` to remove all stopped containers
* Use `--link` to connect 2 images, e.g. `docker run -d -p 5000:5000 -e "ENV=DEV" --link dnmonster:dnmonster identidock`
* Example `docker-compose.yml` file of an Express App linked to a Redis Server 
    <pre>

    express_app:                 # container name
    build: .                # build from the current directory
    ports:
        - "3300:3000"         # port forward 3000 from container to 3300 on host    
    environment: 
        ENV: development      # set to Development environment
    volumes: 
        - ./app:/app          # bind mount the app folder from the host
    links: 
        - redis_server        # link app to redis via redis_server:6379

    redis_server:
    image: redis            # redis:3.2.4 to specify a version, else :latest
    </pre>
* If you need to run multiple processes in a single container, it’s best to use process managers such as supervisord or runit
* You can extend a yml file in `docker-compose` using `extends`.  Say you have a `common.yml` file, your extending configuration will look like `extends: [\n] file: common.yml`.
<p></p>

### Chapter 7. Image Distribution
* Docker Hub allows you to update your images whenever code changes via its Automated Build feature
* Because image creation is layered, a strategy to minimize file size of an image is to issue a `rm` in the same `RUN` line, e.g. 
`RUN dd if=/dev/zero of=/bigfile count=1 bs=50MB`, then `RUN rm /bigfile`  will result in 150MB, while `RUN dd if=/dev/zero of=/bigfile count=1 bs=50MB && rm /bigfile` will only be 85MB.
* Another way to reduce file size is to `docker export` a container then `docker import` to produce an image with a single layer but this comes with a cost - redoing Dockerfile instructions, losing metadata, inability to share space with other images
* If possible limit your `RUN` instructions in a single line to minimize your image file size
<p></p>

### Chapter 8. Continuous Integration and Testing with Docker
* Unit test need to run fast and containers can address this because it allows tests to be ran on clean and isolated environments.
* Some hosted CI solutions other than Jenkins
    - [Travis](https://travis-ci.org/) 
    - [Wercker](ttp://wercker.com/) 
    - [CircleCI](https://circleci.com/) 
    - [drone.io](https://drone.io/) 
* Forms of production testing that makes running old and new versions side by side
	- Blue(Old)/Green(new) Deployment - hide green from public and turn it on (take Blue down) only when changes are verified. Then either update Blue or rollback Green.
	- A/B or Multivariate Testing - 2 or more versions are ran for a period of time closely monitoring statistics
	- Ramped Deployment - making new changes available to a subset of users
	- Shadowing - Both versions are run for ALL requests but only the old version is used. Old and New responses are then compared to ensure consistency of the proposed version
<p></p>

### Chapter 9. Deploying Containers
* Docker Machine is a tool that lets you install Docker Engine on virtual (machine) hosts using the `docker-machine` command.  It is part of the installation for Docker Toolbox.
* `docker-compose -f NAMEOF.yml stop` to stop a container
* Some popular Configuration Management solutions
	- [Puppet](https://puppet.com/solutions/configuration-management)
    - [Chef](https://www.chef.io/solutions/infrastructure-automation/)
    - [Ansible (Popular/Open Source)](https://www.ansible.com/configuration-management) 
    - [Salt](https://saltstack.com/)
* The Docker Storage driver is responsible for stacking change (hashes) layers on an image. You can run `docker info` to see what driver you’re using.  You can change it by running `docker daemon -s overlay`. Other options are:
	- AUFS - First storage, most tested, and commonly used. Seen on Ubuntu or Debian hosts. Recommended as first option.
	- Overlay - A good alternative over AUFS
	- BTFRS - copy-on-write file system focused on supporting fault-tolerance
	- ZFS
	- Device Mapper - default on Red Hat systems
	- VFS - default Linux Virtual File System
* Container Hosting Options
    - [Triton](https://www.joyent.com/triton) - open source and can run on hosted on on-premise version. 
    - [Google Container Service (GKE - K for Kubernetes orchestration system)](https://cloud.google.com/container-engine/) - allows you to have automatic replication and load balancing
    - [Amazon EC2 Container Service (ECS)](https://aws.amazon.com/ecs/) 
    - [Giant Swarm](https://giantswarm.io/) - an opinionated solution for microservice architectures
* Never save passwords and API keys in the image.  It can’t be deleted because it will exist in previous layers.  Some good solutions are:
	- Pass it as part of Environment Variables `docker run -d -e API_TOKEN=my_secret_token myimage`. Author advises against it because it can be exposed to child processes
	- Pass it as part of the volume mount `docker run -d -v $(pwd):/secret-file:/secret-file:ro myimage` with a drawback of having your keys in files
    - Use (possible future) a key-value store [KeyWhiz](https://square.github.io/keywhiz/), [Vault](https://www.hashicorp.com/blog/vault.html), [Crypt](https://xordataexchange.github.io/crypt/)
<p></p>

### Chapter 10. Logging and Monitoring
* `docker logs -f CONTAINER_NAME` to get logs from a running container
* Default logging can only handle STDOUT and STDERR
* Other logging methods available by using the `--log-driver argument` in `docker run`
	- json-file
	- syslog
	- journald
	- gelf
	- fluentd
	- none
* Common open source logging solution is by using the ELK (Elasticsearch, Logstash, Kibana) Stack (or Elastic Stack).  A Docker-specific router for container logs is Logspout.  It can collect logs from different containers and stream to an endpoint such as Logstash.  
<p class="text-center"><br /><img src="/img/elk-on-docker.svg" alt="ELK Setup with Docker Containers" /></p>
* The linux utility `logrotate` will allow you to manage log files using different generations of archiving logs. For example, logs are moved to the father log, the old father gets compressed and moved to the grandfather, the grandfather becomes the great grandfather and the old great grand father is deleted. 
* Get the stats on all running containers  
{%raw%}`docker stats  $(docker inspect -f {{.Name}} $(docker ps -q))`{%endraw%}
* Docker Monitoring Tools 
    - [cAdvisor](https://hub.docker.com/r/google/cadvisor/) (per host) 
    - [Heapster](https://github.com/kubernetes/heapster) (cluster) 
    - [Prometheus](https://prometheus.io/) (cluster)
<p></p>

### Chapter 11. Networking and Service Discovery
* You can connect services across container hosts using these solutions:
	- Service Discovery
	- Ambassador Containers
	- Overlay from Docker
* Service Discovery allows clients to discover instance dependencies in a network, microservice, or cloud solution.  The typical practice is for instances to register themselves at startup and de-register themselves on shutdown.  The more popular open source options are:
    - [Eureka from Netflix](https://github.com/Netflix/eureka) 
    - [Consul (Raft Algo - Leader Follower, CP Solution)](https://www.consul.io/) 
	- [etcd (Raft Algo - Leader - Follower)](https://github.com/coreos/etcd)
	- [ZooKeeper](https://zookeeper.apache.org/)
    - [SmartStack from AirBnb](http://nerds.airbnb.com/smartstack-service-discovery-cloud/) 
	- [WeaveDNS](https://www.weave.works/have-you-met-weavedns/)
	- docker-discover 
* The “Ambassador Container” pattern allows you to connect containers across hosts by using a proxy container.  It also promotes service portability.  For example, in a typical 2 link connection between a web app (client) and redis (provider), you have to restart the client to connect to a different provider. Whereas with the Ambassador Container pattern, you have an ambassador container between your client and provider that you can restart anytime you want to connect to a different redis server. The disadvantages are they require extra configuration and can potentially be a point of failure.   [https://docs.docker.com/engine/admin/ambassador_pattern_linking/](https://docs.docker.com/engine/admin/ambassador_pattern_linking/) 
- Direct Linking `(consumer) --> (redis)` 
- Ambassador Containers  
	  `(consumer) --> (redis-ambassador) --> (redis)` OR  
	  `(consumer) --> (redis-ambassador) ---network---> (redis-ambassador) --> (redis)`
* When shopping for a Service Discovery Solution, you will often run into CAP Theorem which states that a distributed system cannot be Consistent (C), Available (A), and Partition tolerant (P) simultaneously.  Take note of possible implementations such as AP or CP systems.
* Docker Networking Modes `docker network ls` [https://docs.docker.com/engine/userguide/networking/](https://docs.docker.com/engine/userguide/networking/): 
    - Bridge - represents the `docker0` network. External connectivity is provided by IP forwarding and `iptables` rules
	- Host - adds a container on the host’s stack and cuts the plumbing of the Bridge network and shares the IP Address of the host
	- None - adds a container to a container-specific network stack
<p></p>

### Chapter 12. Orchestration, Clustering, and Management
* Clustering and Orchestration Tools
	- [Swarm](https://docs.docker.com/swarm/overview/) - Native clustering for Docker
	- [Fleet](https://coreos.com/fleet/) - Cluster Management tool from CoreOS. It is built on top of systemd.  Each machine runs an engine and an agent.  Only one engine is active at any cluster but agents are constantly running.
    - [Kubernetes](http://kubernetes.io/) - Container orchestration tool from Google.  Pods are the atomic unit in Kubernetes and are groups of containers deployed and scheduled together.  Logging, Monitoring, Load Balanced proxy are all provided.  
    - [Apache Mesos](http://mesos.apache.org/) - The architectureis designed around high-availability and resilience.  Companies known to use it are Twitter, eBay, AirBnB.  It can run multiple frameworks on the same cluster which is unique to it compared to other orchestration tools.
* Container Management Platforms to help automate provisioning, orchestrating and monitoring containers:
    - [Rancher](http://rancher.com/) - Docker centric and easy to get started.  Provides a web interface and a CLI tool to find details on running containers.
    - [Clocker](http://www.clocker.io/) - self-hosted container management platform built on top of Apache Brooklyn.  It is more of an application-oriented solution.  One advantage is you can easily mix Docker deployment with non-containerized resources.
	- Tutum (Acquired by Docker)
<p></p>

### Chapter 13. Security and Limiting Containers
* Security Concerns from the author over containers:
    - Kernel exploits. Kernels are shared between container and hosts magnifying kernel existing exploits
    - DoS attacks - an overloaded container can starve other containers in a host
    - Container breakouts - access to a container can lead to access to other containers
    - Poisoned Images - how do/can you trust an image source you’re using
    - Compromising secrets - 
* [Namespaced Resources in Docker](https://opensource.com/business/14/7/docker-security-selinux) 
    - Process
    - Network
    - Mount
    - Hostname
    - Shared Memory
* Non-Namespaced Resources:
    - User ID’s
    - Kernel keyring
    - Kernel and its modules
    - Devices
    - System time
* To create a secure a solution built around containers, one should assume vulnerability and build layered defenses.  Another important strategy is to provide least privilege access to processes to limit an attacker’s capabilities in case of a breach.  “The more checks and boundaries you have in place, the greater the chances of stopping an attack”
* Segregate containers by host if you have a multitenancy setup to prevent users accessing another container’s data in case of a breakout.  Put containers that process sensitive information in its own host.
* {%raw%}`docker inspect -f "{{.Image}}" $(docker ps -q)` get the ID’s for all running images, and `docker images --no-trunc | grep $(docker inspect -f "-e {{.Image}}" $(docker ps -q))` for more details.  To get images base `docker inspect -f "{{.Image}}" $(docker ps -q) | xargs -L 1 docker history -q`{%endraw%}.
* Use the `LABEL`  keyword in your Dockerfile to add information about your images
* Be specific in your Dockerfile’s `FROM` instructions by using the image digest.  It will prevent unintended results when images get updated.
* **Tips on securing container deployments**
    - Set a user - avoid running applications as `root`. In your Dockerfile:  
        `RUN groupadd -r user_grp && useradd -r -g user_grp user`  
        `USER user #delay this until all the installations are done.`  
        Use `gosu` and not `sudo`.  The former creates a single process while the latter creates 2.
    - Limit Container Networking - only open the ports you need.
    - Remove or Disable Setudi/Setgid Binaries so they cannot be used for privelege escalation attacks
    - Limit Memory using the `-m` and `--memory-swap` to prevent bogging down the host in case of a DoS attack
    - Limit CPU using `-c`
    - Limit Restarts because it wastes a large amount of system time and resources  
    `docker run -d --restart=on-failure:10 IMAGE_NAME`
    - Limit Filesystem writes using `--read-only`
* Limit kernel capabilities
* Apply Resource Limits (ulimits) that can be applied of particular interests to cpu, nofile, and nproc
* Running regular audit of your containers is a good way to ensure that they are up to date and no breaches have occurred.  You can use the [Docker Script](https://github.com/docker/docker-bench-security) to automate your audit.
* In case of an attack, use `docker commit` to take a snapshot of the container and run `diff` and `log` against it to get more details.  Some reading materials: 
    - [https://www.cert.org/historical/tech_tips/win-UNIX-system_compromise.cfm?](https://www.cert.org/historical/tech_tips/win-UNIX-system_compromise.cfm?)
    - [https://serverfault.com/questions/218005/how-do-i-deal-with-a-compromised-server](https://serverfault.com/questions/218005/how-do-i-deal-with-a-compromised-server) 