---
layout: book
title:  " Pro ASP.NET Core 6"
excerpt: "Develop Cloud-Ready Web Applications Using MVC, Blazor, and Razor Pages"
date: 2022-02-25
read: 2023-07-21
categories: books
book_url: https://link.springer.com/book/10.1007/978-1-4842-7957-1
book_image: 
tags:
  - .net
  - asp.net
---

### 2. Getting Started

The global.json file allows you to define which .NET SDK version is used when you run .NET CLI commands. Selecting the .NET SDK version is independent from specifying the runtime version a project targets. 

Generate a global.json file from the command line using

```sh
dotnet new globaljson --sdk-version <SDK_VERSION>
```

Creating a solution with an MVC project from the command line
```sh
dotnet new globaljson --sdk-version 6.0.412 --output <FOLDER_NAME>
dotnet new mvc --no-https --output <FOLDER_NAME> --framework net6.0
dotnet new sln -o <FOLDER_NAME>
dotnet sln <FOLDER_NAME> add <FOLDER_NAME>
```

`dotnet watch` will allow for automatic project compilation (hot reload)


### 5 Essential C# Features

* Use global `using` statements to import commonly used namespaces. Create a `GlobalUsings.cs` file and write down the namespaces you want to add
  ```csharp
  global using Microsoft.AspNetCore.mvc;
  global using <MORE_NAMESPACES_HERE>;
  ```

* Extension Methods are a convenient way of adding methods to classes that you otherwise could not change

  ```csharp
  public static class MyExtensionMethods
  {
      public static decimal MethodName(this ClassToExtend methodParam)
      {
          // code here
      }
  }
  ```

* Controller methods can be asynchronous using async and await

  ```csharp
  public class HomeController : Controller {
      public async Task<ViewResult> Index() {
          long? length = await MyAsyncMethods.GetPageLength();
          return View(new string[] { $'Length: {length}' });
      }
  }
  ```


### 15. Using the Platform Features, Part 1

* Consider using the [Secret Manager tool](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=linux) in *Development* for hiding application secrets.
