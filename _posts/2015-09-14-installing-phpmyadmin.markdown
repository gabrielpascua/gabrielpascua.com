---
layout: post
title:  "Installing PhpMyAdmin"
excerpt: "Installing PhpMyAdmin"
date:   2015-09-14 13:00
categories: notes
tags: linux, ubuntu 14.04
---

It's too bad Sequel Pro is not available to Ubuntu.  I didn't think SQuirreL SQL's GUI was usable but I've had ok experiences with PhpMyAdmin.

<pre>

    $ sudo -i

    $ apt-get phpmyadmin

    $ gedit /etc/apache2/apache2.conf

    # Add this at the very last line then save your changes:
    > Include /etc/phpmyadmin/apache.conf

    # Enable the  php dependencies
    $ gedit /opt/phpfarm/inst/php-[MAJOR-MINOR-PATCH]]/lib/php.ini

        # Enable these extensions:
            > extension="/usr/lib/php5/20121212/mysqli.so"
            > extension="/usr/lib/php5/20121212/mcrypt.so"

    $ service apache2 restart

</pre>

<aside>
    <h4>References:</h4>
    <ul>
        <li><a href="https://help.ubuntu.com/community/ApacheMySQLPHP" target="_blank">https://help.ubuntu.com/community/ApacheMySQLPHP</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Comparison_of_database_tools" target="_blank">https://en.wikipedia.org/wiki/Comparison_of_database_tools</a></li>
    </ul>
</aside>