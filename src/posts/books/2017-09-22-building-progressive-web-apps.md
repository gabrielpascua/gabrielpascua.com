---
layout: book
title:  "Building Progressive Web Apps"
excerpt: "Bringing the Power of Native to the Browser"
date:   2017-09-22
categories: books
book_url: http://shop.oreilly.com/product/0636920052067.do
book_image: /img/book-building-progressive-web-apps-360x472.jpg
tags:
  - pwa
  - javascript
---

### Chapter 1. Introducing Progressive Web Apps

**The book sells the idea that developing apps are becoming less marketable.  [The average mobile user spends 84% of her time using the top 5](https://www.comscore.com/Insights/Presentations-and-Whitepapers/2016/The-2016-US-Mobile-App-Report) most popular apps.**   
While a PWA may not be an option for everyone, it can be a used to support a small portion of your users. Say your company relies heavily on an app but can no longer support older devices, instead of ignoring those users you can create a PWA and let them access your service through their browsers.

**Service workers are at the heart of every PWA**  
The persistent connection of Service workers bring app-like capabilities to PWA.  Combined with local storage and IndexedDB, it can behave like a native app that does not rely on network connection all the time.


### Chapter 2. Your First Service Worker

**What is a Service Worker?**  
A Service Worker act as a proxy between your browser and the web.  Having it on your site will make outgoing traffic pass through the Service Worker before going out on the internet.  This gives you a powerful API to intercept HTTP requests and to alter responses.  

**[Common uses of Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#Other_use_case_ideas)**  
* Swapping content
* Offline support
* Background data synchronization
* URL-based templating

**What are some guidelines for using ServiceWorkers**  
* It must use HTTPS in production because of its capability to intercept requests.  Putting it behind HTTPS prevents man-in-the-middle attacks
* By default responses are sent as plain text.  Add `{'Content-Type': 'text/html'}` for HTML formatted responses.
* Scoping is valid from the current level going down but not from the current level going up, e.g. it’s ok to scope `/root/node/sw.js` to `/root/node/subnode` but not to `/root` or `/root/sibling`.  The reason is web applications establish context through url’s.  `/my-account/guest` should never have access to `/my-account/admin`.

**Basic Offline Strategy using a ServiceWorker**  
{% highlight javascript   %}
self.addEventListener('fetch', function (event) {
 event.respondWith(
   fetch(event.request)
   .then(function(response){
     // then block is optional. This block is executed
     // for every resource on your site - from css to js.
     // You must return the response which is an instance
     // of the Response object, else no content is served.
     return response;
   })
   .catch(function () {
     // This is executed once - as soon as the browser
     // detects that the user is offline.
     return new Response(
       '<b>Offline</b>',
       { headers: { 'Content-Type': 'text/html' } }
     );
   })
 );
});
{% endhighlight %}


###  Chapter 3. The CacheStorage API

**CacheStorage API as a complement to service workers**  
The CacheStorage API has the ability to cache full `Request` and `Response` objects in the user’s browser.  It does not have to be used with service workers but doing so complements it for  a good offline strategy on your website.

**Full offline caching strategy example**  
Further improvement of the code involves limiting cache saves to files that change often.  Images or vendor assets seldom change.  You can ignore these files and use `cache.put` to save the ones that change to increase efficiency and speed of your installation.

{% highlight javascript %}
var CACHE_VERSION = 1;

var CURRENT_CACHES = {
 gih: 'gih-cache-v' + CACHE_VERSION
};

/*
listen for the install event before downloading
the files for serving offline content
*/
self.addEventListener('install', function (event) {
 // waitUntil tells the service worker that a work
 // is ongoing until it finishes executing the promise
 event.waitUntil(
   // caches - is a global object
   caches.open(CURRENT_CACHES.gih).then(function (cache) {
     // store assets offline
     // cache.addAll will save the whole Response object
     return cache.addAll([
       '/index-offline.html',
       'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
       '/css/gih-offline.css',
       '/img/jumbo-background-sm.jpg',
       '/img/logo-header.png'
     ]);
   }));
});

// clean up old cache using a simple versioning
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Deleting_old_caches
self.addEventListener('activate', function (event) {
 var cacheWhitelist = Object.keys(CURRENT_CACHES).map(function (key) {
   return CURRENT_CACHES[key];
 });
 // delete old cache
 event.waitUntil(
   caches.keys().then(function (keyList) {
     return Promise.all(keyList.map(function (key) {
       if (cacheWhitelist.indexOf(key) === -1) {
         return caches.delete(key);
       }
     }));
   })
 );
});

self.addEventListener('fetch', function (event) {
 event.respondWith(
   // in the absence of a network connection,
   // serve the HTML file of your choosing
   // from the 'install' listener
   fetch(event.request)
     .catch(function () {
       // note that different querystring parameters
       // will make caches.match fail
       return caches.match(event.request)
         .then(function (response) {
           if (response) {
             return response;
           } else if (event.request.headers.get('accept').includes('text/html')) {
             // return your offline page for HTML requests
             return caches.match('/index-offline.html');
           }
         });
     })
 );
});
{% endhighlight %}


### Chapter 4. Service Worker Lifecycle and Cache Management
**Service Worker Lifecycle**  
![Service Worker Lifecycle](/img/service-worker-lifecycle.svg)

**Good practices for managing the lifecycle and cache**  
* Cache key versioning to determine the current worker assets
* Clean up for old cache to prevent exceeding the browser storage
* Selective caching for commonly changed files for installation efficiency
* Setting worker file expiration for ~10 minutes. The default 24 hours can prevent you from rolling out a fix if your worker file has bugs


### Chapter 5. Embracing Offline-First
**Offline connectivity should be treated as a state and not an error**  
Instead of throwing an error, serve degraded content from your cache or create visual cues or messages that show lack of connectivity

**Common Caching Patterns**  
* [Cache Only](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only) - all responses are taken from the cache.  An error is thrown without a match.This is good for static content that don’t change often like logos, icons, and stylesheets.
* [Cache, falling back to network](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) - similar to Cache Only but instead of throwing an error in the absence of a match, fetch the missing resource from the network (server).  This will make the majority of the requests you’ll make when building an offline-first strategy.
* [Network only](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-only) - no caching strategy, use for everything that does not have an offline equivalent like analytics pings and non-GET requests
* [Network, falling back to cache](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) - Use this when users need to have an up-to-date content.  A timeout can be useful for slow or intermittent connections that will switch the connection to the cached version to prevent an indefinite loading screen.
* [Cache, then network](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-then-network) - display the cached version first then update from the network. 2 requests are made - 1 for the cache, 2 for the network.  Ideal for articles and social media content.
* [Generic fallback](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback) - Show a degraded or a generic response for when neither cache nor network is available.  For non-GET requests, notify the user that their work has been saved locally and will be submitted when the network becomes available.
* [Cache & network race](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-and-network-race) - when disk access can be slower than the network and the resource is absent from the cache, pit cache against the network and whichever responds first wins.

**When to store caching resources**  
A great read on this topic can be found here https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/



### Chapter 6. Storing Data Locally with IndexedDB

**IndexedDB data is destroyed in Private Browsing mode**  
The lifetime of IndexedDB data as observed in Chrome is available only during the browser session.  Data is destroyed as soon as the browser closes.

**Use the CacheAPI for static files and IndexedDB for the data**  
This general recommendation [from Google](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa) suggests that HTML, CSS, and Javascript files you’ll need to serve an offline version of your site should come from CacheAPI and the rest should be filled in by IndexedDB.  The reasons are they’re both asynchronous (non-blocking) and are [available on all modern browsers](https://caniuse.com/#search=IndexedDb).

**IndexedDB compared to other NoSql databases**  
* IndexedDB is an object store
* Redis is a data structure store (can be considered as object store)
* MongoDB is a document-based store 

**CRUD IndexedDB Example**  
{% highlight javascript %}
if (!window.indexedDB) {
  throw new Error('No browser support for IndexedDb.');
}

const TABLE_NAME = 'tbl1';

// request is an instance of IDBOpenDBRequest
var request = window.indexedDB.open('testdb', 1);

//event is Event
//event.target is IDBOpenDBRequest
request.onsuccess = (event) => {
  var x = event;
}

//event is Event
//event.target is IDBOpenDBRequest
request.onerror = (event) => {
  console.error(event.target.error);
}

//event is IDBVersionChangeEvent
//event.target is IDBOpenDBRequest
request.onupgradeneeded = function (event) {
  //db is IDBDatabase
  var db = event.target.result;

  //store is IDBObjectStore
  //any error here will fall back into request.onerror
  var store = db.createObjectStore(TABLE_NAME, {autoIncrement: true});

  //transaction is IDBTransaction
  var transaction = store.transaction;

  //event is Event
  //event.target is IDBTransaction and is the same transaction variable
  transaction.onerror = (event) => {
    console.error(event.target.error);
  }

  //event is Event
  //event.target is IDBTransaction and is the same transaction variable
  transaction.oncomplete = (event) => { /* noop */ }
}

var idbInsert = function(){
  //db is IDBDatabase
  var db = request.result;

  var insertRequest = db.transaction(TABLE_NAME, 'readwrite')
    .objectStore(TABLE_NAME)  //instance IDBObjectStore
    .add({inserted: (new Date()).toDateString() }); //instance of IDBRequest

  //event is Event
  //event.target is IDBRequest
  insertRequest.onsuccess = (event) => { /* noop */ }

  insertRequest.onerror = (event) => {
    console.log('Error', event.target.error);
  }
}

var idbFind = function(idKey, fnSuccess, fnError){
  idKey = idKey || 3;
  var db = request.result;
  var findRequest = db.transaction(TABLE_NAME, 'readwrite')
    .objectStore(TABLE_NAME)
    .get(idKey);

  findRequest.onsuccess = (event) => {
    //event.target.result is your data
    //undefined if nothing was found
    console.log('Success', event.target.result);

    //callback for updating success
    if(fnSuccess && typeof fnSuccess === 'function'){
      fnSuccess(event);
    }
  }

  findRequest.onerror = (event) => {
    //callback for updating failures
    if(fnSuccess && typeof fnSuccess === 'function'){
      fnError(event);
    }
  }
}

//FF has getAll but it's non-standard
var idbList = function(){
  var records = [];
  var db = request.result;
  var store = db.transaction(TABLE_NAME)
    .objectStore(TABLE_NAME);

  store.openCursor().onsuccess = function(event){
    var cursor = event.target.result;
    if(cursor){
      records.push(cursor.value);
      cursor.continue();
    }else{
      console.log('Records fetched: ', records);
    }
  }
}

var idbDelete = function(idKey){
  idKey = idKey || 3;
  var db = request.result;
  var deleteRequest = db.transaction(TABLE_NAME, 'readwrite')
    .objectStore(TABLE_NAME)
    .delete(idKey);

  deleteRequest.onsuccess = (event) => { /* noop */ }
  deleteRequest.onerror = (event) => { /* noop */ }
}


var idbUpdate = function(idKey){
  idKey = idKey || 3;
  idbFind(idKey, function(event){
    //get the data and update the record
    var findResult = event.target.result;
    findResult.updated = true;

    //save your changes
    var objectStore = event.target.transaction.objectStore(TABLE_NAME);

    //take note of idKey for autoincrement fields
    //put is also an insert/update operation
    var updateRequest = objectStore.put(findResult, idKey);

    updateRequest.onsuccess = (event) => {
      console.log('Success',event);
    };

    updateRequest.onerror = (event) => {
      console.log('Error', event.target.error);
    }

  }, function(event){
    console.log('Error', event.target.error);
  });
}
{% endhighlight %}

**Generic Guidelines for using IndexedDB**  
* Prefer feature detection over version checking
* Always consider the amount of space you’re using
* Chain or promisify IndexedDB methods for readability
* Leverage indexes to speed up queries
* In an update scenario where you’re deleting then inserting records in 2 separate transactions, consider combining it in a single transaction.  There may be times when the browser is closed after records are deleted, leaving you with an empty database.

**IndexedDB Wrappers**  
* [PouchDB](https://github.com/pouchdb/pouchdb) - inspired by CouchDB, it uses IndexedDB and falls back to WebSQL 
* [localforage](https://github.com/localForage/localForage) - a polyfill with a localStorage-like API that uses IndexedDB or WebSQL
* [dexie.js](https://github.com/dfahlander/Dexie.js) - cleaned up IndexedDB API wrapper with Typescript and Observable support
* [indexeddb-promised](https://www.npmjs.com/package/indexeddb-promised) - promise-based IndexedDB API


### Chapter 7. Ensuring Offline Functionality with Background Sync

* A Background Sync action will not go away until it completes successfully
* It lacks browser support


### Chapter 8. Service Worker to Page Communication with Post Messages

**postMessage() to send messages between clients and service worker and vice versa**  
* In the context of service workers, it is useful if you need to send updates or messages to the DOM tree
* In the context of a client window, this can serve as a trigger to your service worker to execute a command such as cache a page or an element, clear the cache on logout, update indexedDb, etc..

**MessageChannel as an open line of communication**  
* It’s the second argument when calling `postMessage(arg1,arg2)`
* Can be used between service worker and its clients, or between main window and iframe
* The best use-case I’ve seen by far is for service worker to service worker communication or [iframe to window](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging), else postMessage seems to accomplish what is needed

{% highlight javascript %}
// Example on how to log fetch API requests from the service worker to the window
// Window code
var msgChan = new MessageChannel();
// receiving
msgChan.port1.onmessage = function (event) {
 console.log('URL fetched:', event.data);
};
// sending
navigator.serviceWorker.controller.postMessage('listening', [msgChan.port2]);

// Service worker code
self.addEventListener('message', function (messageEvent) {
 var openPort = messageEvent.ports[0];
 self.addEventListener('fetch', function (fetchEvent) {
   // sending every time a fetch api request is issued
   openPort.postMessage(fetchEvent.request.url);
 });
});
{% endhighlight %}

**Best practices**  
* Check the origin and source to prevent other malicious messages from unknown users when using postMessage()
* Use feature detection if you’re dealing with service workers
* Label your data actions similar to how Redux identifies its state if you’re going to have multiple message submissions

**Window to Service Worker**  
{% highlight javascript %}
// DOM Message
if(‘serviceWorker’ in navigator && navigator.serviceWorker.controller){
  navigator.serviceWorker.controller.postMessage(
    { action: 'submit' }
  );
}

// Service Worker Handler
self.addEventListener('message', function (event) {
  if (event.data.action === 'submit') {
     console.log(‘Window Source:’, event.source);
  }
});
{% endhighlight %}

**Service Worker to Windows (or Window)**  
{% highlight javascript %}
// Service Worker, must be placed inside an event to ensure that clients are registered
self.addEventListener('message', function (event) {
 // Use this to limit communication with the triggering window
 // self.clients.get(event.source.id).then(function(){...})
 
 self.clients.matchAll().then(function (clients) {
   clients.forEach(function (client) {
     client.postMessage({ action: 'log', message: 'client id' + client.id });
   });
 });
});

// Open Window
if ('serviceWorker' in navigator) {
 navigator.serviceWorker.addEventListener('message', function (event) {
   if (data.action === 'log') {
     console.log(data.message);
   }
 });
}
{% endhighlight %}


### Chapter 9. Grabbing Homescreen Real Estate with Installable Web Apps

**Requirements for adding a homescreen icon on smart phones to your PWA**  
* a `manifest.json` file. This [favicon generator](https://realfavicongenerator.net/) site helps in building it along with 
* `<link rel='manifest' href='/manifest.json'>`

**The browser determines to alert the user to “Add to Home Screen” only if these items are met**  
* The site is HTTPS
* A service worker is present
* A manifest.json exists
* Browser-specific rules based on visits, and other factors adjusted regularly

**Tracking the source of your website traffic**  
* Append a utm google analytics parameter to your homepage url so you can identify where the traffic came from


### Chapter 10. Reach Out with Push Notifications

**The Notification API**  
* sends notifications outside the browser
* requires permission and uses the same permission as the Push API. A permission granted on a HTTP connection will not be recognized on an HTTPS and vice versa
* To create notifications that work on desktop and mobile, notifications have to be created through a service worker registration event
* Private browsing mode blocks this feature
* Consider using the tag property if you’re going to have multiple notifications and you need to track where the interaction originated

{% highlight javascript %}
if ('serviceWorker' in navigator) {
 // Notifications will work even if you don't have a
 // service worker javascript file registered
 Notification.requestPermission().then(function (permission) {
   if (permission === 'granted') {
     // .ready can be called anywhere. it delays execution
     // of your code until the service worker is active
     navigator.serviceWorker.ready.then(function (registration) {
       var count = 1;
       // The tag parameter allows you to overwrite an existing
       // notification instead of displaying a new one
       var createNotification = function() {
         registration.showNotification('New Messages Count: ', {
           body: count,
           tag: 'counter-notification'
         });
         count += 1;
       };
       // simulates sending an updated message
       setInterval(createNotification, 2000);
     });
   }
 });
}
{% endhighlight %}

**The Push API**  
* The messaging source/server users subscribe to
* requires permission and uses the same permission as the Push API
* Requires Public and Private Voluntary Application Server Identification for Webb Push (VAPID) keys
* Possibly optional because only older Chrome, Opera and Samsung Browsers use it, but you may need to generate a Google Cloud Messaging key from Firebase http://pwabook.com/firebaseconsole

{% highlight javascript %}
// Simple Client Subscription
if ("Notification" in window &&
"PushManager" in window &&
"serviceWorker" in navigator) {
Notification.requestPermission().then(function (permission) {
  if (permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      // userVisibleOnly=false is not supported
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "VAPID_KEY_HERE"
      });
    }).then(function (subscription) {
     var fetchOptions = {
       method: "post",
       headers: new Headers({
         "Content-Type": "application/json"
       }),
       body: JSON.stringify(subscription)
     };
     return fetch("/add-subscription", fetchOptions);
    });
  }
});
}
{% endhighlight  %}

{% highlight javascript %}
// Simple Server example using web-push
app.post("/add-subscription", function (req, res) {
 webpush.setGCMAPIKey("GCMAPIKey");
 webpush.setVapidDetails(
   "SUBJECT_USUALLY_THE_EMAIL",
   "VAPID_PUBLIC_KEY",
   "VAPID_PRIVATE_KEY"
 );

 webpush
   .sendNotification(req.body, { data: {} })
   .then(function () {
     res.json({ sent: true });
   })
   .catch(function () {
     res.json({ sent: false });
   });
});
{% endhighlight %}

{% highlight javascript %}
// Service Worker Listener
self.addEventListener('push', function(event) {
 self.registration.showNotification('Push message received', {
   body: event.data
 });
});
{% endhighlight %}

**Putting all the pieces together**  
![Notifications API.svg HERE](/img/notifications-api.svg)


**NPM Packages**  
* [web-push](https://www.npmjs.com/package/web-push) for generating VAPID keys
* [lowdb](https://www.npmjs.com/package/lowdb) for using a json file as a database

### Chapter 11. Progressive Web App UX

### Chapter 12. What’s Next for PWAs

**Interesting APIs developed for PWAs**  
All of these do not have wide browser support at the time of writing
* [Payment Request](https://caniuse.com/#search=payment)
* [Credential Management](https://caniuse.com/#search=credential)
* [Speech Recognition](https://caniuse.com/#search=speech)
* [Web Share](https://caniuse.com/#search=web%20share)
