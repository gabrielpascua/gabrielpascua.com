---
layout: book
title:  "Building Microservices, 2nd Edition"
excerpt: ""
date:   2021-07-23
read: 2022-05-03
categories: books
book_url: https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/
book_image: 
tags:
  - microservice
  - architecture
---


### Chapter 1. What Are Microservices?

Strengths of Microservices:

* Isolated deployments
* Modeled around a business domain
* Owns its data/state
* Flexible technical, scale and failure options

Pain Points of Microservices

* Diminished local development experience
* Overwhelming technology heterogeneity
* Can be expensive
* Monitoring and reporting can be challenging
* Security, Latency, and Data consistency

### Chapter 2. How to Model Microservices

> A structure is stable if cohesion is strong and coupling is low.  - Larry Constantine

**Cohesion** is the connectedness of elements inside a boundary, while **Coupling** is the connectedness of elements outside/across boundaries.  Coupling is unavoidable and the goal is to minimize it as much as one can. 

![Types of Coupling](/img/book-building-microservices-coupling.svg)

There are 4 types of coupling, ranging from how loose to tight they are:

1. **Domain Coupling** - describes the situation where one microservice domain needs to communicate with other microservice domains.  Either minimize the data only to what is required or use a "side car" to broker data exchange.

2. **Pass-Through Coupling** - A microservice sends information to another microservice only for the latter to pass it to a downstream microservice because of some data coming from the original request.  This becomes worst if the downstream microservice forces the upstream microservice to change because of a new data requirement.  Examine whether you really need a pass-through or if it can just be a separate but direct request. Otherwise, make sure the pass-through microservice remains just a "pass-through" middleman service.

3. **Common Coupling** - When 2 or more microservices share the same resources - data, memory, or filesystem. A change in the shared resource will require all the other entities accessing it to change. If it cannot be avoided, make sure that any shared resource change have some state-machine logic to prevent data conflicts between microservices.

4. **Content Coupling** - When a microservice calls another service and reaches further into the downstream's service internals to change the data.  Avoid at all cost because you're exposing your data store to outside resources with requests that are not vetted.


### Chapter 5. Implementing Microservice Communication

**Message Brokers** is a popular choice for allowing microservices to communicate with one another asynchronously with guarantees on delivery.  They either use queues to store messages clients can read from, or send out messages in topics for subscribers to consume. Example technologies are:

 * Apache Kafka
 * RabbitMQ
 * ActiveMQ
 * AWS SQS

 ### Chapter 9. Testing

 Endpoint Testing Frameworks for mocking responses:

 * [mountebank](https://github.com/bbyars/mountebank)
 * [pact](https://pact.io/)

 ### Chapter 11. Security

 Core security principles to consider

 * Principle of Least Privilege - without clear instructions, always grant minimum access
 * Defense in Depth - provide layers of protection
 * Automation - automate manual tasks to reduce human error
 
### Chapter 14. User Interfaces

Patterns of user interfaces interacting with Microservices

**Monolithic Frontend**  
The UI state is the same as the API data/models, and the UI behavior maps to available API endpoints and its responses. Information is structured in the form easily understood by the UI.

**Micro Frontends**  
Different parts of a UI can be worked on and deployed independently. The breakdown or split can either be Page or Widget/Component-based.

**Backend for Frontend**  
This relies on another backend service the UI connects to and is specifically built for aggregating backend data from different microservices. This is the service equivalent of an API gateway network. This pattern can be a good solution for when you have clients (web, ios, android, 3rd party) that require different aggregated data for their UI.  GraphQL endpoints are in this category.