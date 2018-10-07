---
layout: post
title:  "Redis Configuration for Distributed Caching on .NET Core 1.1"
excerpt: "Project dependency and configuration for an MVC application"
date:   2017-01-25 05:31
categories: notes
tags:
  - .net
  - redis
---

### project.json
Have these entries under the `dependencies` section
```json
  {
    "dependencies": {
      ...
      "Microsoft.AspNetCore.Session": "1.1.0",
      "Microsoft.Extensions.Caching.Redis": "1.1.0",
      ...
    },
  }
```
<p></p>

### Startup.cs
It is important that `app.UseSession()` under the `Configure()` method appears before `app.UseMvcWithDefaultRoute()` otherwise your application will throw a Session error.
```csharp
  ...
  public void ConfigureServices(IServiceCollection services)
  {
      ...
      services.AddDistributedRedisCache(options =>
      {
          options.Configuration = "127.0.0.1:PORT_NUMBER";
          options.InstanceName = "ARBITRARY_REDIS_INSTANCE_NAME";
      });
      services.AddSession();
  }

  public void Configure(IApplicationBuilder app, IHostingEnvironment env, 
                        ILoggerFactory loggerFactory)
  {
      ...
      app.UseSession();
      app.UseMvcWithDefaultRoute();
      ...
  }
  ...
```
<p></p>

### Usage
These can be in any entity provided they have access to the Session object.
```csharp
  // Setter
  HttpContext.Session.SetString("string_test", "Test string at " + 
                                  DateTime.Now.ToString());

  // Getter
  HttpContext.Session.GetString("string_test")
```