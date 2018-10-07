---
layout: post
title:  "Hosting a node Angular SPA in IIS"
excerpt: "Using iisnode to run a nodejs application on Windows"
date:   2018-01-07 05:27
categories: notes
tags:
    - javascript
    - angular
    - iisnode
    - node
---


## Context  

**What are you trying to accomplish?**  
The goal is to host an Angular SPA with an Express-backed server that can proxy JSON API calls.
The Windows server is on-premise and the IIS server hosts other web applications that are not necessarily
running node. The ideal web hosting setup for the Angular SPA is to be part of the main IIS
domain and for it to run as a virtual directory or as a stand-alone application.



**What are the alternatives to iisnode?**  
There 2 other ways to host a node application on Windows.  

* Node as a Windows service. This is similar to how *nix machines host node.  Unless you're using something
like [node-windows](https://github.com/coreybutler/node-windows), you're going to have to manage the
service yourself.  This means you have to take care of the startup and updates possibly through `.bat` files or
some other means that allow you to hook your application in Windows.  Your scaling options are obviously
limited.  A good use-case for this is quick deployment for a prototype or a proof-of-concept project.

* Using IIS as a Reverse proxy. You still have to fire up your node application as a service then expose it
to IIS using the [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) module.
This shines when you need a more robust load-balancing strategy.  If you can spin up multiple Windows machines
easily or if you have several on-premise machines that you can use to host your node application, then this is
the better strategy.  Also think [blue-green deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
support here to minimize downtime.  Cloud-hosted node applications can benefit from this setup.



**Why choose iisnode for you needs?**
* IIS integration - you manage your node application in IIS, no service or process to start/stop.  You'll also have
`web.config` at your disposal to configure your application. 
* Configuration-based load balancing.  iisnode can spawn multiple node processes from within `web.config`
* Logging. One less npm package to manage because logging can be enabled easily.

<p>&nbsp;</p>

## Setup

**Boilerplate Angular project**  
The project is configured so that the url of the SPA is `http://localhost/ng-node/`.
All the server-side code will be under `http://localhost/ng-node/api` and the static files (javascript, css, images, etc.)
will be under `http://localhost/ng-node/public`.
<br />

![Angular Project](/img/iisnode-project.png)

**IIS Setup**  
You want to point your IIS web application to your node SPA folder then restrict access to 
folders that you don't want to serve on your site.
<br />

![IIS Setup](/img/iis-setup.png)



**Restrict access to development files**  
Rewrite rules to prevent web access to files that should not be publicly visible.  
```markup
...
<rewrite>
    <rules>
    <rule name="Block Non Angular Requests" stopProcessing="true">
        <!-- Block all requests that are not under the /public folder -->
        <match url="public/?" negate="true" />
        <action type="CustomResponse" statusCode="404" 
            statusReason="Page not found" 
            statusDescription="Page not found" />
        <conditions logicalGrouping="MatchAll">
            <!-- The root url is /ng-node -->
            <!-- Let these routes through and be handled by the NodeJS Handler rule -->
            <add input="{PATH_INFO}" pattern="/ng-node/api" negate="true" />
            <add input="{PATH_INFO}" pattern="/ng-(node|node/)$" negate="true" />
        </conditions>
    </rule>
    <rule name="NodeJS Handler">
        <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
        </conditions>
        <action type="Rewrite" url="src/server/index.js" />
    </rule>
    </rules>
</rewrite>
...
```

<p>&nbsp;</p>

## Troubleshooting

**Installing iis node error on IIS 10 - Win 10 Home.**  
* HTTP Error 500.19 - Internal Server Error.  This configuration section cannot be used at this path. This happens when the section is locked at a parent level. Locking is either by default (overrideModeDefault="Deny"), or set explicitly by a location tag with overrideMode="Deny" or the legacy allowOverride="false".
* FIX: Under the root of the website in IIS, set Feature Delegation > Handler Mappings to Read/Write from only Read

**Installing iis node error on IIS 10 - Win 10 Home**  
* Installation does not go through for the examples
* FIX: make sure you run the .bat file as an Administrator

**Running a node application with node-windows (nvm)**  
* The iisnode module is unable to start the node.exe process. Make sure the node.exe executable is available at the location specified in the system.webServer/iisnode/@nodeProcessCommandLine element of web.config. By default node.exe is expected in one of the directories listed in the PATH environment variable.
* HTTP Error 500.1000 - Internal Server Error.  The page cannot be displayed because an internal server error has occurred.  Module iisnode, Notification ExecuteRequestHandler, Handler iisnode, Error Code  0x00000005
* FIX: Make sure that the version of node you’re running on `%programfiles%\nodejs\` has (at least default) permissions for the `IIS_IUSRS` account.  No need to set an additional security access for `IIS_IUSRS` on the nodejs application folder

