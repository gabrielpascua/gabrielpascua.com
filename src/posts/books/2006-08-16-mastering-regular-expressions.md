---
layout: book
title:  "Mastering Regular Expressions"
excerpt: "Mastering Regular Expressions Third Edition"
date:   2006-08-16
read: 2019-02-25
categories: books
book_url: http://shop.oreilly.com/product/9780596528126.do
book_image: 
tags:
---

## 1 Introduction to Regular Expression
* `^` start of a line. Inside a `[]` character class, it negates the character listed - `r[^ae]d` matches `rod` but not `red`
* `$` end of a line
* `[...]` will match any characters enclosed. `b[ea]t` will match `bet` or `bat`, but not `beat`
* `-` inside a `[]` signals a range as in `[0-9]` unless it's the first character inside the brackets.
* `.` is a placeholder. `5.5.2005` matches `5/5/2005`, `5-5-2005` or `5.5.205`
* `|` is for alternation. Used with `()`, it limits the matches to within the parenthesis.  `g(re|o|lo)at` matches `great`, `goat`, and `gloat`
* `(?:)` signals a non-capturing group
* A character class `[]` can only match a single character, whereas alternation `(...|...)` can have more.
* A character class can be negated, but not an alternation.
* `\b` for word boundary matching the start or end of a word;  and `\B` for non word boundary matches everything inside the start and end of a word. `e{2}\w\b` in `needing a reed` will match `reed`, while `e{2}\w\B` will match `needing`.

### Quantifiers `?,+,*` 
* `?` signals an optional item.  `brakes?` matches `brake` and `brakes`.  
* `*` match as many times as possible or nothing (greedy) at all. `/<h1 *>/` matches `<h1>` and `<h1   >`
* `+` match as many times as possible, at least once. `/<h1 +>` matches `<h1   >`
* `{min, max}`, or `{3}` for exactly 3 instances, or `{4,}` for at least 4

## 4  The Mechanics of Expression Processing

### Platforms, Engines, and Matching rules
Different platforms or programming languages use different RegEx engines (DFA, NFA).  Each will have their quirks when matching.  The only 2 universal rules between them are:
* leftmost match wins
* quantifiers are greedy

### Backtracking
Backtracking describes how regex attempts to match a string when optional quantifiers `?`, `*`, or `+` are presented.  Take searching for `.*es` in the string `regular expressions`. The first pass from the regex engine will match the whole string because of `.*`.  It will then "backtrack" (LIFO) starting at the end of the string until it reaches `regular expr`.  The next cycle will return a match at this point.  It is worth noting that backtracking is an expensive operation and at its worst it is exponential in O(2^n) complexity.  Without backtracking, a typical regex matching lookup is linear O(n).

## 5  Practical Regex Techniques

### Regex Balancing Act
Crafting a regular expression requires balance between readability, efficiency and when to be greedy.  A sloppy expression is acceptable when working with command line tools or file system searches, but not in a parsing algorithm.  Take `[\d]{1,3}.[\d]{1,3}.[\d]{1,3}.[\d]{1,3}` that matches an IP addresses, including an invalid value of `999.999.999.999`.  It can be written so it only matches below `255.255.255.255` but at the expense of making it manageable.  Ask yourself if the added complexity is worth adding or are you better off offloading the IP validation task to a different part of your program.

## 6 Crafting an Efficient Expression
* Use the shorthand `\w`, `\d`, and such when possible.  These are often used constructs that programming languages may have a way to speed up the match.
* If what you're trying to match has a minimum or maximum length, take advantage of the `{min,max}` options for the engine to disregard anything that doesn't meet the length requirement
* Use the non-capturing parenthesis when possible for the engine to avoid saving state
* Be specific - if what you're searching for starts with known characters, use `^` . Same thing if it ends with known characters, use `$`.  
* Factor out required parts.  `th` is required, thus `th[is|at]` is better than `this|that`.  

## Recipes
* `"[^"]*"` matches anything inside double quotes.  The beginning and ending `"` marks the scope while `[^"]*` captures any number of characters in it except a double quote
*  ` ?<[^>]*> ?` grabs all HTML tags. The leading and trailing `?` marks the spaces before and after the tags for replacing it with a space. This is not appropriate in a production system because it captures an incomplete markup when the string is `<input type="radio" value=">5" />`
* `^.*\/` capture the text after the last `/` in a url - using backtracking
