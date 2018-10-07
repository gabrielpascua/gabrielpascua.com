---
layout: book
title:  "Learning React"
excerpt: "Learning React 1st Edition"
date:   2016-11-25
categories: books
book_url: https://www.amazon.com/Learning-React-Kirupa-Chinnathambi/dp/0134546318/
book_image: /img/book-learning-react-360x466.jpg
tags:
  - react
---

### 1. Introducing React
* In React all you need to worry about is the final state your component is in???
* React focuses on the view layer. You can choose to create your Model and Controller however you want with whatever technology your team is familiar with.
<p></p>

### 2. Building Your First React App
* Transpiling JSX files to plain Javascript files can be done:
    - Using build tools to package your modules. Preferred by modern web development standards because it makes dependency management easier
    - Use a Javascript conversion library.  Ideal for small projects but as your application grows it will take performance hits because every JSX request needs to be translated into Javascript.  [Babel](http://babeljs.io/) is the commonly used library for this task.
<p></p>

### 3. Components in React
* A relatable point here is that the author suggests that we've been sloppy about our markup.  We don't tolerate repetitive code on our scripts but we're ok if it's on the UI.  React components try to address this by promoting smaller, reusable components that can be combined with other components.
* Creating a simple component that you can pass to a `ReactDOM.render()` method

```javascript
let MyComponent = React.createClass({
  render: function(){
    return (<div>test</div>)
  }
});
```

* Function `arguments` are the equivalent of `properties|this.props` in a React component.  The value of these properties are then used as attributes. 
* You can omit the quotes when using a component property as a JSX attribute e.g. `<a href={this.props.link}>{this.props.text}</a>`
* Components have a built in `this.props.children` element that allows you to access items inside your component like the `<p>` tag in `<Component><p>Test</p></Component/>`
<p></p>

### 4. Styling in React
* You can inline your styles for cases when you need to dynamically change formatting.  You do this by creating a javascript object with the styling keys and their value using the `DomElement.style` [syntax](https://facebook.github.io/react/docs/dom-elements.html#style).
<p></p>

### 5. Creating Complex Components
* Passing properties from parent to children requires setting it at the parent level and the children having the property with the same name

```javascript
// Parent Component rendering
ReactDOM.render(
  <ParentComp myprop="one">test</ParentComp>, document.getElementById('test')
);

// Parent Component
let ParentComp = React.createClass({
  render: function(){
    return ( <ChildComp myprop={this.props.myprop} /> )
  }
});

// Chilld Component
let ChildComp = React.createClass({
  render: function(){
    return ( <b myprop={this.props.myprop}>Test</b> )
  }
});
```

<p></p>

### 6. Transferring Properties (Props)
* Another way to pass down properties when you're using Babel is to use the ES6 spread operator.  The spread operator standard is limited to arrays and iterators but React and Babel extended it to support objects.  Chapter 5's example can be improved as:

```javascript
// Parent Component rendering
ReactDOM.render(
  <ParentComp myprop="one">test</ParentComp>, document.getElementById('test')
);

// Parent Component
let ParentComp = React.createClass({
  render: function(){
    return ( <ChildComp {...this.props} /> )
  }
});

// Child Component
let ChildComp = React.createClass({
  render: function(){
    return ( <b {...this.props}>Test</b> )
  }
});
```

<p></p>

### 7. Meet JSX—Again!
* Comments are written like `{/* */}`
* You can assign a React component to a variable

```javascript
var colorComponent = <Color hex="#2F004F"></Color>;
ReactDOM.render(
  <div>{colorComponent}</div>,
  document.querySelector("#container")
);
```

<p></p>

### 8. Dealing with State
* [Better state and lifecycle explanation from Facebook](https://facebook.github.io/react/docs/state-and-lifecycle.html)
* From Facebook's Documentation -" While `this.props` is set up by React itself and `this.state` has a special meaning, you are free to add additional fields to the class manually if you need to store something that is not used for the visual output."
* 3 things to remember when using state
    - Only use the constructor when setting the state directly.  Doing it in a different lifecycle will not update your component.  Use `setState()` for that instead.
    - State may be asynchronous.  When calling `setState()` that requires access to the previous value, use the form that takes a function: `setState(function(prevValue, props){})`
    - State updates are merged.  You can have independent `setState` calls to specific component state properties.
<p></p>

### 9. Going from Data to UI
* You can pass any expression that returns a single or an array of JSX - `ReactDOM.render(<div>{runFunction()}</div>,DOMNODE)`. 
<p></p>
 
### 10. Working with Events
* Event handlers in React are set inline of the JSX code
* You deal with `SyntheticEvent` in react and not the usual DOM Event (`MouseEvent`, `KeyboardEvent`, etc..).  It is normalized for [cross-browser compatibility](https://facebook.github.io/react/docs/events.html) by wrapping the native DOM event.
* You cannot `return false` for a component to ignore an event. Use `preventDefault()` to achieve this.
* You can't call a parent component's event handler function directly from a child component because React components are only wrappers for DOM elements.  You can get around this by setting the event handler call as a child component property.

```javascript
class Counter extends React.Component {
    render(){
        return <div>{this.props.display}</div>;
    }
}

class PlusButton extends React.Component {
    render(){
        return <button onClick={this.props.clickHandler}>+</button>;
    }
}

class CounterParent extends React.Component {
    increase(){
        this.setState({ count: this.state.count + 1 });
    }

    constructor(){
        super();
        this.state = { count: 0 };
    }

    render(){
        return (
            <div>
                <Counter display={this.state.count} />
                <PlusButton clickHandler={this.increase.bind(this)} />
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <CounterParent />
    </div>,
    document.getElementById('root')
);
```

* Listening for custom events requires the use of `addEventListener` inside `componentDidMount`.  It is also important to remove the event listener at `componentWillUnmount` so that no trace of event handling is left when the component is destroyed. 

```javascript
componentFunction = () => {
  //This block is the property initializer syntax.
  //It allows you to skip calling bind when this function is called
}
componentDidMount(){
  window.addEventListener('customEvent', this.componentFunction);
}

componentWillUnmount(){
  window.removeEventListener('customEvent', this.componentFunction);
}
```

* The value of `this` is always the instance of the React component
* You can use the [property initializer syntax](https://facebook.github.io/react/docs/handling-events.html) to avoid having to call `bind` on your component function calls.
* React doesn't attach event handlers to a specific DOM element, rather it has one event handler attached at the root of the document resulting in an optimized event handler code???
<p></p>

### 11. The Component Lifecycle
<p></p>

### 12. Accessing DOM Elements
* Access to DOM elements are done using `ref`.  [Good uses of Refs](https://facebook.github.io/react/docs/refs-and-the-dom.html) according to Facebook are:
    - setting focus, text selection or media playback
    - animations
    - 3rd party integration
* Arrow functions are best used with `ref` for simplification
* You can only use `ref` for class components
<p></p>

### 13. Creating a Single-Page App Using React Router
* `import { Router, Route, Link, browserHistory } from 'react-router'` - useful classes to import from React Router
* Typical react routing configuration

```javascript
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
  ), document.querySelector('body'));
```

* Useful links
    - [React Router from React Training](https://github.com/ReactTraining/react-router)
    - [Route Matching from React Training](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteMatching.md)
<p></p>

### 14. Building a Todo List App
<p></p>

### 15. Setting Up Your React Development Environment
* To package react as a single javascript file you can reference on your HTML page, you need to have
    - [Babel](https://babeljs.io/) to transpile JSX and ES6 features
    - [Webpack](https://webpack.github.io/) to bundle your modules
* Folder structure for the example project

```
root
|_dev
  |_JSXFile.jsx
|_node_modules
|_output
  |_TRANSPILED.js
index.html
package.json
webpack.config.js
```

* [Recommended Setup](https://facebook.github.io/react/docs/installation.html) from Facebook
* [Babel, React and Grunt](https://php.quicoto.com/use-babel-to-compile-react-jsx-with-grunt/)
* [ReactJS.NET](https://reactjs.net/)