---
layout: book
title:  "Modern Web Development"
excerpt: "Understanding domains, technologies, and user experience"
date:   2016-03-02
categories: books
book_url: https://www.microsoftpressstore.com/store/modern-web-development-understanding-domains-technologies-9781509300013
book_image: /img/book-modern-web-development-360x433.jpg
tags: .net
---

### Chapter 1. Conducting a thorough domain analysis
* Domain Driven Design is design based on the thorough analysis of a business.  It doesn't rely on any technology or services to achieve its goals but on understanding the core of the business so developers can find the best tools to build the application.
* DDD focuses on mirroring the business instead of accurate modelling because it makes the architecture easy to manage by making it direct to the point. 
* DDD doesn't require an object model to accomplish its goals.  It is one way to do it but you could write it in a functional language and still adhere to its principles.
* Database (and APIs, ORMs) should always be a consideration unless you intend to write a fully agnostic object model where you separate your business objects from persistence objects and use adapters to switch.
* DDD has 2 parts - tactical and strategic design. Strategic Design are the practices for analyzing the domain and Tactical Design is its concrete implementation.
* Analysis patterns to aid in Strategic Design of a system:
1. Ubiquitous Language - in DDD is a glossary of terms used in a particular domain that emerge from meetings and interviews with stakeholders.  It solves the ambiguity problem between domain experts and developers by establishing semantics that both can understand.
2. Bounded Context - Domains can be split into subdomains when a process becomes too complex to be part of the overall architecture.  Subdomains typically reflect business department functions (accounting, marketing, delivery) or a workflow process (checkout, logging).   These subdomains are the bounded context of a system - areas that are independent but at the same time can interface with other subdomains or the larger system.  Each bounded context can have a different architectural pattern.
3. Context Mapping - a diagram of the relationships between bounded contexts of the system you are designing
<p></p>

### Chapter 2. Selecting the supporting architecture
  *  Business logic should be the primary reason on what software model to use.  It has 2 parts - the application logic (implementation of workflows triggered by public endpoints) and domain logic (business rules as described by stakeholders).  The application logic sits between a public endpoint and the domain logic. It focuses on how to get information while the latter on how to use what was gathered.
  * **Patterns for organizing business logic:**
    - Transaction Script - each step in a workflow has its own subroutine that needs to be carried out from start to finish, e.g. `groupOrder(..)` > `calculateTax(...)` > `calculateShipping(...)`.
    - Table Module - system logic is related to persistence suggesting having 1 model for each primary database table.
    - Domain Model - creating classes that represents behaviors and processes of a domain where business rules are embedded inside the classes.  Classes are database agnostic.
  * Single Object Model - is a DDD supporting architecture (design approach) to build the domain.
    - An object oriented domain model reflects real business processes by way of classes.  From a development side these classes can either be entity or value types.  Entity types represents a business element like an Order or a Customer and its methods are used to define workflows and not database persistence.  Value types are immutable units that serve to group related values like a `struct`.
    - You can organize your domain model by using aggregates.  Aggregate objects are classes that group properties and behavior with publicly accessible interfaces.  Each aggregate forms the boundary of what an entity can and cannot do.  For example an Order aggregate can have an OrderItem that cannot be accessed by a Product aggregate without going through Order.  Aggregates promote encapsulation, consistency, and minimizes the number of classes that an application can use.
    - Domain services are part of the domain layer to handle tasks that don't fit in the domain model.  These tasks include dealing with external systems, databases, or cross entity business logic.  Repository classes are good examples of domain services, e.g. `OrderRepository` for the `Order` class.
  * Command and Query Responsibility Segregation (CQRS) - Beyond database transactions Single Object Model is not flexible enough and can be more of a problem than a solution.  CRQS is an improvement of the Command and Query Separation (CQS) Principle where every action must be written as a Command if it changes state or a Query if it reads data.  
- In CQRS your Domain Model exists only on the Command stack.  The Query stack uses data-transfer objects (DTO) to surface data onto the presentation layer.  
    **DDD Architecture**:  
    `Presentation ← → Application ← → Domain ← → Infrastructure`  
    **CQRS Architecture**:  
    `Presentation → Application → Domain → Infrastructure → DTO → Presentation`  
    - CQRS is devised primarily for highly concurrent business where heavy reads and writes can occur
    - CQRS lowers the level of skills required to implement a sophisticated system making scalability and cleanliness an affordable effort.
    - CQRS can be implemented using a single database shared by both Command and Query or as distinct databases where synchronization happens periodically  
        `Presentation/App (P/A) ← → Read/Write DB`  
        `P/A → Write DB ; Read DB → P/A`
    - An example implementation having 2 `DBContext` in Entity Framework for Command and Query
```
        
        public class CommandDatabase : DbContext
        {
            …
            public DbSet<Order> Orders {get; private set}
            public DbSet<Customer> Customers {get;private set}
            …
        }

        public class ReadDatabase : DbContext
        {
            …
            //IQueryable has no access to methods that save changes
            public IQueryable<Order> Orders {return _orders;}
            public IQueryable<Customer> Customers {return _customers;}
            …
        }
        …
```
* Message-based formulation as a form of CQRS relies on having a command processor (typically a bus) class to facilitate communication between your application and its supporting layers.  In this design inputs transformed into commands (as specific types of messages) are pushed to the command processor that diverts it to the correct domain layer.  In an MVC architecture the command processor is the same as your controller action.  
    - Events or notifications is a natural requirement of this design because they tell other handlers that a command has been executed.  The naming convention of event classes should include what just happened, e.g. `PaymentCompleted`, `OrderCreated`, etc..  
    - A typical command processor would have a collection of listeners and message handlers which can either be a saga (long running task) or a handler (one-off execution per message).
- Taking a step further is Event Sourcing where a sequence of recorded events become your data store.  In this design, events are immutable (append only), can be played back (replay), replicated and manipulated any number of times, and naturally performs an audit log. NoSQL databases are the preferred persistence.  Banking, insurance and finance are the sectors that use ES to track their activity.
<p></p>

### Chapter 3. UX-driven design
* Clients that have specific UI in their minds perceive it as the whole system.  If we can present a UI that’s close to what they expect, chances of rework are reduced.
* UX refers to emotions, behaviors, and interactions the user goes through when using a product.
* UXDD is a top down approach where your initial steps are focused on the presentation layer - building wireframes, mocks, storyboards, planning the UX. The last step is building the backend that is agnostic from your UI.
* List of UX development tools
    - [Axure](https://www.axure.com/)
    - [Balsamiq](https://balsamiq.com/)
    - [UXPin](https://www.uxpin.com/) 
    - [JustInMind](https://www.justinmind.com/) 
    - [Indigo Studio](http://www.infragistics.com/products/indigo-studio) 
    - [Wirify](https://www.wirify.com/)
* End users value the UX and speed of the product over its underlying architecture.  Simply put, the success of a software relies on its ability to perform business tasks quickly.
* MVC, MVP, and MVVM are all patterns for the presentation layer
<p></p>

### Chapter 4. Architectural options for a web solution
* ASP.NET Core does not depend on `system.web` or IIS.  It is a cross-platform environment.  You can run it on top of .NET 4.5.2 or .NET Core frameworks.
* ASP.NET Core uses the new .NET Execution Environment (DNX) and only supports MVC (no WebForms)
* ASP.NET Web forms shielded developers from HTML, CSS and Javascript.  ASP.NET MVC did the opposite by giving developers more control of the markup.  This paradigm better caters to today’s development needs with the proliferation of CSS and Javascript.
* ASP.NET Web API is the replacement for WCF.  In ASP.NET Core, it is part of the ASP.NET MVC API.
<p></p>

### Chapter 5. The layered architecture
![DDD vs N-Tier](/img/3tier-vs-ddd.svg)
* The 3-tier architecture introduces a lot of uncertainty on how to structure business logic.  It assumes that an application is running on a single database.  A Layered Architecture on the other hand splits the Business layer into Application and Domain to clear out the gray areas.
    - The Presentation layer funnels the data to the rest of the system. It defines the boundaries of acceptable data.  It consists of input models that group data when a command is posted, and a view model that represents the application’s response.
    - The Application Layer is the entry point in the back end of the system.  It abstracts business processes from user inputs and performs the necessary data transformation the back end understands.  It has an almost 1:1 mapping of methods to the use-cases of the Presentation Layer.  The difference between Application and Domain logic when we cash checks in a baking system is the former represents the user’s transaction with the teller or an ATM machine and the latter the process of taking money from one account and transferring it to another.
    - The Domain Layer is where you implement business rules and processes.  It consists of domain models and domain services. Domain models are different from persistence models although both can match.  Domain models focus on logic and business rules.  Domain service is a class that can perform reusable tasks related to the business logic.  Domain services have free access to the infrastructure layer.
    - The Infrastructure Layer is anything related to concrete technologies - ORM, API’s, Logging, etc.. It is made up of repository classes that know how to read and write data.
<p></p>

### Chapter 6. ASP.NET state of the art
* ASP.NET is feature complete. The last major update was ASP.NET MVC.
* ASP.NET at the time it was built was assumed to run on a single server architecture.  The cloud model these days is different from that especially with the pay for what you use model and the ability to spin up server instances by demand.
* ASP.NET Core is a rewrite of Microsoft's web stack. It is cloud optimized to generate a small footprint and to speed up execution time.
<p></p>

### Chapter 7. Whys, wherefores, and technical aspects of ASP.NET Core 1.0
* There is no Javascript framework that can spur innovation in the current state of web development.  The author thinks the future of web development is about performance which is how he sums up changes in HTTP/2.
* A `system.web` architecture in ASP.NET has a peak memory consumption of 100KB.  The memory footprint of the entire Microsoft .NET framework is in the order of 200MB.
* Because there's a learning curve required when moving to ASP.NET Core, your considerations for migrating should come from your hosting solution (cloud or in-house) and performance requirements.
* ASP.NET Core applications do not rely on `system.web` nor IIS.  Its programming model is based on ASP.NET MVC.
* Areas with significant changes but are concept-compatible:
  - Application startup
  - Storage of global application settings
  - Authentication
  - HTTP request pipeline (middleware)
  - Data access (either EF6, EFCore, or newer)
<p></p>

### Chapter 8. Core of ASP.NET MVC
* **Routing**
    - Routes are loosely REST-oriented but it is up to you how to implement your resources and actions
    - Beware of trailing slash, `/orders/year` is different from `/orders/year/`
    - Use constraints when you can.  It wouldn’t catch every invalid url parameter but it’ll save you a good deal of work
    - By default URL’s pointing to a physical file is ignored.  You can change this inside your `global.asax.cs` file by setting `routes.RouteExistingFiles = true;`.
    - `{*pathInfo}` in `routes.IgnoreRoute("{resource}.axd/{*pathInfo}");` means that anything `*` after `.axd` in a URL should be assigned to the `pathInfo` variable.
    - Use attribute-based routing in large applications when classic routing gets large
        <pre>
        
        [Route("info/[controller]")]
        public class NewsController : Controller {
            [HttpGet("{id}")]  //will map to /info/news/{id}
            Public ActionResult Get(int id){}
        }
        </pre>
* **Controllers**
    - Delicate part of the design. Just because you’re application is ASP.NET MVC doesn’t mean you’re getting a great layered architecture
    - In a cloud-based architecture, making a controller dependent on state reduces the scalability of an application
    - An ideal way to build controller classes is to put all the orchestration logic into distinct application layer classes keeping your controllers as thin as possible. By doing so you transfer testing to the application layer class, making testing for controllers optional.
    - Use `[NonAction]` attribute to hide a `public` controller action.  A possible use case for this is when your route must be case sensitive
    - Use `[ActionName(“action”)]` attribute to separate a GET and POST action
    - `Request.Params["today"]` and `Request["today"]` are the same
    - Use `IList` as a route parameter when expecting a collection, e.g. `public ActionResult EmailsForPost(IList<string> emails)`.
    - `async` controller actions are beneficial for long-running requests.  It prevents locking ASP.NET threads and not to make the method run faster.
        <pre>

        public async Task<ActionResult> Rss()
        {
            …
            var rss = await generateRss();
            return rss;
        }

        </pre>
* **View**
    - Anything prefixed with `@` can process C# or VB expressions
<p></p>

### Chapter 9. Core of Bootstrap


### Chapter 10. Organizing the ASP.NET (Core) MVC project
* Visual Studio Layered Architecture Solution Structure
    - YourApp.Server
    - YourApp.QueryStack
    - YourApp.CommandStack
    - YourApp.CommandStack.Domain
    - YourApp.Infrastructure
    - YourApp.Infrastructure.Persistence
* In a multi-tenant application, every controller action requires work to get the tenant details and is a good use case to put all the work in a base controller class
* `Configure` is where you put your routes and `ConfigureServices` your middleware
* One way to keep your Controller actions lean is by using *worker service* classes.  These classes are usually mapped 1:1 with a Controller and its action to help orchestrate the workflow.
* Typical application models you deal with are 
    - Input models - classes for data passed to controllers, resides in the MVC Project
    - View models - classes for rendering, resides in the MVC Project
    - Domain models - classes for business logic
    - Persistence models - ORM classes (can coincide with Domain)
* You can write your own view engine that inherits from `RazorViewEngine` e.g. `MyViewEngine:RazorViewEngine`  if you need to locate views from a different location than usual.
* A better way to handle controller action errors is by overriding the `OnException` method from the `Controller` class.  You can also have a `HandleError` attribute to specify the view that should handle a specific error type.  Note that you need to have `<customErrors mode=”On” />` to use the `HandleError` attribute.
* It’s a *good security practice* to set a `defaultRedirect` value on your `<customErrors />` to [prevent a hacker from distinguishing between the different types of errors that occur on a server](https://weblogs.asp.net/scottgu/important-asp-net-security-vulnerability). 
* An alternative to log4net is [ELMAH](http://docs.elmah.io/logging-to-elmah-io-from-elmah/) 
* Microsoft’s ASP.NET Identity is the de-facto standard for authenticating users
<p></p>

### Chapter 11. Presenting data
* A View Model is a plain Data Transfer Object (DTO)
* It is recommended to create a base class for your View Model for common elements required such as the page’s Title, Metadata, Menus, etc..  When working with multiple layouts, you’re better off creating a second layer of base view model classes e.g. `public class FrontEndModelBase : ViewModelBase{...}` and `public class AdminModelBase : ViewModelBase{...}`
* Explore NuGet for existing paging plugins instead of rolling out your own
<p></p>

### Chapter 12. Editing data
* To address loss of data on a POST-Redirect-GET pattern on a cloud architecture, the common approach is to [use cookies that expire as soon as they’re issued](http://stackoverflow.com/questions/28351198/implementing-itempdataprovider-vs-using-cookies) 
* Cross property validation requires you to have a global attribute at the class level for a `CustomValidation` and resort to `ValidationSummary` to display the error.
    <pre>

    [CustomValidation(typeof(CountryInputModel), "Validate")]
    public class CountryInputModel : ViewModelBase { … }

    public static ValidationResult Validate(CountryInputModel data, ValidationContext context)
    {
        if (data.Continent == Continent.Unknown && !data.Name.IsNullOrWhitespace())
            return new ValidationResult("Must indicate a continent.");
        return ValidationResult.Success;
    }
    </pre>
* An idea to handle POST responses to the template is to create a DTO class that has a `Success` and `Message` properties that you aggregate in your `ViewModelBase` class.  On the templating side, you can create a partial that you can re-use throughout your pages.
<p></p>

### Chapter 13. Persistence and modeling
* RDBMS used to be the foundation of applications and having a single domain and data model made sense.  Infrastructure changes nowadays make RDBMS as only a part (if not half) of an infrastructure requirement making the need for a separate Persistence model important.
* Input and View models are also recommended to be separated although classes can be recycled.
* The persistence layer is traditionally built on Repository Pattern where each repository class provides methods for reading and writing to a data store using  one specific technology such as Entity Framework or ADO.NET.
* Regardless of pattern the most important thing to do is isolate your data access logic so it can easily be swapped out with a different technology.
* Data Access API’s go into the repository classes
* Repository classes must have read and write methods
* Sample Order Repository Class using Entity Framework’s `DbContext`
    <pre>

    public class OrderRepository : IOrderRepository
    {
        protected ApplicationDbContext _database;
        public OrderRepository()
        {
            _database = new ApplicationDbContext();
        }

        public void Save(Order order)
        {
            _database.Orders.Add(order);
        }

        public void Commit()
        {
            _database.SaveChanges();
        }
    }
    </pre>
* Today having a polyglot (multiple technology) persistence is a common scenario where you have a relational database and a NoSQL database in a single application.  The benefit of a heterogenous storage architecture is to maximize performance at every stack at the cost of having a diverse set of skill on your personnel.
<p></p>

### Chapter 14. Creating more interactive views
* Serialization using `JavascriptSerializer`
    <pre>

    var serializer = new JavaScriptSerializer {MaxJsonLength = Int32.MaxValue};
    var result = new ContentResult
    {
        Content = serializer.Serialize(model),
        ContentType = "application/json"
    };
    </pre>
* JSONP works by returning JSON data in your controller wrapped in a function, e.g. `functionName(JSONData)`.  Sample `JSONPResult` that inherits from `JsonResult`
    <pre>

    public class JsonpResult : JsonResult
    {
        private const String JsonpCallbackName = "callback";


        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");


            if ((JsonRequestBehavior == JsonRequestBehavior.DenyGet) &&
                String.Equals(context.HttpContext.Request.HttpMethod, "GET"))
                throw new InvalidOperationException();


            var response = context.HttpContext.Response;
            if (!String.IsNullOrEmpty(ContentType))
                response.ContentType = ContentType;
            else
                response.ContentType = "application/json";
            if (ContentEncoding != null)
    response.ContentEncoding = this.ContentEncoding;


            if (Data != null)
            {
                var serializer = new JavaScriptSerializer();
                var buffer = String.Format("{0}({1})", JsonpCallbackName, serializer.Serialize(Data));
                response.Write(buffer);
            }
        }
    }
    </pre>
* An alternative to JSONP is to check the request’s `Origin` header and return a response header `Access-Control-Allow-Origin` if it is a recognized host
    <pre>

        var origin = Request.Headers["Origin"];
        if (String.IsNullOrWhiteSpace(origin) return;
        
        if (Request.IsLocal || IsKnownOrigin(origin))
        {
            Response.AddHeader("Access-Control-Allow-Origin", origin);
        }
    </pre>
* The Web API is a dedicated and lightweight framework for dealing with HTTP services.  It’s not to say that WCF is dead because it is still useful for non-HTTP protocols.  Web API has a different runtime environment from ASP.NET MVC to allow non MVC appliations (WebForms) to use it.  It also can be hosted anywhere and not just IIS.
*  If you’re planning to authenticate an API request using Basic Authentication, make sure it is over HTTPS
* In Web API you enable CORS in the global.asax file by calling `config.EnableCors()` in the `Register()` method and you disable it on a controller action by adding the `DisableCors` attribute.
* Look at [mustache](https://mustache.github.io/) or [knockout](http://knockoutjs.com/) for additional front end templating instead of just concatenating HTML
* Look at ASP.NET SignalR for push notifications from the server to the client together with its jquery library.  You can also have a progress bar implementation using it or a listener to update your DOM when a modal form submits a POST.
<p></p>

### Chapter 15. Pros and cons of responsive design
* CSS Media Queries Level 4 Standard will have `pointer` and `hover` properties to help determine non-desktop devices
* Responsive Web Design’s “serve any (device) and ignore all (browser characteristics)” principles face the paradox of potentially serving a lot of content that the user needs.
<p></p>

### Chapter 16. Making websites mobile-friendly
* Free client-side and server-side (nuget) solution to [sniff user agent strings](https://web.wurfl.io/#wurfl-js)
* [ImageEngine](http://image-engine.com/) to resize images