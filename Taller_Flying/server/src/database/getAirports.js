var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Se realiza conexíón local a base de datos
var promise = mongoose.connect('mongodb://localhost/flying', {
	useMongoClient: true,
})

// Se define el esquema de un aeropuerto
var airportsSchemaJSON = {
	airportID: Number,
	name:String,
	city:String,
	country:String,
	iata:String,
	icao:String,
	lat: Number,
	lon: Number,
	alt: Number,
	timezone: Number,
	dst:String,
	tz_db:String,
	type:String,
	source:String
}

// Se crea el esquema de un aeropuerto
var airportsSchema = new Schema(airportsSchemaJSON)

// Se crea el modelo de un aeropuerto
var airport = mongoose.model("airport", airportsSchema)

// Se anade la función que va a devolver este .js
module.exports = {
	printAirports: function() {
		airport.find(function(err,doc){
			console.log(doc)
		})
   }
}