---
layout: post
title:  "Good REST API Design"
excerpt: "Recommendations when building a REST API"
date:   2018-10-03 06:16
categories: notes
tags:
---

## Why it's important
* Public APIs are forever - one chance to get it right. It must stand the test of time
* A language and a library (API) comprise a platform
* Start with a short spec, ideally 1 page. Only start coding once you're confident

## A Good API Should be
* easy to learn
* hard to misuse
* easy to read and maintain
* just powerful enough
* easy to evolve
* should do only one thing well
* **When in doubt, leave it out**
* Power-to-weight ratio - do a lot without learning a lot
* Abstract implementation details, don't leak it into the API
* Naming matters
* Documentation matters
* Don't return values that demand exception handling 
* Reduce the need for boilerplate code because it's an opportunity to introduce bugs
* Fail Fast, ideally at compile-time

## Proven Standards, Patterns, Best Practice for REST
* Use nouns, not verbs for url/resources
* Endpoint responses are coarse and not fine-grained
* Response properties are `camelCased` and by default in JSON format
* Limit to 2 types of resource - a collection and an instance
* Use PUT to create the data if the client can specify the id of the record it's creating (creating a named object).  PUT is always a full update (complete replacement of content).
* Use POST for partial updates and is not idempotent
* Versions are preferably passed in the url for ease of use
* Dates and timestamps use the [ISO 8601 standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) format in GMT/UTC zone
* For paging, `?offset=X&limit=Y` is the convention, where `offset` is a zero-based index
* Avoid sessions when possible, REST is ideally stateless
* It's better for the client to determine the order of the results than to enforce one. Use the `?orderBy=key asc|desc` parameter when doing so. Note the extra space after the `orderBy` key-value
* You can use the `?fields` parameter if you need a partial object response
* Use `PATCH` as the upsert semantics
* If you were to allow CORS such that `Access-Control-Allow-Origin: *`, make sure to authenticate for OAuth tokens
* Services MUST increment their version number in response to any [breaking API change](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md#123-definition-of-a-breaking-change)
* Meta parameters such as those for ordering, filtering, and paging are sometimes prefixed with a "$" symbol, e.g. `$offset=0,$limit=5,$orderBy=name asc,$fields=name,id`
* [Good generic guidelines for documentation](https://cloud.google.com/apis/design/documentation)
* Use `ETag` [for caching](https://cloud.google.com/apis/design/design_patterns#etags) ????

## Error Handling
* 4xx errors are the result of client passing incorrect or invalid data
* 5xx errors are the result of the service failing to response to a valid client request
* [Error response is a single object](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md#7102-error-condition-responses) with the key name `error`
* Required key/value child elements are `code` and `message`
* Optional key/value child elements are `target`, `details` and `innererror` . [Details of what each field means can be found here](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md#7102-error-condition-responses).
* Unsupported requests are recommended to return a 400 error response
* [Examples of error codes](https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto)
* At the very least, an error message should be constructed such that a technical person can have an actionable response to it. 
* Avoid disclosing personal/sensitive information in the error message

## Special Cases
* Use `?_body=false` for POST operations that don't need to have a response body or the `Prefer return=minimal` header
* If you were to support filtering, [this is a good start](https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#97-filtering)
* If you need to have custom methods, [Google Cloud has something defined](https://cloud.google.com/apis/design/custom_methods)
* [For sub-collections, use the wildcard collection symbol "-"](https://cloud.google.com/apis/design/design_patterns#list_sub-collections).  It prevents url escaping compared to "*"
 

## References
* [How To Design A Good API and Why it Matters](https://www.youtube.com/watch?v=aAb7hSCtvGw)
* [Beautiful REST & JSON APIs](https://www.youtube.com/watch?v=mZ8_QgJ5mbs)
* [API Design Guide at Google](https://cloud.google.com/apis/design/)
* [Microsoft REST API Guidelines](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md)