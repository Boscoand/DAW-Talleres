// Importar csv a mongo:
// mongoimport -d flying -c airports --type csv --file C:\Users\Jaminson\Documents\GitHub\DAW-Talleres\Taller_Flying\server\assets\data\airports.csv --headerline
// mongoimport -d flying -c routes --type csv --file C:\Users\Jaminson\Documents\GitHub\DAW-Talleres\Taller_Flying\server\assets\data\routes.csv --headerline
// mongoimport -d flying -c airlines --type csv --file C:\Users\Jaminson\Documents\GitHub\DAW-Talleres\Taller_Flying\server\assets\data\airlines.csv --headerline


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

// Se define el esquema de una aerolinea
var airlinesSchemaJSON = {
	airlineID: Number,
	name:String,
	alias:String,
	iata:String,
	icao:String,
	callsign: String,
	country: String,
	active: String
}

// Se define el esquema de una ruta airline,airlineID,sAirport,sAirportID,dAirport,dAirportID,codeshare,stops,equipment
var routesSchemaJSON = {
	airline: String,
	airlineID:Number,
	sAirport:String,
	sAirportID:Number,
	dAirport:String,
	dAirportID:Number,
	codeshare: String,
	stops: Number,
	equipment: String
}

// Se crea el esquema de un aeropuerto
var airportsSchema = new Schema(airportsSchemaJSON)

// Se crea el esquema de uns aerolinea
var airlinesSchema = new Schema(airlinesSchemaJSON)

// Se crea el esquema de una ruta
var routesSchema = new Schema(routesSchemaJSON)

// Se crea el modelo de un aeropuerto
var airport = mongoose.model("airport", airportsSchema)

// Se crea el modelo de una aerolinea
var airline = mongoose.model("airline", airlinesSchema)

// Se crea el modelo de una ruta
var route = mongoose.model("route", routesSchema)

// Devuelve las ciudades 
function getCountries(){
  return new Promise( (resolve, reject) => {
    airport.find().distinct('country', function(err, country) {
      if(err){
        return reject(err);
      }
      return resolve(country);
    });
  })
}

// Busca el iata de acuerdo a la ciudad
// Revisar iata
function getIata(pais){
  return new Promise( (resolve, reject) => {
    airport.find({"country": pais},function(err,airports){
      if(err){
        return reject(err);
      }
      // Se fila archivo airports para devolver unicamente los iata
      var listaIata = []
      for (let i = 0; i < airports.length; i++) {  
        listaIata.push(airports[i].iata);
      }
      return resolve(listaIata);
    })
  })
}

// Devuelve las aerolineas que cumplan con las rutas existentes entre dos paises
function getAllRoutes(origen, destino, escala){
  return new Promise( (resolve, reject) => {
    
    // Lista de promesas que deben cumplirse para salir de la función
    var promises = []
    
    // Se obtienen todos los iata del pais de origen
    promises.push(getIata(origen))
    
    // Se obtienen todos los iata del país de destino
    promises.push(getIata(destino))
    
    Promise.all(promises).then( ()=> {
      
      // Se manejan las promesas para obtener el resultado
      promises[0].then(function(origen) {
        promises[1].then(function(destino) {

          // Se obtienen las rutas, con aeropuertos y aerolinea. 
          if(escala==1){
            route.aggregate([
              {"$match": {'sAirport': { $in: origen },'dAirport': { $in: destino }, 'stops': { $ne: 0 }}},
              {"$lookup":{"from":"airlines","localField":"airlineID","foreignField":"airlineID","as":"aerolinea"}},
              {"$lookup":{"from":"airports","localField":"sAirport","foreignField":"iata","as":"aeropuertoOrigen"}},
              {"$lookup":{"from":"airports","localField":"dAirport","foreignField":"iata","as":"aeropuertoDestino"}}
            ],function(err,routes){
              if(err){
                return reject(err);
              }
              return resolve(routes)
            })
          }else{
            route.aggregate([
              {"$match": {'sAirport': { $in: origen },'dAirport': { $in: destino }, 'stops': 0}},
              {"$lookup":{"from":"airlines","localField":"airlineID","foreignField":"airlineID","as":"aerolinea"}},
              {"$lookup":{"from":"airports","localField":"sAirport","foreignField":"iata","as":"aeropuertoOrigen"}},
              {"$lookup":{"from":"airports","localField":"dAirport","foreignField":"iata","as":"aeropuertoDestino"}}
            ],function(err,routes){
              if(err){
                return reject(err);
              }
              return resolve(routes)
            })
          }
        })
      })
    })
  })
}

// Devuelve las aerolineas que pertenecen a las rutas existentes entre dos paises
function getAirlines(origen, destino, escala){
  return new Promise((resolve, reject) => {
    
    var airlinesID = []
    
    getAllRoutes(origen, destino, escala).then( routes=>{
      // Se obtienen los id de las aerolineas
      for (let i = 0; i < routes.length; i++) {   
        airlinesID.push(routes[i].airlineID);
      }
      // Se busca nombre de las aerolineas
      var airlines = []
      var promises = []
      for (let i = 0; i < airlinesID.length; i++) {   
        promises.push(
          getAirlinesDetails(airlinesID[i]).then( airline=>{
            airlines.push(airline)    
          })
        )
      }
      // Se espera hasta que se hayan completado todas las aerolineas
      Promise.all(promises).then( ()=> {
        return resolve (airlines)
      })
    })
    
  })  
}

function getAirlinesDetails(id){
  return new Promise((resolve, reject) =>{
    airline.find({ "airlineID": id },function(err,airlineName){
      if(err){
        return reject(err);
      }
      return resolve(airlineName)
    })
  })
}



// Se anade la función que va a devolver este .js
module.exports = {

  getAllRoutes: function(origen, destino, escala){
    return getAllRoutes(origen, destino, escala)
  },
  getAirlines: function(origen, destino, escala){
    return getAirlines(origen, destino, escala)
  },
  getCountries: function(){
    return getCountries()
  },
  getIata: function(pais){
    return getIata(pais)
  }

}