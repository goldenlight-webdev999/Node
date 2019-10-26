"use strict";

// const server = 'https://creatif.ngrok.io/api';
var server = 'https://enzo-customers.herokuapp.com/api';

var config = {
	"modal": {
		"order": {},
		"show": false
	},
	"config": {
		"step": 1,
		"steps": ["Info", "Measurements", "Jacket", "Pants", "Vest", "Shirt", "Overcoat"]
	},
	"calcReset": false,
	"edit": false,
	"orders": [],
	"customer_fields": [{
		"key": "first_name",
		"title": "First Name",
		"type": "text"
	}, {
		"key": "last_name",
		"title": "Last Name",
		"type": "text"
	}, {
		"key": "email",
		"title": "Email",
		"type": "text"
	}, {
		"key": "birthday",
		"title": "Birthday",
		"type": "date"
	}, {
		"key": "phone",
		"title": "Cell Phone",
		"type": "text"
	}],
	"customer_address_fields": [{
		"key": "address1",
		"title": "Address 1",
		"type": "text"
	}, {
		"key": "address2",
		"title": "Address 2",
		"type": "text"
	}, {
		"key": "city",
		"title": "City",
		"type": "text"
	}, {
		"key": "province",
		"title": "State",
		"type": "text"
	}, {
		"key": "country",
		"title": "Country",
		"type": "text"
	}, {
		"key": "zip",
		"title": "Zip Code",
		"type": "text"
	}, {
		"key": "company",
		"title": "Company",
		"type": "text"
	}],
	"customer_meta": [{
		"value": "",
		"key": "showroom",
		"title": "Showroom",
		"type": "dropdown",
		"options": ["New York", "Pennsylvania", "Washington D.C.", "Chicago", "Beverly Hills"]
	}, {
		"value": "",
		"key": "lead_source",
		"title": "Lead Source",
		"type": "dropdown",
		"options": ["Google", "Yelp", "Referral", "Other"]
	}],
	"customer_measurements": [{
		"key": "body_height",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Body Height",
		"type": "text"
	}, {
		"key": "weight",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Weight* (lbs)",
		"type": "text"
	}, {
		"key": "neck",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Neck* (in)",
		"type": "text"
	}, {
		"key": "chest",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Chest* (in)",
		"type": "text"
	}, {
		"key": "waist",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Waist* (in)",
		"type": "text"
	}, {
		"key": "seat",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Seat* (in)",
		"type": "text"
	}, {
		"key": "thigh",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Thigh* (in)",
		"type": "text"
	}, {
		"key": "bicep",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Bicep* (in)",
		"type": "text"
	}, {
		"key": "wrists",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Right Wrist/Left Wrist* (in)",
		"type": "text"
	}, {
		"key": "arms",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Right Arm/Left Arm (in)",
		"type": "text"
	}, {
		"key": "shoulder_width",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Shoulder Width (in)",
		"type": "text"
	}, {
		"key": "back_length",
		"namespace": "ec_measurements",
		"value": "",
		"value_type": "string",
		"title": "Back Length (in)",
		"type": "text"
	}],
	"customer_posture": [{
		"key": "shoulder_profile_left",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Shoulder Profile Left",
		"type": "dropdown",
		"_options": ["Very High (G) 1.5", "High (F) 1.0", "Slight High (E) 0.5", "Regular (A)", "Slight Slope (B) 0.5", "Slope (C) 1.0", "Very Slope (D) 1.5"]
	}, {
		"key": "shoulder_profile_right",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Shoulder Profile Right",
		"type": "dropdown",
		"_options": ["Very High (G) 1.5", "High (F) 1.0", "Slight High (E) 0.5", "Regular (A)", "Slight Slope (B) 0.5", "Slope (C) 1.0", "Very Slope (D) 1.5"]
	}, {
		"key": "shoulder_position",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Shoulder Position",
		"type": "dropdown",
		"_options": ["Very Backward", "Slight Backward", "Regular", "Slight Forward", "Very Forward"]
	}, {
		"key": "stoop",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Stoop",
		"type": "dropdown",
		"_options": ["Regular (None)", "Slight Stoop", "Moderate Stoop", "Very Stoop"]
	}, {
		"key": "posture_profile_stance",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Posture Profile/Stance",
		"type": "dropdown",
		"_options": ["Forward 1.0", "Forward 0.8", "Forward 0.5", "Backward 0.5", "Backward 0.8", "Backward 1.0"]
	}, {
		"key": "arm_position",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Arm Position",
		"type": "dropdown",
		"_options": ["Forward","Backward","Slight Backward","Regular"]
	}, {
		"key": "midsection_profile",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Midsection Profile",
		"type": "dropdown",
		"_options": ["Regular", "Portly"]
	}, {
		"key": "seat_profile",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Seat Profile",
		"type": "dropdown",
		"_options": ["Prominent", "Regular", "Flat", "Drop"]
	}, {
		"key": "waistband",
		"namespace": "ec_posture",
		"value": "",
		"value_type": "string",
		"title": "Waistband",
		"type": "dropdown",
		"_options": ["High 2.0 cm", "High 1.0 cm", "Regular", "Low 1.0 cm", "Low 2.0 cm"]
	}],
	"customer_jacket": {
		"config": {
			"names": ["34/38", "36/40", "38/42", "40/44", "42/46", "44/48", "46/50", "48/52", "50/54", "54/58", "58/62"],
			"neck": [13, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5],
			"chest": [38, 40, 42, 44, 46, 48, 50, 52, 54, 58, 62],
			"stomach": [34, 36, 38, 40, 42, 44, 46, 48, 50, 58, 62],
			"seat": [37, 39, 41, 43, 45, 47, 49, 51, 53, 58, 62],
			"shoulder": [17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22],
			"right_sleeve": [23, 24, 24.5, 25, 25, 25.5, 25.5, 26, 26.5, 27, 27.5],
			"left_sleeve": [23, 24, 24.5, 25, 25, 25.5, 25.5, 26, 26.5, 27, 27.5],
			"bicep": [14, 15, 16, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5],
			"back_length": [27, 28, 28.5, 29, 30, 31, 31.5, 32, 32.5, 33, 33.5]
		},
		"fields": { "neck": "", "chest": "", "stomach": "", "seat": "", "shoulder": "", "right_sleeve": "", "left_sleeve": "", "bicep": "", "back_length": "" },
		"meta": [{
			"key": "front_button_stance_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Front Button Stance Adjust",
			"_type": "dropdown",
			"_options": ["Raise 4 cm", "Raise 1 cm", "Lower 1 cm", "Lower 2 cm", "Lower 3 cm", "Lower 4 cm"]
		}, {
			"key": "lapel_darts",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Lapel Darts",
			"_type": "dropdown",
			"_options": ["Single", "Double"]
		}, {
			"key": "shoulder_pad_right",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Should Pad Right",
			"_type": "dropdown",
			"_options": ["2 cm", "1.2 cm", "0.6 cm"]
		}, {
			"key": "shoulder_pad_left",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Shoulder Pad Left",
			"_type": "dropdown",
			"_options": ["0.6 cm", "1.2 cm", "2 cm"]
		}, {
			"key": "collar_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Collar Adjust",
			"_type": "dropdown",
			"_options": ["Raise 1 cm", "Raise 0.6 cm", "Raise 0.3 cm", "Lower 0.3 cm", "Lower 0.6 cm", "Lower 1 cm"]
		}, {
			"key": "armhole_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Armhole Adjust",
			"_type": "dropdown",
			"_options": ["Decrease (Shallow) 2.0 cm", "Decrease (Shallow) 1.0 cm", "Decrease (Shallow) 0.5 cm", "Increase (Deepen) 0.5 cm", "Increase (Deepen) 1.0 cm", "Increase (Deepen) 1.5 cm"]
		}, {
			"key": "forearm_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Forearm Adjust",
			"_type": "dropdown",
			"_options": ["Reduce 4 cm", "Reduce 3 cm", "Reduce 2 cm", "Reduce 1 cm", "Increase 1 cm", "Increase 2 cm", "Increase 3 cm", "Increase 4 cm"]
		}, {
			"key": "half_back_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Half Back Adjust",
			"_type": "dropdown",
			"_options": ["Reduce 1.5 cm", "Reduce 1.0 cm", "Reduce 0.5 cm", "Increase 0.5 cm", "Increase 1.0 cm", "Increase 1.5 cm"]
		}, {
			"key": "gorge_line",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Gorge Line",
			"_type": "dropdown",
			"_options": ["Raise 1 cm", "Lower 2 cm", " Lower 3 cm", "Lower 5 cm"]
		}, {
			"key": "front_length_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Front Length Adjust",
			"_type": "dropdown",
			"_options": ["Shorten 1 cm", "Shorten 1.3 cm", "Lengthen 2.5 cm"]
		}, {
			"key": "vent_length_adjust",
			"namespace": "ec_jackets",
			"value": "default",
			"value_type": "string",
			"_title": "Vent Length Adjust",
			"_type": "dropdown",
			"_options": ["Lengthen 6 cm", "Lengthen 4 cm", "Lengthen 2 cm", "Shorten 2 cm", "Shorten 4 cm", "Shorten 6 cm"]
		}, {
			"key": "notes",
			"namespace": "ec_jackets",
			"value": "",
			"value_type": "string",
			"_title": "Notes",
			"_type": "textarea"
		}],
		"sample": 99
	},
	"customer_pants": {
		"config": {
			"names": ["30S", "30R", "32S", "32R", "34S", "34R", "36S", "36R", "38R", "40R", "42R", "44R", "46R", "48R", "50R", "32R", "54R", "56R"],
			"waist": [30, 30, 32, 32, 34, 34, 36, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
			"seat": [37.5, 38.5, 39, 40, 41.5, 42.5, 43.25, 44.25, 45, 46.75, 48.5, 50.25, 52, 53.75, 55.5, 57.25, 59, 60.75],
			"thigh": [23.5, 24.5, 24, 25, 25, 26.5, 26, 27.25, 28, 28.75, 29.5, 30.25, 31, 31.75, 32.5, 33.25, 34, 34.75],
			"knee": [17.5, 18.5, 18, 19, 19, 19.5, 20, 20.75, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26],
			"bottom_hem": [15.75, 16.5, 16.5, 17, 16.5, 17, 17, 17.5, 18, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22],
			"right_outseam": [39.5, 39.5, 40, 40, 40.5, 40.5, 41, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46],
			"left_outseam": [39.5, 39.5, 40, 40, 40.5, 40.5, 41, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46],
			"u_rise": [24, 25, 24.5, 26, 25.5, 27, 26.5, 28, 28.5, 29.25, 30, 30.75, 31.5, 32.25, 33, 33.75, 34.5, 35.25]
		},
		"fields": { "waist": "", "seat": "", "thigh": "", "knee": "", "bottom_hem": "", "right_outseam": "", "left_outseam": "", "u_rise": "" },
		"meta": [{
			"key": "zipper_length",
			"namespace": "ec_pants",
			"value": "default",
			"value_type": "string",
			"_title": "Zipper Length",
			"_type": "dropdown",
			"_options": ["Shorten 4 cm", "Shorten 3 cm", "Shorten 2 cm", "Shorten 1 cm", "Lengthen 1 cm", "Lengthen 2 cm"]
		}, {
			"key": "notes",
			"namespace": "ec_pants",
			"value": "",
			"value_type": "string",
			"_title": "Notes",
			"_type": "textarea"
		}],
		"sample": 99
	},
	"customer_shirt": {
		"config": {
			"names": ["13.5", "14", "14.5", "15", "15.5", "16", "16.5", "17", "17.5", "18", "18.5", "19.5", "20.5"],
			"neck": [13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19.5, 20.5],
			"chest": [37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61],
			"stomach": [34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58],
			"seat": [36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
			"shoulder_ptp": [17, 17.25, 17.75, 18.25, 18.75, 19, 19.25, 20, 20.25, 20.5, 20.75, 21, 22],
			"right_sleeve": [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
			"left_sleeve": [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
			"back_length": [27, 27.5, 28.25, 29, 29.75, 30.5, 31.25, 32, 32.75, 33.5, 34.25, 34.75, 35.5],
			"bicep": [14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20],
			"right_cuff": [9, 9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12],
			"left_cuff": [9, 9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12]
		},
		"fields": { "neck": "", "chest": "", "stomach": "", "seat": "", "shoulder_ptp": "", "right_sleeve": "", "left_sleeve": "", "back_length": "", "bicep": "", "right_cuff": "", "left_cuff": "" },
		"meta": [{
			"key": "armhole_adjust",
			"namespace": "ec_shirts",
			"value": "default",
			"value_type": "string",
			"_title": "Armhole Adjust",
			"_type": "dropdown",
			"_options": ["Reduce 2 cm", "Reduce 1 cm", "Increase 1 cm", "Increase 2 cm"]
		}, {
			"key": "forearm_adjust",
			"namespace": "ec_shirts",
			"value": "default",
			"value_type": "string",
			"_title": "Forearm Adjust",
			"_type": "dropdown",
			"_options": ["Reduce 3 cm", "Reduce 2 cm", "Reduce 1 cm", "Increase 1 cm", "Increase 2 cm", "Increase 3 cm"]
		}, {
			"key": "waist_circumference_adjust",
			"namespace": "ec_shirts",
			"value": "default",
			"value_type": "string",
			"_title": "Waist Circumference Adjust",
			"_type": "dropdown",
			"_options": ["Reduce back waist 2.5 cm; Increase front waist 2.5 cm", "Reduce back waist 4 cm; Increase front waist 4 cm"]
		}, {
			"key": "notes",
			"namespace": "ec_shirts",
			"value": "",
			"value_type": "string",
			"_title": "Notes",
			"_type": "textarea"
		}],
		"sample": 99
	},
	"customer_vest": {
		"config": {
			"names": ["Sample1", "Sample2", "Sample3", "Sample4", "Sample5", "Sample6"],
			"chest": [39, 43, 47, 51, 55, 59],
			"stomach": [37, 41, 45, 49, 53, 57],
			"front_length": [24, 25, 26, 27, 28, 29],
			"back_length": [21.5, 22.5, 23.5, 24.5, 25.5, 26.5]
		},
		"fields": { "chest": "", "stomach": "", "front_length": "", "back_length": "" },
		"meta": [{
			"key": "armhole_adjust",
			"namespace": "ec_vests",
			"value": "default",
			"value_type": "",
			"_title": "Armhole Adjust",
			"_type": "dropdown",
			"_options": ["Deepen 2.5 cm", "Deepen 1.3 cm", "Raise 0.5 cm", "Raise 1 cm", "Raise 1.5 cm"]
		}, {
			"key": "shoulder_adjust",
			"namespace": "ec_vests",
			"value": "default",
			"value_type": "",
			"_title": "Shoulder Adjust",
			"_type": "dropdown",
			"_options": ["Widen 2 cm", "Widen 1 cm", "Reduce 1 cm", "Reduce 2 cm"]
		}, {
			"key": "front_button_stance_adjust",
			"namespace": "ec_vests",
			"value": "default",
			"value_type": "",
			"_title": "Front Button Stance Adjust",
			"_type": "dropdown",
			"_options": ["Raise 1 cm", "Lower 1 cm", "Lower 2 cm"]
		}, {
			"key": "notes",
			"namespace": "ec_vests",
			"value": "",
			"value_type": "string",
			"_title": "Notes",
			"_type": "textarea"
		}],
		"sample": 99
	},
	"customer_overcoat": {
		"fields": { "neck": "", "chest": "", "waist": "", "seat": "", "shoulder_ptp": "", "right_sleeve": "", "left_sleeve": "", "bicep": "", "back_length": "" }
	},
	"customer": {
		"accepts_marketing": false,
		"email": "",
		"first_name": "",
		"last_name": "",
		"note": "",
		"phone": "",
		"verified_email": true,
		"addresses": [{
			"address1": "",
			"address2": "",
			"city": "",
			"company": "",
			"country": "United States",
			"first_name": "",
			"last_name": "",
			"phone": "",
			"province": "",
			"zip": ""
		}],
		"password": "",
    	"password_confirmation": "",
    	"send_email_welcome": false,
		"metafields": [{
			"key": "showroom",
			"namespace": "ec_info",
			"value": "",
			"value_type": "string"
		}, {
			"key": "birthday",
			"namespace": "ec_info",
			"value": "",
			"value_type": "string"
		}, {
			"key": "lead_source",
			"namespace": "ec_info",
			"value": "",
			"value_type": "string"
		}]
	}
};

Vue.component('calculator', {
	template: '#calculatorComponent',
	delimiters: ['%%', '%%'],
	props: ['increment', 'sample', 'index', 'item'],
	data: function data() {
		return {
			adjustment: 0
		};
	},
	mounted: function mounted() {
		console.log('Mounted', this.item);
		if (this.sample !== 99) {
			var oldValue = parseFloat(this.$parent[this.item].fields[this.index]);
			var sampleSize = parseFloat(this.$parent[this.item].config[this.index][this.sample]);
			this.adjustment = parseFloat(oldValue - sampleSize);
			console.log(oldValue, sampleSize);
		}
	},

	methods: {
		changeValue: function changeValue() {
			console.log('Change value');
		},
		decrease: function decrease() {
			console.log('decrease');
			console.log(this.adjustment, this.increment);
			this.adjustment = parseFloat(this.adjustment - parseFloat(this.increment));
			var oldValue = this.$parent[this.item].fields[this.index];
			console.log(oldValue);
			this.$parent[this.item].fields[this.index] = parseFloat(oldValue - parseFloat(this.increment));
		},
		increase: function increase() {
			console.log('increase');
			console.log(this.adjustment, this.increment);
			this.adjustment = parseFloat(this.adjustment + parseFloat(this.increment));
			var oldValue = this.$parent[this.item].fields[this.index];
			console.log(oldValue);
			this.$parent[this.item].fields[this.index] = parseFloat(oldValue + parseFloat(this.increment));
		}
	}
});

var initHome = function initHome() {
	Vue.use(VueTables.ClientTable);
	var vm = new Vue({
		el: '#app',
		delimiters: ['%%', '%%'],
		data: function data() {
			return {
				search: '',
				noResults: false,
				msg: 'Message',
				customers: [],
				columns: ['first_name', 'last_name', 'email', 'last_order_name', 'id'],
				options: {
					headings: {
						first_name: 'First Name',
						last_name: 'Last Name',
						email: 'Email',
						last_order_name: 'Last Order',
						id: 'Edit'
					},
					filterable: ['first_name', 'last_name', 'email'],
					sortable: ['first_name', 'last_name', 'email'],
					perPage: 50
				}
			};
		},
		methods : {
			submit(){
				axios.get(`${server}/search/${this.search}`)
				.then(res => {
					if (res.data.customers.length == 0) {
						this.noResults = true;
						this.customers = [];
					} else {
						this.customers = res.data.customers;
						this.noResults = false;
					}
					return
				})
				.catch(err => {
					console.log(err);
				});
			}
		}
	});
};

var initCustomer = function initCustomer(id) {

	var vm = new Vue({
		el: '#app',
		delimiters: ['%%', '%%'],
		data: config,
		filters: {
			filterDate: function filterDate(str) {
				return moment(str).format('MMMM Do, YYYY');
			},
			printKey: function printKey(str) {
				return str.charAt(0).toUpperCase() + str.replace('_', ' ').slice(1);
			}
		},
		beforeMount: function beforeMount() {
			var self = this;
			axios.get(server + "/customers/" + id).then(function (results) {
				console.log(results);
				var customer = results.data.customer.customer;
				for (var key in customer) {
					if(key == 'addresses' && customer[key].length == 0){
						self.customer[key] = [{
							"address1": "",
							"address2": "",
							"city": "",
							"company": null,
							"country": "United States",
							"country_name": "United States",
							"country_code": "US",
							"customer_id": id,
							"default": true,
							"phone": "",
							"province": "",
							"zip": ""
						}]
						console.log(self.customer[key])
					}else{
						if (self.customer[key] !== undefined) {
						self.customer[key] = customer[key];
					}	
					}
				}
				self.orders = results.data.orders.orders;
				var metafields = results.data.metafields.metafields;
				metafields.forEach(function (mf) {
					if (mf.key == 'samples') {
						var arr = mf.value.split(';');
						arr.forEach(function (arrItem) {
							self[arrItem.split(':')[0]].sample = arrItem.split(':')[1];
						});
					} else {
						(function () {
							var arr = mf.value.split(';');
							var key = 'customer_' + mf.key;
							console.log(key);
							if (self[key].meta !== undefined && self[key].meta !== null) {
								self[key].meta.forEach(function (metaItem) {
									// console.log(arr)
									arr.forEach(function (arrItem) {
										if (arrItem.split(':')[0] == metaItem.key) {
											metaItem.value = arrItem.split(':')[1];
										}
									});
								});
							}
							if (key == 'customer_posture' || key == 'customer_measurements' || key == 'customer_meta') {
								var _loop = function _loop(fieldKey) {
									arr.forEach(function (arrItem) {
										// console.log(arrItem, fieldKey)
										if (arrItem.split(':')[0] == self[key][fieldKey].key) {
											// console.log(arrItem.split(':')[0])
											self[key][fieldKey].value = arrItem.split(':')[1];
										}
									});
								};

								for (var fieldKey in self[key]) {
									_loop(fieldKey);
								}
							}
							if (self[key].fields !== undefined && self[key].fields !== null) {
								var _loop2 = function _loop2(fieldKey) {
									arr.forEach(function (arrItem) {
										// console.log(arrItem, fieldKey)
										// if (arrItem.split(':')[0] == self[key].fields[fieldKey]) {
										if (arrItem.split(':')[0] == fieldKey) {
											// console.log(arrItem.split(':')[0])
											self[key].fields[fieldKey] = parseFloat(arrItem.split(':')[1]);
										}
									});
								};

								for (var fieldKey in self[key].fields) {
									_loop2(fieldKey);
								}
								// self[key].fields.forEach(fieldItem => {
								// 	// console.log(arr)
								// 	arr.forEach(arrItem => {
								// 		if (arrItem.split(':')[0] == fieldItem.key) {
								// 			fieldItem.value = arrItem.split(':')[1]
								// 		}
								// 	})
								// })
							}
						})();
					}
				});
			}).catch(function (error) {
				console.log(error);
			});
		},

		methods: {
			buildOrderPage: function buildOrderPage(order) {
				console.log(order);
				this.modal.order = order;
				console.log('build order page');
			},
			changeStep: function changeStep(index) {
				var vm = this;
				this.config.step = index + 1;
				vm.calcReset = true;
				Vue.nextTick(function () {
					vm.calcReset = false;
				});
			},
			checkField: function checkField(key) {
				console.log(key);
				if (key !== 'company' && key.indexOf('_name') == -1 && key !== 'phone') {
					return true;
				} else {
					return false;
				}
			},
			printPage: function printPage() {
				window.print();
			},
			update: function update() {
				var self = this;
				var obj = {
					id: id,
					customer: self.customer,
					mf: {
						meta: self.customer_meta,
						measurements: self.customer_measurements,
						posture: self.customer_posture,
						jacket: self.customer_jacket,
						pants: self.customer_pants,
						vest: self.customer_vest,
						shirt: self.customer_shirt,
						overcoat: self.customer_overcoat
					}
				};
				axios.post(server + "/customers/update", obj).then(function (response) {
					console.log(response.data);
					self.edit = false;
				}).catch(function (error) {
					console.log(error);
				});
			},
			setMetafield: function setMetafield(o, index) {
				console.log(o, index);
				this.customer.metafields[index].value = this.customer.metafields[index]._options[o.target.value];
			},
			setSample: function setSample(o, item) {
				console.log(o, item);
				console.log(o.target.value);
				this.sample[item] = o.target.value;
			},
			updateSample: function updateSample(item) {
				var vm = this;
				vm.calcReset = true;
				for (var key in item.config) {
					var sample = item.config[key][item.sample];
					if (key !== 'names') {
						item.fields[key] = sample;
					}
				}
				Vue.nextTick(function () {
					vm.calcReset = false;
				});
			}
		}
	});
};

var newCustomer = function newCustomer() {

	var vm = new Vue({
		el: '#app',
		delimiters: ['%%', '%%'],
		data: config,
		filters: {
			printKey: function printKey(str) {
				return str.charAt(0).toUpperCase() + str.replace('_', ' ').slice(1);
			}
		},
		  watch: {
		    customer: {
		      handler: function (val, oldVal) {
		    	this.customer['password'] = this.customer['first_name'].trim() + '1234';
				this.customer['password_confirmation'] = this.customer['first_name'].trim() + '1234';
		      },
		      deep: true
		    }
		  },
		methods: {
			changeStep: function changeStep(index) {
				var vm = this;
				this.config.step = index + 1;
				vm.calcReset = true;
				Vue.nextTick(function () {
					vm.calcReset = false;
				});
			},
			checkField: function checkField(key) {
				console.log(key);
				if (key !== 'company' && key.indexOf('_name') == -1 && key !== 'phone') {
					return true;
				} else {
					return false;
				}
			},
			create: function create() {
				var self = this;
				var obj = {
					customer: self.customer,
					mf: {
						meta: self.customer_meta,
						measurements: self.customer_measurements,
						posture: self.customer_posture,
						jacket: self.customer_jacket,
						pants: self.customer_pants,
						vest: self.customer_vest,
						shirt: self.customer_shirt,
						overcoat: self.customer_overcoat
					}
				};
				axios.post(server + "/customers/create", obj).then(function (response) {
					console.log(response.data);
					console.log("Going to https://enzo-customers.herokuapp.com/public/customers/" + response.data.data.customer.id);
					window.location.href = "https://enzo-customers.herokuapp.com/public/customers/" + response.data.data.customer.id;
				}).catch(function (error) {
					console.log(error);
				});
			},
			setMetafield: function setMetafield(o, index) {
				console.log(o, index);
				this.customer.metafields[index].value = this.customer.metafields[index]._options[o.target.value];
			},
			setSample: function setSample(o, item) {
				console.log(o, item);
				console.log(o.target.value);
				this.sample[item] = o.target.value;
			},
			updateSample: function updateSample(item) {
				var vm = this;
				vm.calcReset = true;
				for (var key in item.config) {
					var sample = item.config[key][item.sample];
					if (key !== 'names') {
						item.fields[key] = sample;
					}
				}
				Vue.nextTick(function () {
					vm.calcReset = false;
				});
			}
		}
	});
	
};