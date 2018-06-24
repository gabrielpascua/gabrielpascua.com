---
layout: book
title:  "RxJS In Action"
excerpt: "RxJS In Action 1st Edition"
date:   2017-08-04
categories: books
book_url: https://www.manning.com/books/rxjs-in-action
book_image: /img/book-rxjs-in-action-360x452.jpg
tags:
  - rxjs
  - javascript
---

### Part 1-1: Thinking Reactively
<p></p>
**Handling Asynchronous calls is hard...**  
* Callback function - less ideal because of callback hell, creates temporal (time) dependency when handling multiple async resources
* Event Emitters - good for DOM, lessens callback hell, still creates temporal dependency on multiple async resources
* Promises - no callback hell, but can only pass a single value between thenables, no retry logic, no cancellation

**Enter RxJs to improve on...**
* Cleaner error handling
* Business Logic separation
* Limiting closures
* Out of the box support for Throttling and Debouncing
* Having a standard API for asynchronous calls

**RxJS treats everything as a stream...**  
* A stream can be a single value, an array, an I/O operation, an AJAX request.  It is a wrapper to a data source typically treated as an array.
* The name stream perfectly represents the concept that data is always moving
* A stream has 4 parts and data flows sequentially through them:
    * Observables - producers of data - upstream. In the Observer pattern this is your Subject, fires and forgets - it does not care about data processing
    * Observer - consumer of Observables - downstream. 
    * Operators - pipeline for data transformation
    * Intervals - time to controlling the processing speed of your stream

<p>&nbsp;</p>

### Part 1-2: Reacting with RxJS

_“ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming”.  The common theme between these patterns is the separation of data from behavior._

**BEHAVIOR**
<p></p>

**Handling behaviors from functional programming**  
* It’s operators are pure functions supporting the core methods of functional programming - map, reduce and filter
* Streams are immutable, it can never be altered after declaration
* Because data cannot be altered after declaration, side-effects are mitigated and you no longer have to worry about state management

**Handling behaviors from the Iterator pattern**
* Streams are iterable (not necessarily ES6 Iterators because RxJS predates it), so you can define your own traversal algorithm
* Because Observables are immutable, RxJS puts you in a Iterator pattern mindset where traversal logic never mixes with the underlying data

**Handling behavior from the Observer pattern**
* In the Observer pattern, changes do not take place if the Subject does not have an Observer.  Similarly in RxJS, data in an Observable requires an observer to effect change
* You can have any number of subscribers to an Observable knowing that the underlying Observable data will remain consistent
* Rx Observables are considered push-based collections much like the Subject in the Observer pattern.  On the application side, such systems rely on listening than polling.  Emitting data is more important than maintaining it.

**DATA**  

**Data can come from different sources requiring different strategies…**
* Emitted data - Event Emitters for native (click, mousemove, etc..) and custom events - `on` handlers and thenables for `Promise`d data
* Static data - Plain Javascript data - native constructs
* Generated data - Timer-based sources like `setTimeOut` and `setInterval` - callbacks

**RxJS turns data into an Observable so you only need to plan for your observers**
* Single value - synchronous  
    `Rx.Observable.of(42).subscribe(console.log); //-> 42`
* Muliple Values - synchronous  
    `Rx.Observable.from('RxJS').subscribe(console.log);`  
    `Rx.Observable.from([1, 2, 3]).subscribe(console.log);`
* Single value - asynchronous  
    `Rx.Observable.fromPromise(fortyTwo)`
* Multiple values (anything that can infinitely happen over time like events) - asynchronous  
   `Rx.Observable.fromEvent(document.getElementById(‘test’), 'click')`

**Observables can be created in 2 ways**
* The most common way is to use the `from` and `of` operators
* A custom Observable can be created by calling  
`Rx.Observable.create(observer => { ... })`

**You consume an Observable by subscribing to it**
* The `subscribe()` method will return a `Subscription` object
* The subscribe method can take 3 function arguments `subscribe(fnNext, fnError, fnComplete)`.  `fnNext` is required and the other 2 are optional

<p>&nbsp;</p>

### Part 1-3: Core Operators
<p></p>

**RxJS streams are lazy data sources**  
* The lifetime of a stream starts when a subscriber becomes present
* POJOs on the other hand are eager data sources. Memory is allocated on creation and expression evaluation won’t move to the next until it finishes

**Subscribers can cancel anytime**
* The `Subscription` object has an `unsubscribe()` method one can call when it doesn’t need to listen to the Observable
* Be aware that you cannot unsubscribe from a promise-backed Observable. The observable will be disposed but the promise will execute because promises are meant to be fulfilled.  

**Data from an RxJS Observable can be aggregated using operators**
* RxJS operators are pure functions
* `map`, `reduce` and `filter` are the most common ones, working exactly the same as their native Array equivalent
* `scan` is similar in concept to `reduce`. The difference is it will emit a value each iteration where `reduce` waits for the iteration to finish before returning a value
* `pluck` will let you take a property and return its value

**You create your own data transformation pipeline by chaining operators**
* You can be sure that through chaining, you’re producing side-effect free data
* Unlike `map`, `reduce` and `filter` in arrays, RxJS operators do not create intermediate data providing performance boost especially for large data sources

<p>&nbsp;</p>

### Part 1-4: It’s about TIME you used RxJS
<p></p>

**RxJS have several operators dealing with time**
* `timer()` which is equivalent to `setTimeout`
* `interval()` for `setInterval`, and `timeInterval` for more detailed intervals
* `delay`

**Limiting the rate of function execution through Debouncing**
* Debouncing factors events occurring from start to finish at every interval
* Use `debounceTime` for debouncing
* Some useful cases where debouncing is helpful is (1) if you want to respond to a double click, or (2) you want to fetch an autocomplete data between X seconds when the user is typing

**Limiting the rate of function execution through Throttling**
* Throttling only factors events occurring at the start of every interval, ignoring everything in between
* Use `throttleTime` for throttling
* Throttling is useful for events that are triggered rapidly and where you don’t care about every event happening when it is fire like scrolling and mouse movements

**You can choose to process cache data over certain conditions through RxJs’s buffer operators**
* Buffering allows you to output data to subscribers in batches instead of 1 at a time, returning an array of Observables
* This ability to capture temporary data allows you to make decisions when your buffer condition has been met
* `Rx.Observable.timer(0, 50).buffer(Rx.Observable.timer(500))` - Emit data every 50ms for 500ms
* `Rx.Observable.fromEvent(amountTextBox, 'keyup').bufferCount(5)` - Emit data after the 5th keyboard press
* `Rx.Observable.fromEvent(field, 'keyup').filter(...).bufferWhen(() => Rx.Observable.fromEvent(document.querySelector('#show-history'), 'click'))` - Emit data when the `#show-history` button is clicked
* `Rx.Observable.fromEvent(password, 'keyup').map(...).bufferTime(7000)` - Emit data after 7 seconds


<p>&nbsp;</p>

### Part 2-5: Applied Reactive Streams
<p></p>

**Streams can be interleaved as soon as data arrives**
* Combining streams is useful for events that are likely to have the same event handler code such as mouseUp and touchEnd
* Use the `merge()` operator to interleave streams.  It outputs data as soon as it is emitted.
* You can use the static form `Rx.Observable.merge(mouseUp$, touchEnd$)` or the instance form `mouseUp$.merge(touchEnd$)`
* Merging synchronous data source will emit all the data as soon as they’re available
* Merging asynchronous data source like JS events will emit the data one at a time
* The emitted data in the case of mouseUp and touchEnd are going to be different.  To avoid conditional logic inside `merge`, you can call `map` on both event before calling `merge` to standardize their data structure.  By the time `merge` is hit, you now have a single structure to deal with.
* Use `mergeMap` to flatten data when merging

**Streams can be concatenated to preserve the order they’re emitted**
* Use the `concat()` operator to combine strings that follow a specific order.  
* The output data will emit the values from the first observable only when it is completed before moving to the next.
* `concat` also has a static and instance method form
* Use `concatMap` to flatten data when concatenating

**Streams can be replaced by another Observable, cancelling out the triggering Observable**
* Use the `switch()` operator to replace an Observable.  For example `Rx.Observable.fromEvent(document, 'click').map(click => Rx.Observable.range(1, 3))` will replace the click event with the output from the `range()` operator
* `switch` is an instance only operator
* `switch` unsubscribes from a previous observable when the new one comes in.  Compared to `merge` and `concat`, `switch` will only return the values from the newer observable ignoring the previous one
* Use `switchMap` to flatten data when switching observable values


<p>&nbsp;</p>

### Part 2-6: Coordinating business process
<p></p>

**There are times when you need to run asynchronous code in parallel**
* Combine Observables that need to run in parallel using `combineLatest`, emitting data as soon as it arrives
* `forkJoin` is somewhat similar to `combineLatest`.  The difference is it only emits the last data received.

**Some API’s have different paradigms for handling event but they can be converted into an Observable**
* Use `bindCallback(...)` to transform a function of `f(x, callback)` into an Observable, binding the callback function as the observer’s `next(value)` method
* Use `fromEvent` to transform any Event Emitter object into an observable

**And if you need to dispose a resource once an observable completes**
* Create observable resources whose lifetime spans as long as the observable with `using`

<p>&nbsp;</p>

### Part 2-7: Error handling with RxJS
<p></p>

**Error Handling Strategies**
* Recover from an error by returning an Observable in the `catch` block instead of handling it, e.g. `Rx.Observable.of(1,2,3).catch(err => Rx.Observable.of(0))...`
* Use `retry(N)` for retrying an Observable execution without the danger of an infinite loop - like in cases where an API could be offline.  Then you can call `catch` after exhausting retries to handle the error
* Use `retryWhen()` to implement a backoff strategy. For example you want to retry after every X seconds `Rx.Observable.of(1,2,3).retryWhen(err$ => err$.delay(Xms)`


<p>&nbsp;</p>

### Part 3-8: Mastering RxJS
<p></p>

**Cold observables are typically used to wrap bounded data - numbers, arrays strings**
* Data sources are truly lazy in nature, it won’t start emitting until a subscriber is present
* Every subscriber will receive their own independent copy of the data source
* Data is emitted at the beginning
* Static values and Promises created created inside the context of an Observable are cold.  
* Data is unicast-ed or is independent to every subscriber

**Hot observables are those that produce events regardless of the presence of a subscriber**
* They are commonly used for elements that emit events - clicks, scroll, etc.
* They are somewhat lazy because the events are still emitted, albeit ignored unless a subscriber is present
* Data is shared between subscribers
* Data is emitted at the point of subscription
* Promises and Web Sockets created outside the context of an Observable are hot 
* Event Emitters are hot because they’re never re-executed once completed
* Data is multicast-ed or shared to every subscriber

**Observables can be converted from hot to cold and back**
* Ultimately the producer of data and where (outside or inside the context of an Observable) it was created determines the temperature of Observables.  
* When a second subscriber listens to an Observable, its temperature determines whether a replay or a resubscribe is executed.  Replay returns the completed value while resubscribe executes the stream from the beginning. This concept is important to know specially when dealing with Promises.  For a hot Promise this means that the second subscriber will only get the data (or error) when the promise was completed - replay.  For a cold Promise this means that the whole observable pipeline will be executed - resubscribe.
* In an Ajax polling scenario where the Promise result is outside (hot) of the Observable context, subsequent subscribers will only get the last emitted value instead of reinitiating the request.  You need to wrap the Promise as an Observable to make it cold.  This allows your Ajax call to be reinitiated from the beginning every interval.
* Cold asynchronous observables can be converted to hot by calling `share()`.  This however does not work for synchronous data source like arrays where only the first subscriber will get executed and never the subsequent ones.
* Another operator to convert hot to cold is `publish()`.  It’s a low level version of `share()`.  It returns a `ConnectableObservable` object that requires you to explicitly call `connect()` before it can start multicasting events.  `share()` is the equivalent of `publish().refCount()`. There are also `publishReplay()` and `publishLast()` for multicasting observables.


<p>&nbsp;</p>

### Part 3-9: Toward testable, reactive programs
<p></p>

**When unit testing functional code, focus on your functions.  You can assume that functions from RxJs have been heavily tested**
* Test assertions are done inside the `subscribe()` block. Call `done()` for asynchronous code - `subscribe(x=>{...}, null, done);`
* In mocha a test suite is marked in the `describe` block, grouping your unit tests in one vertical
* In mocha, an async with callback requires calling the `done()` method
* For promises, use should.js to make it easy to call completed assertions such as `should.be.fulfilled` and `should.eventually.have`...

**A good practice to make your observables testable is to separate your producer, pipeline, and subscriber**
{% highlight js linenos %}
source$.take(10)        // producer
  .filter( fn )            // pipeline
  .map (fn)            // pipeline
  .subscribe( assertions );    // subscriber
{% endhighlight %}

**Possibly useful RxJS APIs**
* Rx.Scheduler to simulate latency or any time constraint
* Rx.TestScheduler that uses ascii marbles to fake delays, where each “-” represents 10 frames of a period of time
* `debounceTime()` with TestScheduler
{% highlight js linenos %}
it('Should square and add even numbers', function () {
  let scheduler = new Rx.TestScheduler(assertDeepEqual);
  // simulate setInterval observable
  let source = scheduler.createColdObservable('-1-2-3-4-5-6-7-8-9-|');
  let expected = '-------------------(s-|';
  let r = runInterval(source);
  scheduler.expectObservable(r).toBe(expected, { 's': 120 });
  scheduler.flush();
});
{% endhighlight %}

<p>&nbsp;</p>

### Part 3-10: RxJS in the wild
<p></p>

**RxJs’s pub/sub paradigm guides you towards an Event Bus architecture.  Using Event Bus in a SPA can lead to state management problems...**
* You can lose track of all your subscribers
* Your subscribers need to know the piping of Observables to prevent performance bottlenecks on subscription

**Enter Redux with RxJS for state management**
* Redux is uni-directional, RxJS is naturally a multicast Event Bus.  That’s why Redux creates class wrappers for Observables to control what is exposed to the components
* The flexibility of RxJS Subjects make a good fit for a Redux store

**What are RxJS Subjects?**
* A Subject is both an Observable and an Observer
* A Subject has state to keep track of all the observers while a regular Observable doesn’t.
* A Subject acting as an Observable cannot be reused once it's complete and error functions execute.
* A Subject acts as a bridge between one Observable source to several other Observables that expect a single source

**What are Subjects good for?**
* Subjects are good for listening to a DOM event where there are sections of a page that need to react differently based on the Subject’s data source
* Subjects are good for async operation where the return value need to be shared without re-executing the entire async operation
* Subjects, particularly ReplaySubject  are good for when the history of events need to be tracked

**There are several types of Subject..**
* ReplaySubject - returns a history of emitted values so that an Observer subscribing after 10 seconds for example can access the same Observable values from the very beginning
* BehaviorSubject - returns the last emitted value from the Observable.  It is different from a regular Subject in that its constructor requires an initial value on instantiation. It also has a very handy `getValue()` method to get the current value.
* AsyncSubject - Subject that does not return a value until the async operation completes

<p>&nbsp;</p>

### Recipes
<p></p>

https://github.com/Reactive-Extensions/RxJS/tree/master/examples  
Drag and Drop  
Double Click  

**Creating an Observable from setTimeout**
{% highlight js linenos %}
// This is similar to RxJs’s timer(1000) operator
const source$ = Rx.Observable.create(observer => {
  const timeoutId = setTimeout(() => {
    observer.next();
    observer.complete();
  }, 1000);

  // Defines unsubscribe behavior
  return () => clearTimeout(timeoutId);
});
{% endhighlight %}

**Inactivity Detection**
{% highlight js linenos %}
const interval$ = Rx.Observable.interval(1000);
const mousemove$ = Rx.Observable.fromEvent(document, 'mousemove');

// As soon as a mousemove event is emitted, the interval stream is cancelled.
interval$.takeUntil(mousemove$)
  .subscribe(
    x => console.log(x),
    err => console.log(`Error: ${err}`),
    () => console.log('OK, user is back!')
  );
{% endhighlight %}

**Custom Operator**
{% highlight js linenos %}
function exclude(predicate) {
 // Creates a new observable context to return with the new result
 return Rx.Observable.create(subscriber => {
    // Because you’re in a lambda function, “this” points to the outer scope.
    let source = this;
    return source.subscribe(value => {
      // Catches errors from user-provided callbacks 
      try {
        if(!predicate(value)) {
          // Passes the next value to the new operator in the chain
          subscriber.next(value);
        }
      }
      catch(err) {
        subscriber.error(err);
      }
    },
    // Be sure to handle errors appropriately and pass them along.
    err => subscriber.error(err),
    () => subscriber.complete());
  });
}

Rx.Observable.prototype.exclude = exclude;
{% endhighlight %}

**Unit testing a generator function with an Observable**
{% highlight js linenos %}
it('Should add numbers from a generator', function () {
  const adder = (total, delta) => total + delta;
  function* numbers() {
    let start = 0;
    while (true) {
      yield start++;
    }
  }
  
  Rx.Observable.from(numbers)
    .take(10)
    .reduce(adder)
    .subscribe(total => {
      expect(total).to.equal(45);
    });
});
{% endhighlight %}

**Promise retries - page 236**