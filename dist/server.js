'use strict';

//node_modules
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

//local constants
var api = require('./routes/api.js');
var publicapp = require('./routes/public.js');
// const server = 'https://creatif.ngrok.io'
var server = 'https://enzo-customers.herokuapp.com';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);
app.use('/public', publicapp);

app.listen(process.env.PORT || 3001);
console.log('Listening on port 3001...');