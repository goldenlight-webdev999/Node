'use strict';

var express = require('express');
var router = express.Router();
// const server = 'https://creatif.ngrok.io'
var server = 'https://enzo-customers.herokuapp.com';

router.get('/test', function (req, res) {
	res.status(200);
	res.write('enzo public test');
	res.end();
});

router.use(function (req, res, next) {
	// res.set('Content-Type', 'application/liquid')
	next();
});

router.get('/', function (req, res) {
	res.render('pages/home', {
		server: server
	});
});

router.get('/customers/create', function (req, res) {
	res.render('pages/newcustomer', {
		server: server
	});
});

router.get('/customers/create-old', function (req, res) {
	res.render('pages/newcustomer-old', {
		server: server
	});
});

router.get('/customers/:id', function (req, res) {
	res.render('pages/customer', {
		customer: req.params.id,
		server: server
	});
});

module.exports = router;