---
layout: book
title:  "Functional Programming in JavaScript"
excerpt: "How to improve your JavaScript programs using functional techniques 1st Edition"
date:   2016-06-18
categories: books
book_url: https://www.manning.com/books/functional-programming-in-javascript
book_image: /img/book-functional-js-350x439.jpg
tags:
  - javascript
---

### Chapter 1. Becoming functional
* Functional Programming is a development style that promotes control flow abstractions by use of functions to avoid side effects and mutations.
* Functional Programming falls under the broad category of declarative programming focusing on describing operations over control flow or state changes, e.g. what computations to perform instead of how to compute it. 
* Difference Between Declarative and Procedural Programming in Code:

```javascript
//Procedural - requires you to maintain a result variable in a for-loop
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var result = [];
for(let i = 0; i < array.length; i++) {
    result.push(Math.pow(array[i], 2));
}

//Declarative - frees you from managing a loop counter and array index access
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var result = array.map(function(num){
    return Math.pow(num, 2);
});

//Declarative - using lambda expression makes it more concise
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var result = array.map((num)=>Math.pow(num,2));
```

* Functional Programming aims to build immutable programs using **Pure Functions** - functions that:
    1. Do not depend on any external input other than its function arguments
    2. Do not alter state outside of its function scope
* Pure Functions are **referentially transparent** meaning it will consistently yield the same output given the same input.  Purity comes from the "pure" mapping of functions to its arguments and its return value.
* Functional programming promotes immutability of data (data that cannot be changed after created) to avoid side-effects.  
<p></p>

### Chapter 2. Higher-order JavaScript
* OOP and FP can be used together, each has its own merits.  Languages like Scala and F# implement both paradigms.  To make it work, you have to think of Objects as immutable pieces of data.  Given a simple example below, `fullname` is abstracted into a stand-alone function that can support any space-separated string concatenation.  It also removes access to the `this` variable which can cause side effects outside of the former function's scope.

```javascript
//OOP
class Person{
...
    this.fullName = function(){
        return this.firstName + ' ' + this.lastName;
    }
...
}
var person = new Person();
person.fullName();

//FP
class Person{...}
var person = new Person();
var fullName = [person.firstName, person.lastName].join(' ');
```

* What object inheritance does to OOP, composition does for FP by applying functions to objects to create new data.
* Object state in javascript can get out of hand if not managed properly.  Some techniques to achieve immutability are:
    1.  **Treat objects as values** - Adopting the Value Object pattern for simple data types.  `Date` is an example that uses this pattern. It may have a number of properties like `year` and `month` but it will always have a unique value that you can test for equality.  Zip Codes, Emails and Url's qualify for this treatment.
    2.  **Deep freezing moving parts** - Use `Object.freeze`.  It's a shallow operation so remember to freeze nested objects.
    3.  **Use lenses - a copy-on-write strategy** - Copy-on-write is a policy that you should first create a copy before attempting to change a shared information so it wouldn't affect other tasks.  Lenses in functional libraries like **Ramda.js** implement this so you wouldn't have to.
<p></p>

### Chapter 3. Few data structures, many operations
* If OOP uses inheritance for reuse, FP promotes the use of central higher order functions `map`, `filter` and `reduce` to process lists of data using existing structures like arrays.
* FP's style makes it easy for programmers to build a mental model of what's happening in a glance.  The benefits to easily “reason about your code” is you can hold less information in your head making debugging easier. It also makes you think less about state and more about operations because your operations are agnostic to data types.
* A way to think functional when working with arrays is to treat it like SQL data.  You run your queries in progression to arrive at your desired result set.  In native javascript, think of any possible combinations of `map`, `reduce` and `filter`.
<p></p>

### Chapter 4. Toward modular, reusable code

* Currying is a technique that converts a multi-argument function into a set of unary functions if the number of arguments is not met when the function is called.  

```javascript
//Formal definition of currying with 3 parameters
curry(f) :: (a,b,c) -> f(a) -> f(b)-> f(c)


//Using Ramda.js' curry function
//Given a function to curry 
var currying = R.curry(function(arg1, arg2, arg3){ ... }),  

//Then these function calls are the same
currying(arg1)(arg2)(arg3); 
currying(arg1,arg2)(arg3); 
currying(arg1, arg2, arg3);
```  

* Currying promotes:
    1.  Chaining or Pipelining - arranging functions in a sequence where the input of the next function is derived from the last.
    2.  Conversion of multi-argument functions allow you to build up your function arguments based on availability.  
* Applying currying as a factory function

```javascript
const frDb = R.curry((db, ssn) => find(db, ssn);
const frCache = R.curry((arr, ssn) => arr[ssn]);

//Note how it only takes db or cache as argument
const findOne = useDb ? frDb(db) : frCache(cache);

//The curried function here passes the ssn argument
findOne('444-44-4444');
```

* Implementing reusable function templates using currying

```javascript
//Suppose you have a library that takes a lot of arguments to instantiate
const form = function(db, data, type, options, title){...}

//If you curry the library function
const formBuilder = R.curry(form)(db, data, type);

//Then you can simplify subsequent executions
var form1 = formBuilder(option, title);
var form2 = formBuilder(option, title);
```

* An alternative to currying is partial application and parameter binding.  If you have a function that takes 5 arguments and you passed 3, it will return a function that expects 2.  It's different from currying in that currying returns a unary function while partial function binding evaluates missing arguments as `undefined`.

```javascript
function greet(greeting, name) { return greeting + ' ' + name; }

//Using lodash: https://lodash.com/docs#partial    
var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
```

* Functional Composition is the process of grouping together smaller functions to arrive at a desired result.  This technique promotes point-free or tacit programming by removing the need to pass function arguments (points of a function) granted the return values match the next function's signature (arity).  Be careful not to overdo it to avoid obfuscating your code.

```javascript
//Using Ramda's compose (right to left evaluation)
//http://ramdajs.com/0.22.1/docs/#compose
const exploded = (string) => string.split(' ');
const count = (arr) => arr.length;
const countWords = R.compose(count, exploded);

const str = 'two words';
const wordCount = countWords(str)
```

*  One way to structure program flow is by use of combinators.  Combinators are language constructs that allow you to combine functions and other combinators to establish control logic in your code.  Some examples of combinators in Ramda.js are:
    1.  Ramda's `identity` - returns the value of its argument, useful for wrapping a value into a function
    2.  Ramda's `tap` - runs a function against its input object and returns the result after the function is applied
    3.  Alt Combinator - Using the logical OR operator `||` on 2 functions whose execution depends on the condition of a given value or argument 
    4.  Sequence Combinator - A function that takes an indefinite number of function arguments and calls them in sequence.  It doesn't return a value.  It just executes its function arguments against the same value.
    5.  Fork Combinator - Useful when you need to process a resource in 2 different ways. It takes 2 functions to process the input and a join function to merge the output.
<p></p>

### Chapter 5. Design Patterns Against Complexity (Error Handling)
* Some people find that applying functional programming to error handling will allow one to handle it more elegantly.  However, traditional `try-catch` logic is not enough for the reasons listed below.  An alternative to handling errors is returning `null` but it's not a better solution because it leads to a lot of null checks in your code.
    1.  They can't be chained because it breaks the program flow when thrown
    2.  It makes functions deviate from referential transparency (returning a  single predictable value)
    3.  Can cause side-effects because it impacts the entire program
    4.  Violates non-locality because when an error is thrown it leaves the local stack
    5.  Forces the caller to have `catch` blocks
    6.  The possibility of having nested errors make them hard to use  
* **Technique 1 - Wrapping unsafe values**.  A simple way of handling any value that can be onerous is by containing it in a wrapper class. The only way for you to extract its value is by applying a  function to it.  This forces the calling function to handle null checks and their own error handling logic.

```javascript
class Wrapper{
    constructor(value){
        this.value = value;
    }

    map(fn){
        return fn(this.value);
    }
}

const wrap1 = ('some string') => new Wrapper(value);
const str = wrap1.map(()=>this.value);

const wrap2 = (null) => new Wrapper(value);
const str2 = wrap2.map(()=>{ return this.value === null ? 0 : 1 });    
```

* **Technique 2 - Using functors**.  Functors are somewhat similar to Wrapper classes.  It's a data structure where you apply a function to extract its value but instead of returning it, it returns a new instance to enable chaining.  The downside to using this is it creates a nest of Wrapper classes that you need to traverse in order to extract a value.

```javascript
class Wrapper{
    constructor(value){
        this.value = value;
    }
}

Wrapper.prototype.flatmap = function(fn){
    // returns a new copy every invocation promoting immutability
    Return new Wrapper(fn(this.value));
}
```

* **Technique 3 - Using Monads**.  Described as the best approach to error handling, Monads make your code fault-tolerant by safely propagating errors.  Monadic types are data structures that provide abstraction over some resource.  For example, by representing a `null` value and a known value as monads, you need not worry about error handling or null checking because both follow a specific structure that can be chained or composed.

```javascript
/* Basic Structure of a Monad */
class Wrapper{
    // In its basic form, a monadic type must have the following:

    // 1.  Type constructor
    constructor(){}

    // 2.  Unit function - puts values into a monad
    static of(a){
        return new Wrapper(a);
    }

    // 3.  Bind function - to surface monadic values
    map(mapFn){
        return Wrapper.of(mapFn(this.value));
    }

    // 4.  Join Operation - flattens layers of monadic structures
    join(){
        if(!this.value instanceof Wrapper) return this;
        return this.value.join(); 
    }
}
```

* Error Handling Using Concrete Maybe and Either Monads  
    - [A Monad in Practicality: First-Class Failures](http://robotlolita.me/2013/12/08/a-monad-in-practicality-first-class-failures.html#you-either-succeed-or-you-fail)
    - [Folktale's Either Implementation](http://docs.folktalejs.org/en/latest/api/data/either/index.html) 

```javascript
//Maybe consolidates null checking logic by returning a Just class for a
//presence of value, and a Nothing class for an absence of value.  Best used
//for dealing with uncertainty (“might not be there”) like getting database
//records, or plucking an item from a collection

class Maybe{
    static just(a){
        return new Just(a);
    }

    static nothing(){
        return new Nothing();
    }

    static fromNullable(a){
        return a!==null ? just(a) : nothing()
    }

    ....
}
class Just extends Maybe{...}
class Nothing extends Maybe{...}

const safeFindStudent = function(model, id){
    let student = model.find(id);
    return Maybe.fromNullable(student)
}
const address = safeFindStudent('444-44-4444').map(R.prop('address'));
address; //-> Just(Address(...)) or Nothing


//Either represents a logical separation between two values a and b that
//would never occur at the same time.  A common use is to hold the results
//of a computation that may fail to provide additional information as to
//what the failure is.

class Either{
    static left(a){ return new Left(a); }
    static right(a){ return new Right(a); }
    static fromNullable(val){
        return val !== null ? right(val) : left(val);
    }
    static of(a){
        //typically bias on the right operand,
        //while left contains the exception
        return right(a);
    }
}

class Left extends Either{...}
class Right extends Either{...}

function divide(a, b){
    if(b===0){
        return Either.left(new Error("Division by 0"));
    }
    return Either.right(a/b); 
}

//No error handling required
var x = divide(25,0);
```
<p></p>

### Chapter 6. Bulletproofing Your Code (Writing Tests)
* Featured Javascript libraries:
    - [QUnit](https://qunitjs.com/) for unit testing
    - [JSCheck](http://www.jscheck.org/) for property based testing
    - [Blanket.js](http://blanketjs.org/) for code coverage
* Because FP code is naturally isolated it has a direct effect on unit tests and its chainability on integration tests.
* Property based unit testing makes a statement about what the output of a function should be given a set of inputs.

```javascript
//Unit Testing using QUNit
QUnit.test('Compute Average Grade', function (assert) {
    assert.equal(computeAverageGrade([80, 90, 100]),'A');
    assert.equal(computeAverageGrade([80, 85, 89]), 'B');
    assert.equal(computeAverageGrade([70, 75, 79]), 'C');
    assert.equal(computeAverageGrade([60, 65, 69]), 'D');
    assert.equal(computeAverageGrade([50, 55, 59]), 'F');
    assert.equal(computeAverageGrade([-10]),        'F');
});

//Property Based Testing using JSC
JSC.test(
    'Compute Average Grade',
    function(verdict, grade, grades){
        ...
    },
    [JSC.array(JSC.integer(20), JSC.number(90,100)),'A'],
    function(grades, grade){
        'Testing for an ' + grade + ' on grades: ' + grades;
    }
);
```

<p></p>

### Chapter 7. Functional Optimizations
* Featured Javascript libraries:
    - [Lodash](https://lodash.com/)
* Functional programming alone will not speed up your applications.  Its benefits come from function abstraction avoiding repetitive code.
* The javascript function execution stack for nested functions start inside going out.  Having this knowledge:
    - Deeply nested curried functions can consume a lot of memory because each function creates its own context. 
    - Recursive functions can cause the context stack to grow if done incorrectly
* You can get performance benefits by following a lazy function evaluation strategy - avoiding function calls when a subset is insufficient.  Techniques in the book
    - Using shortcut fusion - In Haskell short cut fusion is a method that combines a series of function executions into 1.  You can use lodash's `chain` or `compose` to accomplish this.
    - Using the alternation `||` functional combinator - 

```javascript
const alt = R.curry((fn1, fn2, val)=>fn1(val) || fn2(val));
const print = (msg)=>console.log(msg);
//neither dbFn nor cacheFn is called until show is invoked
const show = R.compose(print, alt(dbFn, cacheFn));
show('xxxxx');
```

* Use memoization if an expensive function execution is going to be applied on a large dataset.  By caching the result, you avoid rerunning the function. Remember that by using this caching technique, you are trading off memory space over performance.

```javascript
//Basic construct example https://addyosmani.com/blog/faster-javascript-memoization/
function.prototype.memoize = function(){
    var self = this, _cache = {};
    return function( arg ){
    if(_cache[arg]) return _cache[arg]; //hit
    return _cache[arg] = self(arg);      //miss
    }
}

var foo = fooBar.memoize()
foo(1); //stores the cache value
foo(1); //same argument, use the cached value
```

* An ES6 feature, Tail-Call Optimization (TCO) flattens the execution of a recursive function into a single frame but it can only be done when the last call (tail position) is to invoke another function (typically itself).  TCO allows you to make recursive function calls without growing the stack.

```javascript
// http://www.2ality.com/2015/06/tail-call-optimization.html
function findIndex(arr, predicate, start = 0) {
    if (0 <= start && start < arr.length) {
        if (predicate(arr[start])) {
            return start;
        }
// tail call
        return findIndex(arr, predicate, start+1);
    }
}
findIndex(['a', 'b'], x => x === 'b'); // 1
```

<p></p>

### Chapter 8. Managing Asynchronous Events and Data
* Challenges of asynchronous code:
    - Creation of temporal (time) dependence between the async response and your code that requires it.  
    - Callback hell
    - Mix of synchronous and asynchronous code
* Some common ways to improve handling async code:
    - Use Continuation-Passing style to create smaller functions from the nested code
    - Using Promise which is a form of monad with its `then` equivalent to a functor.  Since `then`'s take a function as an argument, it can also be used to handle a mix of synchronous and asynchronous code.
    - Lazily produce data by using Generators
* The future?? Functional Reactive Programming????