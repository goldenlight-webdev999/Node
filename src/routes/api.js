const express = require('express')
const router = express.Router()
const prettyjson = require('prettyjson')
const axios = require('axios')

const shopify = axios.create({
	baseURL: 'https://enzo-custom.myshopify.com/admin',
	auth: {
		username: 'df8b9f9a0d19ef332383ede86995bf4a',
		password: '7be290c5e734f92be0ea323b42b6a05b'
	}
})

router.get('/test', (req, res) => {
	res.status(200)
	res.write('enzo api test')
	res.end()
})

router.get('/customers', (req, res) => {
	res.status(200)
	shopify.get('/customers.json')
	.then(response => {
		console.log(response.data)
		res.json(response.data)
		res.end()
	})
	.catch(error => {
		console.log(error)
		res.json(error)
		res.end()
	})
})

router.post('/customers/update', (req, res) => {
	// console.log(prettyjson.render(req.body))
	let obj = {}
	obj.customer = req.body.customer
	let mf = {}
	let samples = []
	for (let key in req.body.mf) {
		if (req.body.mf[key].sample !== undefined) {
			samples.push(`customer_${key}:${req.body.mf[key].sample}`)
		}
		// console.log(key)
		let array = req.body.mf[key]
		if (key == 'measurements' || key == 'meta' || key == 'posture') {
			let arr = req.body.mf[key].map(mf => {
				return `${mf.key}:${mf.value}`
			})
			if (key == 'meta') {
				arr.push(`birthday:${req.body.customer.birthday}`)
			}
			mf[key] = arr.join(';')
		} else {
			let sizing = []
			for (let fieldKey in req.body.mf[key].fields) {
				sizing.push(`${fieldKey}:${req.body.mf[key].fields[fieldKey]}`)
			}
			if (key !== 'overcoat') {
				req.body.mf[key].meta.forEach(metafield => {
					sizing.push(`${metafield.key}:${metafield.value}`)
				})
			}
			mf[key] = sizing.join(';')
		}
	}
	obj.customer.addresses[0].company = req.body.customer.company
	obj.customer.addresses[0].first_name = req.body.customer.first_name
	obj.customer.addresses[0].last_name = req.body.customer.last_name
	delete obj.customer.birthday
	delete obj.customer.company
	delete obj.customer.metafields
	obj.mf = mf
	let metafields = []
	for (let mfkey in obj.mf) {
		let mfobj = {
			key: mfkey,
			value: obj.mf[mfkey],
			value_type: 'string',
			namespace: 'enzocustom'
		}
		// console.log(mfobj)
		metafields.push(mfobj)
	}
	metafields.push({key:'samples',value:samples.join(';'),value_type:'string',namespace:'enzocustom'})
	// obj.customer.metafields = metafields
	// console.log('== DONE W/ UPDATE ==')
	console.log(prettyjson.render(obj.customer))
	let measurements = req.body.mf.measurements.map(measurement => {
		return `${measurement.key}:${measurement.value}`
	})

	let customerobj = {
		customer: obj.customer
	}

	var axiosConfig = {
		baseURL: 'https://enzo-custom.myshopify.com/admin',
		method: 'post',
		auth: {
			username: 'df8b9f9a0d19ef332383ede86995bf4a',
			password: '7be290c5e734f92be0ea323b42b6a05b'
		}
	}

	let updateMeta = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[0]})}
	let updateMeasurements = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[1]})}
	let updatePosture = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[2]})}
	let updateJacket = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[3]})}
	let updatePants = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[4]})}
	let updateVest = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[5]})}
	let updateShirt = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[6]})}
	let updateSamples = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[7]})}
	let updateOvercoat = () => {return shopify.post(`/customers/${req.body.id}/metafields.json`, {metafield: metafields[8]})}

	axios.all([updateMeta(),updateMeasurements(),updatePosture(),updateJacket(),updatePants(),updateVest(),updateShirt(),updateSamples(),updateOvercoat()])
	.then(results => {
		console.log(results)
	})
	.catch(error => {
		console.log(error)
	})

	shopify.put(`/customers/${req.body.id}.json`, customerobj)
	.then(response => {
		console.log(response.data)
		res.json({"msg":"success", "data": response.data})
		res.end()
	})
	.catch(error => {
		console.log(error.response.data)
		res.json({"msg":"failure", "data": error.response.data})
		res.end()
	})
})

router.get('/customers/:id', (req, res) => {
	console.log(`GET Customer: #${req.params.id}`)
	res.status(200)
	let obj = {}
	let getcustomer = () => {
		return shopify.get(`/customers/${req.params.id}.json`)
	}
	let getmetafields = () => {
		return shopify.get(`/customers/${req.params.id}/metafields.json`)
	}
	let getorders = () => {
		return shopify.get(`/orders.json?customer_id=${req.params.id}`)
	}
	axios.all([getcustomer(), getmetafields(), getorders()])
	.then(results => {
		results.forEach(result => {
			if (result.data.metafields) {
				// console.log(result.data)
				obj.metafields = result.data
			} else if (result.data.customer) {
				// console.log(result.data)
				obj.customer = result.data
			} else {
				obj.orders = result.data
			}
		})
		// console.log(prettyjson.render(obj))
		res.json(obj)
		res.end()
	})
})

router.post('/customers/create', (req, res) => {
	// console.log(prettyjson.render(req.body))
	let obj = {}
	obj.customer = req.body.customer
	let mf = {}
	let samples = []
	for (let key in req.body.mf) {
		if (req.body.mf[key].sample !== undefined) {
			samples.push(`customer_${key}:${req.body.mf[key].sample}`)
		}
		// console.log(key)
		let array = req.body.mf[key]
		if (key == 'measurements' || key == 'meta' || key == 'posture') {
			let arr = req.body.mf[key].map(mf => {
				return `${mf.key}:${mf.value}`
			})
			if (key == 'meta') {
				arr.push(`birthday:${req.body.customer.birthday}`)
			}
			mf[key] = arr.join(';')
		} else {
			let sizing = []
			for (let fieldKey in req.body.mf[key].fields) {
				sizing.push(`${fieldKey}:${req.body.mf[key].fields[fieldKey]}`)
			}
			if (key !== 'overcoat') {
				req.body.mf[key].meta.forEach(metafield => {
					sizing.push(`${metafield.key}:${metafield.value}`)
				})
			}
			mf[key] = sizing.join(';')
		}
	}
	obj.customer.addresses[0].company = req.body.customer.company
	obj.customer.addresses[0].first_name = req.body.customer.first_name
	obj.customer.addresses[0].last_name = req.body.customer.last_name
	delete obj.customer.birthday
	delete obj.customer.company
	delete obj.customer.metafields
	obj.mf = mf
	let metafields = []
	for (let mfkey in obj.mf) {
		let mfobj = {
			key: mfkey,
			value: obj.mf[mfkey],
			value_type: 'string',
			namespace: 'enzocustom'
		}
		// console.log(mfobj)
		metafields.push(mfobj)
	}
	metafields.push({key:'samples',value:samples.join(';'),value_type:'string',namespace:'enzocustom'})
	obj.customer.metafields = metafields
	console.log('== DONE ==')
	console.log(prettyjson.render(obj.customer))
	let measurements = req.body.mf.measurements.map(measurement => {
		return `${measurement.key}:${measurement.value}`
	})
	// console.log(prettyjson.render(req.body.mf))
	// console.log(measurements.join(';'))
	let shopifyobj = {
		customer: obj.customer
	}
	// res.json({"msg":"success"})
	// res.json()
	shopify.post(`/customers.json`, shopifyobj)
	.then(response => {
		console.log(response.data)
		res.json({"msg":"success", "data": response.data})
		res.end()
	})
	.catch(error => {
		console.log(error.response.data)
		res.json({"msg":"failure", "data": error.response.data})
		res.end()
	})
})

router.get('/customers/:id', (req, res) => {
	res.status(200)
	let obj = {}
	let getcustomer = () => {
		return shopify.get(`/customers/${req.params.id}.json`)
	}
	let getmetafields = () => {
		return shopify.get(`/customers/${req.params.id}/metafields.json`)
	}
	axios.all([getcustomer(), getmetafields()])
	.then(results => {
		results.forEach(result => {
			if (result.data.metafields) {
				console.log(result.data)
				obj.metafields = result.data
			} else {
				console.log(result.data)
				obj.customer = result.data
			}
		})
		console.log(prettyjson.render(obj))
		res.json(obj)
		res.end()
	})
})

module.exports = router