---
layout: post
title:  "Installing Node 4.0.0"
excerpt: "Installing Node 4.0.0"
date:   2015-09-14 14:00
categories: notes
tags:
  - linux
  - ubuntu 14.04
---

A stable Node 4.0.0 was just released 3 days ago.  iojs and node are finally 1.

{% highlight shell linenos %}
$ sudo -i

# Remove any node installation in your system:
$ dpkg --get-selections | grep node
$ apt-get remove --purge node

$ apt-get install nodejs
$ apt get install npm

# Install nvm globally to manage node versions:
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | NVM_DIR=/usr/local/nvm bash

# Locate the node version you want to install:
$ nvm ls-remote

# Install it:
$ nvm install [NODE VERSION]

# Set a default node version:
$ nvm alias default [NODE VERSION]

# Add this to your .bashrc file to pick up the system node then restart bash:
> export NVM_DIR="/usr/local/nvm"
> [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

# Verify your node version:
$ node --version


# Troubleshooting:
# Some dependencies refer to your /usr/bin/node version
$ rm -r /etc/alternatives/node
$ ln -s /usr/local/nvm/versions/node/[NODE VERSION]/bin/node /etc/alternatives/node
$ rm -r /usr/bin/npm
$ ln -s /usr/local/nvm/versions/node/[NODE VERSION]/bin/npm /usr/bin/npm

# Original node: /usr/bin/nodejs
# Original npm: /usr/lib/node_modules/npm/bin/npm-cli.js
{% endhighlight %}

<aside>
    <h4>References:</h4>
    <ul>
        <li><a href="http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/" target="_blank">http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/</a></li>
        <li><a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server" target="_blank">https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server</a></li>
        <li><a href="https://github.com/creationix/nvm" target="_blank">https://github.com/creationix/nvm</a></li>
    </ul>
</aside>