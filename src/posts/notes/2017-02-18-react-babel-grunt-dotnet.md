---
layout: post
title:  "React, Babel, and Grunt for .NET Core MVC"
excerpt: "React build setup for a .NET Core MVC Project"
date:   2017-02-18 08:06
categories: notes
tags:
  - .net
  - react
---

#### Other viable solutions:
1. [ReactJS.net](https://reactjs.net/) 
2. [Webpack](https://facebook.github.io/react/docs/installation.html)
<p>&nbsp;</p>

### Quick Setup
You can simply reference these javascript files for prototyping.  It isn’t recommended on production systems because the JSX transformation on every request will affect your site’s performance.  
```markup
<script type="text/javascript" src="/js/react.min.js"></script>
<script type="text/javascript" src="/js/react-dom.min.js"></script>
<script type="text/javascript" src="/js/babel.min.js"></script>
<!-- Note that the type is text/babel -->
<script type="text/babel" src="/js/main.js"></script>
```
<p></p>


### Build Integration

Install these npm packages  
```bash
yarn add babel-plugin-transform-react-jsx \
    babel-preset-es2015 \
    babel-preset-react \
    grunt-babel \
    grunt-browserify --dev
``` 
<p></p>

You can have your own `.babelrc` file but I prefer to put the configuration in `package.json`  
```json
{
  ...
  "babel": {
    "plugins": ["transform-react-jsx"] ,
    "presets": ["react", "es2015"]
  }
}
```
<p></p>

Say you have this React component under the `Content/js/src` folder  
```javascript
import React from "react";
import ReactDOM from "react-dom";

let Navigation = React.createClass({
    render: function(){
        return (
            <a href={this.props.link}>{this.props.text}</a>
        );
    }
});

ReactDOM.render(
    <div>
        <Navigation link="/" text="Home" />
        <Navigation link="/list" text="List" />
    </div>,
    document.querySelector('header')
);
```
<p></p>

Add your compile, bundle and minification build steps for Grunt.  Below will create compressed/minified and uncompressed files but set up your task with what you think is necessary for your needs.  
```javascript
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
            options: {
                sourceMap: false
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: 'Content/js/src',
                    src: ['*.jsx'],
                    dest: 'Content/js/dist',
                    ext: '.js'
                }]
            }
    },
    browserify: {
            dist: {
                src: ['Content/js/dist/TRANSPILED_JSX.js'],
                dest: 'wwwroot/js/main.js',
            }
    },
    uglify: {
            my_target: {
                files: {
                    'wwwroot/js/main.min.js': [
                            'wwwroot/js/main.js'
                    ]
                }
            }
    },
    ...
}

grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['babel', 'browserify', 'uglify'])
```
<p></p>

Use the `environment` tag helper Inside your .NET Core MVC base template to load the packaged javascript file  
```markup
<environment names="development, staging">
    <script type="text/javascript" src="/js/main.js"></script>
</environment>
<environment names="production">
    <script type="text/javascript" src="/js/main.min.js"></script>
</environment>
```