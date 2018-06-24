---
layout: post
title:  "EF Migrations for .NET Core 1.1.0 Without Visual Studio"
excerpt: "EF Migrations for .NET Core 1.1.0 Without Visual Studio"
date:   2016-12-24 11:00
categories: notes
tags:
  - .net
---

### Add the required dependencies in your project.json file
<p></p>
{% highlight json linenos %}
{
  "dependencies": { 
      ...
      "Microsoft.EntityFrameworkCore": "1.1.0",
      "Microsoft.EntityFrameworkCore.Design": {
          "version": "1.1.0",
          "type": "build"
      }
      ...
  },
  ...
  "tools": { 
      ...
      "Microsoft.EntityFrameworkCore.Tools.DotNet": "1.1.0-preview4-final"
      ...
  }
}
{% endhighlight %}
<p></p>

### If you haven’t done so, import the libraries
<p></p>
{% highlight shell linenos %}
  dotnet restore
{% endhighlight %}
<p></p>

### Run the migration script
<p></p>
{% highlight shell linenos %}
  dotnet ef migrations add NAME_OF_MIGRATION_CLASS
  dotnet ef database update
{% endhighlight %}