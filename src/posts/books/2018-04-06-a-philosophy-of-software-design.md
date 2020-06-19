---
layout: book
title:  "A Philosophy of Software Design"
excerpt: "A Philosophy of Software Design 1st Edition"
date:   2018-04-06
read: 2020-04-06
categories: books
book_url: https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201
book_image: 
tags:
  - javascript
---

### 1 Introduction
* The greatest limitation to writing software is our ability to understand the complexity of the system we are building
* Always be on the lookout for opportunities to improve your system. Spend a fraction of your time planning for improvements.
* Reducing complexity is the most important element of software design.

### 2 The Nature of Complexity
"_Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system._"

Complexity is incremental in nature.  It is the product of unplanned dependency and obscurity.  **Dependency** exists when a piece of code cannot be changed in isolation.  **Obscurity** is when important information is not obvious. 

**Signs of complexity**
* Amplification of change - a simple change requires modifications in a lot of places
* Higher Cognitive Load - you need to know a lot about what you are changing and its impact across the system
* Unknown unknowns - the effects of your change are not obvious because there is no way for you to find out

### 3 Working Code Isn't Enough
Rather than a **tactical** approach of quickly churning out changes quickly, be **strategic** when introducing changes to your system.  The upfront investment makes future changes easy to accommodate.  Working code is not enough.  Aim for a design that can make your code extendable.

### 4 Modules Should Be Deep
Expose as little publicly as possible - be it a function, class, a library or a service.   This allows developers to deal with less complexity when managing dependencies.  Shallow modules, e,g. having a class for everything, tend to have specific implementation steps that are prone to errors because of the effort it requires to learn.   Deep modules can hide much of the information its users don't need to know about by making abstractions available through its public interface.

### 5 Information Hiding (and Leakage)
If a piece of information is not needed outside of its module, then it is a good candidate to hide.  Beware of information leakage when decomposing modules.  If you find yourself in a situation where you create dependencies because of shared functionalities, consider combining them in a single class.

### 6 General-Purpose Modules are Deeper

### 7 Different Layer, Different Abstraction

### 8 Pull Complexity Downwards
“It is more important for a module to have a simple interface than a simple implementation.”  Successful modules will have more developers that consume it than who will write it.  It's on the software engineer to make the module's public API easy to implement.

### 9 Better Together Or Better Apart

### 10 Define Errors Out Of Existence

### 11 Design it Twice

### 12 Why Write Comments? The Four Excuses

### 13 Comments Should Describe Things that Aren't Obvious from the Code

### 14 Choosing Names

### 15 Write the Comments First

### 16 Modifying Existing Code
"If you’re not making the design better, you are probably making it worse.".  Be strategic and not tactical. Invest in learning the code and explore different solutions to the problem that can balance good design with your deadline.

### 17 Consistency

### 18 Code Should be Obvious

### 19 Software Trends

### 20 Designing for Performance