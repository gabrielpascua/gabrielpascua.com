---
layout: book
title:  "Systems Performance"
excerpt: "Enterprise and the Cloud, 2nd Edition"
date:   2020-12-16
read: 2021-01-11
categories: books
book_url: http://www.brendangregg.com/systems-performance-2nd-edition-book.html
book_image: 
tags:
  - ops
  - architecture
---

### Chapter 1: Introduction

DO: Create a diagram of your system to understand the relationship of components and to make sure there are no overlooked areas.

Performance Perspectives:

1. **Workload Analysis** - done by application developers. Top down analysis of how an application responds to a load. Answers the Who, Why, What, and How request inputs are processed.
2. **System Resource Analysis** - done by system admins. Bottom up by analyzing system resource utilization

The real task is quantifying the magnitude of the performance issue after found by measuring latency - the time spent waiting.

**Expressing Performance Changes**.

* old value / new value = the nX increase.  
* ((old value - new value) / new value) * 100 = %increase


### Chapter 2: Methodologies

#### Performance Terminologies

* IOPS - reads and writes per second
* Throughput - rate of work performed, bytes/sec or queries/sec
* Response Time - time to complete
* Latency - time spend waiting
* Utilization - measure of how busy a resource is
* Saturation - degree to which a resource has queued work it can't service
* Bottleneck - resource that limits other resources
* Workload - load applied to the system
* Cache - fast storage of data

When thinking about performance trade-offs, a good decision model is the "Good/Fast/Cheap"-Pick 2 triangle. What criteria can you sacrifice now given the project timeline and resources you have?


#### Analyzing Performance of Resources

For system components, check **USE** metrics in reverse order.  These properties are effective for components that degrade when usage volume is high:  
**U** - Utilization of system resources.  
**S** - Saturation of the work load.  
**E** - Errors occurred.  

For services, use the **RED** metrics:  
**R** - Requests per second (Rate).  
**E** - Errors of requests that failed.  
**D** - Duration of requests to complete

#### Scalability Profiles

**Linear** - Performance increases proportional to available resources

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="176px" viewBox="-0.5 -0.5 176 176"><defs/><g><path d="M 7 167 L 160.63 167" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 165.88 167 L 158.88 170.5 L 160.63 167 L 158.88 163.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 7 13.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 7 8.12 L 10.5 15.12 L 7 13.37 L 3.5 15.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 167 7" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>

**Contention** - Shared resources are used serially in contention (competing use), reducing the effectiveness of scaling

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="176px" viewBox="-0.5 -0.5 176 176" style="max-width:100%;max-height:176px;"><defs/><g><path d="M 7 167 L 160.63 167" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 165.88 167 L 158.88 170.5 L 160.63 167 L 158.88 163.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 7 13.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 7 8.12 L 10.5 15.12 L 7 13.37 L 3.5 15.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 167 7" fill="none" stroke="#aaaaaa" stroke-miterlimit="10" stroke-dasharray="3 3" pointer-events="stroke"/><path d="M 7 167 Q 97 67 167 47" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>

**Coherence** - Maintaining data consistency across resources affects scaling

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="176px" viewBox="-0.5 -0.5 176 176" style="max-width:100%;max-height:176px;"><defs/><g><path d="M 7 167 L 160.63 167" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 165.88 167 L 158.88 170.5 L 160.63 167 L 158.88 163.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 7 13.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 7 8.12 L 10.5 15.12 L 7 13.37 L 3.5 15.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 167 7" fill="none" stroke="#aaaaaa" stroke-miterlimit="10" stroke-dasharray="3 3" pointer-events="stroke"/><path d="M 7 167 Q 107 67 132 57 Q 157 47 167 67" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>

**Knee Point** - The point where performance stops to scale because of a resource constraint

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="176px" viewBox="-0.5 -0.5 176 176" style="max-width:100%;max-height:176px;"><defs/><g><path d="M 7 167 L 160.63 167" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 165.88 167 L 158.88 170.5 L 160.63 167 L 158.88 163.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 7 13.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 7 8.12 L 10.5 15.12 L 7 13.37 L 3.5 15.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 47 67" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 47 67 Q 87 37 167 27" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>

**Ceiling** - The hard limit of your system resources

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="176px" viewBox="-0.5 -0.5 176 176" style="max-width:100%;max-height:176px;"><defs/><g><path d="M 7 167 L 160.63 167" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 165.88 167 L 158.88 170.5 L 160.63 167 L 158.88 163.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 7 13.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 7 8.12 L 10.5 15.12 L 7 13.37 L 3.5 15.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 7 167 L 47 67" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 47 67 L 167 67" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>

#### Using Visualization Charts

* **Line Chart** - for performance trends over time on the X-Axis
* **Scatter Plot** - for relationship between X and Y-Axis values using dots
* **Heat Map** - for relationship between X and Y-Axis values using color blocks
* **Timeline Chart** - activites over time using bars, like waterfall charts
* **Surface Plot** - 3-dimensional representation of 3 valuess

For more samples: [https://chartio.com/learn/charts/](https://chartio.com/learn/charts/)

### Chapter 3 - Operating Systems

### Chapter 4 - Observability Tools

### Chapter 5 - Applications

### Chapter 10 - Network

### Chapter 11 - Cloud Computing

### Chapter 12 - Benchmarking

### Chapter 13 - perf

### Chapter 14 - Ftrace

### Chapter 15 - BPF

### Chapter 16 - Case Study


