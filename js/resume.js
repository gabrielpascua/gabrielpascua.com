(function(){

	//services
	var svc = angular.module('workServices', ['ngResource']);	
	svc.factory('Work', ['$resource', function($resource){
		
	    return $resource('data/resume.json', {}, {
		   query: { method:'GET', isArray:false }
	    });	
		
	}]);
	
	
	
	//controllers
	var ctl = angular.module('workControllers', []);
	ctl.controller('WorkListController', ['$http', 'Work', function($http, Work){
		
		this.jobs = Work.query();
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		
	}]);
	
	
	
	//app
	var app = angular.module('resume', ['workControllers', 'workServices']);
	
})();
