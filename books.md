---
layout: page
---
<h1>Books</h1>
<div class="toc">
{% for post in site.posts limit:20 %}
    {% if post.categories contains 'books' %}
    <div class="row">
        <div class="col-xs-12 col-sm-6 title">
            <a href="{{ post.url }}">
                {{ post.title }}
            </a>
        </div>
        <div class="col-xs-12 col-sm-4 divider"></div>
        <div class="col-xs-12 col-sm-2 date">
            <span class="date">{{ post.date | date: "%Y.%m.%d" }}</span>
        </div>
    </div>
    {% endif %}
{% endfor %}
</div>