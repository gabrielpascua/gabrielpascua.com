---
layout: post
title:  "Writing Tests for React Components"
excerpt: "Writing Tests for React Components"
date:   2018-07-10 09:12
categories: notes
tags:
    - javascript
    - react
    - enzyme
---

## React Testing
* Jest test runner
* More testing libraries https://reactjs.org/community/testing.html
* The convention for tests is to be under a `__tests__` folder or any of the [jest defaults](https://jestjs.io/docs/en/configuration#testmatch-array-string)
* Under the hood, tests utilizes `jsdom` whenever you generate a markup
* `ReactDOM.unmountComponentAtNode(domElement)` to clean up the test
* npm `enzyme` from AirBnb for easier [component assertions](http://airbnb.io/enzyme/docs/api/)
* Sample Test

```javascript
it ('shows a comment box v1', () => {
  const div = document.createElement('div');
  ReactDom.render('<App />', div);
  
  // considered a bad practice because it makes the test fragile  
  expect(div.innerHTML).toContain('Comment Box');
  
  ReactDOM.unmountComponentAtNode(div);
});

it ('shows a comment box v2 using enzyme', () => {
  const wrapper = shallow(<App />);
  
  // better test since it has no knowledge of
  // the inner workings of the component
  expect(wrapper.find(Component).length).toEqual(1);
  
  ReactDOM.unmountComponentAtNode(div);
});
```

## React / Redux Testing
* Create a `<Root />` component to wrap your store so that components you're planning on testing can have access to your Redux store
* Add an `initialState` props to your `<Root />` component, so that children components can easily mock their data 

## How to use enzyme
* `npm enzyme` is a testing utility from AirBnB that allows you to mimic DOM operations.  
* Enzyme uses `cheerio` so you can use jQuery selectors, and has methods that can simulate events and render components.
* Create a `src/setupTests.js` file.  This is called by jest when bootstrapping. Add this in the file

```javascript
// https://github.com/airbnb/enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

* Enzyme has a `simulate` method to simulate a native javascript event

### Enzyme Renderers
* Static - render component and return  HTML
* Shallow - render component w/o children
* Full DOM - render component w/ children

## Mocking axios request with moxios
```javascript
beforeEach(() => {
  moxios.install(); // intercept axios requests
  moxios.stubRequest('AJAX URL', {
    status: 200,
    response: { /* EXPECTED RESPONSE DATA */ }
  });
});

it('test', (done)=>{
  // triggger the ajax request
  const wrapper = mount(
	<Root>
		<App />
	</Root>
  );
  wrapper.find('.element').simulate('click');
  
  // introducing a delay for simulating ajax requests
  // there's also moxios.wait() from the documentation
  moxios.wait(() = > {
    wrapper.update();
    expect(wrapper.find('li').length).toEqual('MOXIOS RESPONSE');
    done();
  });
});

afterEach(() => {
  moxios.uninstall();
});
```