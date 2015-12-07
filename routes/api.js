var
	express = require('express'),
	apiRouter = express.Router()
	mongoose = require('mongoose'),
	Car = require('../models/Car.js')

apiRouter.get('/', function(req,res){
	res.json({message: "Api routes are working."})
})

apiRouter.route('/cars')
	.get(function(req,res){
		Car.find({}, function(err, cars){
			res.json(cars)	
		})
	})
	.post(function(req,res){
		var newCar = new Car
		newCar.make = req.body.make
		newCar.model = req.body.model
		newCar.year = req.body.year
		newCar.save(function(err, car){
			if(err) throw err
			res.json({message: "Car Saved!", car: car})
		})
	})

apiRouter.route('/cars/:id')
	.get(function(req,res){
		Car.findById(req.params.id, function(err,car){
			if(err) throw err
			res.json(car)
		})
	})
	.patch(function(req,res){
		Car.findOneAndUpdate({_id: req.params.id}, req.body, function(err,car){
			if(err) throw err
			Car.findById(req.params.id, function(err,updatedCar){
				res.json(updatedCar)
			})
		})
	})
	.delete(function(req,res){
		Car.findOneAndRemove({_id: req.params.id}, req.body, function(err,car){
			if(err) throw err
			res.json({message:"car deleted!"})
		})
	})


apiRouter.get('/destroy-all', function(req,res){
	Car.remove({}, function(err){
		if(err) throw err
		res.json({message: 'All cars destroyed! Booooom!'})
	})
})

module.exports = apiRouter