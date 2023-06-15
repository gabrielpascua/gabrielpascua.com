---
layout: book
title:  "Learning Python, 5th Edition"
excerpt: ""
date:   2013-07-16
read: 2021-04-23
categories: books
book_url: https://www.oreilly.com/library/view/learning-python-5th/9781449355722/
book_image:
tags:
  - python
---


### Chapter 1. A Python Q&A Session

* Python is commonly regarded as a general purpose object-oriented scripting language.  It also has functional programming features

### Chapter 2. How Python Runs Programs

* Python has several implementation versions. Of which, CPython is the standard that comes with the language. Other flavors include Jython (Java), IronPython (.NET), Stackless (multi-threading) and PyPy (speed)
* Python can be packaged as a "frozen binary" one can run without any installation.  It's a stand-alone application that includes the runtime environment for portability, albeit file size is much larger.

### Chapter 3. How You Run Programs

In a (NIX) shell environment, you can execute a python file (.py) by

1. Running it as en executable: `chmod +x`, then `./test.py`. This requires shebang of which python executable version to use
2. Through the python executable program: `python test.py`

Python scripts executed from the command line can be piped to other programs

 
### Chapter 10. Introducing Python Statements

Statements unique to Python

* if -> elif -> else
* try -> except [ErrorType] -> else -> finally
* `raise Eception` to throw an error
* No switch-case statement
* Ternary is `A = Y if X else Z`
* `None` not `null`
* `pass` as the no-op keyword
* lambda `n = lambda x: x + 2` is `n(1)=3`

Use parentheses to enforce multi-line code

```py
x = (foo_bar_baz +
     bar_baz_foo +
     baz_foo_bar)
     
if (foo == bar and
    bar == baz and
    baz == foo):
        print('foo bar')
```

### Chapter 23. Module Coding Basics

* `import a, b, c` imports a, b, and c modules with all their public methods and/or properties
* `from moduleName import function` selective function import
* `from moduleName import *` to copy everything from the module
* module names cannot be the same as any reserved Python keyword
* File names generate namespaces

### Chapter 24. Module Packages

* A directory of python code is referred as a package and importing it is appropriately called package imports
* `import directory1.directory2.module` for module imports
* `from directory1.directory2.module import function` for property or method imports.  For packages that have deep nesting, this statement is more convenient because a change in package directory will not make you change your function calls outside of the declaration line.
* Up until Python v3.3., every directory leading up to the module must have a `__init__.py` file to initialize the package(s).  If included in v3.3.3, this file has higher precedence in Python's module matching search rules
* `from . import function` relative import. This is only applicable to packages and the `from` statement

### Chapter 25. Advanced Module Topics

* `_variableName` : Prefix variable names with underscore to prevent them from being imported in a `from moduleName import *` statement
* `__name__` returns the module's name
* `__name__ == __main__` to test if the module is ran as itself and not as an import. This is particulary helpful when writing initializations.


### Chapter 36. Designing with Exceptions

Toolset

* [PyChecker](http://pychecker.sourceforge.net/) for syntax checks
* [PyLint](https://www.pylint.org/) for syntax checks
* PyUnit for unit tests
* Eclipse, Komodo, NetBeans for IDE

### Chapter 41. All Good Things

> "If any person or program you need to work with uses such tools *[or any advanced programming constructs]*, they automatically become part of your required knowledge base too. ...

> The net effect of such over-engineering is to either escalate learning requirements radically, or foster a user base that only partially understands the tools they employ. This is obviously less than ideal for those hoping to use Python in simpler ways, and contradictory to the scripting motif.
"
