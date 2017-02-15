---
layout: post
title:  "Some Possible Uses of Array.prototype.reduce()"
excerpt: "Some Possible Uses of Array.prototype.reduce()"
date:   2016-08-05 08:13
categories: notes
tags: javascript
---

#### Math Functions
<p></p>
{% highlight javascript linenos %}
var arr = [7,2,3,4];
var total = arr.reduce(function(previous, current, idx){
    return previous + current;
}, 4); 
//total = 20  
{% endhighlight %}
<p></p>

#### String Manipulation
<p></p>
{% highlight javascript linenos %}
var words = ["hello", "world"];
var phrase = words.reduce(function(previous, current, idx){
    return previous + ' ' + current;
}, "Hi"); 
//phrase = "Hi hello world"
{% endhighlight %}
<p></p>

#### Grouping Results
<p></p>
{% highlight javascript linenos %}
var cities = [{name: 'NY'}, {name: 'NY'}, {name: 'LA'}]
    .reduce(function(accumulator, current, idx){
        if(!accumulator[current.name]){
            accumulator[current.name] = 1;
        }else{
            accumulator[current.name]++; 
        }
        return accumulator;
    }, {});
//cities = {"NY":2,"LA":1}
{% endhighlight %}
<p></p>

#### Get Unique Values From a Collection
<p></p>
{% highlight javascript linenos %}
var uniques = [{name: 'NY'}, {name: 'NY'}, {name: 'LA'}]
    .reduce(function(collection, current, idx){
        if(collection.indexOf(current.name) < 0){
            collection.push(current.name)
        }
        return collection;
    }, []);
//uniques = ["NY","LA"]
{% endhighlight %}
<p></p>

#### Get Dupes with Closure
<p></p>
{% highlight javascript linenos %}
var dupes = [];
var states = [{name: 'NY'}, {name: 'NY'}, {name: 'CA'}]
    .reduce(function(accumulator, current, idx){
        if(accumulator.indexOf(current.name) >= 0){
            dupes.push(current.name); 
        }else{
            accumulator.push(current.name);
        }
        return accumulator;
    }, []);
//dupes = ["NY"]
{% endhighlight %}
  
<aside>
  <h4>References:</h4>
  <ul>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" target="_blank">
        MDN Docs
      </a>
    </li>
  </ul>
</aside>
