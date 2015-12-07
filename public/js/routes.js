angular.module('carsApp')
	.config(carRoutes)

carRoutes.$inject = ['$stateProvider', '$urlRouterProvider']

function carRoutes($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/cars')
  $stateProvider
      .state('cars', {
        url: '/cars',
        templateUrl: 'partials/car-list.html',
        controller: 'carsController as carsCtrl'
      })
      .state('detail', {
        url: '/cars/:carId',
        templateUrl: 'partials/car-detail.html',
        controller: 'carDetailController as carDetailCtrl'
      })      
}