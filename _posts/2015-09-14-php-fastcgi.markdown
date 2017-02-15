---
layout: post
title:  "PHP on FastCgi using PhpFarm"
excerpt: "PHP on FastCgi using PhpFarm"
date:   2015-09-14 12:00
categories: notes
tags: linux, ubuntu 14.04
---

How to run different PHP versions on one machine.

{% highlight shell linenos %}
$ sudo -i

# Disable the php5 module:
$ a2dismod php5
$ service apache2 restart

$ apt-get install build-essential git apache2-mpm-worker libapache2-mod-fastcgi php5-fpm
$ apt-get build-dep php5
$ git clone https://github.com/cweiske/phpfarm.git /opt/phpfarm

# Download the .bz2 php version from
# http://museum.php.net/php5/
# and save it /opt/phpfarm/src/bzips

# Enable pdo_mysql and other php modules by creating a compile options file
$ cd /opt/phpfarm/src
$ touch custom-options-[PHPMAJOR-MINOR-REVISION].sh
$ gedit custom-options-[PHPMAJOR-MINOR-REVISION].sh
    # Copy, paste and save:
        > configoptions="--disable-debug \
        > --enable-short-tags \
        > --with-pear \
        > --enable-bcmath \
        > --enable-calendar \
        > --enable-exif \
        > --enable-ftp \
        > --enable-mbstring \
        > --enable-pcntl \
        > --enable-soap \
        > --enable-sockets \
        > --enable-wddx \
        > --enable-zip \
        > --with-zlib \
        > --with-gettext \
        > --enable-pdo \
        > --with-pdo-mysql \
        > --enable-cgi \
        > --enable-json \
        > --with-curl \
        > --with-openssl \
        > --enable-openssl \
        > --with-mysql \
        > --enable-mysql \
        > --with-config-file-path=/opt/phpfarm/inst/php-[PHPMAJOR-MINOR-REVISION]/lib/ \
        > "
$ ./compile.sh [PHPMAJOR-MINOR-REVISION]

$ a2enmod actions fastcgi alias
$ service apache2 restart
$ cd /var/www/cgi-bin
$ touch php-cgi-[PHPMAJOR-MINOR-REVISION]
$ gedit php-cgi-[PHPMAJOR-MINOR-REVISION]
    # Copy, paste and save
    > #!/bin/sh
    > PHP_FCGI_CHILDREN=3
    > export PHP_FCGI_CHILDREN
    > PHP_FCGI_MAX_REQUESTS=50000
    > export PHP_FCGI_MAX_REQUESTS
    > exec /opt/phpfarm/inst/bin/php-cgi-[PHPMAJOR-MINOR-REVISION]

# Change the permissions:
$ chmod 744 php-cgi-[PHPMAJOR-MINOR-REVISION]
$ chown www-data php-cgi-[PHPMAJOR-MINOR-REVISION]
$ chgrp www-data php-cgi-[PHPMAJOR-MINOR-REVISION]

$ gedit /etc/apache2/apache.conf
    # Add these lines before the Include directives:
    > #php-cgi setup
    > #used for multiple php versions
    > FastCgiServer /var/www/cgi-bin/php-cgi-[PHPMAJOR-MINOR-REVISION]
    > ScriptAlias /cgi-bin-php/ /var/www/cgi-bin/

    # Edit your VirtualHost entries to use fastcgi
    > &lt;VirtualHost&gt;
    >  ...
    >  &lt;Directory /&gt;
    >    ...
    >    Options FollowSymLinks
    >    AllowOverride All
    >    AddHandler php-cgi .php
    >    Action php-cgi /cgi-bin-php/php-cgi-[PHPMAJOR-MINOR-REVISION]
    >    Require all granted
    >  &lt;/Directory&gt;
    > &lt;/VirtualHost&gt;

$ service apache2 restart

# Repeat Steps 7 down to add additional php versions
{% endhighlight %}

<aside>
    <h4>References:</h4>
    <ul>
        <li><a href="http://museum.php.net/php5/" target="_blank">http://museum.php.net/php5/</a></li>
        <li><a href="http://thejibe.com/blog/14/02/phpfarm" target="_blank">http://thejibe.com/blog/14/02/phpfarm</a></li>
        <li><a href="http://serverfault.com/questions/652429/how-do-i-install-another-version-of-php" target="_blank">http://serverfault.com/questions/652429/how-do-i-install-another-version-of-php</a></li>
        <li><a href="https://gist.github.com/jbinfo/d297fcfdb151e25a299c" target="_blank">https://gist.github.com/jbinfo/d297fcfdb151e25a299c</a></li>
        <li><a href="http://stackoverflow.com/questions/26028229/issue-activating-a-php-extension-using-php-farm" target="_blank">http://stackoverflow.com/questions/26028229/issue-activating-a-php-extension-using-php-farm</a></li>
    </ul>
</aside>