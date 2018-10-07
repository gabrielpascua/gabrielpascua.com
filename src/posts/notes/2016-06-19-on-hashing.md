---
layout: post
title:  "On Hashing"
excerpt: "Notes about hashing"
date:   2016-06-19 10:00
categories: notes
tags:
  - security
---


**In General**  
Transforms a set of characters into a fixed-length value that represents the original.  It involves a one-way, irreversible function that converts the input parameter into a randomly computed string.  A good hashing function should never produce the same result (collision) from different inputs.


**In Databases**  
Hashing allows faster data retrieval by assigning the original value or key to a hash table indexed by its hash value.  The use of the computed hash value makes searching faster compared to a per letter lookup.  Hashing performs best when data is discrete and random.

**In Security**  
Hashing's goal in security is to create irreversible data that can only be reproduced by trying a huge set of inputs.  Hashing is very useful when storing sensitive information that are one-way in nature like passwords and social security numbers.  Although it has connections with encryption, it should not be confused with it.

**In File Systems**  
Hashing can be used to verify the contents of a file.  When a file has been hashed, it can be used as a point of comparison to determine if it has been changed or corrupted.
