---
layout: post
title:  "Hosting Your Node Application on Apache"
excerpt: "Hosting Your Node Application on Apache"
date:   2015-09-14 15:00
categories: notes
tags:
  - linux
  - ubuntu 14.04
---

I have a couple of applications running on localhost:3000 that I have configured from the /etc/hosts file.  This preserves the host name when the node server fires up.

{% highlight shell linenos %}
$ sudo -i

# Enable Apache modules required to run your app:
$ a2enmod proxy proxy_http headers
$ service apache2 restart

# Create an /etc/hosts entry

# Create a vhost entry with this configuration:
    > &lt;VirtualHost *:80&gt;
    > ServerName [HOST NAME]
    > ServerAlias [HOST NAME]
    > DocumentRoot [LOCAL PATH]
    > ProxyRequests off

    > &lt;Proxy *&gt;
    > Order deny,allow
    > Allow from all
    > Require all granted
    > &lt;/Proxy&gt;

    > &lt;Location&gt;
    > ProxyPass http://localhost:3000/
    > ProxyPassReverse http://localhost:3000/
    > &lt;/Location&gt;

    > RequestHeader set Host "[HOST NAME]"
    > ProxyPreserveHost On
    > &lt;/VirtualHost&gt;

# Enable (a2ensite) your site if you haven't done so
$ service apache2 restart


# Troubleshooting:
# When running nodemon, you get Error: watch ENOSPC:
$ echo fs.inotify.max_user_watches=524298 | sudo tee -a /etc/sysctl.conf && \
    sudo sysctl -p

# FATAL ERROR- JS Allocation failed - process out of memory:
$ node --max-old-space-size=2048 [NODEJS FILE].js
{% endhighlight %}

<aside>
    <h4>References:</h4>
    <ul>
        <li><a href="http://ingenioustechie.com/fatal-error-watch-enospc.html" target="_blank">http://ingenioustechie.com/fatal-error-watch-enospc.html</a></li>
        <li><a href="http://kosalads.blogspot.com/2013/05/waitingfatal-error-watch-enospc.html" target="_blank">http://kosalads.blogspot.com/2013/05/waitingfatal-error-watch-enospc.html</a></li>
        <li><a href="http://www.codexpedia.com/javascript/increasing-the-memory-limit-in-node-js/" target="_blank">http://www.codexpedia.com/javascript/increasing-the-memory-limit-in-node-js/</a></li>
    </ul>
</aside>