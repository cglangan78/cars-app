(function() {
	'use strict';

	angular.module('app.routes', [ 'ngRoute' ])
		.config(['$routeProvider', '$locationProvider', carRoutes])

	function carRoutes($routeProvider, $locationProvider){
		$routeProvider
	      .when('/cars', {
	        templateUrl: 'partials/car-list.html',
	        controller: 'carsController',
	        controllerAs: 'carsCtrl'
	      })
	      .when('/cars/:carId', {
	        templateUrl: 'partials/car-detail.html',
	        controller: 'carDetailController',
	        controllerAs: 'carDetailCtrl'
	      })
				// login page
				.when('/login', {
					templateUrl: '/partials/login.html',
					controller: 'mainController',
					controllerAs: 'login'
				})

				// show all users
				.when('/users', {
					templateUrl: 'partials/allUsers.html',
					controller: 'userController',
					controllerAs: 'user'
				})
	      .otherwise({
	        redirectTo: '/cars'
	      });

			// $locationProvider.html5Mode(true)
	}
}());
