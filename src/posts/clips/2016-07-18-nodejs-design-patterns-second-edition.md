---
layout: book
title:  "Node.js Design Patterns - Second Edition"
excerpt: "Master best practices to build modular and scalable server-side web applications"
date: 2016-07-18
read: 2018-09-28
categories: books
book_url: https://www.packtpub.com/web-development/nodejs-design-patterns-second-editions
book_image: /img/book-designing-data-intensive-applications-350x459.jpg
tags:
  - node
  - javascript
---

## Chapter 1. Welcome to the Node.js Platform

### The Node.js Philosophy - Guidelines to follow
* Small core - functionalities are kept at bare minimum, speeding up updates
* Small modules - small in size and in scope which makes packages easier to understand
* Small surface area - packages limit API exposure promoting reuse
* Simplicity and pragmatism - less effort to implement and maintain and fosters community contribution

### The Reactor Pattern and libuv are the building blocks of Node.js
Node's Event Loop is the implementation of the Reactor Pattern performing non-blocking I/O operations.  The Reactor Pattern enables event driven applications to demultiplex requests into appropriate handlers through a polling construct.  **libuv** is the engine that abstracts the event demultiplexer, allowing it to run across different operating systems.

![Node.js Architecture](/img/node-architecture.svg)

## Chapter 2. Node.js Essential Patterns

### process.nextTick() vs setImmediate() for deferred execution
`process.nextTick()` puts the callback ahead of the event queue while `setImmediate()` puts it behind the rest.  Use either to convert a synchronous function to asynchronous or [as described here](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick-vs-setimmediate).

### Callback Pattern conventions for asynchronous IO events
* callback function should be the last parameter of a function call
* `error` of type `Error` comes first before `data` in a callback argument
* Always check for `error` first inside your callback
* An error inside a callback should be passed on to the next callback if available, e.g. `return callback(error)`
* if you have a try-catch block and an exception is thrown in a different stack, the catch statement will never capture the error.  Use `process.on('uncaughtException', (err) => {})` with `process.exit()` inside.

### Revealing Module pattern for namespacing
Namespacing prevents applications from running in the global scope.  Node uses this pattern to limit the surface area of a module by creating its own scope (using an IIF) and exposing public APIs through `module.exports`.  CommonJS is an implementation of this and essentially what Node uses for its module system.  Everything inside a module is private until it is assigned to `module.exports`.  Modules in node are cached after the first `require` statement.
```javascript
const module = (() => { 
  const privateFoo = () => {...}; 
  const privateBar = []; 
  const exported = { 
    publicFoo: () => {...}, 
    publicBar: () => {...} 
  }; 
  return exported; 
})();
```

### Forms of exports
* Named exports `exports.key1 = '', exports.key2 = () => {}`
* Function exports `exports = (args) => {...}`
* Class exports `class MyClass {...}; module.exports = MyClass;`
* Instance exports `class MyClass {...}; module.exports = new MyClass();`

### The Observer pattern through the EventEmitter class
Either extend the `EventEmitter` class or make it a private instance in a module. and start to `emit` events as you see fit.  Use `EventEmitter` over callbacks if:
* You need to differentiate between event types
* You need to have multiple listeners


## Chapter 5. Coding with Streams

### Streams vs Buffers
Buffer collects all the data first before it is passed on to the consumer. The allowed buffer size in V8 is ~1GB. Streams send data to the consumer as soon as it is available.  Streams are space and time efficient. They are great for processing large data like file downloads and media, or an operation that requires time to finish such as multi-step processing or expensive calculations.

### Types of Streams
Node.js streams are instances of `EventEmitter`.  It can support Binary mode for data chunks or Object mode for almost any JavaScript value.  There are 4 types you can work with

* **Readable** - represents a source of data like the `body` of the `fetch` API.  It can be in a non-flowing (data is read by looping through the stream buffer) or flowing (data is sent as soon as it arrives) mode.
* **Writeable** - represents a data destination. Node's http `ServerResponse` object is an example of this kind.
* **Duplex** - is a stream that is both Readable and Writeable. `net.Socket` is an example of this.
* **Transform** - these are Duplex streams that allow data transformation between writes and reads. There is [through2](https://www.npmjs.com/package/through2) wrapper library for Transform streams.

### Stream Piping Patterns
Although discussed in the context of Streams, these patterns can be applied to any pipe implementation
* **Combining Streams** - A single stream is exposed, but internally comprised of several streams
* **Forking Streams** - An input stream is broadcasted to several other streams with different uses for the input, e.g. an input stream sent to (1) md5 and (2) sha1 streams.
* **Merging Streams** - The opposite of forking

## Chapter 6. Design Patterns

### Factory for flexibly creating objects
It hides the creation of an object inside a method, making it more flexible by not tying it to a single implementation - think inheritance where your method has a conditional on what type of the object to return

### Revealing Constructor pattern for hiding an Object internals
This works by exposing an object's internal through a function that can alter its state, just as in the `(resolve, reject)` argument of a `Promise`.  Doing so ensures that the object and its properties are only "revealed" to the caller.  The constructor of a `Promise` is an example of this pattern.

### Proxy as a stand-in (or replacement) before calling the original object
The original object (called the Subject) is passed in the Proxy class constructor through composition.  From inside the Proxy, you can have a reference to the Subject and replace or put extra logic on some of its methods and properties.  

### Decorator for adding new functionalities
When you need new methods or properties to unrelated classes, you can compose a class inside a decorator class and add your own set of features.  The implementation is similar to Proxy but the intent is to "decorate" or expose new functionalities.

### Adapter for wrapping an external module or API
If you need to bring in an external module, it's best to shield your application from the module's low-level implementations.  This allows you to easily replace the module in the future without having to touch any of your application code.

### Strategy for creating a variety of implementations based on context
Think Passport.js as an example.  The Strategy pattern allows you to specify your own implementation of an interface removing the need for conditionals in the contextual class.  The result is a set of classes that can do different things injected in the constructor of the contextual class.

### State for status changes
The main idea is for an entity to only have a single state at any given time.  The entity manages the state changes and each change is represented by a class of its own.  This is useful for tracking the status of an object, where each state change corresponds to a different action handler.

### Template Method for a family of classes
The parent class would leave a virtual or abstract method that its subclasses can implement. You then pass around the parent class in function or class dependencies, but the underlying implementation are the subclasses.  This helps if a family of classes have only a few differences in their property implementations.

### Middleware as a Chain of Responsibility (Pipe) Pattern
In Express, middlewares allow you to define your own request and response handlers before handing it over (through the `next()` function) to the next one in the pipe.  By following the same structure, anyone can attach her own middleware in the pipeline.

### Command Pattern in Callbacks
The ability of functions to be given its own context in Javascript makes it a useful construct for the Command Pattern.  Using either `apply` or `bind`, you can create a flexible way of wrapping any action with parameters it needs for execution.


## Chapter 7. Wiring Modules

**High Cohesion** - A class is said to have a High Cohesion if it is focused on doing one thing well without any dependency

**Property Injection** - A form of Dependency Injection where the dependency is added through a setter property  

**Name Mangling** - The process by which a variable name is replaced with a single character to reduce file size during minification


## Chapter 9. Advanced Asynchronous Recipes

## Chapter 10. Scalability and Architectural Patterns

### Single-threaded over multi-threaded applications
Node's single-threaded design makes it ideal to take scalability in mind from the onset of the project.  Unlike multi-threaded applications, the only way to scale a Node application is to cluster it or add additional instances.  The advantage to this is you don't have to deal with synchronization issues multi-threading inherently brings which is to say that scaling Node applications require little to no development time.

### Scaling Node 

#### Single instance using the cluster module
Node offers a [cluster module](https://nodejs.org/api/cluster.html#cluster_how_it_works) for you to scale out your application into several worker processes.  Although there is no restriction on the number of worker processes you can create, the general recommendation is to limit it to the number of cores (CPUs) in a machine `const cpus = require('os').cpus().length`.  One should take into account in this approach to re-spawn cluster workers in case of crashes.  Look into [PM2](http://pm2.keymetrics.io/docs/usage/cluster-mode/) for when managing clusters is needed.

![Cluster Mode](/img/cluster-mode.svg)

#### Multiple instances using a Reverse Proxy as a centralized Load Balancer
The setup for a node application is copied into multiple machine instances but public access goes through a Reverse Proxy layer like nginx which then forwards requests to an available instance.  Best used for public internet websites where your infrastructure involves instances running on different public networks.  This layer acts as the gateway to your application servers.  Other benefits of reverse proxies acting as load balancers, are they offer advanced algorithms for distributing traffic, HTTP manipulation, and URL rewrites.  But the real power of this setup is when it has the ability to dynamically add instances relative to its load.

![Load Balanced](/img/load-balanced.svg)

#### Multiple instances using a Peer-to-Peer Load Balancer
The setup removes the Reverse Proxy layer and load balancing is done through the web server requiring it to have knowledge of the underlying network infrastructure. Best used for internal networks where resources are provisioned beforehand.  It simplifies your topology by removing a layer of bottleneck.  There is however an additional burden of maintaining the load balancing logic between the web and your API servers.

### Integration Patterns to make your services talk with each other
Say your successful at splitting up your application into tiny services.  How do you coordinate all of them and minimize their coupling?

#### API Proxy to control the exposure of your underlying infrastructure
Client requests are only aware of the API Proxy layer.  This is a simple layer, coordinating the traffic of incoming requests.  This gives you a centralized location for registering a service instead of directly exposing your services for public consumption.

![API Proxy Here](/img/api-proxy.svg)

#### API Orchestration to funnel requests to other services
This layer is responsible for calling all the other services and aggregating the results.  When your business requires utilization of other services to complete a request, you can hide that complexity by having an API orchestration layer.  In the wild this pattern can be seen from checkout systems and ElasticSearch that uses several sources before generating a result.

![API Orchestration](/img/api-orchestration.svg)

#### Message Broker or Message Bus to keep services agnostic
This is your Pub/Sub setup where your services are directly exposed to the client.  But instead of a service calling other services directly, all communications are published to the Message Broker.  Other services are subscribed to the Message Broker and triggers the appropriate action when the right event is published.  

### Managing State in distributed application
The ideal state management strategy in order of what's considered good practice are enumerated below. The first option requires setup code but is a cleaner approach than the other 2.
1. Persistent State using a datastore like Redis
2. Stateless or include the state in the Request object
3. Sticky state



### Chapter 11. Messaging and Integration Patterns

#### Communicating Between Servers 

**Using a Shared Storage to queue/broker messages between servers**  
Redis as an example has the capability to act as a message queue for Request/Reply architecture or as a Publisher in Pub/Sub.  Having a shared storage allows your app servers to be instantiated anytime without worrying about loss of information.  The disadvantage is the shared storage can be a bottleneck in your architecture.


**Sending Messages between Servers in a peer-to-peer architecture**  
A message is any structured data used to exchange information between components.  Some libraries are 
* [ZeroMQ](https://github.com/zeromq/zeromq.js) for a Pub/Sub or Push/Pull architecture
* [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html) to fanout/broadcast messages to various queues

### Integration Pattern Catalog

**Message Queue**

![Message Queue](/img/message-queue.svg)


**Peer-to-Peer**

![Peer to Peer](/img/peer-to-peer.svg)

**Message Broker**

![Message Broker](/img/message-broker.svg)

**Peer-to-Peer Pub/Sub**

![Peer-to-Peer Pub Sub](/img/peer-to-peer-pub-sub.svg)

**Peer-to-Peer Pub/Sub with a Broker**

![Peer-to-Peer Pub Sub with a Broker](/img/peer-to-peer-pub-sub-broker.svg)

**Fanout**

![Fanout](/img/fanout.svg)

**Fanout with a Broker**

![Fanout with a Broker](/img/fanout-broker.svg)