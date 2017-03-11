---
layout: post
title:  "SMACSS or BEM Methodology"
excerpt: "Choosing between SMACSS and BEM Methodology"
date:   2017-03-11 07:47
categories: notes
tags: design
---

#### Choosing between SMACSS and BEM Methodology
<p>&nbsp;</p>
<table class="table">
  <thead>
    <tr>
        <th width="20%">&nbsp;</th>
        <th width="40%">SMACSS</th>
        <th width="40%">BEM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td><b>What it is</b></td>
        <td>
            Style Guide and not a framework with lax naming convention
        </td>
        <td>
            Style Guide with specific naming convention and have optional framework provisions
        </td>
    </tr>
    <tr>
        <td><b>Style Categories</b></td>
        <td>
            <ul>
                <li>Base - are element, attribute, pseudo-class selectors</li>
                <li>Layout - is for sectioning (Prefixed with `l` or `layout` as in `.l-header`)</li>
                <li>Modules - are reusable parts of your site (Starts with the module name and child modules and elements contain the parent module’s name)</li>
                <li>State - how a module will look on different screens, inside an element, when clicked, etc.. (Named similar to boolean variables e.g. `.is-hidden`). State that belongs to a module should have the module’s name `.is-module-state`</li>
                <li>Themes - similar to state in that it affects your base, layout and modules</li>
            </ul>
        </td>
        <td>
           <ul>
                <li>Block (Namespace) - any reusable component that answers “What is it”. It can have any number of nesting. Elements in a block are optional</li>
                <li>Element - an entity inside a block that answers “What is this” and cannot exist without a block. It can be nested but styling is always single-level from its block.</li>
                <li>Modifier (State) - entity that defines appearance, state or behavior of a block or element.</li>
           </ul> 
        </td>
    </tr>
    <tr>
        <td><b>CSS Selectors</b></td>
        <td>Ok to use tag and ID selectors on layout elements but not on modules</td>
        <td>tag and ID selectors are prohibited, everything use `.class` selectors</td>
    </tr>
    <tr>
        <td><b>!important</b></td>
        <td>Use sparingly and only on states</td>
        <td>Unlikely because styles are namespaced in their blocks</td>
    </tr>
    <tr>
        <td><b>Theming</b></td>
        <td>Themes have their own files that override the module styles</td>
        <td>Themes are treated as modifiers</td>
    </tr>
    <tr>
        <td><b>CSS Media Queries</b></td>
        <td>Placed next to the module it handles</td>
        <td>Inside the block following its rule on reuse</td>
    </tr>
  </tbody>
</table>
  
<aside>
  <h4>References:</h4>
  <ul>
    <li>
      <a href="https://en.bem.info/methodology/" target="_blank">
        Block Element Modifier (BEM) Methodology
      </a>
    </li>
    <li>
      <a href="https://smacss.com/" target="_blank">
        Scalable and Modular Architecture for CSS
      </a>
    </li>
  </ul>
</aside>