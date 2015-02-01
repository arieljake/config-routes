"use strict";
var __moduleName = "dist/router";
'use strict';
global.$traceurRuntime = require('traceur-runtime');
var path = require("path");
var RouteFactory = require('./objects/RouteFactory').RouteFactory;
var FnLibrary = require('./objects/FnLibrary').FnLibrary;
var fnLib = new FnLibrary([path.join(__dirname, "fnlib"), path.join(__dirname, "functions")]);
var routes = new RouteFactory(path.join(__dirname, "routes"), fnLib);
var route = routes.get("customer/GetCustomerLocations.json");
var req = {};
var res = {send: function(value) {
    console.dir(value);
  }};
route(req, res);
//# sourceURL=router.js