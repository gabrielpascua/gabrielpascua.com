---
layout: book
title:  "Site Reliability Engineering"
excerpt: "How Google Runs Production Systems 1st Edition"
date:   2016-04-16
categories: books
book_url: http://shop.oreilly.com/product/0636920041528.do
book_image: /img/book-site-reliability-engineering-360x472.jpg
tags:
  - ops
---

### Preface
* The earlier you care about reliability (and security) the better because it’s less costly compared to expanding an infrastructure later on
* SRE requires thoroughness and dedication
* SRE values preparation and documentation
* SRE is aware of what could go wrong and have a strong desire to prevent it
<p></p>

### Introduction
* Site Reliability Engineering is Google’s approach to Service Management.  The team focuses a lot on development (engineering) and less on operational IT tasks because the system runs and repairs itself.  The goal is an autonomic and not automatic system. 
* Google caps operational work (toil) at 50% and the rest on coding for projects.
* The business or the product team creates a Service Level Objective (SLO) that establishes the availability target - expressed by the number of 9’s after 99%.  Its difference minus 100% is spent on whatever the team needs to improve the system.  This allows the team to pursuit maximum change velocity without affecting the SLO.
* **Tenets (Principles) of SRE**
    1.  Monitoring - Some valid outputs are alerts, tickets, and logs.  It should never require a human to decide what to do with these.  Software should interpret it and only notify the team when they need to take action. 
    2.  Emergency Response - When a person is required to take action, having a playbook produces ~3X improvement in the mean time to repair (MTTR) the problem compared to figuring it out as you go along. The  “practiced on-call engineer armed with a playbook works much better” than “the hero jack-of-all-trades engineer”.
    3.  Change Management - ~70% of outages are caused by changes to the live system and the best practice when rolling out updates is to use automation to prevent human inattention to highly repetitive tasks.
    4.  Demand Forecasting and Capacity Planning - ensures that there is enough capacity and redundancy required for a future demand caused by organic (product adoption and usage) and inorganic (launches, campaigns, marketing) growth.
    5.  Provisioning - Combination of change management and capacity planning that often involves spinning new instances and making significant changes to the system like configuration.
    6.  Efficiency and Performance - SREs involvement in provisioning and monitoring resource utilization to improve performance contributes to a system’s efficiency.
<p></p>

### The Production Environment at Google, from the Viewpoint of an SRE
* Google’s Development environment consists of open source and shared repositories, build servers, and continuous testing.  Each time a Change List (Build) is submitted, tests run on all software in parallel.  It can notify the owner of the change if it broke other parts of the system.
* Some systems follow a push-on-green system where a new production version is pushed if all the tests succeeded.
<p></p>

### Principles:  Embracing Risk
* The cost of extreme reliability is the speed of how new features (innovation) can be developed and offered to the users.  
* Users do not distinguish extreme vs high reliability in systems.
* The tradeoff between reliability and features determines the target availability of a system.  Youtube for example has a lower availability target compared to other Google enterprise products because feature development is more important.
* Google defines an error budget to determine how unreliable a system can be at a given quarter.  These decisions are based on objective data formed by SMEs and product development teams. This process removes politics between teams when deciding how much risk to allow.
* The benefit of having an error budget is that it provides incentive between teams to provide a balance between innovation and reliability.  
<p></p>

### Principles: Service Level Objectives (SLOs)
* SLO’s should reflect what the users care about.  It should be the major driver in determining work for SREs  and product development team.
* Studies show that users prefer a slower response time than one with a higher variance.
* SLO’s set expectations so keep a safety margin and do not overachieve.  If what you offer is higher than your SLO, users will come to expect your actual performance as the baseline.
<p></p>

### Principles: Eliminating Toil
* Toil is the kind of work on production systems that do not provide enduring value and makes systems scale linearly. Reducing toil is the “Engineering” in SRE and it allows systems to scale up improving reliability, performance and utilization along the way.  If left unchecked, it can fill up everyone’s time.
* **Characteristics of Toil:**
    1.  Manual - Running a script that automates some task
    2.  Repetitive - Something done over and over
    3.  Automatable - Something that a machine can do instead of a person, or can be designed away
    4.  Tactical - Something that causes interruption such as alerts that should be minimized
    5.  No enduring value - work that does not improve your service
    6.  On with services growth - work that increases as demand on your system increases
* The repetitive and predictable nature of toil provides a low stress and low risk type of work that is good in small doses. Too much of it causes:
    1.  Career Stagnation - You can’t make a career out of grunge work
    2.  Low morale - toil can lead to boredom, discontent, and burnout
    3.  Creates confusion in Google’s organization - knowing Engineering is their main role
    4.  Slows progress - it makes teams less productive
    5.  Sets precedent - if you take a lot of toil, then other developers will pass you more toil
    6.  Promotes attrition - putting too much toil on a team causes other engineers to pursuit more rewarding jobs
    7.  Causes breach of faith - new hires loaded with toil instead of projects will feel cheated
<p></p>

###  Principles: Monitoring Distributed Systems
* Why do you need monitoring:
    1.  Analyzing long-term trends - how big is my database or user growing
    2.  Comparing over time or experiment groups - cache hit rates over a period of time, how fast was my site a month ago
    3.  Alerting
    4.  Building dashboards - must include the 4 golden signals
    5.  Conducting ad hoc retrospective analysis (i.e., debugging)
* Monitoring and alerting can tell if your service is broken or about to break
* A monitoring system must address what is broken (symptoms) and why (causes)
* If you can only focus on monitoring certain aspects of your service, focus on these 4 Golden Signals:
    1.  Latency - how long does it take to serve a successful request, what about a failed request
    2.  Traffic - how much demand is placed in your system, can it be broken down e.g. static vs dynamic HTTP content
    3.  Errors - the rate of how much request fails either explicitly (500 errors) or implicitly (200 with wrong payload)
    4.  Saturation - how full is your system with emphasis on where there is more constraints like memory, database, or IO
* A short-term decrease in availability could be painful but strategic for the long-term stability of the system.
<p></p>

###  Principles:  The Evolution of Automation at Google
* Although automation can improve a system tenfold, it does not solve all the problems a system presents.  Its value comes from:
    1.  Consistency - Compared to humans, software can perform the same task a hundred of times without error
    2.  A Platform - Designed properly it can be applied to other systems or offered for profit
    3.  Faster Repairs - If applied to resolve problems, automation can speed up a system’s MTTR
    4.  Faster Action - Software responds a lot faster
    5.  Time Saving - It comes for future users that can execute a task that has been contained
* Automation that deals with purges should be done carefully.  Although a lot of benefits can be said about automation, an incorrectly configured delete have a possibility to take down a business.
<p></p>

###  Principles: Release Engineering
* Release Engineering is a specific job at Google guided by these 4 principles:
    1.  Self-Service Model - Release should be automatic and only requires human intervention when an error occurs
    2.  High Velocity - Releases are done frequently to purposely put fewer changes between versions so that troubleshooting is easier
    3.  Hermetic Builds - Build process must be contained and do not rely on software installed on a machine.  It should instead use compilers or library dependencies.
    4.  Enforcement of Policies and Procedures - Gated releases through a process such as code review can help SREs understand the changes and help troubleshoot problems before it arises.
* Because Google’s branching strategy starts off the mainline or a specific revision, they run unit tests when changes are submitted and before a release.
* Start release engineering early in the process because it is cheaper to put good practices in the beginning than having to update the system later.
<p></p>

### Principles: Simplicity
* Software can only be stable if we stop making changes to the codebase or we stop updating hardware that it runs on.  The job of SREs is to balance stability and agility.
* Boring is a positive attitude in software - we want them to be predictable and to not come up with surprises on production.  Complexity should always be minimized whenever possible.
* Leaving commented code is a bad practice.  Version control allows developers to undo previous changes easily.  
* Simple releases are generally better because it allows you to move with confidence that your changes are well isolated and are easily tested
* Simplicity is a prerequisite of reliability
<p></p>

### Practices:  Practical Alerting from Time-Series Data
* Monitoring systems must offer aggregated for high level interpretation, and granular outputs to inspect components if needed
* An alerting example is Prometheus - an open source monitoring and time-series database system available at http://prometheus.io.  Other open source projects are Rieman, Heka, and Bosun.
<p></p>

### Practices:  Being On-Call
* The decision to have multi-site teams should be based on the balance of the communication and coordination overhead an organization can tolerate, relative to how important the system is.
* An engineer’s shift should allow her to deal with the incident and follow up activities such as post mortems.
* Individuals think in 2 ways when faced with challenges:
    1.  Intuitive, automatic and rapid action - deeply rooted in habit and are often less thought out.  This is well suited for mundane tasks.
    2.  Rational, focused, and deliberate cognitive functions - Most likely to produce better results when dealing with outages on complex systems
* Good incident management requires making decisions based on sufficient data while simultaneously examining your assumptions.
* These are the most important on-call resources.  Having these in place will let SREs focus on incidents than on unimportant tasks such as formatting emails or figuring out the right people to report
    1. Clear escalation paths 
    2. Well-defined incident-management procedures 
    3. A blameless post mortem culture
* Postmortems must focus on the event and not the person.  Its value comes from the analysis of incidents to avoid future recurrence.
<p></p>

### Practices: Effective Troubleshooting
* There’s no substitute on learning how the system is designed and built to be an effective SRE
* The most straightforward way of fixing a problem is to figure out what you know, what you don’t, and what you need to know then find out the What, Where, and Why.
* The first response in an outage should be focused on bringing the service up and making it run under such circumstances.  Stopping the bleeding will help the users and at the same time buy you time to look for the root cause of the problem.
<p></p>

### Practices:  Emergency Response
* Test-Induced Emergency is one of ways Google proactively tests their systems.  SREs periodically break the system and make necessary improvements.
* Change-Induced Emergency - Sometimes changes just don’t go as planned, and Google relies on their own tools for troubleshooting such incidents
* Process-Induced Emergency are jobs and automation tasks that do not work as intended.  
* Systems will inevitably break, but every problem has a solution.  If you can’t figure it out on your own, “cast your net farther” - involve other teammates.  Do whatever it takes, but do it quickly.  Always put a high priority on the issue at hand.
* Learn from the past (write postmortems), Ask improbable questions (what if power is cut off), and Encourage Proactive Reliability Testing (Test-Induced Emergency).
<p></p>

### Practices: Managing Incidents
* It’s important that everyone knows their role in managing an incident.  This will give individuals more autonomy to tackle it because they need not second guess what their colleagues do.
* Best Practices for Incident Management:
    1.  Prioritize - Stop the bleeding, restore the service, and preserve the evidence
    2.  Prepare - Have incident management procedures in advance
    3.  Trust - that your colleagues will perform their role
    4.  Introspect - Always check your emotional state, do not panic nor get overwhelmed and ask for help if you do.
    5.  Consider Alternatives - Keep re-evaluating your options and their value
    6.  Practice - Use the incident management process routinely to familiarize yourself
    7.  Change it Around - Assume a different role from time to time
<p></p>

### Practices: Postmortem Culture: Learning from Failure
* The primary goals of a postmortem are that the incident is thoroughly documented, its root-cause(s) well understood, and preventive measures are put in place.  It isn’t made to punish or blame anyone.  It is done so the company can learn from it and avoid recurrence.  
* For a postmortem to be blameless, it must focus on the incident.  It assumes that everyone involved have good intentions and they did the right thing with the information they had at the time. 
* Google encourages postmortem reviews to address comments and “capture ideas”
<p></p>

###  Practices: Tracking Outages
* Improving reliability is only possible if you start from a known baseline and be able to track its progress.  Having a system that can analyze outage data from other monitoring systems have positive effects on service management.
* Being able to identify that a unit of data such as an alert (and a flood of it) coincides with an outage will help speed up diagnosis of an incident.
<p></p>

###  Practices: Testing for Reliability
* Tests fall into 2 categories - Traditional and Production.  Traditional tests the correctness of your code during development, while Production tests are ran to evaluate a live system.
* Types of Traditional Test:
    1.  Unit Test - smallest form of testing used on classes or functions
    2.  Integration Test - Component based testing
    3.  System Test - End to End functionality testing. Types of System Tests:
        a. Smoke tests or Sanity Tests - testing a simple but critical behavior
        b. Performance Tests - checking that a system doesn’t degrade over time
        c. Regression Tests - ensures bugs don’t get reintroduced
* Types of Production Test:
    1.  Configuration Test - Each configuration file has its own test that looks for discrepancies
    2.  Stress Test - Aims to find the limit of a service
    3.  Canary Test - similar to the use of a “canary in a coal mine”. A subset of upgraded servers can be deployed and left for an incubation period.  If nothing goes wrong, all servers are upgraded otherwise it can be easily reverted.
* If unit testing is low or nonexistent, start testing that which delivers most impact with the least effort
* One way to establish a strong testing culture is to treat each bug as a test.  It will lead a comprehensive regression test suite.
<p></p>

###  Practices:  Software Engineering in SRE
* One of SREs guiding principles is that “team size should not scale directly with service growth.”  Team growth is brought by efforts to automate and streamline inefficiencies in the system.
* If the bounds of a problem aren’t well known, do not focus on the purity or perfection of the solution.  Launch and iterate.
* If a project has a fuzzy requirement, use the fuzziness to make your code generic and modular
* Do not wait for the perfect or complete design.  Keep the vision in mind, and write a flexible codebase to avoid a high rework cost.  At the same time, make sure that the generic implementation has a utility value that addresses a specific problem.
* Do not lower your standards.  Resist the urge to cut corners.
* It takes a long time to develop your software credibility but it only takes a misstep to lose it. 
<p></p>

###  Practices:  Load Balancing at the Frontend (Traffic Load Balancing)
* On a large scale system, putting all your eggs in one basket is a recipe for disaster
* Load balance early and load balance often
* Scaling vertically or adding more power isn’t the answer.  Having a system with a single point of failure is always a bad idea.
* Levels of Front End Load Balancing Employed by Google:
    1.  DNS Load Balancing - It’s a simple and effective way balance load before the user’s connection starts, e.g. return multiple A or AAA records and let the client pick an IP address arbitrarily.
    2.  Virtual IP Address Load Balancing - The load balancer receives packets and forwards them to one of the machines behind the Virtual IP Addresses which is typically the least loaded backend.
<p></p>

###  Practices:  Load Balancing in the Datacenter
* A better approach for when a backend is unhealthy is to keep accepting request but respond by telling the clients to stop.  They call this the lame duck state.  Assuming the client knows how to handle lame duck responses, it allows clean shutdown of unhealthy backends which avoids serving errors to unlucky requests.
* Load Balancing Policies:
    1.  Simple Round Robin - send requests to any backend that isn’t in a lame duck state.  Although simple it can be very wasteful on resources for cases when the query cost of a request is expensive or when the request rate is different between clients.
    2.  Least Loaded Round Robin - clients keep track of active requests and use Round Robin amongst the set of tasks with a minimal number of request
    3.  Weighted Round Robin - backends will provide information about its state that the clients can rate.  Based on this score, the clients will then weigh the distribution of requests among its subset.  This has worked well in evenly distributing tasks.
<p></p>

###  Practices: Handling Overload
* Systems will eventually get overloaded and the gracefully handling it is fundamental to a reliable system.
* The criticality of a request is always factored in throttling strategies.  When a backend experiences a higher utilization, requests can be rejected based on their criticality.  As such, every backend request can be 1 of these:
    1.  CRITICAL_PLUS - results are visible to the users if the request fails
    2.  CRITICAL - user visible impact is less severe than CRITICAL_PLUS
    3.  SHEDDABLE_PLUS - partial unavailability is expected
    4.  SHEDDABLE - partial and full unavailability is expected
* Retry logic to avoid bogging down an already overloaded backend:
    1.  Set a per request retry budget. 3 in Google’s case
    2.  Set a per client retry budget - Clients keep track of their retries and will only continue if it does not exceed its budget.  10% in Google’s case
    3.  Clients maintain a retry count in their request that the backend can use and compare with other instances.  If the backend determines that there is a significant amount of retries in its cluster, then it returns an overloaded error.
* It’s a common mistake to shutdown or reject traffic when a backend is overloaded.  The right approach is to handle requests it can process and gracefully reject the rest until capacity frees up.
<p></p>

###  Practices: Addressing Cascading Failures
* Cascading failure is a failure that grows over time as a result of a partial failure in an interconnected system. 
* Causes of Cascading Failures:
    1.  Server Overload
    2.  Running out of Resources - CPU, Memory, Threads blocked by other threads (thread starvation), Running out of file descriptors (linux)
    3.  Service Unavailability - a server in a cluster crashes sending traffic to other servers eventually crashing them
* Strategies for preventing server overload:
    1.  Load test and test the failure mode of your server
    - Test until failure and beyond and know how your system reacts
    - Test how popular clients use your service
    - Test non-critical backends and make sure they don’t crash your system if unavailable
    2.  Be able to serve degraded results when utilization is high
    -  Gracefully degrade responses.  Instead of fetching from the database use the cache.  If there’s a less accurate but faster algorithm, use that instead of an expensive one.
    3.  Reject requests when server is overloaded
    -  Load shedding or drop requests before the backend hits overload conditions
    4.  Have a rate-limiting system to reject requests instead of waiting for a server to be overloaded
    -  Limit retries per request and make sure your responses indicate if it has exceeded it.
    -  Set deadlines (timeouts) on how long a client waits before it gives up on a request
    5.  Perform capacity planning
* Cascading Failure Triggers
    1.  Process Death such as Query of Death
    2.  Process Updates - either plan for necessary capacity or push it during off peak
    3.  New Rollouts - always have a revert plan
    4.  Organic Growth - service usage increase without capacity adjustment
    5.  Planned Changes, Drains or Downtime
* Steps to Address Cascading Failures
    1.  Increase Resources
    2.  Stop health checks temporarily in the event that a health check causes the system to become unhealthy like in cases where instances that needs restarting
    3.  Restart the servers - do this slowly to avoid amplifying an existing cascading failure
    4.  Drop Traffic - consider this as a last resort because it will have a visible impact to the users
    5.  Send degraded responses
    6.  Eliminate Batch Load - turn off non critical services like statistics gathering
    7.  Eliminate Bad Traffic - block queries that creates a heavy load
<p></p>

###  Practices: Managing Critical State: Distributed Consensus for Reliability
* Whenever leader election, shared state, or distributed locking is required, a formal distributed consensus is recommended.  It’s an agreement that will establish the correctness of a group of systems connected by an unreliable network.  Data integrity cannot be sacrificed over reliability.
* System Architecture Patterns for Distributed Consensus:
    1.  Reliable Replicated State Machines
    2.  Reliable Replicated Datastores and Configuration Stores
    3.  Highly Available Processing Using Leader Election
    4.  Distributed Coordination and Locking Services
    5.  Reliable Distributed Queuing and Messaging
<p></p>

### Practices:  Distributed Periodic Scheduling with Cron
* In general, skipping cron launches can be managed compared to double launches.  
* Google’s distributed consensus algorithm does not store logs on their distributed file system.  It puts it on local disks.  The figured that its loss is an acceptable risk compared to the performance impact of frequent writes to the distributed file system.
<p></p>

### Practices:  Data Processing Pipelines
* Pipeline Design Pattern is a classic approach in processing data where a program reads from a source, transforms it, then outputs new data.  It’s typically run on schedule like a cron task.
* Drawbacks of Periodic Pipelines in a Distributed Environment
    1.  Thundering Herd - overwhelming a server with too many service workers
    2.  Moire Load Pattern - 2 or more pipelines overlap execution causing them to consume a shared resource
    3.  Monitoring Problems in a Periodic Pipeline
* Google developed a system called Workflow that allows continuous processing at scale.  It is similar to MVC where the Task Master is the Model, and its Workers as the Views, and controllers as optional components the Views require.
* For a pipeline to be effective in a distributed environment, it must have guarantees.  Some guarantees that Google implemented are configuration, lease ownership, and filename uniqueness.
<p></p>

### Practices: Data Integrity: What You Read is What You Wrote
* Data Integrity by Google’s definition is the measure of accessibility and accuracy of datastores needed to provide users adequate service.  User access to data is a must.
* Data Integrity is a means, and data availability is the goal.  For the users data integrity with regular unavailability is the same as having no data at all.
* Instead of focusing on backups, put more effort on the restoration strategy.  It’ll be more useful and will have visible payoffs.
* A combination of these 3 factors can lead to data loss (Root Cause x Scope x Rate):
    1.  Root cause - User action, operator error, bugs, infrastructure defect, hardware fault, site disaster
    2.  Scope - effects can be widespread or narrow to a specific subset of users
    3.  Rate - big bang (affects 1M records) or slow and steady (10 records / hr)
* To defend against data loss, several layers of defense must be employed:
    1.  First Layer: Soft Deletion - the primary defense for developer error, and secondary defense for user error
    2.  Second Layer: Backups and Their Related Recovery Methods - backup decisions should be driven by recovery not the other way around
    3.  Third Layer: Early Detection - bad data propagates every update, degrading the quality of your data over time.  Periodic data validation is recommended.
* Ensure that your Data Recovery will work by:
    1.  Regularly testing your recovery process as part of your normal operations
    2.  Setup alerts for your recovery process specially in the event of failure
* General SRE principles applied to data integrity:
    1.  Beginners Mind - even if you’re already familiar with a complex system, always verify
    2.  Trust but verify - check the correctness of your system’s components
    3.  Hope is not a strategy - regularly test your recovery, prove that it works, and automate tasks
    4.  Defense in depth - put multi-tiered safeguards against data loss
* The holy grail of data integrity is “all the data, all the time”.  
<p></p>

###  Practices: Reliable Product Launches at Scale
* A launch can have a requirement combination of Lightweight, Robust, Thorough, Scalable, and Adaptable.  Balancing these requires:
    1.  Simplicity - not planning for every eventuality
    2.  A high touch approach - customized process for every launch
    3.  Fast common paths - identifying launch patterns and replicating successful processes
* Always have a launch checklist.  It will reduce failure, ensure consistency and completeness. Google employs a Question - Action Item pair for every item in their checklist, e.g. Q: Do you need a domain? AI: Coordinate with the other department.   
* When drafting a checklist, focus on broad topics such as reliability, failures, and processes.
* Selected Techniques for Reliable Launches:
    1.  Gradual and Staged Rollouts - canary launches, start with a few servers before updating all the data center machines
    2.  Feature Flag Frameworks - gradually introduce new features from 0 to 100% of your users
    3.  Deal with Abusive Client Behavior - have an ability to control client behavior from your server
    4.  Overload Behavior and Load Tests - make sure you have enough capacity for the expected demand
<p></p>

### Management: Accelerating SREs to On-Call and Beyond
* Training is an important part of hiring an SRE.  Trial by fire assumes that an SREs job is accomplished by simply ‘doing’ and not reasoning.
* Some suggestions to structure training for new hires:
    1.  Learning Paths That Are Cumulative and Orderly - have them learn your system and combine the right mix of theory that they will encounter and hands-on application
    2.  Targeted Project Work, Not Menial Work - it’ll help them take ownership of solving a problem and build trust among senior members
* SREs should be trained to become “Stellar Reverse Engineers and Improvisational Thinkers”
    * As Reverse Engineers - chances are SREs will encounter systems they have never seen before.  The willingness to dig deep and understand a system’s nuances will help them become efficient at their job.
    * As Statistical and Comparative Thinkers - As an SREs experience develops, she should be able to navigate a decision tree quickly by analyzing variables an incident presents
    * As Improv Artists - learn tools and combine them to help you solve your problem.  This skill will help expand an SREs options when a solution fails
* Investing in SRE training is worthwhile.  As an SRE, you have to scale your humans faster than your machines.
<p></p>

###  Management:  Dealing With Interrupts
* Polarize your SREs time to either “just projects” or “just interrupts”.  It’ll help limit context switches that contribute to a person’s distractibility. 
* Add another person if the volume of interrupt is too much for 1 SRE.
* If an SRE is on-call, she should never be expected to have progress on a project
* Do not just assign tickets randomly to spread out the load amongst your SREs.  An SRE should be given enough time to accomplish a ticket before moving on to a new one.
* Assign well defined roles - if someone is responsible for another process in a task, it’ll free up the load on the SRE to shepherd it to completion
* Analyze all your tickets to see if there’s a fixable root cause.  Then silence the interrupts until it’s fixed
<p></p>

### Management:  Embedding an SRE to Recover from Operational Overload (Assigning an SRE to a Different Team)
* Phase 1: Learn the Service and Get Context:
    - Identify existing problems and not just focus on operational work
    - Identify parts of the system that may present future problems
* Phase 2:  Sharing Context:
    - Write a good, blameless post mortem for the team
    - Classify toil work from what isn’t to determine what is overhead vs what can be automated
* Phase 3: Driving Change (that will help the team to self regulate once you’re done):
    - Start With the Basics - create an SLO for the team
    - Get Help Clearing Kindling - do not fix issues you find. Assign it to a team member to promote ownership
    - Explain your reasoning. It’ll help create a mental model for the team
    - Ask Leading (not loaded) questions.  It will encourage the team to think about basic principles
<p></p>

###  Management: Communication and Collaboration in SRE
* Production meetings bring production concerns such as operational performance, recommendations, etc.. to the invitees.  Its goal is to bring awareness to everyone who cares about the state of the production environment and to get everyone on the same page.  Google uses Google Docs for real time collaboration.
* When collaborating within SRE, standards such as coding guidelines are important in establishing team norms.  When there is a debate, put a time limit, pick one, document and go with it.  Over time, it’ll help build a collection of best practices that new hires can follow.
* When collaborating outside SRE, it’s best to be involved early in the design phase.  As stated in the early chapters, retrofitting architectural changes is more expensive.
<p></p>

###  Management: The Evolving SRE Engagement Model
* Work done by the SRE must be sufficiently reviews by the development team to ensure effective knowledge sharing.  SREs should work as part of the team and not an external unit.
* There are times when a project does not require an SRE such as when a service has been deemed reliable and low maintenance.
* Frameworks can provide consistent structural solutions.  It frees developers from putting together components.  Having a framework also helps SREs review systems because of its common implementation and configuration.
<p></p>

###  Conclusions:  Lessons Learned from Other Industries
* Hope is not a strategy.  Be prepared for disaster and always ask the question of what could possibly go wrong.
* Strategies for Testing Disaster Readiness:
    1.  Relentless Organizational Focus on Safety - always prepare for the unexpected
    2.  Attention to Detail - a small oversight can pose problems to an interconnected system
    3.  Swing Capacity - having extra capacity to roll out before or during overloaded events
    4.  Simulations and Live Drills 
    5.  Training and Certification - having site(system) specific training
    6.  Focus on Detailed Requirements Gathering and Design
    7.  Defense in Depth and Breadth - multi layered protection
* When writing a post mortem it’s important to evaluate:
    - What happened
    - Effectiveness of the response
    - What can be done differently next time
    - What should be done so it doesn’t happen again
* Post mortems are published across different SRE teams so everybody can learn from it
* The other benefit of automation is it can lower operational work so SREs can focus on improving the system
* Google aspires to make structured decisions by:
    - The basis for the decision is agreed upon advance, rather than justified ex post facto
    - The inputs to the decision are clear
    - Any assumptions are explicitly stated
    - Data-driven decisions win over decisions based on feelings, hunches, or the opinion of the most senior employee in the room
* Google operates on the assumptions that everyone in the SRE team has the user's best interests and every member is capable to make sound decisions based on data available
<p></p>

###  Conclusion
* SREs course is to follow how the aircraft industry was able to scale.  To this day, flying has been the most reliable and safest way of transportation.  Even with a complex cockpit dashboard, at most a plane is only flown by 2 pilots.  The answer to the question on how such a complex system is only monitored by 2 people lies on the redundancy and other safety features built on a plane. In a way the aircraft industry has figured out how to present such complexity in a manner that can be understood by highly trained pilots.  On the same token SRE teams aim to remain compact but have comprehensive knowledge of systems they operate.