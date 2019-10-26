//node_modules
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

//local constants
const api = require('./routes/api.js')
const publicapp = require('./routes/public.js')
// const server = 'https://creatif.ngrok.io'
const server = 'https://enzo-customers.herokuapp.com'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/assets'));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api', api)
app.use('/public', publicapp)

app.listen(process.env.PORT || 3001)
console.log('Listening on port 3001...')