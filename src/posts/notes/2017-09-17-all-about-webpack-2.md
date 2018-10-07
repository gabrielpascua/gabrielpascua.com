---
layout: post
title:  "All About Webpack 2"
excerpt: "Learning Webpack 2 for Build Pipes"
date:   2017-09-17 07:47
categories: notes
tags:
    - javascript
    - angular
    - react
---

<div class="qwik-layout">
<h4>
    <a href="https://medium.com/@jhabdas/webpack-is-your-achilles-heel-d3cd80821a4f">
        <b>Webpack is your Achilles’ Heel</b>
    </a>
</h4>
<table class="table">
   <tr>
<td width="40%" markdown="1">
How much time do you spend configuring webpack when you should be improving the overall architecture of your site
</td>
<td width="" markdown="1">

* What’s the alternative when you have typescript, and you require a build pipeline? - rollup, babel, grunt, gulp
* What I like about webpack is that the execution steps of the build are well defined - ordering is explicit.  With grunt or gulp, you specify the order of your build which can be daunting when you think about how your application should be built.  But grunt, gulp, and webpack can accomplish your application’s bundling needs.

</td>
   </tr>
</table>

<h4>
   <a href="https://webpack.js.org/concepts/" target="_blank">
       <b>Webpack Concepts</b>
   </a>
</h4>
<table class="table">
   <tr>
<td width="40%" markdown="1">

**Entry Point** - the starting point of your application’s dependency graph

</td>
<td width="" markdown="1">

* The bootstrap javascript file of your page or application.  
* Multiple entry points are allowed

</td>
   </tr>
   <tr>
<td width="" markdown="1">

**Resolve** - instructions on how to resolve files

</td>
<td width="" markdown="1">

`resolve.extensions` an array value of extensions telling webpack that these extensions can be omitted on `import` statements  
`resolve.alias` creates alias locations for files

</td>
   </tr>
   <tr>
<td width="" markdown="1">

**Output** - tells webpack how to write the bundled code to disk

</td>
<td width="" markdown="1">

* The `filename` and `path` where the bundled files are going to be saved
* Only a single Output configuration is allowed

</td>
   </tr>
   <tr>
<td width="" markdown="1">

**Loaders** - transforms html, scss/css, jpg into modules that are part of your application dependency

</td>
<td width="" markdown="1">

* Tasks that transforms `import` statements in your javascript modules.  
* Every loader requires a `test` to match files and a `use` property to specify the transformation library to use
* Transformations are done on a per-file type basis

</td>
   </tr>
   <tr>
<td width="" markdown="1">

**Plugins** - performs actions on your compilations / chunks.  They do anything that loaders don’t

</td>
<td width="" markdown="1">

* An example plugin is UglifyjsWebpackPlugin 
* More Plugins at [https://webpack.js.org/plugins](https://webpack.js.org/plugins)

</td>
   </tr>
</table>


<h4>
   <a href="https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/" target="_blank">
       <b>A Beginner’s Guide to Webpack 2 and Module Bundling</b>
   </a>
</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">

How to chain webpack loaders:
```
// webpack.config.js
rules: [{
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
}, {
  // ...
}]
```

</td>
<td width="" markdown="1">

* The order of execution from chained loaders starts from the bottom up, passing the return value into the next.  In this example the transformation works like `style-loader(css-loader(sass-loader(‘file’)))`
* Without the `ExtractTextPlugin` to generate the external css files, the compiled css is injected in your html through the <style /> tag
* `css-loader` has an option to ignore `url` declarations in your css file if you have external assets

</td>
    </tr>
    <tr>
<td width="" markdown="1">

**Why import css in webpack?** 
* Helps packaging easier
* Removing modules, mean deleting its styles
* Lessens the HTTP Request
* Limits css overlaps - although I think there should be scoping rules for this

</td>
<td width="" markdown="1">

* Import statements for css looks like `import ‘folder/filename.scss`
* On compilation, the css rules are injected in the javascript file instead of a css file

</td>
    </tr>
    <tr>
<td width="" markdown="1">

Running `webpack -p` for production mode includes the UglifyJsPlugin for minification

</td>
<td width="" markdown="1" class="minimal">

Webpack included plugins from https://webpack.js.org/plugins/. These are libraries that do not require npm installation:
* AggressiveSplittingPlugin
* BannerPlugin
* CommonsChunkPlugin
* ComponentWebpackPlugin
* ContextReplacementPlugin
* DefinePlugin
* DllPlugin
* EnvironmentPlugin
* HotModuleReplacementPlugin
* IgnorePlugin
* LimitChunkCountPlugin
* LoaderOptionsPlugin
* MinChunkSizePlugin
* NamedModulesPlugin
* NoEmitOnErrorsPlugin
* NormalModuleReplacementPlugin
* ProvidePlugin
* SourceMapDevToolPlugin
* UglifyjsWebpackPlugin

</td>
    </tr>
    <tr>
<td width="" markdown="1">

**Code splitting** - say you have a public facing and a section that requires authentication… this setup usually comprises of shared javascript libraries and application specific ones.  These are useful plugins in this scenario:
* commons-chunk-plugin for shared libraries
* extract-text-webpack-plugin for splitting your css file

</td>
<td width="" markdown="1">

The webpack configuration for such a case requires you to have 2 `entry` points.  The key names you set can then be used dynamically via `[name]` throughout the rest of your configuration.
```
  entry: {
    app: './app.js',
    admin: './admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
```

</td>
    </tr>
    <tr>
<td width="" markdown="1">

**Hot Module Replacement (HMR)** - modifies modules while an application is running without the need for a full reload
* LiveReload replacement.  When used in conjunction with webpack-dev-server, you can check the `module.hot` mode to try and update with HMR before reloading the whole page

</td>
<td></td>
    </tr>
</table>



<h4>
   <a href="https://www.lynda.com/JavaScript-tutorials/Webpack-Deep-Dive/604264-2.html" target="_blank">
       <b>Webpack Deep Dive</b>
   </a>
</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">

Pass arguments to your npm run scripts through a double dash (--) as in `npm run build:dev -s -- --watch`

</td>
<td width="" markdown="1" class="minimal">

Useful npm libraries:
* husky - for git hooks. What it does used to be done using the combination of ghooks and opt-cli
* npm-run-all for running multiple npm run scripts sequentially or parallel
* rimraf - for cross platform deletes
* clean-webpack-plugin as an alternative for rimraf
* webpack-validator for webpack versions older than 2 for configuration validation
* offline-plugin specifically for webpack projects

</td>
    </tr>
    <tr>
<td width="" markdown="1">

Webpack Configuration Information

</td>
<td width="" markdown="1">

* output.publicPath -  tells webpack-dev-server where the compiled files are located for auto-refresh
* `output.pathinfo` for debugging when using imports or require statements. It adds comments to dynamically loaded modules indicating the file it ran.

</td>
    </tr>
    <tr>
<td width="" markdown="1">

`devTool: ‘eval’` for inline sourcemap
`devToool: ‘source-map’` for external

</td>
<td width="" markdown="1">
Inline sourcemaps in production is not good practice because of the added weight to your file.
</td>
    </tr>
    <tr>
<td width="" markdown="1">
Arbitrary npm scripts can have `pre` and `post` hooks when ran.  This means that `npm run something` will automatically have a `presomething` and `postsomething` hooks you can use
</td>
<td width="" markdown="1">

* If you need to delete your `dist` folder when running webpack, you can use the `rimraf` npm package to delete it and use it along the npm `pre[command]` and `post[command]` hooks. This ensures that you always get the latest compiled webpack bundle.
* `rimraf` takes care of OS differences when deleting folders

</td>
    </tr>
    <tr>
<td width="" markdown="1">
Hot Module Replacement - A development feature helpful in form filling scenario where you can avoid updating your modules without refreshing the page which can cause you to lose everything you’ve filled out
</td>
<td width="" markdown="1">

* You can check if this feature is enabled in your module by checking for the boolean `module.hot`.  From there you can call any JS expression you want.
* It’s available when you use `webpack-dev-server` and can be passed as a cli argument or in the `webpack.config.js`

</td>
    </tr>
    <tr>
<td width="" markdown="1">
Tree Shaking - deletes dead code by pulling out only the pieces you need
</td>
<td width="" markdown="1">
You have to use es6 imports/exports for tree shaking to work
</td>
    </tr>
</table>


<h4>
   <a href="https://laracasts.com/series/webpack-for-everyone" target="_blank">
       <b>Webpack for Everyone</b>
   </a>
</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">

**Multi entry configuration**
```
entry: {
  app: ‘app.js’,
  styles: ‘./styles.css’
}
```

</td>
<td width="" markdown="1">
This type of configuration is the equivalent of `require (‘./styles.css’)` if used together with ExtractTextPlugin
</td>
    </tr>
    <tr>
<td width="" markdown="1">

Other useful loaders:
* raw-loader
* url-loader
* file-loader

</td>
<td width="" markdown="1">

In a css build scenario
* raw-loader copies files as is for legacy projects
* file-loader moves files and renames it unless configured not to do so
* url-loader is like file loader but it can return a DataURL

</td>
    </tr>
    <tr>
<td width="" markdown="1">
Hash vs chunkhash - hash is global, chunkhash is file specific
</td>
<td width="" markdown="1">

* Hash and chunkhash are used in the `output` section for cache busting.  It generates a hash key every build.
* Say you have multiple keys in your configuration `entry`, using `[name].[hash]` will make every output file share the same hash value.  With `[name].[chunkhash]`, every output file will have a unique hash value.

</td>
    </tr>
    <tr>
<td width="" markdown="1">
Pass a function in `plugins` for a custom plugin
https://laracasts.com/series/webpack-for-everyone/episodes/12?autoplay=true 
</td>
<td width="" markdown="1">

Do this in your webpack configuration file like so:
```javascript
  const config = {
    entry: ...,
    output: {...},
    module: {...},
    plugins: [
      ...,
      function(){
        this.plugin('done', stats => {
          // your code here
          JSON.stringify(stats.toJSON());
        })
      }
    ]
  };
```

One useful technique when hooking your own plugin is to write a JSON file that can be read by your application
</td>
    </tr>
</table>



<h4>
   <a href="https://angular.io/guide/webpack" target="_blank">
       <b>Webpack an Introduction</b>
   </a>
</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
It’s good practice to separate vendor libraries from your application libraries.  These can then be webpack compiled into their own files that can be shared across pages. 
</td>
<td width="" markdown="1">

* The typical file setup with Angular and Typescript is you have a `vendor.ts` file separate from your main application file configured in webpack to be compiled independently.
* Polyfills should be treated the same way as vendor libraries.  By separating them, you can easily remove a polyfill when browser support becomes available.

</td>
    </tr>
    <tr>
<td width="" markdown="1">
Webpack configuration files are stored in environment specific files, e.g. `webpack.prod.js` and `webpack.common.js`.  These files are merged using the npm package `webpack-merge`
</td>
<td></td>
    </tr>
</table>



<h4>
   <a href="https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7" target="_blank">
       <b>Unambiguous Webpack config with Typescript</b>
   </a>
</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
Webpack’s complexity comes from its flexibility to handle almost anything you require on your web application
</td>
<td width="" markdown="1" class="minimal">

Take advantage of Typescript types in your IDE’s to make setting configuration easier through auto-completion.  To do this:
* Add `ts-node` as a `devDependency`
* Replace the config’s extension from `.js` to `.ts`
* Run `webpack --config webpack.config.ts`

</td>
    </tr>
</table>



<h4>
   <a href="https://www.smashingmagazine.com/2017/02/a-detailed-introduction-to-webpack/" target="_blank">
       <b>Webpack (v1) – A Detailed Introduction</b>
   </a>
</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
Webpack and module loaders in general solve the problem of bringing in code dependencies without all the manual maintenance
</td>
<td width="" markdown="1">

* Webpack is in the same family of module bundler with RequireJS and browserify, albeit with more features.  
* Webpack’s plugin system makes it more attractive because you do not have to deal with additional build tools

</td>
    </tr>
    <tr>
<td width="" markdown="1">

* `npm install del-cli -D` to allow you to create an npm run script that deletes your bundled files’ folder

</td>
<td width="" markdown="1">

* It’s important to have an npm library that’ll “clean” your output folder every compile.  `rimraf` is an alternative to `del-cli`

</td>
    </tr>
</table>

</div>


<aside>
  <h4>References:</h4>
  <ul>
    <li>
      <a href="https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7" target="_blank">
        https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7
      </a>
    </li>
    <li>
      <a href="https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/" target="_blank">
        https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/
      </a>
    </li>
    <li>
      <a href="https://www.smashingmagazine.com/2017/02/a-detailed-introduction-to-webpack/" target="_blank">
        https://www.smashingmagazine.com/2017/02/a-detailed-introduction-to-webpack/
      </a>
    </li>
    <li>
      <a href="https://www.lynda.com/JavaScript-tutorials/Webpack-Deep-Dive/604264-2.html " target="_blank">
        https://www.lynda.com/JavaScript-tutorials/Webpack-Deep-Dive/604264-2.html 
      </a>
    </li>
    <li>
      <a href="https://angular.io/guide/webpack" target="_blank">
        https://angular.io/guide/webpack
      </a>
    </li>
    <li>
      <a href="https://laracasts.com/series/webpack-for-everyone" target="_blank">
        https://laracasts.com/series/webpack-for-everyone
      </a>
    </li>
  </ul>
</aside>