---
layout: post
title:  "Lowering the 4K Login Screen Resolution Down to 1920x1080"
excerpt: "Lowering the 4K Login Screen Resolution Down to 1920x1080"
date:   2015-09-14 00:00
categories: notes
---

My laptop's graphics card is a dedicated 4GB AMD Radeon R7 M270.  The native resolution is 3840x2160 (16:9). On a 15-inch monitor, everything on the Ubuntu login is tiny.  I needed to adjust the settings to a supported legible resolution.

<pre>

    # Mind the connected display from the console output
    $ xrandr -q

    $ sudo gedit /etc/lightdm/lightdm.conf
    # Set these configuration options:
     > [SeatDefaults]
     > display-setup-script=xrandr --output eDP1 --primary --mode 1920x1080

    # Where:
    # eDP1 is the connected display
    # 1920x1080 is the working resolution

    # restart

</pre>

<aside>
    <h4>References:</h4>
    <ul>
        <li>
            <a href="http://askubuntu.com/questions/73804/wrong-login-screen-resolution" target="_blank">http://askubuntu.com/questions/73804/wrong-login-screen-resolution</a>
        </li>
    </ul>
</aside>