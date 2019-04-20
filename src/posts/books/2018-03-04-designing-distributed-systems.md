---
layout: book
title:  "Designing Distributed Systems"
excerpt: "Designing Distributed Systems: Patterns and Paradigms for Scalable, Reliable Services 1st Edition"
date:   2018-03-04
read: 2019-04-19
categories: books
book_url: http://shop.oreilly.com/product/0636920072768.do
book_image: 
tags:
  - ops
---

## Part I. Single Node Patterns

## Chapter 2. Sidecar Pattern
1 container for the main application and another container for a specific need make up a pod in this pattern.  It allows you to add functionality to the main application by tacking in a new one.  It typically involves a shared resource that allows the 2 containers to talk to one another.  For example
* An nginx container that exposes HTTPS traffic to a web application.  The containers share the same network.
* A container that can poll git updates for the main application. Think nodemon for change detection in the main app.  The setup requires the containers to share file systems.

## Chapter 3. Ambassadors
Similar to a Gateway or Facade pattern in that it hides the underlying infrastructure by only exposing what the client application cares about.  The ambassador container takes care of routing requests to the appropriate resource. For example
* A sharding service container that routes requests to multiple storage layer or services
* An HTTP request splitting container that can route a percentage of traffic to a web application server
* Load balancer

## Chapter 4. Adapters
An Adapter Container allows you to normalize external interfaces and make it follow a structure that your Application Container understands.  It makes combining and replacing in-house and off-the-shelf solutions seamless since changes are focused on the adapter and never the application. Some book examples (although this looks more like a Bridge Pattern):
* Logging using fluentd to expose Redis slow query logs which otherwise is only available from the redis server
* Monitoring a Redis server by exposing it to Prometheus thru an adapter container

## Part II. Serving (Distribution) Patterns

## Chapter 5. Replicated Load-Balanced Services
The simplest implementation of this pattern is a load balancer, a root node, with horizontally scaling application servers underneath.  Each replica is homogeneous and capable of serving requests.  This follows a stateless architecture.  From then on out, any architectural layer can have its own replication based on need. Examples:
* A load balancer with several web servers
* A replicated varnish cache layer above replicated application servers
* A replicated nginx SSL termination layer forwarding requests to replicated varnish http cache layer

## Chapter 6. Sharded Services
Shards are stateful servers that can serve a fraction of load between its siblings.  These are machines built to distribute state when a single instance does not have enough compute power to fit or process the data on its own.  One of the important things to consider with this pattern is the sharding function.  Consider the time when you have to increase your shards.  You have to ensure that your sharding function can accommodate the change without disrupting the current split.  Advanced implementation of this pattern involves replicating shards in case one server is overwhelmed (Hot sharding).
* Nginx as the root node with sharded cache servers based on the request URL

## Chapter 7. Scatter/Gather
This is another of a tree structure where requests are distributed to its leaf nodes to reduce latency.  If sharding is about splitting data to its leaves, this pattern is about splitting computation then aggregating the result at the root.  While it can speed up your responses, the execution time is greatly affected by the slowest leaf because at the end of every computation is the wait time required for the root to collate data.  Collation is optional in sharding, but is required for this pattern. The structure of this architecture scales out using replication or sharding techniques.  Examples
* A node that distributes search across servers and combines the output by serving the intersection of the datasets between leaves.

## Chapter 8. Functions and Event-Driven Processing
This describes Function As A Service (FaaS) for handling event based requests.  Because FaaS is time bound and its pay model is per request, it is not great for long running tasks.  Using it for such cases can lead to higher waits and an expensive infrastructure.  What they are useful for are asynchronous task executions for an application.  Some examples are:
* Sending Email after an application registration
* Decorating HTTP Requests (Adding headers, etc..)
* Sending texts for 2 Factor Authentication

## Chapter 9. Ownership Election

## Part III. Batch Computational Patterns

## Chapter 10. Work Queue Systems
This pattern works by having an orchestrating container in front of your work queue that can scale workers based on load.   The orchestrating container manages the items in the queue and the workers are in-demand containers doing some form of processing. Example
* A thumbnail processing worker container that takes a number of images from the application container's file system (queue)

## Chapter 11. Event-Driven Batch Processing
## Chapter 12. Coordinated Batch Processing
## Chapter 13. Conclusion: A New Beginning?
