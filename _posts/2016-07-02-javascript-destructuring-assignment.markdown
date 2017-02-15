---
layout: post
title:  "Destructuring Javascript Assignment"
excerpt: "Destructuring Javascript Assignment"
date:   2016-07-02 07:48
categories: notes
tags: javascript
---

The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects into distinct variables.It is part of the ES6 standard specification.

{% highlight javascript linenos %}
//Arrays:
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

//Objects:
//assignment
var o = {p: 42, q: true};
var {p, q} = o;
console.log(p); // 42
console.log(q); // true

//for loops
var people = [
  { name: 'John Smith', family: { 
    father: 'John Doe', mother: 'Jane Doe' } 
  }
];
for (var {name: n, family: { father: f } } of people) {
  // Name: John Smith, Father: John Doe
  console.log("Name: " + n + ", Father: " + f);
}
{% endhighlight %}
  
<aside>
  <h4>References:</h4>
  <ul>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" target="_blank">
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      </a>
    </li>
    <li>
      <a href="https://ponyfoo.com/articles/es6-destructuring-in-depth" target="_blank">
        https://ponyfoo.com/articles/es6-destructuring-in-depth
      </a>
    </li>
    <li>
      <a href="http://exploringjs.com/es6/ch_destructuring.html" target="_blank">
        http://exploringjs.com/es6/ch_destructuring.html
      </a>
    </li>
  </ul>
</aside>