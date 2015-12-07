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
        // controllerAs: ''
      })
      .state('cars.detail', {
        url: '/:carId',
        templateUrl: 'partials/car-detail.html',
        controller: 'carDetailController as carDetailCtrl'
        // controllerAs: 'carDetailCtrl'
      })
      
      
}