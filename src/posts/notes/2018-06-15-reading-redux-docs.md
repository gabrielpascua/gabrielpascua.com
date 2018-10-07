---
layout: post
title:  "Reading Redux Docs"
excerpt: "Notes about the Redux Documentatio"
date:   2018-06-15 06:42
categories: notes
tags:
    - javascript
    - react
    - redux
---

## How State Flows in Redux

<br />

![React Redux Flow](/img/react-redux-flow.svg)


## Guiding Principles
* Single Source of Truth
* State is read-only
* Changes are made with pure functions

## Actions
* Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. 
* Actions must have a `type` property defined as string constants
* Other than `type`, the structure is up to you
* Pass as little data as possible. For example, if you're accessing an item in an array, it's advised to pass the index instead of the whole object.
* Action Creators are functions that return an action. They are used in conjuction with `dispatch`
* Describes what happened
* POJO
* For asynchronous calls, you can have 2 approaches when dispatching actions: (1) Same action type but with different payload (2) Different action types and different payloads.  Prefer the second form specially if you need UI updates in between.

## Reducers
* A function that returns a piece of the application state
```javascript
export default function(){
  return { key: 'value'}
}
```
* In charge of manipulating the data
* A Reducer is a pure function that takes the previous state and an action, and returns the next state
* It's called a reducer because it's the type of function you would pass to Array.prototype.reduce
* Things you should never do inside a reducer: (1) Mutate arguments, (2) Side Effects like API calls and routing transitions, (3) Call non-pure functions like Date.now() or Math.random()
* Redux will call our reducer with an `undefined` state for the first time. This is our chance to return the initial state. Use ES6 default arguments
* Reducers don't write to state, rather return new objects
* It's recommended that reducers be grouped into their own usage/files instead of having one huge reducer
* Use the redux utility `combineReducers` to combine your reducers

## Store
* Holds application state;
* Allows access to state via getState();
* Allows state to be updated via dispatch(action);
* Registers listeners via subscribe(listener);
* Handles unregistering of listeners via the function returned by subscribe(listener).
* You'll only have a single store in a Redux application
* Basic store creation

```javascript
import { createStore } from 'redux'
import todoApp from './reducers'
const store = createStore(todoApp)
const unsub = store.subscribe(() => {});
store.dispatch(addTodo('Learn about actions'))
unsub();
```

## React - Redux
* mapStateToProps - used by `connect()` to map redux state into react props
* mapDispatchToProps - used by `connect()` to relay actions
* Use the `<Provider store={store}>` to expose the store to all containers
* Asynchronous middleware like redux-thunk or redux-promise wraps the store's dispatch() method and allows you to dispatch something other than actions, for example, functions or Promises


## Containers / Smart Components
* A container is a React component that can communicate directly with Redux - using react-redux `{connect}`.
* component vs containers: https://redux.js.org/basics/usage-with-react#presentational-and-container-components
* Anatomy of a basic container

```javascript
import { connect } from 'react-redux';
import { actionCreatorMethod } from './my-file-path';

class ComponentName extends Component {
	render() {}
}

export default connect(
  mapStateToProps,
  {actionCreatorMethod}
)(ComponentName);
```



## Middleware
* Redux Middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer
* Chaining your custom dispatch methods with `applyMiddleware`: https://redux.js.org/advanced/middleware#the-final-approach
* `redux-promise` example for async requests. it allows you to make async requests without having to deal with the delay in response. Different from `redux-thunk` in that it passes the promise and unwraps it for you.
* `redux-thunk` allows you so send a function with multiple actions. This is useful for when you call async functions.  Different from `redux-promise` in that you unwrap the promise in a function.


## Packages
* `redux-promise` for unwrapping ajax requests or redux-thunk
* `axios` for network requests
* `sparklines` for charts
* `redux-form`
* `tv4` for validating json with json schema


## Useful Techniques
* Spread operator to return a new object `{...state, key: newValue}`
* jsonschema.net to generate a json schema