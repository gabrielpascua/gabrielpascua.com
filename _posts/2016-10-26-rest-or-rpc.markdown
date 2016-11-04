---
layout: post
title:  "REST or RPC API's"
excerpt: "Differences between RESTful and RPC API's"
date:   2016-10-26 06:44
categories: notes
tags: concepts
---

<table class="table table-bordered table-striped">
  <thead>
    <tr>
        <th></th>
        <th>REST</th>
        <th>RPC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td><b>HTTP Request Methods</b></td>
        <td>GET, POST, DELETE, PUT</td>
        <td>GET, POST</td>
    </tr>
    <tr>
        <td><b>URL Endpoints</b></td>
        <td>Nouns</td>
        <td>Verbs</td>
    </tr>
    <tr>
        <td><b>Common Response</b></td>
        <td>JSON</td>
        <td>XML-SOAP</td>
    </tr>
    <tr>
        <td><b>Database Operations</b></td>
        <td>CRUD</td>
        <td>Arbitrary</td>
    </tr>
    <tr>
        <td><b>Serialization</b></td>
        <td>Mapped to Domain Models</td>
        <td>No Relationship</td>
    </tr>
    <tr>
        <td><b>Client Libraries</b></td>
        <td>Usually provided</td>
        <td>Manually written</td>
    </tr>
    <tr>
        <td><b>Networking Protocol</b></td>
        <td>HTTP</td>
        <td>Any</td>
    </tr>
    <tr>
        <td><b>Request Parameters</b></td>
        <td>Multiple Combinations with Querystring Parameters</td>
        <td>More control of what's available</td>
    </tr>
  </tbody>
</table>

<aside>
  <h4>References</h4>  
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/Remote_procedure_call" target="_blank">Remote procedure call</a></li>
    <li><a href="http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm" target="_blank">Architectural Styles and
the Design of Network-based Software Architectures</a></li>
    <li><a href="https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/" target="_blank">Understanding REST and RPC for HTTP API's</a></li>
    <li><a href="https://apihandyman.io/do-you-really-know-why-you-prefer-rest-over-rpc/" target="_blank">Do you really know why you prefer REST over RPC?</a></li>
    <li><a href="https://gist.github.com/kevinswiber/8576d6083b0f8acece20" target="_blank">RPC vs REST</a></li>
    <li><a href="https://joost.vunderink.net/blog/2016/01/03/why-we-chose-json-rpc-over-rest/" target="_blank">Why we chose JSON-RPC over REST</a></li>
  </ul>
</aside>