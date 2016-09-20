---
layout: book
title:  "Getting MEAN"
excerpt: "Getting MEAN with Mongo, Express, Angular, and Node 1st Edition"
date:   2015-11-26
categories: books
book_url: https://www.manning.com/books/getting-mean-with-mongo-express-angular-and-node
book_image: /img/book-getting-mean-360x451.jpg
tags: javascript, node, mongo
---

### Preface
* The earlier you care about reliability (and security) the better because it’s less costly compared to expanding an infrastructure later on
* SRE requires thoroughness and dedication
* SRE values preparation and documentation
* SRE is aware of what could go wrong and have a strong desire to prevent it
<p></p>


### Chapter 2:  Designing a MEAN Architecture
* The common MEAN Architecture have a REST API driven by a Single Page Application (SPA)
* Considerations when building a SPA
    -  Hard to crawl - indexing is uncertain compared to server side code
    -  Analytics and browser history - SPAs do not follow the conventional web page loading making this more challenging
    -  Speed of initial load because SPAs need to have all their dependencies loaded on startup
* Deciding to build a SPA versus a traditional architecture will depend on the requirements of a project. The general rule of thumb is if you project uses a lot of workarounds in the onset then you most likely need to rethink it. 
* Best practice when building a database driven app is to have an API layer to surface the data.  It has a huge overhead in the beginning but it’ll pay off down the road.
<p></p>

### Chapter 5:  Building a data model with MongoDB and Mongoose
* Closing the Mongoose connection when the application stops is a good practice.  You need to listen to the SIGINT event available on all OS’es.  For older version of Windows there’s an npm package name `readline` that you can use.  If you’re running your app using `nodemon`, listen for SIGUSR2.  On Heroku it’s SIGTERM.
* MongoDB uses the concept of SubDocuments to represent nested data.  Each SubDocument has its own unique Id that you can use when traversing a record.
* Anatomy of a MongoDB Connection String  
`mongodb://username:password@hostname_or_ip:port_number/database_name`
<p></p>

### Chapter 6:  Writing a REST API: Exposing the MongoDB database to the application
* When adding an API to an Express project, it’s good to keep the api in a separate folder because it will give you flexibility to reuse it on a separate application.
* Express Project Folder Structure in the Book:  
<pre>

    app_api  
    |__controllers  
    |__models  
        |__db.js  
        |__model.js  
    |__routes  
        |__index.js  
    app_server  
    |__controllers  
    |__routes  
    |__views
      
</pre>
<p></p>

### Chapter 8:  Adding Angular components to an Express application
* It’s better to use the setter syntax `angular.module(‘myApp’, [])` than the getter syntax `var myApp = angular.module(‘myApp’, [])` so you can use the latter for your controllers.  
Example:   
<pre>
      
    var myController = function(){ … }  
    angular  
      .module(‘myApp’, [])  
      .controller(‘myController’, myController);

</pre>
<p></p>

### Chapter 11:  Authenticating Users, Managing Sessions, and Securing APIs
* JSON Web Token (JWT) is used to address the statelessness of the web when dealing with security.  Every request contains the token that the API endpoint can decode to determine the level of access is permitted.
* A JWT is composed of 3 parts separated by a dot.
    1.  Header - contains type and hashing algorithm
    2.  Payload - encoded JSON data
    3.  Signature - encrypted hash of the header and payload together with a secret key that only the originating server knows
* You can use the npm `jsonwebtoken` library together with the built in node `crypto` library to accomplish your JWT needs.
* Cookies are great when you need to pass state to the server but the browsers’ localStorage feature is great for SPAs that only require data to stay in the browser.
* Environment variables specially security keys should be kept secret by assigning them at the machine-level.  For local development, there’s an npm library called `dotenv` that you can use to mimic this feature.  Make sure to add this to your .gitignore file.