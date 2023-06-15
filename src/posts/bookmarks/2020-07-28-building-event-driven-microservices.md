---
layout: book
title:  "Building Event-Driven Microservices"
excerpt: "Leveraging Organizational Data at Scale"
date: 2020-07-28
read: 2022-06-24
categories: books
book_url: https://www.oreilly.com/library/view/building-event-driven-microservices/9781492057888/
book_image: 
tags:
  - software
  - architecture
---

### Chapter 1. Why Event-Driven Microservices (EDM)

* Event-based communications are not a drop-in replacement for request-response
* Events are the basis of communication. Events are the data and not merely signals

### Chapter 2. Event-Driven Microservice Fundamentals

* An event is a recording of what happened to anything that is important to the business.
* An event broker that stores and broadcasts events is at the center of any event-driven architecture.
* An event broker is different from a message broker in that the former has the ability to store events whereas the latter as a queuing mechanism will delete the message after acknowledgement.

### Chapter 3. Communication and Data Contracts

Updating event data often cause breaking changes to unaware consumers. As such, having data contracts through explicitly defined schemas promote forward and backward compatibility. For consumers who want to use the latest updates, they need only update their schema. 2 popular data formats for serializing event data are:

1. [Apache Avro](https://avro.apache.org/docs/current/index.html)
2. [Protocol Buffers (ProtoBuf)](https://developers.google.com/protocol-buffers/docs/overview)

Unstructured plain-text JSON (Implicit schema) are not advised because it doesn't allow for evolution of data without inter-team discussions across different consumers.

**Recommendations for designing event data:**

* Tell the complete truth - everything that happened during the event
* One event per stream - single purpose
* Use the narrowest (most native) data type - it allows for easy type checking and serialization
* Minimize the size of events
* Involve consumers during design


### Chapter 4. Integrating Event-Driven Architectures (EDA) with Existing Systems

**Data Liberation**  

Data Liberation as part of migration to EDA, are the tasks involved in identifying data sets across business domains for publishing to event streams. Application states are maintained and sourced from the event stream.

![Data Liberation](/img/book-data-liberation.svg)

You can extract the data for your event streams in 3 ways:

1. **By querying the underlying store**. Here, timestamps and IDs play a role to identify incremental changes instead of 1 huge payload. Consider using a read-replica when using this approach because active queries can impact your live traffic.
2. **By extracting data from the logs** if supported like binary logs in MySQL or write-ahead logs for PostgreSQL.
3. **By pushing data to an "outbox" table** where another thread emits the data to your stream from this source. This outbox table will contain notable changes from the internal table where writes to the 2 tables are done in a single transaction to maintain consistency. This is expensive to maintain since almost any significant change will require a 1:1 internal-to-outbox relationship.


### Chapter 5. Event-Driven Processing Basics

### Chapter 6. Deterministic Stream Processing

While achieving fully-deterministic event processing is impossible, there are certain measures you can put in place to minimize or handle out-of-order (late) events gracefully.

1. Tracking timestamps - event creation time, broker ingestion, processing and streaming time, consumer ingestion and processing time. By which you can make informed decisions on how to order or re-process events whenever they arrive.
2. Watermarking - Involves marking processed events as they arrive passing it to downstream consumers for them to identify what to process next. Data is not necessarily processed in-order, and the watermark reflects all pending work in the system.
3. Windowing - event brokers grouping events together based on a pre-defined or sliding time block and having an internal mechanism to order events from multiple sources


### Chapter 7. Stateful Streaming

* Event data storage can either be localized (in-memory) or externalized (in-network) when persisting state
* Consistent write logic can use "Effectively Once processing" regardless of any failure, "Idempotent Writes" where the broker ensures there are no duplicate events, or by transactions
* Backups and restoration can use change logs if the feature is available. This is more performant since it does not involve reading any records from your store.
* If applicable, using hashing functions on event data can prevent duplicate processing


### Chapter 8. Building Workflows with Microservices

1. **Choreographed** - A highly decoupled workflow where microservices react to events as they consume or subscribe to.  
![Choreographed Workflow](/img/book-event-driven-c8-choreographed.svg)  

2. **Orchestrated** - A central microservice issues commands and awaits responses from subordinate microservices.  There's a high coupling for this type of workflow between the orchestrator and lower microservices.  
![Orchestrated Workflow](/img/book-event-driven-c8-orchestrated.svg)  

3. **Transactional** - or Saga is a workflow where the full set of operations across several microservices must finish for it to succeed. Otherwise, each of the microservice involved must have knowledge of how to reverse an operation in case 1 fails. It can either be choreographed or orchestrated.


### Chapter 9. Microservices Using Function-as-a-Service

Open Source FaaS
* [OpenWhisk](https://openwhisk.apache.org/)
* [OpenFaaS](https://www.openfaas.com/)
* [Kubeless](https://kubeless.io/)


### Chapter 10. Basic Producer and Consumer Microservices

### Chapter 11. Heavyweight Framework Microservices

### Chapter 12. Lightweight Framework Microservices

### Chapter 13. Integrating Event-Driven and Request-Response Microservices

Some ways of handling Request-Response:

1. Executed within an EDM processing, where there's no need to wait for the Response - such as logging, analytics, and other secondary data collections
2. The Request is converted to an Event Data and its response also converted to an Event Data for event streams to process
3. Event Data from a Request and its Response is saved into a data store (local or external) for other EDM's to access

### Chapter 14. Supportive Tooling

### Chapter 15. Testing Event-Driven Microservices

### Chapter 16. Deploying Event-Driven Microservices

### Chapter 17. Conclusion