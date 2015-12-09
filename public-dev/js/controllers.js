angular.module('carsApp')
	.controller('carsController', carsController)
	.controller('carDetailController', carDetailController)

carsController.$inject = ['cars', '$window']
carDetailController.$inject = ['cars','$stateParams','$location']

function carsController(cars, $window, $timeout){
	var self = this
	self.name = 'Car List'
	self.api = cars
	self.cars = []
	self.newCar = {}

	self.api.list().success(function(response){
		self.cars = response
	})

	self.addCar = function(make,model,year){
		var data = {make: make, model: model, year: year}
		cars.addCar(data).then(function success(response){
			self.cars.push(response.data.car)
			self.newCar = {}
			$window.document.querySelectorAll('#new-car-form input')[0].focus()
		})
	}
}

function carDetailController(cars,$stateParams,$location){
	var self = this
	self.name = 'Car Detail'
	self.api = cars
	self.car = null
	self.editing = false
	self.showCar = function(carId){
		self.api.show(carId).success(function(response){
			self.car = response
			console.log(response)
		})
	}
	self.showCar($stateParams.carId)

	self.updateCar = function(carId, make, model, year){
		var data = {make: make, model: model, year: year}
		self.api.updateCar(carId,data).success(function(response){
			console.log(response)
			self.car = response
			self.editing = false
		})
	}

	self.removeCar = function(carId){
		self.api.removeCar(carId).success(function(response){
			console.log(response)
			$location.path('/cars')
		})
	}
}