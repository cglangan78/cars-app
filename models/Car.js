var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var carSchema = new Schema({
	model: String,
	make: String,
	year: Number
})

var Car = mongoose.model('Car', carSchema)

module.exports = Car