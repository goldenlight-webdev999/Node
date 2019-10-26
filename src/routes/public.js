const express = require('express')
const router = express.Router()
// const server = 'https://creatif.ngrok.io'
const server = 'https://enzo-customers.herokuapp.com'

router.get('/test', (req, res) => {
	res.status(200)
	res.write('enzo public test')
	res.end()
})

router.use((req, res, next) => {
	// res.set('Content-Type', 'application/liquid')
	next()
})

router.get('/', (req, res) => {
	res.render('pages/home', {
		server: server
	})
})

router.get('/customers/create', (req, res) => {
	res.render('pages/newcustomer', {
		server: server
	})
})

router.get('/customers/create-old', (req, res) => {
	res.render('pages/newcustomer-old', {
		server: server
	})
})

router.get('/customers/:id', (req, res) => {
	res.render('pages/customer', {
		customer: req.params.id,
		server: server
	})
})

module.exports = router