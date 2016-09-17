---
layout: post
title:  "Bourne Again Shell Cheat Sheet"
excerpt: "Bourne Again Shell Cheat Sheet"
date:   2016-09-12 07:00
categories: notes
tags: unix
---

<p><h3>Keyboard Commands</h3></p>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
        <th></th>
        <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Double Tab</td>
        <td>Displays possible commands</td>
    </tr>
    <tr>
        <td>Ctrl-A</td>
        <td>Move to the beginning of the line</td>
    </tr>
    <tr>
      <td>Ctrl-E</td>
      <td>Move to the end of the line</td>
    </tr>
    <tr>
      <td>Ctrl-Left arrow</td>
      <td>Move backward a word</td>
    </tr>
    <tr>
      <td>Ctrl-Right arrow</td>
      <td>Move forward a word</td>
    </tr>
    <tr>
      <td>Ctrl-U</td>
      <td>Deletes from the cursor position to beginning of line</td>
    </tr>
    <tr>
      <td>Ctrl-K</td>
      <td>Deletes from the cursor position to end of the line</td>
    </tr>
    <tr>
      <td>\</td>
      <td>Escape characters ( cd My\ Documents )</td>
    </tr>
    <tr>
      <td>cd -</td>
      <td>Go back to the previous folder</td>
    </tr>
    <tr>
      <td>ls -h</td>
      <td>Show file size in kilobytes</td>
    </tr>
    <tr>
      <td>mkdir -p parent/sub/child</td>
      <td>Creates all 3 folders</td>
    </tr>
    <tr>
      <td>rm startswith?.txt</td>
      <td>Deletes files like startswith1.txt, startswith2.txt</td>
    </tr>
    <tr>
      <td>find DIR -name "*filename"</td>
      <td>Looks for files in a directory</td>
    </tr>
    <tr>
      <td>sudo -k</td>
      <td>Suspend root privileges</td>
    </tr>
    <tr>
      <td>cat FILE</td>
      <td>Output file in the terminal</td>
    </tr>
    <tr>
      <td>less FILE</td>
      <td>Peek and scroll to a file</td>
    </tr>
    <tr>
      <td>vi FILE --> i (insertion mode) --> ESC :q!</td>
      <td>Exit w/o save or :wq to save</td>
    </tr>
    <tr>
      <td>standard output (stdout)    : 1</td>
      <td>ls -al 1> output.txt</td>
    </tr>
    <tr>
      <td>standard error  (stderr)    : 2</td>
      <td>ls -al 2> errors.txt</td>
    </tr>
    <tr>
      <td>ls -al > output.txt</td>
      <td>Creates a new file</td>
    </tr>
    <tr>
      <td>ls -al >> output.txt</td>
      <td>Appends to a file</td>
    </tr>
  </tbody>
</table>
<br /><br />
<p><h3>Octal File Permissions</h3></p>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th></th>
      <th>Read (4)</th>
      <th>Write (2)</th>
      <th>Execute (1)</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>User</td>
      <td>r</td>
      <td>w</td>
      <td>x</td>
      <td>7</td>
    </tr>
    <tr>
      <td>Group</td>
      <td>r</td>
      <td>-</td>
      <td>x</td>
      <td>5</td>
    </tr>
    <tr>
      <td>Others</td>
      <td>r</td>
      <td>-</td>
      <td>-</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
