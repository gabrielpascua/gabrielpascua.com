---
layout: post
title:  "Delegates and Events"
excerpt: "C# .NET delegates and events"
date:   2017-07-28 06:11
categories: notes
tags:
    - csharp
    - .net
---



### What are delegates?

* A delegate is a type that holds a reference to a method
* Delegate provides a late binding mechanism where the caller can supply a method that will be part of the execution
* Delegates are multi cast because they can hold reference to more than 1 method
* Multi-cast delegates are methods chained together
* Use Action for delegates that do not return a value
* Use Function for delegates that return a value
* Use Predicate for delegates that return a test on a single value


**In its simplest form**  

{% highlight csharp %}
using System;

public static class Logger
{
    public static Action<string> WriteMessage;
    public static void LogMessage(string msg)
    {
        WriteMessage(msg);
    }
}

class MainClass {
  public static void Main (string[] args) {
    //Lambda Form
    Logger.WriteMessage += (msg) => Console.WriteLine(msg);
    
    //Non Lambda
    Logger.WriteMessage += WriteMessage2;
    
    Logger.LogMessage("Hello World");
  }
 
  public static void WriteMessage2(string msg)
  {
    Console.WriteLine(msg + " #2");
  }
}
{% endhighlight %}

<br />

### Events vs Delegates  
<br />
<table class="table">
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Event</th>
      <th>Delegate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Listeners</td>
      <td>Optional</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>Return Type</td>
      <td>void</td>
      <td>any</td>
    </tr>
    <tr>
      <td>Lifetime</td>
      <td>Longer - till program is active</td>
      <td>Shorter - till method is called</td>
    </tr>
  </tbody>
</table>



**The Event Pattern**  
* An event is a message sent by an object to signal the occurrence of an action.
* All events in .NET are based on the EventHandler delegate. Use EventHandler for events that do not require event data. Use EventHandler<TEventArgs>  otherwise.
* Event names are verbs that are either in present or past tense
* Event Data classes end in EventArgs and they no longer (but used to) require to inherit from the `EventArgs` class (.NET Core)
* Events with async subscribers must wrap the await code in a try-catch block to capture errors.  Without it the calling method would have continued already by nature of async and you’re left with no way to log or handle errors gracefully. 


**Subscribing to Events**  

{% highlight csharp %}
void HandleCustomEvent(object sender, CustomEventArgs args)  
{  
   // Do something useful here.  
}  

// These are all the same
publisher.RaiseCustomEvent += HandleCustomEvent;  // C# 2.0
publisher.RaiseCustomEvent += new CustomEventHandler(HandleCustomEvent); // C# 1.0
publisher.RaiseCustomEvent += (sender, args) => { //Method Body Here }
{% endhighlight %}

<br />

**Full Example of Publishing, Raising and Subscribing to Events**
<br />
{% highlight csharp %}
namespace DotNetEvents
{
    using System;
    using System.Collections.Generic;

    // Define a class to hold custom event info
    public class CustomEventArgs : EventArgs
    {
        public CustomEventArgs(string s)
        {
            message = s;
        }
        private string message;

        public string Message
        {
            get { return message; }
            set { message = value; }
        }
    }

    // Class that publishes an event
    class Publisher
    {

        // Declare the event using EventHandler<T>
        public event EventHandler<CustomEventArgs> RaiseCustomEvent;

        public void DoSomething()
        {
            // Write some code that does something useful here
            // then raise the event. You can also raise an event
            // before you execute a block of code.
            OnRaiseCustomEvent(new CustomEventArgs("Did something"));

        }

        // Wrap event invocations inside a protected virtual method
        // to allow derived classes to override the event invocation behavior
        protected virtual void OnRaiseCustomEventClassic(CustomEventArgs e)
        {
            // Make a temporary copy of the event to avoid possibility of
            // a race condition if the last subscriber unsubscribes
            // immediately after the null check and before the event is raised.
            EventHandler<CustomEventArgs> handler = RaiseCustomEvent;

            // Event will be null if there are no subscribers
            if (handler != null)
            {
                // Format the string to send inside the CustomEventArgs parameter
                e.Message += String.Format(" at {0}", DateTime.Now.ToString());

                // Use the () operator to raise the event.
                handler(this, e);
            }
        }
        
        //C# 6 Approach
        protected virtual void OnRaiseCustomEvent(CustomEventArgs e)
        {
          e.Message += String.Format(" at {0}", DateTime.Now.ToString());
          RaiseCustomEvent?.Invoke(this, e);
        }
    }

    //Class that subscribes to an event
    class Subscriber
    {
        private string id;
        public Subscriber(string ID, Publisher pub)
        {
            id = ID;
            // Subscribe to the event using C# 2.0 syntax
            pub.RaiseCustomEvent += HandleCustomEvent;
        }

        // Define what actions to take when the event is raised.
        void HandleCustomEvent(object sender, CustomEventArgs e)
        {
            Console.WriteLine(id + " received this message: {0}", e.Message);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Publisher pub = new Publisher();
            Subscriber sub1 = new Subscriber("sub1", pub);
            Subscriber sub2 = new Subscriber("sub2", pub);

            // Call the method that raises the event.
            pub.DoSomething();

            // Keep the console window open
            Console.WriteLine("Press Enter to close this window.");
            Console.ReadLine();

        }
    }
}
{% endhighlight %}

<br />

#### References  
* [CSharp Event Pattern](https://docs.microsoft.com/en-us/dotnet/csharp/event-pattern)
* [All about events](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/events/)
* [Publishing Events](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/events/how-to-publish-events-that-conform-to-net-framework-guidelines#example)
* [Event Pattern examples](https://docs.microsoft.com/en-us/dotnet/standard/events/how-to-raise-and-consume-events )