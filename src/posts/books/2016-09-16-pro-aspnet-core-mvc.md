---
layout: book
title:  "Pro ASP.NET Core MVC 6th Edition"
excerpt: "Pro ASP.NET Core MVC 6th Edition"
date:   2016-09-16
categories: books
book_url: http://www.apress.com/us/book/9781484203989
book_image: /img/book-pro-aspnet-core-350x501.jpg
tags:
  - .net
---

### External Links

* Book:  [http://www.apress.com/us/book/9781484203989](http://www.apress.com/us/book/9781484203989)
* Source:  [https://github.com/Apress/pro-asp.net-core-mvc](https://github.com/Apress/pro-asp.net-core-mvc)
* ASP.NET on a Mac:  [https://docs.microsoft.com/en-us/aspnet/core/tutorials/your-first-mac-aspnet](https://docs.microsoft.com/en-us/aspnet/core/tutorials/your-first-mac-aspnet)
* Multiple Projects on VS Code:    [https://www.codeproject.com/articles/1110660/how-to-open-build-debug-multiple-projects-in-vs-co](https://www.codeproject.com/articles/1110660/how-to-open-build-debug-multiple-projects-in-vs-co)
* Installing EF Core: [https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite](https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite)
* NuGet Package Lookup:  [https://www.nuget.org/](https://www.nuget.org/)
* .NET Core Command Line Interface (CLI) Tools:  [https://docs.microsoft.com/en-us/dotnet/articles/core/tools/](https://docs.microsoft.com/en-us/dotnet/articles/core/tools/) 
* Entity Framework Core: [https://docs.microsoft.com/en-us/ef/core/](https://docs.microsoft.com/en-us/ef/core/)
* ASP.NET Core API Reference  [https://docs.microsoft.com/en-us/aspnet/core/api/](https://docs.microsoft.com/en-us/aspnet/core/api/)
<p></p>
<p></p>
<p></p>

## Part I Introducing ASP.NET Core MVC
<p></p>

#### 1. ASP.NET Core MVC in Context
* ASP.NET Core is extensible - you can use the default implementation, subclass it, or replace/roll out your own by implementing the interfaces and base classes
* ASP.NET Core makes you write your markup or use client UI’s from popular Javascript libraries
* ASP.NET Core can be easily isolated making it highly testable using Unit and UI tools
* ASP.NET Core is cross platform and open source
<p></p>

#### 2. Your First MVC Application
* MVC on a Mac or Ubuntu 16.04
    - Install the [prerequisites](https://www.microsoft.com/net/core#macos)
    - [Use yo](https://docs.microsoft.com/en-us/aspnet/core/tutorials/your-first-mac-aspnet) to create your project files but install the npm libraries locally.  You must be using at least node 6.9.1 to run the application.

```bash
npm install --save-dev yo generator-aspnet bower
./node_modules/.bin/yo aspnet
cd "PROJECT_FOLDER"
dotnet restore
dotnet build #optional, build will also happen when it's run
dotnet run
```

* Inside `project.json`, under `dependencies`, use type `build` if you want your referenced library to be only available in development.  [Full reference for project.json here](https://docs.microsoft.com/en-us/dotnet/articles/core/tools/project-json)
* Basic configuration to create an MVC Application  

```csharp
//Add the .NET libraries in package.json
"Microsoft.AspNetCore.Mvc" : "1.1.0"

//Dependency injection in StartUp.cs > ConfigureServices
services.AddMvc();

//Setup default configuration in Startup.cs > Configure
app.UseMvcWithDefaultRoute();
```

* Add `Microsoft.AspNetCore.Razor.Tools` as a build dependency in your project to have intellisense in views
* There are [tag attribute helpers](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/intro) that can help you wire your markup to the MVC elements
* Whenever possible, use the generated URL’s instead of hard-coding it to allow links to update automatically when switching to a different routing format
<p></p>

#### 3. The MVC Pattern, Projects, and Conventions
* Architectural Patterns other than MVC
    - Smart UI - built of components and event handlers with minimal or no separation of business rules from the GUI interaction
    - Model-View - the Model and UI are connected with the Model containing data access code
    - 3-Tier - consists of the Model, UI and the Data Access Layer
* MVC Variations
    - Model-View-Presenter - The Presenter is in charge of updating the Model and the View.  The View is passive and the rendering logic is handled by the presenter.  It’s main selling point is it makes the presentation layer easier to test.
    - Model-View-ViewModel - Views would have corresponding ‘view models’ that are typically classes that contains properties required for rendering
* Important Folders in an MVC Project
    - /Areas - separates applications
    - /Dependencies - project dependencies
    - /Components - view component classes
    - /Controllers - controller classes
* Conventions to follow
    - Controller classes end with `Controller` like in `HomeController`
    - View files follow the folder path `/Views/ControllerName`
    - Layout files are prefixed with underscore like `/_ViewStart.cshtml`
<p></p>

#### 4. Essential C# Features
* View files are case sensitive
* Null conditional operator - the variable that you’re assigning this to must be nullable as in the `price` variable below

```csharp
string name = p?.Name;
decimal? price = p?.Price;
string sibling = p?.Sibling?.Name; //where Sibling is an object
string printedName = p?.Name ?? "Unknown"; //where ?? is the null coalescing operator
```

* Automatically Implemented Property Initializers - allows values to be set without using the constructor

```csharp
public class MyClass
{
  …
  public string FirstName {get; set;} = "John";
  public string LastName {get;set;} = "Doe";
  //same as private set, read-only but can be changed in the constructor like below
  public string FullName {get;} = "John Doe";

  public MyClass(string fullName)
  {
    FullName = fullName;
  }
}
```

* String interpolation `string message = $"Hello {name}"`, note that the assignment starts with `$` and where `name` is a string variable
* Object initializers `Person p = new Person { First="John", Last="Doe" };`
* Collection initializers `string[] people = new string[] { "Alice", "Bob", "Charlie" }`
* Index initializers in collections

```csharp
Dictionary <string, Person> people = new Dictionary<string, Person>
{
    ["Alice", new Person()],
    ["Bob", new Person()],
    … 
}
```

* When your return value is an `IEnumerable`, you can `yield return` items in a collection and still be a valid return value.  [Example](https://msdn.microsoft.com/en-us/library/9k7k7cf0.aspx)
* In a lambda expresssion, `=>` is read as "goes to"
* A method with a single statement can be written as a lambda expression as in `bool beforeNoon => Hour <= 12`
* The `Task` class represents an asynchronous work in .NET
* When using `async-await`, you treat the result of an asynchronous method as if it were a regular variable return value but still a `Task` instance.

```csharp
public static async Task<long?> GetPageLengthAsync()
{
    HttpClient client = new HttpClient();
    HttpResponseMessage httpResponse = await client.GetAsync("http://google.com");
    return httpResponse.Content.Headers.ContentLength;
}
```

* Use `nameof`to get the string name of a variable, type, or method - [MSDN](https://msdn.microsoft.com/en-us/library/dn986596.aspx)  

```csharpWriteLine(nameof(person.Address.ZipCode)); // prints "ZipCode"```
<p></p>

#### 5. Working with Razor
* Use the `/Views/_ViewImports.cshtml` file to declare namespaces with the `using` statement that will be shared by the view files.  Other directives that can be used are [listed here](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/layout#importing-shared-directives).
* Set your views default layout file inside the `Views/_ViewStart.cshtml` file.  Set `@{Layout = null}` on individual views that you want to disregard the default layout.
* With Razr’s capabilities to manipulate data, it is important to know the distinction that action methods process data while the view formats it.
* Start a literal text with `@:` when inside a Razor expression wrapped in `{}`
<p></p>

#### 6. Working with Visual Studio
* NuGet is used to manage .NET dependencies in `/project.json` while Bower is used for client libraries and is configured in `bower.json`.
* Use the `Start Without Debugging` option from the `Debug` menu in Visual Studio to recompile your class files as soon as an HTTP request comes in.
* Set `app.UseDeveloperExceptionPage();` in `StartUp.cs > Configure()` to enable developer exception pages.
* Use BrowserLink to control how browser(s) refresh your application changes.  Set these lines to enable it

```csharp
//Add the library in project.json
"Microsoft.VisualStudio.Web.BrowserLink.Loader": "14.0.0"

//Enable in StartUp.cs’s Configure method
app.UseBrowserLink();
```

* Enable static file (such as css and javascript) delivery under the `wwwroot` folder

```csharp
//Add the library in project.json
"Microsoft.AspNetCore.StaticFiles": "1.0.0"

//Enable in StartUp.cs’s Configure method
app.UseStaticFiles();
```

#### 7. Unit Testing MVC Applications
* Unit Testing frameworks for MVC Core application  
    - [xUnit](https://xunit.github.io/) - Used by Microsoft Team for ASP.NET  
    - [MSTest](https://msdn.microsoft.com/en-us/library/ms182489.aspx)  
    - [NUnit](https://www.nunit.org/)  

* Mocking frameworks  
    - [Moq](https://github.com/moq/moq4)  
    - [NSubstitue](http://nsubstitute.github.io/)  
    - [FakeItEasy](https://github.com/FakeItEasy/FakeItEasy)  
* Common convention on folder structure for an application with a unit test project using Visual Studio Solution folders

```
  MySolution
    |__ src
          |__ MySolution.Web
    |__ test
          |__ MySolution.Tests
```

* The name of the test method should describe what the test does, e.g. `CanUpdateRecord()`
* The class name of the Unit Test follows the same name as the entity being tested, appended with `Tests`, e.g. `RecordTests`
* The most commonly used assertions in xUnit are `Equal`, `NotEqual`, `True`, `False`, `IsType`, `IsNotType`, `IsNull`, `IsNotNull`, `InRange`, `NotInRange`, `Throws`
* When testing controller methods that require an external dependency, it is useful that you expose an interface rather than a class so that your test suite can create classes that inherit from the interface for mocking data. [See this commit](https://bitbucket.org/gabrielpascua/core-mvc/commits/eed018b41b4d73273ff01d64eb96ba5385ab9fb5)
<p></p>

#### 8. SportsStore: A Real Application
* How to use a json configuration file in the `StartUp.cs` file

```csharp
//public property 
IConfiguration Configuration;  //Microsoft.Extensions.Configuration.IConfiguration

//constructor
//env Microsoft.AspNetCore.Hosting.IHostingEnvironment
public Startup(IHostingEnvironment env)
{
    Configuration = new ConfigurationBuilder()
    .SetBasePath(env.ContentRootPath)
    .AddJsonFile("appsettings.json")        //filename is arbitrary
    .Build();
}

//To extract values
public void ConfigureServices()
{
    //assumig JSON is { "Root": { "Child": "Hello World." } }
    string helloWorld = Configuration["Root:Child"];
}
```

* A `/Models/Infrastructure` folder is used to house application plumbing code that do not belong to any domain like tag helper classes that can be used in the Razr templates
* The arguments for loading classes when calling `@addTagHelper` from `_ViewImports.cshtml` follows the order of Fully Qualified Name, Assembly Name, e.g. `@addTagHelper SampleApp.ProjectFolderForTagHelpers.*, SampleApp`
<p></p>

#### 9. SportsStore: Navigation
* [View components](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/view-components) is [the replacement for partial views](https://blogs.msdn.microsoft.com/laurieatkinson/2016/10/01/build-a-reusable-view-component-in-asp-net-core/).  It has an `InvokeAsync` method that you should implement. It’s best for sections of your page that have dynamic content such as navigational menus, shopping carts, etc… It follows a [specific folder structure](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/view-components#create-the-view-component-razor-view) similar to how templates are for controller actions.

<p></p>

#### 10. Completing the Cart
* The `ShoppingCart` class reads and writes into a in-memory session.  These services are added in the `ConfigureServices()` method of the `Startup` class.

```csharp
// Every `Cart` request checks the session cart first
services.AddScoped<Cart>(sp => SessionCart.GetCart(sp));

// Use the same instance of IHttpContextAccessor throughout the application.  
// This interface is a child property of the SessionCart class
services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
```

* [Other distributed caching implementations](https://github.com/aspnet/Caching/tree/dev/src) at the moment are Redis and Sql Server.  [Distributed caching](https://docs.microsoft.com/en-us/aspnet/core/performance/caching/distributed) provides coherent storage and is independent from web server restarts.
* Redis is the popular option.  It’s different from NoSql databases like MongoDb in that Redis is a key-value store while the rest are document stores.
<p></p>

#### 11. SportsStore: Administration
* The difference between Session Data and `TempData` in MVC are 
    - Values in `TempData` will exist until it is read.  
    - `TempData["KEY"]` can be accessed on your views
<p></p>

#### 12. SportsStore: Security and Deployment
* In EF, Context classes are bridges between your models and the database
* `Add-Migration MIGRATION_NAME -Context DBCONTEXT` to specify the EF database context o on Nuget, or `dotnet ef migrations add MIGRATION_NAME -c DBCONTEXT` using the .NET Core CLI. [More options here](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)
* Error handling code should be static on production environments to limit sharing detailed information publicly. Controller routes should not be decorated with HTTP Verbs so your error handler can catch all the route errors. [Reference](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/error-handling)
<p></p>

#### 13 - Working with Visual Studio Code
* Use `dotnet watch run` to allow compilation on edits
* **Visual Studio Code doesn’t support separate unit test projects** ????
* `dotnet test` to run your tests or `dotnet watch test` to poll. The latter does not work with `dotnet 
watch run`
* [Running multiple projects](http://stufftoddknows.com/2016/07/20/handling-multiple-projects-with-visual-studio-code/)
* [Setting up the .NET Core Debugger](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger.md)
* [Adding EF Migrations to .NET Core](Write blog here)
<p></p>
<p></p>

## Part II ASP.NET Core MVC in Detail
<p></p>

#### 14. Configuring Applications
* Global.asax, FilterConfig.cs, and RouteConfig.cs are gone, in place are Startup.cs and the Program.cs files
* Under the `dependencies` section of project.json, `type: build` means the project requires the dependency during the build process and not at run time.
* Middleware are components added to an application to form the request pipeline and are executed in the order they were written.  They can be added by calling `app.UseMiddleware<CLASS>` in the `Startup.Configure()` method.  Some types of middleware are
    - Content generating like the MVC middleware
    - Short circuiting middleware
    - Request editing middleware
    - Response editing middleware - works by adding as the first middleware then invoking the next and not executing until a Response has been received.  It can be used to inspect an HTTP status code for errors.
* 3 out-of-the-box environment names recognized in a .NET core MVC application `development`, `staging`, `production`.  They are case insensitive.
* Depending on the middleware, some can take a json format argument in its constructor.  the `ILoggerFactory` is a good example `loggerFactory.AddConsole(IConfiguration config)`;
* `Configure{ENVIRONMENT}()` will take precedence over `Configure()`.  The same is true for `Configure{ENVIRONMENT}Services()` and `ConfigureServices()`;
* You can use the `Program.Main -> UseStartup()` method to identify with Startup class to use depending on the environment.  This requires you to have at least 3 Startup classes with their environment names appended to the class name.
<p></p>

#### 15. URL Routing
* Convention-based routing is pattern matching using the Startup file.  Attribute-based routing is decorating controller classes with your preferred routes.  They can be mixed in your MVC application.
* Advanced constraints:

```csharp
// Regular Expressions
app.UseMvc(routes => {
            routes.MapRoute(name: "MyRoute",
                template: "{controller:regex(^H.*)=Home}/{action=Index}/{id?}");
        });

// Numeric Range
template: "{controller=Home}/{action=Index}/{id:range(10,20)?}");

// Combined constraints
template: "{controller=Home}/{action=Index}/{id:alpha:minlength(6)?}");
```

* You can define your own route constraint by implementing `IRouteConstraint`
* In attribute-based routing, a declaration of `[Route("[controller]/MyAction")]` means that the value of `[controller]` is the same name of the controller class where it was declared.
<p></p>

#### 16. Advanced Routing Features
* Use the tag helper to generate outbound links.  This will automatically update links when your routing changes: `<a asp-controller="ControllerName" asp-action="Index">Click Me</a>`.  You can pass additional values by adding an attribute that starts with `asp-route-`, then suffix your key as in `asp-route-id`.
* There’s also the `Url` helper class to easily generate url’s both in your controller and view. It makes sense to use this in the controller, but I prefer the tag helper syntax in the view for readability.
<p></p>

#### 17. Controllers and Actions
* Controllers need not be in the Controllers folder.  As long as it is a public class ending in `Controller`, MVC will find it.
* You can use `[NonController]`, `[NonAction]` and `[Controller]` attributes to overwrite the MVC controller convention
* The `ViewBag` is useful for passing data that isn’t supported by the `ViewResult()` method such as sending string and date objects.
* Use `LocalRedirectionResult` to prevent an open redirection attack where a user supplied url injects a malicious code that [can be used for phishing](https://www.owasp.org/index.php/Unvalidated_Redirects_and_Forwards_Cheat_Sheet) 
* A redirection causes the browser to send a new HTTP request that’s why you lose POST data in a PRG pattern.
<p></p>

#### 18. Dependency Injection

![Integrated DI Container](/img/integrated-mvc-di-container.svg)  

* [Dependency Injection in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection)
* Dependency Injection is a strategy with strong backing from the Dependency Inversion principle to decouple class relationships typically through the use of interfaces.  The main DI elements are (1) a class that takes an interface as a constructor argument and (2) a DI container mapping the abstract to the concrete class.  In the MVC context it requires:
    - A controller with a constructor that accepts an Interface `IFoo` where the dependency is used.  Additional arguments must have default values otherwise compilation will fail
    - A class that implements the interface `public class Foo : IFoo ...`
    - The built in DI or Inversion of Control (IoC) containers in the Startup `ConfigureServices()` method that maps the interface to a concrete class, `services.AddTransient<IFoo, Foo>()`
* Service lifetimes:
    - `AddTransient` is always new
    - `AddScoped` is the same within a request
    - `AddSingleton` is the same throughout the application lifetime
* The other advantage of DI apart from loose coupling is interface implementation can be swapped with minimal code impact.  The same swappable property allows dependencies to be mocked easily when writing tests.
* You can use DI for concrete types.  Doing so automatically resolves interfaces in the class as long as it’s provided in the services collection and makes it available in your controller, e.g. `services.AddTransient<Bar>();` .  This can possibly be useful for base controller classes.
* Consider using a middleware if you have functionality in your pipeline that does not depend on the MVC framework
* Other useful DI techniques
    - Controller Action DI  
      `public ViewResult Index([FromServices]Bar bar)`
    - Controller Property DI by using any of these data annotation attributes  
      `[ControllerContext|ActionContext|ViewContext|ViewComponentContext|ViewDataDictionary]`
    - Manual lookup  
      `IRepository repository = HttpContext.RequestServices.GetService<IRepository>()`
* 3rd Party DI Packages:
    - [Autofac](https://autofac.org/)
    - [StructureMap](http://structuremap.github.io/)
<p></p>

#### 19. Filters
* Filters are attributes you can apply to a controller or its action that are its own class.  It abstracts code that would otherwise end up in your controller.  Example built-in filters are `[RequireHttps]`, `[HttpPost]`
* Depending on which filter interface you’re implementing , the order of execution for filters is Authorization `[IAuthorizationFilter | IAsyncAuthorizationFilter]`, Action `[IActionFilter | IAsyncActionFilter]`, then Result `[IResultFilter | IAsyncResultFilter]` filters.  An Exception filter is thrown on error.  If multiple filters of the same interface inheritance exists, then the order is based on scope - global first, then controller, then action-scoped last.
* Exception filters are great for errors that you can handle because it abstracts the `try..catch` block away from your controller’s action method.
* There’s also `[TypeFilter]` and `[ServiceFilter]` that you can use when writing your own filters.  The former is for basic custom filters and the latter if you want to streamline the lifetime of your filter.
<p></p>

#### 20. API Controllers
* You can structure your API controller routes by decorating your actions with `[HttpGet("id")]` attributes.

```csharp
// Assuming the controller has a base route of /api

// GET: /api/123
[HttpGet("{id}")]
public string GetById(int id) => "Id = " + id;
```

* JSON is the default return format for objects but you can use the `Microsoft.AspNetCore.Mvc.Formatters.Xml` to serve xml negotiated content.

```csharp
// project.json -> dependencies section
"Microsoft.AspNetCore.Mvc.Formatters.Xml" : "1.1.1"

// Startup.cs -> configureServices()
services.AddMvc().AddXmlDataContractSerializerFormatters();

// Sample controller action - no changes necessary
public object GetById(int id) => new object();

// XML Negotiated GET Request using PowerShell
Invoke-WebRequest `
    http://localhost:7000/api/content/object `
    -Headers @{Accept = "application/xml"} | `
    select @{n='Content-Type';e={ $_.Headers."Content-Type" }}, `
    Content
```

* Other useful Controller action attributes you can use to control your routing:
    - `[FormatFilter]` to inspect the url for a specific string format value
    - `[Produces("applicatiion/json", "application/xml")]` to whitelist supported content
    - `[Consumes("application/json")]` to restrict submitted data.  Use this together with a non-HttpGet attribute and - `public string TestMyClass([FromBody] MyClass myClassInstance)` method argument.
* The following options will allow you to return a 406 - Not Acceptable response to the client if the application does not support the requested content type

```csharp
// Startup.cs -> ConfigureServices()
services.AddMvc().AddMvcOptions(opts => {
  opts.RespectBrowserAcceptHeader = true;
  opts.ReturnHttpNotAcceptable = true;
});

```

* [Using filters to validate your model in an API](https://msdn.microsoft.com/en-us/magazine/mt767699.aspx)
* [API versioning using filters](http://www.hanselman.com/blog/ASPNETCoreRESTfulWebAPIVersioningMadeEasy.aspx)
<p></p>

#### 21. Views
* Razr can mix C# class constructs and HTML in a .cshtml file by compiling it into a class then injecting the markup as a text strings.
* Razr views inherit from `RazorPage<T>` that’s why it knows how to map the `@model` directive.
* You can use strongly typed partial views by passing the model when rendering it, e.g. `@Html.Partial("filename", MODELCLASS)`.
* Implement `ExpandViewLocations` to tell Razr where to look for views
<p></p>

#### 22. View Components
* The scenario that View Components address is to create fragments of reusable code that are independent from the parent view.  Partials take their view models from the parent template, but Components can be inserted anywhere with no dependency required.
* You create view components by
    - Appending `ViewComponent` to a class and implementing an `Invoke()` (which is async) method.  You then call it from your template as `@await Component.InvokeAsync("COMPONENT_NAME[ViewComponent]")`;
    - Creating a class that inherits from `ViewComponent` then implementing an Invoke() method that returns a `IViewComponentResult`.  MVC will look for your template file under the `/Views/[CONTROLLER]/Components/CLASS_NAME/` or `/Views/Shared/Components/CLASS_NAME/` folders.
<p></p>

#### 23. Understanding Tag Helpers
* Tag helpers try to make it easy to assign markup attributes which was awkward using Html Helpers like in the case of Bootstrap `@Html.TextBoxFor(m => m.Population, new { @class = "form-control" })`;
* You create your own tag helper by inheriting from `TagHelper` and overriding the `public override Process(TagHelperContext context, TagHelperOutput output)` method.  You can limit its scope by decorating it with this attribute `[HtmlTargetElement("HTMLELEMENT", Attributes = "COMMASEPARATED", ParentTag = "")]`.
<p></p>

#### 24. Using the Form Tag Helpers
* Details on anti-CSRF are discussed in this chapter
* For the most part you can use the Form tag helper `asp-for` on any form related tag when specially when your view is strictly bound to a model.
* When working with the `<select>` tag, the author advises using the `SelectList` object when data is sourced from an enumeration. 
* [Form Tag Helpers](https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/FormTagHelper.cs) 
<p></p>

#### 25. Using the Other Built-in Tag Helpers
* Custom tags available     
    - `<environment names="DEVELOPMENT[,STAGING,PRODUCTION]">...</environment>` that you can use in your view to render environment specific markup
    - `<cache>` to specify and control cached content on your view
* [Globbing Patterns](https://en.wikipedia.org/wiki/Glob_(programming) you can use when using the tag helper `asp-src-include` on `<script>` and `<link>` tags.
* [Anchor Tag Helpers](https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/AnchorTagHelper.cs)
* [Image Tag Helpers](https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNetCore.Mvc.TagHelpers/ImageTagHelper.cs)
<p></p>

#### 26. Model Binding
* Model binding in MVC uses underscore (_) on the `id` attribute and a period (.) on the `name` to separate nested class/object structure.
* There’s a`[BindNever]` attribute that you can use to ignore a specific model attribute
* Arrays for simple types, are handled by creating multiple input markup with the same `id` and `name` attribute.  Arrays of complex types are rendered with prefixed numeric indexes e.g. `<input name="[0].City" class="form-control" />`.
* For a url like `/Home/Index/3?id=1`, you can add any of these attributes on your action argument to specify the binding source:
    - `public IActionResult Index([FromForm] int? id)` = the value of an input element with the `name` attribute
    - `public IActionResult Index([FromRoute] int? id)` = 3
    - `public IActionResult Index([FromQuery] int? id)` = 1
    - `public IActionResult Index([FromHeader(Name="id")] int? id)` = null
<p></p>

#### 27. Model Validation
* You’ll work with the `ModelState` object for validation.  The status can be `Unvalidated|Valid|Invalid|Skipped`.  You can also use the `GetValidationState("KEY")` to check the validity of a specific property.
* You can create your validation attribute by creating a class that ends with `Attribute` (convention) and inheriting from the `Attribute, IModelValidator` objects e,g. `public class MyValidation : Attribute, IModelValidator ...`
<p></p>

#### 28. Getting Started with Identity
* Extend the `IdentityUser` class if you want to customize your application’s User class* [Setting up Entity Framework 
Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity)
* Implement `Microsofft.AspNetCore.Identity.IPasswordValidator<T>` for custom password validation, then enable it on your `Startup.cs > ConfigureServices` by calling `services.AddTransient<IPasswordValidator<USER_CLASS>, CUSTOMPASSWORD_VALIDATOR>();` or for simple tasks inherit the class `PasswordValidator<USER_CLASS>`.  For User details there are `IUserValidator` and `UserValidator` classes that you can implement or inherit.
<p></p>

#### 29. Applying ASP.NET Core Identity
* The `Authorize` attribute can be used to check for usernames.  It isn’t recommended but is available for maybe when one needs a superadmin.
* Set the login path for your application using `services.AddIdentity<IdentityUser, IdentityRole>(opts =>{opts.Cookies.ApplicationCookie.LoginPath = "/admin/login";})` inside your start up file.
<p></p>

#### 30. Advanced ASP.NET Core Identity
* Customizing Identity requires the following where `Account` is your own Identity class:
    - Startup.cs file `services.AddIdentity<Account, IdentityRole>( … )`
    - Application DbContext `public class ApplicationDbContext : IdentityDbContext<Account>`
    - `dotnet ef migrations add MIGRATION_NAME`
* [Change the Primary key type](https://medium.com/@goodealsnow/asp-net-core-identity-3-0-6018fc151b4#.me8lu9utm)
* A claim is any property the user has that can be used to authorize his request.  .NET Core Identity has its own built in set of claims but you can set your own or derive it from an external authentication.
* Role based authentication tends to get out of control over time - user roles pile up the longer they work on an application. Claims based on the other hand allows you to have fine-grained control over a multitude of Identity properties (including roles) you can use in combination to authorize a user.
* Claims work in conjunction with Policies.  Once you have it setup in your Startup file, you can then use the `Authorize` attribute to decorate your controller (to cover all actions) or your controller action for specificity.

```csharp
//Startup.cs
public void ConfigureServices(IServiceCollection services) 
{
    services.AddAuthorization(opts => {
        opts.AddPolicy("DCUsers", policy => {
            policy.RequireRole("Users");
            policy.RequireClaim(ClaimTypes.StateOrProvince, "DC");
        });
    });  
}

//Controller
[Authorize(Policy = "DCUsers")]
public IActionResult Index() => { ... }
```

* [Custom Policy Based Requirements](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies)
<p></p>

#### 31. Model Conventions and Action Constraints
* You can use the `[ActionName("NAME")]` to use a different route action from the public method
* There’s a custom attribute created that will allow you to prepend string to your action routes as in `[ActionNamePrefix("Do")]`.
