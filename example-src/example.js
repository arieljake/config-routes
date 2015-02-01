'use strict';

global.$traceurRuntime = require('traceur-runtime');

let path = require("path");
let AppBase = require('./AppBase');

let routes = AppBase.createRoutes({
	routeLib: path.join(__dirname, "routes"),
	fnLib: path.join(__dirname, "functions"),
	routeEvents: {
		starting: function()
		{
			console.dir("route starting");
		},
		fnComplete: function()
		{
			console.dir("route fn complete");
		},
		complete: function()
		{
			console.dir("route complete");
		}
	}
});

let route = routes.get("customer/GetCustomerLocations.json");
let req = {};
let res = {
	send: function(value)
	{
		console.dir(value);
	}
};

route(req, res);