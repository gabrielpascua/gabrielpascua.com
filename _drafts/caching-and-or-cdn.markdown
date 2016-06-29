---
layout: post
title:  "Using Caching and/or CDN"
excerpt: "Using Caching and/or CDN"
date:   2016-06-28 22:00
categories: notes
tags: devops
---




**Advantages of Caching**
Varnish
Varnish is a reverse HTTP proxy, sometimes referred to as an HTTP accelerator or a web accelerator.
A  reverse  proxy  is  a  proxy  server  that  appears  to  clients  as  an  ordinary  server.  Varnish  stores
(caches) files or fragments of files in memory that are used to reduce the response time and network
bandwidth  consumption  on  future,  equivalent  requests.

NGINX
A web cache sits in between a client and an “origin server”, and saves copies of all the content it sees.  
If a client requests content that the cache has stored, it returns the content directly without contacting 
the origin server. This improves performance as the web cache is closer to the client, and more efficiently 
uses the application servers because they don’t have to do the work of generating pages from scratch each time.

Content caching improves the load times of web pages, reduces the load on your upstream servers, and improves 
availability by using cached content as a backup if your origin servers have failed.

The benefits of content caching include:

    Improved site performance – NGINX Plus serves cached content of all types at the same speed as static content, meaning reduced latency and a more responsive website.
    Increased capacity – NGINX Plus offloads repetitive tasks from your origin servers, freeing up capacity to service more users and run more applications.
    Greater availability – NGINX Plus insulates your users from catastrophic errors by serving up cached content (even if it’s stale) when the origin servers are down.

.NET
Caching enables you to store data in memory for rapid access. When the data is accessed again, applications 
can get the data from the cache instead of retrieving it from the original source. This can improve performance 
and scalability. In addition, caching makes data available when the data source is temporarily unavailable.

HTTP Caching (Google Developers)
Great news, every browser ships with an implementation of an HTTP cache! All we have to 
do is ensure that each server response provides correct HTTP header directives to instruct 
the browser on when and for how long the response can be cached by the browser.

Some tips and techniques to keep in mind as you work on caching strategy:

    Use consistent URLs: if you serve the same content on different URLs, then that content will be fetched and stored multiple times. Tip: note that URLs are case sensitive!
    Ensure the server provides a validation token (ETag): validation tokens eliminate the need to transfer the same bytes when a resource has not changed on the server.
    Identify which resources can be cached by intermediaries: those with responses that are identical for all users are great candidates to be cached by a CDN and other intermediaries.
    Determine the optimal cache lifetime for each resource: different resources may have different freshness requirements. Audit and determine the appropriate max-age for each one.
    Determine the best cache hierarchy for your site: the combination of resource URLs with content fingerprints, and short or no-cache lifetimes for HTML documents allows you to control how quickly updates are picked up by the client.
    Minimize churn: some resources are updated more frequently than others. If there is a particular part of resource (e.g. JavaScript function, or set of CSS styles) that are often updated, consider delivering that code as a separate file. Doing so allows the remainder of the content (e.g. library code that does not change very often), to be fetched from cache and minimizes the amount of downloaded content whenever an update is fetched.
    
Heroku
HTTP caching occurs when the browser stores local copies of web resources for faster retrieval the next time the resource is required. As your application serves resources it can attach cache headers to the response specifying the desired cache behavior.
When an item is fully cached, the browser may choose to not contact the server at all and simply use its own cached copy.


**Advantages of CDN's**
https://www.fastly.com/blog/benefits-using-varnish
At the core of Fastly is Varnish, an open source web accelerator that’s designed for high-performance content 
delivery. Varnish is the key to being able to accelerate dynamic content, APIs, and logic at the edge.