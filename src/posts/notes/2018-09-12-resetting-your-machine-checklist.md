---
layout: post
title:  "Resetting Your Machine Checklist"
excerpt: "Setting up your machine after a fresh OS Install"
date:   2018-09-12 10:30
categories: notes
tags:
    - windows
    - ubuntu
---

## Windows 10

* Change BIOS Boot Order to use Ubuntu
* Download Chrome - Create Incognito Shortcut, Add UBlock Origin, Last Pass
* Windows Update
* Disable Unnecessary Live Tiles
* Set `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation` New DWORD 32 Bit Value to 1 for synching time
* Disable Cortana `HKEY_LOCAL_MACHINE > SOFTWARE > Policies > Microsoft > Windows > Windows Search > AllowCortana` new DWORD 32 Bit Value to 0
* Firefox, start in Private mode, UBlock Origin, Last Pass, Epub Reader
* 7Zip https://www.7-zip.org/
* Visual Studio Code - https://code.visualstudio.com/
* Git - https://git-scm.com/
* nvm-setup https://github.com/coreybutler/nvm-windows/releases, Use cmd
* Bitbucket and Github SSH Keys https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html#SetupanSSHkey-ssh1SetupSSHforGitonWindows
* BleachBit https://www.bleachbit.org/download/windows

## Ubuntu 18.04

* Install updates, Change Dock position
* Set the display to scale at 200% to match Windows
* Update grub resolution `sudo gedit /etc/default/grub` to `GRUB_GFXMODE=800x600x32`
* Download Chrome - Create Incognito Shortcut, Add UBlock Origin, Last Pass
* Start Chrome in incognito `sudo gedit google-chrome.desktop` new window action to `Exec=/usr/bin/google-chrome-stable --incognito`
* Firefox, start in Private mode, UBlock Origin, Last Pass, Epub Reader
* Visual Studio Code - https://code.visualstudio.com/
* `sudo apt-get install curl`
* nvm-setup https://github.com/creationix/nvm#installation
* Bitbucket and Github SSH Keys
* BleachBit https://www.bleachbit.org/download/linux