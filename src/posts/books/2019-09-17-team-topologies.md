---
layout: book
title:  "Team Topologies"
excerpt: "Organizing Business and Technology Teams for Fast Flow"
date:   2019-09-17
read: 
categories: books
book_url: https://teamtopologies.com/book
book_image: 
tags:
  - software
  - patterns
---

## Part I Teams As the Means of Delivery

### 1 The Problem with Org Charts

There are 3 organizational structures in every company:

1. Formal structure (the org chart)—facilitates compliance
2. Informal structure—the “realm of influence” between individuals
3. Value creation structure—how work actually gets done based on inter-personal and inter-team reputation

The key to successful knowledge teams is how effective the interactions are between the Informal and Value creation structures.


### 2 Conway’s Law and Why It Matters

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure. - Melvin Conway, Conway's Law

> If the architecture of the system and the architecture of the organization are at odds, the architecture of the organization wins. - Ruth Malan, Modern Conway's Law

> Organizations should evolve their team and organizational structure to achieve the desired architecture. - Inverse Conway Maneuver

* The organization is constrained to produce designs that match or mimic the real, on-the-ground communication structure of the organization because of the "homomorphic" (similar form) force that pulls team into this direction.
* Conway's law tells us that we need to know what software architecture is needed before organizing teams
* It's difficult to pursue alternative end-to-end designs in siloed teams because the communication paths between teams don't exist

### 3 Team-First Thinking

 * Keep teams small - 7 to 9, not more than 15
 * Each team has ownership of one domain to minimize cognitive load
 * Design virtual and physical space for teams
 * Reward the team and not individuals
 * Avoid individuals that don't play well in a team setting
 * Software architecture reflects group of teams
 * There's diversity in team members


## PART II Team Topologies thatWork for Flow
 
### 4 Static Team Topologies

Team Topology is a structure where members are consciously selected and placed to have an effective software delivery flow. Consider the following when choosing a topology:

1. **Technical and Cultural Maturity** - cross-functional teams are only effective if the engineers are battle-tested and have been in the company long enough to understand the whole system.
2. **Organization Size and Scale** - Small organizations can benefit from experience end-to-end teams, while Large ones benefit from specialized teams


### 5 The Four Fundamental Team Topologies

1. **Stream-aligned team** - a team aligned to a single, valuable stream of work; this might be a single product or service, a single set of features, a single user journey, or a single user persona. Further, the team is empowered to build and deliver customer or user value as quickly, safely, and independently as possible, without requiring hand-offs to other teams to perform parts of the work.

2. **Enabling team** - a team composed of specialists in a given technical (or product) domain. They have the required bandwidth to research, try out options, and make informed suggestions on adequate tooling, practices, frameworks, and any of the ecosystem choices around the application stack.  This in turn allows Stream-aligned teams to adopt capabilities without having to invest a lot of time researching, reading, and learning new skills.  An organization can have 1 Enabling team supporting multiple teams. It's primary goal is to help stream-aligned teams deliver software in a sustainable way. An example is one that creates a template for CI/CD pipelines, standard machine instances, a Design Library for all the teams in the organization to use and customize to their needs.

3. **Complicated-subsystem team** - a team for building and maintaining specialized knowledge - a video codec, mathematical model, a complex algorithm.  This team helps reduce the cognitive load on Stream-aligned teams working on systems that use the complicated subsystem.

4. **Platform team** - this team provides internal services or programmable APIs that stream-aligned teams can consume. They help Stream-aligned teams to integrate these services instead of developing it themselves - typically anything that involves infrastructure is attributed to this team.  For large organizations, members of this team can come from other teams.

### 6 Choose Team-First Boundaries

**Fracture Planes** are seams within organizations that are good candidates for building a team. These are natural boundaries within software products characterized by any of the following constraints.  Consider breaking up these parts of your organization into teams to give them more autonomy and to allow them to evolve sustainably.

1. **Business Domain** - technology matches business segments, creating a common language within the organization
2. **Regulatory Compliance** - a part of the system with strict requirements may not be applicable to the whole
3. **Change Cadence** - business needs dictate the speed of releases and not parts of the software that often or seldom change
4. **Team Location** - when communication is a must for remote-first teams, then group people within the same time zones
5. **Risk** - parts of the system with varying levels of fault tolerance
6. **Performance Isolation** - separating based on demands in performance allow you to scale effectively
7. **Technology** - building a team around the same technology stack or tools can reduce the cognitive load for members
8. **User Personas** - teams are built around different customer needs to increase satisfaction, e.g. a team developing features for advanced ("Pro", "Paid") customers and a team for Free customers


## PART III Evolving Team Interactions for Innovation and Rapid Delivery


### 7 Team Interaction Modes

Ways teams can interact and fundamental to answer the question of how they can work with other teams. These are not mutually exclusive - a team can have more than 1 mode of interaction at a time:

1. **Collaboration** - working closely with another team to drive innovation. Several teams combine expertise and responsibilities to discover suitable solutions to problems for a given period time.  Both teams own the result of this mode.
2. **X-as-a-Service** - consuming from or providing something for another team to speed up delivery. The service provided would have already solved a problem the other team is trying to address. There is a clear owner of features in this mode.
3. **Facilitating** - helping to make another team self-sufficient or being helped by another team to reduce gaps in capabilities.


### 8 Evolve Team Structures with Organizational Sensing

Situations serving as triggers to redesign team topologies:

1. Software has grown too large for one team - members lose the holistic view of the system
2. Delivery cadence is becoming slower 
3. Multiple business services rely on a large set of underlying services making it hard to evaluate the effectiveness or detect and trace errors of each service

### CONCLUSION The Next-Generation Digital Operating Model

> ...if we know we need to be able to deploy different parts of the system independently, with a short lead time, and we decide to use small, decoupled services in order to do so, we need to make our teams similarly small and decoupled, with clear boundaries of responsibility![](![]())