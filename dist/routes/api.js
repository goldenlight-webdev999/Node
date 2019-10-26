'use strict';

var express = require('express');
var router = express.Router();
var prettyjson = require('prettyjson');
var axios = require('axios');

var shopify = axios.create({
	baseURL: 'https://enzo-custom.myshopify.com/admin',
	auth: {
		username: 'df8b9f9a0d19ef332383ede86995bf4a',
		password: '7be290c5e734f92be0ea323b42b6a05b'
	}
});

router.get('/test', function (req, res) {
	res.status(200);
	res.write('enzo api test');
	res.end();
});

router.get("/customers", function(req, res) {
  res.status(200);
  let pages = 0;
  let customers = [];
  shopify
    .get(`/customers/count.json`)
    .then(response => {
      pages = Math.ceil(response.data.count / 250);
      getCustomers(1, pages);
    })
    .catch(error => {
      console.log(error);
    });
  function getCustomers(page, pages) {
    shopify.get(`/customers.json?limit=250&page=${page}`).then(response => {
      customers = customers.concat(response.data.customers);
      page = page+1;
      if (page > pages) {
        res.json({"customers": customers});
        res.end();
      } else {
        getCustomers(page, pages);
      }
    });
  }
});

router.get('/customer_page', function (req, res) {
	res.status(200);
	shopify.get("/customers.json", req).then(function (response) {
		console.log(response.data);
		res.json(response.data);
		res.end();
	}).catch(function (error) {
		console.log(error);
		res.json(error);
		res.end();
	});
});

router.get('/customer_count', function (req, res) {
	res.status(200);
	shopify.get('/customers/count.json').then(function (response) {
		console.log(response.data);
		res.json(response.data);
		res.end();
	}).catch(function (error) {
		console.log(error);
		res.json(error);
		res.end();
	});
});

router.post('/customers/update', function (req, res) {
	// console.log(prettyjson.render(req.body))
	var obj = {};
	obj.customer = req.body.customer;
	var mf = {};
	var samples = [];
	for (var key in req.body.mf) {
		if (req.body.mf[key].sample !== undefined) {
			samples.push('customer_' + key + ':' + req.body.mf[key].sample);
		}
		// console.log(key)
		var array = req.body.mf[key];
		if (key == 'measurements' || key == 'meta' || key == 'posture') {
			var arr = req.body.mf[key].map(function (mf) {
				return mf.key + ':' + mf.value;
			});
			if (key == 'meta') {
				arr.push('birthday:' + req.body.customer.birthday);
			}
			mf[key] = arr.join(';');
		} else {
			(function () {
				var sizing = [];
				for (var fieldKey in req.body.mf[key].fields) {
					sizing.push(fieldKey + ':' + req.body.mf[key].fields[fieldKey]);
				}
				if (key !== 'overcoat') {
					req.body.mf[key].meta.forEach(function (metafield) {
						sizing.push(metafield.key + ':' + metafield.value);
					});
				}
				mf[key] = sizing.join(';');
			})();
		}
	}
	obj.customer.addresses[0].company = req.body.customer.company;
	obj.customer.addresses[0].first_name = req.body.customer.first_name;
	obj.customer.addresses[0].last_name = req.body.customer.last_name;
	delete obj.customer.birthday;
	delete obj.customer.company;
	delete obj.customer.metafields;
	obj.mf = mf;
	var metafields = [];
	for (var mfkey in obj.mf) {
		var mfobj = {
			key: mfkey,
			value: obj.mf[mfkey],
			value_type: 'string',
			namespace: 'enzocustom'
			// console.log(mfobj)
		};metafields.push(mfobj);
	}
	metafields.push({ key: 'samples', value: samples.join(';'), value_type: 'string', namespace: 'enzocustom' });
	// obj.customer.metafields = metafields
	// console.log('== DONE W/ UPDATE ==')
	console.log(prettyjson.render(obj.customer));
	var measurements = req.body.mf.measurements.map(function (measurement) {
		return measurement.key + ':' + measurement.value;
	});

	var customerobj = {
		customer: obj.customer
	};

	var axiosConfig = {
		baseURL: 'https://enzo-custom.myshopify.com/admin',
		method: 'post',
		auth: {
			username: 'df8b9f9a0d19ef332383ede86995bf4a',
			password: '7be290c5e734f92be0ea323b42b6a05b'
		}
	};

	var updateMeta = function updateMeta() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[0] });
	};
	var updateMeasurements = function updateMeasurements() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[1] });
	};
	var updatePosture = function updatePosture() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[2] });
	};
	var updateJacket = function updateJacket() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[3] });
	};
	var updatePants = function updatePants() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[4] });
	};
	var updateVest = function updateVest() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[5] });
	};
	var updateShirt = function updateShirt() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[6] });
	};
	var updateSamples = function updateSamples() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[7] });
	};
	var updateOvercoat = function updateOvercoat() {
		return shopify.post('/customers/' + req.body.id + '/metafields.json', { metafield: metafields[8] });
	};

	axios.all([updateMeta(), updateMeasurements(), updatePosture(), updateJacket(), updatePants(), updateVest(), updateShirt(), updateSamples(), updateOvercoat()]).then(function (results) {
		console.log(results);
	}).catch(function (error) {
		console.log(error);
	});

	shopify.put('/customers/' + req.body.id + '.json', customerobj).then(function (response) {
		console.log(response.data);
		res.json({ "msg": "success", "data": response.data });
		res.end();
	}).catch(function (error) {
		console.log(error.response.data);
		res.json({ "msg": "failure", "data": error.response.data });
		res.end();
	});
});

router.get('/customers/:id', function (req, res) {
	console.log('GET Customer: #' + req.params.id);
	res.status(200);
	var obj = {};
	var getcustomer = function getcustomer() {
		return shopify.get('/customers/' + req.params.id + '.json');
	};
	var getmetafields = function getmetafields() {
		return shopify.get('/customers/' + req.params.id + '/metafields.json');
	};
	var getorders = function getorders() {
		return shopify.get('/orders.json?customer_id=' + req.params.id);
	};
	axios.all([getcustomer(), getmetafields(), getorders()]).then(function (results) {
		results.forEach(function (result) {
			if (result.data.metafields) {
				// console.log(result.data)
				obj.metafields = result.data;
			} else if (result.data.customer) {
				// console.log(result.data)
				obj.customer = result.data;
			} else {
				obj.orders = result.data;
			}
		});
		// console.log(prettyjson.render(obj))
		res.json(obj);
		res.end();
	});
});

router.post('/customers/create', function (req, res) {
	// console.log(prettyjson.render(req.body))
	var obj = {};
	obj.customer = req.body.customer;
	var mf = {};
	var samples = [];
	for (var key in req.body.mf) {
		if (req.body.mf[key].sample !== undefined) {
			samples.push('customer_' + key + ':' + req.body.mf[key].sample);
		}
		// console.log(key)
		var array = req.body.mf[key];
		if (key == 'measurements' || key == 'meta' || key == 'posture') {
			var arr = req.body.mf[key].map(function (mf) {
				return mf.key + ':' + mf.value;
			});
			if (key == 'meta') {
				arr.push('birthday:' + req.body.customer.birthday);
			}
			mf[key] = arr.join(';');
		} else {
			(function () {
				var sizing = [];
				for (var fieldKey in req.body.mf[key].fields) {
					sizing.push(fieldKey + ':' + req.body.mf[key].fields[fieldKey]);
				}
				if (key !== 'overcoat') {
					req.body.mf[key].meta.forEach(function (metafield) {
						sizing.push(metafield.key + ':' + metafield.value);
					});
				}
				mf[key] = sizing.join(';');
			})();
		}
	}
	obj.customer.addresses[0].company = req.body.customer.company;
	obj.customer.addresses[0].first_name = req.body.customer.first_name;
	obj.customer.addresses[0].last_name = req.body.customer.last_name;
	delete obj.customer.birthday;
	delete obj.customer.company;
	delete obj.customer.metafields;
	obj.mf = mf;
	var metafields = [];
	for (var mfkey in obj.mf) {
		var mfobj = {
			key: mfkey,
			value: obj.mf[mfkey],
			value_type: 'string',
			namespace: 'enzocustom'
			// console.log(mfobj)
		};metafields.push(mfobj);
	}
	metafields.push({ key: 'samples', value: samples.join(';'), value_type: 'string', namespace: 'enzocustom' });
	obj.customer.metafields = metafields;
	console.log('== DONE ==');
	console.log(prettyjson.render(obj.customer));
	var measurements = req.body.mf.measurements.map(function (measurement) {
		return measurement.key + ':' + measurement.value;
	});
	// console.log(prettyjson.render(req.body.mf))
	// console.log(measurements.join(';'))
	var shopifyobj = {
		customer: obj.customer
		// res.json({"msg":"success"})
		// res.json()
	};shopify.post('/customers.json', shopifyobj).then(function (response) {
		console.log(response.data);
		res.json({ "msg": "success", "data": response.data });
		res.end();
	}).catch(function (error) {
		console.log(error.response.data);
		res.json({ "msg": "failure", "data": error.response.data });
		res.end();
	});
});

router.get('/customers/:id', function (req, res) {
	res.status(200);
	var obj = {};
	var getcustomer = function getcustomer() {
		return shopify.get('/customers/' + req.params.id + '.json');
	};
	var getmetafields = function getmetafields() {
		return shopify.get('/customers/' + req.params.id + '/metafields.json');
	};
	axios.all([getcustomer(), getmetafields()]).then(function (results) {
		results.forEach(function (result) {
			if (result.data.metafields) {
				console.log(result.data);
				obj.metafields = result.data;
			} else {
				console.log(result.data);
				obj.customer = result.data;
			}
		});
		console.log(prettyjson.render(obj));
		res.json(obj);
		res.end();
	});
});

//Search Functionality

router.get('/search/:id', function(req,res) {
	shopify.get(`/customers/search.json?query=${req.params.id}`).then(response => {
		if (response.status === 200) {
			res.status(200);
			res.json(response.data);
			return
		} else {
			throw '404';
		}
	}).catch(error => {
		console.log(error);
		res.json(error);
		res.end();
	});
});


module.exports = router;