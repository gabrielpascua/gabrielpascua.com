---
layout: null
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://unpkg.com/react@latest/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.23.1/babel.min.js"></script>
    <link rel="stylesheet" href="{{ "/css/main.css" | prepend: site.baseurl }}">
    <link rel="stylesheet" href="{{ "/css/tools.css" | prepend: site.baseurl }}">
    <title>Tools</title>
</head>

<body>

{% include topnav.html %}

<!-- Tools -->
<div id="tools"></div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="/js/jquery-1.12.4/jquery-1.12.4.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="/js/bootstrap-sass-3.3.6/bootstrap.min.js"></script>
<script type="text/babel" src="/js/tools-app.js" data-presets="react,es2015"></script>
</body>

</html>
