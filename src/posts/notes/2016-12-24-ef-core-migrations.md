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

```json
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
```


### If you haven’t done so, import the libraries

```bash
  dotnet restore
```

### Run the migration script

```bash
  dotnet ef migrations add NAME_OF_MIGRATION_CLASS
  dotnet ef database update
```