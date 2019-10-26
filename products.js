const axios = require('axios')
const GoogleSpreadsheet = require('google-spreadsheet');
const prettyjson = require('prettyjson')
var doc = new GoogleSpreadsheet('1LEi3hrAezNV5ShH6WbBBE49m0Kz-8dtVLvWFOCirj0c');
var sheet;
var creds_json = {
	client_email: "heydademails@sheets-api-166620.iam.gserviceaccount.com",
	private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9C+Nxeq7nOiyA\n6YpDKJbW1mgOkazkXJ9Vzl+iS56nGfN5Ysxo5/YfN/D+qR96Td19mJXsyB0wNh8J\nHM9TH7aGnzbqGZazZ7NcwR9HnK3M4CVnUBagDyL/arg+4U09rx0+obihqcFp6A9v\nlNCCB9QdO17amJT0gwKry7L8r54GIPegXBCi0qx4a3Kz4R8ECXYO8DkS31t/+K7/\nRVL5/FZMfYacwI1aUJxSEEQt3CFrnsoQce1KdUcOSH8p7lKhe3hqyZm5HomTu5O+\nnQxyU+EZfeFwZ6ln1o8AOO2iTw6KiuePFHJjJgIN6lS4hkcykUjytPci+MMhLCmj\nfGz6jve9AgMBAAECggEAIKqXvCmrZGhAfWwdiJpQakI1S+MvQWyh2cVl8BjqCszo\nrf58/NmsRVu4yIB34H3o+oVtzrMLnCOV/FCeoKn3s856Qjx2tnyCWVJDse+odqD6\nxZ3osvK6pPEPckojOzfxsTtnuIOpWMARPsIzv2xT4lM6gkJgZtnmkcIKpTBBeaRX\nrUylnhJN1+Ykl8OXNk4BOOUCo76rvMbsHhvbenqlPqWGx7sYmSVfMQmY9DKf1ZHU\nbFw0qlMhAsymfSI1v71EqKqkXM5HLXMX+WXVlHNbL5LuUGDWQ6+esSbHhGtk4PW/\nD/hg4DKn8vivazUiaxZ9BfK5A04fFxG5iFbLxvVuDwKBgQDeiBI20Zm4fK/I11Ll\nlqFSNzv0mhx/8s+XANYhSyDlVIgbrA2UKz8pUJmQ7G45xyqN7Op50Aan6B1hlbJY\neN1UpWbqcCNi79q16Kqe6qvOWJW1ZKXLH2YvuTTtwgxijkahlxaYoXDg9FrdlCux\nD5sdiyuDGdudksi0id03hCTvXwKBgQDZepJIKa5TF8aji5mPy5+DL2AvKPG1aqBg\nOu2dhyiUJeM7pJlr256MH3SB9POyZra4CYSluvn6q6cAGxuNPqta62PzMbpOcaRd\nG1zSo7NW1Si8pgnxnys/CQrVfzFiBblzRBWRUIIMTLEa+vj+gLXO5DPhMto/PlKg\nBA9PA0FaYwKBgGr3/8FoKbt7/EfP8aI5MRzDPkfLGO4MOut8VHI2mf6DDtY2c2SJ\nEVh7zQXUEPwnF/aXLvMVI03tDsqM2ekbWFFLHNiOxQPXBkwxJmszpRiQjo5ebi/g\nzQ8duSqc/7UUbTFZ3lvKJueLrm4avpHjTY37CxR/BomNOHtIVhVMqTCDAoGAUAbe\nlVdhIop5Oe1A0L0pMWjZiAEVEKDv6vlEPtdhg0J935CuNBZYvU9F3Bx7IIbTbd1y\nxlmLa0aG6W8QMGWDQK2l1fPSjtManHhZK9m5QJanquOefR8JFuUI648maN+aYmQH\nW7W4ZTZDZZ48ycorHLq0rIW98c/JL8DOsVCNV+kCgYEAkDV9qAUCmwc+eagn7ocW\nrLD1McpNT2TBX4MOZ/GAczj31hGwjJqEUMi3Ne23liFOe/4i3l199idBmRWT57CA\n2kyFulxt0tTaO90FgavJ22Bog3+YWeJnMswERp6XLYJ+GLHvd5nlH81r4LWaFPJF\nJ7yz3sTUKyMmGhrdKIJsGGs=\n-----END PRIVATE KEY-----\n"
}

const shopify = axios.create({
	baseURL: 'https://enzo-custom.myshopify.com/admin',
	auth: {
		username: 'df8b9f9a0d19ef332383ede86995bf4a',
		password: '7be290c5e734f92be0ea323b42b6a05b'
	}
})

let rowsToEdit = []
let ids = []
doc.useServiceAccountAuth(creds_json, function(err) {
	if (err) {console.log('Error')}
		doc.getInfo(function(err, info) {
			if (err) {
				console.log('error 1')
			} else {
				// console.log(info)
				let sheets = info.worksheets
				let limit = sheets.length
				let progress = 0
				getSheet(progress)
				function getSheet(progress) {
					sheets[progress].getRows({
						offset: 0
					}, (err, rows) => {
						if (err) {
							console.log(err)
						} else {
							let keyObj;
							rows.forEach((row, index) => {
								if (index == 0 && progress == 0) {
									keyObj = row
									delete keyObj._xml
									delete keyObj.id
									delete keyObj._links
									for (let key in keyObj) {
										if (key == 'app:edited') {
											delete keyObj[key]
										}
									}
									console.log(keyObj)
								}
								if (progress == 0 && index !== 0) {
									let obj = {}
									delete row._xml
									delete row.id
									delete row._links
									delete row.save
									delete row.del
									for (let key in row) {
										if (key == 'app:edited') {
											delete obj[key]
										}
									}
									for (let key in keyObj) {
										obj[keyObj[key]] = row[key]
									}
									if (index == 2) {
										let counter = 0
										if (obj.edited == 'TRUE') {
											rowsToEdit.push(obj)
											updateProducts(counter)
										}
									}
									console.log(prettyjson.render(obj))
								}
								if (row.edited == 'TRUE') {
									ids.push(row.shopifyid)
									let obj = row
									delete obj._xml
									delete obj.id
									delete obj._links
									for (let key in obj) {
										if (key == 'app:edited') {
											delete obj[key]
										}
									}
									rowsToEdit.push(obj)
								}
							})
							progress++
							if (rowsToEdit.length > 0 && progress == limit) {
								let counter = 0
									// updateProducts(counter)
									console.log('done')
									console.log(rowsToEdit)
								} else if (progress !== limit) {
									getSheet(progress)
								} else {
									console.log('else')
									console.log(progress, limit)
								}
							}
						})
				}
			}
		});
})

function updateProducts(counter) {
	console.log(rowsToEdit)
	console.log(rowsToEdit[counter].shopifyid)
	let pid = parseInt(rowsToEdit[counter].shopifyid)
	console.log(pid)
	let tmpObj = rowsToEdit[counter]
	delete tmpObj.shopifyid
	delete tmpObj.edited
	console.log(JSON.stringify(tmpObj))
	let mf = {
		metafield: {
			namespace: "enzoproducts",
			key: "configuration",
			value: JSON.stringify(tmpObj),
			value_type: "string"
		}
	}
	console.log('Updating Metafield for ' + pid)
	shopify.post(`/products/${pid}/metafields.json`, mf)
	.then(response => {
		console.log('Metafield updated')
		counter++
		if (counter == rowsToEdit.length) {
			updateSheet(0)
		} else {
			updateProducts(counter)
		}
	})
	.catch(error => {
		console.log(error.response.data)
	})
}

function updateSheet(progress) {
	doc.getInfo(function(err, info) {
		if (err) {
			console.log('error 1')
		} else {
			let sheets = info.worksheets
			let limit = sheets.length
			getSheet(progress)
			function getSheet(progress) {
				sheets[progress].getRows({
					offset: 1
				}, (err, rows) => {
					if (err) {
						console.log(err)
					} else {
						console.log(rows)
						rows.forEach((row, index) => {
							let pid = row.shopifyid
							if (ids.indexOf(pid) !== -1) {
								row.edited = 'FALSE'
								row.save()
							}
							progress++
							if (progress !== limit) {
								updateSheet(progress)
							}
						})
					}
				})
			}
		}
	});
}