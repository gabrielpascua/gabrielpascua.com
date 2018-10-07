---
layout: post
title:  "Abstraction Descant"
excerpt: "Abstraction Descant from Patterns of Software"
date:   2017-03-05 09:31
categories: notes
tags:
  - patterns
---

Abstraction Descant is a section from Richard Gabriel’s 1998 book Patterns of Software where he details the harms of over abstraction.  
<p></p>

### Concepts:
* Habitability - characteristic of code that makes it easy to change
* Compression - subclassing/dependencies, where parts don’t have meaning without a context
* Piecemeal Growth - improvements through repair, not replacement
<p></p>

### Consequences:
* Writing a lot of interfacial or glue code
* Updating dependencies can cause a lot of breaking changes
* Without the original authors, future edits can stray from the design intent 
* Not everyone share the same technical or subject knowledge making the less informed unequipped with the skills necessary to design or understand abstractions that have universal use.
* “Beautifully” abstracted code only works in small programs
<p></p>

### Recommendations:
* Limit to simple cases that are correct universally or specific to your domain
* Use sparingly, it will limit context switches when code is read
* Build small - if a large abstraction is 90% accurate, programmers are likely to create a 10% mess or worse not use it at all.
* Keep hierarchies shallow as long as possible
* Minimalist approach to inheritance
* Do not sacrifice efficiency (habitability) over extensibility (abstraction)
* Best used when data and control logic are captured, think string replacements, array searches
* Piecemeal growth (Maintenance) should be the norm. 
* Must be well tested
* Don’t solve puzzles, learn patterns