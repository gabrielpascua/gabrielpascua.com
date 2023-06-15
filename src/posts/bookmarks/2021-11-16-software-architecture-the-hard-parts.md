---
layout: book
title:  "Software Architecture: The Hard Parts"
excerpt: "Modern Trade-Off Analyses for Distributed Architectures"
date:   2021-11-16
read: 2021-01-10
categories: books
book_url: https://www.oreilly.com/library/view/software-architecture-the/9781492086888/
book_image: 
tags:
  - architecture
---


### Chapter 1. What Happens When There Are No “Best Practices”?

One of the most effective ways of documenting architecture decisions is through Architectural Decision Records (ADRs).


### Chapter 2: Pulling Things Apart. Discerning Coupling in  Software Architecture

We start with our first great untangling of forces in distributed architectures: defining architecture quantum along with the two types of coupling, static and dynamic. Quantum originated from the Latin word quantus,  meaning “how great” or “how many.” Before physics co-opted it, the legal profession used it to represent the “required or allowed amount”. 

An architecture quantum is an independently deployable artifact with high functional cohesion, high static coupling, and synchronous dynamic coupling.

* Static are code component coupling - it describes how services are wired
* Dynamic is communications coupling - it describes how services call one another at runtime



### Chapter 3: Pulling Things Apart. Architectural Modularity

Scalability is defined as the ability of a system to remain responsive as user load gradually increases over time. It is the ability of a system to remain responsive during significantly high instantaneous and erratic spikes in user load.


### Chapter 4: Pulling Things Apart. Architectural Decomposition

Refactoring patterns for refining and extracting components (the logical building blocks of an application) to form a distributed architecture in an incremental and controlled fashion.

1. Tactical forking approach involves making replicas of an application and chipping away at the unwanted parts to form services. The first step in tactical forking involves cloning the entire monolith, and giving each team a copy of the entire codebase. Each team constantly refactors to remove unwanted code.

2. Component-based decomposition patterns essentially enable the migration of a monolithic architecture to a service-based architecture,


### Chapter 5: Pulling Things Apart. Component-Based Decomposition Patterns


##### Identify and Size Components Pattern

Identify and catalog the architectural components (logical building blocks) of the application and then properly size the components. One metric we’ve found useful for component sizing is calculating the total number of statements within a given component. A statement is a single complete action performed in the source code, usually terminated by a special character (such as a semicolon).

##### Gather Common Domain Components Pattern

Identify and collect common domain logic and centralize it into a single component.

##### Flatten Components Pattern

Ensure that components are not built on top of one another, but rather flattened and represented as leaf nodes in a directory structure or namespace.

**Fitness Functions:**

* Maintain component inventory
* No component shall exceed [some percent] of the overall codebase
* No component shall exceed [some number of standard deviations] from the mean component size
* Find common names in leaf nodes of component namespace
* Find common code across components
* No source code should reside in a root namespace

##### Determine Component Dependencies Pattern

Analyze the incoming and outgoing dependencies (coupling) between components to determine what the resulting service dependency graph might look like after breaking up the monolithic application.

**Fitness Functions:**

* No component shall have more than [some number] of total dependencies
* [some component] should not have a dependency on [another component]


##### Create Component Domains Pattern

Logically group components together so that more coarse-grained domain services can be created when breaking up an application.

**Fitness Functions:**

* All namespaces under [root namespace node] should be restricted to [list of domains]


##### Create Domain Services Pattern

Well-defined component domains and extracts those component groups into separately deployed services, known as a domain services,

**Fitness Functions:**

* All components in [some domain service] should start with the same namespace

### Chapter 6: Pulling Things Apart. Pulling Apart Operational Data


 The six main disintegration drivers for breaking apart data include

How many services are impacted by a database table change?

Can my database handle the connections needed from multiple distributed services?

Can the database scale to meet the demands of the services accessing it?

How many services are impacted by a database crash or maintenance downtime?


Is a single shared database forcing me into an undesirable single architecture quantum?

Can I optimize my data by using multiple database types?

Breaking apart a database into well-defined bounded contexts significantly helps control breaking database changes.

service instance—typically has its own connection pool. As illustrated in Figure 6-6, when multiple services share the same database, the number of connections can quickly become saturated, 
Note: N (CM): In a distributed architecture, each ...

By breaking apart a database, less load is placed on each database, thereby also improving overall performance and scalability.

When multiple services share the same database, the overall system becomes less fault tolerant because the database becomes a single point of failure 

independently deployable artifact 

Breaking apart monolithic data allows the architect to move certain data to a more optimal database type.

Data Integrators


These drivers provide answers and justifications for the question “when should I consider putting data back together?”

Are there foreign keys, triggers, or views that form close relationships between the tables?


Is a single transactional unit of work necessary to ensure data integrity and consistency?


Identifying what is more important helps make the decision about whether the data should be broken apart and what the resulting schema granularity should be.
Note: N (DR): ..

when data is broken apart into either separate schemas or databases, as illustrated in Figure 6-16, a single transactional unit of work no longer exists
Note: N (Dt):...

### Chapter 7: Pulling Things Apart. Service Granularity


The six main drivers for granularity disintegration are

Service Scope and Function

Note: N: 1....A service that does too many unrelated things

Code Volatility


the rate at which the source code changes—

Scalability and Throughput


allows each of these services to scale independently

Fault Tolerance


, a fatal error in the functionality of 
Note: N: ...one service should not affect other services

Security
Note: N: 5... Splitting  a service allows limiting access to sensitive data between low and high security needs

Extensibility

the ability to add additional functionality as the service context grows.

Granularity Integrators


provide guidance and justification for putting services back together

Is an ACID transaction required between separate services?

Although a service can be broken apart, can the data it uses be broken apart as well?


Shared Code


If a change occurs in the shared library, this would eventually necessitate a change in the corresponding services using that shared library. We say eventually because versioning can sometimes be used with shared libraries to provide agility and backward compatibility

Data Relationships


breaking apart the single consolidated service into three separate services now requires the corresponding data tables to be associated with each service

### Chapter 8: Putting Things Back Together. Reuse Patterns


several techniques for managing code reuse within a distributed architecture, 

when developers have simple static code (like annotations, attributes, simple common utilities, and so on) that is either a one-off class or code that is unlikely to ever change because of defects or functional changes. 

a good approach for homogeneous environments where shared code change is low to moderate. The ability to version (although sometimes complex) allows for good levels of agility when making shared code changes. 

avoids reuse by placing shared functionality in a separately deployed service.

changes to a shared service are generally runtime in nature, and therefore carry much more risk than with shared libraries. While versioning can help reduce this risk, it’s much more complex to apply and manage 

Another drawback of the shared service technique is that the shared service must scale as services using the shared service scale. 

is good to use in highly polyglot environments

be careful of runtime side-effects and risks to services needing the shared functionality.


### Chapter 9: Putting Things Back Together. Data Ownership and Distributed Transactions



 A popular technique for addressing common table ownership is to assign a dedicated single service as the primary (and only) owner of that data, meaning only one service is responsible for writing data to the table. Other services needing to perform write actions would send i...

are usually driven by the traditional availability verses consistency 
trade-off commonly found in distributed architectures.

distributed transactions do not support ACID properties.

Note: N: ...because:

each separately deployed service commits its own data and performs only one part of the overall atomic business request.

information is available to any other service or request, 

Consistency is not supported because a failure in one service causes the data to be out of sync between the tables

Durability is not supported across the business request—it is supported for only each individual service. In

Instead of ACID, distributed transactions support something called BASE. 

Basic availability (the “BA” part of BASE) means that all of the services or systems in the distributed transaction are expected to be available to participate in the distributed transaction. 

transaction is in progress and the state of the atomic business request is not yet complete 

Eventual consistency (the E part of BASE) means that given enough time, all parts of the distributed transaction will complete successfully and all of the data is in sync with one another. 

Eventual Consistency Patterns


Distributed architectures rely heavily on eventual consistency as a trade-off for better operational architecture characteristics such as performance, scalability, elasticity, fault tolerance, and availability.

Background Synchronization Pattern


uses a separate external service or process to periodically check data sources and keep them in sync with one another.

Regardless of how the background process is implemented (nightly batch or periodic), this pattern usually has the longest length of time for data sources to become consistent. However, in many cases data sources do not need to be kept in sync immediately.

Orchestrated Request-Based Pattern

the orchestrated request-based pattern attempts to process the entire distributed transaction during the business request, and therefore requires some sort of orchestrator to manage the distributed transaction. 


 The approach we generally prefer when using the orchestrated request-based pattern is to use a dedicated orchestration service for the business request. 

Event-Based Pattern

events are used in conjunction with an asynchronous publish-and-subscribe (pub/sub) messaging model to post events (such as customer unsubscribed) or command messages (such as unsubscribe customer) to a topic or event stream. Services involved in the distributed transaction li...

### Chapter 10: Putting Things Back Together. Distributed Data Access


This chapter describes the various ways services can gain read access to data 

Interservice Communication Pattern


system) needs to read data that it cannot access directly, it simply asks the owning service or system for it by using some sort of remote access protocol.

Column Schema Replication Pattern


columns are replicated across tables, therefore replicating the data and making it available to other bounded contexts.

Replicated Caching Pattern


A replicated cache differs from other caching models in that data is held in-memory within each service and is continuously synchronized so that all services have the same exact data at all times.

The clear advantages of the replicated caching pattern are responsiveness, fault tolerance, and scalability. Because no explicit interservice communication is required between the services, data is readily available in-memory, providing the fastest possible access to data a se...

Data Domain Pattern


Tables that are shared between services are put into a single schema that is then shared by both services. 

### Chapter 11: Putting Things Back Together. Managing Distributed Workflows


Two fundamental coordination patterns exist in distributed architectures:

Orchestration Communication Style


uses an orchestrator (sometimes called a mediator) component to manage workflow state, optional behavior, error handling, notification, and

microservices architectures have an orchestrator per workflow, not a global orchestrator such as an enterprise service bus (ESB). 



This communication style doesn’t scale as well as choreography because it has more coordination points (the orchestrator), which cuts down on potential parallelism.

Choreography Communication Style


the choreography pattern visually illustrates intent of the communication style that has no central coordination.



for choreography, no obvious owner for workflow state exists. Many common options exist to manage state in choreography; here are three

First, the Front Controller pattern  places the responsibility for state on the first called service in the chain of responsibility,

a Front Controller is a domain service that owns 
workflow state in addition to domain behavior

 no transient workflow state at all, relying on querying the individual services to build a real-time snapshot.
Note: N: Second, Stateless Choreography keeps ...

While this simplifies the state of the first service, it greatly increases network overhead in terms of chatter between services to build a stateful snapshot.

Stateless choreography trades high performance for workflow control,

Each domain service updates its part of the overall state and passes that to the next in the chain of responsibility.

No workflow owner makes error management and other boundary conditions more difficult.

the sweet spot for choreography lies with workflows that need responsiveness and scalability,

either don’t have complex error scenarios or they are infrequent.

orchestration is best suited for complex workflows that include boundary and error conditions. While this style doesn’t provide as much scale as choreography, it greatly reduces complexity in most cases.

### Chapter 12: Putting Things Back Together. Transactional Sagas

the saga pattern for microservices as a sequence of local transactions where each update publishes an event, thus triggering the next update in the sequence. If any of those updates fail, the saga issues a series of compensating updates to undo the prior changes made during th...

synchronous, atomic, and orchestrated for communication, consistency, and coordination. 
Note: N: Transactional saga patterns are transactions in a distributed architecture that is a combination of asynchronous, evntual, choreographed or its counterparts ...

### Chapter 13: Putting Things Back Together. Contracts


### Chapter 14: Putting Things Back Together. Managing Analytical Data


The Data Warehouse

Note: N: 3 Approaches for handling analytical data: 1. (DW)...

operational data was stored in relational databases directly accessible via the network. 
Note: N: ...and has these characteristics:

Data extracted from many sources
 

Transformed to single schema
 

Loaded into warehouse
 

Analysis done on the warehouse
 

most data warehouses failed because they didn’t deliver business value commensurate to the effort required to create and maintain the warehouse.

The Data Lake


While it keeps the centralized model and pipelines, it inverts the “transform and load”  model of the data warehouse to a “load and transform” one. 

rather than do useless transformations that may never be used, do no transformations, allowing business users access to analytical data in its natural format, 

the Data Lake pattern avoided the transformation-induced problems 

The Data Mesh


Data mesh is founded on four principles:
 

Domain ownership of data
 

Data as a product
 

Self-serve data platform
 

Computational federated governance
 

### Chapter 15: Putting Things Back Together. Build Your Own Trade-Off Analysis


An architect adds real value to an organization not by chasing silver bullet after silver bullet but rather by honing their skills at analyzing the trade-offs as they appear.
Note: N: There is no generic advice in software architecture. ...

