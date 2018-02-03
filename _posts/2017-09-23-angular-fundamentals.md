---
layout: post
title:  "Angular 4 Fundamentals"
excerpt: "Angular Fundamentals"
date:   2017-09-23 09:20
categories: notes
tags:
    - javascript
    - angular
---

<div class="qwik-layout">
<h4>Modules</h4>
<table class="table">
   <tr>
<td width="40%" markdown="1">
* NgModules help organize an application into cohesive blocks of functionality.
* Any class with a decorator function of @NgModule({ ... }) 
* Every app must have at least 1 module
</td>
<td width="" markdown="1">
* Modules are “packages” written for specialized tasks.  Angular ships with its own modules like BrowserModule, HttpModule and FormsModule.  One can also create his own module.
* The conventional name for the main angular module is “AppModule”
* Per [Angular’s architecture diagram](https://angular.io/guide/architecture), a module can contain a component, service, value or a function 
* Goes into the “imports” argument of the @NgModule decorator
</td>
   </tr>
</table>

<h4>Components</h4>
<table class="table">
   <tr>
<td width="40%" markdown="1">
* Class that controls a view
* Lifecycle Hooks in Order
  - constructor
  - ngOnChanges
  - ngOnInit
  - ngDoCheck
  - ngDoAfterContentInit
  - ngDoAfterContentChecked
  - ngAfterViewInit
  - ngAfterViewChecked
  - ngOnDestroy
</td>
<td width="" markdown="1">
* This is equivalent to .NET web forms code-behind page
* Recommended for strong typing on editors that support it but not required is for a component to implement the hook interface.  The name of the interface is the same as the hook minus the “ng” prefix.  For example a component that needs to use the ngOnInit hook should be written as `Component1 implements OnInit`.
* Use case for every hook [https://angular.io/guide/lifecycle-hooks](https://angular.io/guide/lifecycle-hooks)
* Goes into the “declarations” argument of the @NgModule decorator
</td>
   </tr>
   <tr>
<td width="40%" markdown="1">
@HostBinding -  sets a property to the host element which is the custom HTML tag specified in the `selector` (host) component property
</td>
<td width="" markdown="1">
```
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  ...
```
</td>
   </tr>
   <tr>
<td width="40%" markdown="1">
@HostListener - allows you to subscribe to the events of the DOM element.  
</td>
<td width="" markdown="1">
```
@HostListener('click') displayMessage(): void {
  alert(this.message);
}
```
[Talking to the DOM directly is not considered best practice](https://angular.io/guide/attribute-directives#respond-to-user-initiated-events)
@HostListener will be triggered for every HTML element if you have multiple root nodes in your templates like below
```
<div>...</div>
<i>..</i>
```
</td>
   </tr>
   <tr>
<td width="40%" markdown="1">
Content projection using `ng-content` allows you to inject dynamic markup in your template
</td>
<td width="" markdown="1">
```
// component file 
@Component({
  selector: 'home',
  template: `
    <h1>Title</h1>
    <ng-content></ng-content>
  `
})

// templateUrl file
<home>
  <p>Hello World</p>
</home>
```
</td>
   </tr>
   <tr>
<td width="40%" markdown="1">
Component Lifecycle Hooks in order of execution
https://angular.io/guide/lifecycle-hooks#lifecycle-sequence:
* OnChanges
* OnInit
* DoCheck
* AfterContentInit
* AfterContentChecked
* AfterViewInit
* AfterViewChecked
* OnDestroy
</td>
<td width="" markdown="1">
* OnChanges is called every time a component’s @Input property changes
* DoCheck checks for any component property.  Use this for changes that Angular wouldn’t catch like nested object properties.  Avoid using OnChanges and DoCheck together because you’ll be calling 2 hooks for every change.
* OnChanges, DoCheck, AfterContentChecked, and AfterViewChecked are all called every change detection
</td>
   </tr>
   <tr>
<td width="40%" markdown="1">
Angular’s default change detection uses the Zones library
</td>
<td width="" markdown="1">
* Angular has a top-down execution for change detection. A component change anywhere in a dependency tree will trigger change detection for the entire tree.  
</td>
   </tr>
   <tr>
<td width="40%" markdown="1">
Angular offers Default and OnPush `ChangeDetectionStrategy` for component bindings
</td>
<td width="" markdown="1">
* Default always checks the component for changes while OnPush is triggered only when the object reference has changed - meaning a new object has been created and not just merely updating properties
* OnPush works well with immutable structures with the added advantage of skipping the whole component tree for change detection
* https://angular-2-training-book.rangle.io/handout/change-detection/change_detector_classes.html
* https://medium.com/@gaurav.pandvia/unravelling-angular2-change-detection-c0885c8d0fcc 
</td>
   </tr>
</table>


<h4>Templates</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
The component's view
</td>
<td width="" markdown="1">
* Where markup resides
* Component inside a component is represented as a custom HTML tag
* Follows a mustache syntax
* Template syntax: https://angular.io/guide/template-syntax 
* Can be inline inside a component using the “template” argument or an external file using the “templateUrl” argument
* Recommended that templates are relative to components for AOT compilation
</td>
    </tr>
</table>


<h4>Metadata</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
Tells Angular how to process a class
</td>
<td width="" markdown="1">
* Metadata is set in the form of decorators.  A component class is nothing more than a class if without a metadata information.  Using the @Component decorator on a component class, you can point where the the template is located and what custom tag to use like below

@Component({
  selector:    'hero-list',
  templateUrl: './hero-list.component.html',
  providers:  [ HeroService ]
})
export class HeroListComponent implements OnInit {
/* . . . */
}
</td>
    </tr>
</table>


<h4>Data Binding</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* Push/pull data mapping between template and the component members
</td>
<td width="" markdown="1">
* 4 syntax forms 
  - {{ value }} : component property binding, outputs to the DOM
  - [property]=“value” : component property binding for passing “value” down to a child component for outputting to the DOM
  - (event)=“functionName(argument)” : event binding for calling a component function
  - [(ngModel)]=”model.property” : event and property binding useful for form submissions
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
@Input - allows data to flow from the binding expression (template) into the directive (component).
</td>
<td width="" markdown="1">
* If you need to pass a value/object from the template into the component class, add a property to the template that matches the component class member.  Whatever value you set will now be available inside the component class

Template:
```
<!-- myapp.component.html -->
<myapp [myData]="myDataModel"></myapp>
```

Component Class:
```
export class MyAppComponent {
  // this is now available everywhere in this class
  @Input() myData: MyDataClass
}
```
* brackets denote input. The value you assign to it will be used by the component property
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
@Output - expose event producers, such as EventEmitter objects.  An output property streams an event “out” of the component
</td>
<td width="" markdown="1">
* Native events such as `click` and `keyup` can be easily handled like so

```
<!-- Template -->
<button (click)="decrease()">Decrease</button>

<!-- Component -->
export class MyAppComponent {
  click():void { return ‘hello’; }
}
```

* parenthesis denote output.  This sends data out of your component for other components to listen to. These are your event handlers
* If you want to send a custom event when a DOM action is triggered, you have to use `EventEmitter`.  You set it up inside your component.  You then listen for a native event and call the `EventEmitter.emit()` method after to broadcast it.
Template for MyComponent

```
<button (click)=”clickHandler” />
```

MyComponent

```
@Component({ selector: ‘my-component’ })
export class MyComponent {
  clickCount: number = 0;
  @Output() onEvent = new EventEmitter<number>();
  clickHandler():void{
    onEvent.emit(clickCount++);
  }
...
```

OtherComponent


```
@Component({ 
  selector: `other-component`,
  template: `
    <div>
      <my-component (onEvent)=otherCompHander($event) />
    </div>
  `
})
export class OtherComponent({
  otherCompHandler(count:number):void{
    console.log(count);
  }
})
```

</td>
    </tr>
</table>


<h4>Directives</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* Provides instructions on how to transform the DOM
* Directives are classes with a @Directive decorator
* 3 types of Directives
  - Components - under the hood it has a @Directive extended to have template features
  - Structural - changes the layout
  - Attribute - changes the appearance
</td>
<td width="" markdown="1">
* Built-in attribute directives:
NgClass for adding or deleting css classes
<p [ngClass]=”component.propery” />
NgStyle for inline styling
<p [ngStyle]=”component.property” />
NgModel for data binding
<input [(ngModel)]="component.property">
Common built-in structural directives:
NgIf to remove an element or guard against null
<div *ngIf="currentHero">...</div>
NgFor as a looping construct
<div *ngFor="let hero of heroes">...</div>
NgSwitch as an alternative to NgIf
https://angular.io/guide/template-syntax#the-ngswitch-directives 
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
@Directie exportAs property - allows you to reference a DOM element in your template like a local variable
</td>
<td width="" markdown="1">
```
// needs a  selector
@Directive({exportAs: ‘popup’, template:`
<b #popup1=”popup” message=”1” />
<b #popup2=”popup” message=”2” />
<a (click)=”popup1.print()” />
<a (click)=”popup2.print()” />
`})
export class PopupDirective{
  @Input() message;
  @HostListener(‘click’) print(){console.log(message)}
}
```
</td>
    </tr>
</table>


<h4>Services</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* Broad category encompassing any value, function, or feature that your application needs.
* Anything can be a service
* Should do one thing well
</td>
<td width="" markdown="1">
* A class that focuses on doing a single thing like a logger service or a data service.
* Utility classes or libraries that can be passed into components 
* Goes into the “providers” argument of the @NgModule or @Component decorators
* Requires @Injectable decorator
</td>
    </tr>
</table>


<h4>Dependency Injection</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* A way to supply class dependencies through the constructor
* Most dependencies are services
</td>
<td width="" markdown="1">
* The typical case is to use the “providers” argument at the module level.  Angular will resolve uninstantiated services if it hasn’t been used.  
* Passing services at the module level ensures you’re working with the same instance of the class everywhere down to the module’s components
* Passing services at the component level means you get a new instance of it every time the component is created
</td>
    </tr>
</table>



<h4>Routing</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
Dependencies:
- ‘@angualr/router’ module
- <router-outlet></router-outlet> template
- [routerLink] attribute
- <base href=”/”> OR { provide: APP_BASE_HREF, useValue: '/' } as a provider
</td>
<td width="" markdown="1">
- You’ll typically import `{RouterModule, Routes, ActivatedRoute}` from `@angular/module`
- `<router-outlet />` in your view is where the route components will be rendered.  You can have multiple router outlets in your view with a caveat that it has to have a `name` attribute that you can target in your route configuration.
- `[routerLink]=[‘/about’]` is a directive you can use in your Anchor tags to resolve the url of your application. Note that the value of `routerLink` is an array for additional parameters like in cases where the url is parameterized.
- The base href section is used for links with relative paths
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
Url Parsing strategies:
* HashLocationStrategy - hash url style
* PathLocationStrategy - html5 default using `pushState`
</td>
<td width="" markdown="1">
Sample Code:
```
  @NgModule({
    ...
    providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '/' } // <--- this right here
    ]
  })
```
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
Import ActivatedRoute for handling dynamic urls and query string parameters.
</td>
<td width="" markdown="1">
- Use `activatedRoute.params[‘id’]` to get the values from a route like `/product/:id`
- Use `activatedRoute.queryParamMap( params => params.get(‘key’ )` for querystring parameters
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
Import `CanActivate` from ‘@angular/router` for restricted routes
</td>
<td width="" markdown="1">

Guarding routes that are behind a login can be configured as `{ path: ‘admin’, component: ‘’, canActivate: [ LoggedInGuard ] }`, where the authentication class structure looks like below

```
@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(
    ...
  }
}
```
</td>
    </tr>
</table>



<h4>Observables</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* Application of the Observer and Iterator pattern
* An observer subscribes to an Observable. An Observable emits items or sends notifications to its observers by calling the observers’ methods - `next`, `error` and `complete`. 
</td>
<td width="" markdown="1">
* Angular moved from Promises to Observables because the former lacks retry and cancellation mechanisms
* An observable remains unhandled until an element subscribes to it
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
Outputting data to the template:
https://auth0.com/blog/making-use-of-rxjs-angular/ 
</td>
<td width="" markdown="1">
* When dealing with an Observable say for an AJAX request, you can use the `async` pipe to output the Observable value in your template. It will update the template once data has been extracted from the Observable
* The alternative is to `subscribe` to the Observable, inside the callback function you can grab the value and assign it to your component property
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
Hot or Cold Observable
</td>
<td width="" markdown="1">
* In the context of an AJAX request if you have 3 `subscribe`s to an Observable, the AJAX request will issue 3 network calls (Cold Observable).  To avoid doing this if you only need 1 network request, call the `share()` method (Hot Observable) to limit it.
</td>
    </tr>
</table>


<h4>Ahead of Time Compilation</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* Faster rendering
* Fewer asynchronous requests
* Smaller angular app download size
* Errors are caught at compile time
* Slow development time.  The recommended compilation strategy for now is JIT in development and AOT in production
</td>
<td width="" markdown="1">
* https://angular.io/guide/aot-compiler 
* Requires the “@angular/compiler-cli” to be installed, where the ngc command becomes a replacement for tsc
* You can use tree-shaking libraries like rollup to remove dead dependencies for further file size optimization
</td>
    </tr>
</table>


<h4>Injectables</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
* @Injectable marks a class as available to an injector for instantiation 
</td>
<td width="" markdown="1">
* Decorator that allows services to be consumed by other modules
</td>
    </tr>
    <tr>
<td width="40%" markdown="1">
* Injectors are responsible for instantiating class dependencies https://angular.io/api/core/Inject 
</td>
<td width="" markdown="1">
* @Component, @Directive, @Pipe are subtypes of @Injectable
</td>
    </tr>
</table>


<h4>Pipes</h4>
<table class="table">
    <tr>
<td width="40%" markdown="1">
Pipes - a  way to write display-value transformations that you can declare in your HTML.
</td>
<td width="" markdown="1">
* Filters in Jinja
* Allows for data transformations in the template
* Boilerplate Code for Custom Pipe
```
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'toFriendlyDuration'
})
export class MyPipe implements PipeTransform {
  transform(value: string, args?: any[]): any {}
```
</td>
    </tr>
</table>