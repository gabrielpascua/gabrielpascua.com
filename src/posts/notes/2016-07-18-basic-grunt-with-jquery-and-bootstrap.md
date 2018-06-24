---
layout: post
title:  "Basic Grunt Setup with jQuery and Twitter Bootstrap"
excerpt: "Basic Grunt Setup with jQuery and Twitter Bootstrap"
date:   2016-07-18 19:51
categories: notes
tags:
  - grunt
---


### npm Packages
<p></p>
{% highlight shell linenos %}
npm install -g grunt-cli
npm install --save-dev grunt
npm install --save-dev bootstrap
npm install --save-dev jquery
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-cssmin --save-dev
{% endhighlight %}

<p>&nbsp;</p>


### Grunt Configuration (Gruntfile.js || Gruntfile.coffee)
<p></p>
{% highlight javascript linenos %}
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        dest: 'public/js/vendors.js'
      }
    },
    uglify:{
      my_target: {
        files: {
          'public/js/vendors.min.js': [
            'public/js/vendors.js'
          ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/css/main.css': [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'stylesheets/style.css'
          ]
        }
      }
    }
  });

  //Activate Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  //Create task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
{% endhighlight %}