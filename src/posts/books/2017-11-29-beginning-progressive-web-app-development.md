---
layout: book
title:  "Beginning Progressive Web App Development"
excerpt: "Creating a Native App Experience on the Web"
date:   2017-11-29
categories: books
book_url: https://www.apress.com/us/book/9781484230893
book_image: /img/book-beginning-progressive-web-app-development-350x500.jpg
tags:
  - pwa
  - javascript
---

### 1. Introduction to Progressive Web Apps

**What is a Progressive Web App**  
A browser-based web application built from a set of technologies that bring fast, always-available, and native mobile app experience to users.

**Components that make a PWA**  
* Offline Support
* Notifications
* Home screen 
* HTTPS

**Service Workers vs Web Workers**  
Web Workers are simple scripts that you can run in the background for resource-intensive processes.  It lacks the capability of Service workers to intercept HTTP requests.  Service Workers run on the same Worker thread.


### 2. Tools to Measure Progressive Web Apps

**Helpful links for testing your PWA’s**  
* https://developers.google.com/web/progressive-web-apps/checklist
* https://developers.google.com/web/tools/lighthouse/ 
* https://www.webpagetest.org 


### 3. Service Workers

**Technical features of service workers**  
* Runs in the background
* Does not have access to the DOM
* Runs on its own thread and not on the UI thread
* Uses promises heavily
* Captures HTTP requests

**Basic Service Worker registration**  
{% highlight javascript %}
/*
Add this script tag in your HTML file
<script src="/js/main.js"></script>
*/
(() => {
 if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/js/service-worker.js')
       .then((registration) => {
         // registration is of type ServiceWorkerRegistration
         console.log('registered', registration);
       }, (err) => {
         console.log(err);
       });
   });
 } else {
   alert('No service worker support in this browser');
 }
})();
{% endhighlight %}

{% highlight javascript %}
/* /js/service-worker.js */

self.addEventListener('install', (event) => {
 // forces the waiting service worker to become active.
 self.skipWaiting();

 // event is an instance of InstallEvent
 console.log('service worker installed', event);
});
self.addEventListener('activate', (event) => {
 // event is an instance of ExtendableEvent
 console.log('service worker activated', event);
});
{% endhighlight %}

**Why is the placement of your service worker file important?**    
The location where you put your service worker determines its scope.  In the example above, the service worker file is placed inside the `js` folder.  This means that your worker will have access to every HTTP request that has `/js/*` in its URL.  It’s scope then is everything in and below the `js` folder.

### 4. Caching and Offline Functionality with Service Workers

**npm helper packages for caching and offline functionality**  
* [sw-precache](https://github.com/GoogleChromeLabs/sw-precache)
* [sw-toolbox](https://googlechromelabs.github.io/sw-toolbox/usage.html#main)


### 5. Background Sync for Offline Apps with Service Workers

**npm libraries to make IndexedDB queries easier**  
* [localForage](https://github.com/localForage)

### 6. Adding your App to the Home Screen with Web App Manifest

**Analytics tracking for users who installed your site on their home screen**  
Hook into the `window.addEventListener('beforeinstallprompt', ()=>{}` to run custom code you need to gain insight when users install your site on their home screen

### 7. Notifications

**New code constructs**
<script src="companion.js" data-service-worker="service-worker.js"></script>
importScripts('sw-toolbox.js','pirate-manager.js');


### 8. App Shell Architecture and Loading Performance

**async and defer in the script tag**
![Async and Defer](/img/async-and-defer.svg)

**<link preload /> and <link prefetch />**  
Both allow you to download the HTML resource beforehand.  Preload is for the current page while Prefetch is for the next page and to let the browser decide when the download begins.  Large images, fonts, videos, and huge scripts are good candidates for these attributes.

{% highlight html %}
<head>
 <meta charset="utf-8">
 <link rel="preload" href="style.css" as="style">
 <link rel="preload" href="main.js" as="script">
 <link rel="stylesheet" href="style.css">
</head>
<body>
 <script src="main.js"></script>
</body>
{% endhighlight %}



### 9. Exploring HTTP/2 and Server Push

**What HTTP/2 improves on from HTTP/1.1**  

|                       | Http/1.1                                                                                                                                                                                                                                                        | Http/2                                                                                                                                                                                                                        |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Head-of-line Blocking | Yes Sends multiple requests in a single TCP connection (Pipelining)  File Requests are returned based on the order they are sent.  Subsequent requests are block until the previous one is completed. Single bundled file is preferred to save extra HTTP trips | No Multiplexing support - single bidrectional connection for HTTP Requests Multiplexing is a newer version of SPDY Several smaller files are preferred to invalidate cache faster                                             |
| Compressed Headers    | No                                                                                                                                                                                                                                                              | Yes   HPACK Header Compression reduces redundant Request and Response Headers data   https://blog.cloudflare.com/hpack-the-silent-killer-feature-of-http-2/                                                                   |
| Server Push           | No                                                                                                                                                                                                                                                              | Yes - Server push allows you to send HTTP resources even before the browser requests it.  It isn't something you write as a server-side piece of code but rather a feature your hosting provider offers for you to configure. |


**How do I get access to the HTTP/2 Features?**  
Access to these features are offered out-of-the-box by hosting companies.  For local development, the npm package `spdy` will aid in creating an HTTP/2 server.  Head-of-line blocking and compressed headers help to speed up your page’s load times.  Server push can do the same but there are considerations to make like how much you should push and how to time it correctly.  As such, measuring performance improvements should be the main driver when adopting server push.


### 10. Turning a Real App into a PWA

**Web App Manifest Generator**  
https://app-manifest.firebaseapp.com/ .  You can use Chrome’s Dev Tools > Application > Manifest to view the configuration

### 11. PWAs From the Start

**Javascript libraries that support PWA capabilities out-of-the-box**  
* React - to use runtime caching, `npm run eject` to configure it manually
* Preact - to use runtime caching, `npm install --save-dev preact-cli-sw-precache`
 * Vuejs - provides a [pwa template](https://github.com/vuejs-templates/pwa)
* Angular - `ng new project --service-worker=true`. Least performant out of all the mentioned frameworks


### 12. Leveling Up Your PWA

**Tools** 
* [Google’s Workbox](https://developers.google.com/web/tools/workbox/) beta at the time of writing, a collection of libraries for building pwa’s

