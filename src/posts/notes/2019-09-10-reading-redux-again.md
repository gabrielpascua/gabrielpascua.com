---
layout: post
title:  "Reading Redux Again"
excerpt: "Revisiting Redux and React Redux Docs"
date:   2019-09-10 08:41
categories: notes
tags:
  - react
  - redux
  - javascript
---

### Entity State vs View State
Entity State is state fetched from a data source while
View State is state the component state from the UI layer

### React setState()
setState is an asynchronous method call react uses to batch all the state calls.  It comes in 2 forms. `setState(object)` and `setState((prevState, props) => ({ ... }))`.  Because the former merges objects shallowly it can cause bugs in your state management. Follow these rules when picking which form to use:
* use `setState(()=>{})` when there is a dependency from a previous property
* use `setState({})` when there is no previous property dependency
* when in doubt, use `setState(() => {})` because it's a pure function

### Redux:  View -> Action -> Reducer -> Store -> View
* An action is an Object with a `type` and optional payload. They are the ONLY way to change the state. It is dispatched and handled directly by the store.
* Executing an action is called **dispatching**
* A Reducer is a pure function with 2 inputs - global state and action 
* The Store holds the global state object

In Redux, the **View** dispatches an **Action**.  The **Action** passes through **Reducers**.  If the Action `type` is applicable to the Reducer, it creates a new state else it returns the previous state.   The **Store** then saves the new state for another **View** to subscribe from.

"Redux is only a state container. The state can be altered by using actions. The reducer takes care of the action. It uses the action and the old state to create a new state in the Redux store."


### Advanced Redux
* Action Creators are functions that return actions. Instead of simply returning an Action as such `store.dispatch({ type: 'Test', myProp: 'foo'})`, you have `store.dispatch(myActionCreatorFn(args))`.   It can give you additional control on how to manipulate the action you are returning and abstracts the process of structuring your returned action.
* `combineReducer({...})` allows you to group multiple reducers by domain without having to worry about the structure of the intermediate reducer state
* `react-redux` wires React with React
* `redux-actions` removes the boilerplate in creating actions
* `redux-promise` is a middleware that can return `async` functions
* `redux-persist` for saving state


### React Redux:  
![react-redux execution](/img/notes-revisiting-redux-flow.svg)

### Redux middleware
A redux middleware is a function that takes the `getState` and `dispatch` functions. It allows you to execute arbitrary code before passing through your reducers.  Set your middleware during store creation using Redux's `applyMiddleware()` function.

A nuance between `dispatch(action)` and `next(action)` is that calling `dispatch` will re-run the middleware chain from the very first, while `next` will move the middleware chain down.  Eventually, both will end up hitting your reducers.  It is common practice to use `dispatch` and `next`  in a middleware.
```js
// logging middleware
/* Non ES6 style
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}
*/

const logMiddleware => ({ getState, dispatch }) => next => action => {
  console.log('Before reducers have run');
  // pass along the action to the "next" reducer in the chain
  const result = next(action);
  console.log('After reducers have run');
  return result;
};

// measuring middleware
const measureMiddleware = () => next => action => {
   console.time(action.type);
   const result = next(action);
   console.timeEnd(action.type);
   return result;
}
```

### Redux-thunk for asynchronous actions
Redux-thunk is a middleware allowing you to dispatch actions that are functions. It works by checking the type of action dispatched.  If it is a function, redux-thunk will execute it.  It also has access to the state which you can use to validate before dispatching an action.  Redux saga as an alternative using generators.

Sample thunk
```js
function addRecipe(title)  {
  return function (dispatch, getState) {
    const trimmedTitle = title.trim();

    // if it's a duplicate, don't dispatch an action
    const dupe = getState().recipes.find(r => r.title === trimmedTitle);
    if (dupe) {
      return;
    }

    dispatch({ type: 'ADD_RECIPE_STARTED' });

    setTimeout(
      () => dispatch({ type: 'ADD_RECIPE', title: trimmedTitle }),
      1000
    );
  }
}
```


### Best Practices
* Keep the action payload to a minimum
* Make sure to always unsubscribe your view
* Do not make the store globally available for performance reasons
* Follow [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) for writing actions
* Consider placing validation logic in action creators or the middleware before passing it down to reducers.  Having it in one of these places widens the scope of components that can recognize the change.
* Structure your reducers to mirror your applications state tree. It will make your files easy to spot for changes.
* To make sate more maintainable, have a reducer for every key in the state
* Organizing your files
```
-app
--todo
---TodoList.js
---TodoItem.js
---reducer.js
---actionCreators.js
---selectors.js
--filter
---Filter.js
---reducer.js
---actionCreators.js
---selectors.js
--notification
---Notifications.js
---reducer.js
---actionCreators.js
---selectors.js
--store
---store.js
```

### Recipes
* Use `replaceReducer` to differentiate between logged in and logged out reducers
* Use store enhancers to debug stores, rehydrate on load, save to local storage on every action.  `applyMiddleware` is the only store enhancer that comes out of the box. [Collection of enhancers](https://github.com/markerikson/redux-ecosystem-links/blob/master/store.md)