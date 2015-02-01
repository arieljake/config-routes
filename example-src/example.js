'use strict';

global.$traceurRuntime = require('traceur-runtime');

let path = require("path");
let AppBase = require('./AppBase');

let routes = AppBase.createRoutes(path.join(__dirname, "routes"), path.join(__dirname, "functions"));

let route = routes.get("customer/GetCustomerLocations.json");
let req = {};
let res = {
	send: function(value)
	{
		console.dir(value);
	}
};

route(req, res);