---
layout: book
title:  "Working Effectively with Legacy Code"
excerpt: "Working Effectively with Legacy Code 1st Edition"
date:   2002-09-22
read: 2018-08-25
categories: books
book_url: https://www.barnesandnoble.com/w/working-effectively-with-legacy-code-michael-feathers/1101414704
book_image: 
tags: 
  - patterns
  - testing
---

## Chapter 1: Changing Software
### Reasons why we make changes
* Adding a feature - Adding behavior
* Fixing a bug 
* Improving the design - Making it more maintainable
* Optimizing resource usage - better use of time or memory

## Chapter 2: Working with Feedback
### Importance of Regression Testing when dealing with legacy code
Regression tests are tests that verify last good known behavior of a piece of code. Its existence acts as a safety net when you make your changes by catching scenarios that you would not have thought about.

### How fast do unit tests have to be
Given a codebase with 3,000 classes, each having 10 unit tests
* Speed of 1/10th (100ms) = 50 minutes
* Speed of 1/100th  (10ms) = 5 minutes

### Steps to making safe changes
1. Identify change points.
2. Find test points.
3. Break dependencies.
4. Write tests.
5. Make changes and refactor.

## Chapter 3: Sensing and Separation
### Why you break dependencies in tests
* Sensing - to get a sense of the effects of a code usually through fakes and mocks
* Separation - to isolate code that is otherwise not testable

## Chapter 4: The Seam Model
### What is a seam
*A seam is a place where you can alter behavior in your program without editing in that place.* Given a class you wanted to test, a seam is a section of code you can change without affecting the structure.  The most useful type is an Object Seam where you employ OOP qualities like inheritance and encapsulation to fake methods that are otherwise part of a dependent class.
```java
public class CustomSpreadsheet extends Spreadsheet
{
  public Spreadsheet buildMartSheet(Cell cell) {
    ...
    // This is your seam. You can subclass its parent
    // and write your own implementation of this
    // method
    cell.Recalculate();
    ...
  }
}
```

## Chapter 6: I Don’t Have Much Time and I Have to Change It

Some techniques to use when you're pressed against time and you're not familiar with the codebase, but still allow you to write tests in a non-invasive manner.

### Sprout Method 
A sprout method is a new method for the piece of functionality you need rather than altering a seemingly complicated code.  Although not ideal, it is less invasive and it allows you to cleanly separate your code.  Consider an existing for-loop where you have to have an additional filter in every iteration.  The Sprout Method recommends you write your tests for the existing code you're changing, then create a new method for that filtering requirement instead of directly working with the existing loop. The disadvantage is you are essentially giving up on an existing code when you should find the root cause instead.

### Sprout Class
A sprout class is a new class containing the new functionality you need called from the source.  This is done when the object you're dealing with is impossible to test because of complex dependencies and a Sprout Method wouldn't suffice.  The trade-off is you can have meaningless Sprout classes.

### Wrap Method
In a Wrap Method, the functionality you need can happen before or after the existing code you are changing.  Unlike the Sprout Method, your code does not need to happen at the same time as the code you're changing, like say adding logging or appending data.  Here, you create 2 new methods - 1 for the existing code you're changing and 2 for the new functionality.  You then move all the existing code to the first method, and call methods 1 and 2 in there.  This technique can often lead to bad method names.

### Wrap Class
This is the class level implementation of the Wrap Method.  This is similar to the Decorator pattern where you extend an existing class, then override or add new methods of your own.  You can use this over Wrap Method if the class you're dealing with is too big or you need to add a behavior that's unrelated to the class you are working on.


## Chapter 8: How Do I Add a Feature?
### Test Driven Development
Instead of shying away from complexity of the code, you can confront it by using TDD for your changes.  A workflow to follow can be:
1. Get the class you want to change under test.
2. Write a failing test case.
3. Get it to compile.
4. Make it pass. (Try not to change existing code as you do this.)
5. Remove duplication.
6. Repeat.

## Chapter 9: I Can’t Get This Class into a Test Harness
### Dealing with an "irritating parameter"
A class constructor parameters can sometimes get in the way of putting it in a test harness.  If concrete classes are expected, you can convert it into an interface to make it easy for you to fake it.  Consider also passing null as an alternative if it permits you to.

### Hidden Dependencies
There are instances where some external class instantiation happens inside a constructor making the class hard to create in test. You can get around it by creating an overloaded constructor that expects that external class as input parameter.  You can use this overloaded constructor for your test while keeping the parameterless constructor unchanged.  In effect, you open the class for testing via the parameterized constructor without affecting the rest of your codebase that calls parameterless constructor.  This is best when used for a few hidden dependencies.

### The Case of the Construction Blob
Some constructors have several hidden dependencies mixed with a number of parameters, making parameterized constructor not ideal.  You have 2 options for such cases:
1. Extract, then Override Factory method - You create a protected method of the constructor dependency initialization, then override that in your test class. 
2. Supersede Instance Variable - You create a new method with a parameter of the same type as the one you instantiate in the constructor.  Within the new method, you swap out the class's instance with the one from your function parameter.

### The Case of the Irritating Global Dependency
A global Singleton class is injected in several classes making them challenging to put in a test harness.  You can extract the method you need to fake (Extract Interface) and make an interface out of it, or in my opinion, just create a spy for it.


## Chapter 10: I Can’t Run This Method in a Test Harness

### Sometimes, we need to test private methods
* Try to test it through a public method first
* Make it a protected method and subclass it with a Test version
* Make it public
* If #2 and #3 bothers you, maybe the method belongs in a different class

## Chapter 11: I Need to Make a Change. What Methods Should I Test?
Apply effect analysis to the code you're changing.  This involves having an informal diagram about parts of the code that will be affected by your change.  Once you know how to reason about effects on your code, you can write your tests around methods that your change can affect.

## Chapter 12: I Need to Make Many Changes in One Area. Do I Have to Break Dependencies for All the Classes Involved?
Break dependencies to be able to put your code in a test harness, this involves refactoring sometimes.  The important thing is you add a test every time you introduce a change.  As you continue to make changes and put your classes into test, you also build up your test coverage.  

## Chapter 13: I Need to Make a Change, but I Don’t Know What Tests to Write

### Characterization Tests are tests that verifies the behavior of a piece of code
Characterization tests are useful for:
* Documenting existing code
* Regression Testing when introducing new code
* Debugging - these tests make reasoning faster
* Eliminates "playing computer" with your head

## Chapter 15: My Application Is All API Calls
Often, code is mixed with business and API calls.  You can refactor it based on responsibilities.  If you find it's littered with API calls from vendor libraries,  you can follow these approaches to easily put your codebase in a test harness:
1. **Skin and Wrap the API** - mirror the API with your own interface
2. **Responsibility-Based Extraction** - extracting all the methods from the library you're using and putting it in its own class

## Chapter 16: I Don’t Understand the Code Well Enough to Change It

### Sketching
Such a low-level technique is seldom used because we get caught up in the most immediate way of solving our problem.  The benefit of pen and paper is that you can have a reference to go back to and it helps you understand the flow of the code better.

### Scratch Refactoring
This involves moving methods out to make the code easier to debug and to understand.  It does not have to be production-quality code.  It is code meant for you to understand pieces your working on and can be thrown away once you are done.

### Delete unused code
You get hung up on the intent of the original code that often it is better to just remove or rewrite it when parts of it is unused or it gets in your way.

## Chapter 20: This Class Is Too Big and I Don’t Want It to Get Any Bigger
### Decomposing Large Classes based on Purpose or Single Responsibility Principle
* Group methods and put it in a different class
* Move private classes out if they can be public in another class
* Extract methods about decisions that can change, e.g. database calls, business logic, external API calls. The tiny extracted methods help reveal a new class grouping.
* Make feature sketches to help you visualize the internal relationships of a class.  You can identify method groupings once you have a better view of the class.
* Write out what your class does. If you end up with a lot of "and" "or" conjunctions, you may have identified other responsibilities that need to be factored out.

## Chapter 21: I’m Changing the Same Code All Over the Place

### Create super classes when you can to avoid duplication
If you find yourself copying and pasting code from one class to another, check if you can pull those methods in a super class.  For the differences in the specific classes, use `abstract` or `virtual`.  Often when you do this, you end up with smaller classes open for extension and somewhat closed for modification (Open/Closed Principle).

## Chapter 22: I Need to Change a Monster Method and I Can’t Write Tests for It

### When dealing with an overwhelmingly large function, you need to make sure you're not breaking anything
* Introduce a sensing variable - this is a temporary boolean flag that you can introduce to determine that your changes do not break functionality.  You can set this value to `true` after the operation you expect to execute happens, and write tests against it.
* Extract methods - Operations that can be lumped together are better in their own methods.  When you do this, you'll often find that such a large function is just a series of commands executed in a particular order.

## Chapter 25: Dependency-Breaking Techniques

* Refactor methods in new ones and create a subclass to test a lengthy code that is otherwise difficult to test
* Convert a class dependency to an interface if you can fake out its functionality
* For sealed/final classes, check its inheritance hierarchy.  Most likely it has an interface or object you can subclass to make it testable
* If you can write code without using any dependencies, it will make it easier to test.  Often we mix logic with external dependency calls.  If you extract the logic code, putting the feature in test harness will be faster.
* Break Out Method Object in a class.  Doing this refactoring can help expose seams where you can start testing your class.
* Encapsulate Global References in its own class.  It will become easier to pass that parameter around to methods than to keep track of its changing state.
* Make the method static you are trying to put in a test harness if it does not depend on any instance variables
* If the dependency is local to a method, extract it and pass the dependency as an argument.  This will allow you to easily fake it.
* When a constructor creates a dependency inside its body, you can create an overload of that constructor that expects its dependency as an argument.  This will allow you to pass a fake or dummy implementation in test.
* Classes that have instance methods you don't care much about can be pulled up into an interface or an abstract class so write your own implementation useful for you test
