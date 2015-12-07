angular.module('carsApp')
	.config(['$routeProvider', carRoutes])

function carRoutes($routeProvider){
	$routeProvider.
      when('/cars', {
        templateUrl: 'partials/car-list.html',
        controller: 'carsController',
        controllerAs: 'carsCtrl'
      }).
      when('/cars/:carId', {
        templateUrl: 'partials/car-detail.html',
        controller: 'carDetailController',
        controllerAs: 'carDetailCtrl'
      }).
      otherwise({
        redirectTo: '/cars'
      });
}