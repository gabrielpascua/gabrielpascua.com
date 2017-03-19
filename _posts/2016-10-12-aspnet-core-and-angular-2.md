---
layout: book
title:  "ASP.NET Core and Angular 2"
excerpt: "ASP.NET Core and Angular 2"
date:   2016-10-12
categories: books
book_url: https://www.packtpub.com/application-development/aspnet-core-and-angular-2
book_image: /img/book-aspnet-core-and-angular-360x450.jpg
tags: .net
---

### Chapter 1. Getting Ready
* .NET Compiler Platform is named Roslyn, runtime is CoreCLR, and JIT compiler is RyuJIT
* ASP.NET 5 is ASP.NET Core to emphasize that the framework is a complete rewrite
* Web applications nowadays can either be 1 or a hybrid of the 3:
    - Multi-Page Application (MPA) or Native Web Application (NWA) using traditional page refresh to load content and url generation
    - Single Page Application (SPA) using AJAX techniques to load content and url state manipulation for routing
    - Progressive Web App which can be an MPA or SPA but with added focus on mobile users
* [npm package.json reference](https://docs.npmjs.com/files/package.json)
<p></p>

### Chapter 2. ASP.NET Controllers and Server-Side Routes
* MVC seems to be moving forward with attribute-based handling of requests in controllers than convention-based code.  It’s personally a good thing because it abstracts a lot of boilerplate code one has to write.
* [C# Preprocessor Directives](https://msdn.microsoft.com/en-us/library/ed8yd1ha.aspx)
* [Recommended Tags for Documentation Comments](https://msdn.microsoft.com/en-us/library/5ast78ax.aspx) 
* Some mocking frameworks: Moq, NMock3, NSubstitute, or Rhino
<p></p>

### Chapter 3. Angular 2 Components and Client-Side Routing
* When using a client-side routing that implements `pushState()`, you can handle the server side routing when one refreshes the browser by [creating a rewrite rule](https://www.iis.net/learn/extensions/url-rewrite-module/creating-rewrite-rules-for-the-url-rewrite-module) inside your `web.config` file.
{% highlight xml lineno %}
<configuration>
  <system.webServer>
    <handlers>
      <rewrite>
        <rules>
          <rule name="Angular 2 pushState routing" stopProcessing="true">
              <match url=".*" />
              <conditions logicalGrouping="MatchAll">
                <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
                ...
              </conditions>
              <action type="Rewrite" url="/index.html" />
          </rule
            ...
{% endhighlight %}
<p></p>

### Chapter 4. The Data Model
* Author has chosen to put the Model classes under the `./Data` folder
* EF Core has removed database initializers for maintaining your schema. In place are `Database.EnsureCreated()`, `Database.EnsureDeleted` and `Database.Migrate()`.
* The Controller in the book used an object-to-object mapper to create view models that rely on EF models.  Popular libraries for object-to-object mapping:
    - [AutoMapper](https://github.com/AutoMapper/AutoMapper/wiki/Getting-started) - [.NET Core Supported](http://stackoverflow.com/questions/40275195/how-to-setup-automapper-in-asp-net-core)
    - [TinyMapper](https://github.com/TinyMapper/TinyMapper) - not .NET Core compatible
<p></p>

### Chapter 5. Persisting Changes
* The typescript angular files have 1:1 mapping with the component class.  For example a class with a name of `HomePageComponent` will have a filename of `home-page.component.ts`.  For application related files like routing, the name is set to `app.routing.ts`
* Database interaction between the controller and the angular views are all API driven
<p></p>

### Chapter 6. Applying Styles
* [Pure CSS Framework](https://purecss.io/) as an alternative to Bootstrap and Foundation
<p></p>

### Chapter 7. Authentication and Authorization
* [OpenID](https://openid.net/developers/specs/) is for 3rd party authentication
* [OAuth](https://oauth.net/) is for 3rd party authorization
* [JSON Web Tokens](https://jwt.io/) for token based authentication. [RFC Specifications](https://tools.ietf.org/html/rfc7519#section-4.1)
* Example project uses `localStorage` to store the JSON Web Token, intentionally storing it even when the browser closes.  Alternatively there’s [Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) that can store information only until the browser closes.
* Subsequent calls that require authentication pass an additional header key-value pair of `Authorization: Bearer JSON_WEB_TOKEN`
* User Authentication and Authorization Process with Custom JWT Middleware
    - Register a JSON Web Token authentication middleware
    - User logs in using HTTP POST 
    - Controller or Server side code checks the HTTP POST data and if `Request.HasFormContentType`
    - Controller or Server side code returns the JSON Web Token with the HttpResponse
    - Client side code stores the token using `localStorage`
    - Subsequent requests attach the token to the headers `headers.set("Authorization", "Bearer" + auth.access_token)`
    - .NET middleware checks for the header 
<p></p>

### Chapter 8. Third-Party Authentication and External Providers
* [OpenIdDict OpenID Connect Server library](https://github.com/openiddict/openiddict-core) can replace the entire Authentication and Authorization process from the previous chapter
* The chapter has an example that uses a base controller class with these dependencies:
    - `protected ApplicationDbContext DbContext;`
    - `protected SignInManager<ApplicationUser> SignInManager;`
    - `protected UserManager<ApplicationUser> UserManager;`
* OAuth Javascript SDK’s to handle log ins
    - [Facebook SDK for JavaScript](https://developers.facebook.com/docs/javascript/quickstart)
    - [Google API Client libraries](https://developers.google.com/api-client-library/javascript/start/start-js)
* Safe storage of passwords using the [Secret Manager Tool](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets)
<p></p>

### Chapter 9. User Registration and Account Edit
* User Creation process
    - Find user by username and email then throw an error if it exists
    - Create a user instance
    - Call `UserManager.CreateAsync`
    - Add a role using `UserManager.AddToRoleAsync`
    - Call `UserManager.GenerateEmailConfirmationTokenAsync` and send the email confirmation.  The same token can be verified using `UserManager.ConfirmEmailAsync()`
    - `DbContext.SaveChanges()`
* User Update Process
    - Find user, exit or error if not found
    - Call `UserManager.CheckPasswordAsync(...)` and throw a password mismatch error if `false`
    - Have a flag to tell if an update was done, e.g. `hadChanges`
    - `DbContext.SaveChanges()` if `hadChanges = true`
* Email pattern
{% highlight text %}
"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
{% endhighlight %}
<p></p>

### Chapter 10. Finalization and Deployment
* Project checklist before deployment
    - Create `appsettings.production.json` that’ll override the local database connection string. If you’re using OpenIddict, have a production configuration set too.  Do the same for your logging configuration and caching policy for static files.
    - Check that the `publishOptions` in `project.json` is still valid
    - Check that `Startup.cs` can see your environment-specific json file
    - Update the `ASPNETCORE_ENVIRONMENT` from `launchSettings.json`