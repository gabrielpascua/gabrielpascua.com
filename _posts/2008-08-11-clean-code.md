---
layout: book
title:  "Clean Code"
excerpt: "Clean Code: A Handbook of Agile Software Craftsmanship"
date:   2008-08-11
categories: books
book_url: https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=sr_1_1
book_image: /img/book-clean-code-360x465.jpg
tags: patterns
---

### Foreword
“First, it is through practice in the small that professionals gain proficiency and trust for practice in the large. Second, the smallest bit of sloppy construction, of the door that does not close tightly or the slightly crooked tile on the floor, or even the messy desk, completely dispels the charm of the larger whole. That is what clean code is about.”
<p></p>

### Introduction
* Code quality is measured by how many WTFs/minute you can get on a code review.
* Quality code requires craftsmanship, and craftsmanship requires knowledge (patterns + principles) and work (practice + repetition).
<p></p>

### 1 Clean Code
* Code/coding will not go away because it represents the details of a project and it is the language of the requirements.  Programming language abstraction will increase but it will not eliminate coding.
* Wading - the term for being significantly impeded by bad code.
* [Dave] LeBlanc’s Law: “Later equals never.”
* Programmers cannot blame users and managers for having bad code. We are complicit in it because they look up to us to provide the information they need to make promises.  It is their job and thus it is equally our job to voice out our opinions about emphasis on code quality. To summarize the point, think of a patient asking a doctor to stop hand washing before an operation. 
* The initial time investment on clean code is substantial but insistence on it will pay off by speeding up subsequent changes.
* What is clean code:
    - Bjarne Stroustroup inventor of C++ uses “elegant and efficient” and does not tempt others to add mess.  Elegant as in pleasing to read
    - Pragmatic Dave Thomas and Andy Hunt uses the broken window metaphor - a springboard for other crimes
    - Grady Booch (creator of UML) describes it as “simple and direct”, “full of crisp abstraction” - easy to read
    - “Big” Dave Thomas (Eclipse IDE) defines it as “can be read, and enhanced” by another, an emphasis on making code easy to change and very minimal
    - Michael Feathers (author on legacy code) focuses on the quality of being “written by someone who cares” - not just about solving the problem or the craft, but also the people after him.  
    - Ron Jeffries (author extreme programming in c#) talks about reduced duplication, expressiveness and simple abstractions
    - Ward Cunningham’s (eXtreme Programming, Design Patterns) definition can be summed up to code that is predictable and obvious - “like it was made for the problem”
* The ratio of time spent reading vs. writing code is well over 10:1 making a case for code readability (even if it makes writing harder)
* The Boy Scout Rule - tiny improvements over time significantly improves project maintenance.  No code is immune from improvement.
<p></p>

### 2 Meaningful Names
* Use intention-revealing names - should answer why it exists, what it does, and how it is used
* Avoid Disinformation 
- Avoid using language keywords or data types in your name when the word has no relation to it e.g. `testList` when it’s not a `List` data type, 
- Avoid inconsistent spelling or naming when dealing with the same element
* Make Meaningful Distinctions, avoid noise words like `info`, `data`, `variable`, `the` and ambiguous function arguments
* Use pronounceable names - “if you can’t pronounce it, you can’t discuss it without sounding like an idiot”
* Use searchable names
* Avoid encodings - hungarian notation, variable prefixes.  I disagree about the argument of not prefixing `I` to an interface and distinguishing the implementation class by suffixing it with `Imp`.
*  Avoid Mental Mapping - fancy names that need interpretation
*  Class Names should be nouns
* Method names should be a verb or have a verb phrase
* Don’t be cute - avoid clever names
* Pick one word per concept - pick one from `fetch`, `retrieve`, and `get` and be consistent
* Don’t pun - using the same word for different purposes
* Use solution domain names - use Computer Science terms because your readers are programmers
* Use problem domain names - use this when CS terms are not applicable
* Add Meaningful Context - use `addressFirstName` when first names are part of an `Address` and `User` classes
* Don’t Add Gratuitous Context - `Address`, `MACAddress` and `WebAddress` are better converted to `PostalAddress`, `MAC`, and `URI`
<p></p>

### 3 Functions
* Write small - less 150 characters, hardly 20 lines long and, and up to 2 indent lines if nested
* Do 1 thing - the “one thing” not necessarily a single line of code rather a single statement that relates to the name/intent of the function
* 1 Level of Abstraction per Function - code can be easily read top-down and abstracted like a set of steps (The Step-down rule).
* Limit switch statements to a single use per function and it should only return polymorphic objects
* Use names that describe what the function does. Don’t hesitate to write long names, it is better than a short but vague name.
* The ideal number of arguments is 0, max is 2.  The testability of your functions decreases as  the number of your arguments increase because you have to deal with different combinations. Passing boolean arguments can be avoided by writing functions that are applicable if true/false - e.g. `renderForAllowedPersonnel()`
* Have no side effects - avoid passing arguments by reference
* Command Query Separation - functions should do something or answer something
* Prefer Exceptions to Returning Error Codes - try-catch blocks are recommended to be in their own function because mixing error processing is confusing inline and error handling is “one thing”
* Don’t Repeat Yourself - most OOP patterns are strategies to eliminate duplication.
<p></p>

### 4 Comments
* Comments are failures to express one’s ideas in code.  They are hard to maintain as your code changes.
* Comments do not make up for bad code. You need to rethink how your code is written if you have to comment it.
* Explain yourself in code - code should be the only source of truth
* The only good comments
    - Legal comments - copyright, licenses, credits, etc..
    - Informative comments - for cryptic expressions like when Regular Expressions are used
    - Explanation of intent - explaining why such a return value was used, why certain code constructs are in place
    - Clarification - for when a library you’re using cannot be altered
    - Warnings of consequences
    - TODO’s
    - Amplification to indicate the importance of a specific code block
    - Javadocs (jsDocs) for public API’s
* Bad Comments
    - Comments that force you to look somewhere else
    - Redundant comments - intent has been expressed in code
    - Misleading comments - inaccurate comments are worse than no comments
    - Mandated comments - every comment (public or private) must have javadocs style
    - Journal comments - change logs
    - Noise comments - comments that restate the obvious
    - Position markers - #region #endregion. Use these sparingly
    - Closing brace comments - often used in a lengthy code. Consider shortening your function
    - Attributions and Bylines - let version control handle it
    - Commented out code - let version control handle it
    - HTML in source code for commenting tools, let the tool handle formatting
    - Javadocs in Nonpublic code
<p></p>

### 5 Formatting
* Formatting is important for communication because it affects maintainability and extensibility of your application.  Code blocks are going to be removed over time, but style and discipline will remain.    
* The Newspaper metaphor - code is best read top down with increasing details as you go further down.  
* An extra empty line break should signal a change in concept.
* Blank space should separate unrelated parts on a single line of code, e.g. `function(test) {...}`, `if (true) {...}`, `for (string test) {...}`
* Horizontal alignment is useless.  Worst, it can hide long lines that should have been broken
<p></p>

### 6 Objects and Data Structures
* Hide implementation details as much as possible through access modifiers and by limiting public properties. Don’t expose members of your objects that aren't going to be used when instantiated.
* It’s ok to add classes that are purely data structures along with a class that is mostly composed of functions (Visitor Pattern) that operate on the data.  The advantage is you can easily add methods in one place without affecting the structure.
* Law of Demeter (LoD for Functions or Methods) or principle of least knowledge - function A should only call functions in its parent class or functions of objects within its own function scope.  Method chaining is cited as a violation of LoD if parts of the chain are objects (classes that are mostly functions) but not if the parts are data structures.  Objects should hide access to its internal members while Data Structures have inherently public members and therefore does not violate it.
* Generic forms of Data Structure classes.  Do not mix business rules methods in these classes, rather create separate objects that expose behavior and hide data:
    - Data Transfer Objects - “bean” form in Java, no methods just properties
    - Active Record - classes that have navigational methods (find, save, delete) and are typically related to database models
<p></p>

### 7 Error Handling
* Error handling should not hide the logic in code
* Handling exceptions (try-catch) is cleaner than handling return codes
* Creating a wrapper class for 3rd party API’s is considered best practice - it can be easily replaced, you can create your own errors, and you can minimize your dependencies
* Avoid returning `null`.  Consider throwing an exception or a [Special Case](https://martinfowler.com/eaaCatalog/specialCase.html) pattern object (Empty Object or Class that represents the special case) instead.  It will remove the need for null-checks on the caller.
<p></p>

### 8 Boundaries
* Boundaries are important because it gives you control over what han happen in your application.  It also accommodates changes easily without affecting large parts of your system.
* If you are using a 3rd party API that provides methods that can easily destroy your application, create a boundary by creating a class that will hide those methods and limit their use.
* Try to write tests when learning a new API - it will help test the boundaries of what the API and your code can do (James Newkirk “learning tests”).  The unintended benefit of this is when the API gets an update, you can run the same tests and find right away what will break in your current code.
 * For code that does not exist it is better to work on an `interface` with all the methods you need then have a dummy class that implements it.  Once the code exists, you can replace the dummy with actual code or write an Adapter to iron out inconsistencies.
<p></p>

### 9 Unit Tests
* The quality of your test code is as important as your production code.  Tests will break as you continue to update your production code and if your test code isn’t written in an easy, maintainable way it’ll become a burden. 
* FIRST rules of unit tests
    - Fast - runs quickly so it can be ran frequently
    - Independent - should not depend on other test to avoid cascade of errors
    - Repeatable - can be ran anywhere even against a production environment
    - Self Validating - should pass or fail
    - Timely - should be ran before your application fires up
<p></p>

### 10 Classes
* A class should not have a lot of responsibility
* Getting software to work and cleaning it are 2 separate things that have equal importance.
* A good rebuttal to the argument of having smaller classes can obscure the bigger picture is that there is as much to learn in a lengthy class or object.  Every complex system will contain a sizeable amount of code and one of the tasks required in building a maintainable system is organization. 
<p></p>

### 11 Systems
* Getting it right (subtle difference versus doing it right) the first time is a myth.  Code is written based on current models or requirements.  Development is an iterative process.
* An optimal architecture is a modularized system composed of POJO domain classes complemented by AOP code or tools
* Aspect Oriented Programming as a complement to OOP for cross cutting concerns ????
* “Postpone decisions until the last possible moment” - make informed decisions not assumptions
* Use standards if it adds value.  Adhering to strict rules often lead people to lose touch of the project’s true goal.
<p></p>

### 12 Emergence
* Kent Beck’s 4 rules of “Simple Design”. The first having the highest importance, the second and third of equal importance, and the fourth dependent on the first 3
    - Runs all the tests / Passes the tests - emphasizes the importance of writing tests to making sure that the system runs as intended
    - No Duplication  - DRY, SPOT (Single Point of Truth) or SSOT (Single Source of Truth)
    - Reveals Intention or Expresses the intent of the programmer - make your code easy for the next person to read and understand
    - Fewest Elements - Minimize the number of classes and methods.  High number of classes is a result of pointless dogmatism.  If it doesn’t serve the first 3 rules, you should remove it
<p></p>

### 13 Concurrency
* Concurrency is a strategy to decouple what from when it gets done.  Structurally, it resembles a network of collaborating computers rather than one big main loop.
* Concurrency, having its own life cycle of development, requires a different strategy that will affect how your code is written
* Concurrency Defence Principles
    - If one follows SRP, the advice is to separate concurrent code.  Concurrency is complex and is a reason enough to pull it out from the rest of your code.
    - Because different threads can change a shared data, limit its access thru encapsulation.  
    - Instead of a shared data, explore making clones specially if there is little to no performance sacrifice
    - Make each thread request as independent/pluggable as possible
    - Know your library, what are available API’s for you to handle multi-threaded requests
    - Write tests that can expose problems in your concurrent code
<p></p>

### 14 Successive Refinement
<p></p>

### 15 JUnit Internals
<p></p>

### 16 Refactoring
<p></p>

### 17 Smells and Heuristics
* Do not pass boolean arguments. It expresses that you’re expecting different results.  It is better to have more functions than to pass an argument that selects a behavior.  Use “for” in your function names, e.g. “runForOne”, “executeForMany”
* Follow the “Principle of Least Astonishment/Surprise” - behavior and output should be obvious.  If a function has a high astonishment, consider redesigning it.
* Remove default constructors with no implementation because it clutters the code
* Feature envy as the enemy of SRP and OCP - Class A with access to Class B uses Class B's methods or instance to shape its structure. Simply put, Class A wishing to be part of Class B.  
* Prefer non static methods in general.  If you have to use static methods, make sure it isn’t expected to be polymorphic
* Follow the “one switch-case rule”. Prefer polymorphism to conditionals
* Make precise decisions about your data types - use double for currency not float, use bigint not int if you’re expecting large growth
* If you have functions that require a specific order of execution, make the next function’s argument the result of the previous to enforce it.
* Make constants a static property.  It’ll make it easy to figure out it’s originating class
* Use enums over constants
* Use long function and variable names for long scopes
* Names should describe side effects “createOrReturnSomething”
* Don't skip trivial tests - their documentary value is higher than the cost to write them