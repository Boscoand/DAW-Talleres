const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const airports = require('./database/getAirports')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/printAirports', (req, res) => {

  console.log(airports.printAirports())
  res.send({
    message: `Aeropuertos impresos en consola`
  })

})

app.listen(process.env.PORT || 8081)

// axios. Libreria que va en el front y sirve para hacer solicitudas http
// express
// body-parser
// cors
// morgan
