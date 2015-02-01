"use strict";
var __moduleName = "example-es5/example";
'use strict';
var path = require("path");
var AppBase = require('./AppBase');
var routes = AppBase.createRoutes({
  routeLib: path.join(__dirname, "routes"),
  fnLib: path.join(__dirname, "functions"),
  routeEvents: {
    starting: function() {
      console.dir("route starting");
    },
    fnComplete: function() {
      console.dir("route fn complete");
    },
    complete: function() {
      console.dir("route complete");
    }
  }
});
var route = routes.get("customer/GetCustomerLocations.json");
var req = {};
var res = {send: function(value) {
    console.dir(value);
  }};
route(req, res);
//# sourceURL=example-src/example.js