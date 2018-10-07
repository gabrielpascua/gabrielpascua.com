---
layout: book
title:  "Patterns of Enterprise Application Architecture"
excerpt: "Patterns of Enterprise Application Architecture"
date:   2002-11-02
categories: books
book_url: http://www.informit.com/store/patterns-of-enterprise-application-architecture-9780321127426
book_image: /img/books-patterns-of-enterprise-application-architecture-360x451.jpg
tags: 
  - patterns
---

### Preface
* Patterns are useful starting points, but they are not canned solutions.

<p>&nbsp;</p>

### Introduction
* The definition of Architecture in software development falls in one of the 2 - (1) Highest-level breakdown of a system into parts, (2) Decisions (based on business domain problems and needs) that are hard to change 
* Enterprise applications usually involve persistent data
* Enterprise applications will outlive the hardware that created it
* The challenge in design is knowing about alternatives and tradeoffs
* Choosing an architecture means that you have to understand the business and be able to find a solution based on that
* Many architectural decisions are about performance - get a system running then optimize it using measurements.  A performance decision is not a fact if it cannot be measured before and after.
* Some aspects that will help measure performance
    * **Response Time** to process an outside request
    * **Responsiveness** of the system to acknowledge a request
    * **Latency** to get a response (why you limit remote calls)
    * **Throughput** of data you return per transaction
    * **Load**, how much stress your system is under
    * **Load Sensitivity and Degradation** expresses varying response times based on load
    * **Efficiency**, performance divided by resources used
    * **Capacity**, how much a system can take before it dips below the accepted threshold
    * **Scalability** (Vertical or Horizontal), how adding hardware affects performance
 * Building for horizontal scalability often makes more sense than writing complicated code that a hardware upgrade can cheaply address.  On the same token adding servers is often cheaper than adding more programmers assuming the system is scalable.
* Patterns are “half-baked”, they’re not templates, they’re good starting points but you need to tailor them to the problem at hand.  Its value lies on the developer communicating an idea.
* When encountering patterns, also assess where the pattern is not applicable.  It can help you find alternative solutions

<p>&nbsp;</p>

### Chapter 01 - Layering
* Layering as the most common technique to break apart complicated systems gives these benefits and drawbacks:
	+ Easily understand a single layer
	+ Substitutability
	+ Minimizes dependencies
	+ Makes a good starting point for standardization
	+ Can be used as a  base for another layer
	- Modification requires updating all the layers
	- Performance is affected every time a layer munges data
* Layer vs Tier - Tier denotes a physical separation (two-tier for client-server) while layer doesn’t 
* 3 Principal Layers:
	- Domain - Business logic
	- Presentation - displays information, services offered to others
	- Data Source - communicates with other system, services offered to you
* An informal test to do before creating a Domain Logic layer is to ask yourself how your code is going to be structured when you need to support a different Presentation Layer.  Duplication to complete the task is an indicator that you require abstraction. 

<p>&nbsp;</p>

### Chapter 9: Domain Logic Patterns
Layering your application

* **Table Module** (83 - Giovanni’s) - “A single instance that handles the business logic for all rows in a database table or view.”  It provides an easy integration with your data source, typically tabular in nature, by having a single class for every table - physical or virtual (database views). Plural in class name, it can be implemented as an instance class or a static class with static operations. The main drawback is you cannot employ any inheritance strategy because the class is either too big or just useless in a different context.  Depending on a language’s capability, object-to-object interaction can be daunting to implement and you’re limited to a record’s structure. It does not have any Identity field thus every operation requires some kind of lookup argument. 


* **Service Layer** (83 - Giovanni’s) - “Defines an application’s boundary with a layer of services that establishes a set of available operations and coordinates the application’s response in each operation.”  The Service Layer sits in between the Application Logic and Domain Logic layers.  It coordinates the interaction and responses between the 2 layers.  The main reason for adding such layer is to provide support for a multi-client application.  It can be implemented using the Facade pattern to the Domain Logic (domain facade) or as a library on its own delegating operations between application and domain (operation script).  By avoiding mixing application logic inside your Domain Model through a Service Layer, you make your Domain Layer more reusable across applications.  “You probably don’t need a Service Layer if your application’s business logic will only have one kind of client.”

* **Transaction Script** (82 - PS6) - “Organizes business logic by procedures where each procedure handles a single request from the presentation.”  The name comes from the notion that business applications are built around transactions and each transaction will have a script or procedure that interacts with a data store.  It is the simplest of all Domain Logic Patterns and it has no strict inheritance rules other than what makes sense for the application.  It can be implemented as a class with a group of related functions or by using the Command Pattern.  In a web application, this layer takes an input from the UI then it invokes operations from other systems after it has done its own processing.  Ideally a Transaction Script should not reference any Presentation entity.  It makes it modify the code. It is useful for its simplicity but once your application evolves into a complex system, you’ll find that there will be a lot of duplication.

* **Domain Model** (82 - PS6) - “An object model of the domain that incorporates both behavior and data.”  Domain Model is the layer of objects in your application that models the relationship and mimics the behavior of the business you’re working in.  The Domain Model objects can have little to no resemblance to your database tables because mapping the data source to permutations in your application is a difficult task. It is best used if you have a complex application that changes often and you want to quickly modify, test and build your codebase.  A Domain Model can be classified as Simple when it has almost the same entities as your database, or Rich when it has some similarities to your database with lots of GoF patterns.  There is no direct database interaction and it has limited dependency to other layers of your application to promote loose coupling.  Its drawback is also its strength in that having lots of small objects will make it hard for other developers to follow the code execution (specially those with little OOP Pattern exposure), but at the same time a well structured Domain Model will allow you to easily extend your application and test it with little effort. In general it should not have any external dependency.

<p>&nbsp;</p>

### Chapter 10: Data Source Architectural Patterns
How your domain objects interact with your database objects

* **Table Data Gateway** (80 - Barbour) - “An object that acts as a Gateway to a database table. One instance handles all the rows in the table.”  Table Data Gateway wraps CRUD database operations for a table.  If the application is simple enough, it can be implemented as a single class for all the tables, otherwise it’s best to represent each table with 1 class for organization.  A subset of the Gateway pattern for databases, its role is to push data back and forth.  The return value can be a Data Transfer Object (DTO) or the native recordset object specific to the framework, but one must weigh the cost-to-benefit of a DTO before implementation because it can be too much a work with little value.  It works well with the Table Module pattern. 

* **Row Data Gateway** (80 - Barbour) - ”An object that acts as a Gateway to a single record in a data source. There is one instance per row.”  Row Data Gateway wraps a row of database record in a single class with properties that match the table columns and methods that execute CRUD operations.  A Row Data Gateway operations’ should only contain database access logic for isolation and its properties should mirror the database columns to avoid having different object and database representation.  It can be contained inside a Domain Model class as a private member acting as a bridge to the database.  It is tedious to write and it makes a good candidate if a code generation tool like an ORM is involved.  It works well with Transaction Script.

* **Data Mapper** (79 - Serafina) - “A layer of Mappers that moves data between objects and a database while keeping them independent of each other and the mapper itself.”  Data Mapper(s) separates the Domain Model and database objects.  Its main responsibility is transferring data between the 2 layers.  A Data Mapper cannot exist without a Domain Model and its use-case is when you expect your domain and database to evolve independently. Domain Model objects do not know that a database exist and the database objects are ignorant of the Domain Model object that uses it.  It can be implemented using a single class or one class per domain root but it must be used together with a Domain Model.  The benefits of using this pattern are testability and the ability to replace the entire mapper layer to work with a different database.

* **Active Record** (79 - Serafina) - “An object that wraps a row in a database table or view, encapsulates the database access, and adds domain logic on that data.”  This pattern mixes domain and database logic, carrying both data and behavior in a single class.  It is easy to build and understand because your Domain Model and its required database operations are all in one class. Everyone in your team will know how to read and write to your database.  It works well for applications where domain and database have the same schema.  Its drawback is its object and database coupling make it hard to refactor the logic. It has similarities to Row Gateway except that Row Gateway only contains database logic. 

<p>&nbsp;</p>

### Object Relational Behavioral Patterns
Ways to load data from your database

* **Lazy Load** (78 - Missoni) - “An object that doesn’t contain all of the data you need but knows how to get it.”  It defers an object’s initialization until it is needed.  It does it by leaving a marker where the data can be loaded.  This pattern adds a lot of complexity to the code so it should be used only if there is a strong need, typically to improve performance.  It is best used when the data you need requires an extra call but the data isn’t part of the main object the client needs.  The better strategy to follow before using this pattern is to try if all the data you need can be loaded in 1 go.  The pattern can be implemented in 4 ways:
    - Lazy Initialization - object starts as null and data is loaded only when the getter is called.  Best used with Active Record, Table and Row Data Gateways
    - Virtual Proxy - follows the proxy pattern creates an object with the same interface as the real one and only loads the data when one of its methods is called
    - Value Holder - an object that wraps another object and only loads the data when the method that gets the value is called
    - Ghost - real object in partial state or a flyweight, loads the full data when a field that’s not part of the initial state is accessed.

* **Unit of Work** (78 - Missoni) - “Maintains a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems.” A Unit of Work is a class that contains operations that keep track of every database transaction, postponing any changes until an explicit commit is issued.  It marks objects it works with as dirty or clean depending on their sync status with the corresponding database record.  Simply put, it allows in-memory changes to database objects written out at a later time.  With the right code in place, it has natural support for batch updates.  Its use is not limited to databases, any transactional resource like message queues can leverage this technique.  It works well with Identity Map.  Use this when you want to minimize database writes or if you have to deal with concurrency, otherwise it is more work compared to explicit saves every time an object is changed by your application.

* **Identity Map** (74 - Apple) - “Ensures that each object gets loaded only once by keeping every loaded object in a map. Looks up objects using the map when referring to them.”  It addresses concurrency management in a single session by keeping a record of all the database objects that have been read and modified.  Every time a database record is required, you check the Identity Map first before making a remote call. The Identity Map class is also responsible for managing changes to the object to ensures data correctness.  It is optional if you only require read operations but it can be useful if the reads are resource-intensive.  By acting as a cache, it can help improve your application’s performance.

<p>&nbsp;</p>

### Object Relational Structural Patterns
Ways to match and link your objects to an existing database

* **Identity Field** (74 - Apple) - “Saves a database ID field in an object to maintain identity between an in-memory object and a database row.”  It’s a simple ID field matching database records to in-memory objects to easily execute CRUD operations.   Identity fields can be unique to a table or a database.  Its value should be immutable, not subject to human typing errors, and meaningless outside of the database.  Long integer numbers are preferred but GUID’s are good alternatives specially for database unique fields.  An interesting technique in place of automatically-generated incremental ID’s is the creation of a `keys` table containing a column for the table name and the next value.  Before any database write happens, the table is consulted for the Id field.  In the case where there’s a parent-children object structure, you can grab multiple Id’s in 1 go using this approach.   One caveat of using a separate table is that a locking strategy should be in place when a record is fetched to avoid contention on the key.

* **Foreign Key Mapping** (73 - MAPC) - “Maps an association between objects to a foreign key reference between tables.” A full in-memory object is mapped using the foreign key id from the database.  It creates class associations between database tables that have a 1:1 or 1:* mapping

* **Association Table Mapping** (73 - MAPC) - “Saves an association as a table with foreign keys to the tables that are linked by the association.”  This creates a bidirectional 1:* mapping for in-memory objects that use an association table mapping, or depending on the domain it can be represented as its own object instead of an aggregate.  The canonical use for it is database tables with a many-to-many relationship.  The important thing to think about here is the performance of the multi-table queries.  Measure the benefit in optimizing that versus speeding up other slow queries in your application.

* **Dependent Mapping** (73 - MAPC) - “Has one class perform the database mapping for a child class.”  The pattern creates a mapping class that handles reads and writes (specially writes) between the owner and its dependents.  In a class UML diagram, this case is the equivalent of a composition relationship.  On the database side, there should be no table that has a foreign key into the dependent other than the owner.  Recommended use is for awkward situations where dependents have no back pointers to their owner, otherwise I would use this sparingly because of the possible complexity the additional class would bring.  

* **Single Table Inheritance** (72 - RL) - “Represents an inheritance hierarchy of classes as a single table that has columns for all the fields of the various classes.”  A database table where rows can be represented as different classes of the same family.  Any column that does not belong to the classification a row represents is left empty.  This table structure is done to minimize joins but it shouldn’t stop you from creating an abstract inheritance schema for your in-memory objects.

* **Class Table Inheritance** (72 - RL) - “Represents an inheritance hierarchy of classes with one table for each class” A database table (usually a highly normalized one) where a super table (root) - sub table (leaf) relationship exists can be easily modelled using an object inheritance structure.  The parent table is usually responsible for the Id generation and the value cascades to its child tables.  Be aware that this structure can cause a bottleneck on the parent table because it requires frequent access.

* **Concrete Table Inheritance** (72 - RL) - “Represents an inheritance hierarchy of classes with one table per concrete class in the hierarchy.”  One database table has a matching application concrete class while the parent table is ignored.  Compared to the database table of a Class Table Inheritance, the columns of the parent table in this pattern are duplicated in the child tables.  Because there’s a lot of potential for losing data integrity brought by the duplication, it is best used only for tables that are self contained or have limited inheritance structures. 

* **Embedded Value** (71 - St. James) - “Maps an object into several fields of another object’s table.” These are Value Objects that are part of a class which makes sense to contain in your application but wouldn’t qualify as a separate table on its own.  It is useful when a table contains data that you split into more than one object and where the owner class and Embedded value has a 1:1 relationship. Some examples of these are date ranges and money.  

* **Serialized LOB (Large Object)** (71 - St. James) - “Saves a graph of objects by serializing them into a single large object (LOB), which it stores in a database field.”  Data that are least likely to be queried can be stored as a Serialized LOB.  Depending on database support, it can have a data type of a Binary Large Object (BLOB) or a Character Large Object (CLOB). XML and JSON can also be used for modern databases.  From the application’s perspective these are regular objects with methods that support serialization and deserialization. The biggest concern for using this are versioning and structural changes on the application and database objects so it’s best to have some kind of validation when it’s implemented. 

* **Inheritance Mappers** (70 - Laduree) - “A structure to organize database mappers that handle inheritance hierarchies.”  In cases where you need to save and/or load database records that return an abstract class, it is better to create a mapper class for it instead of mixing the code with the concrete classes.  From the concrete abstract mapper class, an association with the concrete mapper class is made where the load and save operations are delegated accordingly.  This minimizes and contains such database operations for specific concrete types while avoiding casting and downcasting objects. 

<p>&nbsp;</p>

### Object Relational Metadata Mapping Patterns

* **Metadata Mapping** (70 - Laduree) - “Holds details of object-relational mapping in metadata.”  This addresses the tedious and repetitive task of object-to-relational mapping.   In general, any tedious task means a process can be improved.  This pattern is accomplished through reflection or code generation where the mapping information is stored in code, in an external resource like XML, or in a metadata database.  The explicitness of code generation is preferred because other developers can easily see what’s going on when debugging.  ORM’s are good examples of this pattern where every model corresponds to a database table and every member to columns.

* **Query Object** (69 - Cartier) - “An object that represents a database query.”  This is the application of the Interpreter Pattern.  It hides SQL statement generation and execution inside parameterized methods using in-memory objects.  Because of its reliance to in-memory objects, it is used only when you have a Domain Model and a Data Mapper.  It is “pretty sophisticated” to put together and you are better off if you can find a commercial product for your needs or if you limit its application to no more than what you actually use

* **Repository** (69 - Cartier) - “Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.” Repository is a layer where query construction is concentrated to minimize query logic duplication.  It shields the Domain layer knowing its data source.  Clients construct query criteria through objects passed on to a Repository class that can satisfy it.  The client does not have any knowledge of SQL commands. Typically a Domain object will have a class association to 1 Repository class.  When used in conjunction with an ORM it promotes a large measure of reusability and the ability to easily substitute your data store with minimal effect on the domain. Together with a Strategy Pattern, you can extend a Repository to more than a database.  It is useful for systems with multiple database schemas or data sources mapped to a domain object. Under the covers, Repository combines Metadata Mapping and Query Object patterns to generate SQL code.

<p>&nbsp;</p>

### Web Presentation Patterns
Generating markup in relation to your domain and application layers

* **Model View Controller** - (68 - MK/Tori) - “Splits user interface interaction into three distinct roles.” MVC is a template applicable to any visual system.  Its value in software design comes from separation of concerns - (1) model from presentation and (2) the view from the controller.  The first separation is obvious while the second shines when you have multiple controllers for a single view.  Fundamentally, Model is an object that is part of the Domain Model layer and Controllers are specifically Input Controllers.

* **Application Controller** (68 - MK/Tori) - “A centralized point for handling screen navigation and the flow of an application.”  An Application Controller is a class with the sole responsibility of identifying the appropriate UI response from the Domain layer for any incoming request. It is useful if you need to have a specific order of page execution as in wizard style pages.  It works by having class references to the Domain classes and UI templates glued together typically through a dictionary object.  When an input request comes in, the dictionary object tries to look up (1) the correct action through a Command pattern class and (2) UI by some naming convention or metadata mapping. 

* **Front Controller** (67 - Nespresso) - “A controller that handles all requests for a Web site.”  Front Controller is a single class in a web application that is responsible for choosing which command to run from a given url.  It is the routing pipeline that most MVC frameworks use, where the middlewares for authentication, session, etc that were loaded in are Decorators of the Front Controller class. Fundamentally, it is an implementation of the Mediator pattern for a web application.  

* **Page Controller** (67 - Nespresso) - “An object that handles a request for a specific page or action on a Web site.”  This creates a 1:1 mapping for an input controller to a web page.  In its purest form, a great example is the existence of code-behind pages for every .NET aspx file.  In an MVC application, a controller can be considered as an implementation of Page Controller.

* **Two Step View** (66 - John Varvatos) - “Turns domain data into HTML in two steps: first by forming some kind of logical page, then rendering the logical page into HTML.”  In a Two Step View, the markup is generated in 2 stages.  The first stage forms the presentation data and every element it needs to render the page.  The second stage then transforms the data into HTML for output.  Although the book uses XML and XSLT as an example for the presentation data, the pattern can also be implemented by using custom tags.  I think the main point here is having an intermediary data structure that multiple presentation layers can use to inject their own UI needs.  With that in mind MVC template engines are good examples because they fit perfectly in the space.

* **Template View** (66 - John Varvatos) - “Renders information into HTML by embedding markers in an HTML page.”  Data-driven HTML pages typically mix static and dynamic content.  As a way to avoid mixing domain logic in your HTML, the pattern recommends having placeholders for anything dynamically created.  Depending on the template engine, a placeholder can take the form of a custom HTML tag, a helper method generating HTML as in the case of filters in jinja, or both.  A common pitfall when structuring a template is the excessive use of programming constructs - specifically IF statements in the HTML, making the template a programming language on its own.  Doing so makes it hard for non-programmers to make changes and it often leads to a knotty mix of domain and presentation logic that is hard to test and debug. You’re better off exploring the use of a helper method first if you find yourself in such a situation. The main goal has to be making the page simple and focused on just the display. 

* **Transform View** - (65 - Alexander McQueen) “A view that processes domain data element by element and transforms it into HTML.”  In this setup a controller returns a data without any formatting or template information.  What it provides instead is the transformation object (XSLT in the book) responsible for generating the markup.  Although outdated because XSLT is seldom used these days and is considered the dominant choice at the time the book was written, its benefit is one can easily swap out or have multiple transformations for the same set of data.

<p>&nbsp;</p>

### Session State Patterns
Session storage strategies in a stateless client-server environment.  

* **Client Session State** (65 - Alexander McQueen) “Stores session state on the client.”  In a web application, one can take advantage of the URL, hidden fields and cookies when storing session state. The main consideration for picking an option are the amount of data to store and its sensitivity.  Security being a major concern, you always have to be wary of what you store on the client.  Tampering can also be a problem that you have to watch out for.  You don’t want users to easily change a session ID and be able to impersonate another user.  All 3 have their limitations and it’s best to use them for non-critical data.

* **Server Session State** (64 - JP Morgan) “Keeps the session state on a server system in a serialized form.”  Session is stored in an application server or a database in a serialized form.  The former is only applicable for single-server architecture and the latter for distributed systems.  The database form also has natural support for clustering and failovers.  It’s Serialized LOB form is what makes it different from the tabular Database Session State.  Simple to implement because serialization and deserialization are readily available to modern languages.

* **Database Session State** (64 - JP Morgan) “Stores session data as committed data in the database.”  Here, sessions are stored as table rows having an identifier marking their “pending” state that also distinguishes it from recorded data.  It can also have a dedicated table that syncs back to the recorded table when work is done.  There are obvious overhead from coding synchronization and I think it is best used only when session information needs to be queried, otherwise Server Session State would suffice most needs.  Similar to Server Session State, it has natural support for clustering and failovers.

<p>&nbsp;</p>

### Distribution Patterns
Making your Domain Model consumable

* **Remote Facade** (63 - Goyard DOTs) - “Provides a coarse-grained facade on fine-grained objects to improve efficiency over a network.”  An implementation of the Facade pattern, it is a layer made up of classes with “coarse” methods that combine “fine” methods for the purpose of minimizing multiple calls to your Domain interface over a network protocol like HTTP.  It does not have any domain logic and it is typical to see functions with a few lines because all it does is delegate to another object.  In technical terms, these functions are considered bulk accessors - where getLocation() is a shorthand for getAddress(), getCity(), and so on.  The use-case for a Remote Facade are common to any UI interaction and Web Service requirements where you often only have little input data but you need to have a more detailed output or you need to execute a series of commands.  In a web service, Remote Facade is the endpoint while the data it returns is the Data Transfer Object.

* **Data Transfer Object** (63 - Goyard DOTs) - “An object that carries data between processes in order to reduce the number of method calls.”  A DTO is a value-like class that holds as many information it can about your domain for the purpose of minimizing remote procedure calls.  It combines data from server objects for transmission knowing that a large payload is better than multiple remote calls.  It can be a subset or a hierarchical representation of your domain that is simple in structure with primitive type values.  Although it may seem applicable to responses, there is no rule that prohibits one from using it on request objects.  Often used together with a Remote Facade, DTO requires having an “assembler” intermediary class between itself and the Domain Layer for data transformation with the benefit of loose-coupling between the 2.  The biggest concern about DTO’s are the Domain object duplication it leads to and as such it is best to be mindful about using this.

<p>&nbsp;</p>

### Offline Concurrency Patterns

Offline because an action requires multiple transactions to complete involving reading and writing data.  dealing with multi-session conflicts is both a domain and a technical issue.  Any employed strategy is dependent on the business you’re in.  Each strategy is not mutually exclusive.

* **Coarse-Grained Lock** (61 - Elicitor at Viand) - “Locks a set of related objects with a single lock.” This is applicable when concurrency is possible for any entity with an object hierarchy - root and aggregates.  The solution is to find the single point of contention typically the root, apply a lock strategy, use that to minimize additional locking logic on the aggregates.  A lock can be a shared optimistic/pessimistic lock or a root lock.  With shared locks, a single version table is referenced by every object in the hierarchy. Locking an aggregate means locking the root and vice-versa.  With root locks, you only maintain a lock on the parent entity but force object navigation for its aggregate to always go to the root.

* **Implicit Lock** (61 - Elicitor at Viand)- “Allows framework or layer supertype code to acquire offline locks.”  This is the encapsulation of the locking logic in a class that a client uses to load and edit a data.  The goal is to factor the code of how locks are generated and validated from the client so that it cannot be skipped because locking logic requires several steps to accomplish and missing one step could mean unintended overwrites.  It is useful for any application dealing with concurrency and should always be part of the solution.

* **Optimistic Offline Lock** (60 - Barneys) - “Prevents conflicts between concurrent business transactions by detecting a conflict and rolling back the transaction.”  In a nutshell, it is conflict detection.  It’s optimistic because it does not lock any row and permits multiple concurrent changes to a record.  It works by validating that a session does not conflict with another before its change is committed.  The most common implementation is by using a version column in a table, then including that field in the update and delete queries.  Any query that does not return a value means a conflict exists. Timestamps are a bad idea because of how varied it is or in the case of using UTC, it adds a conversion rule which isn’t necessary with integers. For a more complicated merge process, it might be worthwhile to predict a conflict before it happens by always checking against the record’s current version. Beware of inconsistent reads where User1 calculates a customer’s NY sales tax but User2 updated the customer’s address to CA.  This is the easiest concurrency strategy to implement and should be considered the default approach.  Source Code Management (SCM) software like svn and git is a great example.

* **Pessimistic Offline Lock** (60 Barneys) - “Prevents conflicts between concurrent business transactions by allowing only one business transaction at a time to access data.”  In a nutshell it is conflict prevention.  It forces a transaction to acquire a read, write, or read/write lock on the data before you start working on it.  This ensures that a task can be completed without worrying about conflicts.  The lock is released after the transaction completes.  The most common implementation is to have a database table that in minimum holds mapping information between lock and user.  This is your lock manager and releasing a lock just means deleting a record.  On the application side, the lock manager is a Singleton.  The strategy is useful when (1)  the chances of contention is high or (2) the cost of conflict is too high regardless of how high or low its occurrence is.  Beware of deadlocks and timeouts.  Deadlocks happen when multiple users need access to multiple resources - firstToRecordUser accessed resource1 and lastToRecordUser accessed resource2.  The easiest thing to do on a deadlock is to throw an exception when lastToRecordUser accesses resource2.  You can leverage an application’s session for timeouts.  Each lock has an expiration that is checked when your application times out.  If possible, you can defer some of the lock management logic to your database using  features such as stored procedures and SELECT FOR UPDATE.  It will help slim down your domain and keep it focused only on business logic.

<p>&nbsp;</p>

### Base Patterns

* **Gateway** (59 - Camper) - “An object that encapsulates access to an external system or resource.”  A Gateway is a simple wrapper class for accessing operations from an external resource or API by hiding their complexities from the whole class library.  Other objects access the resource or API through the Gateway class which in turn translates the method calls into its corresponding API operation.  Other than simplification, it also allows you to easily swap out the external system for another.  Gateway is different from a Facade because it blocks off access to the external system and that it can have a similar (but convenient to use) interface to the external system.  Use this when you have an awkward interface to something that feels external. 

* **Mapper (59 - Camper)** “An object that sets up a communication between two independent objects.”  A mapper is a layer that insulates 2 systems from each other.  It is best for situations where systems cannot be modified or when systems change often that it is essential to limit the dependency between the 2.  The objects that a mapper separates aren’t aware of the mapper.  Neither system should be able to invoke the mapper (only the client) to promote loose coupling. It is similar to Gateway in the sense they separate systems but different because the systems it maps in between are agnostic to each other.

* **Layer Supertype** (57 - Breitling) - “A type that acts as the supertype for all types in its layer.”  It is a base class that holds common methods and properties for its children to inherit.  Having this class minimizes duplication among a group of related classes.

* **Plugin** (57 - Breitling) - “Links classes during configuration rather than compilation.”  Complementary to Separated Interface, Plugin implements a Factory method that relies on a centralized runtime configuration to easily make substitutions on any resource implementation. It works well for languages that support reflection because classes can be instantiated without compile-time dependencies.  

* **Separated Interface** (56 - Trump Plaza)  “Defines an interface in a separate package from its implementation.”  Use this to break dependencies between 2 systems by defining an interface (type) or an abstract class in one package and the implementation on another.  This works well if you have code that needs to run in multiple environments.

* **Registry** (56 - Trump Plaza)  “A well-known object that other objects can use to find common objects and services.”  A singleton class, Registry contains static lookup methods that know how to navigate object hierarchies.  The disadvantages of using Registry are (1) its global nature, (2) adding a new class or subclass requires you to modify it and (3) it hides class dependencies and as such try to use this pattern as a last resort.  The common use-case for it is when you’re passing method parameters that are rarely used and are only applicable to classes that are nested deep in the hierarchy.  You can choose to use this but because of its disadvantages, you’re almost always better off using object references.

* **Record Set** (54 - IWC) - “An in-memory representation of tabular data.”  A Record Set is fundamentally a Unit of Work applicable to relational data stores.  Querying a database yields an object representation of a row (or rows) that can be manipulated and then committed through explicit save methods.  Because of the amount of code one has to write to support a SQL flavor, it is usually vendor or platform provided like in the case of ADO.NET data sets.

* **Money** (54 - IWC) - “Represents a monetary value”   In a multi-currency application, it is best practice to provide a Money class to encapsulate operations involved with handling it.  Its methods handle operations for conversion, addition, or equality and its properties broken down into the numeric amount and the currency.  If you’re not using integers then decimals should be your next choice for accuracy and not floats.  Beware of rounding issues such as when you need to split $5 into 2 accounts, 70% (3.5) into 1 and 25% in another (1.5).  Rounding can make you lose or gain pennies depending on your strategy and you’re better off having an “allocate(0.7m,0.3m)” method. 

* **Special Case** (53 - Rolex) - “A subclass that provides special behavior for particular cases.”  A Special Case class is not limited to null values.  It can represent aspects of your domain that don’t quite fit as a full instance like a UnknownCustomer vs a Customer or in the case of Javascript, the use of NaN which is of type “number”.  Special Case is usually a Flyweight with methods and properties identical to the full instance.  It is valid that a Special case returns another Special Case class when dealing with nested objects.  Null Object pattern is an implementation of Special Case.

* **Service Stub** (53 - Rolex)  - “Removes dependence upon problematic services during testing.”   Also known as a Mock Object is a fake implementation of the real object that can be used as a replacement during testing or when dependence to a particular service hinders your development.  It relies on polymorphic classes, through a Separated Interface in the book, that you pass around instead of a concrete class to make substitution easier and to decouple your dependencies. 

* **Value Object** (52 - New House as valuable object) - “A small simple object, like money or a date range, whose equality isn’t based on identity.”  A Value Object is a class representation of a unit of data in your Domain.  Its properties are treated as a single value and equality test relies on combining all properties or a specific computed value of the class, unlike Reference Objects where equality is usually based on a single field or the class instance as a whole.  Value Objects are similar to a programming language’s primitive types and are represented in a data store as a Embedded Value or a Serialized LOB.  In .NET, struct’s are dedicated data types for Value Objects.

<p>&nbsp;</p>

### Chapter 1 - Layering

* Layers make good places to enforce standardization, but they also lead to cascading changes where adding a field means updating several layers

<p>&nbsp;</p>

### Chapter 5 - Concurrency

* Isolation and Immutability as solutions.  Isolation in an OS works by allocating memory to the process and preventing other processes to have access to the data linked to it.  Thus you don’t need to worry about concurrency.  Isolation leads to immutability.. Because other processes cannot modify the data there is no chance a concurrency problem will occur.
* Business data is difficult to automerge that’s why the concurrency strategies of most SCM’s won’t work
* Software transactions as ACID-
