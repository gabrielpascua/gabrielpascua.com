---
layout: book
title:  "Murach's Python Programming"
excerpt: ""
date:   2016-12-13
read: 2021-03-29
categories: books
book_url: https://www.murach.com/shop/murach-s-python-programming-detail
book_image: 
tags:
  - python
---


### 1 An introduction to Python programming
* Python's source code is compiled by an interpreter into bytecode that runs on a Python Virtual Machine - its runtime environment. This virtual environment makes python platform (OS) independent.
* popular IDE's include PyCharm, Eclipse with pyDev plugin, IDLE shell


### 4 How to define and use functions and modules

**Functions**

* prefix function declrations with `def`
* Python uses the `main()` function convention for bootstrapping a program (.py) file. The function is ignored if imported from another module.

```py
#!/usr/bin/env python
"""
hello world docstring
"""
def test():
    print("hello world")

def main():
    test()

if __name__ == "__main__":
    main()
```

**Modules**

* Use 3 double quotes aka `docstring` for module and function documentation
* Import statements for a python module named `temperature.py`

```py
# imports the file and assigns to a "temperature" namespace
import temperature

# imports functions from Python's built-in math module
import math

# imports the file and sets a defined "temp" namespace
import temperature as temp

# imports a named function which can be called directly
from temperature import function1

# imports the Temperature class
from temperature import Temperature

# imports all named functions that can be called directly
from temperature import *


```

### 14 How to define and use your own classes

**Class definition conventions**

* Class declaration: `class MyClass`
* Constructor: `def __init__(self[,args]):`
* Public property: `self.publicProp = "public"`
* Private property: `self.__privateProp = "private"`
* Public method: `def doSomething():`
* Getters and Setters:

```py
class Foo:
    def __init__(self):
        self.__bar = 1
    
    #getter
    @property
    def bar(self):
        return self.__bar
    
    #setter
    @bar.setter
    def bar(self, value):
        self.__bar = value;
```


### 15 How to work with inheritance

**Super class**

```py
class Foo:
    def __init__(self):
        self.__bar = 1
        
    def bar():
        return self.__bar

```

**Sub class**

```py
class Baz(Foo):
    def __init__(self, Foo):
        Foo.__init__(self)
        
    def baz():
        Foo.bar()

```

**Instance Checks**

```py
from objects import Foo, Baz

def main():
    foo = Foo();
    baz = Baz();
    
    if isinstance(baz, Foo):
    	print("is Foo")
    else:
    	print("not Foo")
```