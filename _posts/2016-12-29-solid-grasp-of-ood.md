---
layout: post
title:  "SOLID GRASP of OOD"
excerpt: "Examining SOLID and GRASP Principles in OOD"
date:   2016-12-29 08:20
categories: notes
tags: patterns
---

### Principles are ways of thinking.  
### Patterns are common ways to solve problems.
<br />
--------------------

### SOLID
SOLID are the 5 principles of Object Oriented Design. They are guidelines when building extensible application modules.  It was introduced by Michael Feathers in the early 2000s from the concepts named by Robert Martin.

#### Single Responsibility Principle (SRP)
- A class should only have one reason to change.  
- With class properties contained for a single purpose, it makes changes easy to implement and allow teams to work on different aspects of a module.  
- It makes your classes lightweight and it avoids breaking changes to other classes that depend on it.  
- One way to think about a class’s responsibility is to think about how a property or method relates to the class.  An `Order` class can have an `OrderDate` but it should not have anything to do with validating the order, shipping, or displaying related items.  
- Other examples include separating the `Content` type for `Email` classes - which could be text or HTML.  Separating paging in a `Book` and printing in a `Report` class are other examples.  
<p></p>

#### Open-Closed Principle (OCP)
* A class or method should be open for extension but closed for modification.
* Complementary to SRP in that it cannot be achieved without it
* It talks about creating abstractions using abstract classes or interfaces for entities that can have different and specific representations, e.g. Shapes, Person, Files. 
* A class is said to be open if it can be extended or inherited by another class, and closed because any modifications should be done in the inheriting class without affecting other clients.
* The motivation for it is to avoid lengthy, all encompassing classes that are difficult to maintain.  With OCP, changes mean one extends a class or interface and provide its own implementation.
* Systems that allow you to put plugins, extensions, or add-ons are the ultimate example of OCP.
<p></p>

#### Liskov Substitution Principle (LSP)
* Sub types must be replaced with its base type. 
* To achieve this, sub classes must have consistent implementations of the base class properties to prevent the classic Square and Rectangle example - where Square assumes that its width and height are the same causing the program to break when a Rectangle is used to calculate the area.
* A common violation of this is a type-checking code block when the base type should have been used to eliminate it entirely.
<p></p>

#### Interface Segregation Principle (ISP)
* Clients should not be forced to implement interface methods they will not use
* It promotes the use of small client interfaces over huge ones.  This avoids having to write unnecessary code just to satisfy the interface requirements.
* From wikipedia: “many client-specific interfaces are better than one general-purpose interface”
* When writing a library, remember that interfaces belong to client and not implementation classes.  What this means is `IShape.calculateArea()` method belongs to a `Dimension` client class and not necessarily to a `Shape` implementation class because the former is a subset of the latter.
<p></p>

#### Dependency Inversion Principle (DIP)
* (1) High-level modules should not depend on low-level modules. Both should depend on abstractions. (2) Abstractions should not depend on details. Details should depend on abstractions.
* High level classes encapsulate the Business Logic Layer. Low level classes provide specific implementation like Email, File, Http, etc..
* When composing, neither parent nor child class should depend on their implementation. Both should depend on abstractions.
* It promotes reuse and portability of high level modules by removing dependencies from low level modules
* To decouple your high level and low level modules, you have to think about their interaction as a means of abstraction.  This will allow you to write lighter and less dependent classes.
* Drawbacks are it makes the application hard to understand, you’re forced to write a lot of plumbing code, and you frequently find yourself asking what are the present concrete implementations of the abstractions.

```

  +--------------------+           +---------------------+      +---------------------+
  |                    |           |                     |      |                     |
  |     Library #1     |           |     Library #1      |      |     Library #2      |
  |                    |           |                     |      |                     |
  |                    |           |                     |      |                     |
  |  +--------------+  |           |  +---------------+  |      |  +---------------+  |
  |  |     Order    |  |  +----->  |  |     Order     |  |   +-----+ Pen:IProduct  |  |
  |  +-------+------+  |           |  +-------+-------+  |   |  |  +---------------+  |
  |          |         |  +----->  |          |          |   |  |                     |
  |          |         |           |          |          |   |  |                     |
  |  +-------v------+  |           |  +-------v-------+  |   |  |  +---------------+  |
  |  |   Product    |  |           |  |    IProduct   <------v-----+ Book:IProduct |  |
  |  +--------------+  |           |  +---------------+  |      |  +---------------+  |
  |                    |           |                     |      |                     |
  +--------------------+           +---------------------+      +---------------------+

```
<p></p>
<p></p>
<p></p>

### GRASP
General Responsibility Assignment Software Patterns are 9 patterns (or principles) in determining how to assign responsibility to classes.  It is developed by Craig Larman as a learning aid when designing object oriented systems.  
<p></p>

#### Controller
```

  +--------------+     +----------------+      +-----------------+
  |   UI Layer   <---->+   Controller   <----->+    App Layer    |
  +--------------+     +----------------+      +-----------------+

```
* Answers the question of which class is responsible for responding to event/input driven systems.
* In a scenario where a UI layer is involved, the pattern recommends creating a Controller class that can delegate actions from UI to your Application Layer classes.
* A controller should not do much other than coordination.  If its methods become too bloated, prefer grouping functionalities into smaller controller classes rather than creating a bottleneck.
* The most common implementation of this pattern is in MVC.
<p></p>

#### Creator
```

                +------------+   +------------+
                |   Parent   |   |    Child   |
                +-----+------+   +------+-----+
  new Parent()       |                 |
  +---------------->+++  new Child()   |
                    | | ------------> +++
                    | |               | |
                    +++ <------------ -++
                     |                 |
                     |                 |


```
* Answers which class is responsible for creating an instance of another class.
* The generic guideline for this pattern is the parent class or the more-specific implementation should be responsible for instantiating a sub class.
<p></p>

#### High Cohesion
```

  +-------------------+       +--------------------+
  |      Member       |       |     Repository     |
  +-------------------+       +--------------------+
  | register()        +-------> dbSave(record)     |
  +-------------------+       +--------------------+
  | updateProfile()   +-------> dbUpdate(record)   |
  +-------------------+       +--------------------+

```
* Answers how much functionality a class should be responsible for.
* This addresses the scenario where a class does so much more than it is supposed to.  Following this pattern, methods not pertaining to the class should be placed in a different and more appropriate class.
* It aims to keep a class focused, manageable, and easy to understand by making properties and methods tightly related.
<p></p>

#### Indirection
```

  +---------------+         +--------------+       +-----------------+
  |  Application  +--------->    Payment   +------->     Bank# 1     |
  |     Layer     <---------+    Wrapper   <-------+       API       |
  +---------------+         +--------------+       +-----------------+

```
* Answers how high level classes can deal with low level class in a way that low level classes can be easily extended or substituted by something else.
* It’s different from Low Coupling in that you’re trying to establish relationship between classes that are not part of the same domain. 
* What you’re trying to achieve here is to have an intermediary class that will allow both classes to talk to one another rather than putting plumbing code on the implementing class.
*  This takes advantage of the Adapter pattern by creating wrapper classes that can be understood by the consuming class.  So then you can freely change the low level class with possibly minor changes only to the wrapper class.
<p></p>

#### Information Expert
```

  +-------------+      +------------------+
  |   Person    |      |  Student:Person  |
  +-------------+      +------------------+
  | FirstName   |      | StudentId        |
  +-------------+      +------------------+
  | LastName    |      | EnrollmentDate   |
  +-------------|      +------------------+

```
* Answers what properties and functionalities should a class be responsible for. 
* You should always put the required property or method to the class that has enough information to generate it.
<p></p>

#### Low Coupling
```

  +--------+      +--------+      +--------+
  |  Car   +------>  Model +------>  Make  |
  +--------+      +--------+      +--------+

```
* Answers how much a class should depend on another class.
* This does not deal with creating abstractions, rather it teaches one how to structure class compositions.  
* A class is considered to be highly coupled if it has a high dependency on other classes.  Take for example a `Car` class. It is highly coupled if it requires `Model` and `Make` classes to instantiate.  You can decouple it by putting `Make` part of `Model`.
<p></p>

#### Polymorphism
```

  +----------------+       +---------------+
  |  EmailMessage  +------->    IClient    |
  +----------------+       +---------------+
                           | getSubject()  |
                           +-------^-------+
                                   |
                                   |
                  +------------------------------------+
                  |                |                   |
         +--------+-------+  +-----+----------+  +-----+-----------+
         | Gmail:IClient  |  | Yahoo:IClient  |  |  Apple:IClient  |
         +----------------+  +----------------+  +-----------------+
         | getSubject()   |  | getSubject()   |  | getSubject()    |
         +----------------+  +----------------+  +-----------------+

```
* Answers how to make your application extensible when you need to support different entity behaviors without using conditionals.
* The responsibility of handling the variation falls on the type that requires alternate implementations.  
* This can be achieved thru interfaces or abstract classes.  If a new variation arises, the difference in implementation is done in the new type without affecting other types.  Since the behavior of the new class follows a contract, it can be easily plugged in.
<p></p>

#### Protected Variations
```

                         +------------------+
                         |    TaxAbstract   |
                         +------------------+
                         | abstract rate    |
                         +---------+--------+
                                   |
            +---------------------------------------------+
            |                      |                      |
            |                      |                      |
  +---------+--------+   +---------+--------+   +---------+--------+
  |       USTax      |   |      EUTax       |   |      NYTax       |
  +------------------+   +------------------+   +------------------+
  | rate             |   | rate             |   | rate             |
  +------------------+   +------------------+   +------------------+

```
* Answers how to assign responsibilities that minimizes breaking changes on future iterations or variations of an entity.
* Simply put, it Protects existing elements from future Variations by allowing the system to support different forms of the same entity because changes are done in isolation.
* Closely related to Open/Close Principle and often achieved together with Polymorphism
* You identify parts of your system that are prone to change and will have future variations.  You then design your architecture around them in a way that you can easily makes changes that will not affect the rest of the system.
* More of a principle than a pattern in that it combines other GRASP techniques to implement
<p></p>

#### Pure Fabrication
```

  +--------------------------+     +------------------+
  |     OrderRepository      |     |      Order       |
  +--------------------------+     +------------------+
  | static save(Order)       |     | Id               |
  +--------------------------+     +------------------+
  | static delete(Order)     |     | Price            |
  +--------------------------+     +------------------+

```
* Answers where to put functionalities that do not belong to any domain or expert but still promote high cohesion and low coupling
* In situations where this problem arise, you can create a convenience class that contains all the functionality you need.  Most examples split CRUD methods from domain classes into its own Persistent class.
* Service classes in DDD are related to this - classes that wrap business logic functionality and maybe manipulating database records into something that can be understood by your presentation layer.
* It doesn’t necessarily pertain to utility or helper classes because there is a strong emphasis on the cohesion/relatedness of methods you are pulling out 