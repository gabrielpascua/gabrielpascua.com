(function () {

  //private functions
  function getTheme(){
    var themes = ['default', 'kobe-htm','manhattan', 'sharpie'];
    var random;

    var qsTemplate = window.location.search.substr(1).split('&')
      .filter(function(part){
        return part.indexOf('template=') >= 0;
      });

    if(qsTemplate.length > 0){
      return qsTemplate[0].split('=')[1];
    }else{
      random = Math.floor(Math.random() * themes.length) + 1;
      return themes[random-1];
    }
  }

  //services
  var svc = angular.module('workServices', ['ngResource']);
  svc.factory('Work', ['$resource', function ($resource) {
    return $resource('/data/resume.json', {}, {
      query: {method: 'GET', isArray: false}
    });
  }]);


  //controllers
  var ctl = angular.module('workControllers', []);
  ctl.controller('WorkListController', ['$http', 'Work', function ($http, Work) {

    this.jobs = Work.query();
    this.theme = getTheme();
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  }]);


  //app
  var app = angular
    .module('resume', ['workControllers', 'workServices'])
    .config(function($interpolateProvider) {
      //change curly braces b/c of jekyll conflict
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
    });

})();
