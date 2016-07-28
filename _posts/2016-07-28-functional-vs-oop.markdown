---
layout: post
title:  "Functional vs. Object-Oriented Programming"
excerpt: "Differences Between Functional and Object-Oriented Programming"
date:   2016-07-28 06:55
categories: notes
tags: javascript
---

#### Differences Between Functional and Object-Oriented Programming
<p>&nbsp;</p>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
        <th>&nbsp;</th>
        <th>Functional</th>
        <th>Object-oriented</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td><b>Unit of composition</b></td>
        <td>Functions</td>
        <td>Objects (classes)</td>
    </tr>
    <tr>
        <td><b>Programming style</b></td>
        <td>Declarative</td>
        <td>Imperative</td>
    </tr>
    <tr>
        <td><b>Coding Pattern</b></td>
        <td>Composition (Chaining / Currying)</td>
        <td>Inheritance</td>
    </tr>
    <tr>
        <td><b>Data and behavior</b></td>
        <td>Loosely coupled into pure, standalone functions</td>
        <td>Tightly coupled in classes with methods</td>
    </tr>
    <tr>
        <td><b>State management</b></td>
        <td>Treats objects as immutable values</td>
        <td>Favors mutation of objects via instance methods</td>
    </tr>
    <tr>
        <td><b>Control flow</b></td>
        <td>Functions and recursion</td>
        <td>Loops and conditionals</td>
    </tr>
    <tr>
        <td><b>Thread safety</b></td>
        <td>Enables concurrent programming</td>
        <td>Difficult to achieve</td>
    </tr>
    <tr>
        <td><b>Encapsulation</b></td>
        <td>Not needed because everything is immutable</td>
        <td>Needed to protect data integrity</td>
    </tr>
  </tbody>
</table>
  
<aside>
  <h4>References:</h4>
  <ul>
    <li>
      <a href="https://www.amazon.com/Functional-Programming-JavaScript-functional-techniques/dp/1617292826/ref=sr_1_1?s=books&ie=UTF8&qid=1469703878&sr=1-1&keywords=functional+programming+in+javascript" target="_blank">
        Functional Programming in JavaScript Chapter 2
      </a>
    </li>
  </ul>
</aside>