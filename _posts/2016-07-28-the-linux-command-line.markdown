---
layout: book
title:  "The Linux Command Line"
excerpt: "The Linux Command Line - Third Internet Edition"
date:   2016-07-28
categories: books
book_url: https://www.nostarch.com/tlcl.htm
book_image: /img/the-linux-command-line-360x476.jpg
tags: ops shell
---

### Useful Shell Commands
<p></p>
```

    printenv | less # display all the environment variables
    set | less # same as above but includes shell variables sorted alphabetically
    > test.txt # create a new file
    ls -l /bin/usr > ouput.txt 2>&1 # write stdout and stderr to output2.txt
    ls -l $(which node) # displays information about a command
    mkdir {2007..2009}-{01..12} # create folders from year 2007 to 2012. 
    history | grep docker # searches for docker commands in history
    !3 # displays the 3rd item in bash's command history
    kill -l # list all supported signals
    source .bashrc # forces bash to re-read the file
    . .bashrc # same as above, where . is the same as source
    find ~ -type f -name "*.JPG" -delete # searches for jpeg files and deletes them
    ls -l /etc | gzip > foo.txt.gz # compress a folder
    ssh REMOTE 'tar cf - REMOTE_FOLDER | tar xf - # transfer files from a remote server
    grep -i '^j' /usr/share/dict/words # search dictionary for words starting with j
    cat -A foo.txt # output non-printing characters like tabs and spaces
    cat -ns test.txt > testwithnumbers.txt # add line numbers to a text file
    sort file1.txt file2.txt file3.txt > sorted.txt # creates 1 sorted file
    [[ -d DIRECTORY ]] || mkdir DIRECTORY # check a directory, create it if not found 
    basename FILEPATH # to extract the filename from a specified path

```
<p></p>

### Introduction
* "graphical user interfaces make easy tasks easy, while command line interfaces make difficult tasks possible"
* command line knowledge is akin to knowledge of sql, it lasts a long time because the technology has survived the test of time
<p></p>

### Part 1 – Learning The Shell
<p></p>

#### 1 – What Is The Shell?
* BASH - Bourne Again because it's supposed to be an enhanced replacement for `sh` written by Steve Bourne
* Terminal emulators like the `terminal` application (interacts with or gives access) to the shell program `bash` but isn't really the shell itself.
* If the shell prompt starts with a `#`, it means your session has superuser privileges
* `cal 2017` to display a calendar
<p></p>

#### 2 – Navigation
* `cd -` switch to the previous working directory
* `cd ~user_name` switch to the home directory of said user
* Linux has no concept of file extensions. The contents of files are determined by other means.  You can name your files however you want.
* Recommended to use underscore in favor of spaces for file names
<p></p>

#### 3 – Exploring The System
* Most commands follow this syntax `command -options arguments`
* `ls . / /var` to list 3 directories
* `file <FILENAME>` to determine the file type - note 3rd point on Chapter 2
* `less <FILENAME` to page through contents of a file
<p></p>

#### 4 – Manipulating Files And Directories
* `ls -li` to show hard links
<p></p>

#### 5 – Working With Commands
* `alias name='string'` to create an alias, and `unalias ALIAS_NAME` to remove it
* `alias` to list all the environment alias
<p></p>

#### 6 – Redirection (and Pipelines)
* There are always 3 files open when you work in the shell - (1) `stdin` for the keyboard (2) `stdout` for the screen and (3) `stderr` for error messages sent to the screen.
* Unix maintains "everything is a file".  The same is true for results of shell commands, only their outputs and errors are sent to `stdout` (Standard Output) and `stderr` (Standard Error) respectively but both are connected to your terminal screen.  I/O Redirection works by passing along shell outputs to a different program other than the terminal (like a text file) using the `>` symbol creating another file as an end result.
* `> FILENAME` faster way of creating a new file than using `touch FILENAME`
* Use `>>` when appending results to a file
* `ls -l /bin/usr > ls-output.txt 2>&1` Redirects stdout and stderr to the same file where `&1` means use the file descriptor 1 `ls-output.txt`.  The order of commands is important for obvious reasons.  More recent bash versions support this shorter version `ls -l /bin/usr &> ls-output.txt`
* To dispose unwanted output you can redirect it to `/dev/null`.  It's a system bit bucket that does nothing to its input
* `cat > FILENAME.EXT` to save typed text in the terminal to a file.  You must `Ctrl + d` at the end of editing.
* The use of pipes are usually associated to filtering
* `tail -f FILENAME` allows you to view file changes real time
* `tee` copies results to both `stdout` and a file.  This can be a good strategy to inspect changes before it happens like in `ls /usr/bin | tee ls.txt | grep zip`
<p></p>

#### 7 – Seeing The World As The Shell Sees It
* Expansion is the process that expands an expression (like wildcards) before the shell acts on it.  Although the next points below uses `echo`, expansion works on (almost??) all shell commands.
* `echo *` Pathname expansion where `*` translates to everything in the current directory. It is suppressed when the expression is wrapped in double quotes.
* `echo ~` Tilde expansion that prints the path of the current user's home directory. It is suppressed when the expression is wrapped in double quotes.
* `echo $((2+2))` - Math expansion, requires double parentheses. It still works when the expression is wrapped in double quotes.
* `echo {1..9}` - Brace expansion that generates a set of of items from the given pattern.  It is suppressed when the expression is wrapped in double quotes.
* `echo $USER` - Parameter expansion that outputs the `USER` environment variable. It still works when the expression is wrapped in double quotes. 
* `echo $(ls)` - Command substitution. It prints the results of `ls`. Older shell programs uses back quotes instead of `$()` syntax. It still works when the expression is wrapped in double quotes.
* Suppressing expansions
    - `echo "1+1 =          $((1+1))"` Double quotes suppresses some expansions
    - `echo '1+1 =          $((1+1))'` Single quotes suppresses all expansions
<p></p>

#### 8 – Advanced Keyboard Tricks
* Tab completion works on path names, environment variables, user names, and hostnames (some caveats at least in Ubuntu) if it is listed in `/etc/hosts`
<p></p>

#### 9 – Permissions
* `id` finds out information about your identity
* User related folders
    - `/etc/passwd` for user accounts
    - `/etc/group` for user groups
    - `etc/shadow` for passwords and account expiration
* Symbolic links have dummy permissions. The target file has the right permission.
* Page 118 has some good explanation on octal vs hex vs decimal number systems
* Although there are a lot of similarities, `sudo` does not start a new shell nor load a user's environment unlike `su`.
<p></p>

#### 10 – Processes
* `top` displays a list of running processes updated every 3s. Press `h` for help and `q` to quit.
* Put a `&` after a command to run it in the background.  A background process ignores keyboard input.  Use `jobs` to see a list then `fg %JOB_NUMBER` to return the process to the foreground, then `bg %JOB_NUMBER` to put it back to the background.
* `Ctrl-c` sends a `INT` (interrupt) signal, `Ctrl-z` sends a `TSTP` (Terminal Stop).
* Common signals that you can use when using `kill`.  You can use the number, name or the name prefixed with `SIG`.  Use `kill -l` to view a list of signals.
* Use `killall` to send signals to multiple processes
<p></p>

### Part 2 – Configuration And The Environment
<p></p>

#### 11 – The Environment
* `^X` at the footer when you run `nano FILENAME` indicates the use of `Ctrl` in combination with the character.
<p></p>

#### 12 – A Gentle Introduction To vi
* The lack of graphical interface in some Unix systems encourages the use of `vi` because it is universal (POSIX standard)
* `vi` is derived from "visual" intended to allow editing on a video terminal
* If you get lost in `vi`, pressing Esc twice should help you out
* `vi` runs on different modes. At startup it is configured to run on *command mode*.  That's why you have to press `i` to enter into *insert mode*
<p></p>

#### 13 – Customizing The Prompt
<p></p>

### Part 3 – Common Tasks And Essential Tools
<p></p>

#### 14 – Package Management
* Low-level tools (dpkg for Debian, rpm for Fedora) takes care of install/uninstall while High-level tools (apt-get for Debian, yum for Fedora) perform metadata searching and dependency resolution.
<p></p>

#### 15 – Storage Media
* Unmounting entails moving the buffer to the device so it can be safely removed mitigating chances of corruption
* `genisoimage -o FILENAME.iso -R -J ~/DIRECTORY` creates a disc image from a directory
* Mounting an image  
  ```

    mkdir /mnt/iso_image    # create a mount point
    mount -t iso9660 -o loop FILENAME.iso /mnt/iso_image
  
  ```

<p></p>

#### 16 – Networking
* When `ping`'ed, a properly working network should have 0 packet loss
* Use `netstat` to examine various network settings 
<p></p>

#### 17 – Searching For Files
* `locate STRING` searches for files and pathnames. The database it searches for relies on a cron that runs `updatedb`.  When search is out of sync, one can run `updatedb` first.
* `find DIRECTORY (EXPRESSION) -LOGICAL_OPERATOR (EXPRESSION)` searches for files in a directory with filters.  Supported `find` size units are `b` default for 512-byte blocks, `c` for Bytes, `w` for 2-byte words, `k` for Kilobytes, `M` for Megabytes, `G` for Gigabytes
* `xargs` accepts input from standard input and uses it as argument for the piped command. `find . -type f -name '*git' -print | xargs ls -l` finds all the files with `git` in its name on the current directory and passes it along `ls` for more details.
<p></p>

#### 18 – Archiving And Backup (using Lossless Compressions)
* Data compression is the process of removing redundant data.  Compression algorithms fall into 2 categories:
    - Lossless preserves all the all the information of the uncompressed version during compression creating an identical match of the original on restore    
    - Lossy removes data during compression to allow for more compression creating a close approximation of the original when restored.  Examples are JPEG and MP3 compressions.
* `gzip` deletes the file and creates a compressed version of the original.  `gzip FILE` to compress, `gunzip FILE` to uncompress and assumes that `FILE` ends with `.gz` so `gunzip file1.txt.gz` is the same as `gunzip file1.txt`
* `bzip` and `bunzip` is similar to gzip but with a different algorithm
* Archiving is the process of bundling files together
* `tar` (short for tape archive) is the most common tool for archiving in Unix. 
    - It follows `tar mode[options] pathname` syntax. 
    - An important note is `tar` paths are created relative to your current directory during extraction.  If you ran `tar` on the `~` folder then extract it on `/`, the output will be `/home/myaccount/TAR_CONTENTS`.  So remember to `cd` into a folder first if you plan to restore files that match the directory structure of the original.
    - You can gzip a tar by adding the `z` option, e.g. `tar czf TARFILE.tgz .`
    - You can pipe `find` results e.g. `find ~/Downloads -name 'file-A' | tar czf
downloads.tgz -T -` where the trailing slash means the output of the `find` command piped as standard input, or "use standard input for the input file."
* `zip` is both compression and archiving tool.  Use with `unzip`.  Can be piped to and understands the trailing dash argument like `tar`.  Mainly used for Windows interoperability.
* `rsync` syncs local and remote (and possible combinations except remote to remote) directories.  Syntax is `rsync options source destination`
<p></p>

#### 19 – Regular Expressions
* Unix systems supports POSIX standard regular expressions, POSIX Character classes like `[:word:]`, and Extended Regular Expressions (use of pipes for alternation) 
* `grep` is global regular expression print.  Syntax is `grep [options] regex [file...]`
<p></p>

#### 20 – Text Processing
* You can use `sort` to order contents of standard input into standard output.  You can also merge multiple files into one sorted file.  When referencing columns, `sort` uses tabs and spaces as delimiter for fields by default or you can use `-t` option to specify your own separator character.
* `uniq` only removes duplicates from adjacent lines.  You need to have your input sorted first before it can be ran.
* `cut -f 3 -d '^' distros.txt | cut -c 7-10` - `cut` is piped here to further text extraction from the 7th to 10th character of the first output
* `paste` and `join` allows you to add contents to a file  
* `comm -OPTION[1|2|3] file1.txt file2.txt` for simple file comparisons and `diff` for more complex ones. You can use `patch` in conjunction with `diff` to resolve differences.
* Use `tr` (transliterate) for simple search and replace and `sed` for more complex tasks.  Both works with standard input and output with `sed` providing so much more options
* Use `aspell` to check for spelling errors interactively
<p></p>

#### 21 – Formatting Output
* `nl FILENAME` to print numbered lines
* `fold` wraps lines of text to a specified length and `fmt` performing the same plus some more features.
* `pr` is used to paginate text 
<p></p>

#### 22 – Printing
* Back in heydays of impact printers, a US-Letter paper composed of 85 characters wide and 66 lines of  monospaced characters.  It explains why terminal displays are normally 80 characters wide.
<p></p>

#### 23 – Compiling Programs
* Most programs build follow the 2-command sequence `./configure` and `make`.  The former relies on the `Makefile`. Then to install a built program, run `make install`.
<p></p>

### Part 4 – Writing Shell Scripts
<p></p>

#### 24 – Writing Your First Script
* Use `755` with `chmod` for scripts that everyone can execute and `700` to limit to the owner
* The `PATH` variable values stores locations of executables that do not require reference to the folder when ran in the terminal.
* Local executables are recommended to be placed under `/usr/local`
<p></p>

#### 25 – Starting A Project
* The shebang `#!/bin/bash` line or the interpreter directive indicates the location of the interpreter to use, `/bin/bash` in this case, when the script is ran as a program.
* There should be no spaces when assigning values to variables in a script file, else it will not get picked up.  This `TITLE = "Test"` will result in the error `TITLE: Command not found` 
* All variables are treated as string unless you use `declare` with an `-i` option
* Wrap a variable in curly braces to avoid ambiguity. Assuming `USER` is "foo", `touch ${USER}1.txt` creates a file name `foo1.txt`.
* A Here Document is a form of redirection to feed a body of text or a code block into an interactive command like `cat`, `ftp`, or `grep`.  The most common use in a shell script is to preserve multiple lines of text, preserving double quotes, single quotes and tabs (if specified).  It uses an arbitrary token to indicate the start and end of the input.  
    ```

    #!/bin/bash
    TITLE="Hello World"

    # Use cat <<- HERETOKEN
    cat << HERETOKEN
    <HTML>
            <HEAD>
                    <TITLE>$TITLE</TITLE>
            </HEAD>
            <BODY>
                    <P>Title: "$TITLE"</P>
            </BODY>
    </HTML> 
    HERETOKEN

    ```
<p></p>

#### 26 – Top-Down Design
* Shell functions  
    ```
    
    function NAME_OF_FUNCTION { 
      commands #at least 1 command
      return #optional
    }

    #or the preferred method

    NAME_OF_FUNCTION() {
      commands
      return
    }

    # execute
    NAME_OF_FUNCTION

    ```
* Local function variables are preceded by `local` on declaration  
    ```
    
    funct_1 () {
      local foo # variable foo local to funct_1
      foo=1
      echo "funct_1: foo = $foo"
    }
    
    ```
* Shell functions are great replacement for the limits of aliases
<p></p>

#### 27 – Flow Control: Branching With if
* IF Syntax, where `[ EXPRESSION ]` is a shorthand for `test EXPRESSION` command.  Note that the space after the brackets are required. 
    - Short form: `if [ EXPRESSION ]; then COMMANDS; else COMMANDS; fi`
    - Long form:  
    ```
    
    if [ EXPRESSION ]; then
        COMMANDS
    elif [ EXPRESSION ]; then
        COMMANDS...
    else
        COMMANDS
    fi
    
    ```
* A `test` expression can be:
    - File expression `if [ -e FILE ]; then ...` if file exists
    - String expressions`if [ -n STRING /> 0 ]; then..` if a string is not empty. Note the use of backslash to avoid redirection when used with `test`
    - Integer expression `if [ 3 -eq 2 ]; then..` if integer 1 is equal to integer 2
* There are also compound commands to replace `test` expressions and is preferred for modern scripts because of its readability
    - If you want to use regular expressions you can use the compound command  
        `if [[ "hello" =~ ^[world+$ ]]]...` 
    - If you want to check for patterns, use the compound command  
        `if [[ "hello" == hell.* ]]; ...`
    - If you want to use math operators you can use the compound command `(( FOO > 0 ))`, where `FOO` is a variable but without the need to be prefixed with a `$` sign
* Differences when combining expressions between `test` and compound commands  
    ```

    |  operator  | test | compound |
    |------------|------|----------|
    |     AND    |  -a  |    &&    |
    |     OR     |  -o  |    ||    |
    |     NOT    |   !  |    !     |

    ```

* If a variable can have a null value, you can wrap it in double quotes within your expression to fallback to an empty string, e.g. `if [[ "$int1" == 1 ]];` 
* Every command has its exit code. A value of `0` indicates that the command executed and a greater value meant an error occurred.  You can assign your own non-zero value to indicate an error in your function or when your `IF` conditions fail.  You can pick up the exit code value from `$?`.  Use this to your advantage in your shell script to check whether a command ran properly:  
    ```
    
    #!/bin/bash
    cd ~/Downlooads
    if [[ $? > 0 ]]; then
      echo "no such directory"
    fi
    
    ```
<p></p>

#### 28 – Reading Keyboard Input
* You can use `read` in your shell file to listen for a keyboard input. If you did not explicitly assign a variable (`int1` in the example below) for the input, the value will be assigned to `$REPLY` by default.
    ```

    #-n suppresses the trailing new line
        echo -n "Enter an integer "

    # Or read int1 int2 int3 if expecting multiple inputs
    read int1

    # Or use the -p for prompt option to replace the first 2 lines
    # -i supplies 1 as the default value 
    # read -e -p "Enter an integer " -i 1 int1

    echo $int1

    ```
* `read` cannot be piped to
<p></p>

#### 29 – Flow Control: Looping With while / until
* While loop uses the same expressions as `IF` and its syntax is `while EXPRESSION; do COMMANDS; done`.  You can use the `break` keyword to exit out.
* `until` is the opposite of `while`. `while [[ $count <= 5 ]]` is the same as `until [[ $count > 5 ]]`
<p></p>

#### 30 – Troubleshooting
* Activate bash tracing by adding `-x` in your directive `#!/bin/bash -x`
<p></p>

#### 31 – Flow Control: Branching With case
* Case example
    ```

    cd ~/Downloadss

    case $? in
    0) echo "Directory found."
        exit
        ;;
    *) echo "No such directory."
        exit 1
        ;;
    esac

    ```
<p></p>

#### 32 – Positional Parameters
* Whenever you run a command, the shell creates a set of variables called positional parameters to represent every word in the command.  By default it gives you `$0` to `$9` where `$0` always represent the name of the command you ran. 
* For parameters greater than 9, you have to wrap the number in braces, e.g. `${10}`
* Use `$#` to determine the number of arguments
* If the arguments are too large such as in the case when an `*` is used, you can run a `while` loop against `$#` and use `shift` to move an argument up one at a time, e.g. `$2` to `$1`, `$3` to `$2`
* Use `$*` or `$0` to capture arguments at once.  If there are 2 command arguments where one argument consists of 3 words and the other 1 word, 
    - `$*` will split the arguments from 1-4 and `"$*"` will combine all 4 into 1 
    - `$@` will split the arguments from 1-4 and `"$@"` will split it into 2 matching the command executed
<p></p>

### 33 – Flow Control: Looping With for
* Traditional `for` example
    ```

    # for i in A B C D;
    # for i in ARRAY_VARIABLE
    for i in {A..D}; do 
      echo $i; 
    done

    ```
* `for` in C Language form
    ```

    for (( i=0; i<5; i=i+1 )); do
      echo $i
    done

    ```
<p></p>

#### 34 – Strings And Numbers
* Wrap variables in braces if you intend to use it next to a string, e.g. `${VAR}_string`
* Assigning default values to variables:
    - `echo ${VARIABLE:-VALUE}`, variable is unchanged and just uses the given value
    - `echo ${VARIABLE:=VALUE}`, assigns value to the variable
    - `echo ${VARIABLE:?VALUE}` throws an error if value is not supplied
    - `echo ${VARIABLE:+VALUE}` does nothing if empty, but uses the value without altering the variable if supplied
* Useful string functions:
    - `echo "${#foo} for character length"`
    - `echo "${foo:5:6} for substring"` 
    - `echo "$(foo#*.} removes the first word from file.txt.zip - before the dot"`
    - `echo "${foo%.*} removes the last word from file.txt.zip - after the dot"`
    - `echo ${foo//find/replace} #global find and replace`
* Use `declare -u upper|lower` to enforce variable casing
<p></p>

#### 35 – Arrays
* Declaring arrays
    ```

    a[0] = 1

    declare -a b    #indexed arrays
    b[0] = 0

    declare -A c    #keyed arrays
    c[key] = value

    d=(Su Mo Tu We Th Fr Sa)

    e=([0]=Jan [1]=Feb [2]=Mar)

    ```
* Printing array contents
    ```

    animals=("a dog" "a cat" "a fish")

    # Difference between array[*] and array[@]

    # both will print each word on its own line (6 total)
    for i in ${animals[*]}; do echo $i; done
    for i in ${animals[@]}; do echo $i; done

    # quoted, this prints in a single line
    for i in "${animals[*]}"; do echo $i; done

    # quoted, this prints 3 lines reflecting the number of items in an array
    for i in "${animals[@]}"; do echo $i; done

    ```
* `echo ${#ARRAY[@]}` to get the length of the array
* `echo ${#ARRAY[INDEX]}` to get the length of an array item
* `foo+=(d e f)` appends an item to the array
* `a_sorted=($(for i in "${a[@]}"; do echo $i; done | sort))` sorts an array into a new one
* Use `unset ARRAY` to delete an array or `unset 'ARRAY[INDEX]'` to delete an item - quoted to prevent expansion
* Newer bash versions support associated arrays
    ```

    declare -A colors
    colors["red"]="#ff0000"
    echo ${colors["red"]}
    
    ```
<p></p>

#### 36 – Exotica
* Combining commands using `{}` and `()` instead of multi-line approach
    - `{ cd ~; ls -l } > test.txt` - grouping- a space is required here. Commands are executed in its own shell. Preferred because of its shell handling.
    - `(cd ~; ls -l) > test.txt` - subshell. Commands are executed in a child copy of the current shell
* Process Substitution to capture values from a subshell.  - `read < <(echo "foo") #$REPLY is now "foo"`