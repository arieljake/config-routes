'use strict';

global.$traceurRuntime = require('traceur-runtime');

let path = require("path");
let RouteFactory = require('./objects/RouteFactory').RouteFactory;
let FnLibrary = require('./objects/FnLibrary').FnLibrary;

let fnLib = new FnLibrary([path.join(__dirname, "fnlib"), path.join(__dirname, "functions")]);
let routes = new RouteFactory(path.join(__dirname, "routes"), fnLib);

// router.get('/customers/:id/locations', routes.get("customer.GetCustomerLocations"));

let route = routes.get("customer/GetCustomerLocations.json");
let req = {};
let res = {
	send: function(value)
	{
		console.dir(value);
	}
};

route(req, res);