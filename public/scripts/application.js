angular
.module("IPL", ["ngRoute"])
.constant('ENVIRONMENT', 'DEV')
.config(['$routeProvider',function ($routeProvider) {

	$routeProvider
            .when('/', {
                templateUrl: 'scripts/pages/Login/view.html',
                controller: "loginController"
            })
            .when('/home', {
                templateUrl: 'scripts/pages/HomePage/view.html',
                controller: "homePageController"
            })
            .otherwise({ redirectTo: "/" });
   
}])
.controller('appController', ['$scope',  function (scope) {
	scope.loggedIn=false;

    
}])
.run(function ($rootScope,$log) {
   $log.debug('app started.');

});

