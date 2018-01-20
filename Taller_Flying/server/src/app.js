const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const airports = require('./database/getAirports')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/getAllRoutes', (req, res) => {
	
	console.log(req.query)
	var origen = req.query.origen
	var destino = req.query.destino
	var escala = req.query.escala

	airports.getAllRoutes(origen,destino,escala).then(result =>{
		res.send(result)	
	})

})

app.get('/getAirlines', (req, res) => {
	console.log(req.query)
	var origen = req.query.origen
	var destino = req.query.destino
	var escala = req.query.escala

	airports.getAirlines(origen,destino,escala).then(result =>{
		res.send(result)	
	})

})

// 
app.get('/getCountries', (req, res) => {

	airports.getCountries().then(result =>{
		res.send(result)	
	})

})

// Devuelve las ciudades 
app.get('/getCities', (req, res) => {

	airports.getCities().then(result =>{
		res.send(result)	
	})

})

let data = []

// Ingresar deseos de usuarios
app.post('/postForm', (req, res) => {

	data.push({"nombre": req.query.nombres, "celular": req.query.celular})
	console.log(data)
	res.end("yes")
})

app.get('/getIata', (req, res) => {

	airports.getIata("Iceland").then(result =>{
		res.send(result)	
	})

})

app.listen(process.env.PORT || 8081)

// axios. Libreria que va en el front y sirve para hacer solicitudas http
// express
// body-parser
// cors
// morgan
