(function(){

	// add both controllers to the main app module

	angular.module('carsCtrl', [])
		.controller('carsController', carsController)
		.controller('carDetailController', carDetailController)

	// both controllers will use our 'cars' factory, so we'll inject it in both accordingly

	carsController.$inject = ['cars', '$window', '$timeout']
	carDetailController.$inject = ['cars','$routeParams','$location']

	function carsController(cars, $window, $timeout){
		var self = this
		self.name = 'Car List'
		self.api = cars

		// this array will contain the full list of cars when it is retrieved from DB
		self.cars = []

		// represents a 'new car' we'd like to POST to the database
		self.newCar = {}

		// retrieve the list of cars, and set this controller's 'cars' property to the array we get back from our API
		self.api.list().success(function(response){
			self.cars = response
		})

		// controller method for adding a new car, this gets invoked when user hits 'submit' button.
		self.addCar = function(make,model,year){
			var data = {make: make, model: model, year: year}
			// run the car factory's addCar method to send the POST request with the data object we just created
			self.api.addCar(data).then(function success(response){
				// when we successfully finish the POST request, take the server's response (the new car) and add it to this controller's car list, which updates the front-end with the new car.
				self.cars.push(response.data.car)
				// clear this controller's 'newCar' object out, which clears the input fields on the front-end
				self.newCar = {}
				// focus on the first input field for the user to add another car (UI enhancement)
				$window.document.querySelectorAll('#new-car-form input')[0].focus()
			})
		}
	}

	function carDetailController(cars,$routeParams,$location){
		var self = this
		self.name = 'Car Detail'
		self.api = cars
		self.car = null

		// default boolean value, which we can toggle true/false for showing/hiding car edit form
		self.editing = false

		// retrieve a car based on the url parameter for carId, then set this controller's 'car' property to the response to show it on the front-end
		self.showCar = function(carId){
			self.api.show(carId).success(function(response){
				self.car = response
			})
		}
		self.showCar($routeParams.carId)

		// update the car using the factory's updateCar method, then on successful PATCH, set this controller's car object to the response from the server, which updates the front-end. Then, turn this controller's 'editing' property to false, which toggles back to show the car details without the edit form.
		self.updateCar = function(carId, make, model, year){
			var data = {make: make, model: model, year: year}
			self.api.updateCar(carId,data).success(function(response){
				console.log(response)
				self.car = response
				self.editing = false
			})
		}

		// method that runs the car factory's removeCar method to delete the car using this controller's car's _id property as the argument. Then, after successfully deleting, redirect the user back to '/cars'.
		self.removeCar = function(carId){
			self.api.removeCar(carId).success(function(response){
				console.log(response)
				$location.path('/cars')
			})
		}
	}
}())
