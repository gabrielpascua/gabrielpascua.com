---
layout: post
title:  "Increasing Grub's Font Size"
excerpt: "Increasing Grub's Font Size"
date:   2015-09-14 10:00
categories: notes
tags: linux, ubuntu 14.04
---

The recommended solution was to change the ttyl resolution but this is the quick and dirty fix.

{% highlight shell linenos %}
$ sudo grub-mkfont \
    --output=/boot/grub/grubfont.pf2 \
    --size=36 /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf

$ sudo gedit /etc/default/grub

# Copy and paste this line:
> GRUB_FONT=/boot/grub/grubfont.pf2

$ sudo update-grub

$ sudo reboot
{% endhighlight %}

<aside>
    <h4>References:</h4>
    <ul>
        <li><a href="http://b.wardje.eu/2014/08/increase-font-in-grub-for-high-dpi.html" target="_blank">http://b.wardje.eu/2014/08/increase-font-in-grub-for-high-dpi.html</a></li>
        <li><a href="http://askubuntu.com/questions/11846/changing-the-default-grub-font" target="_blank">http://askubuntu.com/questions/11846/changing-the-default-grub-font</a></li>
        <li><a href="http://forums.fedoraforum.org/showthread.php?t=276691" target="_blank">http://forums.fedoraforum.org/showthread.php?t=276691</a></li>
    </ul>
</aside>