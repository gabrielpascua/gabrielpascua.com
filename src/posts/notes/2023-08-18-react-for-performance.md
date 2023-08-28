---
layout: post
title:  "React v18 Hooks for Performance"
excerpt: ""
date:   2023-08-18 08:40
categories: notes
tags:
  - react
  - javascript
---

### useCallback

* Caches a function between re-renders until its dependencies change
* On the initial render, it returns the unexecuted function. On subsequent renders, it will return the cached instance of the callback function.
* Only useful for [functions passed down as component props or the function is used as a dependency to a hook](https://react.dev/reference/react/useCallback#should-you-add-usecallback-everywhere)

### memo & useMemo

* `memo` is for component declaration, e.g. `const app = memo(function MyApp(){...})`
* `useMemo` is for component function properties
* Both `memo` and `useMemo` caches function results
* Though you can use `useMemo` for functions that return components, `memo` will be able to do the same thing with better code readability

### lazy() & Dynamic Import

* `lazy(() => <PROMISE>)` defers loading component **code** until it requires rendering
* Commonly used with [Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) for loading component code on demand
* `lazy` must be declared at the top level of the module to [avoid issues](https://react.dev/reference/react/lazy#my-lazy-components-state-gets-reset-unexpectedly)

  ```javascript
  import { lazy, Suspense } from 'react';
  import LoadingSpinner from './LoadingSpinner.js';
  const LazyComponent = lazy(() => import('./LazyComponent.js'));
  export default function MyComponent(){
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent />
      </Suspense>
    )
  }
  ```

### useLayoutEffect

* Can hurt performance. Prefer `useEffect` when possible
* synchronously fired before the browser repaints
* called before `useEffect` when a component renders
* useful for DOM calculations and manipulations that require specific placement
* Only runs on the client. It does not run during server render.