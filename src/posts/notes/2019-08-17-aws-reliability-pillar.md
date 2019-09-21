---
layout: post
title:  "AWS Reliability Pillar"
excerpt: "AWS Well-Architected Framework"
date:   2019-08-17 06:12
categories: notes
tags:
  - aws
  - ops
---

### What is Reliability
Reliability is the ability to recover from disruption, dynamically acquire resources and mitigate disruptions.

### Common Disruptions

**Hardware Failure**  
Failure of any hardware component in the system, including in hosts, storage, network, or elsewhere.

**Deployment Failure**  
Failure caused directly as a result of a software, hardware, network, or configuration deployment. This includes both automated and manual changes. The rest of the buckets specifically do not meet this definition.

**Load Induced**  
Load related failures can be triggered by a change in behavior, either of a specific caller or in the aggregate, or by the service reaching a tipping point. Load failures can occur in the network.

**Data Induced**  
An input or entry is accepted by the system that it can’t process (“poison pill”)

**Credential Expiration**  
Failure caused by the expiration of a certificate or credential.

**Dependency**  
Failure of a dependent service results in failure of the monitored service.  A 99.99% available application with hard dependencies on 2 external systems available at 99.99%,  can only have a 99.97% uptime (`.9999 * .9999 * .9999 = .9997`).  Converted, that is allowed downtime increase from 52m 37s to 2h 37m 47s in a year.

**Infrastructure**  
Power supply or environmental condition failure has an impact on hardware availability.

**Identifier Exhaustion**  
Exceeding available capacity, a throttling limit was hit, an ID ran out, or a resource that is vended t customers is no longer available.