---
layout: book
title:  "Fundamentals of Software Architecture"
excerpt: "An Engineering Approach 1st Edition"
date:   2020-02-11
read: 2020-05-20
categories: books
book_url: https://www.amazon.com/Fundamentals-Software-Architecture-Comprehensive-Characteristics/dp/1492043451
book_image: 
tags:
  - javascript
---

## 1 Introduction
Software Architecture is made up of:
1. **Structure** - Building blocks of your system topology
2. **Characteristics** - Qualities of the system
3. **Architecture Decisions** - Rules, restrictions, conventions
4. **Design Principles** - Implementation guidelines

## Part I - Foundations

### 2 Architectural Thinking
Shifting from thinking as an engineer to an architect requires a different perspective.  You're no longer just responsible for the system. You are also responsible for how it aligns with business needs.  To do that, you have to:

* Recognize there is no boundary between architecture (high-level) and design (implementation).  You can't simply pass on the design of the system to your development team.  Be involved in planning and at some level, implementing.
* Know that every decision is a trade off.  Be aware of the advantages and disadvantages of your technical decisions and how they affect the business.
* Have technical breadth.  Having "enough" knowledge about several technologies is better than being very proficient at 1.  This is the complete opposite of an engineer.   Breadth gives you options that can guide in picking solutions better suited for your projects.
* Maintain some level of technical depth.  Recognize where you can help your engineering team.  This can come in the form of creating POC's, fixing bugs, automation, addressing technical debt, or code reviews.  Participating in the development cycle will also keep you up to date with the project and ensure that the implementation is in line with the architectural goals.

### 3 Modularity
Modularity is the logical grouping of related code.  It is an important organizing principle that makes codebases sustainable.  Architects ensure that modularity is in place through order and consistency.  These are qualities that can be used to measure it:

* Cohesion - the measure of how things are related to one another
* Coupling - the measure of incoming (afferent) and outgoing (efferent) connections to other code artifacts
* Connascence - the quality of software where a change in one requires others to be modified to maintain the correctness of the system


### 4 Architecture Characteristics Defined
Architecture characteristics are the qualities of your system.  There exists an industry recognized set of architectural qualities you can follow through this ISO standard:
https://iso25000.com/index.php/en/iso-25000-standards/iso-25010

![Software Qualities](/img/book-software-quality.svg)


### 5 Identifying Architectural Characteristics
**There are no wrong answers in architecture, only expensive ones.**  
Identify what characteristics your architecture must support in relation to what is important to stakeholders.  Security and availability are always implicit, but majority requires trade offs.  Knowing them early will help you prioritize and guide your decisions.

### 6 Measuring and Governing Architecture Characteristics
### 7 Scope of Architecture Characteristics

### 8 Component-Based Thinking
Components are the physical packaging of modules.  The architect has the responsibility of identifying top level components and the level of details required.  Business requirements can be mapped to components using these generalized techniques:
* Actor / Action - components based on users and their roles
* Event Storming - components around system events
* Workflow Approach - components based on activities

## Part II - Architecture Styles

### 9 Foundations
Architecture styles can be classified as monolithic or distributed.  As the industry trends towards distributed systems, [there are fallacies that you can avoid](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing#The_fallacies) before choosing to adopt it.
1. The network is reliable - it is not.  Do you have enough error handling for network issues?
2. Latency is zero - network speeds vary.  Is the roundtrip time to deliver packets of data acceptable for the process to be its own service?
3. Bandwidth is infinite - data size transfers increase as you add more entities in your system.  How can you limit the size of data each service will share to avoid bottlenecks?
4. The network is secure - the surface area to secure grows with your system.  What security constraints can you put to minimize threats?
5. The topology never changes - firmware is patched and network is updated all the time.  Can you test, deploy, roll back these updates with zero to minimal interruption?
6. There is only one administrator - large networks require different administrators.  Do you know who the right person to talk with for specific network concerns?
7. Transport cost is zero - distributed systems are more expensive to maintain.  Do you have the budget for the expenses from new hardware, software, servers, and storage?
8. The network is homogenous - underneath a network is hardware and software from different vendors. Is your new system compatible with your current infrastructure?

Monitoring and Data Integrity are 2 other things to consider on a distributed network.  How can you trace an issue when reconciling log data from multiple servers?  When data gets transported to multiple servers, how do you deal with eventual consistency and stale data? 

### 10 Monolithic Layered Architecture
This is the classic N-Tier architecture where the application is technically partitioned based on their roles or responsibilities in the system. Other forms of this architecture are layers grouped based on how they are deployed - a layer for the UI, Business Rules and ORM, and for Persistence.  A layer is "closed" if access to its data is sequentially tied to its place in the hierarchy.  It is "open" when requests to data can bypass the hierarchy.  Knowing which layers are open or closed can avoid tight coupling.  Layered Architecture is simple, easily recognizable and inexpensive to build.  It is good for initial iterations, small applications, or if your time and budget constraints are tight.  It cannot be scaled easily.  Its elasticity is less than ideal because you are replicating an entire application. It also lacks fault tolerance.

![Layered Architecture](/img/book-monolithic.svg)


### 11 Monolithic Pipeline Architecture
Pipeline architecture is made up of Pipes and Filters.  Filters are modules that process incoming data then passing it along to the next filter.  Pipes are the communication channels between Filters.  ETL systems, Orchestrators and Mediators are some examples of this architecture.  This is a simple and less costly set up with some degree of testability because it is modular.  Fault tolerance is low because any Filter failure within the pipeline can break the whole system.

![Pipeline Architecture](/img/book-pipe.svg)


### 12 Monolithic Microkernel Architecture
Plugin architecture consists of a Core System and its Plugins that make its features extensible.  The Core System is the minimal or the most generic functionality provided.  The Plugins are standalone components with specialized capabilities. While several variants of the architecture can make it less of a monolith, it is still considered to be one because of the Core System's innate feature of funneling requests through method invocations defined in is plugin contracts.  This architecture can be domain or technically partitioned.   The popular examples of this are today's browsers and IDE's.  This architecture style provides better testability and modularity because Plugins can hide a lot of complexity the Core System does not provide.  But because the Core System is still a monolith, it can be hard to scale.

![Microkernel Architecture](/img/book-microkernel.svg)

### 13 Distributed (Domain) Service-Based Architecture
A Service-Based architecture is partitioned by domain and not by the technical requirements of its client or its underlying data structure.  This is a natural fit for a Domain-Driven design.  Each domain service is independent from other domain services without any inter-service communication. It is very typical for this architecture to have a single database.  Variations can include partitioning the UI and database by domain with replication required only when needed.  It is good practice to have a Gateway or Proxy layer between the UI and Persistence.

The number of domain services in this architecture ranges between 4-12, with an average of 7.  With each of the domain service accessing the monolithic database, it is important that the database also maintains logical grouping of data and its persistence libraries mirroring its structure.  This allows changes to isolate the impact on other domains and be further broken apart into other domains in the future in a less invasive manner.

This architecture is the simplest distributed system type.  It is modular, pragmatic and flexible.  Because services are coarse-grained, machine resources can be wasteful compared to fine-grained microservices. It is scalable but is not very cost-effective.

![Service Based Architecture](/img/book-service-based.svg)

### 14 Distributed Event-Driven Architecture
Event Driven Architecture is technically partitioned where domain data exists in several system entities.  It is naturally asynchronous (event-based), but can support synchronous (request-reply based) communications.  The most common components are Event Channels or your topics to subscribe from and Event Processors that processes the message for other Event Processors to consume.  It is highly scalable because you can add more Event Processors when needed and its asynchronous quality makes it very responsive thru a fire-and-forget communication.  However, because the flow of message is not deterministic, it creates a complex system for tracing application state and also makes error handling very challenging.


#### Topologies

* **Broker** - The essential components of a Broker topology are Event Channels and Event Processors.  An initial request is sent to the Broker (RabbitMQ, ActiveMQ) that publishes a topic from the Event Channel.  Any Event Processor subscribed to the topic can react to the event, then publishing a new topic for other Event Processors in the whole system to consume.  Messages are dynamic, flowing in a chain-like manner.  Event Processors are partitioned based on their Domain, e.g. OrderEventProcessor, NotificationEventProcessor, etc, giving its distributed characteristics.  There is no single entity that controls how the messages flow, thus the current state of data being passed around cannot be accurately determined.  This very nature of a Broker makes error-handling and undoing changes difficult to implement.

![Broker](/img/book-event-broker.svg)

* **Mediator** In this architecture, all the messages and events originate from the Mediator.  The Mediator is the only entity aware of the steps required to complete a request.  When an initial request is sent to the Mediator it recognizes which step in the process it should invoke.  It then publishes a new topic (command) for the appropriate Event Processor to consume. The Event Processor responds back to the Mediator as soon as it completes its task.  From there, the Mediator moves on to the next step and follows the same procedure until every step is completed.  Mediator addresses the error handling and message control Broker lacks.  However, because messages flow through the Mediator it creates tight coupling between Event Processors and becomes the single point of failure in the system.

![Mediator](/img/book-event-mediator.svg)

#### Synchronicity
In situations where an Event Driven architecture requires synchronous data flow, a Request/Reply design can be put in place. This requirement is typical when the event initiator requires some kind of acknowledgement for a future completion - getting an order id, flight confirmation number, money transfer receipt, etc..  In this pattern, Request Queue and Reply Queue are placed between the Event Producer and Event Consumer.  The Event Producer sends the data thru the Request Queue and waits for the Event Consumer to reply back from the Response Queue.  Because the Event Producer can accept messages from other Event Consumers, matching the request data with the response data is done by correlating IDs.

![Request Reply](/img/book-request-reply-queue.svg)


### 15 Distributed Space-Based Architecture
Space-Based Architecture gets its name from tuple space - a form of distributed computing where tuples of data are published to a common space (memory) for shared concurrent access by processors.  In this architecture, requests go through a Virtualized Middleware like a reverse proxy (Nginx) which determines the routing and how much Processing Unit to instantiate (scale out) based on the volume of incoming requests.  Each Processing Unit contains application code and data replicated with other Processing Unit(s).  There are no direct database communications because data is cached in-memory of a Processing Unit.  If needed, database reads and writes are sent as messages from Processing units to Data Pumps (queues) consumed by a Data Abstraction Layer consisting of dedicated services for either reading or writing, or by domain.

It is common for this architecture to use Replicated Caching between Processing Units, although Distributed Caching is also an option using a dedicated server like Redis.  The main trade-off is high data consistency of Distributed Caching against low latency and high fault tolerance for Replicated Caching.

Because access to data is localized and communication to central database happens less, this architecture is a good fit for applications with high spikes and unpredictable traffic volume.  Some examples include Reservation, Auction, and Trading systems.  It is highly elastic, scalable and performant.  But because it relies heavily on cache replication and database call indirection, it becomes very complex and expensive to implement.

![Space Based Architecture](/img/book-space-based.svg)


### 16 Distributed Orchestration-Driven Service-Oriented Architecture

### 17 Distributed Microservices Architecture
The main characteristic separating Microservices from SOA is each service can run independently - database and other required components included.  A microservice is its own process running on a physical server, virtual machine or a container using technologies suited best for its needs.  There's an API layer that sits between the UI (Add a UI Layer in the diagram) and all the microservices acting as a Gateway or Service Discovery for processing incoming requests.  Because this architecture prefers duplication over coupling, architects must take great care in creating boundaries between other services.  This boundary (Bounded Context) is typically based on a service's (1) Domain or Purpose, or (2) Transaction Type or Workflow.  The boundary and its granularity is hard to get right the first time so it should be adjusted over time as the business evolves.  In situations where inter-service communication is required, instead of directly calling the other service, one can create a mediator service that will take care of coordinating the requests.  This allows you to control the workflow and handle complex logic like rollbacks while minimizing coupling.  This architecture is very scaleable and elastic, but performance suffers because each request is tied to a network call and security verification.  It is also expensive and complex to implement.


![Microservices](https://drive.google.com/uc?id=1KyQhxz9tV2zuvoJlkOcNjPLaGMzURF3c)

![Inter Service Communication](https://drive.google.com/uc?id=1pFdSO-omdZRfVrwnzj9j8TkBsrntjcLr)


### 18. Choosing the Appropriate Architecture Style
Architects live in a constant state of flux because change in technology is pervasive.  The decision points when making an architectural decision includes choices between:

* Monolithic or Distributed Architecture
* Single or Several Data Stores
* Synchronous or Asynchronous Messaging
* Cost and Budget
* Boring or New Technology
* Faster Time to Market or Long Term Stability

## Part III. Techniques and Soft Skills

### 19. Architecture Decisions, Anti-Patterns
**Covering Your Assets**  
Avoiding or Deferring decisions for fear of making the wrong choice.  Get enough information about your options and use all the time you have to analyze the pros and cons.

**Groundhog Day**  
Repetitive discussions why such a decision was made.  This arises when justification - technical and/or business, was not clearly communicated to teams.  
 
**Email-Driven Architecture**  
Using emails (or chats) for Architectural Decisions causing teams to forget them.  Use a centralized repository you can link back to for teams to use as a reference.

### 20 Analyzing Architecture Risk
### 21 Diagramming and Presenting Architecture
### 22 Making Teams Effective
### 23 Negotiation and Leadership Skills

* Be pragmatic yet visionary
* Be clear and concise in your communications
* Even technical problems has a human element to it

### 24 Developing a Career Path