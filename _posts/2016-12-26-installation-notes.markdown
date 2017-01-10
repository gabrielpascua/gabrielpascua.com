---
layout: post
title:  "Inspiron 7548 Installation Notes"
excerpt: "Helpful links and system configuration"
date:   2016-12-26 18:40
categories: notes
tags: 
---

### System
Supported Grub Resolution : `1280x1024x32`, `800x600x32`  
Desktop Resolution : `3840x2160`  
[Dell Support Page](http://www.dell.com/support/home/us/en/4/product-support/servicetag/3CJS962/manuals)  
<br />

### Drive Partition
Note that the EFI System  is shared between the 2 OS

```

  Device      Size    Type
  /dev/sda1   450M    Windows recovery environment
  /dev/sda2   99M     EFI System
  /dev/sda3   16M     Microsoft reserved
  /dev/sda4   125.4G  Microsoft basic data
  /dev/sda5   85.8G   Linux filesystem
  /dev/sda6   11.9G   Linux swap

```
<br />

### Ubuntu 16.04
[Installing Git](https://git-scm.com/download/linux)  
[Setting up Ruby on Rails](https://gorails.com/setup/ubuntu/16.04)  
[Github Dependencies](https://pages.github.com/versions/)  
[Generating an SSH Key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)  
[Removing Ubuntu from Boot](http://www.everydaylinuxuser.com/2016/04/how-to-remove-ubuntu-from-computer-dual.html)  
[Installing Node via nvm](https://github.com/creationix/nvm#installation)  
[Installing .NET Core](https://www.microsoft.com/net/core#linuxubuntu)  
[Installing Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
<br />

### Windows 10
[Clock Mismatch with Ubuntu](http://lifehacker.com/5742148/fix-windows-clock-issues-when-dual-booting-with-os-x)  
[Photoshop and Illustrator on a 4K Monitor](http://www.danantonielli.com/adobe-app-scaling-on-high-dpi-displays-fix/)  
