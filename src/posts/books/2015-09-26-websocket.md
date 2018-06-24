---
layout: book
title:  "WebSocket: Lightweight Client-Server Communications"
excerpt: "Lightweight Client-Server Communications 1st Edition"
date:   2016-09-26
categories: books
book_url: http://shop.oreilly.com/product/0636920030485.do
book_image: /img/book-websocket-360x471.jpg
tags:
  - node
  - websocket
---

### Chapter 8. WebSocket Protocol
<p>&nbsp;</p>
![WebSocket Communication](/img/WebSockets.svg)

<p>&nbsp;</p>

### Chapter 1. Quick Start

**Developing with WebSockets can be easily applied using the [npm package](https://www.npmjs.com/package/ws) `ws`**

{% highlight javascript linenos %}
// Simple server creation
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});

wss.on('connection', function(ws) {
    console.log('client connected');
    ws.on('message', console.log);
});
{% endhighlight %}

<p>&nbsp;</p>

### Chapter 2. WebSocket API

**Deconstructing a Client interacting with a WebSocket server**

{% highlight javascript linenos %}
// Check for WebSocket support
if (window.WebSocket) { ... }

// Constructor takes an optional `protocol` argument, with sample values like XMPP or STOMP.
// Full list or supported protocols http://www.iana.org/assignments/websocket/websocket.xhtml
// The url argument can either have a ws or wss protocol
var socket = new WebSocket('ws://localhost:8181');

/*
WebSocket fires 4 standard events:
1. open / onopen - for establishing connection
2. message / onmessage - handling server-sent data
3. error / onerror - for failures
4. close / onclose - for when client or server closes the connection
*/

// Same as socket.addEventListener('open', ()=>{})
socket.onopen = function (e) { … }

// Ingest incoming data
socket.onmessage = function(e) { … }

// Handle errors
socket.onerror = function(e) { … }

// Handle server closing connection
socket.onclose = function(e) { … }

// Optional - close the connection from client
socket.close(1000, 'WebSocket connection closed');
{% endhighlight %}

**How to check the state of your socket connection**  
A WebSocket instance can have 1 of these 4 states:
* WebSocket.CONNECTING - 0 : The connection is not yet open.
* WebSocket.OPEN - 1 : The connection is open and ready to communicate.
* WebSocket.CLOSING - 2 : The connection is in the process of closing.
* WebSocket.CLOSED - 3 : The connection is closed or couldn’t be opened.

**What are other Close Codes available**  
A complete list of close codes can be found on this [MDN link](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent).


### Chapter 3. Bidirectional Chat

<p>&nbsp;</p>

### Chapter 4. STOMP over WebSocket

**Instantiating a WebSocket client with a specific protocol**  
{% highlight javascript linenos %}
// Full listing of WebSocket Subprotocol Name Registry
// https://www.ietf.org/assignments/websocket/websocket.xml
let subProtocolId = 'v10.stomp';
WebSocket('ws://localhost:8181', subProtocolId);
{% endhighlight %}

**What are these subprotocols useful for?**  
These protocols define the rules on how messages are sent and received between client and server in a Message-Oriented Middleware (MOM) architecture.  MOMs are pub/sub asynchronous systems that use message-broker applications like ActiveMQ to provide a platform by which messages can be transformed, executed or routed.  Figure below shows how various server applications can use MOM to access disparate system API’s in a highly decoupled architecture.  The Web, API and Intranet servers can send messages at random while the MOM layer queues the traffic accordingly. 

![Message-Oriented Architecture](/img/Message-Oriented-Architecture.svg)

**Choosing your Asynchronous subprotocol**  
There seems to be 3 protocols that are very popular among several Message Broker platforms:

* STOMP (Simple Text Oriented Messaging Protocol) - simple API, text-based, similar to HTTP 
* MQTT (Message Queue Telemetry Transport) - by IBM thus vendor-driven, designed for IoT devices that are susceptible to bandwidth fluctuations
* AMQP (Advanced Message Queuing Protocol) - open standard with a multitude of features for various queueing strategies, multi-tenant support, and security to name a few

The conclusion I get is STOMP is sufficient for most website needs.  MQTT is designed with IoT devices in mind.  For large open-ended projects, AMQP will provide the flexibility to help scale your project with several sources citing NASA as a user.

Other than Wikipedia, these are great write-ups about what these protocols are designed for
* [https://blogs.vmware.com/vfabric/2013/02/choosing-your-messaging-protocol-amqp-mqtt-or-stomp.html](https://blogs.vmware.com/vfabric/2013/02/choosing-your-messaging-protocol-amqp-mqtt-or-stomp.html)
* [https://lists.oasis-open.org/archives/amqp/201202/msg00086/StormMQ_WhitePaper_-_A_Comparison_of_AMQP_and_MQTT.pdf](https://lists.oasis-open.org/archives/amqp/201202/msg00086/StormMQ_WhitePaper_-_A_Comparison_of_AMQP_and_MQTT.pdf) 
* [http://www.eejournal.com/article/20150420-protocols/](http://www.eejournal.com/article/20150420-protocols/) 

<p>&nbsp;</p>

### Chapter 5. WebSocket Compatibility

**Client-server solutions that provide fallback for browsers that don’t support WebSocket**
* [socksjs](https://www.npmjs.com/package/sockjs)
* [socket.io](https://www.npmjs.com/package/socket.io) 

<p>&nbsp;</p>

### Chapter 6. WebSocket Security

**Securing your web socket server**
* TLS (wss) hosting - prevent eavesdropping or man-in-the-middle attacks
* Origin verification - WebSocket does not have the same-origin restriction a XHR requests but you can check the origin of the HTTP request if it’s allowed access. This prevents Cross-Site WebSocket Hijacking from happening
*  Use X-Frame-Options header to avoid clickjacking on the HTTP website that uses your WebSocket server

<p>&nbsp;</p>

###  Chapter 7. Debugging and Tools

* Find vulnerabilities using [ZAP PENetratrionTESTing tool](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)
* Inspect incoming and outgoing packets using [Wireshark](https://www.wireshark.org/)