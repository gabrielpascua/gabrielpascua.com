---
layout: post
title:  "Destructuring Javascript Assignment"
excerpt: "Destructuring Javascript Assignment"
date:   2016-07-02 07:48
categories: notes
tags: javascript
---

The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects into distinct variables.It is part of the ES6 standard specification.

<pre>

  Arrays:
  //assignment
  const arrayData = ['a', 'b'];
  const [x, y] = arrayData;
  console.log(x); //a
  console.log(y); //b
  
  //for loops
  const arr1 = ['a', 'b'];
  for (const [index, element] of arr1.entries()) {
      console.log(index, element);  // 0, 'a'
  }
  
  Objects:
  //assignment
  var o = {p: 42, q: true};
  var {p, q} = o;
  console.log(p); // 42
  console.log(q); // true
  
  //for loops
  var people = [{ name: 'John Smith', family: { father: 'John Doe', mother: 'Jane Doe' } }];
  for (var {name: n, family: { father: f } } of people) {
    console.log("Name: " + n + ", Father: " + f); // Name: John Smith, Father: John Doe
  }
  
</pre>
  
<p>&nbsp;</p>
  
<b>References</b>  
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)  
[https://ponyfoo.com/articles/es6-destructuring-in-depth](https://ponyfoo.com/articles/es6-destructuring-in-depth)  
[http://exploringjs.com/es6/ch_destructuring.html](http://exploringjs.com/es6/ch_destructuring.html)  
