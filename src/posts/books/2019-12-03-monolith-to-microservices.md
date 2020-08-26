---
layout: book
title:  "Monolith To Microservices"
excerpt: "Evolutionary Patterns to Transform Your Monolith 1st Edition"
date:   2019-12-03
read: 2020-08-17
categories: books
book_url: https://samnewman.io/books/monolith-to-microservices/
book_image: 
tags:
  - architecture
---

### Chapter 1. Just Enough Microservices

### Chapter 2. Planning a Migration
**Microservices** is not a panacea. You have to make a conscious decision with clear goals to adopt it because migrating an existing system will take time.  You must have a core-driver that takes priority over secondary benefits. Start small and slowly chip away your monolith... analyzing your changes every successful migration. If it doesn't work as intended, reversing a small change will not be too bad.

**Choosing it is a good idea when it can:**
1. Improve team autonomy by not having to wait for people to do things for you
2. Reduce time to market by avoiding coordinated releases
3. Scale Cost-Effectively for load because you can horizontally scale parts (not all) of your system up and down
4. Improve robustness from outages through isolation and fortification of critical areas of the system
5. Effectively scale the number of engineers because the learning curve is lower for a microservice with a domain boundary
6. Embrace (or experiment) new technology

**Choosing it is a bad idea when**  
1. Domains are unclear - it can lead to service coupling and costly changes brought by premature decomposition.
2. You are a startup with no proven baseline of what a "good" running system looks like. By knowing one, you can optimize your microservice architecture better.
3. You run a customer-installed and managed software. It does not make sense for this.
4. You don't have a good reason to and just because others are doing it.

**How would you know when your transition works?**  
1. Have a quantitative measure of your changes.  If time-to-market was your core driver, did the change improve it?
2. Have a qualitative measure - do the people who worked with you in bringing it to production have a favorable view of the change?


### Chapter 3. Splitting the Monolith

As much as possible, avoid an all-out migration to microservices.  Even if it makes sense for you to be in a microservice or just want to test one, having a strategy that you can rollback is a safer approach. It's rare to get things right the first time and any new stack can introduce errors that can be destructive even with a comprehensive suite of tests - not to mention the disruption on improvement work on the current system. These are patterns that can help you incrementally transition your monolith into microservices.

**Pattern: Strangler Fig Application**  
The name is derived from a grafting technique where the new branches eventually envelop the fig tree. Application-based implementation of this pattern involves the module you are migrating to be isolated.  Instead of the module calling a downstream function, it calls the microservice function.  The HTTP-based implementation relies on a proxy like NGINX to route requests typically based on REST rules.

**Pattern: UI Composition**  
This involves migrating a UI component, e.g. Search, Reccomendation, or Widgets. It can come in the form of componentization of a certain section of your application or by micro-frontends. This pattern is first applied to a not-so-sensitive vertical of the application so that groundwork on the microservice can be laid out and tested on a production system.

**Pattern: Branch by Abstraction**  
The first step involves creating an abstraction layer between the caller and the monolith function. This would be a dumb pipe (branch) that forwards the call. Once the microservice is ready, the next step is to forward the call to it instead of the monolith but keeping the original code for rollback reasons. This forwarding rule is usually aided by a feature flag for switching/enabling the call.  Once all the kinks are sorted out, then it's time to remove the abstraction and have all calls sent to the microservice.

**Pattern: Parralel Run**  
Some business functions are very sensitive that it is not advisable to put changes in production systems without proper results verification. This pattern requires having 2 versions of the function running in parallel - 1 for the monolith and another for the microservice. Both results are recorded somewhere and analyzed for discrepancies.  The switch to microservice only happens until the differences are worked out. It's important though that there are no performance impacts to the users when you do this.  The book example shows the results are stored in a database table for which the recording function can be called in a fire-and-forget manner and the diff done via a batch process.

**Pattern: Decorating Collaborator**  
This is more along the lines of a side-car pattern when a new functionality can't be easily tacked to a monolith.  In this pattern, when the request for the new feature comes in, it is sent to the "collaborator" service for execution. This collaborator has access to the same data store as the monolith and instead of relying on the monolith for processing, it executes its own rules independent of it.  The book example is a Loyalty Points service for an online e-commerce site.  Orders are placed through the monolith but as soon as the order is processed, an external call to the Loyalty Service is made from the HTTP Proxy layer before the results are returned to the client.


### Chapter 4. Decomposing the Database
Database decomposition can come in the form of a separate database engine, or the same database engine but in different schemas.  The advantage of the latter is you can share database views within the same query if your microservice needs access to common data properties. The downside is you'll have to take extra care that your database engine does not become the single point of failure for your system.  As such, having separate database engines is always preferred specially for new projects.

**Pattern: Database View**  
A rather crude way of exposing data formatted for a microservice is the use of a database view.  Apparently there are databases that allow you to pre-compute the data eliminating the need to run the underlying query everytime the view is accessed.

**Pattern: Synchronize Data in Application**  
The application code is responsible for synching data in this pattern.  After the initial seed to the new database is done, Writes and Reads from the current database are replicated to the new one. When data on the new database has been verified, you can restrict the current database to Reads, eventually diverting all requests to the new database.

**Pattern: Database per bounded context**  
A monolith with well defined boundaries using its own separate database. This allows you to move your monolith to a microservice easily in the future.


### Chapter 5. Growing Pains

Things to consider when you decide to implement a microservice architecture:

* Consider if reporting is an essential piece of the system early on the project. The best approach is still to have a data warehouse for reports.  Since you're dealing with multiple databases, you have to come up with a way to consolidate the data for people in your business who uses it to make decisions.
* Have strong ownership (instead of collective ownership) of a microservice. It leads to consistent design and less overlaps in functionality.
* It is always better to expand an existing microservice contract than to introduce breaking changes. Treat your consumers as your customers - avoid service disruptions as much as possible.
* Consider a log aggregation early in the design of a microservice project.  It will help you debug and trace issues.
* Have syntethic (functional) tests that can simulate live traffic. As your service grows, this will make sure that changes won't break parts of your system - specially the ones that are not obvious.
* Do not copy other architectures without thinking about your problem and the context.  Know your options and how it can solve or benefit your organization.