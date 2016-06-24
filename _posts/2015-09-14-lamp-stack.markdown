---
layout: post
title:  "Setting the LAMP Stack"
excerpt: "Setting the LAMP Stack"
date:   2015-09-14 11:00
categories: notes
tags: linux, ubuntu 14.04
---

MAMP Pro makes it easy to set up local development environments. XAMP is a no-go because it doesn't have a feature to support different PHP versions out of the box. The safe choice for me if I had to install different PHP versions was to use what is native to the OS.

<pre>

    $ sudo apt-get update

    $ sudo apt-get install lamp-server^

    # Enable localhost:
    $ sudo gedit /etc/apache2/conf-available/fqdn.conf
    > ServerName localhost
    $ sudo a2enconf fqdn


    # Change the localhost's folder location:
    $ sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/local.conf

    $ sudo gedit /etc/apache2/sites-available/local.conf


    # Change the folder location path to where you want it to be
    $ sudo a2dissite 000-default && sudo a2ensite local

    $ service apache2 restart

</pre>

<aside>
    <h4>References:</h4>
    <ul>
        <li><a href="https://help.ubuntu.com/community/ApacheMySQLPHP" target="_blank">https://help.ubuntu.com/community/ApacheMySQLPHP</a></li>
    </ul>
</aside>