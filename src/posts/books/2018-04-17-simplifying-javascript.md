---
layout: book
title:  "Simplifying JavaScript"
excerpt: "Writing Modern JavaScript with ES5, ES6, and Beyond"
date:   2018-04-07
read: 2019-01-22
categories: books
book_url: https://pragprog.com/book/es6tips/simplifying-javascript
book_image: 
tags:
  - javascript
---

## 1 Signal Intention with Variable Assignment
* Variables declared using `var` are lexically (function) scoped - the variable will return the last assigned value when the function is called.
```js
// items.length = 5;
const items = document.querySelectorAll('li');
for(var i = 0; i< items.length; i++) {
  items[i].addEventListener('click', () => {
    // will always return 5 because of the
    // function. use let i = 0 instead
    alert(i);
  })
};
```

## 3 Maximize Code Clarity with Special Collections
* Objects are great for static lookup information - data that does not change like configuration and enumeration.  If what you need requires frequent change like adding or removing, use maps and sets instead.
* If you pass an existing property name when using the Object spread operator, it will overwrite the initial value with what you set last.
* Sorting a `Map` keys require converting it to an array using the spread operator
* Use `Set` to weed out duplicates in an array, e.g. `new Set(['a','a','b']) // = { 'a', 'b' }`. Convert it back to an array using the spread operator `[...instanceOfASetObject]`

## 5 Simplify Loops
* Use `foreach` when you need to execute an operation to array items outside the scope of the function argument

## 6 Clean Up Parameters and Return Statements
* Use object destructuring to assign default property values to what otherwise could be undefined 
```js
const item = { test: true, foo: 'bar' };
let { key1 = "key 1", foo:bar, ...others } = item;
// key1 = "key 1"
// foo = undefined
// bar = 'bar'
// others = { test: true }
```
* Use the rest operator to pass dynamic number of parameters.  The only catch is that it has to be the last argument in the function
```js
  function foo(param1, ...items){
    return JSON.stringify(items);
  }

  foo(1); //'[]'
  foo(1, 'abc'); //'["abc"]'
  foo(1, 'abc','def'); //'["abc","def"]'

  // take note of the ...
  // w/o it, it will be [['abc', 'def', 'g']]
foo(1, ...['abc','def', 'gh']); //'["abc","def","gh"]'
```

## 7 Build Flexible Functions
* An arrow function's context is the closest function scope when it is declared.  
```js
  const foobar = {
    text: 'test',
    globalScope: () => { console.log(`this.text is ${this.text}`) },
    propertyScope(){ console.log(`this.text is ${this.text}`) }
  }

  foobar.globalScope(); // this.text is undefined
  foobar.propertyScope(); // this.text is test
```

## 8 Keep Interfaces Clear with Classes
* Make generator iterables from a tree object.  It will allow you to use `for-of` and `...`


## 10 Gather Related Files with Component Architecture
* If you omit the `{}` from an import statement, you will import whatever is defined in the modules `export.default` statement.  The name you use when importing is arbitrary.