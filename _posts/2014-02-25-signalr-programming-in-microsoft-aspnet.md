---
layout: book
title:  "SignalR Programming in Microsoft ASP.NET"
excerpt: "SignalR Programming in Microsoft ASP.NET"
date:   2014-02-25
categories: books
book_url: https://www.microsoftpressstore.com/store/signalr-programming-in-microsoft-asp.net-9780735683884
book_image: /img/book-signalr-360x439.jpg
tags: websocket signalr csharp .net
---

### Chapter 2. HTTP: You are the client, and you are the boss

<br />

#### **Pull Communications Model**  

* HTTP's Request-Response form of communication is an example of a Pull model where the client initiates the interaction to the server
* Polling is traditionally the preferred strategy to achieve real-time bidirectional communication in HTTP.  Implementations can be of:
  - Basic Polling where requests are sent based on defined time intervals
  - Adaptive Polling where the interval is adjusted based on the server load
  - Piggyback polling where request #2 is sent along with request #1, where request #1 is triggered by a UI interaction


#### **Push Communications Model**  

* This form of communications is used for real-time communications like in chat services, collaboration tools, and broadcast services where clients subscribe to a server
* Some protocols that support this model are SMTP, IRC, WebSockets and Server-Sent Events in HTML5
* WebSockets is different from Server-Sent Events (SSE) in that the former is bidirectional and the latter is one-directional.  SSE runs on the HTTP protocol while WebSockets has its own ws protocol.  In SSE, if you need to send a different request, you have to create a different HTTP connection.
* Without HTML5’s WebSockets or SSE, push communications can be mimicked in HTTP via these [Comet application model](https://en.wikipedia.org/wiki/Comet_(programming)) polling techniques
  - Long-polling where the server connection once initiated by the client, remains open until it sends a response or if it times out
  - Forever frame where an IFRAME is embedded in the page and its SRC attribute pointing to a server url which is kept open permanently

<p>&nbsp;</p>

### Chapter 3. Introducing SignalR

**What SignalR Offers**  
SignalR as a component in a .NET web application offers server and client-side solutions for persistent communication.

**SignalR vs WebSocket**  
SignalR provides abstraction for persistent server connections.  One of those is WebSocket, then there are also Server-Sent Events, Forever Frame and Long Polling.  You have the option to select which transport protocol to use or let it pick the best one for you automatically.

<p>&nbsp;</p>

### Chapter 4. Persistent connections

**SignalR library’s API abstraction**  
![SignalR Abstraction](/img/signalr-abstraction.svg)  


**MSDN: The PersistentConnection class Represents a connection between client and server.**  
It provides methods that are similar to WebSockets to help you manage users connecting in and out of your server.  It is the base class from which one must inherit to expose server connection events.

**Simple PersistentConnection example for the SignalR Server**  
Note that the `Task` object is used indicating the asynchronous nature of the methods as well as `Interlocked.Increment` for thread-safety 

{% highlight csharp %}
public class VisitorsCountConnection: PersistentConnection
{
    private static int connections = 0;
    protected override Task OnConnected(IRequest request, string connectionId)
    {
        Interlocked.Increment(ref connections);
        return base.OnConnected(request, connectionId);


        // Or notify all connected clients using Broadcast()
        // return this.Connection.Broadcast('New connection: ' + connectionId);

        // Or only notify the connecting client using Send()
        // return this.Connection.Send(connectionId, 'Welcome');
    }

    // Use async and await on any of the PersistentConnection methods if you need to 
    // to handle a long running task
    protected override async Task OnReceived(IRequest request, string connectionId, string clientData)
    {
        // Convert clientData string into a type
        var message = JsonConvert.DeserializeObject<ClientMessage>(clientData);

        await this.Connection.Send(connectionId, "Process starting");
    }

    protected override Task OnDisconnected(IRequest request, string connectionId)
    {
        Interlocked.Decrement(ref connections);
        return base.OnDisconnected(request, connectionId);
    }


    // Other methods can be found on this link such as the 2 in comment
    // https://msdn.microsoft.com/en-us/library/microsoft.aspnet.signalr.persistentconnection_methods(v=vs.118).aspx
    // protected override Task OnReconnected
    // protected override Task OnRejoiningGroups
}
{% endhighlight %}

**Mapping a PersistentConnection to a URL path for the client**  
SignalR connection mapping is created inside the StartUp class.

{% highlight csharp %}
public class StartUp
{
    public void Configuration(IAppBuilder app)
    {
        // Use GlobalHost for SignalR configuration
        // https://msdn.microsoft.com/en-us/library/microsoft.aspnet.signalr.globalhost(v=vs.118).aspx
        Microsoft.AspNet.SignalR.GlobalHost
                .Configuration.DisconnectTimeout = TimeSpan.FromSeconds(30);


        // where MyConnection inherits from PersistentConnection
        app.MapSignalR<MyConnection>("/my/path");

        // For older browsers with no JSON support, enable JSONP
        // var config = new ConnectionConfiguration(){EnableJSONP = true};
        // app.MapSignalR<MyConnection>("/my/path", config);

        /*
            // Enabling CORS
            // Microsoft.Owin.Cors must be referenced in the project 
            // and namespaced in the Startup.cs file 
            app.Map("/my/path",
                map =>
                {
                    map.UseCors(CorsOptions.AllowAll);
                    map.RunSignalR<MyConnection>();  // same as MapSignalR(...)
                }
            );
        /*
    }
}
{% endhighlight %}

**Grouping clients and broadcasting to them**  
When sending messages to a group of clients, your client application can send your SignalR server with a JSON string payload containing its grouping information.  Then you can parse that argument from your SignalR server to group your messages

{% highlight csharp %}
protected override Task OnReceived(IRequest request, string connectionId, string data)
{
    // data argument structure will vary by implementation
    var args = data.Split(new[] {" "}, StringSplitOptions.RemoveEmptyEntries);
    if(args.Length == 2 && args[0].ToLower()=="GROUPKEY")
    {
        return this.Groups.Add(connectionId, args[1]);
    }
}
{% endhighlight %}

**Minimum Javascript requirements for client side applications connecting to a SignalR server**  
* jquery@1.6.4 and above
* jquery.signalr@2.0.0 and above

**Simple client example using the SignalR Server PersistentConnection**  
Code breakdown of the client Javascript for communicating with the SignalR server.  Use the PersistentConnection example above for your server reference

{% highlight javascript %}
var connection = $.connection('/my/path');

// Enable console logging
connection.logging = true;

// start() is asynchronous
connection.start()
    .done(function () { })
    .fail(function () { });

// Sending data to the SignalR Server
$('#someButton').click(function () {
    // This will be submitted to OnReceived method
    connection.send({ key: "value" });
});

// Receiving data from the SignalR Server
connection.received(function (msg) {
    // This will be called after a
    // SignalR Server Broadcast() or Send()
    $('body').append(msg + '<br />');
});

// Other client events
// https://docs.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client#connectionlifetime
{% endhighlight %}

<p>&nbsp;</p>

### Chapter 5. Hubs

**A Hub is a more high-level pipeline built upon the Connection API that allows your client and server to call methods on each other directly**  
The Hub API gives you access to the Persistent Connection from the client or the server.  It follows a naming convention to map RPC’s between server and client.

**Simple Hub example for the SignalR Server**  
Note that every client request will create an instance of a Hub and the instance eliminated as soon as the request is processed

{% highlight csharp %}
// Use this attribute to override the class name of the hub
[HubName("HubNameOverride")]
public class MyHub : Hub
{
   // Use this attribute to change the method name
   // the client will use
   [HubMethodName("method1")]
   public void MyMethod(string name)
   {
       // Hub through HubBase has a Context property that will
       // give you access to properties related to the clients request
       string connectingUser = Context.User.Identity.Name;

       // Hub object has a Clients property you can use to
       // reference clients connecting to the SignalR server.
       // Note that Clients is dynamic type where myArbitraryMethod
       // is the client function to invoke      
       Clients.All.myArbitraryMethod(name, "Welcome " + connectingUser);
   }

   // Type-checking between client and server is done for you by the library.
   // Overloads are acceptable but note that methods with different signatures
   // will cause ambiguity because the library only uses the number of
   // method arguments when mapping the client request.
   public void MyMethod(string name, int args2)
   {
       // Example of passing state from the client
       // Client.js: hub.state.EmployeeName = 'John Doe'
       Clients.Caller.handleResponse(string.Format("Hello {0}", Clients.Caller.EmployeeName));
   }

   // Async-await is supported
   public async Task<int> Foo()
   {
       return await Something();
   }

   private Task<int> Something()
   {
       throw new NotImplementedException();
   }
}
{% endhighlight %}

**Mapping a PersistentConnection to a URL path for the client**
{% highlight csharp %}
public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        // You can mix persistent connections with hubs
        // app.MapSignalR<MyPersistentConnection>('/myconnection');

        // Map Hub Connection

        // This maps your hub to the /signalr path by default
        app.MapSignalR();

        // Use the overload constructor if you want to use a different path
        // app.MapSignalR("/mypath", new HubConfiguration(){
              // Specifies whether you want an automated generation of the
              // client javascript proxy to the hub
              // EnableJavaScriptProxies = true; // default
        // });
    }
}
{% endhighlight %}

**Minimum Javascript requirements for client side applications connecting to a SignalR server**  
* jquery@1.6.4 and above
* jquery.signalr@2.0.0 and above
* /signalr/js or /signalr/hubs - applicable to auto-generated proxy file.  This is the javascript proxy of the server-side Hubs for the client.  By default, the scripts are injected on the fly but it can be [generated ahead of time using Microsoft.AspNet.SignalR.Utils](https://docs.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client#how-to-create-a-physical-file-for-the-signalr-generated-proxy)

**Simple client example using the SignalR Server Hub from this chapter**  
This example uses the auto-generated proxy file.

{% highlight javascript %}
// Note that the client uses camel-casing while the server uses Pascal

// To enable console logging in the client
$.connection.hub.logging = true;

// reference your hub name from the `connection` object
var myHub = $.connection.hubNameOverride;

// Establish your connection
$.connection.hub.start()
   .done(function () {
       // You can invoke any SignalR server method
       // through the `server` object
       document.getElementById("test").click = function () {
           myHub.server.myMethod("John Doe");
       };
   })
   .fail(function (e) { console.log(e); });


// This is the client script that gets executed after the method
// MyHub.MyMethod() function is called on the SignalR Hub
myHub.client.myArbitraryMethod = function (message) {
   console.log(message);
}
{% endhighlight %}

This example does NOT use the auto-generated proxy file.  
{% highlight javascript %}
var connection = $.hubConnection();

connection.logging = true;

var myHub = connection.createHubProxy('hubNameOverride');

$.connection.start()
   .done(function () {
       document.getElementById('test').click = function () {
           // client calling a server method
           myHub.invoke('myMethod', 'John Doe');
       };
   })
   .fail(function (e) { console.log(e); });

// server will call this client method
myHub.on('myArbitraryMethod', function (message) {
   console.log(message);
});
{% endhighlight %}

**You are better off not using the auto-generated proxy files**  
Working with the auto-generated proxy file is very convenient for small projects.  With larger applications, there are a couple of considerations to make:
* Performance: It bloats the client script file, no minification
* Security: It exposes all the server methods increasing the attack surface of your server

<p>&nbsp;</p>

### Chapter 7. Real-time multiplatform applications
**Hosting options for  SignalR**  
* IIS - Hosting SignalR in IIS is the same as hosting a website.  
* [Console Application](https://docs.microsoft.com/en-us/aspnet/signalr/overview/deployment/tutorial-signalr-self-host) for when IIS is not available or is too much of an overhead
* [Windows Service](https://code.msdn.microsoft.com/SignalR-self-hosted-in-6ff7e6c3) - reasons are the same as the Console Application but the startup requirements are different

<p>&nbsp;</p>

### Chapter 8. Deploying and scaling SignalR
**Horizontally scaling SignalR servers using backplanes**  
SignalR employs a "backplane" to connect multiple server instances.  The idea of a backplane linking connectors in a hardware board is the same - where server instances are plugged in a backplane to allow message sharing between instances.  Backplanes address session management and data sharing requirements between SignalR server instances.  A typical web architecture may look like the one below.  For more information on backplanes, visit the [Scaleout introduction from MSDN](https://docs.microsoft.com/en-us/aspnet/signalr/overview/performance/scaleout-in-signalr).  

![Backplanes](/img/backplanes.svg)  

**Performance Recommendations**  
* Use asynchronous features for expensive or blocking calls
* Optimize the size of the data you’re transmitting
* Throttle message submissions whenever possible
* Be aware of your transport (WebSocket, Long Polling, etc.)
* Be aware of your concurrent requests (default is 5,000)
* Use the Performance Monitor with [SignalR counters](https://docs.microsoft.com/en-us/aspnet/signalr/overview/performance/signalr-performance#perfcounters) to peer into your server

<p>&nbsp;</p>

### Chapter 9. Advanced topics

**How do you secure your SignalR connections**  
* Authentication - The job of authentication should be handled by the application of the originating request.  By the time the connection hits the SignalR server, one can inspect the `request.User.Identity.IsAuthenticated` property to verify that the connection has been checked.
* Authorization - use the `Microsoft.AspNet.SignalR.Authorize` attribute for fine-grained control of access to your resources